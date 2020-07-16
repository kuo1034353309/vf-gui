// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../dist/gui.d.ts" />

import { Button } from "src/UI";

export default class TestVideo {

    public constructor(app: vf.Application, uiStage: vf.gui.Stage) {
        this.onLoad(app, uiStage)
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage) {

        /** 绘制 */
        const _video = new vf.gui.Video();
        _video.src = "./docs/play/assets/video/friday.mp4";
        _video.poster = "./docs/play/assets/video/friday.png";
        _video.width = 800;
        _video.height = 600;
        uiStage.addChild(_video);

        
        const button1 = this.createBtn("播放", ()=>{
            _video.play();
        });
        button1.style.left = 0;
        button1.style.top = 450;
        uiStage.addChild(button1);

        const button2 = this.createBtn("暂停", ()=>{
            _video.pause();
        });
        button2.style.left = 120;
        button2.style.top = 450;
        uiStage.addChild(button2);

        const button3 = this.createBtn("隐藏controls", ()=>{
            if(_video.controls == true){
                _video.controls = false;
                button3.text = "显示controls";
            }else{
                _video.controls = true;
                button3.text = "隐藏controls";
            }
        });
        button3.style.left = 240;
        button3.style.top = 450;
        uiStage.addChild(button3);

        const button4 = this.createBtn("静音", ()=>{
            if(_video.muted == true){
                _video.muted = false;
                button4.text = "静音";
            }else{
                _video.muted = true;
                button4.text = "取消静音";
            }
        });
        button4.style.left = 0;
        button4.style.top = 520;
        uiStage.addChild(button4);

        const button5 = this.createBtn("全屏", ()=>{
            _video.requestFullScreen();
        });
        button5.style.left = 120;
        button5.style.top = 520;
        uiStage.addChild(button5);

        const button6 = this.createBtn("到第3秒", ()=>{
            _video.currentTime = 3;
        });
        button6.style.left = 240;
        button6.style.top = 520;
        uiStage.addChild(button6);

        const button7 = this.createBtn("到第0秒", ()=>{
            _video.currentTime = 0;
        });
        button7.style.left = 0;
        button7.style.top = 590;
        uiStage.addChild(button7);

        const button8 = this.createBtn("调大音量", ()=>{
            _video.volume +=0.1;
        });
        button8.style.left = 120;
        button8.style.top = 590;
        uiStage.addChild(button8);



        const button9 = this.createBtn("减小音量", ()=>{
            _video.volume -=0.1;
        });
        button9.style.left = 240;
        button9.style.top = 590;
        uiStage.addChild(button9);


        _video.on("canplay" , ()=>{
            console.log("canplay");
        },this);
        _video.on("ended" , ()=>{
            console.log("ended");
        },this);
    }

    private createBtn(text:string , clickFun:Function):vf.gui.Button{
        const button = new vf.gui.Button;
        button.text = text;
        button.up = "assets/skin/Button/button_up.png";
        button.down = "assets/skin/Button/button_down.png";
        button.move = "assets/skin/Button/button_move.png";
        button.on(vf.gui.Interaction.TouchMouseEvent.onClick, clickFun, this);
        button.style.width = 100;
        button.style.height = 50;
        return button;
    }

}


