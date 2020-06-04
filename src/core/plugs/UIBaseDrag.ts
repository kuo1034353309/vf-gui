import { DisplayObject } from "../DisplayObject";
import { DragEvent, DragDropController, InteractionEvent, ComponentEvent } from "../../interaction/Index";
import { TouchMouseEventEnum } from "../../interaction/TouchMouseEventEnum";
import { DisplayObjectAbstract } from "../DisplayObjectAbstract";
import { Stage } from "../Stage";
import { getDisplayObject, debug, getDisplayPathById } from "../../utils/Utils";
import { SyncManager } from "../../Interaction/syncManager";
import { TickerShared } from "../Ticker";

/**
 *  组件的拖拽操作
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestDrop
 */
export class UIBaseDrag implements Lifecycle {
    /**
     * 构造函数
     */
    public constructor(target: DisplayObject) {
        this.target = target;
        target.plugs.set(UIBaseDrag.key, this);
        target.dragStopPropagation = true;
    }

    public static key = "UIBaseDrag";

    private target: DisplayObject | undefined;
    public $targetParent: DisplayObject | Stage | undefined;
    private oldInteractiveChildren = false;
    /** 
     * 可拖动初始化
     *  @default
     */
    private dragInitialized = false;
    /** 
     * 可被掉落初始化
     * @default
    */
    private dropInitialized = false;
    /** 
     * 拖动控制类 
     */
    private drag: DragEvent | undefined;
    /**
     * 临时属性，为了解决同步时的动作补齐
     * 0 没有操作
     * 1 开始拖动
     * 2 拖动中
     * 3 拖动结束
     * 4 拖动到目标
     */
    private _dragState: 0 | 1 | 2 | 3 | 4 = 0;
    /** 
     * 位置 
     * 
     */
    private _dragPosition = new vf.Point();
    /**
     * 开始位置
     */
    private _containerStart: vf.Point | undefined;

    /** 
     * 是否拖动中
     * @default
     */
    public dragging = false;
    /** 
     * 当前拖动组件的事件ID，用于处理DragDropController中多组件的选定 
     */
    public get dragDropEventId(): number | undefined {
        if (this.target) {
            return this.target.attach.dragDropEventId as number;
        }
    }

    /**
     * 是否开启拖动
     * @default false
     */
    public set draggable(value: boolean) {
        if (value)
            this.initDraggable();
        else
            this.clearDraggable();
    }

    /**
     * 是否设置边界
     * @default false
     */
    public dragBoundary = false;
    /**
     * 是否启用回弹，在移动到非接收方时，回弹到原始位置
     */
    public dragBounces = false;
    /**
     * 拖拽时的鼠标状态
     */
    public dragMoveCursor = 'pointer';

    /**
     * 限制拖动抽,XY,X抽或Y抽
     */
    private _dragRestrictAxis?: "x" | "y";
    public get dragRestrictAxis() {
        return this._dragRestrictAxis;
    }
    public set dragRestrictAxis(value) {
        this._dragRestrictAxis = value;
        if (this.drag) {
            this.drag.dragRestrictAxis = this._dragRestrictAxis;
        }
    }

    /** 
     * 拖动分组
     */
    public get dragGroup(): string {
        if (this.target) {
            return this.target.attach.dragGroup as string;
        }
        return "";
    }
    public set dragGroup(value: string) {
        if (this.target)
            this.target.attach.dragGroup = value;
    }

    /**
     * 拖动时，物体临时的存放容器，设置后，请注意事件流
     */
    private _dragContainer: DisplayObjectAbstract | undefined;
    public get dragContainer() {
        return this._dragContainer;
    }
    public set dragContainer(value) {
        this._dragContainer = getDisplayObject(value, this.target);
    }

    /**
     * 是否开启拖动掉落接收
     */
    public set droppable(value: boolean | undefined) {
        if (value)
            this.initDroppable();
        else
            this.clearDroppable();
    }

    /**
     * 接收掉落的新容器
     */
    private _droppableReparent: DisplayObject | undefined;
    public get droppableReparent() {
        return this._droppableReparent;
    }
    public set droppableReparent(value) {
        this._droppableReparent = getDisplayObject(value, this.target);
    }
    /**
     * 接收拖动掉落的分组名
     */
    public dropGroup: string | undefined;

