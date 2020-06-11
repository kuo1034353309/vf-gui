// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../dist/gui.d.ts" />

export default class TestTicker {

    public constructor(app: vf.Application, uiStage: vf.gui.Stage) {
        this.onLoad(app, uiStage)
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage) {

        //添加心跳
        vf.gui.TickerShared.add(this.update, this);

        //两秒后卸载当前跳
        // setTimeout(() => {
        //     if(this.update)
        //         vf.gui.TickerShared.remove(this.update,this);
        // }, 2000);

        //两秒后关闭整个心跳，包含缓动组件等所有
        // setTimeout(() => {
        //     if(this.update)
        //     vf.gui.TickerShared.disabled = true;
        // }, 2000);
    }

    private update(n: number) {
        //
    }
}
