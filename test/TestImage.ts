// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../dist/gui.d.ts" />

export default class TestImage {

    public constructor(app: vf.Application, uiStage: vf.gui.Stage) {
        this.onLoad(app, uiStage)
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage) {

        //灰色
        const img1 = new vf.gui.Image();
        img1.style.left = 15;
        img1.style.top = 15;
        img1.style.width = 340;
        img1.style.height = 160;
        img1.src = "assets/mask/bg2.png";
        uiStage.addChild(img1);

        //彩色
        const img2 = new vf.gui.Image();
        img2.style.left = 15;
        img2.style.top = 15;
        img2.style.width = 340;
        img2.style.height = 160;
        img2.style.maskImage = "assets/mask/clear1.png";
        img2.style.maskSize = [100, 100];
        img2.style.maskPosition = [-70, -70];
        img2.src = "assets/mask/bg.jpg";
        uiStage.addChild(img2);

        /** 样式宽高为0时，适配原始图片宽高 */
        const img3 = new vf.gui.Image();
        img3.x = 25;
        img3.y = 200;
        img3.src = "assets/dino.png";
        img3.tint = 0xffcc00;//填充颜色
        uiStage.addChild(img3);

        //canvas兼容测试
        const rect = new vf.gui.Rect();
        rect.color = 0xffffff;
        rect.lineColor = 0xff00cc;
        rect.lineWidth = 1;
        rect.radius = 10; //圆角

        //彩色
        const img4 = new vf.gui.Image();
        img4.x = 150;
        img4.y = 200;
        img4.style.maskImage = rect;
        img4.style.maskSize = [100, 50];
        img4.style.maskPosition = [0, 20]; //如果没有添加到舞台，坐标按当前父级算
        img4.src = "assets/dino.png";
        uiStage.addChild(img4);

        let count = 0;
        vf.gui.TickerShared.add(() => {

            if (count == 700) {
                count = 0;
            }
            if (img2.style.maskSize && img2.style.maskSize[0] < 1200) {
                img2.style.maskSize = [count, count];
            }
            count++;
        }, this);
    }
}
