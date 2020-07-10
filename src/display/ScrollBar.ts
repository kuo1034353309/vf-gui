import {Slider} from "./Slider";
import {ScrollingContainer} from "./ScrollingContainer";
import { Tween } from "../tween/Tween";
import {Image} from "./Image";
import { ComponentEvent,InteractionEvent } from "../interaction/Index";
import { Easing } from "../tween/Easing";
import * as Utils from "../utils/Utils";

/**
 * UI 带有滚动条的容器
 */
export class ScrollBar extends Slider {
    public constructor() {
        super();
        this.thumbImg.on(ComponentEvent.COMPLETE,this.onThumbLoadComplete, this);
    }

    /**
     * 是的自动隐藏滚动条
     */
    public autohide = true;
    private _scrollingContainer: ScrollingContainer | undefined;
    private _hidden = false;

    protected toggleHidden(hidden: boolean) {
        if (this.autohide) {
            if (hidden && !this._hidden) {
                //Tween.to(this, { alpha: 0 }, 200).start();
                this.alpha = 0;
                this._hidden = true;
            }
            else if (!hidden && this._hidden) {
                //Tween.to(this, { alpha: 1 }, 200).start();
                this.alpha = 1;
                this._hidden = false;
            }
        }
    }

    protected onThumbLoadComplete(rectangle: vf.Rectangle,source: Image){
        this.alignToContainer();
    }

    protected triggerValueChanging() {
        super.triggerValueChanging();
        const scrollingContainer = this._scrollingContainer;
        if (scrollingContainer) {
            const sizeAmt = scrollingContainer.explicitHeight / scrollingContainer.innerContainer.height || 0.001;
            if (sizeAmt < 1)
                scrollingContainer.forcePctPosition(this.vertical ? "y" : "x", this._amt);
        }
    }

    private _source: any;
    public get source(): ScrollingContainer | string | undefined {
        return this._source;
    }
    public set source(value: ScrollingContainer | string | undefined) {

        if(this._source === value ){
            return;
        }
        this._source = value;
        
        this.invalidateProperties();
        
    }

    private _dragScrolling = true;
    public get dragScrolling(): boolean {
        return this._source;
    }
    public set dragScrolling(value: boolean) {

        if(this._dragScrolling === value ){
            return;
        }
        this._dragScrolling = value;
        
        this.invalidateProperties();
        
    }

    protected commitProperties() {

        if (this._scrollingContainer !== Utils.getDisplayObject(this._source,this)) {
            if(this._scrollingContainer){
                this._scrollingContainer.off(ComponentEvent.CHANGE, this.alignToContainer, this);
                this._scrollingContainer.off(ComponentEvent.RESIZE,this.alignToContainer,this);
            }
            const scrollingContainer = this._scrollingContainer = Utils.getDisplayObject(this._source,this) as ScrollingContainer;
            scrollingContainer.expandMask = 2;
            scrollingContainer.softness = 0.2;
            scrollingContainer.on(ComponentEvent.CHANGE, this.alignToContainer, this);
            scrollingContainer.on(ComponentEvent.RESIZE,this.alignToContainer,this);
        } 

        const scrollingContainer = this._scrollingContainer;
        if (scrollingContainer) {
            scrollingContainer.dragScrolling = this._dragScrolling;
            if(this.vertical) {
                scrollingContainer.scrollY = true;
                if(this.parent)
                this.height = this.parent.height;
            }else{
                scrollingContainer.scrollX = true;
                if(this.parent)
                this.width = this.parent.width;
            }
            this.alignToContainer();
        }
    }

    protected alignToContainer() {
        if (this._scrollingContainer) {
            const _thumb = this.thumbImg as Image;
            if (this.vertical) {
                _thumb.style.width = '100%';
            }
            else {
                _thumb.style.height = '100%';
            }
            
            let newPos;
            let size;
            const xORy = this.vertical ? "y" : "x";
            const widthORheight = this.vertical ? "height" : "width";
            const topORleft = this.vertical ? "top" : "left";
            const scrollingContainer = this._scrollingContainer as any;
            const innerContainer = scrollingContainer.innerContainer as any;

            const _posAmt = !innerContainer[widthORheight] ? 0 : -(innerContainer[xORy] / innerContainer[widthORheight]);
            const sizeAmt = !innerContainer[widthORheight] ? 1 : scrollingContainer[widthORheight] / innerContainer[widthORheight];
            //update amt
            const diff = innerContainer[widthORheight] - scrollingContainer[widthORheight];
            this._amt = !scrollingContainer[widthORheight] || !diff ? 0 : -(innerContainer[xORy] / diff);
            const self = this as any;
            if (sizeAmt >= 1) {
                size = self[widthORheight];
                //_thumb[topORleft] = size * 0.5;
                this.toggleHidden(true);
            }
            else {
                size = self[widthORheight] * sizeAmt;
                if (this._amt > 1) {
                    size -= (self[widthORheight] - size) * (this._amt - 1);
                }
                else if (this._amt < 0) {
                    size -= (self[widthORheight] - size) * -this._amt;
                }
                // if (this._amt < 0) {
                //     newPos = size * 0.5;
                // }
                // else if (this._amt > 1) {
                //     newPos = self["_" + widthORheight] - size * 0.5;
                // }
                // else {
                //     newPos = (_posAmt * self["_" + widthORheight]) + (size * 0.5);
                // }
                //_thumb[topORleft] = newPos;
                this.toggleHidden(false);
            }
            _thumb[widthORheight] = size;
            if(size == _thumb[widthORheight]){
                this.updatePosition();
            }

        }
    }

    protected onDragMove (event: InteractionEvent,offset: vf.Point) {
        if(this._thumbDrag.id == event.data.identifier){
            this._amt = !this._maxPosition ? 0 : Math.max(0, Math.min(1, this._startValue + ((this.vertical ? offset.y : offset.x) / this._maxPosition)));
            // if(this._amt < 0.26){
            //     this._amt = 0;
            // }
            // if(this._amt > 0.75){
            //     this._amt = 1;
            // }
            this.triggerValueChanging();
            this.updatePosition();
        }else if(this._trackDrag && this._trackDrag.id == event.data.identifier){
            this.updatePositionToMouse(event.data.global, false);
        }

    }

    protected updatePosition(soft?: boolean){

        this.updateLayout();
        let val = 0;
        const thumbImg = this.thumbImg;
        const tracklightImg = this.tracklightImg;

        if (this.vertical) {
            val = this.explicitHeight * this._amt;
            const minheight = thumbImg.height/2;
            const maxheight = this.height - minheight;
            if(val<minheight){
                val = minheight;
            }
            if(val>maxheight){
                val = maxheight;
            }
            thumbImg.x = this.width / 2;
            thumbImg.y = val;
        }
        else {
            val = this.explicitWidth* this._amt;
            const thumbImgWidth = thumbImg.width/2;
            const maxwidth = this.width - thumbImgWidth;
            if(val<thumbImgWidth){
                val = thumbImgWidth;
            }
            if(val>maxwidth){
                val = maxwidth;
            }
            thumbImg.y = this.height / 2;
            thumbImg.x = val;
        }
    }

    public release() {
        super.release();
        //this.offAll();
        this.thumbImg.off(ComponentEvent.COMPLETE);
        this._scrollingContainer = undefined;
        this._source = undefined;

    }

}