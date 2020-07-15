// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../dist/gui.d.ts" />

export default class TestDrag {

    public constructor(app: vf.Application, uiStage: vf.gui.Stage) {
        this.onLoad(app, uiStage)
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage) {


        const c1 = this.getNewContainer("自由拖动");
        c1.container.x = 15;
        c1.container.y = 15;
        uiStage.addChild(c1.container);
        c1.rect.dragOption.draggable = true;
        c1.rect.dragOption.dragContainer = uiStage; //拖动时，移动对象到舞台，防止遮挡

        const c2 = this.getNewContainer("限定X轴移动");
        c2.container.x = 150;
        c2.container.y = 15;
        uiStage.addChild(c2.container);
        c2.rect.dragOption.draggable = true;
        c2.rect.dragOption.dragRestrictAxis = "x";

        const c3 = this.getNewContainer("限定Y轴移动");
        c3.container.x = 15;
        c3.container.y = 130;
        uiStage.addChild(c3.container);
        c3.rect.dragOption.draggable = true;
        c3.rect.dragOption.dragRestrictAxis = "y";

        const c4 = this.getNewContainer("限定边界");
        c4.container.x = 150;
        c4.container.y = 130;
        uiStage.addChild(c4.container);
        c4.rect.dragOption.draggable = true;
        c4.rect.dragOption.dragBoundary = true;//限定边界

        const c5 = this.getNewContainer("拖动回弹");
        c5.container.x = 15;
        c5.container.y = 250;
        uiStage.addChild(c5.container);
        c5.rect.dragOption.draggable = true;
        c5.rect.dragOption.dragBounces = true;//回弹

        const c7 = this.getNewContainer("接收容器", undefined, false);
        c7.container.x = 150;
        c7.container.y = 360;
        c7.container.name = "c7";
        c7.container.style.display = "grid";
        c7.container.style.gridTemplateColumns = ["repeat", 3, 30];
        c7.container.style.gridTemplateRows = ["repeat", 3, 30];
        c7.container.style.gridColumnGap = 10;
        c7.container.style.gridRowGap = 10;
        c7.container.width = 100;
        c7.container.height = 100;
        uiStage.addChild(c7.container);
        c7.container.dragOption.droppable = true;//开启掉落接收
        c7.container.dragOption.dropGroup = "group1";
        c7.container.on(vf.gui.Interaction.ComponentEvent.DROP_TARGET, (container: vf.gui.Container, source: vf.gui.Rect) => {
            console.log(container.name, source.name);
        });


        const c6 = this.getNewContainer("拖动到\n接收容器", undefined, false);
        c6.container.name = "c6";
        c6.container.x = 150;
        c6.container.y = 250;
        uiStage.addChild(c6.container);
        // ----------   绘制矩形设置可拖动 ---------- //
        let rect: vf.gui.Rect;
        for (let i = 0; i < 5; i++) {
            rect = new vf.gui.Rect();
            rect.name = "rect" + i.toString();
            new vf.gui.Interaction.ClickEvent(rect);
            rect.width = 30;
            rect.height = 30;
            rect.color = 0xffcc66;
            rect.x = 0;
            rect.y = 0;
            rect.dragOption.dragBounces = true;
            rect.dragOption.draggable = true;//开启拖拽
            rect.dragOption.dragGroup = "group1"; //设置分组，同时需要设置接收掉落方的dropGroup。
            rect.on(vf.gui.Interaction.ComponentEvent.DRAG_START, (rect1: vf.gui.Rect) => {
                console.log("DRAG_START");
                rect1.scaleX = rect1.scaleY = 1.5;
            }, this);
            rect.on(vf.gui.Interaction.ComponentEvent.DRAG_END, (rect1: vf.gui.Rect) => {
                console.log("DRAG_END");
                rect1.scaleX = rect1.scaleY = 1;
            }, this);
            rect.on(vf.gui.Interaction.ComponentEvent.DRAG_TARGET, (rect1: vf.gui.Rect) => {
                console.log("DRAG_TARGET");
                rect1.scaleX = rect1.scaleY = 1;
                rect1.dragOption.draggable = false;
            }, this);
            c6.container.addChild(rect);
        }

    }




    private getNewContainer(str: string, color = 0xffffff, rectVisible = true) {

        /** 单背景色 */
        const childContainer = new vf.gui.Container();
        new vf.gui.Interaction.ClickEvent(childContainer);
        childContainer.width = 100;
        childContainer.height = 100;
        childContainer.style.backgroundColor = color;

        const label = new vf.gui.Label();
        label.style.justifyContent = "center";
        label.style.alignContent = "center";
        label.style.color = 0x000000;
        label.style.fontSize = 24;
        label.style.wordWrap = true;
        label.style.wordWrapWidth = 100;
        label.text = str;
        childContainer.addChild(label);

        const rect = new vf.gui.Rect();
        rect.width = 30;
        rect.height = 30;
        rect.color = 0xffcc66;
        rect.x = 0;
        rect.y = 0;
        if (rectVisible)
            childContainer.addChild(rect);

        return { container: childContainer, rect };
    }
}
