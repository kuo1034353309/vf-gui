// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../dist/gui.d.ts" />

export default class TestTween2 {

    public constructor(app: vf.Application, uiStage: vf.gui.Stage) {
        this.onLoad(app,uiStage)
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage) {

        console.log(performance.now());
        console.time();
        const tween = new vf.gui.Tween();
        tween.addListener('complete',()=>{
            console.timeEnd();
            console.log(performance.now());
        });
        const o = {x: 7000}
        tween.setObject(o);
        tween.to({x:0},4000)
        .start()
    }
}

