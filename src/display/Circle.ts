import { GraphBase } from './private/GraphBase'

/**
 * 绘制圆形
 * 
 * 不设置 lineWidth 或 color 圆形不可见
 * 
 * @example let circle = new vf.gui.Circle();
 * 

 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestCircle
 */
export class Circle extends GraphBase {
    public constructor() {
        super();
    }

    /**
     * 开始绘制角度
     */
    protected _startAngle = 0;
    public get startAngle() {
        return this._startAngle;
    }
    public set startAngle(value) {
        this._startAngle = value;
        this.invalidateDisplayList();
    }

    /**
     * 结束角度
     */
    protected _endAngle = 360;
    public get endAngle() {
        return this._endAngle;
    }
    public set endAngle(value) {
        this._endAngle = value;
        this.invalidateDisplayList();
    }

    /**
     * 逆时针绘制
     */
    protected _anticlockwise = false;
    public get anticlockwise() {
        return this._anticlockwise;
    }
    public set anticlockwise(value) {
        this._anticlockwise = value;
        this.invalidateDisplayList();
    }

    public drawGraph() {
        const graphics = this.graphics;
        graphics.clear();
        graphics.lineStyle(this._lineWidth, this._lineColor, this._lineAlpha);

        if (this._color !== undefined)
            graphics.beginFill(this._color);


        const diam = this._radius * 2;
        graphics.arc(this._anchorX ? this._anchorX * diam : 0
            , this._anchorY ? diam * this._anchorY : 0
            , this._radius
            , this._startAngle * Math.PI / 180
            , this._endAngle * Math.PI / 180
            , this._anticlockwise);
        graphics.endFill();
    }

}