    private _actionData: {type: string;data: vf.interaction.InteractionData;offset?: vf.Point;path?: string[]} | undefined;
    
    /**
     * 获取当前的操作数据
     */
    public get actionData(){
        return JSON.stringify(this._actionData);
    }
    public set actionData(data: string){
        const drag = this.drag;
        const value = JSON.parse(data) as  {type: string;data: vf.interaction.InteractionData;offset?: vf.Point;path: string[]};
        const e = new InteractionEvent();
        const dragState = this._dragState;
        e.type = value.type;
        e.data = value.data;
        e.data.identifier = value.data.identifier * 1000;
        e.signalling = true;
        if(drag){
            if(value.type === ComponentEvent.DRAG_TARGET) {
                if(dragState !== 2){
                    e.type = ComponentEvent.DRAG_START;
                    e.data.global.x -=1;
                    drag.executeAction(e);
                    e.type = ComponentEvent.DRAG_MOVE;
                    e.data.global.x += 1;
                    drag.executeAction(e);
                }
                e.type = ComponentEvent.DRAG_TARGET;
                this._dragPosition.set(e.data.tiltX,e.data.tiltY);
                this.executeDrop(e,value.path);
            }else if(value.type === ComponentEvent.DRAG_END) {
                if(dragState !== 2){
                    e.type = ComponentEvent.DRAG_START;
                    e.data.global.x -= 1;
                    drag.executeAction(e);
                    e.type = ComponentEvent.DRAG_MOVE;
                    drag.executeAction(e);
                    e.data.global.x += 1;
                }
                e.type = ComponentEvent.DRAG_END;
                this._dragPosition.set(e.data.tiltX,e.data.tiltY);
                drag.executeAction(e);
            }else{
                drag.executeAction(e);
            }
            
        }
        
    }

    protected clearDraggable() {
        if (this.dragInitialized) {
            this.dragInitialized = false;
            this.drag && this.drag.stopEvent();
        }
    }

