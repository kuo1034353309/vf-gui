import { DisplayObject } from "../core/DisplayObject";
import { ComponentEvent } from "../interaction/Index";
import * as UIKeys from "../core/DisplayLayoutKeys";
import {Decoration} from "../enum/LabelEnum";

/**
 * 文本
 * 
 * 中文换行特殊处理 xxxx.style.breakWords = true;
 * 
 * 当文本容器设置宽高后，文字默认会根据文本容器宽高居中.
 * 
 * 当文本容器设置宽高后，可通过 style.textAlign 进行文字位置调整
 * 
 * @example let label = new vf.gui.Label();
 * 
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestLabel
 */
export class Label extends DisplayObject {

    public constructor(text = "") {
        super();
        this.sprite = new vf.Text(text,{breakWords : true,fill:"#ffffff"});
        this.container.addChild(this.sprite);
    }

    public readonly sprite: vf.Text;
    private _textDecoration = Decoration.None;
    private _lineGraphics:any;
    private _textDecorationColor:number = 0x0ff000; //线条颜色
    private _textDecorationWidth:number = 3; //线条宽度 

    /**
     * 设置分辨力比例
     */
    public get resolution() {
        return this.sprite.resolution;
    }
    public set resolution(value) {
        this.sprite.resolution = value;
    }

    public get textDecoration(){
        return this._textDecoration;
    }

    public set textDecoration(value){
        this._textDecoration = value;

        this.setLineStatus();
    }

    // public get textDecorationStyle(){
    //     return this._textDecorationStyle;
    // }
    public get textDecorationColor():number{
        return this._textDecorationColor;
    }

    public set textDecorationColor(value:number){
        this._textDecorationColor = value;
    }

    private setLineStatus(){
        const type = this._textDecoration;
        if(type == Decoration.None){
            this.clearLineGraphics();
        }else{
            if(this.sprite.text == ""){
                return;
            }
            this.showUnderLine();
        }
    }

    private showUnderLine():void{
        this.clearLineGraphics();
        if(!this._lineGraphics){
            this._lineGraphics = new vf.Graphics();
        }
        if(!this._lineGraphics.parent){
            this.container.addChild(this._lineGraphics);
        }
        //画线
        this.autoDrawLine();   
    }

    private autoDrawLine(){
        const lineOffsetY:number = 1;
        this._textDecorationWidth = this.style.fontSize/10 +1;
        let leftX:number = Number.MAX_VALUE;
        let rightX:number = Number.MIN_VALUE;
        let lineInfo = []; //线条的信息  
        let sss = vf.TextMetrics.measureText(this.text, this.sprite.style, this.style.wordWrap);
        for(let i:number = 0 ; i < sss.lines.length ; i++ ){
            let x = this.getStartPos(sss.lineWidths[i]);
            let liney = (i+1)*sss.lineHeight + lineOffsetY;
            leftX = leftX < x ? leftX:x;
            rightX = rightX > x ? rightX:x;
            lineInfo.push({leftX:x,lineY:liney ,lineWidths: sss.lineWidths[i]});
        }
        for(let i:number = 0 ; i < lineInfo.length ; i++ ){
            const infoItem = lineInfo[i];
            this.drawLine(infoItem.leftX,infoItem.lineY,  infoItem.lineWidths);
        } 
    }

    private getStartPos(width:number):number{
        const textAlign = this.style.textAlign;
        let startPosX:number = 0;
        switch(textAlign){
            case "left":
                startPosX = 0;
                break;
            case "right":
                startPosX = this.width - width;
                break;
            case "center":
                startPosX = (this.width - width)*0.5;
                break;
        }
        return startPosX;
    }

    private drawLine(startPosX:number ,startPosY:number, lineWidth:number){
        const lineG = this._lineGraphics as vf.Graphics;
        lineG.lineStyle(this._textDecorationWidth,this._textDecorationColor);
        lineG.moveTo(startPosX,startPosY);
        lineG.lineTo(startPosX + lineWidth,startPosY);
    }

    /**
     * 文本内容
     */
    public get text() {
        return this.sprite.text;
    }
    public set text(value) {
        this.sprite.text = value;
        this.setActualSize(this.sprite.width,this.sprite.height);
        this.invalidateSize();
        this.emit(ComponentEvent.CHANGE,this);
    }

    public set fontCssStyle(value: any){
        if(value.color){
            value.fill = value.color;
        }
        value.breakWords = true;
        this.sprite.style = value;
        this.setActualSize(this.sprite.width,this.sprite.height);
        this.invalidateSize();
    }

    protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void {
        super.updateDisplayList(unscaledWidth,unscaledHeight);
        const values = this.$values;
        if(!isNaN(values[UIKeys.explicitWidth])){
            switch(this.style.textAlign){
                case "left":
                    this.sprite.x = 0;
                    break;
                case "right":
                    this.sprite.x =  values[UIKeys.explicitWidth] - this.sprite.width;
                    break;
                case "center":
                    this.sprite.x = values[UIKeys.explicitWidth] - this.sprite.width >>1;
                    break;
            }
            
        }

        if(!isNaN(values[UIKeys.explicitHeight])){
            switch(this.style.verticalAlign){
                case "top":
                    this.sprite.y = 0;
                    break;
                case "bottom":
                    this.sprite.y =  values[UIKeys.explicitHeight] - this.sprite.height;
                    break;
                case "middle":
                    this.sprite.y = values[UIKeys.explicitHeight] - this.sprite.height >>1;
                    break;
            }
        }
    }

    private clearLineGraphics(){
        const graphics = this._lineGraphics;
        if(graphics){
            if(graphics.parent){
                graphics.parent.removeChild(this._lineGraphics);
            }
            graphics.clear();
        }
    }

    public release(){
        super.release();
        const sprite = this.sprite;
        if(sprite && sprite.parent){
            sprite.parent.removeChild(sprite).destroy();
        }
        this.offAll(ComponentEvent.CHANGE);
        this.clearLineGraphics();
    }
}