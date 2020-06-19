import { GroupController } from "../interaction/Index";
import { DisplayLayoutAbstract } from "./DisplayLayoutAbstract";
import { CSSStyle } from "../layout/CSSStyle";
import { updateDisplayLayout } from "../layout/CSSLayout";
import { UIBaseDrag } from "./plugs/UIBaseDrag";
import { deepCopy } from "../utils/Utils";
import { UIClick } from "./plugs/UIClick";
import { Filter } from "../UI";

/**
 * UI的顶级类，基础的UI对象
 *
 * @class
 * @since 1.0.0
 */
export class DisplayObject extends DisplayLayoutAbstract implements Lifecycle {
    /**
     * 构造函数
     */
    public constructor() {
        super();
        this.container.name = (this.constructor as any).name;
    }

    /**
     * 背景(内部使用)
     */
    public $background?: vf.Graphics;
    /**
     * 遮罩，设置遮罩后，组件内部的索引位置可能产生变化
     */
    public $mask?: vf.Graphics | vf.Sprite | DisplayObject;
    /**
     * 插件列表
     */
    public plugs = new Map<string, Lifecycle>();
    /**
     * 拖动限制门槛,小于设置的数不执行拖动,防止点击与滚动
     */
    public dragThreshold = 0;
    /** 模糊 */
    private blurFilter?: vf.filters.BlurFilter;
    /** 拖动时，事件流是否继续传输 */
    public dragStopPropagation = true;
    /**
     * 设置拖动
     */
    public get dragOption() {
        if (this.plugs.has(UIBaseDrag.key)) {
            return this.plugs.get(UIBaseDrag.key) as UIBaseDrag
        }
        return new UIBaseDrag(this);
    }
    public set dragOption(value: UIBaseDrag) {
        const dragOption = this.dragOption;
        deepCopy(value, dragOption);
    }


    /** 是否开启鼠标或触摸点击，开启后，接收TouchMouseEvent */
    public get interactabled() {
        const click = this.plugs.get(UIClick.key) as UIClick;
        if (click) {
            return true;
        }
        return false;
    }

    public set interactabled(value: boolean) {
        const click = this.plugs.get(UIClick.key) as UIClick;
        if (value) {
            if (!click) {
                new UIClick(this);
            }
        } else {
            if (click) {
                click.release();
            }
        }
    }

    /** 是否开启鼠标或触摸点击，开启后，接收TouchMouseEvent */
    public get isClick() {
        console.error('[VF LOG] isClick 已弃用，请使用 interactabled 替换!');
        return this.interactabled;
    }

    public set isClick(value: boolean) {
        console.error('[VF LOG] isClick 已弃用，请使用 interactabled 替换!');
        this.interactabled = value;
    }

    /**
     * 分组
     */
    protected _groupName?: string;
    public get groupName() {
        return this._groupName;
    }
    public set groupName(value) {

        if (value === undefined) {
            GroupController.unRegistrerGroup(this);
        }
        if (this._groupName == value) {
            return;
        }
        this._groupName = value;
        GroupController.registrerGroup(this);
    }


    /**
     * 透明度
     */
    public get alpha() {
        return this.container.alpha;
    }
    public set alpha(value) {
        this.container.alpha = value;
    }


    /** 色调 */
    private _tint: number | undefined;
    public get tint(): number | undefined {
        return this._tint;
    }
    public set tint(value: number | undefined) {
        if (value === this._blendMode) {
            return;
        }
        this._tint = value;
        this.container.children.forEach(childrenItem => {
            if ((childrenItem as any)["tint"]) {
                (childrenItem as any)["tint"] = value;
            }
        });
    }

    /** 
     * 混合模式 
     */
    private _blendMode: vf.BLEND_MODES | undefined;
    public get blendMode(): vf.BLEND_MODES | undefined {
        return this._blendMode;
    }
    public set blendMode(value: vf.BLEND_MODES | undefined) {
        if (value === this._blendMode) {
            return;
        }
        this._blendMode = value;
        this.container.children.forEach(childrenItem => {
            if (childrenItem instanceof vf.Sprite) {
                childrenItem.blendMode = value || vf.BLEND_MODES.NORMAL;
            }
        });
    }

