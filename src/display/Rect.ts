import { GraphBase } from './private/GraphBase'

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
export class Rect extends GraphBase {
    public constructor() {
        super();
    }

    public drawGraph() {
        const graphics = this.graphics;
        graphics.clear();
        graphics.lineStyle(this._lineWidth, this._lineColor, this._lineAlpha);
        if (this._color !== undefined)
            graphics.beginFill(this._color);

        graphics.drawRoundedRect(this._anchorX ? -this._anchorX * this.width : 0, this._anchorY ? -this._anchorY * this.height : 0, this.width, this.height, Math.min(15, this._radius));
        graphics.endFill();
    }

}