import { DisplayObject } from "../core/DisplayObject";
import { IAudioOption } from "vf.js";
import { getSound } from "../utils/Utils";

/**
 * 音频组件
 * 
 * 准备完成 canplaythrough
 *
 * 播放事件 play
 *
 * 暂停事件 pause
 *
 * 错误事件 error
 *
 * 播放时间改变 timeupdate
 *
 * 播放完成 ended
 * 
 * @example let audio = new vf.gui.Audio();
 * 
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestLabel
 */
export class Audio extends DisplayObject {

    private audio?: vf.IAudio;

    private _src: any;
  
    private _autoplay: boolean = false;
    private _loop: boolean = false;
    private _playbackRate: number = 1;
    private _volume: number = 1;

    private stoping: any;
    public constructor() {
        super();
        if (this._src) this.initAudio();
    }

    private initAudio() {

        const o: IAudioOption = {
            autoplay: this._autoplay,
            loop: this._loop,
            playbackRate: this._playbackRate,
            volume: this._volume
        }
        
        this.audio = vf.AudioEngine.Ins().createAudio(this.uuid.toString(), this._src, o);
        /**
        * 需要上报的事件
        */
        this.audio.on("canplaythrough", (e: any) => {
            this.emit("canplaythrough", e)
        },this);
        this.audio.on("play", (e: any) => {
            this.emit("play", e)
        },this);
        this.audio.on("pause", (e: any) => {
            this.emit("pause", e)
        },this);
        this.audio.on("error", (e: any) => {
            this.emit("error", e)
        }),this;
        this.audio.on("timeupdate", (e: any) => {
            this.emit("timeupdate", e)
        });
        this.audio.on("ended", (e: any) => {
            this.emit("ended", e)
        },this);
    }

    //支持的参数们~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    /**
    * 设置src 支持3种 url base64 arraybuffer;
    */
    public set src(value) {
        const o = getSound(value);
        if(typeof(o) === "object" && o.url){
            this._src = o.url
        } else {
            this._src = value;
        }
        this.audio && this.dispose();
        this.invalidateProperties();
    }

    public get src() {
        return this._src;
    }

    public set autoplay(value) {
        this._autoplay = value;
    }

    public get autoplay() {
        return this._autoplay;
    }

    public set loop(value) {
        this._loop = value;
        if(this.audio){
            this.audio.loop = this._loop;
        }
    }

    public get loop() {
        if(this.audio){
            return this.audio.loop;
        }
        return false;
    }

    public set playbackRate(value) {
        this._playbackRate = value;
        if(this.audio){
            this.audio.playbackRate = this._playbackRate;
        }
    }

    public get playbackRate() {
        if(this.audio){
            return this.audio.playbackRate;
        }
        return 0;
    }

    public set volume(value) {
        this._volume = value;
        if(this.audio){
            this.audio.volume = this._volume;
        }
    }
    public get volume() {
        if(this.audio){
            return this.audio.volume;
        }
        return 0;
    }

    /*只读的属性们*/
    public get duration() {
        if(this.audio){
            return this.audio.duration;
        }
        return 0;
    }
    public get paused() {
        if(this.audio){
            return this.audio.paused;
        }
        return false;
    }

    /**
    * 支持的方法们~~~··~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    *    */
    /**
     * 声音播放接口
     *
     *  await sound.play()
     * @param {number} [time] - 声音延迟开始
     * @param {number} [offset] - 声音的开始偏移值
     * @param {number} [length] - 声音持续时间（以秒为单位）
     */

    public play(time?: number, offset?: number, length?: number) {
        //自动找到自己本体;

        this.audio && this.audio.play(time, offset, length);
    }

    /**
    * 停止声音
    * @param time (optional) X秒后停止声音。默认情况下立即停止
    */
    public stop(time?: number) {
        let that = this;
        this.audio && this.audio.stop(time);
        if(this.stoping)clearTimeout(this.stoping)
        if (time) {
            this.stoping = setTimeout(() => {
                that.emit("stop", that)
            }, time);
        } else {
            this.emit("stop", this);
        }

    }
    /**
    * 暂停声音
    */
    public pause() {
        this.audio && this.audio.pause();
    }
    /**
    * 释放
    */
    public dispose() {
        if (this.audio) {
            this.audio.removeAllListeners();
            this.audio.dispose();
        }
    }

    /**
    * 各种可取参数.~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    */
    public get isPlaying() {
        return this.audio._isPlaying;
    }
    protected commitProperties() {
        this.initAudio();
    }
}
