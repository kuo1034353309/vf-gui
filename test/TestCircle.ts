// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../dist/gui.d.ts" />

export default class TestCircle {

    public constructor(app: vf.Application, uiStage: vf.gui.Stage) {
        this.onLoad(app, uiStage)
    }


    private onLoad(app: vf.Application, uiStage: vf.gui.Stage) {

        /** 绘制 */
        const circle = new vf.gui.Circle();
        // circle.style.left = 150;
        // circle.style.top = 120;
        circle.anchorX = 0.1;
        circle.anchorY = 0.1;
        circle.color = 0xffffff;
        circle.lineColor = 0xff00cc;
        circle.lineWidth = 1;
        circle.radius = 100; //半径
        uiStage.addChild(circle);

        /** 透明 */
        const circle1 = new vf.gui.Circle();
        circle1.style.left = 150;
        circle1.style.top = 350;
        //circle1.color = undefined;
        circle1.lineColor = 0xff00cc;
        circle1.lineWidth = 1;
        circle1.radius = 50;
        uiStage.addChild(circle1);

        /** 绘制半圆 */
        const circle2 = new vf.gui.Circle();
        circle2.style.left = 350;
        circle2.style.top = 350;
        //circle1.color = undefined;
        circle2.lineColor = 0xffffcc;
        circle2.lineWidth = 2;
        circle2.startAngle = 0;
        circle2.endAngle = 0;
        circle2.radius = 50;
        uiStage.addChild(circle2);

        vf.gui.TickerShared.add(()=>{
            if(circle2.endAngle>=360){
                circle2.startAngle++;
            }else{
                circle2.endAngle++;
            }
            if(circle2.endAngle>= 360 && circle2.startAngle>=360){
                circle2.startAngle = 0;
                circle2.endAngle = 0;
            }
        })

        const click = new vf.gui.Interaction.ClickEvent(circle, true);
        circle.on(vf.gui.Interaction.TouchMouseEvent.onUp, this.onClick, this);
        circle.on(vf.gui.Interaction.TouchMouseEvent.onDown, this.onClick, this);
        circle.on(vf.gui.Interaction.TouchMouseEvent.onPress, this.onClick, this);
        circle.on(vf.gui.Interaction.TouchMouseEvent.onMove, this.onClick, this);
        circle.on(vf.gui.Interaction.TouchMouseEvent.onHover, this.onClick, this);
        circle.on(vf.gui.Interaction.TouchMouseEvent.onClick, this.onClick, this);
    }

    private onClick(e: vf.gui.Interaction.InteractionEvent) {
        console.log(e.type);
    }

}

