// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../dist/gui.d.ts" />

export default class TestContainer {

    public constructor(app: vf.Application, uiStage: vf.gui.Stage) {
        this.onLoad(app, uiStage)
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage) {

        /** 单背景色 */
        const container1 = new vf.gui.Container();
        container1.style.display = "none";
        container1.name = "1";
        container1.x = 100;
        container1.y = 100;
        container1.width = 100;
        container1.height = 100;
        container1.style.left = 500;//display = "none"; 时，布局属性会失效
        container1.style.backgroundColor = 100;
        uiStage.addChild(container1);

        /** 不重复的背景 no-repeat */
        const container2 = new vf.gui.Container();
        container2.name = "2";
        container2.style.left = 240;
        container2.style.top = 100;
        container2.style.width = 100;
        container2.style.height = 100;
        container2.style.backgroundRepeat = "no-repeat";
        container2.style.backgroundColor = 0xffffff;
        container2.style.backgroundImage = "assets/btnbg.png";
        container2.style.backgroundPositionX = 20;
        container2.style.backgroundPositionY = 50;
        container2.style.backgroundSize = [50, 50];
        uiStage.addChild(container2);

        /** 重复的背景 */
        const container3 = new vf.gui.Container();
        container3.name = "3";
        container3.style.left = 380;
        container3.style.top = 100;
        container3.style.width = 100;
        container3.style.height = 100;
        container3.style.backgroundRepeat = "repeat";
        container3.style.backgroundColor = 0xffffff;
        container3.style.backgroundImage = "assets/pc.png";
        container3.style.backgroundPositionX = 20;
        container3.style.backgroundPositionY = 0;
        uiStage.addChild(container3);

        /** 百分比设置元素位置与宽高 */
        const container4 = new vf.gui.Container();
        container4.name = "4";
        container4.style.left = 100 / (uiStage.width / 100) + "%";
        container4.style.top = 250 / (uiStage.height / 100) + "%";
        container4.style.width = 100 / (uiStage.width / 100) + "%";
        container4.style.height = 100 / (uiStage.height / 100) + "%";
        container4.style.backgroundColor = 0xffffcc;
        uiStage.addChild(container4);


        /** 百分比设置最大高度与宽度*/
        const container5 = new vf.gui.Container();
        container5.name = "5";
        container5.style.left = 240;
        container5.style.top = 250;
        container5.style.width = 1006;
        container5.style.height = 1006;
        container5.style.maxWidth = 100;
        container5.style.maxHeight = 100;
        container5.style.backgroundColor = 0xffffff;
        uiStage.addChild(container5);

        /** 百分比设置最小高度与宽度,设置抽点 */
        const container6 = new vf.gui.Container();
        container6.name = "6";
        container6.style.left = 430;
        container6.style.top = 300;
        container6.style.width = 10;
        container6.style.height = 10;
        container6.style.minWidth = 100;
        container6.style.minHeight = 100;
        container6.style.backgroundColor = 0xffffff;
        container6.style.pivotX = container6.style.pivotY = 50;
        //container6.style.scaleX = container6.style.scaleY = 1.2;
        uiStage.addChild(container6);

        /** 顶部  白色 */
        const containerTop = new vf.gui.Container();
        containerTop.name = "top";
        containerTop.style.alpha = 0.7;
        containerTop.style.top = 0;
        containerTop.style.left = 0;
        containerTop.style.right = 0;
        containerTop.style.height = 50;
        containerTop.style.backgroundColor = 0xffffff;
        uiStage.addChild(containerTop);

        /** 左边  红色 */
        const containerLeft = new vf.gui.Container();
        containerLeft.name = "left";
        containerLeft.style.alpha = 0.7;
        containerLeft.style.left = 0;
        containerLeft.style.top = 0;
        containerLeft.style.bottom = 0;
        containerLeft.style.width = 50;
        containerLeft.style.backgroundColor = 0xf44336;
        uiStage.addChild(containerLeft);

        /** 右边  蓝色 */
        const containerRight = new vf.gui.Container();
        containerRight.name = "right";
        containerRight.style.alpha = 0.7;
        containerRight.style.top = 0;
        containerRight.style.right = 0;
        containerRight.style.bottom = 0;
        containerRight.style.width = 50;
        containerRight.style.backgroundColor = 100;
        uiStage.addChild(containerRight);

        /** 底部  绿色 */
        const containerBottom = new vf.gui.Container();
        containerBottom.name = "bottom";
        containerBottom.style.alpha = 0.7;
        containerBottom.style.left = 0;
        containerBottom.style.right = 0;
        containerBottom.style.bottom = 0;
        containerBottom.style.height = 50;
        containerBottom.style.backgroundColor = 0x4caf50;
        uiStage.addChild(containerBottom);


        vf.gui.TickerShared.add(() => {
            container6.rotation += .1;
            //container6.style.rotation += .1;
            console.log(vf.gui.TickerShared.deltaTime);
        }, this);

        setTimeout(() => {
            console.log('setTimeout');
            container2.style.width = 200;
        }, 5000);

    }
}
