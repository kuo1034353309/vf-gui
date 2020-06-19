/* eslint-disable @typescript-eslint/no-explicit-any */
import * as UIKeys from "./DisplayLayoutKeys";
import validatorShared from "./DisplayLayoutValidator";
import { ComponentEvent } from "../interaction/Index";
import { formatRelative } from "../utils/Utils";
import { DisplayObjectAbstract } from "./DisplayObjectAbstract";
import { measure } from "../layout/CSSLayout";

export const $tempLocalBounds = new vf.Rectangle();
/**
 * UI 布局的基础属性类
 */
export class DisplayLayoutAbstract extends DisplayObjectAbstract {

    public constructor() {
        super();
        this.initializeUIValues();
    }

    public isContainer = false;

    /**
     * @private
     */
    public $values: any = {};

    /**
     * 背景(内部使用)
     */
    public $background?: vf.Graphics;
    /**
     * @private
     * 定义的所有变量请不要添加任何初始值，必须统一在此处初始化。
     */
    protected initializeUIValues(): void {
        this.$values = {
            [UIKeys.invalidatePropertiesFlag]: true,
            [UIKeys.invalidateSizeFlag]: true,
            [UIKeys.invalidateDisplayListFlag]: true,
            [UIKeys.includeInLayout]: true,
            [UIKeys.left]: NaN,
            [UIKeys.right]: NaN,
            [UIKeys.top]: NaN,
            [UIKeys.bottom]: NaN,
            [UIKeys.horizontalCenter]: NaN,
            [UIKeys.verticalCenter]: NaN,
            [UIKeys.percentWidth]: NaN,
            [UIKeys.percentHeight]: NaN,
            [UIKeys.width]: NaN,
            [UIKeys.height]: NaN,
            [UIKeys.explicitWidth]: NaN,
            [UIKeys.explicitHeight]: NaN,
            [UIKeys.minWidth]: 0,
            [UIKeys.maxWidth]: 100000,
            [UIKeys.minHeight]: 0,
            [UIKeys.maxHeight]: 100000,
            [UIKeys.measuredWidth]: 0,
            [UIKeys.measuredHeight]: 0,
            [UIKeys.oldPreferWidth]: NaN,
            [UIKeys.oldPreferHeight]: NaN,
            [UIKeys.scaleX]: 1,
            [UIKeys.scaleY]: 1,
            [UIKeys.backgroundColor]:undefined,
            [UIKeys.oldBackgroundColor]:undefined,
        };
    }

    /**
     * @private
     * 检查属性失效标记并应用
     */
    protected checkInvalidateFlag(): void {
        const values = this.$values;
        if (values[UIKeys.invalidatePropertiesFlag]) {
            validatorShared.invalidateProperties(this);
        }
        if (values[UIKeys.invalidateSizeFlag]) {
            validatorShared.invalidateSize(this);
        }
        if (values[UIKeys.invalidateDisplayListFlag]) {
            validatorShared.invalidateDisplayList(this);
        }
        this.validateSize();
    }

    /**
     * @private
     * 验证组件的属性
     */
    public validateProperties(): void {
        const values = this.$values;
        if (values[UIKeys.invalidatePropertiesFlag]) {
            this.commitProperties();
            values[UIKeys.invalidatePropertiesFlag] = false;
        }
    }

