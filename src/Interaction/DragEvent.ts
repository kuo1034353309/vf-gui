import { DisplayObject } from "../core/DisplayObject";
import { TouchMouseEventEnum } from "./TouchMouseEventEnum";
import { InteractionEvent } from "../event/InteractionEvent";
import { ComponentEvent } from "./Index";
import { SyncManager } from "./syncManager";
import { DisplayObjectAbstract } from "../core/DisplayObjectAbstract";

/**
 * 多拽相关的事件处理类
 *
 *  可侦听事件:
 * ```
 *  {InteractionEvent}.DraggableEvent.onDragPress
 *  {InteractionEvent}.DraggableEvent.onDragStart
 *  {InteractionEvent}.DraggableEvent.onDragMove
 *  {InteractionEvent}.DraggableEvent.onDragEnd
 * ```
 *  可赋值方法:
 * ```
 * onPress: ((e: InteractionEvent, isPressed: boolean,dragObj?: DragEvent) => void) | undefined;
 * onDragEnd: ((e: InteractionEvent,dragObj?: DragEvent) => void) | undefined
 * onDragMove: ((e: InteractionEvent, offset: vf.Point,dragObj?: DragEvent) => void) | undefined
 * onDragStart: ((e: InteractionEvent,dragObj?: DragEvent) => void) | undefined
 * ```
 *
 * @example 可查看 `Slider` 源码
 *
 * @since 1.0.0
 */
export class DragEvent {
    public constructor(obj: DisplayObject) {
        this.obj = obj;
        obj.interactive = true;
        this.startEvent();
    }

    private obj: DisplayObject;
    public id = 0;
    private offset = new vf.Point();
    private movementX = 0;
    private movementY = 0;
    private bound = false;
    private start = new vf.Point();
    private mouse = new vf.Point();
    private cancel = false;
    private dragging = false;
    private isStop = true;
    /**
     * 限制拖动抽,XY,X抽或Y抽
     */
    public dragRestrictAxis?: "x" | "y";

    public startEvent() {
        if (this.isStop) {
            this.obj.container.on(TouchMouseEventEnum.mousedown, this._onDragStart, this);
            this.obj.container.on(TouchMouseEventEnum.touchstart, this._onDragStart, this);
            this.isStop = false;
        }
    }

    public executeAction(e: InteractionEvent) {
        switch (e.type) {
            case ComponentEvent.DRAG_START:
                this._onDragStart(e);
                break;
            case ComponentEvent.DRAG_MOVE:
                this._onDragMove(e);
                break;
            case ComponentEvent.DRAG_END:
                this._onDragEnd(e);
                break;
        }
    }

    private _onDragStart(e: InteractionEvent) {
        if(this.obj.stage && this.obj.stage.syncInteractiveFlag && (e.type == TouchMouseEventEnum.mousedown || e.type == TouchMouseEventEnum.touchstart)){
            (SyncManager.getInstance(this.obj.stage) as SyncManager).collectEvent(e, this.obj);
        }
        
        if (this.obj.dragStopPropagation && e.data.originalEvent && e.data.originalEvent.stopPropagation) {
            e.data.originalEvent.stopPropagation();
        }
        this.id = e.data.identifier;

        if (e.type == TouchMouseEventEnum.mousedown || e.type == TouchMouseEventEnum.touchstart) {
            this.onDragPress && this.onDragPress.call(this.obj, e, true, this);
        }

        if (!this.bound && this.obj.parent && this.obj.stage) {
            const stage = this.obj.stage.container;
            this.start.copyFrom(e.data.global);
            stage.on(TouchMouseEventEnum.mousemove, this._onDragMove, this);
            stage.on(TouchMouseEventEnum.touchmove, this._onDragMove, this);
            stage.on(TouchMouseEventEnum.mouseup, this._onDragEnd, this);
            stage.on(TouchMouseEventEnum.mouseupoutside, this._onDragEnd, this);
            stage.on(TouchMouseEventEnum.touchend, this._onDragEnd, this);
            stage.on(TouchMouseEventEnum.touchendoutside, this._onDragEnd, this);
            stage.on(TouchMouseEventEnum.touchcancel, this._onDragEnd, this);
            this.bound = true;
        }

        if (
            this.obj.stage &&
            this.obj.stage.originalEventPreventDefault &&
            e.data.originalEvent &&
            e.data.originalEvent.preventDefault
        ) {
            e.data.originalEvent.preventDefault();
        }
    }

