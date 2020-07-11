import { DisplayObject } from "../core/DisplayObject";
import {MaskSprite} from "../core/MaskSprite";
import { getTexture } from "../utils/Utils";
import { ComponentEvent } from "../interaction/Index";

/**
 * 图片
 * 
 * @example let image = new vf.gui.Image();
 * 
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestImage
 */
export class Image extends DisplayObject implements MaskSprite{


    public constructor() {
        super();
    }

    /** 可以支持遮罩的组件 */
    public maskSprite(){
        return this._sprite as vf.Sprite;
    }

    protected _sprite: vf.Sprite | vf.TilingSprite | vf.NineSlicePlane | undefined;
    protected _texture: vf.Texture | undefined;
    protected _source: number | string | vf.Texture | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | undefined;

    /**
     * 图像路径或位图对象
     */
    private _src: number | string | vf.Texture | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | undefined;
    public get src(): number | string | vf.Texture | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | undefined {
        return this._src;
    }
    public set src(value: number | string | vf.Texture | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | undefined) {
        this._src = value;
        this.srcSystem();
    }
    /**
     * 矩形区域，它定义素材对象的九个缩放区域。
     * 
     * fillMode = scale 时，[leftWidth,rightWidth,topHeight,bottomHeight]
     * 
     * fillMode = repeat 是，[scalex,scaley,x,y]
     */
    private _scale9Grid?: number[];
    public get scale9Grid() {
        return this._scale9Grid;
    }
    public set scale9Grid(value) {
        this._scale9Grid = value;
        this.scale9GridSystem();
    }
    /**
     * 填充模式
     * 设置scale后，可设置scale9Grid进行调整缩放区域
     */
    private _fillMode?: "no-repeat" | "repeat" | "scale" = "no-repeat";
    public get fillMode() {
        return this._fillMode;
    }
    public set fillMode(value) {
        this._fillMode = value;
        this._source = undefined;
        this.srcSystem();
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
        this.anchorSystem();
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
        this.anchorSystem();
    }

    public release() {
        super.release();
        this.offAll(ComponentEvent.COMPLETE);
        if (this._sprite && this._sprite.parent) {
            this._sprite.parent.removeChild(this._sprite).destroy();
        }
    }

    protected updateDisplayList(unscaledWidth: number, unscaledHeight: number) {
        if(unscaledWidth === 0 && unscaledHeight ===0){
            return;
        }
        if (this._sprite) {
            super.updateDisplayList(unscaledWidth, unscaledHeight);
            this.scale9GridSystem();
            this._sprite.width = unscaledWidth;
            this._sprite.height = unscaledHeight;
            this.anchorSystem();
        }

    }

    public setSpeiteSize(unscaledWidth?: number, unscaledHeight?: number){
        const sprite = this._sprite;

        if (sprite) {
            if(unscaledWidth)
                sprite.width = unscaledWidth;
            if(unscaledHeight)
                sprite.height = unscaledHeight;
            this.setActualSize(sprite.width,sprite.height,false);
        }
    }

    protected measure(): void {
        
        if(this._sprite){
            const texture = this._sprite.texture;
            if (texture) {
                this.setMeasuredSize(texture.frame.width, texture.frame.height);
            }
            else {
                this.setMeasuredSize(0, 0);
            }
        }

    }

    protected srcSystem() {
 
        const { container, src } = this;
        if (src === undefined && this._sprite && this._sprite.parent) {
            container.removeChild(this._sprite);
            this._sprite.destroy();
        }
        if (this._texture) {
            this._texture.removeAllListeners();
        }
        if(src === undefined && this._source === undefined) {
            return;
        }
        if (src !== this._source) {
            this._source = src;
            const texture = this._texture = getTexture(src);
            if(texture === undefined){
                return;
            }
            if (texture.frame.width > 1 && texture.frame.height > 1) {
                this.invalidateSize();
            }
            let invalidateDisplayList = false;
            texture.once("update", () => {
                invalidateDisplayList = true;
                this.invalidateSize();
                this.emit(ComponentEvent.COMPLETE, this);
            }, this);

            let sprite: vf.Sprite | vf.TilingSprite | vf.NineSlicePlane | undefined = this._sprite;
            
            try{
                if (this.fillMode === "no-repeat") {
                    if (sprite instanceof vf.Sprite) {
                        sprite.texture = texture;
                    } else {
                        sprite = new vf.Sprite(texture);
                    }
                } else if (this.fillMode === "repeat") {
                    if (sprite instanceof vf.TilingSprite) {
                        sprite.texture = texture;
                    } else {
                        sprite = new vf.TilingSprite(texture);
                    }
                } else if (this.fillMode === "scale") {
                    if (sprite instanceof vf.NineSlicePlane) {
                        sprite.texture = texture;
                    } else {
                        sprite = new vf.NineSlicePlane(texture);
                    }
                }
            }catch(e){
                sprite = vf.Sprite.from(texture);
            }

            if (sprite && sprite.parent == undefined) {
                this._sprite = container.addChild(sprite) as vf.Sprite;
            }
            if(!invalidateDisplayList){
                this.invalidateDisplayList();
                this.invalidateParentLayout();
            }
        }

    }

    protected scale9GridSystem() {
        if (this._sprite === undefined || this.scale9Grid === undefined) {
            return;
        }

        const sprite = this._sprite;
        const scale9Grid = this.scale9Grid;

        if (sprite instanceof vf.TilingSprite) {
            sprite.tileScale.set(scale9Grid[0], scale9Grid[1]);
            sprite.tilePosition.set(scale9Grid[2], scale9Grid[3]);
        } else if (sprite instanceof vf.NineSlicePlane) {
            if (scale9Grid[0] !== undefined) {
                sprite.leftWidth = scale9Grid[0];
            }
            if (scale9Grid[1] !== undefined) {
                sprite.rightWidth = scale9Grid[1];
            }
            if (scale9Grid[2] !== undefined) {
                sprite.topHeight = scale9Grid[2];
            }
            if (scale9Grid[3] !== undefined) {
                sprite.bottomHeight = scale9Grid[3];
            }
        }
    }

    protected anchorSystem() {
        if (this._sprite === undefined) {
            return;
        }
        const sprite = this._sprite;

        if (this.anchorX) {
            sprite.x = -Math.floor(sprite.width * this.anchorX);
        }
        if (this.anchorY) {
            sprite.y = -Math.floor(sprite.height * this.anchorY);
        }
    }



}