    /**
     * @private
     * 验证组件的尺寸
     */
    public validateSize(recursive?: boolean): void {

        if (this.parent === undefined) {
            return;
        }

        if (recursive) {
            const children = this.uiChildren;
            if (children) {
                const length = children.length;
                for (let i = 0; i < length; i++) {
                    const child = children[i] as DisplayLayoutAbstract;
                    child.validateSize(true);
                }
            }
        }
        const values = this.$values;
        if (values[UIKeys.invalidateSizeFlag]) {
            const changed = this.measureSizes();
            if (changed) {
                this.invalidateDisplayList();
                this.invalidateParentLayout();
            }

            values[UIKeys.invalidateSizeFlag] = false;
        }
    }
    /**
     * @private
     * 验证子项的位置和大小，并绘制其他可视内容
     */
    public validateDisplayList(): void {
        if (this.parent == undefined) {
            return;
        }
        const values = this.$values;

        if (values[UIKeys.invalidateDisplayListFlag]) {
            this.updateSize();
            this.updateDisplayList(this.width, this.height);
            values[UIKeys.invalidateDisplayListFlag] = false;
        }
    }
    /**
     * @private
     * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
     */
    protected commitProperties(): void {
        //
    }

    /**
     * @private
     * 测量组件尺寸，返回尺寸是否发生变化
     */
    protected measureSizes(): boolean {
        let changed = false;
        const values = this.$values;

        if (!values[UIKeys.invalidateSizeFlag])
            return changed;

        const parent = this.parent;
        const parentWidth = parent ? parent.width : 1;
        const parentHeight = parent ? parent.height : 1;
        const maxWidth = formatRelative(values[UIKeys.maxWidth], parentWidth);
        const maxHeight = formatRelative(values[UIKeys.maxHeight], parentHeight);
        const minWidth = formatRelative(values[UIKeys.minWidth], parentWidth);
        const minHeight = formatRelative(values[UIKeys.minHeight], parentHeight);

        //显示设置宽高，会忽略最大与最小值
        if (isNaN(values[UIKeys.explicitWidth]) || isNaN(values[UIKeys.explicitHeight])) {

            if (!isNaN(values[UIKeys.percentWidth])) {
                values[UIKeys.measuredWidth] = Math.ceil(values[UIKeys.percentWidth] * parentWidth);
            }
            else {
                values[UIKeys.measuredWidth] = this.container.width;
            }
            if (!isNaN(values[UIKeys.percentHeight])) {
                values[UIKeys.measuredHeight] = Math.ceil(values[UIKeys.percentHeight] * parentHeight);
            }
            else {
                values[UIKeys.measuredHeight] = this.container.height;
            }

            if (values[UIKeys.measuredWidth] < minWidth) {
                values[UIKeys.measuredWidth] = minWidth;
            }
            if (values[UIKeys.measuredWidth] > maxWidth) {
                values[UIKeys.measuredWidth] = maxWidth;
            }
            if (values[UIKeys.measuredHeight] < minHeight) {
                values[UIKeys.measuredHeight] = minHeight;
            }
            if (values[UIKeys.measuredHeight] > maxHeight) {
                values[UIKeys.measuredHeight] = maxHeight;
            }
        } else {
            if (values[UIKeys.explicitWidth] < minWidth) {
                values[UIKeys.explicitWidth] = minWidth;
            }
            if (values[UIKeys.explicitWidth] > maxWidth) {
                values[UIKeys.explicitWidth] = maxWidth;
            }
            if (values[UIKeys.explicitHeight] < minHeight) {
                values[UIKeys.explicitHeight] = minHeight;
            }
            if (values[UIKeys.explicitHeight] > maxHeight) {
                values[UIKeys.explicitHeight] = maxHeight
            }
        }
        const preferredW = this.getPreferredUWidth();
        const preferredH = this.getPreferredUHeight();

        if (preferredW !== values[UIKeys.oldPreferWidth] ||
            preferredH !== values[UIKeys.oldPreferHeight]) {
            values[UIKeys.oldPreferWidth] = preferredW;
            values[UIKeys.oldPreferHeight] = preferredH;
            changed = true;
        }
        return changed;
    }

    /**
     * @private
     *
     * @returns
     */
    protected getPreferredUWidth(): number {
        const values = this.$values;
        if (isNaN(values[UIKeys.explicitWidth])) {
            return values[UIKeys.measuredWidth];
        }
        return values[UIKeys.explicitWidth];
    }