    protected initDraggable() {
        if (this.target == undefined) {
            return;
        }
        if (!this.dragInitialized) {

            this.dragInitialized = true;
            const containerStart = new vf.Point();
            const stageOffset = new vf.Point();
            this._containerStart = containerStart;
            this._dragPosition.set(0, 0);

            this.drag = new DragEvent(this.target);
            this.drag.dragRestrictAxis = this._dragRestrictAxis;


            // this.drag.onDragPress = (e: InteractionEvent,isPress: boolean) => {
            //     if(isPress){
            //         this._actionData = {type:ComponentEvent.DRAG_START,data: e.data};
            //     }else{
            //         this._actionData = {type:ComponentEvent.DRAG_START,data: e.data};
            //     }
                
            // }

            this.drag.onDragStart = (e: InteractionEvent) => {
                if (this.target == undefined) {
                    return;
                }
                this._dragState = 1;
                const target = this.target;
                this.$targetParent = target.parent;
                this.oldInteractiveChildren = target.interactiveChildren;

                if (this._dragContainer == undefined && !this.dragBoundary) {
                    this._dragContainer = this.target.stage;
                }

                const added = DragDropController.add(target, e);
                if (!this.dragging && added) {
                    target.emit(ComponentEvent.DRAG_START_BEFORE, target, e);
                    this.dragging = true;
                    target.interactive = false;
                    target.interactiveChildren = false;
                    containerStart.copyFrom(target.container.position);
                    if (this._dragContainer) {
                        let c: DisplayObjectAbstract | undefined;
                        if (this._dragContainer instanceof DisplayObjectAbstract) {
                            c = this._dragContainer;
                        }
                        if (c && target.parent) {
                            //_this.container._recursivePostUpdateTransform();
                            stageOffset.set(c.container.worldTransform.tx - target.parent.container.worldTransform.tx, c.container.worldTransform.ty - target.parent.container.worldTransform.ty);
                            c.addChild(target);
                            stageOffset.set(stageOffset.x / target.parent.scaleX, stageOffset.y / target.parent.scaleY);
                        }
                    } else {
                        stageOffset.set(0);
                    }
                    if (debug) { //debug 模式下，日志信息
                        const stage = target.stage;
                        if (stage) {
                            stage.inputLog({
                                code: ComponentEvent.DRAG_START,
                                level: 'info', target: target,
                                data: [target.parent, containerStart.x - stageOffset.x, containerStart.y - stageOffset.y],
                                action: e.type,
                                message: 'parent,start,offset pos',
                            });
                        }

                    }
                    this._actionData = {type:ComponentEvent.DRAG_START,data: e.data};
                    target.emit(ComponentEvent.DRAG_START, target, e);
                }
            };


            this.drag.onDragMove = (e: InteractionEvent, offset: vf.Point) => {
                if (this.target == undefined) {
                    return;
                }
                const target = this.target;
                
                if(target.stage && target.stage.app){
                    const interaction = (target.stage.app.renderer as vf.Renderer).plugins.interaction;
                    (interaction as any).cursor = this.dragMoveCursor;
                }

                if (this.dragging && target.stage) {
                    const x = containerStart.x + (offset.x / target.stage.scaleX) - stageOffset.x;
                    const y = containerStart.y + (offset.y / target.stage.scaleY) - stageOffset.y;
                    const dragPosition = this._dragPosition;
                    if (this.dragRestrictAxis == "x") {
                        dragPosition.set(x, containerStart.y - stageOffset.y);
                    } else if (this.dragRestrictAxis == "y") {
                        dragPosition.set(containerStart.x - stageOffset.x, y);
                    } else {
                        this._dragPosition.set(x, y);
                    }
                    if (this.dragBoundary && target.parent) {
                        dragPosition.x = Math.max(0, dragPosition.x);
                        dragPosition.x = Math.min(dragPosition.x, target.parent.width - target.width);
                        dragPosition.y = Math.max(0, dragPosition.y);
                        dragPosition.y = Math.min(dragPosition.y, target.parent.height - target.height);
                    }
                    if (debug) {//debug 模式下，日志信息
                        const stage = target.stage;
                        if (stage) {
                            stage.inputLog({
                                code: ComponentEvent.DRAG_MOVE,
                                level: 'info',
                                target: target,
                                data: [target.parent, dragPosition.x, dragPosition.y],
                                action: e.type,
                                message: 'parent,move pos'
                            });
                        }

                    }
                    this._dragState = 2;
                    target.setPosition(this._dragPosition.x, this._dragPosition.y);
                    this._actionData = {type:ComponentEvent.DRAG_MOVE,data: e.data,offset};
                    target.emit(ComponentEvent.DRAG_MOVE, target, e);
                }

            };

            this.drag.onDragEnd = (e: InteractionEvent) => {
                if (this.dragging) {
                    this.dragging = false;
                    //如果没有可被放置掉落的容器，0秒后返回原容器
                    TickerShared.addOnce(() => {
                        if (this.target == undefined) {
                            return;
                        }
                        //dragBounces
                        const target = this.target;
                        const parent = this.$targetParent;
                        target.interactive = true;
                        target.interactiveChildren = this.oldInteractiveChildren;
                        const item = DragDropController.getItem(target);
                        const dragPosition = this._dragPosition;
                        target.emit(ComponentEvent.DRAG_END_BEFORE, target, e);
                        if (item && parent) {
                            if (target.parent !== parent && target.parent) {
                                parent.container.toLocal(target.container.position, target.container.parent, dragPosition);
                                parent.addChild(target);
                                target.x = dragPosition.x;
                                target.y = dragPosition.y;
                            }
                            if (this.dragBounces && this._containerStart) {
                                target.x = this._containerStart.x;
                                target.y = this._containerStart.y;
                            }
                        }
                        if (debug) {//debug 模式下，日志信息
                            const stage = target.stage;
                            if (stage) {
                                stage.inputLog({
                                    code: ComponentEvent.DRAG_END,
                                    level: 'info',
                                    target: target,
                                    data: [target.parent, target.x, target.y],
                                    action: e.type,
                                    message: 'parent,end pos'
                                });
                            }

                        }
                        if(target.stage && target.stage.app){
                            target.stage.app.view.style.cursor = target.style.cursor;
                        }
                        this._dragState = 3;
                        e.data.tiltX = dragPosition.x;
                        e.data.tiltY = dragPosition.y;
                        this._actionData = {type:ComponentEvent.DRAG_END,data: e.data};
                        target.emit(ComponentEvent.DRAG_END, target, e);
                    })
                }
                

            };
        }
    }

