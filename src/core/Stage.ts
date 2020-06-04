import * as tween from "../tween/private/index";
import { TickerShared } from "./Ticker";
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


    public constructor(width: number, height: number,app: vf.Application) {
        super(); 
        this.width = width;
        this.height = height;
        this.container.name = "Stage";
        this.container.hitArea = new vf.Rectangle(0, 0, width, height);
        this.container.interactive = true;
        this.container.interactiveChildren = true;
        this.$nestLevel = 1;
        this.app = app;
        this.syncManager = new SyncManager(this);
        this.initialized = true;

        if(!TickerShared.started){
            TickerShared.start();
        }
        TickerShared.add(tween.update,this);

        if (!this.container.parent) {
            this.app.stage.addChild(this.container);
        }
        
    }

    public app: vf.Application | any;
    public syncManager: SyncManager; 
    /**
     * 是否组织原始数据继续传递
     */
    public originalEventPreventDefault = false;
    /**
     * 是否同步交互事件
     */
    public syncInteractiveFlag = false; //TODO:默认false

    public get stageWidth(){
        return this.container.width;
    }

    public get stageHeight(){
        return this.container.height;
    }

    public get scaleX() {
        return  this.container.scale.x;
    }

    public set scaleX(value: number) {
        this.container.scale.x = value;
    }

    public get scaleY() {
        return this.container.scale.y;
    }

    public set scaleY(value: number) {
        this.container.scale.y = value;
    }

    public set Scale(value: vf.Point){
        this.container.scale.copyFrom(value);
    }

    public release(){
        super.release();
        TickerShared.remove(tween.update,this);
    }

    public releaseAll(){
        TickerShared.remove(tween.update,this);
        
        for(let i=0;i<this.uiChildren.length;i++){
            const ui = this.uiChildren[i] as DisplayObject;
            ui.releaseAll();
        }
        this.uiChildren = [];
        this.container.removeAllListeners();
        this.container.removeChildren();
        validatorShared.removeAllListeners();
        validatorShared.removeDepthQueueAll();

        this.app = null;
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