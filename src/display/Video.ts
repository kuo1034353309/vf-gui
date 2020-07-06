import { DisplayObject } from "../core/DisplayObject";
import { componentToHex, getSource } from "../utils/Utils";
import { Point } from "vf.js";
/**
 * 播放器组件
 * 
 */
export class Video extends DisplayObject {

    private _video:HTMLVideoElement;  
    
    private _src:any;       
    public constructor() {
        super();
        
        const video = this._video = document.createElement('video');
        this._video.id = this.uuid.toString();
        document.body.appendChild(this._video);
       
        this._video.style.position = "absolute";
        this._video.controls = true;
        let func = (evtStr:string)=>{
            video.addEventListener(evtStr, (e: any) => {
                this.emit(evtStr, e);
            });
        }
         /**
        * 需要上报的事件
        */
       //浏览器可以播放媒体文件了，但估计没有足够的数据来支撑播放到结束，不需要停止缓存更多的内容
        func("canplay");
        //浏览器估算可以播放到结束，不需要停止缓存更多的内容。
        func("canplaythrough");
        //渲染完成
        func("complete");
        //视频已经到达结束点
        func("ended");
        //首帧已经加载
        func("loadeddata");
        //duration 属性的值改变时触发
        func("durationchange");
    }

    protected updateDisplayList(unscaledWidth: number, unscaledHeight: number) {

        super.updateDisplayList(unscaledWidth,unscaledHeight);

        //container 的全局左边的 x , y赋值给 this._video
        let stageContainer = this.container;
        if(this.stage){
            stageContainer = this.stage.container;
        }
        let pos = stageContainer.toGlobal(new vf.Point(0,0));
        let videoStyle = this._video.style;
        videoStyle.left = pos.x + "px";
        videoStyle.top = pos.y + "px";
    }

    /**
     * 支持的参数们~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     */
    
    //设置src
    public get src():number | string {
        return this._src;
    }
    public set src(value:number | string) {
        this._src = value;
        this._video && (this._video.src = getSource(value));
    }

    public get controls():boolean{
        if(this._video){
            return this._video.controls;
        }
        throw new Error("Video is undefined!");
    }
    public set controls(boo:boolean){
        this._video && (this._video.controls = boo);
    }

    public get width():number{
        if(this._video){
            return this._video.width;
        }
        return 0;
    }
    public set width(value:number){
        this._video && (this._video.width = value);
    }

    public get height():number{
        if(this._video){
            return this._video.height;
        }
        return 0;
    }
    public set height(value:number){
        this._video && (this._video.height = value);
    }

    public get loop() {
        if(this._video){
            return this._video.loop;
        }
        return false;
    }
    public set loop(value:boolean) {
        this._video && (this._video.loop = value);
    }

    public get posterUrl() {
        if(this._video){
            return this._video.poster;
        }
        throw new Error("Video is undefined!");
    }
    public set posterUrl(value:string){
        this._video && (this._video.poster = value);
    }

    //静音
    public get muted():boolean{
        if(this._video){
            return this._video.muted;
        }
        throw new Error("Video is undefined!");
    }
    public set muted(boo:boolean){
        this._video && (this._video.muted = boo);
    }

    public get volume() {
        if(this._video){
            return this._video.volume;
        }
        return 0;
    }
    public set volume(value) {
        this._video && (this._video.volume = value);
    }

    public get poster() {
        if(this._video){
            return this._video.poster;
        }
        throw new Error("Video is undefined!");
    }
    public set poster(value) {
        this._video && (this._video.poster = value);
    }

    //播放位置
    public get currentTime():number{
        if(this._video){
            return this._video.currentTime;
        }
        return 0;
    }
    public set currentTime(value:number){
        this._video && (this._video.currentTime = value);
    }


    /** 
     * 只读的属性们~~~~~~~~~~~~~~~~
     * */ 
    public get duration() {//视频长度
        if(this._video){
            return this._video.duration;
        }
        return 0;
    }
    


    /**
    * 支持的方法们~~~··~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    **/
    public play(){
        if(this._video){
            this._video.play();
            return;
        }
        throw new Error("Video is undefined!");
    }

    public pause(){
        this._video && this._video.pause();
    }

    

    //进入全屏
    public requestFullScreen() {
        var de:any = this._video;
        if (de.requestFullscreen) {
            de.requestFullscreen();
        } else if (de.mozRequestFullScreen) {
            de.mozRequestFullScreen();
        } else if (de.webkitRequestFullScreen) {
            de.webkitRequestFullScreen();
        } else if(de.webkitEnterFullScreen){
            de.webkitEnterFullScreen();
        }
    }
    //退出全屏
    public exitFullscreen() {
        var de:any = this._video;
        if (de.exitFullscreen) {
            de.exitFullscreen();
        } else if (de.mozCancelFullScreen) {
            de.mozCancelFullScreen();
        } else if (de.webkitCancelFullScreen) {
            de.webkitCancelFullScreen();
        } else if(de.webkitExitFullScreen){
            de.webkitExitFullScreen();
        }
    }
}

