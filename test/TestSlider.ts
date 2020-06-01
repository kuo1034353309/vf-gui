// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../dist/gui.d.ts" />

export default class TestSlider {

    public constructor(app: vf.Application, uiStage: vf.gui.Stage) {
        this.onLoad(app, uiStage)
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage) {

        /** 水平滑动条 vertical = false */
        const slider = new vf.gui.Slider();
        slider.vertical = false;
        slider.thumb = "assets/skin/Slider/thumb.png";
        slider.track = "assets/skin/Slider/track.png";
        slider.tracklight = "assets/skin/Slider/tracklight.png";
        slider.style.width = 300;
        slider.style.height = 10;
        slider.style.top = 50;
        slider.style.left = 50;
        slider.value = 50;
        uiStage.addChild(slider);


        /** 垂直滑动条 vertical = true */
        const slider2 = new vf.gui.Slider();
        slider2.vertical = true;
        slider2.thumb = "assets/skin/Slider/thumb.png";
        slider2.track = "assets/skin/Slider/track.png";
        slider2.tracklight = "assets/skin/Slider/tracklight.png";
        slider2.style.width = 10;
        slider2.style.height = 300;
        slider2.style.top = 100;
        slider2.style.left = 50;
        slider2.value = 50;
        uiStage.addChild(slider2);

        /** 进度条 vertical = true */
        const slider3 = new vf.gui.Slider();
        slider3.vertical = false;
        //slider3.props.thumb = "assets/skin/Slider/thumb.png";
        slider3.track = "assets/skin/Slider/track.png";
        slider3.tracklight = "assets/skin/Slider/tracklight.png";
        slider3.style.width = 300;
        slider3.style.height = 10;
        slider3.style.top = 450;
        slider3.style.left = 50;
        slider3.value = 50;
        uiStage.addChild(slider3);




        const changeText = new vf.gui.Label("slider");
        changeText.style.top = 100;
        changeText.style.left = 150;
        changeText.style.color = 0xff00cc;
        uiStage.addChild(changeText);

        const changingText = new vf.gui.Label("slider2");
        changingText.style.top = 150;
        changingText.style.left = 150;
        changingText.style.color = 0xff00cc;
        uiStage.addChild(changingText);

        const progressText = new vf.gui.Label("slider3");
        progressText.style.top = 430;
        progressText.style.left = 150;
        progressText.style.color = 0xff00cc;
        uiStage.addChild(progressText);

        let count = 0;
        vf.gui.TickerShared.add(() => {
            if (count > 100) {
                count = 0;
            }
            slider3.value = count;
            count++;
        }, this)


        slider.on(vf.gui.Interaction.ComponentEvent.CHANGE, (slider: vf.gui.CheckBox, curValue: number) => {
            changeText.text = "change:" + curValue;
        });
        slider.on(vf.gui.Interaction.ComponentEvent.CHANGEING, (slider: vf.gui.CheckBox, curValue: number) => {
            changingText.text = "changing:" + curValue;
        })

        slider2.on(vf.gui.Interaction.ComponentEvent.CHANGE, (slider: vf.gui.CheckBox, curValue: number) => {
            changeText.text = "change:" + curValue;
        });
        slider2.on(vf.gui.Interaction.ComponentEvent.CHANGEING, (slider: vf.gui.CheckBox, curValue: number) => {
            changingText.text = "changing:" + curValue;
        });

        slider3.on(vf.gui.Interaction.ComponentEvent.CHANGE, (slider: vf.gui.CheckBox, curValue: number) => {
            progressText.text = "progress:" + curValue;
        });

    }

}

