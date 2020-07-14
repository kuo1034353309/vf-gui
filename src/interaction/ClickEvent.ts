import { DisplayObject } from "../core/DisplayObject";
import { TouchMouseEventEnum } from "./TouchMouseEventEnum";
import { InteractionEvent } from "../event/InteractionEvent";
import { TouchMouseEvent } from "../event/TouchMouseEvent";
import { debug } from "../utils/Utils";
import { SyncManager } from "./SyncManager";

/**
 * 点击触摸相关的事件处理订阅类,UI组件内部可以创建此类实现点击相关操作
 *
 *  可侦听事件:
 * ```
 *  {InteractionEvent}.TouchEvent.onHover
 *  {InteractionEvent}.TouchEvent.onPress
 *  {InteractionEvent}.TouchEvent.onClick
 *  {InteractionEvent}.TouchEvent.onMove
 * ```
 *
 * @example 可查看 `TestSliceSprite` 示例
 *
 * @since 1.0.0
 */
export class ClickEvent {
    /**
     * ClickEvent 构造函数
     * @param obj 调用的显示对象
     * @param includeHover 是否监听鼠标移上与移出，默认true
     * @param rightMouseButton 是否开启鼠标右键点击，默认false
     * @param doubleClick 是否开启鼠标双击,默认false
     */
    public constructor(
        obj: DisplayObject,
        includeHover?: boolean,
        rightMouseButton?: boolean,
        doubleClick?: boolean
    ) {
        this.obj = obj;

        if (includeHover !== undefined) {
            this.hover = includeHover;
        }
        if (rightMouseButton !== undefined) {
            this.right = rightMouseButton;
        }
        if (doubleClick !== undefined) {
            this.double = doubleClick;
        }

        if (this.right) {
            this.eventnameMousedown = TouchMouseEventEnum.mouseRightDown;
            this.eventnameMouseup = TouchMouseEventEnum.mouseRightup;
            this.eventnameMouseupoutside = TouchMouseEventEnum.mouseRightupoutside;
        }

        obj.interactive = true;

        this.startEvent();
    }

    private obj: DisplayObject;
    public id = 0;
    /** 是否开启本地坐标转换，开启后，事件InteractionEvent中的localX localY为本地坐标，false情况下为0 */
    public isOpenLocalPoint = false;
    private localOffset = new vf.Point();
    private offset = new vf.Point();
    private movementX = 0;
    private movementY = 0;
    private ishover = false;
    private mouse = new vf.Point();
    private bound = false;
    private right = false;
    private hover = true;
    private double = false;
    private time = 0;
    private eventnameMousedown = TouchMouseEventEnum.mousedown;
    private eventnameMouseup = TouchMouseEventEnum.mouseup;
    private eventnameMouseupoutside = TouchMouseEventEnum.mouseupoutside;
    private isStop = true;
    private deviceType = vf.utils.getSystemInfo().device.type;

    public getTarget() {
        return this.obj;
    }

    public startEvent() {
        if (this.isStop) {
            const container = this.obj.container;
            container.on(this.eventnameMousedown, this._onMouseDown, this);
            if (!this.right){
                container.on(TouchMouseEventEnum.touchstart, this._onMouseDown, this);
                if (this.hover) {
                    if(this.deviceType === 'pc'){ // 用于解决移动端滑动触发问题，后期可以单独处理移动相关的
                        container.on(TouchMouseEventEnum.mouseover, this._onMouseOver, this);
                        container.on(TouchMouseEventEnum.mouseout, this._onMouseOut, this);
                    }else{
                        container.on(TouchMouseEventEnum.touchstart, this._onMouseOver, this);
                        container.on(TouchMouseEventEnum.touchend, this._onMouseOut, this);
                    }
                }
            }
            this.isStop = false;
        }
    }

