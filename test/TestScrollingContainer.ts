// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../dist/gui.d.ts" />

export default class TestScrollingContainer {

    public constructor(app: vf.Application, uiStage: vf.gui.Stage) {
        this.onLoad(app, uiStage)
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage) {

        /** 滚动容器 水平拖动 */
        const scX = this.addSc(uiStage, 50, 40, "水平拖动");
        scX.scrollX = true;
        scX.dragScrolling = true;//是否启用拖动滚动

        /** 滚动容器 垂直拖动 */
        const scY = this.addSc(uiStage, 50, 260, "垂直拖动");
        scY.dragScrolling = true;//是否启用拖动滚动
        scY.scrollY = true;

        /** 滚动容器 垂直水平拖动 */
        const scXY = this.addSc(uiStage, 50, 480, "任意拖动");
        scXY.dragScrolling = true;//是否启用拖动滚动
        scXY.scrollX = true;
        scXY.scrollY = true;
    }

    private addSc(uiStage: vf.gui.Stage, x: number, y: number, label: string) {


        const sc = new vf.gui.ScrollingContainer();
        sc.style.left = x;
        sc.style.top = y;
        sc.style.width = 300;
        sc.style.height = 200;
        sc.expandMask = 2;
        sc.softness = 0.2;
        uiStage.addChild(sc);

        const title = new vf.gui.Label(label);
        title.style.color = 0xffcc00;
        sc.addChild(title);

        for (let i = 0; i < 5; i++) {
            const sp = new vf.gui.Image();
            sp.style.top = i * 620;
            sp.src = "assets/sprite.png";
            sc.addChild(sp);
        }
        return sc;
    }
}

