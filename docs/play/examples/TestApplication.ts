// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../dist/gui.d.ts" />
import updateViewSize from "./WebPlayerSize";

export default class TestApplication {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public constructor(thisObj: any, callback: (app: vf.Application, uiStage: vf.gui.Stage) => void) {

        this.app = new vf.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            antialias: true,
            forceCanvas: false
        });
        updateViewSize(this.app, window.devicePixelRatio, vf.utils.isWebGLSupported(), 'noScale');
        this.uiStage = new vf.gui.Stage(this.app.view.width, this.app.view.height, this.app);
        this.app.stage.addChild(this.uiStage.container);
        document.body.appendChild(this.app.view);
        this.thisObj = thisObj;
        this.callback = callback;
        this.initTest();

    }

    private uiStage: vf.gui.Stage;
    private app: vf.Application;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private thisObj: any;
    private callback: (app: vf.Application, uiStage: vf.gui.Stage) => void;

    private initTest() {
        this.resize();
        this.callback.call(this.thisObj, this.app, this.uiStage);
        window.addEventListener("resize", () => {
            this.resize();
        });
    }

    private resize() {
        this.app.resize();
        this.uiStage.resize();
    }
}