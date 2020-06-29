import { DisplayObject } from "../../core/DisplayObject";
import { MaskSprite } from "../../core/MaskSprite";

/**
 * 绘制图形基类
 */
export class GraphBase extends DisplayObject implements MaskSprite {
    public constructor() {
        super();
        this.graphics = new vf.Graphics();
        this.container.addChild(this.graphics);
    }

    public readonly graphics: vf.Graphics;

    /** 可以支持遮罩的组件 */
    public maskSprite() {
        return this.graphics;
    }

    /**
     * 半径
     */
    protected _radius = 0;
    public get radius() {
        return this._radius;
    }
    public set radius(value) {
        this._radius = value;
        this.invalidateSize();
    }
    /**
     * 线条颜色
     */
    protected _lineColor = 0;
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
    protected _lineWidth = 0;
    public get lineWidth() {
        return this._lineWidth;
    }
    public set lineWidth(value) {
        this._lineWidth = value;
        this.invalidateDisplayList();
    }
    /**
     * 线条透明度
     */
    protected _lineAlpha = 1;
    public get lineAlpha() {
        return this._lineAlpha;
    }
    public set lineAlpha(value) {
        this._lineAlpha = value;
        this.invalidateDisplayList();
    }
    /** 
     * 颜色 
     */
    protected _color?: number;
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
    protected _anchorX?: number;
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
    protected _anchorY?: number;
    public get anchorY() {
        return this._anchorY;
    }
    public set anchorY(value) {
        this._anchorY = value;
        this.invalidateDisplayList();
    }

    /**
     * 子类重写
     */
    public drawGraph() {
        //
    }

    public release() {
        super.release();
        if (this.graphics.parent) {
            this.graphics.parent.removeChild(this.graphics).destroy();
        }

    }

    protected updateDisplayList(unscaledWidth: number, unscaledHeight: number) {
        this.drawGraph();
        super.updateDisplayList(unscaledWidth, unscaledHeight);
    }


}