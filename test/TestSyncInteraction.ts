// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../dist/gui.d.ts" />

import { InteractionEvent } from "src/event/Index";
import { Scheduler } from "../src/UI";
import { gui } from "src/vf-gui";

const HISTORY: boolean = false;
let history: any = {};
export default class TestSyncInteraction {
    private id = 0;
    public constructor(app: vf.Application, uiStage: vf.gui.Stage) {
        this.onLoad(app, uiStage)
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage) {

        app.ticker.maxFPS = 30;
        vf.Ticker.shared.maxFPS = 30;
        const basicText = new vf.gui.Label();
        basicText.style.left = 15;
        basicText.style.top = 50;
        basicText.style.color = 0xffffff;
        basicText.text = "30"
        uiStage.addChild(basicText);


        //图片
        const img = new vf.gui.Image();
        img.x = 15;
        img.y = 100;
        img.id = JSON.stringify(this.id++);
        img.src = "assets/dino.png";
        img.dragOption.dragBounces = true;
        img.dragOption.draggable = true;//开启拖拽
        img.dragOption.dragGroup = "group1"; //设置分组，同时需要设置接收掉落方的dropGroup。
        uiStage.addChild(img);

        const img1 = new vf.gui.Image();
        img1.x = 15;
        img1.y = 300;
        img1.id = JSON.stringify(this.id++);
        img1.src = "assets/dino.png";
        img1.dragOption.dragBounces = false;
        img1.dragOption.draggable = true;//开启拖拽
        img1.dragOption.dragGroup = "group2"; //设置分组，同时需要设置接收掉落方的dropGroup。
        uiStage.addChild(img1);

        img1.on(vf.gui.Interaction.ComponentEvent.DRAG_TARGET, () => {
            img1.x = img1.y = 0;
            img1.scaleX = img1.scaleY = 1;
        }, this);
        img1.on(vf.gui.Interaction.ComponentEvent.DRAG_START, () => {
            img1.scaleX = img1.scaleY = 1.2;
        }, this);
        img1.on(vf.gui.Interaction.ComponentEvent.DRAG_MOVE, () => {
            console.log('vf.gui.Interaction.ComponentEvent.DRAG_MOVE');
        }, this);
        img1.on(vf.gui.Interaction.ComponentEvent.DRAG_END, () => {
            img1.scaleX = img1.scaleY = 1;
        }, this);

        const img2 = new vf.gui.Image();
        img2.x = 200;
        img2.y = 100;
        img2.id = JSON.stringify(this.id++);
        img2.src = "assets/dino.png";
        uiStage.addChild(img2);
        img2.interactabled = true;
        img2.on(vf.gui.Interaction.TouchMouseEvent.onPress, (e: vf.gui.Interaction.InteractionEvent, target: vf.gui.DisplayObject, isPress: any)=>{
            if(isPress){
                img2.scaleX = img2.scaleY = 0.8;
                
            }
            else{
                img2.scaleX = img2.scaleY = 1;
            }
        }, this);
        img2.on(vf.gui.Interaction.TouchMouseEvent.onHover, (e: vf.gui.Interaction.InteractionEvent, target: vf.gui.DisplayObject, over: boolean)=>{
            if(over){
                img2.tint = 0xff0000;
            }
            else{
                img2.tint = 0xffffff;
            }
        }, this);

        const container = new vf.gui.Image();
        container.x = 400;
        container.y = 100;
        container.id = JSON.stringify(this.id++);
        container.src = "assets/btnbg.png";
        container.dragOption.droppable = true;//开启掉落接收
        container.dragOption.dropGroup = "group1";
        uiStage.addChild(container);

        const container1 = new vf.gui.Image();
        container1.x = 400;
        container1.y = 300;
        container1.id = JSON.stringify(this.id++);
        container1.src = "assets/btnbg.png";
        container1.dragOption.droppable = true;//开启掉落接收
        container1.dragOption.dropGroup = "group2";
        uiStage.addChild(container1);

        const img3 = new vf.gui.Image();
        img3.x = 200;
        img3.y = 300;
        img3.id = JSON.stringify(this.id++);
        img3.src = "assets/dino.png";
        uiStage.addChild(img3);
        img3.interactabled = true;
        let speed:number = 100;
        let flag = true;
        let interval = null;
        img3.on(vf.gui.Interaction.TouchMouseEvent.onClick, ()=>{
            console.log('点击')
            if(interval){
                interval.stop();
                interval = null;
            }
            else{
                interval = vf.gui.Scheduler.setInterval(0, (info: any)=>{
                    let offset: number = Math.ceil(speed * info.dt / 1000);
                    console.log(offset);
                    if(flag){
                        img3.x += offset;
                        if(img3.x > 600){
                            flag = false;
                        }
                    }
                    else{
                        img3.x -= offset;
                        if(img3.x < 200){
                            flag = true;
                        }
                    }
                })
            }

        }, this);

        uiStage.on('sendSyncEvent', (data: any) => {
            history[data.code] = data;
            if(!HISTORY){
                //测试，iframe
                if(window.parent !== window){
                    window.parent.postMessage(data, '*');
                }
            }
        });

        window.addEventListener(
            "message",
            (event) => {
                uiStage.syncManager.receiveEvent(event.data, HISTORY ? "history" : "live")
            },
            false
        );

        const btn = new vf.gui.Button();
        btn.x = 200;
        btn.y = 30;
        btn.text = "同步";
        uiStage.addChild(btn);

        btn.on(vf.gui.Interaction.TouchMouseEvent.onClick, () => {
            if(window.parent !== window){
                window.parent.postMessage(history, '*');
                history = {};
            }
        });

        uiStage.syncInteractiveFlag = true;
        uiStage.reset = () => {
            console.log('场景reset。。。。。')
        }
    }
}