    /**
     * @private
     */
    protected getPreferredUHeight(): number {
        const values = this.$values;
        if (isNaN(values[UIKeys.explicitHeight])) {
            return values[UIKeys.measuredHeight];
        }
        return values[UIKeys.explicitHeight];
    }
    /**
     * @private
     * 获取组件的首选尺寸,常用于父级的measure()方法中
     * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
     */
    public getPreferredBounds(bounds: vf.Rectangle) {
        bounds.width = this.getPreferredUWidth();
        bounds.height = this.getPreferredUHeight();
        bounds.x = this.container.x;
        bounds.y = this.container.y;
        return bounds;
    }

    /**
    * @private
    * 标记提交过需要延迟应用的属性，以便在稍后屏幕更新期间调用该组件的 commitProperties() 方法。
    *
    * 例如，要更改文本颜色和大小，如果在更改颜色后立即进行更新，然后在设置大小后再更新大小，就有些浪费。
    * 同时更改两个属性后再使用新的大小和颜色一次性呈示文本，效率会更高。<p/>
    *
    * 通常，子类应覆盖 commitProperties() 方法，而不是覆盖此方法。
     */
    public invalidateProperties(): void {
        const values = this.$values;
        if (!values[UIKeys.invalidatePropertiesFlag]) {
            values[UIKeys.invalidatePropertiesFlag] = true;
            validatorShared.invalidateProperties(this);

        }
    }

    /**
    * @private
    * 标记提交过需要验证组件尺寸，以便在稍后屏幕更新期间调用该组件的 measure(),updatesize() 方法。
    */
    public invalidateSize(): void {
        if (this.visible) { // 隐藏元素后，布局失效
            const values = this.$values;
            if (!values[UIKeys.invalidateSizeFlag]) {
                values[UIKeys.invalidateSizeFlag] = true;
                validatorShared.invalidateSize(this);
            }
        }
    }
    /**
    * @private
    * 标记需要验证显示列表，以便在稍后屏幕更新期间调用该组件的 updateDisplayList() 方法。
    */
    public invalidateDisplayList(): void {
        if (this.visible) { // 隐藏元素后，布局失效
            const values = this.$values;
            if (!values[UIKeys.invalidateDisplayListFlag]) {
                values[UIKeys.invalidateDisplayListFlag] = true;
                validatorShared.invalidateDisplayList(this);
            }
        }
    }
    /**
     * @private
     * 标记父级容器的尺寸和显示列表为失效
     */
    public invalidateParentLayout(): void {
        if (this.visible) { // 隐藏元素后，布局失效
            const parent = this.parent;
            if (!parent || !this.$values[UIKeys.includeInLayout]) {
                return;
            }
            if (parent instanceof DisplayLayoutAbstract) {
                parent.invalidateSize();
                parent.invalidateDisplayList();
            }
        }
    }
    /**
     * @private
     * 设置组件的布局位置
     */
    public setPosition(x?: number | undefined, y?: number | undefined): void {
        this.container.position.set(x,y);
        this.emit(ComponentEvent.MOVE, this);

    }
    /**
     * @private
     * 设置测量结果。
     * @param width 测量宽度
     * @param height 测量高度
     */
    public setMeasuredSize(width: number, height: number): void {
        const values = this.$values;
        values[UIKeys.measuredWidth] = Math.ceil(+width || 0);
        values[UIKeys.measuredHeight] = Math.ceil(+height || 0);
    }
    /**
     * @private
     * 设置组件的宽高。此方法不同于直接设置width,height属性，
     * 不会影响显式标记尺寸属性
     */
    public setActualSize(w: number, h: number): void {
        let change = false;
        const values = this.$values;

        if (values[UIKeys.width] !== w) {
            //this.container.width = w;
            values[UIKeys.explicitWidth] = w;
            values[UIKeys.width] = w;
            change = true;
        }
        if (values[UIKeys.height] !== h) {
            //this.container.height = h;
            values[UIKeys.explicitHeight] = h;
            values[UIKeys.height] = w;
            change = true;
        }

        if (change) {
            this.invalidateDisplayList();
            this.emit(ComponentEvent.RESIZE, this);
        }
    }

