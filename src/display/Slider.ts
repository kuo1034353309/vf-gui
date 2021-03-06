import {DisplayObject} from "../core/DisplayObject";
import {Image as VfuiImage} from "./Image";
import * as Utils from "../utils/Utils";
import {DragEvent,InteractionEvent, ComponentEvent} from "../interaction/Index";
import { Tween } from "../tween/Tween";
import { Easing } from "../tween/Easing";

/**
 * 滑动条/进度条
 * 
 * @example let slider = new vf.gui.Slider();
 * 
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestSlider
 */
export class Slider extends DisplayObject{

    public constructor(){
        super();
        this.thumbImg.container.name = "thumbImg";
        this.thumbImg.fillMode = "scale";
        this.thumbImg.scale9Grid = [0,0,0,0];
        this.thumbImg.anchorX = 0.5;
        this.thumbImg.anchorY = 0.5;
        this.thumbImg.on(ComponentEvent.COMPLETE,this.onImgload, this);

        this.trackImg.container.name = "trackImg";
        this.trackImg.fillMode = "scale";
        this.trackImg.scale9Grid = [2,2,2,2];
        this.trackImg.style.width = "100%";
        this.trackImg.style.height = "100%";
        this.trackImg.on(ComponentEvent.COMPLETE,this.onImgload, this);

        this.tracklightImg.container.name = "tracklightImg";
        this.tracklightImg.fillMode = "scale";
        this.tracklightImg.scale9Grid = [2,2,2,2];
        //this.tracklightImg.on(ComponentEvent.COMPLETE,this.onImgload, this);

        this.addChild(this.trackImg);
        this.addChild(this.tracklightImg);
        this.addChild(this.thumbImg);

        this._thumbDrag.onDragPress = this.onPress.bind(this);
        this._thumbDrag.onDragStart = this.onDragStart.bind(this);
        this._thumbDrag.onDragMove = this.onDragMove.bind(this);
        this._thumbDrag.onDragEnd = this.onDragEnd.bind(this);

        this._trackDrag.onDragPress = this.onPress.bind(this);
    }
    /** 
     * 当前值 
     */
    protected _amt = 0;
    /**
     * 小数的保留位，0不保留
     * @default 0
     */
    protected _decimals = 0;

    protected _startValue = 0;
    protected _maxPosition = 0;
    protected _lastChange = 0;
    protected _lastChanging = 0;
    protected _localMousePosition = new vf.Point();

    /** 状态展示 */
    readonly trackImg = new VfuiImage();
    readonly thumbImg = new VfuiImage();
    readonly tracklightImg = new VfuiImage();

    protected _thumbDrag = new DragEvent(this.thumbImg);
    protected _trackDrag = new DragEvent(this.trackImg);

    /**
     * 当前值
     */
    public get value() {
        return Utils.Round(Utils.Lerp(this.minValue, this.maxValue, this._amt), this._decimals);
    }
    public set value(value: number) {
        this.valueSystem(value);
    }

    protected valueSystem(value = 0){
        this._amt = (Math.max(this.minValue, Math.min(this.maxValue, value)) - this.minValue) / (this.maxValue - this.minValue);
        this.invalidateDisplayList();
    }

    /**
     * 最小值
     */
    protected _minValue = 0;
    public get minValue() {
        return this._minValue;
    }
    public set minValue(value) {
        if(this._minValue === value){
            return;
        }
        this._minValue = value;
        this.invalidateDisplayList();
    }
    /**
     * 最大值
     */
    protected _maxValue = 100;
    public get maxValue() {
        return this._maxValue;
    }
    public set maxValue(value) {
        if(this._maxValue === value){
            return;
        }
        this._maxValue = value;
        this.invalidateDisplayList();
    }
    /**
     * 是否垂直,滑块方向
     */
    protected _vertical = false;
    public get vertical() {
        return this._vertical;
    }
    public set vertical(value) {
        if(this._vertical === value){
            return;
        }
        this._vertical = value;
        this.invalidateProperties();
    }
    /** 
     * 背景
     */
    protected _track?: string | number | vf.Texture | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
    public get track(){
        return this._track;
    }
    public set track(value) {
        if(value !== this._track){
            this._track = value;
            this.trackImg.src = value; 
        }
    }
    /** 
     * 手柄
     */
    protected _thumb?: string | number | vf.Texture | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
    public get thumb() {
        return this._thumb;
    }
    public set thumb(value) {
        if(value !== this._thumb){
            this._thumb = value;
            this.thumbImg.src = value; 
        }
    }
    /** 
     * 进度
     */
    protected _tracklight?: string | number | vf.Texture | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
    public get tracklight() {
        return this._tracklight;
    }
    public set tracklight(value) {
        if(value !== this._tracklight){
            this._tracklight = value;
            this.tracklightImg.src = value; 
        }
    }

