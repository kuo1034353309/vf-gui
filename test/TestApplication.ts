// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../dist/gui.d.ts" />
export default class TestApplication {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public constructor(thisObj: any, callback: (app: vf.Application, uiStage: vf.gui.Stage) => void) {

        const resolution = window.devicePixelRatio || 1;
        const app = new vf.Application({
            width: document.body.offsetWidth / resolution,
            height: document.body.offsetHeight / resolution,
            antialias: true,
            forceCanvas: false,
            resolution:resolution
        });
        const uiStage = new vf.gui.Stage(app.view.width, app.view.height, app);
        uiStage.scaleX = uiStage.scaleY = 1 / resolution;
        console.log(uiStage.width);
        document.body.appendChild(app.view);
        callback.call(thisObj, app, uiStage);
    }
}