    private _filterProxy: any = {};
    private _filterMap = new Map<string,Filter>();
    private _filterCount = 0;
    public get filter() {
        if (this._filterCount !== Filter.list.size) {

            this._filterCount = Filter.list.size;
            const {_filterProxy,_filterMap} = this;

            if(this.container.filters == null){
                this.container.filters = [];
            }
            const containerFilters = this.container.filters;

            Filter.list.forEach((cls: any, key: string) => {
                if(!_filterMap.has(key)){
                    const filter = new cls();
                    _filterMap.set(key,filter);
                    
                    Object.defineProperty(_filterProxy, key, {
                        get: function () {
                            const index = containerFilters.indexOf(filter);
                            if(index === -1){
                                containerFilters.push(filter);
                            }
                            return filter;
                        },
                        set(val) {
                            console.log(val)
                            if(val == null || val == ''){
                                const index = containerFilters.indexOf(filter);
                                if(index>=0){
                                    containerFilters.splice(index,1);
                                }
                                _filterMap.delete(key);
                            }
                        }
                    })
                }
            })
        }
        return this._filterProxy;
    }

    /**
     * 设置Blur XY的模糊强度
     *
     * 参数类型为number时，设置 blurX = blurY = value
     *
     */
    public set filterBlur(value: number) {
        const container = this.container;
        if (this.blurFilter === undefined) {
            this.blurFilter = new vf.filters.BlurFilter(8, 1, 1);
            container.filters = [this.blurFilter];
        }
        this.blurFilter.blur = value;

    }
    public get filterBlur() {
        return this.blurFilter ? this.blurFilter.blur : 0;
    }

    /**
     * 设置灰度
     *
     * 参数类型为 number, 接收一个百分比值，然后再将其转换为小数
     */
    private grayscaleFilter?: vf.filters.ColorMatrixFilter;
    private grayscaleFilterValue = 0;
    public set filterGrayscale(value: number) {
        const container = this.container;
        if (this.grayscaleFilter === undefined) {
            this.grayscaleFilter = new vf.filters.ColorMatrixFilter();
            container.filters = [this.grayscaleFilter];
        }

        this.grayscaleFilterValue = value / 100;
        this.grayscaleFilter.greyscale(this.grayscaleFilterValue, false);
    }

    public get filterGrayscale() {
        return this.grayscaleFilterValue * 100;
    }

    /**
     * 私有样式代理
     * */
    protected _style?: CSSStyle;
    /**
    *  在不同分辨率下保持像素稳定
    * @default
    */
    public pixelPerfect = true;
    /**
     * 动态属性，避免其他类注入
     */
    public attach: { [key: string]: object | number | string | Function } = {};
    /**
     * 获取样式
     */
    public get style(): CSSStyle {
        if (this._style == undefined) {
            this._style = new CSSStyle(this);
        }
        return this._style;
    }

    public set style(value: CSSStyle) {
        const style = this.style;
        deepCopy(value, style);
        this.invalidateParentLayout();
    }

    /**
     * 更新显示列表,子类重写，实现布局
     */
    protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void {

        if (!this.visible || this.alpha <=0 ) {  // 隐藏元素后，布局失效
            return;
        }
        if (this._style && this._style.display !== "none") {
            //console.log("displayStyle",unscaledWidth,unscaledHeight,this.left,this.right,this.x,this.y);
            updateDisplayLayout(this, unscaledWidth, unscaledHeight);
        } else {
            //console.log("display",this.x + this.pivotX,this.y + this.pivotY,this.scaleX,this.scaleY,this.rotation*(Math.PI/180),this.skewX,this.skewY,this.pivotX,this.pivotY);
            this.updateTransform();
        }
    }

    public load() {
        this.initializeUIValues();
        super.load();
    }

    public release() {

        const { container, $mask, $background,_filterMap } = this;

        container.filters = [];
        _filterMap.clear();

        if (this._style) {
            this._style.release();
            this._style = undefined;
        }

        if ($mask) {
            container.mask = null as any;
            if ($mask instanceof DisplayObject) {
                $mask.release();
            } else {
                $mask.parent && $mask.parent.removeChild($mask).destroy();
            }
            this.$mask = undefined;
        }

        if ($background && $background.parent) {
            $background.parent.removeChild($background).destroy();
            this.$background = undefined;
        }

        this.plugs.forEach(value => {
            value.release();
        });

        GroupController.unRegistrerGroup(this);

        super.release();
    }

    public releaseAll() {

        this.offAll();
        this.release();

        while (this.uiChildren.length > 0) {
            if (this.uiChildren[0].uiChildren.length > 0) {
                (this.uiChildren[0].uiChildren[0] as DisplayObject).releaseAll();
            }
            (this.uiChildren[0] as DisplayObject).releaseAll();
        }

        this.uiChildren = [];
        this.container.removeAllListeners();
        this.container.removeChildren();
    }
}