    /** 清除拖动 */
    public stopEvent() {
        const container = this.obj.container;
        if (this.bound) {
            container.off(this.eventnameMouseup, this._onMouseUp, this);
            container.off(this.eventnameMouseupoutside, this._onMouseUpOutside, this);

            if (!this.right) {
                container.off(TouchMouseEventEnum.touchend, this._onMouseUp, this);
                container.off(TouchMouseEventEnum.touchendoutside, this._onMouseUpOutside, this);
            }
            this.bound = false;
        }
        container.off(this.eventnameMousedown, this._onMouseDown, this);
        if (!this.right)
            container.off(TouchMouseEventEnum.touchstart, this._onMouseDown, this);

        if (this.hover) {
            container.off(TouchMouseEventEnum.mouseover, this._onMouseOver, this);
            container.off(TouchMouseEventEnum.mouseout, this._onMouseOut, this);
            container.off(TouchMouseEventEnum.mousemove, this._onMouseMove, this);
            container.off(TouchMouseEventEnum.touchmove, this._onMouseMove, this);

            container.off(TouchMouseEventEnum.touchstart, this._onMouseOver, this);
            container.off(TouchMouseEventEnum.touchendoutside, this._onMouseOut, this);
        }
        this.isStop = true;
    }

    private lastMouseDownTime = 0;
    private _onMouseDown(e: InteractionEvent) {
        if(this.lastMouseDownTime > performance.now() && !e.signalling){
            return;
        }
        this.lastMouseDownTime = performance.now() + 300;
        if (
            this.obj.stage && this.obj.stage.syncInteractiveFlag &&
            (this.obj.listenerCount(TouchMouseEvent.onPress) > 0 ||
            this.obj.listenerCount(TouchMouseEvent.onDown) > 0 ||
            this.obj.listenerCount(TouchMouseEvent.onClick) > 0)
        ) {
            (SyncManager.getInstance(this.obj.stage) as SyncManager).collectEvent(e, this.obj);
        }
        this.setLocalPoint(e);
        this.mouse.copyFrom(e.data.global);
        this.id = e.data.identifier;
        this.emitTouchEvent(TouchMouseEvent.onPress, e, true);
        if (this.obj.listenerCount(TouchMouseEvent.onDown) > 0) {
            this.emitTouchEvent(TouchMouseEvent.onDown, e, true);
        }
        const container = this.obj.container;
        if (!this.bound) {
            container.on(this.eventnameMouseup, this._onMouseUp, this);
            container.on(this.eventnameMouseupoutside, this._onMouseUpOutside, this);
            if (!this.right) {
                container.on(TouchMouseEventEnum.touchend, this._onMouseUp, this);
                container.on(TouchMouseEventEnum.touchendoutside, this._onMouseUpOutside, this);
            }
            this.bound = true;
        }

        if (this.double) {
            const now = performance.now();
            if (now - this.time < 210) {
                this.emitTouchEvent(TouchMouseEvent.onClick, e);
            } else {
                this.time = now;
            }
        }
        if (this.obj.stage && this.obj.stage.originalEventPreventDefault && e.data.originalEvent) {
            e.data.originalEvent.preventDefault();
        }
    }

    private emitTouchEvent(event: string | symbol, e: InteractionEvent, args?: boolean) {
        if (this.obj.listenerCount(event) <= 0) {
            return;
        }
        if (debug) {
            const stage = this.obj.stage;
            if (stage && event !== TouchMouseEvent.onMove) {
                stage.sendToPlayer({
                    code: event,
                    level: "info",
                    target: this.obj,
                    data: [args],
                    action: e.type,
                });
            }
        }
        e.type = event.toString();
        this.obj.emit(e.type, e, this.obj, args);
    }

