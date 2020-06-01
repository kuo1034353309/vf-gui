import {shared as TickerShared} from "./Ticker";
import { DisplayLayoutAbstract } from "./DisplayLayoutAbstract";
import { DisplayObject } from "./DisplayObject";
import validatorShared from "./DisplayLayoutValidator";
import { SyncManager } from "../Interaction/syncManager";

/**
 * UI的舞台对象，展示所有UI组件
 *
 * @class 
 * @param width {Number} 舞台宽度
 * @param height {Number} 舞台高度
 */
export class Stage extends DisplayLayoutAbstract{


    public constructor(width: number, height: number,app?: vf.Application) {
        super(); 
        this.width = width;
        this.height = height;
        this._stageWidth = width;
        this._stageWidth = height;
        this.setActualSize(width,height);
        this.container.name = "Stage";
        this.container.hitArea = new vf.Rectangle(0, 0, width, height);
        this.container.interactive = true;
        this.container.interactiveChildren = true;
        this.initialized = true;
        this.$nestLevel = 1;
        this.app = app;
        this.syncManager = new SyncManager(this);
    }

    public app?: vf.Application;
    public _stageWidth = 0;//调整缩放后的值
    public _stageHeight = 0;//调整缩放后的值
    public syncManager: SyncManager;
    /**
     * 是否组织原始数据继续传递
     */
    public originalEventPreventDefault = false;
    /**
     * 是否同步交互事件
     */
    public syncInteractiveFlag = true; //TODO:默认false

    public get stageWidth(){
        return this._stageWidth;
    }

    public get stageHeight(){
        return this._stageHeight;
    }

    public get scaleX() {
        return  this.container.scale.x;
    }

    public set scaleX(value: number) {
        this.container.scale.x = value;
        this._stageWidth = value * this.width;
    }

    public get scaleY() {
        return this.container.scale.y;
    }

    public set scaleY(value: number) {
        this.container.scale.y = value;
        this._stageHeight = value * this.height;
    }

    public set Scale(value: vf.Point){
        this.container.scale.copyFrom(value);
        this._stageWidth = value.x * this.width;
        this._stageHeight = value.y * this.height;
    }

    public release(){
        super.release();
    }

    public releaseAll(){
        
        for(let i=0;i<this.uiChildren.length;i++){
            const ui = this.uiChildren[i] as DisplayObject;
            ui.releaseAll();
        }
        this.uiChildren = [];
        this.container.removeAllListeners();
        this.container.removeChildren();
        TickerShared.removeAllListeners();
        validatorShared.removeAllListeners();
        validatorShared.removeDepthQueueAll();
    }

 
    public resize(): void {
        this.container.hitArea = new vf.Rectangle(0, 0, this.width, this.height);
        //this.updateChildren();
    }

    /**
     * 虚接口，子类可以扩充
     */
    public inputLog(msg: any){
        //
        //console.log(msg);
    }

}