    protected clearDroppable() {
        if (this.target == undefined) {
            return;
        }
        const target = this.target;
        if (this.dropInitialized) {
            this.dropInitialized = false;
            target.container.off(TouchMouseEventEnum.mouseup, this.onDrop, this);
            target.container.off(TouchMouseEventEnum.touchend, this.onDrop, this);
        }
    }

    protected initDroppable() {
        if (this.target == undefined) {
            return;
        }
        const target = this.target;
        if (!this.dropInitialized) {
            this.dropInitialized = true;
            const container = target.container;
            //self = this;
            container.interactive = true;
            container.on(TouchMouseEventEnum.mouseup, this.onDrop, this);
            container.on(TouchMouseEventEnum.touchend, this.onDrop, this);

        }
    }

    private onDrop(e: InteractionEvent) {

        if (this.target == undefined) {
            return;
        }
        if(this.target.stage && this.target.stage.syncInteractiveFlag){
            (SyncManager.getInstance(this.target.stage) as SyncManager).collectEvent(e, this.target);
        }
        
        const target = this.target;
        const item = DragDropController.getEventItem(e, this.dropGroup);
        if (item && item.dragOption.dragging) {
            item.dragOption.dragging = false;
            item.interactive = true;
            const  dragPosition = this._dragPosition;
            const parent = item.dragOption.droppableReparent !== undefined ? item.dragOption.droppableReparent : target;
            if (parent) {
                parent.container.toLocal(item.container.position, item.container.parent, dragPosition);
                item.x = dragPosition.x;
                item.y = dragPosition.y;
                if (parent != item.parent) {
                    parent.addChild(item);
                    parent.emit(ComponentEvent.DROP_TARGET, parent, item, e);
                }
                item.dragOption.$targetParent = parent;
            }
            if (debug) {//debug 模式下，日志信息
                const stage = target.stage;
                if (stage) {
                    stage.inputLog({
                        code: ComponentEvent.DRAG_TARGET,
                        level: 'info',
                        target: item,
                        data: [target.parent, item.x, item.y],
                        action: e.type,
                        message: 'drag target,item pos'
                    });
                }

            }
            if(target.stage && target.stage.app){
                const interaction = (target.stage.app.renderer as vf.Renderer).plugins.interaction;
                (interaction as any).cursor = target.style.cursor;
            }
            this._dragState = 4;
            e.data.tiltX = dragPosition.x;
            e.data.tiltY = dragPosition.y;
            item.dragOption._actionData = {type:ComponentEvent.DRAG_TARGET,data: e.data,path:getDisplayPathById(parent)};
            item.emit(ComponentEvent.DRAG_TARGET, item, e);
            
        }
    }

    /**
     * 同步数据临时的方法
     */
    private executeDrop(e: InteractionEvent,parsentPath: string[]){
        if(this.target && this.target.stage && parsentPath) {
            const parent = this.target.stage.getChildByPath(parsentPath);
            const item = this.target;
            item.dragOption.dragging = false;
            item.interactive = true;
            if (parent) {
                item.x = this._dragPosition.x;
                item.y = this._dragPosition.y;
                if (parent != item.parent) {
                    parent.addChild(item);
                    parent.emit(ComponentEvent.DROP_TARGET, parent, item, e);
                }
                this.$targetParent = parent as DisplayObject;
                item.emit(ComponentEvent.DRAG_TARGET, item, e);
            }
        }
    }

    load() {
        //
    }

    release() {

        this.clearDraggable();
        this.clearDroppable();

        if (this.target) {
            this.target.plugs.delete(UIBaseDrag.key);
            this.target = undefined;
            this.$targetParent = undefined;
            this.dragContainer = undefined;
        }
    }

}