    protected onImgload(){
        this.invalidateProperties();
    }


    protected updatePosition(soft?: boolean){

        let val = 0;
        const thumbImg = this.thumbImg;
        const tracklightImg = this.tracklightImg;

        if (this.vertical) {
            val = this.explicitHeight * this._amt;
            if (soft) {
                Tween.to({y:thumbImg.y,height:tracklightImg.height},{ y: val,height: val },300).easing(Easing.Linear.None)
                    .on(Tween.Event.update, (obj: any) => {
                       
                        thumbImg.y = obj.y;
                        //tracklightImg.height = obj.height;
                        tracklightImg.setSpeiteSize(undefined,obj.height);
                    }) .start();
            }
            else {
                thumbImg.y = val;
                tracklightImg.height = val;
            }
        }
        else {
            val = this.explicitWidth* this._amt;
            if (soft) {
                Tween.to({x:thumbImg.x,width:tracklightImg.width},{ x: val,width: val },300).easing(Easing.Linear.None)
                    .on(Tween.Event.update, (obj: any
                    ) => {
                        thumbImg.x = obj.x;
                        //tracklightImg.width = obj.width;
                        tracklightImg.setSpeiteSize(obj.width);
                    }) .start();
            }
            else {
                thumbImg.x = val;
                tracklightImg.width = val;
            }
        }
    }

    protected onPress (event: InteractionEvent,isPressed: boolean,dragEvent?: DragEvent) {   
        
        event.stopPropagation();
        if(this._trackDrag==dragEvent && this._trackDrag.id == event.data.identifier){
            if (isPressed){
                this.updatePositionToMouse(event.data.global, true);
            }    
        }
    }

    protected onDragStart (event: InteractionEvent) {
        if(this._thumbDrag.id == event.data.identifier){
            this._startValue = this._amt;
            this._maxPosition = this.vertical ? this.explicitHeight : this.explicitWidth;
        }
    }

    protected onDragMove (event: InteractionEvent,offset: vf.Point) {
        if(this._thumbDrag.id == event.data.identifier){
            this._amt = !this._maxPosition ? 0 : Math.max(0, Math.min(1, this._startValue + ((this.vertical ? offset.y : offset.x) / this._maxPosition)));
            this.triggerValueChanging();
            this.updatePosition();
        }else if(this._trackDrag && this._trackDrag.id == event.data.identifier){
            this.updatePositionToMouse(event.data.global, false);
        }

    }

    protected onDragEnd (event: InteractionEvent) {
        if(this._thumbDrag.id == event.data.identifier){
            this.triggerValueChange();
            this.updatePosition();
        }else if(this._trackDrag && this._trackDrag.id == event.data.identifier){
            this.triggerValueChange();
        }
    }
    protected updatePositionToMouse (mousePosition: vf.Point, soft: boolean) {
        this.trackImg.container.toLocal(mousePosition, undefined, this._localMousePosition, true);

        const newPos = this.vertical ? this._localMousePosition.y  : this._localMousePosition.x;
        const maxPos = this.vertical ? this.explicitHeight: this.explicitWidth ;
        this._amt = !maxPos ? 0 : Math.max(0, Math.min(1, newPos / maxPos));
        this.updatePosition(soft);
        this.triggerValueChanging();
    }

    protected triggerValueChange() {
        const value = this.value;
        this.emit(ComponentEvent.CHANGE,this, value,this._lastChange);
        if (this._lastChange != value) {
            this._lastChange = value;
        }
    }

    protected triggerValueChanging() {
        const value = this.value;
        this.emit(ComponentEvent.CHANGEING,this, value,this._lastChanging);
        if (this._lastChanging != value) {
            this._lastChanging = value;
        }
    }

    public updateLayout(){
        this.invalidateProperties();
    }
    
    protected commitProperties() {
        const thumbImg = this.thumbImg;
        const tracklightImg = this.tracklightImg;
        if (this.vertical) {
            thumbImg.y = this._amt;
            thumbImg.x = this.explicitWidth >> 1;
            tracklightImg.width =this.width;
            tracklightImg.height = this._amt * this.height;
        }else {
            thumbImg.x = this._amt;
            thumbImg.y = this.explicitHeight >> 1;
            tracklightImg.height =this.height;
            tracklightImg.width =  this._amt * this.width;
        }
    }

    protected updateDisplayList(unscaledWidth: number, unscaledHeight: number) { 
        this.commitProperties();
        this.updatePosition();
        super.updateDisplayList(unscaledWidth,unscaledHeight);
    }

    public release(){
        super.release();
        this.trackImg.release();
        this.thumbImg.release();
        this.tracklightImg.release();
    }
    
}
