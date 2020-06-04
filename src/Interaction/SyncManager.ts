/**
 * 用于同步输入事件
 * by ziye
 */

import { InteractionEvent } from "../event/InteractionEvent";
import { getDisplayPathById } from "../utils/Utils";
import { Stage } from "../UI";
import { DisplayObjectAbstract } from "../core/DisplayObjectAbstract";
import { TouchMouseEventEnum } from "./TouchMouseEventEnum";
import { TickerShared } from "../core/Ticker";

export class SyncManager {
    public constructor(stage: Stage) {
        this._interactionEvent = new InteractionEvent();
        if (!this._interactionEvent.data) {
            this._interactionEvent.data = new vf.interaction.InteractionData();
        }
        this._stage = stage;
    }

    /**
     * 对应一个stage有一个syncManager的实例
     */
    public static getInstance(stage: Stage | undefined) {
        if (stage) {
            return stage.syncManager;
        }
    }

    public offsetTime: number = 0; //本地Date.now()与中心服务器的差值
    private _crossTime: number = 0; //穿越的时间
    private _initTime: number = 0; //初始化成功时的时间
    private _interactionEvent: InteractionEvent; //交互event对象
    private _obj: DisplayObjectAbstract | undefined; //相应交互的obj
    private _stage: Stage; //当前stage
    private _lostEvent: any[] = []; //节流中的event
    private _throttleFlag: boolean = false; //节流状态
    private _throttleTimer: any = null; //节流时间函数
    private _evtDataList: any[] = [];  //历史信令整理后的数组

    /**
     * 开始同步
     */
    public init() {
        this._initTime = performance.now();
    }

    /**
     * 收集交互事件
     */
    public collectEvent(e: InteractionEvent, obj: DisplayObjectAbstract) {
        if (!this._stage.syncInteractiveFlag || e.signalling) return; //不需要同步，或者已经是信令同步过来的，不再做处理
        let eventData: any = this.createEventData(e, obj);

        if (e.type === TouchMouseEventEnum.mousemove || e.type === TouchMouseEventEnum.touchmove) {
            this.throttle(eventData);
        } else {
            //首先把之前未发送的move补发出去
            if (this._lostEvent.length > 0) {
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
     * @signalType 信令类型  live-实时信令   history-历史信令
     */
    public receiveEvent(eventData: any, signalType: string = "live") {
        console.log('receive syncEvent: ', eventData);
        if (signalType == "history") {
            this.dealHistoryEvent(eventData);
        } else {
            this.parseEventData(eventData);
        }
    }

    private currentTime() {
        let time = performance.now() - this._initTime - this.offsetTime + this._crossTime;
        return Math.floor(time);
    }

    /**
     * 构造一个新的e，用于同步，数据要尽量精简
     */
    private createEventData(e: InteractionEvent, obj: DisplayObjectAbstract) {
        let event: any = {};
        event.type = e.type;
        event.path = getDisplayPathById(obj);
        let data: any = {};
        event.data = data;
        data.identifier = e.data.identifier;
        data.global = { x: Math.floor(e.data.global.x), y: Math.floor(e.data.global.y) };
        //!!!important: e.data.originalEvent  不支持事件继续传递
        let time = this.currentTime();
        return {
            code: "interaction_" + time,
            time: time,
            data: JSON.stringify(event)
        }
    }

    /**
     * 发送操作
     */
    private sendEvent(eventData: any) {
        this._stage.emit('sendSyncEvent', eventData);
    }

    /**
     * 更新节流状态
     */
    private throttleUpdate() {
        this._throttleFlag = false;
        if (this._lostEvent.length > 0) {
            this.throttle(this._lostEvent[0]);
            this._lostEvent = [];
        }
    }

    /**
     * 节流，每100ms发送一次
     * @param eventData
     */
    private throttle(eventData: any) {
        if (!this._throttleFlag) {
            this._throttleFlag = true;
            this.sendEvent(eventData);
            this._throttleTimer = setTimeout(() => {
                this.throttleUpdate();
            }, 100);
        } else {
            this._lostEvent = [];
            this._lostEvent.push(eventData);
        }
    }

    private resetStage(){
        const stage = this._stage as any;
        if(stage.reset){
            stage.reset();
        }
        else{
            console.error("当前stage没有reset方法，使用输入同步需要自定义reset方法用于场景重置!!!");
        }
    }

    /**
     * 解析收到的event
     */
    private parseEventData(eventData: any) {
        let time = eventData.time;
        //判断信令时间，是否需要向后穿越
        let currentTime = this.currentTime();
        if (currentTime < time) {
            let druation = time - currentTime;
            this.crossTime(druation);
        }
        if(eventData.code.indexOf('interaction_') == 0){
            let event = JSON.parse(eventData.data);
            this._interactionEvent.signalling = true;
            this._interactionEvent.type = event.type;
            let data = event.data;
            this._interactionEvent.data.identifier = data.identifier;
            this._interactionEvent.data.global.set(data.global.x, data.global.y);
            this._obj = this._stage.getChildByPath(event.path) as DisplayObjectAbstract;
            this._obj.container.emit(this._interactionEvent.type, this._interactionEvent);
        }
        else{
            //非交互输入事件
        }
    }

    /**
     * 时间未到，需要穿越到未来
     */
    private crossTime(druation: number) {
        let resetRenderFlag = false;
        if (this._stage.renderable) {
            this._stage.renderable = false;
            resetRenderFlag = true;
        }
        TickerShared.crossingTime(druation);
        if (resetRenderFlag) {
            this._stage.renderable = true;
        }
        this._crossTime += druation;
        console.log('crossTime: ', druation);
    }

    /**
     * 处理历史信令，将历史输入事件按时间顺序放置到一个数组
     * @param eventData 
     */
    private dealHistoryEvent(eventData: any){
        if(!eventData) return;
        this._evtDataList = [];
        for(let key in eventData){
            this._evtDataList.push(eventData[key]);
        }
        this._evtDataList.sort((a,b)=>{
            return a.time - b.time;
        })

        this.resumeStatus();
    }
    
    /**
     * 恢复状态
     */
    private resumeStatus() {
        //恢复过程只需要计算状态，不需要渲染
        if (this._evtDataList.length == 0) return;
        this._initTime = performance.now();
        this.resetStage();

        this._stage.renderable = false;
        for (let i = 0; i < this._evtDataList.length; ++i) {
            let _eventData = this._evtDataList[i];
            //执行操作
            this.parseEventData(_eventData);
        }
        this._stage.renderable = true;
    }
}
