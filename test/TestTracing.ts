// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../dist/gui.d.ts" />

export default class TestTracing {
    private tracing: vf.gui.Tracing;
    private tracing2: vf.gui.Tracing;
    public constructor(app: vf.Application, uiStage: vf.gui.Stage) {
        this.tracing = new vf.gui.Tracing();
        this.tracing2 = new vf.gui.Tracing();
        this.onLoad(app, uiStage);
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage) {
        const tracePoints = [
            [
                { x: 108.5625, y: 67.0703125 },
                { x: 92.30859375, y: 91.12109375 },
                { x: 73.35546875, y: 111.6953125 },
            ],
            [
                { x: 110.28125, y: 82.3515625 },
                { x: 154.99609375, y: 81.78515625 },
                { x: 200.60546875, y: 82.640625 },
            ],
            [
                { x: 101.8828125, y: 111.359375 },
                { x: 95.61328125, y: 147.6953125 },
                { x: 92.2421875, y: 186.08984375 },
                { x: 138.01171875, y: 188.6875 },
                { x: 194.1171875, y: 188.6875 },
            ],
            [
                { x: 108.015625, y: 109.6953125 },
                { x: 145.16796875, y: 110.49609375 },
                { x: 183.87109375, y: 111.18359375 },
                { x: 180.90625, y: 148.82421875 },
                { x: 176.85546875, y: 178.00390625 },
            ],
            [
                { x: 70.1953125, y: 147.79296875 },
                { x: 137.66015625, y: 147.83984375 },
                { x: 206.5234375, y: 148.63671875 },
            ],
            [
                { x: 134.48046875, y: 123.421875 },
                { x: 149.24609375, y: 133.0859375 },
            ],
            [
                { x: 130.77734375, y: 162.6171875 },
                { x: 146.1640625, y: 172.87109375 },
            ],
            [
                { x: 248.43359375, y: 67.94140625 },
                { x: 231.6328125, y: 102.875 },
                { x: 212.73046875, y: 126.8203125 },
            ],
            [
                { x: 249.109375, y: 94.546875 },
                { x: 283.87109375, y: 94.38671875 },
                { x: 326.99609375, y: 94.6640625 },
            ],
            [
                { x: 301.56640625, y: 105.62890625 },
                { x: 270.37890625, y: 155.0625 },
                { x: 215.25, y: 192.01953125 },
            ],
            [
                { x: 238.65234375, y: 117.91015625 },
                { x: 268.546875, y: 162.3203125 },
                { x: 326.93359375, y: 196.53125 },
            ],
            [
                { x: 175.21875, y: 201.94921875 },
                { x: 148.23828125, y: 216.9921875 },
                { x: 116.38671875, y: 231.87109375 },
                { x: 155.96484375, y: 229.46875 },
                { x: 181.94140625, y: 227.21484375 },
            ],
            [
                { x: 243.20703125, y: 212.8203125 },
                { x: 173.7578125, y: 242.53515625 },
                { x: 93.0625, y: 271.87109375 },
                { x: 200.01953125, y: 265.32421875 },
                { x: 270.01953125, y: 261.09375 },
            ],
            [
                { x: 259.90234375, y: 235.6796875 },
                { x: 285.921875, y: 255.140625 },
                { x: 311.0703125, y: 273.57421875 },
            ],
            [
                { x: 204.34375, y: 277.12890625 },
                { x: 202.53125, y: 301.94921875 },
                { x: 199.0078125, y: 321.453125 },
                { x: 160.7890625, y: 323.96484375 },
            ],
            [
                { x: 142.52734375, y: 291.484375 },
                { x: 111.8046875, y: 308.3515625 },
                { x: 80.84375, y: 322.27734375 },
            ],
            [
                { x: 250.578125, y: 292.7109375 },
                { x: 285.68359375, y: 306.30859375 },
                { x: 315.54296875, y: 319.05078125 },
            ],
        ];
        this.tracing.debug = true;
        this.tracing.x = 0;
        this.tracing.y = 200;
        this.tracing.width = 400;
        this.tracing.height = 400;
        this.tracing.mode = 0;
        uiStage.addChild(this.tracing);
        this.tracing.traceSprite = "assets/tracing/fan.png";
        this.tracing.renderBgSprite = "assets/tracing/maskBg.png";
        //tracing.lineTexture = 'assets/tracing/dino.png';
        this.tracing.tracePoints = tracePoints;

        const label = new vf.gui.Label();
        label.text = "未完成";
        label.x = 100;
        label.y = 100;
        uiStage.addChild(label);

        this.tracing2.debug = true;
        this.tracing2.x = 400;
        this.tracing2.y = 200;
        this.tracing2.width = 400;
        this.tracing2.height = 400;
        this.tracing.mode = 0;
        uiStage.addChild(this.tracing2);
        this.tracing2.traceSprite = "assets/tracing/fan.png";
        this.tracing2.renderBgSprite = "assets/tracing/maskBg.png";
        //tracing2.lineTexture = 'assets/tracing/dino.png';
        this.tracing2.tracePoints = tracePoints;

        const label2 = new vf.gui.Label();
        label2.text = "未完成";
        label2.x = 500;
        label2.y = 100;
        uiStage.addChild(label2);

        this.tracing.on(vf.gui.Interaction.ComponentEvent.CHANGE, (display: vf.gui.Tracing, data: string) => {

            this.tracing2.setData(data);
        });

        this.tracing2.on(vf.gui.Interaction.ComponentEvent.CHANGE, (display: vf.gui.Tracing, data: string) => {
            this.tracing.setData(data);
        });

        this.tracing.on(vf.gui.Interaction.ComponentEvent.COMPLETE, (display: vf.gui.Tracing, curValue: any) => {
            if (curValue.mode == vf.gui.Enum.TracingEnum.Mode.Check) {
                if (curValue.value == 0) {
                    label.text = "未完成";
                } else if (curValue.value == 1) {
                    label.text = "笔画正确";
                } else {
                    label.text = "笔画错误";
                }
            } else if (curValue.mode == vf.gui.Enum.TracingEnum.Mode.Auto) {
                label.text = "自动书写完成";
            } else if (curValue.mode == vf.gui.Enum.TracingEnum.Mode.Teach) {
                label.text = "教学完成";
            }
        });

        this.tracing2.on(vf.gui.Interaction.ComponentEvent.COMPLETE, (display: vf.gui.Tracing, curValue: any) => {
            if (curValue.mode == vf.gui.Enum.TracingEnum.Mode.Check) {
                if (curValue.value == 0) {
                    label2.text = "未完成";
                } else if (curValue.value == 1) {
                    label2.text = "笔画正确";
                } else {
                    label2.text = "笔画错误";
                }
            } else if (curValue.mode == vf.gui.Enum.TracingEnum.Mode.Auto) {
                label2.text = "自动书写完成";
            } else if (curValue.mode == vf.gui.Enum.TracingEnum.Mode.Teach) {
                label2.text = "教学完成";
            }
        });

        const clearBtn = new vf.gui.Button();
        clearBtn.x = 50;
        clearBtn.y = 30;
        clearBtn.text = "清除";
        uiStage.addChild(clearBtn);

        clearBtn.on(vf.gui.Interaction.TouchMouseEvent.onClick, () => {
            this.tracing.clear();
            this.tracing2.clear();
            label.text = "未完成";
            label2.text = "未完成";
        });

        //单选,通过设置分组区分
        const radio = this.getNewRadio(uiStage);
        radio.value = "0";
        radio.checked = true;
        radio.checkGroup = "radio";

        let basicText = new vf.gui.Label();
        basicText.style.left = 180;
        basicText.style.top = 30;
        basicText.style.color = 0xffffff;
        basicText.text = '笔画检测';
        uiStage.addChild(basicText);

        const radio2 = this.getNewRadio(uiStage);
        radio2.value = "1";
        radio2.style.left = 350;
        radio2.checkGroup = "radio";

        basicText = new vf.gui.Label();
        basicText.style.left = 380;
        basicText.style.top = 30;
        basicText.style.color = 0xffffff;
        basicText.text = '教学模式';
        uiStage.addChild(basicText);

        const radio3 = this.getNewRadio(uiStage);
        radio3.value = "2";
        radio3.style.left = 550;
        radio3.checkGroup = "radio";

        basicText = new vf.gui.Label();
        basicText.style.left = 580;
        basicText.style.top = 30;
        basicText.style.color = 0xffffff;
        basicText.text = '自动书写';
        uiStage.addChild(basicText);

        const radio4 = this.getNewRadio(uiStage);
        radio4.value = "3";
        radio4.style.left = 750;
        radio4.checkGroup = "radio";

        basicText = new vf.gui.Label();
        basicText.style.left = 780;
        basicText.style.top = 30;
        basicText.style.color = 0xffffff;
        basicText.text = '严格模式';
        uiStage.addChild(basicText);
    }

    private getNewRadio(uiStage: vf.gui.Stage) {
        const radio = new vf.gui.CheckBox();
        radio.style.top = 30;
        radio.style.left = 150;
        radio.style.width = 22;
        radio.style.height = 22;
        radio.up = "assets/skin/Radio/unselect.png";
        radio.down = "assets/skin/Radio/unselect.png";
        radio.move = "assets/skin/Radio/unselect.png";
        radio.disabled = "assets/skin/Radio/unselect.png";
        radio.upAndSelected = "assets/skin/Radio/select_up.png";
        radio.downAndSelected = "assets/skin/Radio/select_down.png";
        radio.moveAndSelected = "assets/skin/Radio/select_down.png";
        radio.disabledAndSelected = "assets/skin/Radio/select_disabled.png";
        radio.on(vf.gui.Interaction.ComponentEvent.CHANGE, this.onChange, this);
        uiStage.addChild(radio);
        return radio;
    }

    private onChange(checkBox: vf.gui.CheckBox) {
        if(checkBox.checked){
            const value= parseInt(checkBox.value);
            this.tracing.mode = value;
            this.tracing2.mode = value;
        }
    }
}