    private _onDragMove(e: InteractionEvent) {
        if (this.obj.dragStopPropagation && e.data.originalEvent && e.data.originalEvent.stopPropagation) {
            e.data.originalEvent.stopPropagation();
        }
        if (e.data.identifier !== this.id) return;

        if (this.obj.stage && this.obj.stage.syncInteractiveFlag && (e.type == TouchMouseEventEnum.mousemove || e.type == TouchMouseEventEnum.touchmove)) {
            (SyncManager.getInstance(this.obj.stage) as SyncManager).collectEvent(e, this.obj.stage as DisplayObjectAbstract);
        }

        this.mouse.copyFrom(e.data.global);
        this.offset.set(this.mouse.x - this.start.x, this.mouse.y - this.start.y);
        if (!this.dragging) {
            this.movementX = Math.abs(this.offset.x);
            this.movementY = Math.abs(this.offset.y);
            if (
                (this.movementX === 0 && this.movementY === 0) ||
                Math.max(this.movementX, this.movementY) < this.obj.dragThreshold
            )
                return; //thresshold
            if (this.dragRestrictAxis !== undefined) {
                this.cancel = false;
                if (this.dragRestrictAxis == "x" && this.movementY > this.movementX) this.cancel = true;
                else if (this.dragRestrictAxis == "y" && this.movementY <= this.movementX) this.cancel = true;
                if (this.cancel) {
                    this._onDragEnd(e);
                    return;
                }
            }

            this.onDragStart && this.onDragStart.call(this.obj, e, this);
            this.dragging = true;
        }
        this.onDragMove && this.onDragMove.call(this.obj, e, this.offset, this);
    }

    private _onDragEnd(e: InteractionEvent) {
        if (this.obj.dragStopPropagation && e.stopPropagation) e.stopPropagation();
        if (e.data.identifier !== this.id) return;

        if (
            this.obj.stage && this.obj.stage.syncInteractiveFlag &&
            (e.type == TouchMouseEventEnum.mouseup ||
            e.type == TouchMouseEventEnum.mouseupoutside ||
            e.type == TouchMouseEventEnum.touchend ||
            e.type == TouchMouseEventEnum.touchendoutside ||
            e.type == TouchMouseEventEnum.touchcancel)
        ) {
            (SyncManager.getInstance(this.obj.stage) as SyncManager).collectEvent(e, this.obj.stage as DisplayObjectAbstract);
        }

        if (this.bound && this.obj.stage) {
            const stage = this.obj.stage.container;
            stage.off(TouchMouseEventEnum.mousemove, this._onDragMove, this);
            stage.off(TouchMouseEventEnum.touchmove, this._onDragMove, this);
            stage.off(TouchMouseEventEnum.mouseup, this._onDragEnd, this);
            stage.off(TouchMouseEventEnum.mouseupoutside, this._onDragEnd, this);
            stage.off(TouchMouseEventEnum.touchend, this._onDragEnd, this);
            stage.off(TouchMouseEventEnum.touchendoutside, this._onDragEnd, this);
            stage.off(TouchMouseEventEnum.touchcancel, this._onDragEnd, this);
            this.dragging = false;
            this.bound = false;
            this.onDragEnd && this.onDragEnd.call(this.obj, e, this);
            this.onDragPress && this.onDragPress.call(this.obj, e, false, this);
        }
    }

    /** 清除拖动 */
    public stopEvent() {
        if (this.bound && this.obj.stage) {
            const stage = this.obj.stage.container;
            stage.off(TouchMouseEventEnum.mousemove, this._onDragMove, this);
            stage.off(TouchMouseEventEnum.touchmove, this._onDragMove, this);
            stage.off(TouchMouseEventEnum.mouseup, this._onDragEnd, this);
            stage.off(TouchMouseEventEnum.mouseupoutside, this._onDragEnd, this);
            stage.off(TouchMouseEventEnum.touchend, this._onDragEnd, this);
            stage.off(TouchMouseEventEnum.touchendoutside, this._onDragEnd, this);
            this.bound = false;
        }
        this.obj.container.off(TouchMouseEventEnum.mousedown, this._onDragStart, this);
        this.obj.container.off(TouchMouseEventEnum.touchstart, this._onDragStart, this);

        this.isStop = true;
    }

    public remove() {
        this.stopEvent();
        this.onDragPress = undefined;
        this.onDragEnd = undefined;
        this.onDragMove = undefined;
        this.onDragStart = undefined;
        this.obj.interactive = false;
    }

    public onDragPress: ((e: InteractionEvent, isPressed: boolean, dragObj?: DragEvent) => void) | undefined;
    public onDragEnd: ((e: InteractionEvent, dragObj?: DragEvent) => void) | undefined;
    public onDragMove: ((e: InteractionEvent, offset: vf.Point, dragObj?: DragEvent) => void) | undefined;
    public onDragStart: ((e: InteractionEvent, dragObj?: DragEvent) => void) | undefined;
}
