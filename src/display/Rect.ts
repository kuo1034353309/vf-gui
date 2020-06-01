import {DisplayObject} from "../core/DisplayObject";
import {MaskSprite} from "../core/MaskSprite";

/**
 * 绘制矩形或圆角矩形
 * 
 * 不设置 lineWidth 或 color 矩形不可见
 * 
 * @example let rect = new vf.gui.Rect();
 * 
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestRect
 */
export class Rect extends DisplayObject implements MaskSprite{
    public constructor(){
        super();
        this.graphics = new vf.Graphics();
        this.container.addChild(this.graphics);
    }

    public readonly graphics: vf.Graphics;

    /** 可以支持遮罩的组件 */
    public maskSprite(){
        return this.graphics;
    }

    /**
     * 圆角
     */
    private _radius = 0;
    public get radius() {
        return this._radius;
    }
    public set radius(value) {
        this._radius = value;
        this.invalidateDisplayList();
    }
    /**
     * 线条颜色
     */
    private _lineColor = 0;
    public get lineColor() {
        return this._lineColor;
    }
    public set lineColor(value) {
        this._lineColor = value;
        this.invalidateDisplayList();
    }
    /**
     * 线条粗细
     */
    private _lineWidth = 0;
    public get lineWidth() {
        return this._lineWidth;
    }
    public set lineWidth(value) {
        this._lineWidth = value;
        this.invalidateDisplayList();
    }
    /** 
     * 颜色 
     */
    private _color?: number;
    public get color() {
        return this._color;
    }
    public set color(value) {
        this._color = value;
        this.invalidateDisplayList();
    }
    /**
     * 锚点，调整位图的坐标中点 0-1
     */
    private _anchorX?: number;
    public get anchorX() {
        return this._anchorX;
    }
    public set anchorX(value) {
        this._anchorX = value;
        this.invalidateDisplayList();
    }
    /**
     * 锚点，调整位图的坐标中点 0-1
     */
    private _anchorY?: number;
    public get anchorY() {
        return this._anchorY;
    }
    public set anchorY(value) {
        this._anchorY = value;
        this.invalidateDisplayList();
    }

    public drawRoundedRect(){
        const graphics = this.graphics;
        graphics.clear();
        graphics.lineStyle(this._lineWidth,this._lineColor);
        if(this._color !== undefined)
            graphics.beginFill(this._color);   
        
        graphics.drawRoundedRect(this._anchorX?-this._anchorX*this.width:0,this._anchorY?-this._anchorY*this.height:0,this.width, this.height,Math.min(15,this._radius));
        graphics.endFill();
    }
    
    public release(){
        super.release();
        if(this.graphics.parent){
            this.graphics.parent.removeChild(this.graphics).destroy();
        }
        
    }

    protected updateDisplayList(unscaledWidth: number, unscaledHeight: number) {
        this.drawRoundedRect();
        super.updateDisplayList(unscaledWidth,unscaledHeight);
    }


}