    private _mouseUpAll(e: InteractionEvent) {
        if (e.data.identifier !== this.id) return;
        this.offset.set(e.data.global.x - this.mouse.x, e.data.global.y - this.mouse.y);
        if (this.bound) {
            this.obj.container.off(this.eventnameMouseup, this._onMouseUp, this);
            this.obj.container.off(this.eventnameMouseupoutside, this._onMouseUpOutside, this);
            if (!this.right) {
                this.obj.container.off(TouchMouseEventEnum.touchend, this._onMouseUp, this);
                this.obj.container.off(TouchMouseEventEnum.touchendoutside, this._onMouseUpOutside, this);
            }
            this.bound = false;
        }
        this.emitTouchEvent(TouchMouseEvent.onUp, e, false);
        this.emitTouchEvent(TouchMouseEvent.onPress, e, false);
    }
    private _onMouseUp(e: InteractionEvent) {
        if (e.data.identifier !== this.id) return;

        if (
            this.obj.stage && this.obj.stage.syncInteractiveFlag &&
            (this.obj.listenerCount(TouchMouseEvent.onUp) > 0 ||
            this.obj.listenerCount(TouchMouseEvent.onPress) > 0 ||
            this.obj.listenerCount(TouchMouseEvent.onClick) > 0)
        ) {
            (SyncManager.getInstance(this.obj.stage) as SyncManager).collectEvent(e, this.obj);
        }

        this._mouseUpAll(e);

        //prevent clicks with scrolling/dragging objects
        if (this.obj.dragThreshold) {
            this.movementX = Math.abs(this.offset.x);
            this.movementY = Math.abs(this.offset.y);
            if (Math.max(this.movementX, this.movementY) > this.obj.dragThreshold) return;
        }

        if (!this.double) {
            this.emitTouchEvent(TouchMouseEvent.onClick, e, false);
        }
    }

    private _onMouseUpOutside(e: InteractionEvent) {
        if (e.data.identifier !== this.id) return;
        if (
            this.obj.stage && this.obj.stage.syncInteractiveFlag &&
            (this.obj.listenerCount(TouchMouseEvent.onUp) > 0 ||
            this.obj.listenerCount(TouchMouseEvent.onPress) > 0)
        ) {
            (SyncManager.getInstance(this.obj.stage) as SyncManager).collectEvent(e, this.obj);
        }

        this._mouseUpAll(e);
    }

    private _onMouseOver(e: InteractionEvent) {
        if (!this.ishover) {
            if (this.obj.stage && this.obj.stage.syncInteractiveFlag && (this.obj.listenerCount(TouchMouseEvent.onHover) > 0)) {
                (SyncManager.getInstance(this.obj.stage) as SyncManager).collectEvent(e, this.obj);
            }

            this.ishover = true;
            this.obj.container.on(TouchMouseEventEnum.mousemove, this._onMouseMove, this);
            this.obj.container.on(TouchMouseEventEnum.touchmove, this._onMouseMove, this);
            this.emitTouchEvent(TouchMouseEvent.onHover, e, true);
        }
    }

    private _onMouseOut(e: InteractionEvent) {
        if (this.ishover) {
            if (this.obj.stage && this.obj.stage.syncInteractiveFlag && (this.obj.listenerCount(TouchMouseEvent.onHover) > 0)) {
                (SyncManager.getInstance(this.obj.stage) as SyncManager).collectEvent(e, this.obj);
            }

            this.ishover = false;
            this.obj.container.off(TouchMouseEventEnum.mousemove, this._onMouseMove, this);
            this.obj.container.off(TouchMouseEventEnum.touchmove, this._onMouseMove, this);
            this.emitTouchEvent(TouchMouseEvent.onHover, e, false);
        }
    }

    private _tempMovePoint = new vf.Point();
    private _onMouseMove(e: InteractionEvent) {
        if (this.obj.stage && this.obj.stage.syncInteractiveFlag && (this.obj.listenerCount(TouchMouseEvent.onMove) > 0)) {
            (SyncManager.getInstance(this.obj.stage) as SyncManager).collectEvent(e, this.obj);
        }
        const container = this.obj.container;
        container.toLocal(e.data.global, undefined, this._tempMovePoint);
        if(container.hitArea && container.hitArea.contains(this._tempMovePoint.x,this._tempMovePoint.y)){
            this.setLocalPoint(e);
            this.emitTouchEvent(TouchMouseEvent.onMove, e);
        }

    }

    private setLocalPoint(e: InteractionEvent) {
        if (this.isOpenLocalPoint) {
            this.obj.container.toLocal(e.data.global, undefined, this.localOffset);
            e.local = this.localOffset;
        }
    }

    public remove() {
        this.stopEvent();
        this.obj.container.interactive = false;
    }
}