    /**
     * @private
     * 更新最终的组件宽高
     */
    private updateSize(): void {
        this.setActualSize(this.getPreferredUWidth(), this.getPreferredUHeight());
    }

    public updateTransform() {
        this.container.setTransform(this.x + this.pivotX, this.y + this.pivotY, this.scaleX, this.scaleY, this.rotation * (Math.PI / 180), this.skewX, this.skewY, this.pivotX, this.pivotY);
    }
    /**
     * 更新显示列表,子类重写，实现布局
     */
    protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void {
        //
    }

    /**
     * @private
     * 立即应用组件及其子项的所有属性
     */
    public validateNow(): void {
        if (this.parent)
            validatorShared.validateClient(this);
    }

    /**
     * @private
    * 验证并更新此对象的属性和布局，如果需要的话重绘对象。
    *
    * 通常只有当脚本执行完毕后，才会处理要求进行大量计算的处理属性。<p/>
    *
    * 例如，对 width 属性的设置可能会延迟，因为此设置需要重新计算这些对象的子项或父项的宽度。
    * 如果脚本多次设置了 width 属性，则延迟处理可防止进行多次处理。此方法允许您手动覆盖此行为。
     */
    public validateSizeNow(): void {
        this.validateSize(true);
        this.updateSize();
    }
    /**
     * 指定此组件是否包含在父容器的布局中。若为false，则父级容器在测量和布局阶段都忽略此组件。默认值为true。
     * 注意，visible属性与此属性不同，设置visible为false，父级容器仍会对其布局。
     */
    public get includeInLayout(): boolean {
        return this.$values[UIKeys.includeInLayout];
    }

    public set includeInLayout(value: boolean) {
        const values = this.$values;
        value = !!value;
        if (values[UIKeys.includeInLayout] === value)
            return;
        values[UIKeys.includeInLayout] = true;
        this.invalidateParentLayout();
        values[UIKeys.includeInLayout] = value;
    }
    /**
     * @private
     * 距父级容器离左边距离
     */
    public get left(): any {
        return this.$values[UIKeys.left];
    }

    public set left(value: any) {
        if (!value || typeof value == "number") {
            value = +value;
        }
        else {
            value = value.toString().trim();
        }

        const values = this.$values;
        if (values[UIKeys.left] === value)
            return;
        values[UIKeys.left] = value;
        this.invalidateParentLayout();
    }

    /**
     * @private
     * 距父级容器右边距离
     */
    public get right(): any {
        return this.$values[UIKeys.right];
    }

    public set right(value: any) {
        if (!value || typeof value == "number") {
            value = +value;
        }
        else {
            value = value.toString().trim();
        }
        const values = this.$values;
        if (values[UIKeys.right] === value)
            return;
        values[UIKeys.right] = value;
        this.invalidateParentLayout();
    }

    /**
     * @private
     * 距父级容器顶部距离
     */
    public get top(): any {
        return this.$values[UIKeys.top];
    }

    public set top(value: any) {
        if (!value || typeof value == "number") {
            value = +value;
        }
        else {
            value = value.toString().trim();
        }
        const values = this.$values;
        if (values[UIKeys.top] === value)
            return;
        values[UIKeys.top] = value;
        this.invalidateParentLayout();
    }

    /**
     * @private
     * 距父级容器底部距离
     */
    public get bottom(): any {
        return this.$values[UIKeys.bottom];
    }

    public set bottom(value: any) {
        if (!value || typeof value == "number") {
            value = +value;
        }
        else {
            value = value.toString().trim();
        }
        const values = this.$values;
        if (values[UIKeys.bottom] == value)
            return;
        values[UIKeys.bottom] = value;
        this.invalidateParentLayout();
    }


