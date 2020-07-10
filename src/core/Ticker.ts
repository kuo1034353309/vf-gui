import { TilingSprite } from "vf.js";

class Ticker extends vf.Ticker {
    public constructor(){
        super();
    }

    /**
     * 时间穿越， 单位ms
     * @param duration 
     */
    public crossingTime(duration: number){
        let deltaTime = (this as any)._minElapsedMS;  //帧间隔
        while(duration > 0){
            duration -= deltaTime;
            if(duration < 0){
                deltaTime += duration;
            }
            const head = (this as any)._head; //？？
            let listener = head.next;
            while (listener)
            {
                this.deltaMS = deltaTime;
                listener = listener.emit(deltaTime * vf.settings.TARGET_FPMS);
            }
        }
    }
}

export const TickerShared = new Ticker();
TickerShared.autoStart = false;
TickerShared.maxFPS = 30;


