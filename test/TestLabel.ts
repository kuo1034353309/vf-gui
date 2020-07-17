// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../dist/gui.d.ts" />

export default class TestLabel {

    public constructor(app: vf.Application, uiStage: vf.gui.Stage) {
        this.onLoad(app, uiStage)
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage) {

        /** 基础文本展示 */
        const basicText = new vf.gui.Label();
        basicText.style.left = 15;
        basicText.style.top = 50;
        basicText.style.color = 0xffffff;
        basicText.text = "Basic text in vf-gui 33434"
        // basicText.textDecoration = 3;
        uiStage.addChild(basicText);

        /** 手动换行文本展示 "\n" */
        const nText = new vf.gui.Label();
        nText.style.left = 15;
        nText.style.top = 100;
        nText.style.width = 500;
        nText.style.color = [0xffffff, 0xffcc00];
 
        
        nText.style.letterSpacing = 0;
        nText.style.wordWrap = false;
        nText.style.wordWrapWidth = 200;
        nText.style.fontSize = 30;
        nText.text = "22324242    q  　　3      3             \nasda3423asaasdasdx\ndfgdfgdgdfgdg\ndfgdfgdgdgdfdhrtge\nergergegeg\ndfsdfdsfsdfsd"
        nText.style.textAlign = "center";
        // nText.style.verticalAlign = "middle";
        
        nText.textDecoration = "LineThrough";
        nText.textDecorationColor = 0x9e0;
     
        uiStage.addChild(nText);
     

        /** 高级样式文本,换行的宽度为 fields.wordWrapWidth = 600; */
        const richText = new vf.gui.Label();
        richText.style.left = 15
        richText.style.top = 180;
        richText.fontCssStyle = this.getFontCssStyle();
        richText.text = '包含了换行与多种自定义样式的组件,包含了换行与多种自定义样式的组件,包含了换行与多种自定义样式的组件';
        // uiStage.addChild(richText);

        /** 限定宽度 */
        const wText = new vf.gui.Label();
        wText.style.left = 5;
        wText.style.top = 400;
        wText.style.color = [0xffffff, 0xffcc00];
        wText.style.width = 300;
        wText.style.height = 100;
        wText.style.wordWrapWidth
        wText.style.textAlign = "center";
        wText.style.verticalAlign = "middle";
        wText.text = "我限定了宽度与位置";
        wText.style.backgroundColor = 0xfff;
        uiStage.addChild(wText);
    }

    private getFontCssStyle() {
        // 自定义样式 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const fields = {} as any;
        fields.fontFamily = 'Arial';
        fields.fontSize = 36;
        fields.fontStyle = 'italic';
        fields.fontWeight = 'bold';
        fields.color = [0xffffff, 0x00ff99]; // gradient
        fields.align = "center"
        fields.stroke = 0x4a1850;
        fields.strokeThickness = 5;

        fields.dropShadow = true;
        fields.dropShadowColor = 0x000000;
        fields.dropShadowBlur = 4;
        fields.dropShadowAngle = Math.PI / 6;
        fields.dropShadowDistance = 6;
        fields.wordWrap = true;
        fields.wordWrapWidth = 600;

        return fields;
    }

}

