/* eslint-disable @typescript-eslint/no-use-before-define */
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../dist/gui.d.ts" />

export default class TestTween {

    public constructor(app: vf.Application, uiStage: vf.gui.Stage) {
        this.onLoad(app, uiStage)
    }

    private onLoad(app: vf.Application, uiStage: vf.gui.Stage) {

        const root = new vf.gui.Container();
        root.style.backgroundColor = 0x136086;
        root.style.height = 10;
        root.style.width = 100;
        root.style.bottom = 0;
        root.style.left = "50%";
        root.style.pivotX = 5;
        root.style.pivotY = 5;
        root.style.rotation = -95;
        uiStage.addChild(root);

        new vf.gui.Tween(root.style).to({ rotation: -85 }, 2000)
            .repeat(Infinity)
            .easing(vf.gui.Easing.Linear.None)
            .yoyo(true)
            .start();


        const rootNode = new Node(undefined, root);
        this.createBiTree(rootNode, 0);
    }


    protected createBiTree(node: Node, layer: number) {
        if (layer > 7) {
            return;
        }
        node.leftChild = new Node(node);
        node.leftChild.isLeft = true;
        node.leftChild.div.style.rotation = 35;
        this.createBiTree(node.leftChild, ++layer);
        
        node.rightChild = new Node(node);
        node.rightChild.div.style.rotation = -35;
        this.createBiTree(node.rightChild, layer);
    }


}


class Node {
    public constructor(parent?: Node, root?: vf.gui.Container) {
        const div = this.div;
        div.style.backgroundColor = 0x4caf50;
        div.style.height = 10;
        div.style.width = 100;
        div.style.left = 100;
        div.style.top = 0;
        div.style.pivotX = 5;
        div.style.pivotY = 5;
        div.style.scaleX = 0.9;
        div.style.scaleY = 0.9;

        new vf.gui.Tween(div.style).to({ rotation: 0, scaleX: 0.1, scaleY: 0.1 }, 7000)
            .repeat(Infinity)
            .easing(vf.gui.Easing.Linear.None)
            .yoyo(true)
            .delay(1000)
            .start()

        new vf.gui.Tween({ color: "#4caf50" })
            .to({ color: "#136086" }, 7000)
            .repeat(Infinity)
            .easing(vf.gui.Easing.Quadratic.InOut)
            .yoyo(true)// eslint-disable-next-line @typescript-eslint/no-explicit-any
            .on(vf.gui.Tween.Event.update, (obj: any) => {
                if (obj.color.indexOf("-") === -1) {
                    div.style.backgroundColor = vf.gui.Utils.rgbStrToNumber(obj.color);
                }
            })
            .start();

        if (root) {
            root.addChild(div);
        } else {
            if (parent) {
                this.parent = parent;
                parent.div.addChild(div);
            }
        }

    }

    public div = new vf.gui.Container();
    public parent?: Node;
    public isLeft = false;
    public leftChild?: Node;
    public rightChild?: Node;
}