    /**
     * @private
     * 在父级容器中距水平中心位置的距离
     */
    public get horizontalCenter(): any {
        return this.$values[UIKeys.horizontalCenter];
    }

    public set horizontalCenter(value: any) {
        if (!value || typeof value == "number") {
            value = +value;
        }
        else {
            value = value.toString().trim();
        }
        const values = this.$values;
        if (values[UIKeys.horizontalCenter] === value)
            return;
        values[UIKeys.horizontalCenter] = value;
        this.invalidateParentLayout();
    }

    /**
     * @private
     * 在父级容器中距竖直中心位置的距离
     */
    public get verticalCenter(): any {
        return this.$values[UIKeys.verticalCenter];
    }

    public set verticalCenter(value: any) {
        if (!value || typeof value == "number") {
            value = +value;
        }
        else {
            value = value.toString().trim();
        }
        const values = this.$values;
        if (values[UIKeys.verticalCenter] === value)
            return;
        values[UIKeys.verticalCenter] = value;
        this.invalidateParentLayout();
    }


    /**
     * @private
     * 相对父级容器宽度的百分比
     */
    public get percentWidth(): number {
        return this.$values[UIKeys.percentWidth];
    }

    public set percentWidth(value: number) {
        value = +value;
        const values = this.$values;
        if (values[UIKeys.percentWidth] === value)
            return;
        values[UIKeys.percentWidth] = value;
        this.invalidateParentLayout();
    }

    /**
     * @private
     * 相对父级容器高度的百分比
     */
    public get percentHeight(): number {
        return this.$values[UIKeys.percentHeight];
    }

    public set percentHeight(value: number) {
        value = +value;
        const values = this.$values;
        if (values[UIKeys.percentHeight] === value)
            return;
        values[UIKeys.percentHeight] = value;
        this.invalidateParentLayout();
    }

    /**
     * @private
     * 外部显式指定的宽度
     */
    public get explicitWidth(): number {
        return this.$values[UIKeys.explicitWidth];
    }

    /**
     * @private
     * 外部显式指定的高度
     */
    public get explicitHeight(): number {
        return this.$values[UIKeys.explicitHeight];
    }

    /**
     * @private
     * 组件的最小宽度,此属性设置为大于maxWidth的值时无效。同时影响测量和自动布局的尺寸。
     */
    public get minWidth(): number {
        return this.$values[UIKeys.minWidth];
    }

    public set minWidth(value: number) {
        value = +value || 0;
        const values = this.$values;
        if (value < 0 || values[UIKeys.minWidth] === value) {
            return;
        }
        values[UIKeys.minWidth] = value;
        this.invalidateSize();
        this.invalidateParentLayout();
    }

    /**
     * @private
     * 组件的最大高度。同时影响测量和自动布局的尺寸。
     */
    public get maxWidth(): number {
        return this.$values[UIKeys.maxWidth];
    }

    public set maxWidth(value: number) {
        value = +value || 0;
        const values = this.$values;
        if (value < 0 || values[UIKeys.maxWidth] === value) {
            return;
        }
        values[UIKeys.maxWidth] = value;
        this.invalidateSize();
        this.invalidateParentLayout();
    }

    /**
     * @private
     * 组件的最小高度,此属性设置为大于maxHeight的值时无效。同时影响测量和自动布局的尺寸。
     */
    public get minHeight(): number {
        return this.$values[UIKeys.minHeight];
    }

    public set minHeight(value: number) {
        value = +value || 0;
        const values = this.$values;
        if (value < 0 || values[UIKeys.minHeight] === value) {
            return;
        }
        values[UIKeys.minHeight] = value;
        this.invalidateSize();
        this.invalidateParentLayout();
    }


    /**
     * @private
     * 组件的最大高度,同时影响测量和自动布局的尺寸。
     */
    public get maxHeight(): number {
        return this.$values[UIKeys.maxHeight];
    }

