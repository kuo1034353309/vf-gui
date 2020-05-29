// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../dist/gui.d.ts" />

export default class TestAudio {

    public constructor(app: vf.Application, uiStage: vf.gui.Stage) {
        this.onLoad(app, uiStage)
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage) {

        /** audio */
        var a = new vf.gui.Audio();
        var b = new vf.gui.Audio();
        var c = new vf.gui.Audio();
        var d = new vf.gui.Audio();
        var e = new vf.gui.Audio();
        b.src = "https://s.vipkidstatic.com/fe-static/learning-stages/assets/great-20191221.mp3";
        c.src = "https://s.vipkidstatic.com/fe-static/learning-stages/assets/final-good-20191221.mp3";
        d.src = "https://s.vipkidstatic.com/fe-static/learning-stages/assets/final-good-20191221.mp3";
        e.src = "https://s.vipkidstatic.com/fe-static/learning-stages/assets/final-good-20191221.mp3";
        
        uiStage.addChild(a);
        uiStage.addChild(b);
        uiStage.addChild(c);
        uiStage.addChild(d);
        uiStage.addChild(e);
        
        a.loop = false;
        a.autoplay = true;
        a.src = "https://s.vipkidstatic.com/fe-static/learning-stages/assets/great-20191221.mp3";
        
        a.on("ended",()=>{
            console.log("a play ended",);
          //  a.dispose();
        });
        b.on("ended",()=>{
            console.log("b play ended",);
          //  a.dispose();
        });
        c.on("ended",()=>{
            console.log("c play ended",);
          //  a.dispose();
        });
        d.on("ended",()=>{
            console.log("d play ended",);
          //  a.dispose();
        });
        a.interactabled = true;
        a.on("canplaythrough",()=>{
            console.log("im ready");
           // a.play();
        })
        setTimeout(() => {
            a.stop();
        }, 2000);

        /** 基础文本展示 */
        const basicText = new vf.gui.Label();
        basicText.style.left = 15;
        basicText.style.top = 50;
        basicText.style.color = 0xffffff;
        basicText.text = "点击我播放";
        basicText.interactabled = true;
        
        const t1 = new vf.gui.Label();
        t1.style.left = 25;
        t1.style.top = 100;
        t1.style.color = 0xffffff;
        t1.text = "t1";
        t1.interactabled = true;
        const t2 = new vf.gui.Label();
        t2.style.left = 25;
        t2.style.top = 150;
        t2.style.color = 0xffffff;
        t2.text = "t2";
        t2.interactabled = true;
        const t3 = new vf.gui.Label();
        t3.style.left = 25;
        t3.style.top = 200;
        t3.style.color = 0xffffff;
        t3.text = "t3";
        t3.interactabled = true;
        const t4 = new vf.gui.Label();
        t4.style.left = 25;
        t4.style.top = 250;
        t4.style.color = 0xffffff;
        t4.text = "t4";
        t4.interactabled = true;
        
        uiStage.addChild(basicText);
        uiStage.addChild(t1);
        uiStage.addChild(t2);
        uiStage.addChild(t3);
        uiStage.addChild(t4);
        
        basicText.on('down',()=>{
            
            a.play();
        })
        t1.on('down',()=>{
           console.log("t1");
            b.play();
        })
        t2.on('down',()=>{
            console.log("t2");
             c.play();
         })
         t3.on('down',()=>{
            console.log("t3");
             d.play();
         })
         t4.on('down',()=>{
            console.log("t4");
             e.play();
         })
    }

}

