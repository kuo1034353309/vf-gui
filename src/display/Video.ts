import { DisplayObject } from "../core/DisplayObject";
import { componentToHex, getSource } from "../utils/Utils";
import { Point, resources } from "vf.js";
import { objectPoolShared } from "src/utils/ObjectPool";
/**
 * 播放器组件
 * 
 */
export class Video extends DisplayObject {

    private _video:HTMLVideoElement;  
    
    private _src:any; 
    private _poster:any;    
    protected _canvasBounds: { top: number; left: number; width: number; height: number } | undefined;
    protected _lastRenderer: vf.Renderer | undefined;
    protected _resolution = 1; 
    public constructor() {
        super();
        
        const video = this._video = document.createElement('video');
        this._video.id = this.uuid.toString();
        document.body.appendChild(this._video);
       

        // this.container.isEmitRender = true;
        // this.container.on("renderChange",this.updateSystem,this);
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

        this.updateSystem();
        this._canvasBounds = this._getCanvasBounds();
        const cb = this._canvasBounds;
        const transform = this._vfMatrixToCSS(this._getDOMRelativeWorldTransform());
        if(cb){
          this.updatePostion(cb.top, cb.left, transform, this.container.worldAlpha);
        }
        //container 的全局左边的 x , y赋值给 this._video
        // let stageContainer = this.container;
        // if(this.stage){
        //     stageContainer = this.stage.container;
        // }
        // let pos = stageContainer.toGlobal(new vf.Point(0,0));
        // let videoStyle = this._video.style;
        // videoStyle.left = pos.x + "px";
        // videoStyle.top = pos.y + "px";
    }

    private  updatePostion(top: string | number, left: string | number, transform: string, opacity?: string | number) {
        this._video.style.top = top + 'px'
        this._video.style.left = left + 'px'
        this._video.style.transform = transform;
        if (opacity)
            this._video.style.opacity = opacity.toString();
    }

    private updateSystem(){
        if(this.stage){
            let renderer = this.stage.app.renderer as vf.Renderer;
            this._resolution = renderer.resolution;
            this._lastRenderer = renderer;
        }
  
    }

    private _getCanvasBounds() {
        if (this._lastRenderer) {
            const rect = this._lastRenderer.view.getBoundingClientRect();
            const bounds = { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
            bounds.left += window.scrollX;
            bounds.top += window.scrollY;
            return bounds;
        }
        return undefined;
    }

    private _vfMatrixToCSS(m: any) {
        return 'matrix(' + [m.a, m.b, m.c, m.d, m.tx, m.ty].join(',') + ')';
    }

    private _getDOMRelativeWorldTransform() {
        if (this._lastRenderer) {
            const canvasBounds = this._lastRenderer.view.getBoundingClientRect();
            const matrix = this.container.worldTransform.clone();

            matrix.scale(this._resolution, this._resolution);
            matrix.scale(canvasBounds.width / this._lastRenderer.width,
                canvasBounds.height / this._lastRenderer.height)
            return matrix;
        }

    }

    /**
     * 支持的参数们~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
     */
    
    //设置src
    public get src():number|string {
        return this._src;
    }
    public set src(value:number|string) {
        if(!this._video){
            return;
        }
        if(typeof(value) === "number"){
            let source = getSource(value);
            this._src = source.url;
        }else{
            this._src = value;
        }
        this._video && (this._video.src = this._src);
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
        value = value>1?1:value;
        value = value<0?0:value;
        this._video && (this._video.volume = value);
    }

    public get poster() {
        return this._poster;
        throw new Error("Video is undefined!");
    }
    public set poster(value:number|string) {
        if(!this._video){
            return;
        }
        if(typeof(value) === "number"){
            let source = getSource(value);
            this.poster = source?source.textureCacheIds[1]:"";
        }else{
            this._poster = value;
        }
        this._video && (this._video.poster = this._poster);
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


    public release() {
        super.release();
        this._src = null;
        this._poster = null;
        this._canvasBounds = undefined;
        this._lastRenderer = undefined;
        this._resolution = 1;
        if(!this._video){
            return;
        }
        const video = this._video;
        let func = (evtStr:string)=>{
            video.removeEventListener(evtStr, (e: any) => {
                this.emit(evtStr, e);
            });
        }
         /**
        * 需要移除的事件
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

        document.body.removeChild(this._video);
        
    }
}