    public set maxHeight(value: number) {
        value = +value || 0;
        const values = this.$values;
        if (value < 0 || values[UIKeys.maxHeight] === value) {
            return;
        }
        values[UIKeys.maxHeight] = value;
        this.invalidateSize();
        this.invalidateParentLayout();
    }


    public allInvalidate() {
        this.invalidateSize();
        this.invalidateProperties();
        this.invalidateDisplayList();
        this.invalidateParentLayout();
    }

    public get backgroundColor() {
        return this.$values[UIKeys.backgroundColor];
    }
    public set backgroundColor(value) {

        const values = this.$values;
        if (values[UIKeys.backgroundColor] === value) {
            return;
        }
        values[UIKeys.backgroundColor] = value;
        this.invalidateDisplayList();
    }

    /**
     * @private
     * 组件宽度设置为undefined将使用组件的measure()方法自动计算尺寸
     */
    public get width(): number {
        //this.measureSizes();//不可以调用测量，有性能消耗，后期优化
        return this.getPreferredUWidth();
    }

    /**
     * @private
     *
     * @param value
     */
    public set width(value: number) {
        value = +value;
        const values = this.$values;
        if (value < 0 || values[UIKeys.explicitWidth] === value)
            return;
        values[UIKeys.explicitWidth] = value;
        this.invalidateSize();
        this.invalidateParentLayout();
    }


    /**
     * @private
     * 组件高度,默认值为NaN,设置为NaN将使用组件的measure()方法自动计算尺寸
     */
    public get height(): number {
        //this.measureSizes();//不可以调用测量，有性能消耗，后期优化
        return this.getPreferredUHeight();
    }

    /**
     * @private
     *
     * @param value
     */
    public set height(value: number) {

        value = +value;
        const values = this.$values;
        if (value < 0 || values[UIKeys.explicitHeight] === value)
            return;
        values[UIKeys.explicitHeight] = value;

        this.invalidateSize();
        this.invalidateParentLayout();
    }

    public get scaleX() {
        return this.$values[UIKeys.scaleX];
    }

    public set scaleX(value: number) {
        // this.invalidateSize();
        // this.invalidateParentLayout();
        this.container.scale.x = value;
    }

    public get scaleY() {
        return this.$values[UIKeys.scaleY];
    }

    public set scaleY(value: number) {
        // this.invalidateSize();
        // this.invalidateParentLayout();
        this.container.scale.y = value;
    }


    public get x() {
        return this.container.x;
    }
    public set x(value: number) {
        // this.invalidateDisplayList();
        // this.invalidateParentLayout();
        this.container.position.x = value;
    }

    public get y() {
        return this.container.y;
    }

    public set y(value: number) {
        // this.invalidateDisplayList();
        // this.invalidateParentLayout();
        this.container.position.y = value;
    }


    public get skewX() {
        return this.container.skew.x;
    }
    public set skewX(value) {
        // this.invalidateDisplayList();
        this.container.skew.x = value;
    }

    public get skewY() {
        return this.container.skew.y;
    }
    public set skewY(value) {
        // this.invalidateDisplayList();
        this.container.skew.y = value;
    }

    public get pivotX() {
        return this.container.pivot.x;
    }
    public set pivotX(value) {
        // this.invalidateDisplayList();
        this.container.pivot.x = value;
    }

    public get pivotY() {
        return this.container.pivot.y;
    }
    public set pivotY(value) {
        // this.invalidateDisplayList();
        this.container.pivot.y = value;
    }

    public get rotation() {
        return this.container.rotation;
    }
    public set rotation(value) {
        // this.invalidateDisplayList();
        this.container.rotation = value;
    }

    /**
     *  =不可用= 设置索引层级，每次父级变化时，会排序 （未实现）
     */
    public get zIndex() {
        return this.container.zIndex;
    }
    public set zIndex(value) {
        // this.invalidateParentLayout();
        this.container.zIndex = value;
    }


}