/**
 * 用于同步输入事件
 * by ziye
 */

import { InteractionEvent } from "../event/InteractionEvent";
import { getDisplayPathById, debug} from "../utils/Utils";
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
        if(stage.syncInteractiveFlag){
            const systemEvent = stage.getSystemEvent();
            if(systemEvent){
                this.sendCustomEvent = this.sendCustomEvent.bind(this);
                systemEvent.on('sendCustomEvent', this.sendCustomEvent);
            }
        }
        TickerShared.addOnce(this.init, this);
    }

    /**
     * 对应一个stage有一个syncManager的实例
     */
    public static getInstance(stage: Stage | undefined) {
        if (stage) {
            return stage.syncManager;
        }
    }

    public resumeStatusFlag = false;  //是否正在恢复状态
    public offsetTime = 0; //本地Date.now()与中心服务器的差值
    private _resetTimeFlag = false; //是否对齐过时间
    private _crossTime = 0; //穿越的时间
    private _initTime = 0; //初始化成功时的时间
    private _interactionEvent: InteractionEvent; //交互event对象
    private _obj: DisplayObjectAbstract | undefined; //相应交互的obj
    private _stage: Stage; //当前stage
    private _lostEvent: any[] = []; //节流中的event
    private _throttleFlag = false; //节流状态
    private _throttleTimer: any = null; //节流时间函数
    private _evtDataList: any[] = []; //历史信令整理后的数组
    private _lastMoveEvent: any[] = []; //上一个move事件，用于稀疏，如果是连续的move操作，则使用相同的code，这样信令服务器会merge掉之前的move操作，在恢复时会拿到更少的数据量
    private _readystate: number = 1;
    /**
     * 开始同步
     */
    public init() {
        this._initTime = performance.now();
    }

    public release(){
        this._readystate = 0;
        const stage = this._stage;
        if(stage.syncInteractiveFlag){
            const systemEvent = stage.getSystemEvent();
            if(systemEvent){
                systemEvent.off('sendCustomEvent', this.sendCustomEvent);
            }
        }
    }

    /**
     * 收集交互事件
     */
    public collectEvent(e: InteractionEvent, obj: DisplayObjectAbstract) {
        if (!this._stage.syncInteractiveFlag || e.signalling) return; //不需要同步，或者已经是信令同步过来的，不再做处理
        const eventData: any = this.createEventData(e, obj);

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
     * 收集自定义事件
     * data
     */
    public sendCustomEvent(customData: any) {
        const eventData: any = {};
        const time = this.currentTime();
        eventData.code = "syncCustomEvent_" + vf.utils.uid() + time;
        eventData.time = time;
        eventData.data = JSON.stringify(customData);
        this.sendEvent(eventData);
    }

    /**
     * 接收操作
     * @signalType 信令类型  live-实时信令   history-历史信令
     */
    public receiveEvent(eventData: any, signalType = "live") {
        if (signalType == "history") {
            this.dealHistoryEvent(eventData);
        } else {
            if (!this._resetTimeFlag) {
                this._resetTimeFlag = true;
                //判断是否需要穿越到过去,忽略500ms的网络延时
                if (eventData.time < this.currentTime() - 500) {
                    this.resetStage();
                }
            }
            this.parseEventData(eventData);
        }
    }

    /**
     * 获取当前时间
     */
    private currentTime() {
        const time = performance.now() - this._initTime - this.offsetTime + this._crossTime;
        return Math.floor(time);
    }

    /**
     * 构造一个新的e，用于同步，数据要尽量精简
     */
    private createEventData(e: InteractionEvent, obj: DisplayObjectAbstract) {
        const event: any = {};
        event.type = e.type;
        event.path = getDisplayPathById(obj);
        const data: any = {};
        event.data = data;
        data.identifier = e.data.identifier;
        data.global = { x: Math.floor(e.data.global.x), y: Math.floor(e.data.global.y) };
        //!!!important: e.data.originalEvent  不支持事件继续传递
        const time = this.currentTime();
        const eventData = {
            code: "syncInteraction_" + vf.utils.uid() + time,
            time: time,
            data: JSON.stringify(event),
        }
        //稀疏move，将相同的一组move使用相同的code
        if(e.type === TouchMouseEventEnum.mousemove || e.type === TouchMouseEventEnum.touchmove){
            if(this._lastMoveEvent.length > 0){
                const lastEvent = this._lastMoveEvent[0];
                if(lastEvent.type == event.type && lastEvent.obj == obj){
                    //使用相同的code
                    eventData.code = lastEvent.code;
                }
            }
            this._lastMoveEvent[0] = {
                type: e.type,
                obj: obj,
                code: eventData.code
            }
        }
        else{
            this._lastMoveEvent = [];
        }
        return eventData;
    }

    /**
     * 发送操作
     */
    private sendEvent(eventData: any) {
        const stage = this._stage;
        //派发至uistage
        stage.emit("sendSyncEvent", eventData);
        //派发至player
        const msg = {
            level: 'command',
            code: 'syncEvent',
            data: eventData
        }
        stage.sendToPlayer(msg);
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

    private resetStage() {
        const stage = this._stage as any;
        if (stage.reset) {
            stage.reset();
        } else {
            console.error("当前stage没有reset方法，使用输入同步需要自定义reset方法用于场景重置!!!");
        }
        this._initTime = performance.now();
    }

    /**
     * 解析收到的event
     */
    private parseEventData(eventData: any) {
        const stage = this._stage;
        const time = eventData.time;
        //判断信令时间，是否需要向后穿越
        const currentTime = this.currentTime();
        if (currentTime < time) {
            const druation = time - currentTime;
            this.crossTime(druation);
        }
        if (eventData.code.indexOf("syncInteraction_") == 0) {
            const event = JSON.parse(eventData.data);
            this._interactionEvent.signalling = true;
            this._interactionEvent.type = event.type;
            const data = event.data;
            this._interactionEvent.data.identifier = data.identifier;
            this._interactionEvent.data.global.set(data.global.x, data.global.y);
            this._obj = stage.getChildByPath(event.path) as DisplayObjectAbstract;
            this._obj.container.emit(this._interactionEvent.type, this._interactionEvent);
        } else if (eventData.code.indexOf("syncCustomEvent_") == 0) {
            //自定义事件
            const data = JSON.parse(eventData.data);
            const systemEvent = stage.getSystemEvent();
            if(systemEvent){
                systemEvent.emit('receiveCustomEvent', data);
            }
            else{
                stage.emit("receiveCustomEvent", data);
            }
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
    }

    /**
     * 处理历史信令，将历史输入事件按时间顺序放置到一个数组
     * @param eventData
     */
    private dealHistoryEvent(eventData: any) {
        if (!eventData) return;
        this._evtDataList = [];
        for (const key in eventData) {
            if(key.indexOf('syncInteraction_') == 0 || key.indexOf('syncCustomEvent_') == 0){
                this._evtDataList.push(eventData[key]);
            }
        }
        this._evtDataList.sort((a, b) => {
            return a.time - b.time;
        });

        this.resumeStatus();
    }

    /**
     * 恢复状态
     */
    private resumeStatus() {
        //恢复过程只需要计算状态，不需要渲染
        if (this._evtDataList.length == 0) return;
        const start = performance.now();
        this.resetStage();
        setTimeout(() => {
            if(this._readystate === 0) return;
            const resetTime = performance.now();
            this.resumeStatusFlag = true;
            this._stage.renderable = false;
            for (let i = 0; i < this._evtDataList.length; ++i) {
                //执行操作
                this.parseEventData(this._evtDataList[i]);
            }
            this._stage.renderable = true;
            this.resumeStatusFlag = false;
            const now = performance.now();
            if(debug){
                console.log(`恢复总耗时：${now - start}, reset耗时: ${resetTime - start}, 执行操作耗时：${now - resetTime}}`);
            }
        }, 120);
    }
}
