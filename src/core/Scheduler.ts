import { TickerShared } from "./Ticker";
import { EventType } from "../event/EventType";
import { EventLevel } from "../event/EventLevel";

/**
 * Schedule anything
 *
 * @author 8088
 */

export class Scheduler extends vf.utils.EventEmitter{
    public get id(): number {
        return this._id;
    }

    public static setInterval(time: number, listener: () => void): Scheduler {
        const scheduler: Scheduler = new Scheduler(Infinity, time);
        scheduler.addListener(EventType.TICK, listener);
        return scheduler;
    }

    public static setTimeout(time: number, listener: () => void): Scheduler {
        const scheduler: Scheduler = new Scheduler(time, Infinity);
        scheduler.addListener(EventType.END, listener, scheduler);
        return scheduler;
    }


    public _interval = 0;
    public _timeout = Infinity;
    private _id = Math.random();
    private _running = false;
    private _pausing = false;
    private _totalDuration = 0;
    private _intervalDuration = 0;

    constructor(timeout = Infinity, interval = 0) {
        super();
        this._timeout = timeout;
        this._interval = interval;
        this.restart();
    }

    public restart(): void {
        this._totalDuration = 0;
        this._intervalDuration = 0;
        this._pausing = false;
        if(!this._running){
            this._running = true;
            TickerShared.add(this.run, this);
        }
    }

    public stop(): void{
        if(this._running){
            this._running = false;
            TickerShared.remove(this.run, this);
        }
    }

    public pause(): void{
        if (this._running && !this._pausing) {
            this._pausing = true;
            TickerShared.remove(this.run, this);
        }
    }

    public resume(): void{
        if(this._pausing){
            TickerShared.add(this.run, this);
        }
    }

    private run(deltaTime: number): boolean{
        this._totalDuration += TickerShared.deltaMS;
        this._intervalDuration += TickerShared.deltaMS;
        if(this._intervalDuration >= this._interval){
            const info = {
                code: EventType.TICK,
                level: EventLevel.STATUS,
                target: this,
                dt: this._intervalDuration,  //by ziye 返回执行间隔
                elapsed: this._totalDuration,
            };
            this.emit(EventType.TICK, info);
            this._intervalDuration = 0;
        }
        if(this._totalDuration >= this._timeout){
            this.stop();
            const info = {
                code: EventType.END,
                level: EventLevel.STATUS,
                target: this,
                dt: this._intervalDuration,  //by ziye 返回执行间隔
                elapsed: this._totalDuration,
            };
            this.emit(EventType.END, info);
        }
        return false;
    }

}