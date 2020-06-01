/**
 * 用于同步输入事件
 * by ziye
 */

import { InteractionEvent } from "../event/InteractionEvent";
import { deepCopy, getDisplayPathById } from "../utils/Utils";
import { DisplayObject, Stage } from "../UI";
import { DisplayObjectAbstract } from "../core/DisplayObjectAbstract";
import { TouchMouseEventEnum } from "./TouchMouseEventEnum";

export class SyncManager {
    public constructor(stage: Stage) {
        this._interactionEvent = new InteractionEvent();
        if(!this._interactionEvent.data){
            this._interactionEvent.data = new vf.interaction.InteractionData();
        }
        this._stage = stage;

        //测试
        window.addEventListener('message', (event)=> {
            this.receiveEvent(event.data);
        }, false)
    }

    /**
     * 对应一个stage有一个syncManager的实例
     */
    public static getInstance(stage: Stage | undefined){
        if(stage){
            return stage.syncManager;
        }
    }

    private _interactionEvent: InteractionEvent;  
    private _obj: DisplayObjectAbstract | undefined;
    private _stage: Stage;
    private _lostEvent: string[] = []; 
    private _throttleFlag: boolean = false;
    private _throttleTimer: any = null;

    /**
     * 收集交互事件
     */
    public collectEvent(e: InteractionEvent, obj: DisplayObject) {
        if (!this._stage.syncInteractiveFlag || e.signalling) return; //不需要同步，或者已经是信令同步过来的，不再做处理
        let eventData: string = this.createEventData(e, obj);
        
        if(e.type === TouchMouseEventEnum.mousemove || e.type === TouchMouseEventEnum.touchmove){
            this.throttle(eventData);
        }
        else{
            //首先把之前未发送的move补发出去
            if(this._lostEvent.length > 0){
               clearTimeout(this._throttleTimer);
               this.sendEvent(this._lostEvent[0]);
               this._lostEvent = [];
               this._throttleFlag = false;
            }
            this.sendEvent(eventData);
        }
    }

    /**
     * 接收操作
     */
    public receiveEvent(eventData: string) {
        this.parseEventData(eventData);
    }

    /**
     * 构造一个新的e，用于同步，数据要尽量精简
     */
    private createEventData(e: InteractionEvent, obj: DisplayObject) {
        let event: any = {};
        event.type = e.type;
        event.path = getDisplayPathById(obj);
        let data: any = {};
        event.data = data;
        data.identifier = e.data.identifier;
        data.global = { x: e.data.global.x, y: e.data.global.y };
        //!!!important: e.data.originalEvent  不支持事件继续传递
        return JSON.stringify(event);
    }

    /**
     * 发送操作
     */
    private sendEvent(eventData: string) {
        console.log('send sync event: ', eventData);
        //测试，iframe
        if(window.parent !== window){
            window.parent.postMessage(eventData, '*');
        }
    }

    private throttleUpdate(){
        this._throttleFlag = false;
        if(this._lostEvent.length > 0){
            this.throttle(this._lostEvent[0]);
            this._lostEvent = [];
        }
    }

    private throttle(eventData: string){
        if(!this._throttleFlag){
            this._throttleFlag = true;
            this.sendEvent(eventData);
            this._throttleTimer = setTimeout(() => {
                this.throttleUpdate();
            }, 100);
        }
        else{
            this._lostEvent = [];
            this._lostEvent.push(eventData);
        }
    }

    /**
     * 解析收到的event
     */
    private parseEventData(eventData: string){
        let event = JSON.parse(eventData);
        this._interactionEvent.signalling = true;
        this._interactionEvent.type = event.type;
        let data = event.data;
        this._interactionEvent.data.identifier = data.identifier;
        this._interactionEvent.data.global.set(data.global.x, data.global.y);
        this._obj = this._stage.getChildByPath(event.path) as DisplayObjectAbstract;
        this._obj.container.emit(this._interactionEvent.type, this._interactionEvent);
    }
}
