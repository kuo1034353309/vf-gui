import { DisplayObject } from "../core/DisplayObject";
import { ComponentEvent } from "../interaction/Index";
import * as UIKeys from "../core/DisplayLayoutKeys";
import {Decoration , DecorationStyle} from "../enum/LabelEnum";

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
    private _textDecoration:"None"|"Overline"|"LineThrough"|"UnderLine" = "None";
    private _lineGraphics:any;
    private _textDecorationColor:number = 0x0ff000; //线条颜色
    private _textDecorationWidth:number = 3; //线条宽度 
    private _textDecorationStyle:"Solid"|"Double" ="Solid"//线条样式

    /**
     * 设置分辨力比例
     */
    public get resolution() {
        return this.sprite.resolution;
    }
    public set resolution(value) {
        this.sprite.resolution = value;
    }

    public get textDecoration():"None"|"Overline"|"LineThrough"|"UnderLine"{
        return this._textDecoration;
    }

    public set textDecoration(value:"None"|"Overline"|"LineThrough"|"UnderLine"){
        this._textDecoration = value;
        this.setLine();
    }

    public get textDecorationStyle():"Solid"|"Double"{
        return this._textDecorationStyle;
    }

    public set textDecorationStyle(value:"Solid"|"Double"){
        this._textDecorationStyle = value;
        this.setLine();
    }

    public get textDecorationColor():number{
        return this._textDecorationColor;
    }

    public set textDecorationColor(value:number){
        this._textDecorationColor = value;
        this.setLine();
    }

    private setLine(){
        const type = this._textDecoration;
        if(type == "None"){
            this.clearLineGraphics();
        }else{
            if(!this.sprite || !this.sprite.text  || this.sprite.text == ""){
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
        let vfMeasured = this.sprite.vfMeasured;
        if(vfMeasured == null){
            console.log("文本渲染参数未初始化");
            return;
        }
        const lineOffsetY:number = 1;
        this._textDecorationWidth = this.style.fontSize/10 +1;
        let leftX:number = Number.MAX_VALUE;
        // let rightX:number = Number.MIN_VALUE;
        let lineInfo = []; //线条的信息  
     
        for(let i:number = 0 ; i < vfMeasured.lines.length ; i++ ){
            let x = this.getStartPosX(vfMeasured.lineWidths[i]);
            let liney = this.getStartPosY(vfMeasured.lineHeight,i);
            leftX = leftX < x ? leftX:x;
            // rightX = rightX > x ? rightX:x;
            lineInfo.push({leftX:x,lineY:liney ,lineWidths: vfMeasured.lineWidths[i]});
        }
        for(let i:number = 0 ; i < lineInfo.length ; i++ ){
            const infoItem = lineInfo[i];
            this.drawLine(infoItem.leftX,infoItem.lineY,  infoItem.lineWidths);
        } 
    }

    private getStartPosX(width:number):number{
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

    private getStartPosY(height:number , lineIndex:number):number{
        let startPosY:number = 0;
        const type = this._textDecoration;
        switch(type){
            case "None":
                break;
            case "UnderLine":
                const lineOffsetY:number = 1;
                startPosY = (lineIndex + 1)*height + lineOffsetY;
                break;
            case "LineThrough":
                startPosY = (lineIndex + 1)*height - height*0.5;
                break;
            case "Overline":
                startPosY = lineIndex*height;
                break;
        }

        return startPosY;
    }

    private drawLine(startPosX:number ,startPosY:number, lineWidth:number){
        const lineG = this._lineGraphics as vf.Graphics;
        const style = this._textDecorationStyle;
        switch(style){
            case "Solid":
                lineG.lineStyle(this._textDecorationWidth,this._textDecorationColor);
                lineG.moveTo(startPosX,startPosY);
                lineG.lineTo(startPosX + lineWidth,startPosY);
                break;
            case "Double":
                lineG.lineStyle(this._textDecorationWidth*0.5,this._textDecorationColor);
                lineG.moveTo(startPosX,startPosY);
                lineG.lineTo(startPosX + lineWidth,startPosY);  
                lineG.moveTo(startPosX,startPosY+this._textDecorationWidth*1);
                lineG.lineTo(startPosX + lineWidth,startPosY+this._textDecorationWidth*1);
                break;
        }
        

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
        this.setLine();
    }

    public set fontCssStyle(value: any){
        if(value.color){
            value.fill = value.color;
        }
        value.breakWords = true;
        this.sprite.style = value;
        this.setActualSize(this.sprite.width,this.sprite.height);
        this.invalidateSize();
        this.setLine();
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
        this._textDecoration = "None";
        this._textDecorationStyle = "Solid";
    }
}