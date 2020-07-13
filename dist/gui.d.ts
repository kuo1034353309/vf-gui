declare module 'src/core/DisplayLayoutKeys' {
	/** 标记属性失效 */
	export const invalidatePropertiesFlag: symbol;
	/** 标记大小失效 */
	export const invalidateSizeFlag: symbol;
	/** 标记显示失效 */
	export const invalidateDisplayListFlag: symbol;
	/** 是否参与布局 */
	export const includeInLayout: symbol;
	export const width: symbol;
	export const height: symbol;
	export const explicitWidth: symbol;
	export const explicitHeight: symbol;
	export const minWidth: symbol;
	export const maxWidth: symbol;
	export const minHeight: symbol;
	export const maxHeight: symbol;
	export const percentWidth: symbol;
	export const percentHeight: symbol;
	export const measuredWidth: symbol;
	export const measuredHeight: symbol;
	export const oldPreferWidth: symbol;
	export const oldPreferHeight: symbol;
	export const backgroundColor: symbol;
	export const oldBackgroundColor: symbol;
	export const left: symbol;
	export const right: symbol;
	export const top: symbol;
	export const bottom: symbol;
	export const horizontalCenter: symbol;
	export const verticalCenter: symbol;

}
declare module 'src/interaction/TouchMouseEventEnum' {
	/**
	 * 鼠标点击与触摸事件枚举,内部DisplayObject使用
	 * @since 1.0.0
	 */
	export const enum TouchMouseEventEnum {
	    mousedown = "mousedown",
	    mousemove = "mousemove",
	    mouseup = "mouseup",
	    mouseover = "mouseover",
	    mouseout = "mouseout",
	    mouseupoutside = "mouseupoutside",
	    mouseRightDown = "rightdown",
	    mouseRightup = "rightup",
	    mouseRightupoutside = "rightupoutside",
	    touchstart = "touchstart",
	    touchcancel = "touchcancel",
	    touchend = "touchend",
	    touchendoutside = "touchendoutside",
	    touchmove = "touchmove",
	    tap = "tap"
	}

}
declare module 'src/event/InteractionEvent' {
	///   types="@vf.js/vf" />
	/**
	 * 事件的基础类
	 *
	 * 触摸或鼠标操作事件 可查看 -> TouchEventEnum.TouchEnum
	 *
	 * import InteractionEvent from "../interaction/InteractionEvent",
	 */
	export class InteractionEvent extends vf.interaction.InteractionEvent {
	    constructor();
	    local: vf.Point;
	    path?: number[];
	    signalling: boolean;
	}

}
declare module 'src/event/TouchMouseEvent' {
	/**
	 * 对外，封装的点击触摸事件
	 *
	 * import InteractionEvent,{Mouse} from "../interaction/InteractionEvent",
	 */
	export const TouchMouseEvent: {
	    /**
	     * 移出
	     *
	     * (e: InteractionEvent,thisObj:DisplayObject,over: boolean)=>{}
	     */
	    onHover: string;
	    /**
	     * 按下
	     *
	     * (e: InteractionEvent,thisObj:DisplayObject, isPressed: boolean)=>void
	     */
	    onPress: string;
	    /**
	     * 按下
	     */
	    onDown: string;
	    /**
	     * 弹起
	     */
	    onUp: string;
	    /**
	     * 点击
	     *
	     * (e: InteractionEvent,thisObj:DisplayObject)=>void
	     */
	    onClick: string;
	    /**
	     * 移动
	     *
	     * (e: InteractionEvent,thisObj:DisplayObject)=>void
	     */
	    onMove: string;
	};

}
declare module 'src/core/ContainerBase' {
	///   types="@vf.js/vf" />
	/** 容器扩展类，后续便于做延时渲染 */
	export class ContainerBase extends vf.Container {
	    constructor();
	    isEmitRender: boolean;
	    render(renderer: vf.Renderer): void;
	}

}
declare module 'src/tween/Easing' {
	/**
	 * 完整的缓动曲线列表
	 *
	 * @example vf.gui.Easing.Linear.None;
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestTween
	 */
	export const Easing: {
	    Linear: {
	        None(k: number): number;
	    };
	    Quadratic: {
	        In(k: number): number;
	        Out(k: number): number;
	        InOut(k: number): number;
	    };
	    Cubic: {
	        In(k: number): number;
	        Out(k: number): number;
	        InOut(k: number): number;
	    };
	    Quartic: {
	        In(k: number): number;
	        Out(k: number): number;
	        InOut(k: number): number;
	    };
	    Quintic: {
	        In(k: number): number;
	        Out(k: number): number;
	        InOut(k: number): number;
	    };
	    Sinusoidal: {
	        In(k: number): number;
	        Out(k: number): number;
	        InOut(k: number): number;
	    };
	    Exponential: {
	        In(k: number): number;
	        Out(k: number): number;
	        InOut(k: number): number;
	    };
	    Circular: {
	        In(k: number): number;
	        Out(k: number): number;
	        InOut(k: number): number;
	    };
	    Elastic: {
	        In(k: number): number;
	        Out(k: number): number;
	        InOut(k: number): number;
	    };
	    Back: {
	        In(k: number): number;
	        Out(k: number): number;
	        InOut(k: number): number;
	    };
	    Bounce: {
	        In(k: number): number;
	        Out(k: number): number;
	        InOut(k: number): number;
	    };
	    Stepped: {
	        steps: (steps: number) => (k: number) => number;
	    };
	};

}
declare module 'src/tween/private/constants' {
	/**
	 * 卡帧后的平滑处理帧率
	 */
	export const FRAME_MS: number;
	/**
	 * 平滑处理允许的触发时间
	 */
	export const TOO_LONG_FRAME_MS = 250;
	/**
	 * 链式补间动画的key前缀
	 */
	export const CHAINED_TWEENS = "_chainedTweens";
	export const STRING_PROP = "STRING_PROP";
	export const NUM_REGEX: RegExp;
	export function decomposeString(fromValue: string | any): any;
	export function decompose(prop: any, obj: any, from: any, to: any): any;
	export const RGB = "rgb(";
	export const RGBA = "rgba(";
	export function isRGBColor(v: any, i: number, r?: string): boolean;
	export function recompose(prop: any, obj: any, from: any, to: any, t: any, originalT: any, stringBuffer?: any): any;
	export const SET_NESTED: (nested: any) => any;

}
declare module 'src/tween/private/Interpolation' {
	/**
	 * 差值计算列表
	 * @example
	 *
	 * let bezier = vf.gui.tween.Interpolation.Bezier
	 * new vf.gui.tween.Tween({x:0}).to({x:[0, 4, 8, 12, 15, 20, 30, 40, 20, 40, 10, 50]}, 1000).interpolation(bezier).start()
	 * @memberof vf.gui.tween
	 */
	export const Interpolation: {
	    Linear(v: any, k: number, value: any): any;
	    Bezier(v: any, k: number, value: any): any;
	    CatmullRom(v: any, k: number, value: any): any;
	    Utils: {
	        Linear(p0: any, p1: any, t: any, v: any): any;
	        Reset(value: any): any;
	        Bernstein(n: any, i: any): number;
	        Factorial: (n: any) => number;
	        CatmullRom(p0: any, p1: any, p2: any, p3: any, t: any, v?: any): any;
	    };
	};

}
declare module 'src/event/TweenEvent' {
	/**
	 * 缓动事件
	 */
	export const TweenEvent: {
	    /**
	     *
	     */
	    Callback: string;
	    /**
	     * 每次改变
	     */
	    update: string;
	    /**
	     * 完成
	     */
	    complete: string;
	    /**
	     * 开始时
	     */
	    start: string;
	    /**
	     * 每次重复时
	     */
	    repeat: string;
	    /**
	     * 反向时
	     */
	    reverse: string;
	    /**
	     * 暂停时
	     */
	    pause: string;
	    /**
	     * 播放时
	     */
	    play: string;
	    /**
	     * 重新开始时
	     */
	    restart: string;
	    /**
	     * 停止时
	     */
	    stop: string;
	};

}
declare module 'src/tween/Tween' {
	///   types="@vf.js/vf" />
	import { add, get, getAll, remove, removeAll, removeDisplay, update } from 'src/tween/private/core';
	/**
	 * 缓动动画
	 *
	 * @example let tween = new vf.gui.Tween(myObject).to({width:'300px'}, 2000).start()
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestTween
	 */
	export class Tween extends vf.utils.EventEmitter {
	    static core: {
	        add: typeof add;
	        get: typeof get;
	        getAll: typeof getAll;
	        remove: typeof remove;
	        removeAll: typeof removeAll;
	        removeDisplay: typeof removeDisplay;
	        update: typeof update;
	    };
	    static Event: {
	        Callback: string;
	        update: string;
	        complete: string;
	        start: string;
	        repeat: string;
	        reverse: string;
	        pause: string;
	        play: string;
	        restart: string;
	        stop: string;
	    };
	    /**
	     * Easier way to call the Tween
	     * @param {object} object - Initial value
	     * @param {object} to - Target value
	     * @param {object} params - Options of tweens
	     * @example Tween.fromTo(myObject, {x:0}, {x:200},1000)
	     * @memberof vf.gui.Tween
	     * @static
	     */
	    static fromTo(object: any, to: any, duration?: number): Tween;
	    /**
	     * Easier way calling constructor only applies the `to` value, useful for CSS Animation
	     * @param {any} object object
	     * @param {object} to - Target value
	     * @param {object} params - Options of tweens
	     * @example Tween.to(myObject, {x:200}, 1000)
	     * @memberof vf.gui.Tween
	     * @static
	     */
	    static to(object: any | any[], to: any, duration?: number): Tween;
	    /**
	     * Easier way calling constructor only applies the `from` value, useful for CSS Animation
	     * @param {any} object object
	     * @param {object} from - Initial value
	     * @param {object} params - Options of tweens
	     * @example Tween.from(myObject, {x:200}, 1000)
	     * @memberof vf.gui.Tween
	     * @static
	     */
	    static from(object: any, from: any, duration?: number): Tween;
	    constructor(object?: any);
	    id: number;
	    object: any;
	    private _valuesEnd;
	    private _valuesStart;
	    protected _duration: number;
	    private _easingFunction;
	    private _easingReverse;
	    private _interpolationFunction;
	    protected _startTime: number;
	    protected _delayTime: number;
	    private _repeat;
	    private _initRepeat;
	    _isPlaying: boolean;
	    private _yoyo;
	    private _reversed;
	    private _onStartCallbackFired;
	    private _isFinite;
	    private _prevTime;
	    private _rendered;
	    private _reverseDelayTime;
	    /** 附加数据 */
	    data: {
	        [key: string]: any;
	    };
	    setObject(object: any): void;
	    /**
	     * 是否在播放中
	     * @return {boolean}
	     * @example tween.isPlaying()
	     * @memberof vf.gui.Tween
	     */
	    readonly isPlaying: boolean;
	    /**
	     * 是否开始播放
	     * @return {boolean}
	     * @example tween.isStarted()
	     * @memberof vf.gui.Tween
	     */
	    readonly isStarted: boolean;
	    /**
	     * 获取动画的开始时间
	     */
	    /**
	    * 获取动画的开始时间
	    */
	    startTime: number;
	    /**
	     * 设置缓动时长
	     * @param {number} amount 持续的毫秒值
	     * @example tween.duration(2000)
	     * @memberof vf.gui.Tween
	     * @deprecated 不推荐使用这个方法，内部使用
	     * @private
	     */
	    duration: number | Function;
	    /**
	     * 逆向缓动
	     * @example tween.reverse()
	     * @param {boolean=} state 是否逆向
	     * @memberof vf.gui.Tween
	     */
	    reverse(state?: boolean): this;
	    /**
	     * 当前动画是否逆转
	     * @return {boolean}
	     * @example tween.reversed() true逆向中
	     * @memberof vf.gui.Tween
	     */
	    reversed(): boolean;
	    /**
	     * 暂停缓动
	     * @example tween.pause()
	     * @memberof vf.gui.Tween
	     */
	    pause(): boolean | this;
	    /**
	     * 播放或恢复播放
	     * @example tween.play()
	     * @memberof vf.gui.Tween
	     */
	    play(): boolean | this;
	    /**
	     * 设置要缓动的目标属性与持续时间
	     * @param {object} properties 目标属性值
	     * @param {number|Object=} [duration=1000] 持续时间
	     * @example let tween = new vf.gui.Tween({x:0}).to({x:100}, 2000)
	     * @memberof vf.gui.Tween
	     */
	    to(properties: any, duration?: number): this;
	    private render;
	    /**
	     * 开始执行缓动
	     * @example tween.start()
	     * @memberof vf.gui.Tween
	     */
	    start(): this;
	    /**
	     * 停止缓动
	     * @example tween.stop()
	     * @memberof vf.gui.Tween
	     */
	    stop(): boolean | this;
	    /**
	     * 设置延迟执行时间
	     * @param {number} amount 延迟等待的时间，毫秒
	     * @example tween.delay(500)
	     * @memberof vf.gui.Tween
	     */
	    delay(amount: number): this;
	    /**
	     * 设置重复执行的次数
	     * @param {number} amount 重复次数
	     * @example tween.repeat(5)
	     * @memberof vf.gui.Tween
	     */
	    repeat(amount: number): this;
	    /**
	     * 设置每个重复执行过程的延迟时间，毫秒
	     * @param {number} amount 延迟值
	     * @example tween.reverseDelay(500)
	     * @memberof vf.gui.Tween
	     */
	    reverseDelay(amount: number): this;
	    /**
	     * 是否在重复执行中启用反向动画
	     * @param {boolean} state true启动
	     * @param {Function=} _easingReverse 反向时的Easing function
	     * @example tween.yoyo(true)
	     * @memberof vf.gui.Tween
	     */
	    yoyo(state?: boolean | Function, _easingReverse?: (k: number) => number): this;
	    /**
	     * 设置缓动函数
	     * @param {Function} _easingFunction 缓动函数的公式，如果设置yoyo的第二个值会应用于逆向缓动
	     * @example tween.easing(Easing.Elastic.InOut)
	     * @memberof vf.gui.Tween
	     */
	    easing(_easingFunction: ((k: number) => number) | any): this;
	    /**
	     * 设置差值
	     * @param {Function} _interpolationFunction 差值的函数
	     * @example tween.interpolation(Interpolation.Bezier)
	     * @memberof vf.gui.Tween
	     */
	    interpolation(_interpolationFunction: (v: any, k: number, value: any) => any): this;
	    /**
	     * 更新动画到指定时间点，进行播放
	     * @param time
	     */
	    gotoAndPlay(time: number): void;
	    /**
	     * 更新动画到指定时间点，停止播放
	     * @param time
	     */
	    gotoAndStop(time: number): void;
	    /**
	     * 更新动画到指定时间点，停止播放
	     * @param time
	     */
	    gotoAndEnd(): void;
	    /**
	     * 更新函数，通过给定的 `time` 设置目标属性变化
	    * @param {number=} deltaTime 帧间隔
	    * @param {Boolean=} preserve 完成后，防止删除动画对象
	     * @param {boolean=} forceTime 强制进行更新渲染，不关心时间是否匹配
	     * @example tween.update(100)
	     * @memberof vf.gui.Tween
	     */
	    update(deltaTime: number, preserve?: boolean, forceTime?: boolean): boolean;
	    release(): void;
	}

}
declare module 'src/core/Ticker' {
	 class Ticker extends vf.Ticker {
	    constructor();
	    /**
	     * 时间穿越， 单位ms
	     * @param duration
	     */
	    crossingTime(duration: number): void;
	}
	export const TickerShared: Ticker;
	export {};

}
declare module 'src/tween/private/core' {
	import { Tween } from 'src/tween/Tween';
	/**
	 * 插件存储器
	 * @memberof vf.gui.tween
	 * @example
	 * let num = Plugins.num = function (node, start, end) {
	  * return t => start + (end - start) * t
	  * }
	  *
	  * @static
	  */
	export const Plugins: any;
	/**
	 * 添加对象到缓动列表
	 * @param {Tween} tween Tween 实例
	 * @memberof vf.gui.tween
	 * @example
	 * let tween = new vf.gui.tween.Tween({x:0})
	 * tween.to({x:200}, 1000)
	 * vf.gui.tween.add(tween)
	 */
	export function add(tween: Tween): void;
	/**
	 * 没有缓动后，设置运行多少帧后，停止
	 * @param {number} frameCount=120 删除所有动画后，要运行的剩余帧
	 * @memberof vf.gui.tween
	 * @example
	 * vf.gui.tween.FrameThrottle(60)
	 */
	export function FrameThrottle(frameCount?: number): void;
	/**
	 * 延时处理，针对插件、canvas、dom
	 * @param {number} state=true 是否平滑处理
	 * @memberof vf.gui.tween
	 * @example
	 * vf.gui.tween.ToggleLagSmoothing(false)
	 */
	export function ToggleLagSmoothing(_state?: boolean): void;
	/**
	 * 获得所有缓动对象
	 * @memberof vf.gui.tween
	 * vf.gui.tween.getAll()
	 */
	export function getAll(): Tween[];
	/**
	 * 移除所有动画对象
	 * @example  vf.gui.tween.removeAll()
	 * @memberof vf.gui.tween
	 */
	export function removeAll(): void;
	/**
	 * 获取对象
	 * @param {Tween} tween 缓动对象实例
	 * @return {Tween} 返回对象或null
	 * @memberof vf.gui.tween
	 * @example
	 * vf.gui.tween.get(tween)
	 */
	export function get(tween: Tween): Tween | null;
	/**
	 * 从缓动列表移除对象
	 * @param {Tween} tween Tween instance
	 * @memberof vf.gui.tween
	 * @example
	 * vf.gui.tween.remove(tween)
	 */
	export function remove(tween: Tween): void;
	export function removeDisplay(uuid: string): void;
	/**
	 * 按给定时间更新缓动
	 * @param {number=} time 时间戳
	 * @param {Boolean=} preserve 完成后，防止删除动画对象
	 * @memberof vf.gui.tween
	 * @example
	 * vf.gui.tween.update(500)
	 */
	export function update(deltaTime: number): boolean;
	/**
	 * 是否正在运行中
	 * @return {Boolean} 只要还有缓动在运行，返回true
	 * @memberof vf.gui.tween
	 * @example vf.gui.tween.isRunning()
	 */
	export function isRunning(): boolean;
	/**
	 * 返回是否开启延迟平滑状态
	 * @return {Boolean}
	 * @memberof vf.gui.tween
	 * @example vf.gui.tween.isRunning()
	 */
	export function isLagSmoothing(): boolean;

}
declare module 'src/utils/ObjectPool' {
	 class ObjectPool {
	    constructor();
	    /**
	     * 作为对象池的词典dict
	     */
	    private objPoolDict;
	    /**
	     * 向对象池中放入对象，以便重复利用
	     */
	    push<T extends Lifecycle, S>(keyClass: S, oldObj: T): void;
	    /**
	     * 从对象池中取出需要的对象
	     * @return 取出的相应对象
	     *
	     */
	    pop<T>(keyClass: T): any;
	}
	/**
	 * 对象池实例
	 */
	export const objectPoolShared: ObjectPool;
	export {};

}
declare module 'src/tween/Timeline' {
	 class Node {
	    constructor(node?: Node);
	    parent: Node | undefined;
	    default: number;
	    start: any;
	    end: any;
	    easing: any;
	    duration: number;
	    startFrame: number;
	    endFrame: number;
	    prevTime: number;
	    release(): void;
	    load(): void;
	    destroy(): void;
	}
	/**
	 * 基于帧的时间轴控制类
	 *
	 * @example let timeline = new vf.gui.Timeline();
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestTimeLine
	 */
	export class Timeline extends vf.utils.EventEmitter implements Lifecycle {
	    constructor();
	    id: number;
	    private _object;
	    private _frames;
	    private _frameCount;
	    private _elapsedMS;
	    private _prevTime;
	    private _isStop;
	    private _lastNode;
	    private _isSetDefault;
	    loop: boolean;
	    setDefault(object: any, _duration: number, fps: number): this;
	    addProperty(property: string, value: number | string | boolean, endFrame: number, easing?: any): this;
	    stop(): void;
	    play(): void;
	    gotoAndPlay(frame: number): void;
	    gotoAndStop(frame: number): void;
	    private seekLastNode;
	    private goto;
	    update(a: number, b?: number, elapsedMS?: number): true | undefined;
	    updateobject(key: string, node: Node): boolean;
	    load(): void;
	    release(): void;
	}
	export {};

}
declare module 'src/tween/private/index' {
	import { add, get, getAll, isRunning, FrameThrottle, ToggleLagSmoothing, Plugins, remove, removeAll, removeDisplay, update } from 'src/tween/private/core';
	import { Interpolation } from 'src/tween/private/Interpolation';
	import * as utils from 'src/tween/private/constants';
	import { TweenEvent } from 'src/event/TweenEvent';
	import { Timeline } from 'src/tween/Timeline';
	export { Plugins, get, getAll, removeAll, remove, removeDisplay, add, update, isRunning, FrameThrottle, ToggleLagSmoothing, Interpolation, TweenEvent, Timeline, utils };

}
declare module 'src/core/DisplayLayoutValidator' {
	///   types="@vf.js/vf" />
	import { DisplayLayoutAbstract } from 'src/core/DisplayLayoutAbstract'; class UIValidator extends vf.utils.EventEmitter {
	    /**
	     * @private
	     * 创建一个Validator对象
	     */
	    constructor();
	    /**
	     * @private
	     */
	    private targetLevel;
	    /**
	     * @private
	     */
	    private invalidatePropertiesFlag;
	    /**
	     * @private
	     */
	    private invalidateClientPropertiesFlag;
	    /**
	     * @private
	     */
	    private invalidatePropertiesQueue;
	    /**
	     * @private
	     * 标记组件属性失效
	     */
	    invalidateProperties(target: DisplayLayoutAbstract): void;
	    /**
	     * @private
	     * 验证失效的属性
	     */
	    private validateProperties;
	    /**
	     * @private
	     */
	    private invalidateSizeFlag;
	    /**
	     * @private
	     */
	    private invalidateClientSizeFlag;
	    /**
	     * @private
	     */
	    private invalidateSizeQueue;
	    /**
	     * @private
	     * 标记需要重新测量尺寸
	     */
	    invalidateSize(target: DisplayLayoutAbstract): void;
	    /**
	     * @private
	     * 测量尺寸
	     */
	    private validateSize;
	    /**
	     * @private
	     */
	    private invalidateDisplayListFlag;
	    /**
	     * @private
	     */
	    private invalidateDisplayListQueue;
	    /**
	     * @private
	     * 标记需要重新布局
	     */
	    invalidateDisplayList(client: DisplayLayoutAbstract): void;
	    /**
	     * @private
	     * 重新布局
	     */
	    private validateDisplayList;
	    /**
	     * @private
	     * 是否已经添加了事件监听
	     */
	    private listenersAttached;
	    /**
	     * @private
	     * 添加事件监听
	     */
	    private attachListeners;
	    /**
	     * @private
	     * 执行属性应用
	     */
	    private doPhasedInstantiationCallBack;
	    /**
	     * @private
	     */
	    private doPhasedInstantiation;
	    /**
	     * @private
	     * 使大于等于指定组件层级的元素立即应用属性
	     * @param target 要立即应用属性的组件
	     */
	    validateClient(target: DisplayLayoutAbstract): void;
	    removeDepthQueueAll(): void;
	} const validatorShared: UIValidator;
	export default validatorShared;

}
declare module 'src/layout/CSSBasicLayout' {
	///   types="@vf.js/vf" />
	import { DisplayObject } from 'src/core/DisplayObject';
	export const $tempRectangle: vf.Rectangle;
	/**
	 * 布局尺寸>外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸
	 */
	export function formatRelative(value: number | string | undefined, total: number): number;
	/**
	 * @private
	 * 一个工具方法，使用BasicLayout规则布局目标对象。
	 */
	export function updateBasicDisplayList(target: DisplayObject | undefined, unscaledWidth: number, unscaledHeight: number): void;

}
declare module 'src/layout/CSSGridLayout' {
	///   types="@vf.js/vf" />
	import { DisplayObject } from 'src/core/DisplayObject';
	/**
	 *  更新网格布局
	 *
	 * 单位目前只支持数值或百分比：100 ，”100%“
	 *
	 *  网格布局中，子容器的位置与宽高可能失效
	 *
	 * 关于grid布局的词汇表
	 *
	 * 格网 https://developer.mozilla.org/zh-CN/docs/Glossary/Grid
	 *
	 * 网格行 gridTemplateRows https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-columns
	 *
	 * 网格列 gridTemplateColumns https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-rows
	 *
	 * 网格行间距 gridRowGap   https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-row-gap
	 *
	 * 网格列间距 gridColumnGap  https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-column-gap
	 *
	 * 网格轴 （未实现） 支持居中方式为：justifyContent，alignContent
	 *
	 * 网格线（未实现） https://developer.mozilla.org/en-US/docs/Glossary/Grid_Lines
	 *
	 * 网格面积（未实现）https://developer.mozilla.org/zh-CN/docs/Glossary/Grid_Areas
	 */
	export function updateGridLayout(target: DisplayObject): vf.Rectangle;

}
declare module 'src/layout/CSSLayout' {
	///   types="@vf.js/vf" />
	import { DisplayObject } from 'src/core/DisplayObject';
	import { DisplayLayoutAbstract } from 'src/core/DisplayLayoutAbstract';
	export const $TempyAlignRectangle: vf.Rectangle;
	export const $TempLayoutRectangle: vf.Rectangle;
	export const $TempMeasureRectangle: vf.Rectangle;
	/**
	 * @private
	 * 一个工具方法，使用BasicLayout规则测量目标对象。
	 */
	export function measure(target: DisplayLayoutAbstract): void;
	/**
	 * 调整目标的元素的大小并定位这些元素。
	 */
	export function updateDisplayLayout(target: DisplayObject, unscaledWidth: number, unscaledHeight: number): void;

}
declare module 'src/core/DisplayLayoutAbstract' {
	///   types="@vf.js/vf" />
	import { DisplayObjectAbstract } from 'src/core/DisplayObjectAbstract';
	export const $tempLocalBounds: vf.Rectangle;
	/**
	 * UI 布局的基础属性类
	 */
	export class DisplayLayoutAbstract extends DisplayObjectAbstract {
	    constructor();
	    isContainer: boolean;
	    /**
	     * @private
	     */
	    $values: any;
	    /**
	     * 背景(内部使用)
	     */
	    $background?: vf.Graphics;
	    /**
	     * @private
	     * 定义的所有变量请不要添加任何初始值，必须统一在此处初始化。
	     */
	    protected initializeUIValues(): void;
	    /**
	     * @private
	     * 检查属性失效标记并应用
	     */
	    protected checkInvalidateFlag(): void;
	    /**
	     * @private
	     * 验证组件的属性
	     */
	    validateProperties(): void;
	    /**
	     * @private
	     * 验证组件的尺寸
	     */
	    validateSize(recursive?: boolean): void;
	    /**
	     * @private
	     * 验证子项的位置和大小，并绘制其他可视内容
	     */
	    validateDisplayList(): void;
	    /**
	     * @private
	     * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
	     */
	    protected commitProperties(): void;
	    /**
	     * 测量显示对象宽高，如果子类没有重写，默认是this.container.width..
	     */
	    protected measure(): void;
	    /**
	     * @private
	     * 测量组件尺寸，返回尺寸是否发生变化
	     */
	    protected measureSizes(): boolean;
	    private checkMeasureSizes;
	    /**
	     * @private
	     *
	     * @returns
	     */
	    protected getPreferredUWidth(): number;
	    /**
	     * @private
	     */
	    protected getPreferredUHeight(): number;
	    /**
	     * @private
	     * 获取组件的首选尺寸,常用于父级的measure()方法中
	     * 按照：外部显式设置尺寸>测量尺寸 的优先级顺序返回尺寸，
	     */
	    getPreferredBounds(bounds: vf.Rectangle): vf.Rectangle;
	    /**
	    * @private
	    * 标记提交过需要延迟应用的属性，以便在稍后屏幕更新期间调用该组件的 commitProperties() 方法。
	    *
	    * 例如，要更改文本颜色和大小，如果在更改颜色后立即进行更新，然后在设置大小后再更新大小，就有些浪费。
	    * 同时更改两个属性后再使用新的大小和颜色一次性呈示文本，效率会更高。<p/>
	    *
	    * 通常，子类应覆盖 commitProperties() 方法，而不是覆盖此方法。
	     */
	    invalidateProperties(): void;
	    /**
	    * @private
	    * 标记提交过需要验证组件尺寸，以便在稍后屏幕更新期间调用该组件的 measure(),updatesize() 方法。
	    */
	    invalidateSize(): void;
	    /**
	    * @private
	    * 标记需要验证显示列表，以便在稍后屏幕更新期间调用该组件的 updateDisplayList() 方法。
	    */
	    invalidateDisplayList(): void;
	    /**
	     * @private
	     * 标记父级容器的尺寸和显示列表为失效
	     */
	    invalidateParentLayout(): void;
	    /**
	     * @private
	     * 设置组件的布局位置
	     */
	    setPosition(x?: number | undefined, y?: number | undefined): void;
	    /**
	     * @private
	     * 设置测量结果。
	     * @param width 测量宽度
	     * @param height 测量高度
	     */
	    setMeasuredSize(width: number, height: number): void;
	    /**
	     * @private
	     * 设置组件的宽高。此方法不同于直接设置width,height属性，
	     * 不会影响显式标记尺寸属性
	     */
	    setActualSize(w: number, h: number, isInvalidate?: boolean): void;
	    /**
	     * @private
	     * 更新最终的组件宽高
	     */
	    private updateSize;
	    updateTransform(): void;
	    /**
	     * 更新显示列表,子类重写，实现布局
	     */
	    protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void;
	    /**
	     * @private
	     * 立即应用组件及其子项的所有属性
	     */
	    validateNow(): void;
	    /**
	     * @private
	    * 验证并更新此对象的属性和布局，如果需要的话重绘对象。
	    *
	    * 通常只有当脚本执行完毕后，才会处理要求进行大量计算的处理属性。<p/>
	    *
	    * 例如，对 width 属性的设置可能会延迟，因为此设置需要重新计算这些对象的子项或父项的宽度。
	    * 如果脚本多次设置了 width 属性，则延迟处理可防止进行多次处理。此方法允许您手动覆盖此行为。
	     */
	    validateSizeNow(): void;
	    /**
	     * 指定此组件是否包含在父容器的布局中。若为false，则父级容器在测量和布局阶段都忽略此组件。默认值为true。
	     * 注意，visible属性与此属性不同，设置visible为false，父级容器仍会对其布局。
	     */
	    includeInLayout: boolean;
	    /**
	     * @private
	     * 距父级容器离左边距离
	     */
	    left: any;
	    /**
	     * @private
	     * 距父级容器右边距离
	     */
	    right: any;
	    /**
	     * @private
	     * 距父级容器顶部距离
	     */
	    top: any;
	    /**
	     * @private
	     * 距父级容器底部距离
	     */
	    bottom: any;
	    /**
	     * @private
	     * 在父级容器中距水平中心位置的距离
	     */
	    horizontalCenter: any;
	    /**
	     * @private
	     * 在父级容器中距竖直中心位置的距离
	     */
	    verticalCenter: any;
	    /**
	     * @private
	     * 相对父级容器宽度的百分比
	     */
	    percentWidth: number;
	    /**
	     * @private
	     * 相对父级容器高度的百分比
	     */
	    percentHeight: number;
	    /**
	     * @private
	     * 外部显式指定的宽度
	     */
	    readonly explicitWidth: number;
	    /**
	     * @private
	     * 外部显式指定的高度
	     */
	    readonly explicitHeight: number;
	    /**
	     * @private
	     * 组件的最小宽度,此属性设置为大于maxWidth的值时无效。同时影响测量和自动布局的尺寸。
	     */
	    minWidth: number;
	    /**
	     * @private
	     * 组件的最大高度。同时影响测量和自动布局的尺寸。
	     */
	    maxWidth: number;
	    /**
	     * @private
	     * 组件的最小高度,此属性设置为大于maxHeight的值时无效。同时影响测量和自动布局的尺寸。
	     */
	    minHeight: number;
	    /**
	     * @private
	     * 组件的最大高度,同时影响测量和自动布局的尺寸。
	     */
	    maxHeight: number;
	    allInvalidate(): void;
	    backgroundColor: any;
	    /**
	     * @private
	     * 组件宽度设置为undefined将使用组件的measure()方法自动计算尺寸
	     */
	    /**
	    * @private
	    *
	    * @param value
	    */
	    width: number;
	    /**
	     * @private
	     * 组件高度,默认值为NaN,设置为NaN将使用组件的measure()方法自动计算尺寸
	     */
	    /**
	    * @private
	    *
	    * @param value
	    */
	    height: number;
	    scaleX: number;
	    scaleY: number;
	    x: number;
	    y: number;
	    skewX: number;
	    skewY: number;
	    pivotX: number;
	    pivotY: number;
	    rotation: number;
	    /**
	     *  =不可用= 设置索引层级，每次父级变化时，会排序 （未实现）
	     */
	    zIndex: number;
	}

}
declare module 'src/core/Stage' {
	///   types="@vf.js/vf" />
	import { DisplayLayoutAbstract } from 'src/core/DisplayLayoutAbstract';
	import { SyncManager } from 'src/interaction/SyncManager';
	/**
	 * UI的舞台对象，展示所有UI组件
	 *
	 * @class
	 * @param width {Number} 舞台宽度
	 * @param height {Number} 舞台高度
	 */
	export class Stage extends DisplayLayoutAbstract {
	    constructor(width: number, height: number, app: vf.Application);
	    app: vf.Application;
	    syncManager: SyncManager | undefined;
	    /**
	     * 是否组织原始数据继续传递
	     */
	    originalEventPreventDefault: boolean;
	    readonly stageWidth: number;
	    readonly stageHeight: number;
	    scaleX: number;
	    scaleY: number;
	    Scale: vf.Point;
	    /**
	 * 是否同步交互事件
	 */
	    private _syncInteractiveFlag;
	    syncInteractiveFlag: boolean;
	    getSystemEvent(): vf.utils.EventEmitter;
	    sendToPlayer(e: any): void;
	    release(): void;
	    releaseAll(): void;
	    resize(): void;
	    /**
	     * 接收来自player的消息
	     * @param msg
	     */
	    receiveFromPlayer(msg: any): void;
	}

}
declare module 'src/core/DisplayObjectAbstract' {
	///   types="@vf.js/vf" />
	import { ContainerBase } from 'src/core/ContainerBase';
	import { Stage } from 'src/core/Stage';
	import { DisplayObject } from 'src/core/DisplayObject';
	export class DisplayObjectAbstract extends vf.utils.EventEmitter implements LifecycleHook, Lifecycle {
	    constructor();
	    /**
	     * 全局唯一ID
	     */
	    readonly uuid: number;
	    id: string;
	    /**
	     * 自定义组价名
	     */
	    name: string;
	    /**
	     * @private
	     * 这个对象在显示列表中的嵌套深度，舞台为1，它的子项为2，子项的子项为3，以此类推。当对象不在显示列表中时此属性值为0.
	     */
	    $nestLevel: number;
	    /**
	     * 是否初始化
	     * @default
	     */
	    initialized: boolean;
	    /**
	     * 舞台引用
	     */
	    $stage?: Stage;
	    /**
	     * 父容器
	     */
	    parent: DisplayObject | Stage | undefined;
	    /**
	     * 节点列表
	     */
	    uiChildren: DisplayObjectAbstract[];
	    /** 没有功能实现，内部编辑器 */
	    container: ContainerBase;
	    /** 添加显示对象，需集成Core */
	    addChild<T extends DisplayObjectAbstract>(item: T): T;
	    addChildAt<T extends DisplayObjectAbstract>(item: T, index: number): T;
	    getChildAt(index: number): DisplayObjectAbstract;
	    getChildByUUID(uuid: number): DisplayObjectAbstract | undefined;
	    _getChildById(id: string): DisplayObjectAbstract | undefined;
	    getChildByPath(ids: string[]): DisplayObjectAbstract | undefined;
	    /**
	     * 移除已添加的UI组件
	     * @param UIObject 要移除的UI组件
	     */
	    removeChild<T extends DisplayObjectAbstract>(item: T): T;
	    removeChildAt<T>(index: number): T;
	    removeChildren(beginIndex?: number | undefined, endIndex?: number | undefined): void;
	    /**
	     * 是否绘制显示对象，如果false不进行绘制，不过仍然会进行相关的更新计算。
	     * 只影响父级的递归调用。
	     */
	    renderable: boolean;
	    private _interactive;
	    private _interactiveChildren;
	    /**
	     * 对象是否可以接收事件
	     */
	    interactive: boolean;
	    /**
	     * 子对象是否可以接收事件，设置false后，会绕过HitTest方法的递归
	     */
	    interactiveChildren: boolean;
	    /**
	     * 子类实现
	     */
	    validateNow(): void;
	    private _enabled;
	    enabled: boolean;
	    /**
	     * 是否可见
	     */
	    private _visible;
	    visible: boolean;
	    /** 清除全部事件 */
	    offAll(event?: string | symbol): this;
	    readonly stage: Stage | undefined;
	    protected checkInvalidateFlag(): void;
	    load(): void;
	    release(): void;
	    $onInit(): void;
	    $onLoad(): void;
	    $onRelease(): void;
	    $onAddStage(): void;
	    $onRemoveStage(): void;
	}

}
declare module 'src/interaction/SyncManager' {
	/**
	 * 用于同步输入事件
	 * by ziye
	 */
	import { InteractionEvent } from 'src/event/InteractionEvent';
	import { Stage } from 'src/UI';
	import { DisplayObjectAbstract } from 'src/core/DisplayObjectAbstract';
	export class SyncManager {
	    constructor(stage: Stage);
	    /**
	     * 对应一个stage有一个syncManager的实例
	     */
	    static getInstance(stage: Stage | undefined): SyncManager | undefined;
	    resumeStatusFlag: boolean;
	    offsetTime: number;
	    private _resetTimeFlag;
	    private _crossTime;
	    private _initTime;
	    private _interactionEvent;
	    private _obj;
	    private _stage;
	    private _lostEvent;
	    private _throttleFlag;
	    private _throttleTimer;
	    private _evtDataList;
	    private _lastMoveEvent;
	    private _readystate;
	    /**
	     * 开始同步
	     */
	    init(): void;
	    release(): void;
	    /**
	     * 收集交互事件
	     */
	    collectEvent(e: InteractionEvent, obj: DisplayObjectAbstract): void;
	    /**
	     * 收集自定义事件
	     * data
	     */
	    sendCustomEvent(customData: any): void;
	    /**
	     * 接收操作
	     * @signalType 信令类型  live-实时信令   history-历史信令
	     */
	    receiveEvent(eventData: any, signalType?: string): void;
	    /**
	     * 获取当前时间
	     */
	    private currentTime;
	    /**
	     * 构造一个新的e，用于同步，数据要尽量精简
	     */
	    private createEventData;
	    /**
	     * 发送操作
	     */
	    private sendEvent;
	    /**
	     * 更新节流状态
	     */
	    private throttleUpdate;
	    /**
	     * 节流，每100ms发送一次
	     * @param eventData
	     */
	    private throttle;
	    private resetStage;
	    /**
	     * 解析收到的event
	     */
	    private parseEventData;
	    /**
	     * 时间未到，需要穿越到未来
	     */
	    private crossTime;
	    /**
	     * 处理历史信令，将历史输入事件按时间顺序放置到一个数组
	     * @param eventData
	     */
	    private dealHistoryEvent;
	    /**
	     * 恢复状态
	     */
	    private resumeStatus;
	}

}
declare module 'src/interaction/ClickEvent' {
	import { DisplayObject } from 'src/core/DisplayObject';
	import { InteractionEvent } from 'src/event/InteractionEvent';
	/**
	 * 点击触摸相关的事件处理订阅类,UI组件内部可以创建此类实现点击相关操作
	 *
	 *  可侦听事件:
	 * ```
	 *  {InteractionEvent}.TouchEvent.onHover
	 *  {InteractionEvent}.TouchEvent.onPress
	 *  {InteractionEvent}.TouchEvent.onClick
	 *  {InteractionEvent}.TouchEvent.onMove
	 * ```
	 *  可赋值方法:
	 * ```
	 *  onHover: ((e: InteractionEvent,thisOBj:DisplayObject,over: boolean) => void) | undefined
	 *  onPress: ((e: InteractionEvent,thisOBj:DisplayObject, isPressed: boolean) => void) | undefined;
	 *  onClick: ((e: InteractionEvent,thisOBj:DisplayObject) => void) | undefined
	 *  onMove: ((e: InteractionEvent,thisOBj:DisplayObject) => void) | undefined
	 * ```
	 *
	 * @example 可查看 `TestSliceSprite` 示例
	 *
	 * @since 1.0.0
	 */
	export class ClickEvent {
	    /**
	     * ClickEvent 构造函数
	     * @param obj 调用的显示对象
	     * @param isOpenEmitEvent 是否开启事件派发，默认false，开启后，父类可以监听InteractionEvent下的TouchEvent
	     * @param includeHover 是否监听鼠标移上与移出，默认true
	     * @param rightMouseButton 是否开启鼠标右键点击，默认false
	     * @param doubleClick 是否开启鼠标双击,默认false
	     */
	    constructor(obj: DisplayObject, isOpenEmitEvent?: boolean, includeHover?: boolean, rightMouseButton?: boolean, doubleClick?: boolean);
	    private obj;
	    id: number;
	    /** 是否基于事件派发，开启后，可以侦听相关的事件 InteractionEvent.TouchEvent | vf.gui.Interaction.TouchEvent */
	    isOpenEmitEvent: boolean;
	    /** 是否开启本地坐标转换，开启后，事件InteractionEvent中的localX localY为本地坐标，false情况下为0 */
	    isOpenLocalPoint: boolean;
	    private localOffset;
	    private offset;
	    private movementX;
	    private movementY;
	    private ishover;
	    private mouse;
	    private bound;
	    private right;
	    private hover;
	    private double;
	    private time;
	    private eventnameMousedown;
	    private eventnameMouseup;
	    private eventnameMouseupoutside;
	    private isStop;
	    private deviceType;
	    getTarget(): DisplayObject;
	    startEvent(): void;
	    /** 清除拖动 */
	    stopEvent(): void;
	    private lastMouseDownTime;
	    private _onMouseDown;
	    private emitTouchEvent;
	    private _mouseUpAll;
	    private _onMouseUp;
	    private _onMouseUpOutside;
	    private _onMouseOver;
	    private _onMouseOut;
	    private _onMouseMove;
	    private setLocalPoint;
	    remove(): void;
	    onHover: ((e: InteractionEvent, thisOBj: DisplayObject, over: boolean) => void) | undefined;
	    onPress: ((e: InteractionEvent, thisOBj: DisplayObject, isPressed: boolean) => void) | undefined;
	    onClick: ((e: InteractionEvent, thisOBj: DisplayObject) => void) | undefined;
	    onMove: ((e: InteractionEvent, thisOBj: DisplayObject) => void) | undefined;
	}

}
declare module 'src/interaction/DragDropController' {
	import { DisplayObject } from 'src/core/DisplayObject';
	import { InteractionEvent } from 'src/event/InteractionEvent';
	/**
	 * 记录当前正在拖动的UI组件列表
	 * @private
	 */
	export const _items: DisplayObject[];
	/**
	 * 添加拖动组件到控制器
	 * @param item 要添加的UI组件
	 * @param e 传送的事件
	 * @returns true|false
	 * @since 1.0.0
	 */
	export function add(item: DisplayObject, e: InteractionEvent): boolean;
	/**
	 * 获取正在拖动组件
	 * @param item 要获取的UI组件
	 * @returns flase | item
	 */
	export function getItem(item: DisplayObject): false | DisplayObject;
	/**
	 * 根据事件对象与分组名获取拖动项
	 * @param e 事件对象
	 * @param group 分组名
	 */
	export function getEventItem(e: InteractionEvent, group: string | undefined): false | DisplayObject | null;

}
declare module 'src/interaction/DragEvent' {
	///   types="@vf.js/vf" />
	import { DisplayObject } from 'src/core/DisplayObject';
	import { InteractionEvent } from 'src/event/InteractionEvent';
	/**
	 * 多拽相关的事件处理类
	 *
	 *  可侦听事件:
	 * ```
	 *  {InteractionEvent}.DraggableEvent.onDragPress
	 *  {InteractionEvent}.DraggableEvent.onDragStart
	 *  {InteractionEvent}.DraggableEvent.onDragMove
	 *  {InteractionEvent}.DraggableEvent.onDragEnd
	 * ```
	 *  可赋值方法:
	 * ```
	 * onPress: ((e: InteractionEvent, isPressed: boolean,dragObj?: DragEvent) => void) | undefined;
	 * onDragEnd: ((e: InteractionEvent,dragObj?: DragEvent) => void) | undefined
	 * onDragMove: ((e: InteractionEvent, offset: vf.Point,dragObj?: DragEvent) => void) | undefined
	 * onDragStart: ((e: InteractionEvent,dragObj?: DragEvent) => void) | undefined
	 * ```
	 *
	 * @example 可查看 `Slider` 源码
	 *
	 * @since 1.0.0
	 */
	export class DragEvent {
	    constructor(obj: DisplayObject);
	    private obj;
	    id: number;
	    private offset;
	    private movementX;
	    private movementY;
	    private bound;
	    private start;
	    private mouse;
	    private cancel;
	    private dragging;
	    private isStop;
	    /**
	     * 限制拖动抽,XY,X抽或Y抽
	     */
	    dragRestrictAxis?: "x" | "y";
	    startEvent(): void;
	    executeAction(e: InteractionEvent): void;
	    private _onDragStart;
	    private _onDragMove;
	    private _onDragEnd;
	    /** 清除拖动 */
	    stopEvent(): void;
	    remove(): void;
	    onDragPress: ((e: InteractionEvent, isPressed: boolean, dragObj?: DragEvent) => void) | undefined;
	    onDragEnd: ((e: InteractionEvent, dragObj?: DragEvent) => void) | undefined;
	    onDragMove: ((e: InteractionEvent, offset: vf.Point, dragObj?: DragEvent) => void) | undefined;
	    onDragStart: ((e: InteractionEvent, dragObj?: DragEvent) => void) | undefined;
	}

}
declare module 'src/display/Label' {
	///   types="@vf.js/vf" />
	import { DisplayObject } from 'src/core/DisplayObject';
	/**
	 * 文本
	 *
	 * 中文换行特殊处理 xxxx.style.breakWords = true;
	 *
	 * 当文本容器设置宽高后，文字默认会根据文本容器宽高居中.
	 *
	 * 当文本容器设置宽高后，可通过 style.textAlign 进行文字位置调整
	 *
	 * @example let label = new vf.gui.Label();
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestLabel
	 */
	export class Label extends DisplayObject {
	    constructor(text?: string);
	    readonly sprite: vf.Text;
	    /**
	     * 设置分辨力比例
	     */
	    resolution: number;
	    /**
	     * 文本内容
	     */
	    text: string;
	    fontCssStyle: any;
	    protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void;
	    release(): void;
	}

}
declare module 'src/core/MaskSprite' {
	///   types="@vf.js/vf" />
	import { DisplayObject } from 'src/core/DisplayObject';
	export interface MaskSprite extends DisplayObject {
	    maskSprite(): vf.Sprite | vf.Graphics;
	}

}
declare module 'src/display/Image' {
	///   types="@vf.js/vf" />
	import { DisplayObject } from 'src/core/DisplayObject';
	import { MaskSprite } from 'src/core/MaskSprite';
	/**
	 * 图片
	 *
	 * @example let image = new vf.gui.Image();
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestImage
	 */
	export class Image extends DisplayObject implements MaskSprite {
	    constructor();
	    /** 可以支持遮罩的组件 */
	    maskSprite(): vf.Sprite;
	    protected _sprite: vf.Sprite | vf.TilingSprite | vf.NineSlicePlane | undefined;
	    protected _texture: vf.Texture | undefined;
	    protected _source: number | string | vf.Texture | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | undefined;
	    /**
	     * 图像路径或位图对象
	     */
	    private _src;
	    src: number | string | vf.Texture | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | undefined;
	    /**
	     * 矩形区域，它定义素材对象的九个缩放区域。
	     *
	     * fillMode = scale 时，[leftWidth,rightWidth,topHeight,bottomHeight]
	     *
	     * fillMode = repeat 是，[scalex,scaley,x,y]
	     */
	    private _scale9Grid?;
	    scale9Grid: number[] | undefined;
	    /**
	     * 填充模式
	     * 设置scale后，可设置scale9Grid进行调整缩放区域
	     */
	    private _fillMode?;
	    fillMode: "repeat" | "no-repeat" | "scale" | undefined;
	    /**
	     * 锚点，调整位图的坐标中点 0-1
	     */
	    private _anchorX?;
	    anchorX: number | undefined;
	    /**
	     * 锚点，调整位图的坐标中点 0-1
	     */
	    private _anchorY?;
	    anchorY: number | undefined;
	    release(): void;
	    protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void;
	    setSpeiteSize(unscaledWidth?: number, unscaledHeight?: number): void;
	    protected measure(): void;
	    protected srcSystem(): void;
	    protected scale9GridSystem(): void;
	    protected anchorSystem(): void;
	}

}
declare module 'src/display/private/InputBase' {
	///   types="@vf.js/vf" />
	import { DisplayObject } from 'src/core/DisplayObject';
	import { ClickEvent, InteractionEvent } from 'src/interaction/Index';
	/**
	 * 输入对象的基础类
	 */
	export class InputBase extends DisplayObject {
	    constructor();
	    protected clickEvent: ClickEvent;
	    private _currentState;
	    protected currentState: "up" | "move" | "down" | "disabled";
	    protected _tabIndex: undefined | number;
	    protected _tabGroup: undefined | string;
	    protected _focused: boolean;
	    protected _useTab: boolean;
	    protected _usePrev: boolean;
	    protected _useNext: boolean;
	    protected _down: boolean;
	    private _clickSound?;
	    clickSound: string | undefined;
	    /**
	     * 状态皮肤，
	     */
	    up?: string | number | vf.Texture | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
	    /**
	     * 状态皮肤，
	     */
	    down?: string | number | vf.Texture | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
	    /**
	     * 状态皮肤，
	     */
	    move?: string | number | vf.Texture | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
	    /**
	     * 状态皮肤，
	     */
	    disabled?: string | number | vf.Texture | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
	    /**
	     * 选中状态皮肤，
	     */
	    upAndSelected?: string | number | vf.Texture | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
	    /**
	     * 选中状态皮肤，
	     */
	    downAndSelected?: string | number | vf.Texture | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
	    /**
	     * 选中状态皮肤，
	     */
	    moveAndSelected?: string | number | vf.Texture | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
	    /**
	     * 选中状态皮肤，
	     */
	    disabledAndSelected?: string | number | vf.Texture | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
	    protected onMove(): void;
	    protected onHover(): void;
	    protected onPress(e: InteractionEvent, thisObj: DisplayObject, isPress: boolean): void;
	    protected onClick(): void;
	    protected keyDownEvent(event: WheelEvent | Event): void;
	    protected documentMouseDown(): void;
	    private keyDownEventBind;
	    protected _bindEvents(): void;
	    protected _clearEvents(): void;
	    focus(): void;
	    blur(): void;
	    release(): void;
	    setTabIndex(index: number | undefined, group: string | undefined): void;
	}

}
declare module 'src/display/Button' {
	import { Label } from 'src/display/Label';
	import { Image } from 'src/display/Image';
	import { InputBase } from 'src/display/private/InputBase';
	/**
	 * 按钮
	 *
	 * @example let button = new vf.gui.Button();
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestButton
	 */
	export class Button extends InputBase {
	    constructor();
	    protected _selectedStr: "AndSelected" | "";
	    protected _oldState: string;
	    /** 状态展示 */
	    readonly img: Image;
	    /** 文字展示 */
	    readonly label: Label;
	    private _text;
	    /**
	     * 设置按钮的文本内容
	     */
	    text: string;
	    protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void;
	    release(): void;
	    protected onStateChange(label: Button, state: string): void;
	}

}
declare module 'src/display/CheckBox' {
	import { Label } from 'src/display/Label';
	import { Button } from 'src/display/Button';
	/**
	 * 单选\复选框
	 *
	 * 设置checkGroup后，进行分组。 分组后，可理解为复选框。
	 *
	 * @example let checkBox = new vf.gui.CheckBox();
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestCheckBox
	 */
	export class CheckBox extends Button {
	    constructor();
	    /**
	     * 设置值
	     */
	    private _value;
	    /**
	     * 设置是否选中
	     * */
	    private _checked;
	    /**
	     * 获取或设置当前选中的值
	     */
	    readonly selectedValue: string | undefined;
	    /**
	     * 设置分组名
	     */
	    checkGroup: string | undefined;
	    /**
	     * 获取设置默认值
	     */
	    value: string;
	    /**
	     * 设置是否选中
	     * @default false
	     */
	    checked: boolean;
	    protected onClick(): void;
	    protected onLabelChange(label: Label): void;
	}

}
declare module 'src/interaction/InputController' {
	import { DisplayObject } from 'src/core/DisplayObject';
	import { CheckBox } from 'src/display/CheckBox';
	interface CheckGroupObject {
	    groups: {
	        [key: string]: {
	            [value: string]: CheckBox;
	        };
	    };
	    values: {
	        [key: string]: string | undefined;
	    };
	}
	/**
	 *
	 * @private
	 */
	export const tabGroups: {
	    [key: string]: DisplayObject[];
	};
	/**
	 *
	 * @private
	 */
	export const _checkGroupObject: CheckGroupObject;
	/**
	 * 注册组件
	 * @param item
	 * @param tabIndex 切换位置
	 * @param tabGroup 分组名
	 * @returns 依据tabIndex返回是否需要排序 0，-1，1
	 */
	export function registrer(item: DisplayObject, tabIndex: number, tabGroup?: string): void;
	/** 失去焦点时 */
	export function blur(): void;
	/** 设置当前输入组件 */
	export function set(item: DisplayObject): void;
	/** 清楚当前设置的组件 */
	export function clear(): void;
	/** 一般再按下键盘tab健执行 焦点获取与设置 */
	export function fireTab(): void;
	/** 一般再按下键盘向下箭头执行 焦点获取与设置 */
	export function fireNext(): void;
	/** 一般再按下键盘向上箭头执行 焦点获取与设置 */
	export function firePrev(): void;
	/**
	 * 注册分组，一般用于checkBox组件的分组操作
	 *
	 *  ==== 目前没有实现卸载，如果无限制创建checkbox并设置分组可能引发泄露 ====
	 *
	 * checkGroups = [key]:{["value"]:cb}
	 */
	export function registrerCheckGroup(cb: CheckBox): void;
	/**
	 * 注销指定分组或指定分组的子项
	 * @param cb CheckBox
	 */
	export function unRegistrerCheckGroup(cb: CheckBox): void;
	/** 更新分组中选中的checkbox组件  */
	export function updateCheckGroupSelected(cb: CheckBox): void;
	/** 获取分组中选中的checkbox值 */
	export function getCheckGroupSelectedValue(name: string): string | undefined;
	/** 设置选中 */
	export function setCheckGroupSelectedValue(name: string, uuid: string): void;
	export {};

}
declare module 'src/interaction/MouseScrollEvent' {
	///   types="@vf.js/vf" />
	import { DisplayObject } from 'src/core/DisplayObject';
	/**
	 * 鼠标滑轮事件
	 *
	 *  可侦听事件(未实现):
	 * ```
	 *  {InteractionEvent}.MouseScroll.xxxxxx.
	 * ```
	 *  可赋值方法:
	 * ```
	 * oonMouseScroll: ((e: WheelEvent,delta: vf.Point) => void) | undefined
	 * ```
	 *
	 * @example 可查看 `Slider` 源码
	 *
	 * @since 1.0.0
	 */
	export class MouseScrollEvent {
	    /**
	     *
	     * @param obj 需要绑定的对象
	     * @param preventDefault 是否组织系统默认的事件触发
	     */
	    constructor(obj: DisplayObject, preventDefault: boolean);
	    id: number;
	    private obj;
	    private preventDefault;
	    private delta;
	    private mouseScrllBind;
	    private isStop;
	    startEvent(): void;
	    private _onMouseScroll;
	    private _onHover;
	    private _onMouseOut;
	    stopEvent(): void;
	    remove(): void;
	    onMouseScroll: ((e: WheelEvent, delta: vf.Point) => void) | undefined;
	}

}
declare module 'src/event/ComponentEvent' {
	/**
	 * 特定属性改变时,通常为了去系统事件区分，UI组件的事件名为大写
	 * 1. CheckBox 的 checked 改变时
	 * 2. Label 的 text 改变时
	 * 3. SpriteAnimated 的 animationName 改变时
	 * 4. Button 文字改变
	 * 5. ScrollingContainer 拖动改变时
	 * 6. Slider 滑动改变后
	 * 7. SpriteAnimated 动画改变后
	 * 8. ConnectLine 连线完成时
	 */
	export const CHANGE = "CHANGE";
	/**
	 * 状态改变中
	 *
	 * slider 滑动时
	 */
	export const CHANGEING = "CHANGEING";
	/**
	 * 状态切换完成时
	 *
	 * 1. SpriteAnimated 每次播放完时，触发(loop = false时)
	 * 2. Image 图片加载完成时
	 * 3. Slider 滑动完成
	 * 4. Timeline  每次播放完时，触发(loop = false时)
	 * 5. FollowLine 完成一次划线
	 */
	export const COMPLETE = "COMPLETE";
	/**
	 * 状态发生改变时
	 */
	export const STATE_CHANGE = "STATE_CHANGE";
	/**
	 * 状态切换完成时
	 *
	 * SpriteAnimated 每次播放完时，，触发(loop = true时)
	 */
	export const LOOP = "LOOP";
	/**
	 * 组件被添加前
	 */
	export const ADD = "add";
	/**
	 * 组件被添加时
	 */
	export const ADDED = "added";
	/**
	 * 组件被移除时
	 */
	export const REMOVEED = "removed";
	/**
	 * 组件大小改变后
	 */
	export const RESIZE = "RESIZE";
	/**
	 * 组件位置移动
	 */
	export const MOVE = "MOVE";
	/**
	 * 组件创建完成后
	 */
	export const CREATION_COMPLETE = "CREATION_COMPLETE";
	/**
	 * 组件拖动开始之前
	 */
	export const DRAG_START_BEFORE = "DRAG_START_BEFORE";
	/**
	 * 组件拖动开始时
	 */
	export const DRAG_START = "DRAG_START";
	/**
	 * 组件拖动结束之前
	 */
	export const DRAG_END_BEFORE = "DRAG_END_BEFORE";
	/**
	 * 组件拖动结束时 （如果绑定接收容器并拖动到接收容器中，不会触发此事件）
	 */
	export const DRAG_END = "DRAG_END";
	/**
	 * 组件拖动中
	 */
	export const DRAG_MOVE = "DRAG_MOVE";
	/**
	 * 组件拖动到接收目标中之前
	 */
	export const DRAG_TARGET_BEFORE = "DRAG_TARGET_BEFORE";
	/**
	 * 组件拖动到接收目标中
	 */
	export const DRAG_TARGET = "DRAG_TARGET";
	/**
	 * 有拖拽物掉落到此容器时触发
	 */
	export const DROP_TARGET = "DROP_TARGET";
	/**
	 * 播放音效 {name,mode}
	 */
	export const PLAY_AUDIO = "PLAY_AUDIO";

}
declare module 'src/interaction/GroupController' {
	import { DisplayObject } from 'src/core/DisplayObject';
	/**
	 *
	 * @private
	 */
	export const _GroupObject: Map<string, {
	    [key: string]: DisplayObject;
	}>;
	/**
	 * 注册分组，
	 */
	export function registrerGroup(ui: DisplayObject): void;
	/**
	 * 注销指定分组或指定分组的子项
	 */
	export function unRegistrerGroup(ui: DisplayObject): void;
	/** 设置选中 */
	export function getGroup(name?: string): {
	    [key: string]: DisplayObject;
	} | undefined;

}
declare module 'src/interaction/Index' {
	import { ClickEvent } from 'src/interaction/ClickEvent';
	import * as DragDropController from 'src/interaction/DragDropController';
	import { DragEvent } from 'src/interaction/DragEvent';
	import * as InputController from 'src/interaction/InputController';
	import { MouseScrollEvent } from 'src/interaction/MouseScrollEvent';
	import { InteractionEvent } from 'src/event/InteractionEvent';
	import { TouchMouseEvent } from 'src/event/TouchMouseEvent';
	import * as ComponentEvent from 'src/event/ComponentEvent';
	import * as GroupController from 'src/interaction/GroupController';
	export { ClickEvent, DragDropController, DragEvent, InputController, MouseScrollEvent, InteractionEvent, TouchMouseEvent, ComponentEvent, GroupController };

}
declare module 'src/layout/CSSSSystem' {
	import { DisplayObject } from 'src/core/DisplayObject';
	/** ===================== background  ===================== */
	export function drawBackgroundColor(target: DisplayObject): void;
	export function backgroundPositionSize(target: DisplayObject): void;
	export function backgroundRepeat(target: DisplayObject): void;
	export function backgroundImage(target: DisplayObject): void;
	/** ===================== mask  ===================== */
	export function maskPosition(target: DisplayObject): void;
	export function maskSize(target: DisplayObject): void;
	export function maskImage(target: DisplayObject): void;
	/** ===================== font  ===================== */
	export function updateFontStyle(target: any, key: string, value: any): void;
	export function color(target: any, key: string, value: any): void;

}
declare module 'src/layout/CSSStyle' {
	///   types="@vf.js/vf" />
	import { DisplayObject } from 'src/core/DisplayObject';
	/**
	 * 	定位方式
	 *
	 *  元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
	 *
	 * 	absolute 生成绝对定位的元素，相对于第一个父元素进行定位。
	 *
	 *  fixed 生成绝对定位的元素，相对于舞台进行定位。
	 *
	 *  static 没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）。
	 */
	export type Position = "absolute" | "fixed" | "static";
	/** 对齐方式 父级如果是grid布局，会忽略当前居中模式 */
	export type Align = "flex-start" | "flex-end" | "center";
	/** 布局模式 */
	export type Display = "none" | "block" | "grid";
	/**
	 * 组件样式表
	 */
	export class CSSStyle {
	    constructor(target: DisplayObject);
	    parent: DisplayObject;
	    release(): void;
	    /**
	     * 规定元素的显示类型。布局模式
	     *
	     * grid 模式下，子节点会忽略left,top,right，bottom,width,height等
	     *
	     * none 模式下，忽略style
	     * */
	    private _display;
	    display: Display;
	    /**
	     * 规定元素的定位类型。
	     * */
	    private _position;
	    position: Position;
	    /**
	     * 在容器里面的水平位置（左中右）
	     */
	    private _justifyContent?;
	    justifyContent: "flex-start" | "flex-end" | "center" | undefined;
	    /**
	     * 在容器里面的垂直位置（上中下）
	     */
	    private _alignContent?;
	    alignContent: "flex-start" | "flex-end" | "center" | undefined;
	    /**
	     * 基于 网格列的维度，去定义网格线的名称和网格轨道的尺寸大小。
	     *
	     * 方式一 [80,90,100]|["30%","40%","30%"] 第一列宽度80，第二列宽度，第三列宽度100
	     *
	     * 方式二 ["repeat",3,100] 三列，宽度都为100像素
	     */
	    private _gridTemplateColumns?;
	    gridTemplateColumns: number[] | string[] | [string, number, number] | undefined;
	    /**
	     * 设置列间距
	     */
	    private _gridColumnGap?;
	    gridColumnGap: number | undefined;
	    /**
	     * 基于 网格行的维度，去定义网格线的名称和网格轨道的尺寸大小。
	     *
	     * 方式一 [80,90,100]|["30%","40%","30%"] 第一行高度80，第二行高度90，第三行行高度100
	     *
	     * 方式二 ["repeat",3,100] 三行，宽度都为100像素
	     */
	    private _gridTemplateRows?;
	    gridTemplateRows: number[] | string[] | [string, number, number] | undefined;
	    /**
	     * 设置行间距
	     */
	    private _gridRowGap?;
	    gridRowGap: number | undefined;
	    /**
	     * 表示显示对象的宽度，以像素为单位。
	     * */
	    width: number | string;
	    /**
	     * 表示显示对象的高度，以像素为单位。
	     * */
	    height: number | string;
	    /**
	     * 设置元素的最小宽度。
	     */
	    minWidth: number;
	    /**
	     * 设置元素的最大宽度。
	     */
	    maxWidth: number;
	    /**
	     * 设置元素的最小高度。
	     */
	    maxHeight: number;
	    /**
	     * 设置元素的最大高度。
	     * */
	    minHeight: number;
	    /**
	     * 设置定位元素左外边距边界与其容器左边界之间的偏移。
	     * */
	    left: any;
	    /**
	     * 设置定位元素的上外边距边界与其容器上边界之间的偏移。
	     * */
	    top: any;
	    /**
	     * 设置定位元素右外边距边界与其容器右边界之间的偏移。
	     * */
	    right: any;
	    /**
	     * 设置定位元素下外边距边界与其容器下边界之间的偏移。
	     * */
	    bottom: any;
	    /**
	     * 缩放
	     * */
	    scaleX: number;
	    /**
	     * 缩放
	     * */
	    scaleY: number;
	    /**
	     * 设置元素水平拉伸扭曲（角度）。
	     * */
	    skewX: number;
	    /**
	     * 设置元素垂直拉伸扭曲（角度）。
	     * */
	    skewY: number;
	    /**
	     * 设置元素旋转 （角度）
	    */
	    rotate: number;
	    /**
	     * 设置元素旋转 （角度）
	    */
	    rotation: number;
	    /**
	     * 轴点 像素值
	     */
	    pivotX: number;
	    /**
	     * 轴点 像素值
	     */
	    pivotY: number;
	    /**
	      * 调整元素的色调，取消设置0xFFFFFF
	      */
	    tint: number | undefined;
	    /**
	     * 表示指定对象的 Alpha 透明度值。有效值为0（完全透明）～ 1（完全不透明）。
	     * */
	    alpha: number;
	    /**
	     * 显示对象是否可见
	     * */
	    visible: boolean;
	    visibility: "visible" | "hidden";
	    /**
	     * 设置元件的背景颜色。（16进制数字0xffffff
	     * */
	    backgroundColor: any;
	    /**
	     * 设置元素的背景图像。backgroundImage = "./xxx.png"
	     * */
	    private _backgroundImage?;
	    backgroundImage: string | vf.Texture | undefined;
	    /**
	     * 设置 backgroundImage 后 ，设置背景图像的X位置
	     * */
	    private _backgroundPositionX?;
	    backgroundPositionX: number | undefined;
	    /**
	     * 设置 backgroundImage 后 ，设置背景图像的Y位置
	     * */
	    private _backgroundPositionY?;
	    backgroundPositionY: number | undefined;
	    /**
	     * 设置 backgroundImage 后， 规定背景图像的尺寸。 [width,height]
	     * */
	    private _backgroundSize?;
	    backgroundSize: number[] | undefined;
	    /**
	     * 设置 backgroundImage 后，设置是否及如何重复背景图像。
	     * repeat重复
	     * no-repeat不重复，
	     */
	    private _backgroundRepeat;
	    backgroundRepeat: "repeat" | "no-repeat";
	    /**
	     * 遮罩图
	     */
	    private _maskImage?;
	    maskImage: string | DisplayObject | vf.Graphics | vf.Texture | undefined;
	    /**
	     * 设置位数 [x,y]
	     */
	    private _maskPosition?;
	    maskPosition: number[] | undefined;
	    /**
	     * 设置遮罩位图的大小
	     */
	    private _maskSize?;
	    maskSize: number[] | undefined;
	    /**
	     * 设置滤镜
	     */
	    filter: any;
	    /**
	     * 设置鼠标样式
	     */
	    cursor: string;
	    /**
	     * 文本颜色，16进制
	     * */
	    private _color?;
	    color: number | number[] | undefined;
	    /** 字符间距 */
	    private _letterSpacing?;
	    letterSpacing: number | undefined;
	    /**
	     * 是否自动换行
	     * */
	    private _wordWrap;
	    wordWrap: boolean;
	    /**
	     * 自动换行的宽度
	     * */
	    private _wordWrapWidth?;
	    wordWrapWidth: number | undefined;
	    /**
	     * 多行文本(wordWrap = true) - 对齐方式
	     * */
	    private _textAlign;
	    textAlign: "left" | "right" | "center";
	    /**
	     * 多行文本(wordWrap = true) - 垂直对齐方式
	     * */
	    private _verticalAlign;
	    verticalAlign: "top" | "bottom" | "middle";
	    /**
	     * 多行文本(wordWrap = true) - 行高
	     * */
	    private _lineHeight?;
	    lineHeight: number | undefined;
	    /** 字体 示例：fontFamily = "\"Comic Sans MS\", cursive, sans-serif" */
	    private _fontFamily?;
	    fontFamily: string | string[] | undefined;
	    /** 字体大小 */
	    private _fontSize;
	    fontSize: number;
	    /** 字体样式 */
	    private _fontStyle;
	    fontStyle: "normal" | "italic" | "oblique";
	    /**  字体变形，普通或小写  */
	    private _fontVariant;
	    fontVariant: "normal" | "small-caps";
	    /** 字体粗细 */
	    private _fontWeight;
	    fontWeight: 500 | 100 | 300 | "normal" | "bold" | "bolder" | "lighter" | 200 | 400 | 600 | 700 | 800 | 900;
	    /** 内部填充,只支持文字 */
	    private _padding?;
	    padding: number | undefined;
	    /** 描边颜色 */
	    private _stroke?;
	    stroke: string | number | undefined;
	    /** 描边的笔触粗细值 */
	    private _strokeThickness;
	    strokeThickness: number;
	    /** 是否设置投影 */
	    private _dropShadow;
	    dropShadow: boolean;
	    /** 投影的alpha值 */
	    private _dropShadowAlpha;
	    dropShadowAlpha: boolean;
	    /** 是否设置投影 */
	    private _dropShadowAngle;
	    dropShadowAngle: number;
	    /** 投影的模糊半径 */
	    private _dropShadowBlur;
	    dropShadowBlur: number;
	    /** 投影填充颜色值 */
	    private _dropShadowColor;
	    dropShadowColor: number;
	    /** 投影深度 */
	    private _dropShadowDistance;
	    dropShadowDistance: number;
	    /** 中文换行 */
	    private _breakWords;
	    breakWords: boolean;
	    private onResize;
	}

}
declare module 'src/core/plugs/UIBaseDrag' {
	import { DisplayObject } from 'src/core/DisplayObject';
	import { DisplayObjectAbstract } from 'src/core/DisplayObjectAbstract';
	import { Stage } from 'src/core/Stage';
	/**
	 *  组件的拖拽操作
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestDrop
	 */
	export class UIBaseDrag implements Lifecycle {
	    /**
	     * 构造函数
	     */
	    constructor(target: DisplayObject);
	    static key: string;
	    private target;
	    $targetParent: DisplayObject | Stage | undefined;
	    private oldInteractiveChildren;
	    /**
	     * 可拖动初始化
	     *  @default
	     */
	    private dragInitialized;
	    /**
	     * 可被掉落初始化
	     * @default
	    */
	    private dropInitialized;
	    /**
	     * 拖动控制类
	     */
	    private drag;
	    /**
	     * 临时属性，为了解决同步时的动作补齐
	     * 0 没有操作
	     * 1 开始拖动
	     * 2 拖动中
	     * 3 拖动结束
	     * 4 拖动到目标
	     */
	    private _dragState;
	    /**
	     * 位置
	     *
	     */
	    private _dragPosition;
	    /**
	     * 开始位置
	     */
	    private _containerStart;
	    /**
	     * 是否拖动中
	     * @default
	     */
	    dragging: boolean;
	    /**
	     * 当前拖动组件的事件ID，用于处理DragDropController中多组件的选定
	     */
	    readonly dragDropEventId: number | undefined;
	    /**
	     * 是否开启拖动
	     * @default false
	     */
	    draggable: boolean;
	    /**
	     * 是否设置边界
	     * @default false
	     */
	    dragBoundary: boolean;
	    /**
	     * 是否启用回弹，在移动到非接收方时，回弹到原始位置
	     */
	    dragBounces: boolean;
	    /**
	     * 拖拽时的鼠标状态
	     */
	    dragMoveCursor: string;
	    /**
	     * 限制拖动抽,XY,X抽或Y抽
	     */
	    private _dragRestrictAxis?;
	    dragRestrictAxis: "x" | "y" | undefined;
	    /**
	     * 拖动分组
	     */
	    dragGroup: string;
	    /**
	     * 拖动时，物体临时的存放容器，设置后，请注意事件流
	     */
	    private _dragContainer;
	    dragContainer: DisplayObjectAbstract | undefined;
	    /**
	     * 是否开启拖动掉落接收
	     */
	    droppable: boolean | undefined;
	    /**
	     * 接收掉落的新容器
	     */
	    private _droppableReparent;
	    droppableReparent: DisplayObject | undefined;
	    /**
	     * 接收拖动掉落的分组名
	     */
	    dropGroup: string | undefined;
	    private _actionData;
	    /**
	     * 获取当前的操作数据
	     */
	    actionData: string;
	    protected clearDraggable(): void;
	    protected initDraggable(): void;
	    protected clearDroppable(): void;
	    protected initDroppable(): void;
	    private onDrop;
	    /**
	     * 同步数据临时的方法
	     */
	    private executeDrop;
	    load(): void;
	    release(): void;
	}

}
declare module 'src/core/plugs/UIClick' {
	import { DisplayObject } from 'src/core/DisplayObject';
	/**
	 *  组件的单击操作
	 *
	 */
	export class UIClick implements Lifecycle {
	    /**
	     * 构造函数
	     */
	    constructor(target: DisplayObject);
	    static key: string;
	    private _target;
	    private _clickEvent;
	    load(): void;
	    release(): void;
	}

}
declare module 'src/core/DisplayObject' {
	///   types="@vf.js/vf" />
	import { DisplayLayoutAbstract } from 'src/core/DisplayLayoutAbstract';
	import { CSSStyle } from 'src/layout/CSSStyle';
	import { UIBaseDrag } from 'src/core/plugs/UIBaseDrag';
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
	    constructor();
	    /**
	     * 遮罩，设置遮罩后，组件内部的索引位置可能产生变化
	     */
	    $mask?: vf.Graphics | vf.Sprite | DisplayObject;
	    /**
	     * 插件列表
	     */
	    plugs: Map<string, Lifecycle>;
	    /**
	     * 拖动限制门槛,小于设置的数不执行拖动,防止点击与滚动
	     */
	    dragThreshold: number;
	    /** 模糊 */
	    private blurFilter?;
	    /** 拖动时，事件流是否继续传输 */
	    dragStopPropagation: boolean;
	    /**
	     * 设置拖动
	     */
	    dragOption: UIBaseDrag;
	    /** 是否开启鼠标或触摸点击，开启后，接收TouchMouseEvent */
	    interactabled: boolean;
	    /** 是否开启鼠标或触摸点击，开启后，接收TouchMouseEvent */
	    isClick: boolean;
	    /**
	     * 分组
	     */
	    protected _groupName?: string;
	    groupName: string | undefined;
	    /**
	     * 透明度
	     */
	    alpha: number;
	    /** 色调 */
	    private _tint;
	    tint: number | undefined;
	    /**
	     * 混合模式
	     */
	    private _blendMode;
	    blendMode: vf.BLEND_MODES | undefined;
	    private _filterProxy;
	    private _filterMap;
	    private _filterCount;
	    readonly filter: any;
	    /**
	     * 设置Blur XY的模糊强度
	     *
	     * 参数类型为number时，设置 blurX = blurY = value
	     *
	     */
	    filterBlur: number;
	    /**
	     * 设置灰度
	     *
	     * 参数类型为 number, 接收一个百分比值，然后再将其转换为小数
	     */
	    private grayscaleFilter?;
	    private grayscaleFilterValue;
	    filterGrayscale: number;
	    /**
	     * 私有样式代理
	     * */
	    protected _style?: CSSStyle;
	    /**
	    *  在不同分辨率下保持像素稳定
	    * @default
	    */
	    pixelPerfect: boolean;
	    /**
	     * 动态属性，避免其他类注入
	     */
	    attach: {
	        [key: string]: object | number | string | Function;
	    };
	    /**
	     * 获取样式
	     */
	    style: CSSStyle;
	    /**
	     * 更新显示列表,子类重写，实现布局
	     */
	    protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void;
	    load(): void;
	    release(): void;
	    releaseAll(): void;
	}

}
declare module 'src/utils/Utils' {
	///   types="@vf.js/vf" />
	import { DisplayObject } from 'src/core/DisplayObject';
	import { Stage } from 'src/core/Stage';
	import { DisplayObjectAbstract } from 'src/core/DisplayObjectAbstract';
	/**
	 * 是否调试模式
	 */
	export let debug: boolean;
	/**
	 * 工具类
	 */
	/** 日志输出 */
	export function log(message?: string | number | object, ...optionalParams: string[] | number[] | object[]): void;
	/**
	 * 组件获取资源 - 源路径,外部可以重写本方法
	 */
	export let $getSourcePath: Function;
	export function setSourcePath(params: (path: any, cls?: any) => {}): void;
	/**
	 * 根据显示路径，获取显示对象
	 */
	export let $getUIDisplayObjectPath: Function;
	export function setDisplayObjectPath(params: (cls?: any, target?: DisplayObject) => {}): void;
	export function getSource(src: any): any;
	export function getTexture(src: any): any;
	export function getSheet(src: any): any;
	export function getSound(src: any): any;
	export function getDisplayObject(src: any, target?: DisplayObject): any;
	/**
	 * 递归获取舞台，组件必须已经添加到舞台
	 * @param DisplayObject
	 */
	export function getStage(target: DisplayObject | DisplayObjectAbstract | Stage): Stage | undefined;
	/**
	 * 获取显示对象的路径(解析json需要的id，并不是uuid)
	 * @param target
	 * @param ids
	 */
	export function getDisplayPathById(target: DisplayObject | DisplayObjectAbstract | Stage, ids?: string[]): string[];
	/**
	 * 快速设置矩形
	 * @param sourcr
	 * @param x
	 * @param y
	 * @param w
	 * @param h
	 */
	export function setRectangle(source: vf.Rectangle, x: number, y: number, w: number, h: number): void;
	/** 获取当前运行时时间 */
	export function now(): number;
	/**
	 * 深度拷贝对象
	 * @param source 对象元
	 */
	export function deepCopy(source: any, target?: any): any;
	/**
	 * helper function to convert string hex to int or default
	 *
	 * 16进制转int，颜色转换
	 * @param str 要转换的值，如#FFFFFF,0xFFFFFF
	 * @param def 转换失败的返回值
	 */
	export function hexToInt(str: string, def: number): number;
	/**
	 *
	 * @param hex 16进制字符窜 如 #FFFFFF ，不能省略三位写法
	 * @param alpha 透明度
	 * @returns "rgba(255,255,255,1)" || false
	 */
	export function hexToRgba(hex: string, alpha: number): string | false;
	/**
	 * 转换为16位字符串，不够2位的补0，如 “01”
	 * @param c 要转换的数字
	 */
	export function componentToHex(c: number): string;
	/**
	 * RGB转16进制
	 * @param r 红 0-255
	 * @param g 绿 0-255
	 * @param b 蓝 0-255
	 */
	export function rgbToHex(r: number, g: number, b: number): string;
	/**
	 * RGB转number
	 * @param r 红 0-255
	 * @param g 绿 0-255
	 * @param b 蓝 0-255
	 */
	export function rgbToNumber(r: number, g: number, b: number): number;
	/**
	 * rgb字符串形式转换
	 * @param color rgb(255,255,255)
	 */
	export function rgbStrToNumber(color: string): number;
	/**
	 * 10进制转RGB
	 * @param c 数
	 */
	export function numberToRgb(c: number): {
	    r: number;
	    g: number;
	    b: number;
	};
	/**
	 * hex 转 RGB，
	 *
	 * 如hex字符串: "#ffffff"->255,255,255
	 *
	 * 如16进制数字: 0xffffff->255,255,255
	 * @param hex
	 */
	export function hexToRgb(hex?: string | number): {
	    r: number;
	    g: number;
	    b: number;
	};
	/**
	 * 根据amt计算当前的位置start-stop，两数差值
	 * @param start 开始数值
	 * @param stop  结束的数值
	 * @param amt 0-1 用时 >1为1，小于0为0
	 */
	export function Lerp(start: number, stop: number, amt: number): number;
	/**
	 * 四舍五入保留指定位数的小数
	 * @param num 取舍的数
	 * @param decimals 保留小数位
	 */
	export function Round(num: number, decimals: number): number;
	/** 获取全局唯一数 */
	export function uid(): number;
	/** 获取URL参数 */
	export function getQueryVariable(variable: string): string | null | undefined;
	/**
	 * 解析一个字符串函数的参数，如xxx(1) = 1
	 * @param
	 */
	export function getStringFunctionParam(str: string): {
	    key: string;
	    value: number;
	};
	export function isDeltaIdentity(m: vf.Matrix): boolean;
	/**
	 * 格式化一个百分比为小数
	 * @param value
	 * @param total
	 */
	export function formatRelative(value: number | string | undefined, total: number): number;
	/** 计算两点距离 */
	export function pointDistance(pointA: vf.Point | {
	    x: number;
	    y: number;
	}, pointB: vf.Point | {
	    x: number;
	    y: number;
	}): number;
	/** 坐标相减 */
	export function pointSub(source: vf.Point | {
	    x: number;
	    y: number;
	}, subPoint: vf.Point | {
	    x: number;
	    y: number;
	}): {
	    x: number;
	    y: number;
	};
	/** 坐标相加 */
	export function pointPlus(source: vf.Point | {
	    x: number;
	    y: number;
	}, PlusPoint: vf.Point | {
	    x: number;
	    y: number;
	}): {
	    x: number;
	    y: number;
	};
	/** 向量转弧度 */
	export function pointSignAngle(pointA: vf.Point | {
	    x: number;
	    y: number;
	}, pointB: vf.Point | {
	    x: number;
	    y: number;
	}): number;
	/**
	 *  根据类型获得具体的类定义
	 * @param type
	 */
	export function getGuiClass(type: string): any;
	export function sayHello(): void;

}
declare module 'src/core/Filter' {
	///   types="@vf.js/vf" />
	export class Filter extends vf.Filter {
	    static isFilter: boolean;
	    static defaultFilterVertex: string;
	    static list: Map<string, boolean>;
	    constructor(vertexSrc?: string, fragmentSrc?: string, uniforms?: {
	        [key: string]: any;
	    });
	}

}
declare module 'src/display/Container' {
	import { DisplayObject } from 'src/core/DisplayObject';
	/**
	 * 基础容器
	 *
	 * 设置checkGroup后，进行分组。 分组后，可理解为复选框。
	 *
	 * @example let container = new vf.gui.Container();
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestContainer
	 */
	export class Container extends DisplayObject {
	    constructor();
	    /**
	     * 确定指定显示对象是 DisplayObjectContainer 实例的子项或该实例本身。搜索包括整个显示列表（其中包括此 DisplayObjectContainer 实例）。
	     * 孙项、曾孙项等，每项都返回 true。
	     * @param child 要测试的子对象。
	     * @returns 如果 child 对象是 DisplayObjectContainer 的子项或容器本身，则为 true；否则为 false。
	     */
	    contains(child: DisplayObject): boolean;
	}

}
declare module 'src/display/Slider' {
	///   types="@vf.js/vf" />
	import { DisplayObject } from 'src/core/DisplayObject';
	import { Image as VfuiImage } from 'src/display/Image';
	import { DragEvent, InteractionEvent } from 'src/interaction/Index';
	/**
	 * 滑动条/进度条
	 *
	 * @example let slider = new vf.gui.Slider();
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestSlider
	 */
	export class Slider extends DisplayObject {
	    constructor();
	    /**
	     * 当前值
	     */
	    protected _amt: number;
	    /**
	     * 小数的保留位，0不保留
	     * @default 0
	     */
	    protected _decimals: number;
	    protected _startValue: number;
	    protected _maxPosition: number;
	    protected _lastChange: number;
	    protected _lastChanging: number;
	    protected _localMousePosition: vf.Point;
	    /** 状态展示 */
	    readonly trackImg: VfuiImage;
	    readonly thumbImg: VfuiImage;
	    readonly tracklightImg: VfuiImage;
	    protected _thumbDrag: DragEvent;
	    protected _trackDrag: DragEvent;
	    /**
	     * 当前值
	     */
	    value: number;
	    protected valueSystem(value?: number): void;
	    /**
	     * 最小值
	     */
	    protected _minValue: number;
	    minValue: number;
	    /**
	     * 最大值
	     */
	    protected _maxValue: number;
	    maxValue: number;
	    /**
	     * 是否垂直,滑块方向
	     */
	    protected _vertical: boolean;
	    vertical: boolean;
	    /**
	     * 背景
	     */
	    protected _track?: string | number | vf.Texture | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
	    track: string | number | HTMLCanvasElement | vf.Texture | HTMLImageElement | HTMLVideoElement | undefined;
	    /**
	     * 手柄
	     */
	    protected _thumb?: string | number | vf.Texture | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
	    thumb: string | number | HTMLCanvasElement | vf.Texture | HTMLImageElement | HTMLVideoElement | undefined;
	    /**
	     * 进度
	     */
	    protected _tracklight?: string | number | vf.Texture | HTMLImageElement | HTMLCanvasElement | HTMLVideoElement;
	    tracklight: string | number | HTMLCanvasElement | vf.Texture | HTMLImageElement | HTMLVideoElement | undefined;
	    protected onImgload(): void;
	    protected updatePosition(soft?: boolean): void;
	    protected onPress(event: InteractionEvent, isPressed: boolean, dragEvent?: DragEvent): void;
	    protected onDragStart(event: InteractionEvent): void;
	    protected onDragMove(event: InteractionEvent, offset: vf.Point): void;
	    protected onDragEnd(event: InteractionEvent): void;
	    protected updatePositionToMouse(mousePosition: vf.Point, soft: boolean): void;
	    protected triggerValueChange(): void;
	    protected triggerValueChanging(): void;
	    updateLayout(): void;
	    protected commitProperties(): void;
	    protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void;
	    release(): void;
	}

}
declare module 'src/display/ScrollBar' {
	///   types="@vf.js/vf" />
	import { Slider } from 'src/display/Slider';
	import { ScrollingContainer } from 'src/display/ScrollingContainer';
	import { Image } from 'src/display/Image';
	import { InteractionEvent } from 'src/interaction/Index';
	/**
	 * UI 带有滚动条的容器
	 */
	export class ScrollBar extends Slider {
	    constructor();
	    /**
	     * 是的自动隐藏滚动条
	     */
	    autohide: boolean;
	    private _scrollingContainer;
	    private _hidden;
	    protected toggleHidden(hidden: boolean): void;
	    protected onThumbLoadComplete(rectangle: vf.Rectangle, source: Image): void;
	    protected triggerValueChanging(): void;
	    private _source;
	    source: ScrollingContainer | string | undefined;
	    private _dragScrolling;
	    dragScrolling: boolean;
	    protected commitProperties(): void;
	    protected alignToContainer(): void;
	    protected onDragMove(event: InteractionEvent, offset: vf.Point): void;
	    protected updatePosition(soft?: boolean): void;
	    release(): void;
	}

}
declare module 'src/display/ScrollingContainer' {
	///   types="@vf.js/vf" />
	import { Container } from 'src/display/Container';
	import { ContainerBase } from 'src/core/ContainerBase';
	import { DisplayObjectAbstract } from 'src/core/DisplayObjectAbstract';
	/**
	 * 可滚动的容器
	 *
	 * @example let scrollingContainer = new vf.gui.ScrollingContainer();
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestRect
	 */
	export class ScrollingContainer extends Container {
	    constructor();
	    /**
	     * 是否启动拖拽滚动
	     * @default true
	     */
	    private _dragScrolling;
	    dragScrolling: boolean;
	    /**
	     * 滚动的阻力或柔度 (0-1)
	     * @default 0.5
	     */
	    softness: number;
	    /**
	     * 滚动条的圆角半径 设置0时，滚动条为直角长方形
	     * @default 0
	     */
	    radius: number;
	    /**
	     * 遮罩的扩充范围
	     */
	    expandMask: number;
	    /**
	     * 是否开启滚动动画
	     * @default false
	     */
	    animating: boolean;
	    /**
	     * 是否启用水平滚动
	     * @default false
	     */
	    scrollX: boolean;
	    /**
	     * 是否滚动中
	     */
	    scrollY: boolean;
	    /**
	     * 内容容器
	     * @private
	     */
	    private _innerContainer;
	    /**
	     * 内容的宽高
	     */
	    innerBounds: vf.Rectangle;
	    /**
	     * 拖动处理类
	     */
	    private dragEvent?;
	    /**
	     * 鼠标滚动
	     */
	    private mouseScrollEvent?;
	    /**
	     * 是否滚动中
	     */
	    private scrolling;
	    /**
	     * 临时方案，设置时间间隔，跳转容器宽高
	     */
	    private _boundCached;
	    private _lastWidth;
	    private _lastHeight;
	    private _isInitScrolling;
	    private _containerStart;
	    private _targetPosition;
	    private _lastPosition;
	    private _Position;
	    private _Speed;
	    private _stop;
	    private isInitDrag;
	    protected initDrag(): void;
	    protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void;
	    protected setScrollPosition(speed?: vf.Point): void;
	    readonly innerContainer: ContainerBase;
	    addChild<T extends DisplayObjectAbstract>(item: T): T;
	    addChildAt<T extends DisplayObjectAbstract>(item: T, index: number): T;
	    getInnerBounds(force?: boolean): vf.Rectangle;
	    $onInit(): void;
	    protected initScrolling(): void;
	    protected updateScrollBars(): void;
	    /**
	     * 百分比设置位置
	     * @param direction 方向
	     * @param pct 百分比0-1
	     */
	    forcePctPosition(direction: "x" | "y", pct: number): void;
	    /** 根据焦点设置位置 */
	    focusPosition(pos: vf.Point): void;
	    protected updateScrollPosition(delta: number): void;
	    protected updateDirection(direction: "x" | "y", delta: number): void;
	    release(): void;
	}

}
declare module 'src/display/SpriteAnimated' {
	///   types="@vf.js/vf" />
	import { DisplayObject } from 'src/core/DisplayObject';
	/**
	 * 序列图动画
	 *
	 * 支持使用texturepacker导出以及处理轴点
	 *
	 * @example let spriteAnimated = new vf.gui.SpriteAnimated();
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestSpriteAnimated
	 */
	export class SpriteAnimated extends DisplayObject {
	    constructor();
	    private _animatedSprites;
	    private _lastAnimatedName;
	    private _curFrameNumber;
	    private _setTimeoutId;
	    /**
	     * 要播放的动作名
	     */
	    private _animationName;
	    animationName: string;
	    /**
	     * 序列图路径，或序列图数组
	     */
	    private _src;
	    src: vf.Spritesheet | vf.Texture[] | undefined;
	    /**
	     * 动画速度
	     */
	    private _animationSpeed;
	    animationSpeed: number;
	    /**
	     * 是的循环
	     */
	    private _loop;
	    loop: boolean;
	    private _playCount;
	    /**
	     * 循环次数
	     */
	    private _loopCount;
	    loopCount: number;
	    /**
	     * 是否播放中
	     */
	    private _playing;
	    readonly playing: boolean;
	    /**
	     * 锚点，调整位图的坐标中点 0-1, 可通过 TexturePacker输出sheet图并设置好 anchor
	     */
	    private _anchorX;
	    anchorX: number;
	    /**
	     * 锚点，调整位图的坐标中点 0-1, 可通过 TexturePacker输出sheet图并设置好 anchor
	     */
	    private _anchorY;
	    anchorY: number;
	    /** 跳转到第N帧并播放 */
	    gotoAndPlay(frameNumber: number): void;
	    /** 跳转到第N帧并停止 */
	    gotoAndStop(frameNumber: number): void;
	    /** 停止 */
	    stop(): void;
	    /** 播放 */
	    play(): void;
	    autoPlay: boolean;
	    isPlay: boolean;
	    /**
	     * 添加动画
	     */
	    addAnimated(animationName: string, textures: vf.Texture[]): void;
	    release(): void;
	    protected releaseAnimate(): void;
	    protected srcSystem(): void;
	    protected animatedNameSystem(): void;
	    protected playSystem(): void;
	    protected attribSystem(): void;
	}

}
declare module 'src/event/KeyEvent' {
	/**
	 * 键盘事件 驱动类KeysEvent
	 *
	 */
	export const enum KeyEvent {
	    input = "input",
	    /**
	     * 键盘按下
	     *
	     * (e:InteractionEvent,obj:DisplayObject)
	     */
	    keydown = "keydown",
	    /**
	     * 键盘弹起
	     *
	     * (e:InteractionEvent,obj:DisplayObject)
	     */
	    keyup = "keyup",
	    /**
	     * 粘贴
	     *
	     * (e:InteractionEvent,obj:DisplayObject,clipboardData: DataTransfer | null)
	     */
	    paste = "paste",
	    /**
	     * 复制
	     *
	     * (e:InteractionEvent,obj:DisplayObject,clipboardData: DataTransfer | null)
	     */
	    copy = "copy",
	    /**
	     * 剪切
	     *
	     * (e:InteractionEvent,obj:DisplayObject,clipboardData: DataTransfer | null)
	     */
	    cut = "cut",
	    /**
	     * 回退删除
	     *
	     * (e:InteractionEvent,obj:DisplayObject)
	     */
	    backspace = 8,
	    /**
	     * 回车
	     *
	     * (e:InteractionEvent,obj:DisplayObject)
	     */
	    enter = 13,
	    /**
	     * 删除
	     *
	     * (e:InteractionEvent,obj:DisplayObject)
	     */
	    delete = 46,
	    /**
	     * 全选 ctrl+a
	     *
	     * (e:InteractionEvent,obj:DisplayObject)
	     */
	    ctrlA = 65,
	    /**
	     * 撤销 ctrl+z
	     *
	     * (e:InteractionEvent,obj:DisplayObject)
	     */
	    ctrlZ = 90,
	    /**
	     * 箭头左
	     *
	     * (e:InteractionEvent,obj:DisplayObject)
	     */
	    left = 37,
	    /**
	     * 箭头上
	     *
	     * (e:InteractionEvent,obj:DisplayObject)
	     */
	    top = 38,
	    /**
	     * 箭头右
	     *
	     * (e:InteractionEvent,obj:DisplayObject)
	     */
	    right = 39,
	    /**
	     * 箭头下
	     *
	     * (e:InteractionEvent,obj:DisplayObject)
	     */
	    down = 40,
	    /**
	     * shift + 箭头左
	     *
	     * (e:InteractionEvent,obj:DisplayObject)
	     */
	    shiftLeft = "shift37",
	    /**
	     * shift + 箭头右
	     *
	     * (e:InteractionEvent,obj:DisplayObject)
	     */
	    shiftRight = "shift39",
	    /**
	     * shift + 箭头上
	     *
	     * (e:InteractionEvent,obj:DisplayObject)
	     */
	    shiftTop = "shift38",
	    /**
	     * shift + 箭头下
	     *
	     * (e:InteractionEvent,obj:DisplayObject)
	     */
	    shiftDown = "shift40"
	}

}
declare module 'src/display/private/HtmlInput' {
	///   types="@vf.js/vf" />
	/**
	 * 私有的，由于VFJS不支持文本输入，这里以HTML方式实现
	 */
	export default class HtmlInput extends vf.utils.EventEmitter {
	    constructor(multiline: boolean);
	    private _domInput;
	    private _selection;
	    private _restrictRegex;
	    private _restrictValue;
	    readonly domInput: HTMLInputElement | HTMLTextAreaElement;
	    visible: boolean;
	    value: string;
	    placeholder: string;
	    disabled: boolean;
	    maxlength: number;
	    restrict: RegExp | undefined;
	    setStyle(style: InputStyle): void;
	    setStyleValue(key: any, value: any): void;
	    select(): void;
	    /** 测量，需要对象添加到body中 */
	    getDOMInputBounds(): ClientRect | DOMRect;
	    updatePostion(top: string | number, left: string | number, transform: string, opacity?: string | number): void;
	    private addDom;
	    private removeDom;
	    release(): void;
	    private _onInputKeyDownBind;
	    private _onInputInputBind;
	    private _onInputKeyUpBind;
	    private _onFocusedBind;
	    private _onBlurredBind;
	    private addEvent;
	    private removeEvent;
	    private _applyRestriction;
	    private _onInputKeyDown;
	    private _onInputInput;
	    private _onInputKeyUp;
	    private _onFocused;
	    private _onBlurred;
	    focus(): void;
	    blur(): void;
	}

}
declare module 'src/display/TextInput' {
	///   types="@vf.js/vf" />
	import HtmlInput from 'src/display/private/HtmlInput';
	import { InputBase } from 'src/display/private/InputBase';
	import { Image } from 'src/display/Image';
	/**
	 * 文本输入
	 *
	 * @example let textInput = new vf.gui.TextInput(true|false);//单行或多行
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestTextInput
	 */
	export class TextInput extends InputBase {
	    constructor(multiline?: boolean);
	    protected _oldState: string;
	    protected htmlInputShared: HtmlInput;
	    protected _lastRenderer: vf.Renderer | undefined;
	    protected _resolution: number;
	    protected _canvasBounds: {
	        top: number;
	        left: number;
	        width: number;
	        height: number;
	    } | undefined;
	    protected _previous: {
	        canvasBounds: any;
	        worldTransform: any;
	        worldAlpha: any;
	        worldVisible: any;
	    } | any;
	    protected _inputStyle: InputStyle;
	    /**
	     * 预览文字的样式
	     */
	    protected placeholderColor: number;
	    protected _domVisible: boolean;
	    protected _textHitbox: vf.Graphics;
	    protected _textMask: vf.Graphics;
	    protected _text: vf.Text;
	    protected _fontMetrics: vf.IFontMetrics | undefined;
	    protected state: string;
	    /**
	     * 设置文本
	     */
	    text: string;
	    /**
	     * 预览文字
	     */
	    private _placeholder;
	    placeholder: string;
	    /**
	     * 设置最大可输入
	     */
	    private _maxLength;
	    maxLength: number;
	    /**
	     * 过滤表达式
	     */
	    private _restrict;
	    restrict: RegExp | undefined;
	    /**
	     * 状态展示
	    */
	    readonly img: Image;
	    updateSystem(renderer?: vf.Renderer): void;
	    /**
	     * 设置焦点
	     */
	    focus(): void;
	    /**
	     * 失去焦点
	     */
	    blur(): void;
	    /**
	     * 设置css style样式
	     * @param key 健
	     * @param value 值
	     */
	    setInputStyle(key: any, value: any): void;
	    protected onStateChange(ui: TextInput, state: string): void;
	    private _onInputInput;
	    private _onFocused;
	    private _onBlurred;
	    private _setState;
	    private _updateSubstitution;
	    render(renderer: vf.Renderer): void;
	    private _renderInternal;
	    private _updateDOMInput;
	    private _needsUpdate;
	    private _updatetext;
	    private _ontextFocus;
	    private _ensureFocus;
	    private _derivetextStyle;
	    private _derivetextPadding;
	    private _derivetextText;
	    private _hasFocus;
	    private _getCanvasBounds;
	    private _getDOMRelativeWorldTransform;
	    private _vfMatrixToCSS;
	    private _comparevfMatrices;
	    private _compareClientRects;
	    release(): void;
	}

}
declare module 'src/display/private/GraphBase' {
	///   types="@vf.js/vf" />
	import { DisplayObject } from 'src/core/DisplayObject';
	import { MaskSprite } from 'src/core/MaskSprite';
	/**
	 * 绘制图形基类
	 */
	export class GraphBase extends DisplayObject implements MaskSprite {
	    constructor();
	    readonly graphics: vf.Graphics;
	    /** 可以支持遮罩的组件 */
	    maskSprite(): vf.Graphics;
	    /**
	     * 半径
	     */
	    protected _radius: number;
	    radius: number;
	    /**
	     * 线条颜色
	     */
	    protected _lineColor: number;
	    lineColor: number;
	    /**
	     * 线条粗细
	     */
	    protected _lineWidth: number;
	    lineWidth: number;
	    /**
	     * 线条透明度
	     */
	    protected _lineAlpha: number;
	    lineAlpha: number;
	    /**
	     * 颜色
	     */
	    protected _color?: number;
	    color: number | undefined;
	    /**
	     * 锚点，调整位图的坐标中点 0-1
	     */
	    protected _anchorX?: number;
	    anchorX: number | undefined;
	    /**
	     * 锚点，调整位图的坐标中点 0-1
	     */
	    protected _anchorY?: number;
	    anchorY: number | undefined;
	    /**
	     * 子类重写
	     */
	    drawGraph(): void;
	    release(): void;
	    protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void;
	}

}
declare module 'src/display/Rect' {
	import { GraphBase } from 'src/display/private/GraphBase';
	/**
	 * 绘制矩形或圆角矩形
	 *
	 * 不设置 lineWidth 或 color 矩形不可见
	 *
	 * @example let rect = new vf.gui.Rect();
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestRect
	 */
	export class Rect extends GraphBase {
	    constructor();
	    drawGraph(): void;
	}

}
declare module 'src/display/Circle' {
	import { GraphBase } from 'src/display/private/GraphBase';
	/**
	 * 绘制圆形
	 *
	 * 不设置 lineWidth 或 color 圆形不可见
	 *
	 * @example let circle = new vf.gui.Circle();
	 *

	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestCircle
	 */
	export class Circle extends GraphBase {
	    constructor();
	    /**
	     * 开始绘制角度
	     */
	    protected _startAngle: number;
	    startAngle: number;
	    /**
	     * 结束角度
	     */
	    protected _endAngle: number;
	    endAngle: number;
	    /**
	     * 逆时针绘制
	     */
	    protected _anticlockwise: boolean;
	    anticlockwise: boolean;
	    drawGraph(): void;
	}

}
declare module 'src/display/Graphics' {
	///   types="@vf.js/vf" />
	import { DisplayObject } from 'src/core/DisplayObject';
	/**
	 * 矢量绘制
	 *
	 * @example let graphics = new vf.gui.Graphics();
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestTimeLine
	 */
	export class Graphics extends DisplayObject {
	    constructor(geometry?: vf.GraphicsGeometry | undefined);
	    readonly graphics: vf.Graphics;
	}

}
declare module 'src/enum/FollowLineEnum' {
	export const enum Role {
	    /** 老师 */
	    teacher = "T",
	    /** 学生 */
	    student = "S"
	}
	export const enum Operate {
	    add = "1",
	    remove = "2",
	    clear = "3"
	}

}
declare module 'src/enum/TracingEnum' {
	export const enum Operate {
	    Add = 0,
	    Clear = 1
	}
	export const enum Mode {
	    Check = 0,
	    Teach = 1,
	    Auto = 2
	}
	export const enum Result {
	    Uncomplete = 0,
	    Correct = 1,
	    Incorrect = 2,
	    Complete = 3
	}

}
declare module 'src/enum/Index' {
	import * as FollowLineEnum from 'src/enum/FollowLineEnum';
	import * as TracingEnum from 'src/enum/TracingEnum';
	export { FollowLineEnum, TracingEnum };

}
declare module 'src/display/FollowLine' {
	import { DisplayObject } from 'src/core/DisplayObject';
	import { ClickEvent } from 'src/interaction/Index';
	import { FollowLineEnum } from 'src/enum/Index';
	/**
	 * 跟随鼠标或触摸绘制线条
	 *
	 * @example let graphics = new vf.gui.FollowLine();
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestTimeLine
	 */
	export class FollowLine extends DisplayObject {
	    constructor(bindDisplay?: DisplayObject);
	    protected clickEvent: ClickEvent;
	    /** 线条 */
	    private _lines;
	    /** 要删除的线，复制品 */
	    private _eraseLine?;
	    /** 触摸的ID */
	    private _touchId;
	    /** 位置缓存，记录画线时候每一个点，最后画完优化 */
	    private _posCache;
	    /** 保存已画线的key */
	    private _lineKeys;
	    /** 鼠标坐标 */
	    private _mouseOffset;
	    /** 开始偏移量 */
	    private startOffset;
	    /** 上次点击坐标 */
	    private _lastPos;
	    /**
	     * 由老师触发的划线索引
	     */
	    private _curLineIndex;
	    /**
	     * 需要处理的消息列表
	     */
	    private _messageCache;
	    /**
	     * 线条颜色
	     */
	    private _lineColor;
	    lineColor: number;
	    /**
	     * 是否暂停，一些特殊情况，如拖拽时，可暂停
	     */
	    private _isPause;
	    isPause: boolean;
	    /** 是否擦除中 */
	    private _isErasing;
	    isErasing: boolean;
	    /** 角色状态 */
	    private _role;
	    role: FollowLineEnum.Role;
	    /**
	     * @private
	     * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
	     */
	    protected commitProperties(): void;
	    /**
	     * 更新显示列表,子类重写，实现布局
	     */
	    protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void;
	    $onInit(): void;
	    $onRelease(): void;
	    private onMessage;
	    private onPress;
	    private onMove;
	    /**
	     * 发送操作事件
	     * @param operate   1添加 2删除 3重置
	     * @param role  Role
	     * @param lineIndex 线段 ID
	     */
	    private emitMsg;
	    /**
	     *
	     * @param name (name = role + lineId)
	     * @param role
	     */
	    private getGraphics;
	    private getCurLineByPos;
	    private getDataStrByPosCache;
	    private drawLine;
	    private draw;
	    private removeLine;
	    clear(): void;
	    setData(data: string | string[]): void;
	    source: string | string[];
	    reset(): any;
	}

}
declare module 'src/display/Video' {
	///   types="@vf.js/vf" />
	import { DisplayObject } from 'src/core/DisplayObject';
	/**
	 * 播放器组件
	 *
	 */
	export class Video extends DisplayObject {
	    private _video;
	    private _src;
	    private _poster;
	    protected _canvasBounds: {
	        top: number;
	        left: number;
	        width: number;
	        height: number;
	    } | undefined;
	    protected _lastRenderer: vf.Renderer | undefined;
	    protected _resolution: number;
	    private _canplayFun;
	    private _canplaythroughFun;
	    private _completeFun;
	    private _endedFun;
	    private _loadeddataFun;
	    private _durationchangeFun;
	    constructor();
	    private canplayFun;
	    private canplaythroughFun;
	    private completeFun;
	    private endedFun;
	    private loadeddataFun;
	    private durationchangeFun;
	    protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void;
	    private updatePostion;
	    private updateSystem;
	    private _getCanvasBounds;
	    private _vfMatrixToCSS;
	    private _getDOMRelativeWorldTransform;
	    /**
	     * 支持的参数们~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	     */
	    src: number | string;
	    controls: boolean;
	    width: number;
	    height: number;
	    loop: boolean;
	    muted: boolean;
	    volume: number;
	    poster: number | string;
	    currentTime: number;
	    /**
	     * 只读的属性们~~~~~~~~~~~~~~~~
	     * */
	    readonly duration: number;
	    /**
	    * 支持的方法们~~~··~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	    **/
	    play(): void;
	    pause(): void;
	    requestFullScreen(): void;
	    exitFullscreen(): void;
	    release(): void;
	}

}
declare module 'src/display/ConnectLine' {
	import { DisplayObject } from 'src/core/DisplayObject'; type LinePostion = 'leftTop' | 'centerTop' | 'rightTop' | 'leftCenter' | 'center' | 'rightCenter' | 'leftBottom' | 'centerBottom' | 'rightBottom' | number[];
	export const play: unique symbol;
	/**
	 * 连线组件
	 *
	 *
	 * @example let connectLine = new vf.gui.ConnectLine();
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestConnectLine
	 */
	export class ConnectLine extends DisplayObject {
	    constructor();
	    private readonly line;
	    private _lastStartPos;
	    private _lastEndPos;
	    private _play;
	    /**
	     *  触发画线操作
	     *
	     *  属性 play = 1 触发画线，线条从source->target.
	     *  属性 play = 2 触发画线，线条从target->source.
	     */
	    play: 2 | 1;
	    private _autoPlay;
	    /**
	     *  默认 autoPlay = true
	     *
	     *  autoPlay = true时，组件在设置source,target,sourcePostion,targetPostion后自动触发画线，线条从source->target.
	     *
	     *  autoPlay = false时，设置source,target,sourcePostion,targetPostion后不会触发画线，需调用 play.
	     */
	    autoPlay: boolean;
	    private _source?;
	    /**
	     * 设置源显示对象
	     */
	    source: DisplayObject | undefined;
	    private _sourcePostion;
	    /**
	     * 设置源显示对象位置
	     */
	    sourcePostion: LinePostion;
	    private _target?;
	    /**
	     * 设置目标显示对象
	     */
	    target: DisplayObject | undefined;
	    private _targetPostion;
	    /**
	     * 设置目标显示对象位置
	     */
	    targetPostion: LinePostion;
	    /**
	     * 线条颜色
	     */
	    private _lineColor;
	    lineColor: number;
	    /**
	     * 线条粗细
	     */
	    private _lineWidth;
	    lineWidth: number;
	    private _isAnimation;
	    /**
	     * 线条位置改变时，是否有动画
	     */
	    isAnimation: boolean;
	    protected commitProperties(): void;
	    private getLocalPos;
	    protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void;
	    private animation;
	    isClear: boolean;
	    clear(): void;
	    release(): void;
	}
	export {};

}
declare module 'src/display/Tracing' {
	///   types="@vf.js/vf" />
	import { DisplayObject } from 'src/core/DisplayObject';
	import { ClickEvent } from 'src/interaction/Index';
	import { TracingEnum } from 'src/enum/Index';
	export class Tracing extends DisplayObject {
	    constructor();
	    protected clickEvent: ClickEvent;
	    private _renderMode;
	    private _guideSprite;
	    private _bgSprite;
	    private _lines;
	    private _realTraceIndexArr;
	    private _tempTraceIndexArr;
	    private _lineStyle;
	    private _posCache;
	    private _drawing;
	    private _lastLocalPos;
	    private _curLocalPos;
	    private _autoComplete;
	    private _curIndex;
	    private _tracePointObjArr;
	    private _result;
	    private _groupStatusArr;
	    private _lineId;
	    private _newLineFlag;
	    private _pointId;
	    private _messageCache;
	    private _tween;
	    private _guideTime;
	    /**
	     * debug
	     */
	    private _debug;
	    debug: boolean;
	    /**
	     * 模式
	     */
	    private _mode;
	    mode: TracingEnum.Mode;
	    /**
	     * 文字轨迹图
	     */
	    private _traceSprite;
	    traceSprite: string | number | HTMLCanvasElement | vf.Texture | HTMLImageElement | HTMLVideoElement | undefined;
	    /**
	     * 背景图，mask模式用于画线后漏出来
	     */
	    private _renderBgSprite;
	    renderBgSprite: string | number | HTMLCanvasElement | vf.Texture | HTMLImageElement | HTMLVideoElement | undefined;
	    /**
	     * 轨迹点,二维数组
	     */
	    private _tracePoints;
	    tracePoints: {
	        x: number;
	        y: number;
	    }[][];
	    /**
	     * 线宽
	     */
	    private _lineWidth;
	    lineWidth: number;
	    /**
	     * 颜色
	     */
	    private _lineColor;
	    lineColor: number;
	    /**
	     * 检测精度
	     */
	    private _precision;
	    precision: number;
	    /**
	     * 位图
	     */
	    private _lineTexture;
	    lineTexture: string | number | undefined;
	    /**
	     * 画笔样式
	     */
	    private setLineStyle;
	    /**
	     * 轨迹图
	     */
	    private setTraceSprite;
	    /**
	     * mask背景图
	     */
	    private setRenderBgSprite;
	    /**
	     * 开始，适用于audo和teach模式
	     */
	    private start;
	    /**
	     * 教学引导
	     */
	    private guide;
	    private playGuideAnimal;
	    /**
	     * 清除教学引导
	     */
	    clearGuide(): void;
	    /**
	     * 自动绘制
	     */
	    private auto;
	    private _posLength;
	    private drawWithAnimation;
	    private autoNextPoint;
	    /**
	     * 更新显示列表,子类重写，实现布局
	     */
	    protected updateDisplayList(unscaledWidth: number, unscaledHeight: number): void;
	    $onInit(): void;
	    $onRelease(): void;
	    /**
	     * 检测触摸点和轨迹点
	     * @param point
	     */
	    private checkTrace;
	    /**
	     * 检查暂存区,抬起时检测暂存区中的点是否在一个笔画上
	     */
	    private checkTemp;
	    /**
	     * 检查group
	     */
	    private checkResult;
	    /**
	     * 教学模式检查
	     */
	    private checkTeach;
	    /**
	     * 画线
	     * @param lineId
	     * @param data
	     * @param from
	     * @param to
	     * @param lineStyle
	     */
	    private drawLine;
	    /**
	     * 绘图
	     * @param graphics
	     * @param posList
	     */
	    private draw;
	    /**
	     * 本地绘制
	     * @param graphics
	     */
	    private localDraw;
	    private onPress;
	    private onMove;
	    /**
	     *
	     * @param lineId
	     * @param lineStyle
	     */
	    private getGraphics;
	    private getDataStrByPosCache;
	    /**
	     * 发送一个笔画的msg
	     * @param lineId
	     * @param data
	     */
	    private emitTracingMsg;
	    private onMessage;
	    /**
	     * clear
	     */
	    clear(): void;
	    /**
	     * @private
	     * 提交属性，子类在调用完invalidateProperties()方法后，应覆盖此方法以应用属性
	     */
	    protected commitProperties(): void;
	    setData(data: string | string[]): void;
	    source: string | string[];
	}

}
declare module 'src/display/Audio' {
	import { DisplayObject } from 'src/core/DisplayObject';
	/**
	 * 音频组件
	 *
	 * 准备完成 canplaythrough
	 *
	 * 播放事件 play
	 *
	 * 暂停事件 pause
	 *
	 * 错误事件 error
	 *
	 * 播放时间改变 timeupdate
	 *
	 * 播放完成 ended
	 *
	 * @example let audio = new vf.gui.Audio();
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestLabel
	 */
	export class Audio extends DisplayObject {
	    private audio?;
	    private _id;
	    private _src;
	    private _autoplay;
	    private _loop;
	    private _playbackRate;
	    private _volume;
	    private stoping;
	    constructor();
	    private initAudio;
	    /**
	    * 设置src 支持3种 url base64 arraybuffer;
	    */
	    src: any;
	    autoplay: any;
	    loop: any;
	    playbackRate: any;
	    volume: any;
	    readonly duration: number;
	    readonly paused: boolean;
	    /**
	    * 支持的方法们~~~··~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	    *    */
	    /**
	     * 声音播放接口
	     *
	     *  await sound.play()
	     * @param {number} [time] - 声音延迟开始
	     * @param {number} [offset] - 声音的开始偏移值
	     * @param {number} [length] - 声音持续时间（以秒为单位）
	     */
	    play(time?: number, offset?: number, length?: number): void;
	    /**
	    * 停止声音
	    * @param time (optional) X秒后停止声音。默认情况下立即停止
	    */
	    stop(time?: number): void;
	    /**
	    * 暂停声音
	    */
	    pause(): void;
	    /**
	    * 释放
	    */
	    dispose(): void;
	    release(): void;
	    /**
	    * 各种可取参数.~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	    */
	    readonly isPlaying: any;
	    protected commitProperties(): void;
	}

}
declare module 'src/event/SchedulerEvent' {
	export const enum SchedulerEvent {
	    /**
	     * 心跳
	     */
	    TICK = "tick",
	    /**
	     * 启动/开始
	     */
	    START = "start",
	    /**
	     * 更新
	     */
	    UPDATE = "update",
	    /**
	     * 结束
	     */
	    END = "end"
	}

}
declare module 'src/event/Index' {
	import * as ComponentEvent from 'src/event/ComponentEvent';
	import { InteractionEvent } from 'src/event/InteractionEvent';
	import { TouchMouseEvent } from 'src/event/TouchMouseEvent';
	import { TweenEvent } from 'src/event/TweenEvent';
	import { SchedulerEvent } from 'src/event/SchedulerEvent';
	export { ComponentEvent, InteractionEvent, TouchMouseEvent, TweenEvent, SchedulerEvent };

}
declare module 'src/event/EventType' {
	export const enum EventType {
	    /**
	     * 状态变化 ：IVFData -> VFStateCode
	     */
	    STATUS = "status",
	    /**
	     * 推送消息到外部
	     */
	    MESSAGE = "message",
	    /**
	     * 接收外部消息
	     */
	    ONMESSAGE = "onMessage",
	    /**
	     * 通用状态变化
	     */
	    STATE = "state",
	    /**
	     * 启动/开始
	     */
	    START = "start",
	    /**
	     * 心跳
	     */
	    TICK = "tick",
	    /**
	     * 更新
	     */
	    UPDATE = "update",
	    /**
	     * 已改变
	     */
	    CHANGED = "changed",
	    /**
	     * 结束
	     */
	    END = "end"
	}

}
declare module 'src/event/EventLevel' {
	/**
	 * status: 状态变化
	 *
	 * command: 执行操作
	 *
	 * ----------------------
	 *
	 * Info: 默认的等级
	 *
	 * Warn: 表示可能对系统有损害的情况
	 *
	 * 表示非常严重的错误等级，记录极有可能导致应用程序终止运行的致命错误信息；
	 */
	export const enum EventLevel {
	    /**
	     * 状态
	     */
	    STATUS = "status",
	    /**
	     * 命令
	     */
	    COMMAND = "command",
	    /**
	     * 默认的等级
	     */
	    INFO = "info",
	    /**
	     * 警告
	     */
	    WARNING = "warning",
	    /**
	     * 错误
	     */
	    ERROR = "error",
	    /**
	     * 原生
	     */
	    NATIVE = "native"
	}

}
declare module 'src/core/Scheduler' {
	///   types="@vf.js/vf" />
	/**
	 * Schedule anything
	 *
	 * @author 8088
	 */
	export class Scheduler extends vf.utils.EventEmitter {
	    readonly id: number;
	    static setEnterFrame(listener: (data?: any) => void): Scheduler;
	    static setInterval(time: number, listener: (data?: any) => void): Scheduler;
	    static setTimeout(time: number, listener: (data?: any) => void): Scheduler;
	    _interval: number;
	    _timeout: number;
	    private _id;
	    private _running;
	    private _pausing;
	    private _totalDuration;
	    private _intervalDuration;
	    constructor(timeout?: number, interval?: number);
	    restart(): void;
	    stop(): void;
	    pause(): void;
	    resume(): void;
	    private run;
	}

}
declare module 'src/UI' {
	///   types="@vf.js/vf" />
	/** 工具类 */
	import * as Utils from 'src/utils/Utils';
	/** UI舞台，最顶级的层 展示所有UI组件 */
	import { Stage } from 'src/core/Stage';
	/** UI基础显示对象，一般不会直接使用，只作为类型推断 */
	import { DisplayObject } from 'src/core/DisplayObject';
	/** 心跳，需要在初始化完成后，启动心跳更新 */
	import { TickerShared } from 'src/core/Ticker';
	/** 滤镜的基础类 */
	import { Filter } from 'src/core/Filter';
	/**
	 * 基础容器
	 *
	 * 设置checkGroup后，进行分组。 分组后，可理解为复选框。
	 *
	 * @example let container = new vf.gui.Container();
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestContainer
	 */
	import { Container } from 'src/display/Container';
	/**
	 * 滚动容器
	 *
	 * @example let scrollingContainer = new vf.gui.ScrollingContainer();
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestRect
	 */
	import { ScrollingContainer } from 'src/display/ScrollingContainer';
	/**
	 * 图片
	 *
	 * @example let image = new vf.gui.Image();
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestImage
	 */
	import { Image } from 'src/display/Image';
	/**
	 * 序列图动画
	 *
	 * 支持使用texturepacker导出以及处理轴点
	 *
	 * @example let spriteAnimated = new vf.gui.SpriteAnimated();
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestSpriteAnimated
	 */
	import { SpriteAnimated } from 'src/display/SpriteAnimated';
	/**
	 * 文本
	 *
	 * 中文换行特殊处理 xxxx.style.breakWords = true;
	 *
	 * 文本没有宽高，自适应
	 *
	 * @example let label = new vf.gui.Label();
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestLabel
	 */
	import { Label } from 'src/display/Label';
	/**
	 * 文本输入
	 *
	 * @example let textInput = new vf.gui.TextInput(true|false);//单行或多行
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestTextInput
	 */
	import { TextInput } from 'src/display/TextInput';
	/**
	 * 滑动条/进度条
	 *
	 * @example let slider = new vf.gui.Slider();
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestSlider
	 */
	import { Slider } from 'src/display/Slider';
	/**
	 * 按钮
	 *
	 * @example let button = new vf.gui.Button();
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestButton
	 */
	import { Button } from 'src/display/Button';
	/**
	 * 单选\复选框
	 *
	 * 设置checkGroup后，进行分组。 分组后，可理解为复选框。
	 *
	 * @example let checkBox = new vf.gui.CheckBox();
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestCheckBox
	 */
	import { CheckBox } from 'src/display/CheckBox';
	/**
	 * 绘制矩形或圆角矩形
	 *
	 * @example let rect = new vf.gui.Rect();
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestRect
	 */
	import { Rect } from 'src/display/Rect';
	/**
	 * 绘制矩形或圆角矩形
	 *
	 * @example let rect = new vf.gui.Circle();
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestCircle
	 */
	import { Circle } from 'src/display/Circle';
	/**
	 * 矢量绘制
	 *
	 * @example let graphics = new vf.gui.Graphics();
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestTimeLine
	 */
	import { Graphics } from 'src/display/Graphics';
	/**
	 * 跟随划线（鼠标或触摸按下时）
	 *
	 * @example let graphics = new vf.gui.FollowLine();
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestTimeLine
	 */
	import { FollowLine } from 'src/display/FollowLine';
	import { Video } from 'src/display/Video';
	/**
	 * 连线组件
	 *
	 *
	 * @example let connectLine = new vf.gui.ConnectLine();
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestConnectLine
	 */
	import { ConnectLine } from 'src/display/ConnectLine';
	/**
	 * 临摹组件
	 *
	 * @example let Tracing = new vf.gui.Tracing();
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestTracing
	 */
	import { Tracing } from 'src/display/Tracing';
	/**
	 * 滚动组件
	 *
	 * @example let scrollBar = new vf.gui.ScrollBar();
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/ScrollBar
	 */
	import { ScrollBar } from 'src/display/ScrollBar';
	/**
	 * 完整的缓动曲线列表
	 *
	 * @example vf.gui.Easing.Linear.None;
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestTween
	 */
	import { Easing } from 'src/tween/Easing';
	/**
	 * 缓动动画
	 *
	 * @example let tween = new vf.gui.Tween(myObject).to({width:'300px'}, 2000).start()
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestTween
	 */
	import { Tween } from 'src/tween/Tween';
	/**
	 * 基于帧的时间轴控制类
	 *
	 * @example let timeline = new vf.gui.Timeline();
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestTimeLine
	 */
	import { Timeline } from 'src/tween/Timeline';
	/**
	 * 音频
	 *
	 *
	 *
	 * 估计是能播放  没毛病
	 *
	 * @example let audio = new vf.gui.Audio(“地址或者是arrbuffer”);
	 *
	 *
	 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestAudio
	 */
	import { Audio } from 'src/display/Audio';
	/**
	 * 事件绑定类，非继承于inputbase的组件是没有任何交互事件，需单独绑定
	 */
	import * as Interaction from 'src/interaction/Index';
	/**
	 * 事件名
	 */
	import * as Event from 'src/event/Index';
	/**
	 * 枚举
	 */
	import * as Enum from 'src/enum/Index';
	import { Scheduler } from 'src/core/Scheduler';
	import { SyncManager } from 'src/interaction/SyncManager';
	export type Application = vf.Application;
	/** 请不要在编写UI组件内部使用本类 */
	export { Audio, Filter, Utils, Stage, Container, ScrollingContainer, Slider, Label, TextInput, Button, Video, CheckBox, Rect, Circle, Graphics, FollowLine, Tracing, ConnectLine, ScrollBar, Interaction, DisplayObject, TickerShared, Tween, Timeline, Easing, Image, SpriteAnimated, Event, Enum, Scheduler, SyncManager };

}
declare module 'src/vf-gui' {
	import * as gui from 'src/UI';
	export { gui };

}
declare module 'src/Interaction/KeyboardEvent' {
	import { DisplayObject } from 'src/core/DisplayObject'; class KeyboardSelectEvent {
	    /**
	     * document的键盘事件
	    */
	    constructor();
	    private obj;
	    private ctrlDown;
	    private shiftDown;
	    private shiftKey;
	    private ctrlKey;
	    private cmdKey;
	    private isAddEvent;
	    private keyDownEventBind;
	    private keyUpEventBind;
	    private pasteEventBind;
	    private copyEventBind;
	    private cutEventBind;
	    private addEvent;
	    private removeEvent;
	    protected keyDownEvent(e: KeyboardEvent): void;
	    protected keyUpEvent(e: KeyboardEvent): void;
	    protected copyEvent(e: ClipboardEvent): void;
	    protected cutEvent(e: ClipboardEvent): void;
	    protected pasteEvent(e: ClipboardEvent): void;
	    focus(obj: DisplayObject): void;
	    blur(): void;
	}
	/**
	 * KeyboardSelectEvent 的实例
	 */
	export const keyboardShared: KeyboardSelectEvent;
	export {};

}
declare interface ObjectConstructor {
    assign(...objects: Record<string, any>[]): Record<string, any>;
}
interface ArrayConstructor {
    from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
    from<T>(arrayLike: ArrayLike<T>): T[];
}
interface String {
    startsWith(searchString: string, position?: number): boolean;
}
interface TInputBase {
    blur?: Function;
    focus?: Function;
}
interface InputStyle {
    [propName: string]: any;
    fontFamily: string;
    fontSize?: string;
    fontWeight?: string;
    fontVariant: "normal" | "small-caps" | "inherit";
    color: '#000000';
    padding: string;
    multiline: boolean;
    fontStyle: "normal" | "italic" | "oblique" | "inherit";
    letterSpacing: number;
    textIndent: string;
    position: 'absolute';
    background: 'none';
    border: 'none';
    outline: 'none';
    transformOrigin: '0 0';
    lineHeight: '1';
}
interface Lifecycle {
    /**
     * 组件加载，暂时可能用不到
     */
    load(): void;
    /**
     * 释放，回收
     */
    release(): void;
}
/**
 * 生命周期的接口
 */
interface LifecycleHook {
    /**
     * 显示对象初始化完成，只执行一次,子类重写，不可外部调用
     */
    $onInit(): void;
    /**
     * 加载完成，不可外部调用
     */
    $onLoad(): void;
    /**
     * 回收，释放完成，不可外部调用
     */
    $onRelease(): void;
    /**
     * 添加到舞台后，不可外部调用
     */
    $onAddStage(): void;
    /**
     * 移出舞台后，不可外部调用
     */
    $onRemoveStage(): void;
}
declare module 'src/core/UIBase' {
	import { DisplayObject } from 'src/core/DisplayObject';
	export class UIBase extends DisplayObject implements Lifecycle {
	    constructor();
	}

}
declare module 'src/enum/ComponentEvent' {
	/**
	 * 特定属性改变时,通常为了去系统事件区分，UI组件的事件名为大写
	 * 1. CheckBox 的 checked 改变时
	 * 2. Label 的 text 改变时
	 * 3. SpriteAnimated 的 animationName 改变时
	 * 4. Button 文字改变
	 * 5. ScrollingContainer 拖动改变时
	 * 6. Slider 滑动改变后
	 * 7. SpriteAnimated 动画改变后
	 * 8. ConnectLine 连线完成时
	 * 9. Tracing 临摹完成一个笔画
	 */
	export const CHANGE = "CHANGE";
	/**
	 * 状态改变中
	 *
	 * slider 滑动时
	 */
	export const CHANGEING = "CHANGEING";
	/**
	 * 状态切换完成时
	 *
	 * 1. SpriteAnimated 每次播放完时，触发(loop = false时)
	 * 2. Image 图片加载完成时
	 * 3. Slider 滑动完成
	 * 4. Timeline  每次播放完时，触发(loop = false时)
	 * 5. FollowLine 完成一次划线
	 * 6. Tracing 临摹全部完成
	 */
	export const COMPLETE = "COMPLETE";
	/**
	 * 状态发生改变时
	 */
	export const STATE_CHANGE = "STATE_CHANGE";
	/**
	 * 状态切换完成时
	 *
	 * SpriteAnimated 每次播放完时，，触发(loop = true时)
	 */
	export const LOOP = "LOOP";
	/**
	 * 组件被添加前
	 */
	export const ADD = "add";
	/**
	 * 组件被添加时
	 */
	export const ADDED = "added";
	/**
	 * 组件被移除时
	 */
	export const REMOVEED = "removed";
	/**
	 * 组件大小改变后
	 */
	export const RESIZE = "RESIZE";
	/**
	 * 组件位置移动
	 */
	export const MOVE = "MOVE";
	/**
	 * 组件创建完成后
	 */
	export const CREATION_COMPLETE = "CREATION_COMPLETE";
	/**
	 * 组件拖动开始之前
	 */
	export const DRAG_START_BEFORE = "DRAG_START_BEFORE";
	/**
	 * 组件拖动开始时
	 */
	export const DRAG_START = "DRAG_START";
	/**
	 * 组件拖动结束之前
	 */
	export const DRAG_END_BEFORE = "DRAG_END_BEFORE";
	/**
	 * 组件拖动结束时 （如果绑定接收容器并拖动到接收容器中，不会触发此事件）
	 */
	export const DRAG_END = "DRAG_END";
	/**
	 * 组件拖动中
	 */
	export const DRAG_MOVE = "DRAG_MOVE";
	/**
	 * 组件拖动到接收目标中之前
	 */
	export const DRAG_TARGET_BEFORE = "DRAG_TARGET_BEFORE";
	/**
	 * 组件拖动到接收目标中
	 */
	export const DRAG_TARGET = "DRAG_TARGET";
	/**
	 * 有拖拽物掉落到此容器时触发
	 */
	export const DROP_TARGET = "DROP_TARGET";
	/**
	 * 播放音效 {name,mode}
	 */
	export const PLAY_AUDIO = "PLAY_AUDIO";

}
declare module 'src/tween/private/PlaybackPosition' {
	/**
	 * 回放位置的相关操作函数
	 */
	export default class PlaybackPosition {
	    constructor();
	    private totalTime;
	    private labels;
	    private offsets;
	    parseLabel(_name: string, offset: string | number | null): number;
	    addLabel(_name: string, offset: string | number | null): this;
	    setLabel(_name: string, offset: string | number | null): this;
	    eraseLabel(_name: string, offset: string | number | null): this;
	}

}
declare module 'test/TestAlign' {
	///   path="../gui.d.ts" />
	///   types="@vf.js/vf" />
	export default class TestAlign {
	    constructor(app: vf.Application, uiStage: vf.gui.Stage);
	    private onLoad;
	}

}
declare module 'test/TestApplication' {
	///   path="../gui.d.ts" />
	///   types="@vf.js/vf" />
	export default class TestApplication {
	    constructor(thisObj: any, callback: (app: vf.Application, uiStage: vf.gui.Stage) => void);
	}

}
declare module 'test/TestAudio' {
	///   path="../gui.d.ts" />
	///   types="@vf.js/vf" />
	export default class TestAudio {
	    constructor(app: vf.Application, uiStage: vf.gui.Stage);
	    private onLoad;
	}

}
declare module 'test/TestButton' {
	///   path="../gui.d.ts" />
	///   types="@vf.js/vf" />
	export default class TestButton {
	    constructor(app: vf.Application, uiStage: vf.gui.Stage);
	    private onLoad;
	    private onClick;
	    private onPress;
	    private onHover;
	}

}
declare module 'test/TestCheckBox' {
	///   path="../gui.d.ts" />
	///   types="@vf.js/vf" />
	export default class TestCheckBox {
	    constructor(app: vf.Application, uiStage: vf.gui.Stage);
	    private onLoad;
	    private getNewCheckBox;
	    private getNewRadio;
	    private onChange;
	}

}
declare module 'test/TestCircle' {
	///   path="../gui.d.ts" />
	///   types="@vf.js/vf" />
	export default class TestCircle {
	    constructor(app: vf.Application, uiStage: vf.gui.Stage);
	    private onLoad;
	    private onClick;
	}

}
declare module 'test/TestConnectLine' {
	///   path="../gui.d.ts" />
	///   types="@vf.js/vf" />
	export default class TestConnectLine {
	    constructor(app: vf.Application, uiStage: vf.gui.Stage);
	    private onLoad;
	    private getNewRect;
	    private getNewConnectLine;
	}

}
declare module 'test/TestContainer' {
	///   path="../gui.d.ts" />
	///   types="@vf.js/vf" />
	export default class TestContainer {
	    constructor(app: vf.Application, uiStage: vf.gui.Stage);
	    private onLoad;
	}

}
declare module 'test/TestDrag' {
	///   path="../gui.d.ts" />
	///   types="@vf.js/vf" />
	export default class TestDrag {
	    private id;
	    constructor(app: vf.Application, uiStage: vf.gui.Stage);
	    private onLoad;
	    private getNewContainer;
	}

}
declare module 'test/TestFollowLine' {
	///   path="../gui.d.ts" />
	///   types="@vf.js/vf" />
	export default class TestFollowLine {
	    constructor(app: vf.Application, uiStage: vf.gui.Stage);
	    private onLoad;
	}

}
declare module 'test/TestGridLayout' {
	///   path="../gui.d.ts" />
	///   types="@vf.js/vf" />
	export default class TestGridLayout {
	    constructor(app: vf.Application, uiStage: vf.gui.Stage);
	    private onLoad;
	    private addContent;
	}

}
declare module 'test/TestImage' {
	///   path="../gui.d.ts" />
	///   types="@vf.js/vf" />
	export default class TestImage {
	    constructor(app: vf.Application, uiStage: vf.gui.Stage);
	    private onLoad;
	}

}
declare module 'test/TestLabel' {
	///   path="../gui.d.ts" />
	///   types="@vf.js/vf" />
	export default class TestLabel {
	    constructor(app: vf.Application, uiStage: vf.gui.Stage);
	    private onLoad;
	    private getFontCssStyle;
	}

}
declare module 'test/TestMouseCursor' {
	///   path="../gui.d.ts" />
	///   types="@vf.js/vf" />
	export default class TestMouseCursor {
	    constructor(app: vf.Application, uiStage: vf.gui.Stage);
	    private onLoad;
	    private getContainer;
	}

}
declare module 'test/TestRect' {
	///   path="../gui.d.ts" />
	///   types="@vf.js/vf" />
	export default class TestRect {
	    constructor(app: vf.Application, uiStage: vf.gui.Stage);
	    private onLoad;
	    private onClick;
	}

}
declare module 'test/TestScrollBar' {
	///   path="../gui.d.ts" />
	///   types="@vf.js/vf" />
	export default class TestScrollBar {
	    constructor(app: vf.Application, uiStage: vf.gui.Stage);
	    private onLoad;
	    private getScrollingContainer;
	}

}
declare module 'test/TestScrollingContainer' {
	///   path="../gui.d.ts" />
	///   types="@vf.js/vf" />
	export default class TestScrollingContainer {
	    constructor(app: vf.Application, uiStage: vf.gui.Stage);
	    private onLoad;
	    private addSc;
	}

}
declare module 'test/TestSlider' {
	///   path="../gui.d.ts" />
	///   types="@vf.js/vf" />
	export default class TestSlider {
	    constructor(app: vf.Application, uiStage: vf.gui.Stage);
	    private onLoad;
	}

}
declare module 'test/TestSpriteAnimated' {
	///   path="../gui.d.ts" />
	///   types="@vf.js/vf" />
	export default class TestSpriteAnimated {
	    private onLoad;
	    constructor(app: vf.Application, uiStage: vf.gui.Stage);
	}
	/**
	 *
	 {"frames": {

	    "1_role2-sheet0.png":
	    {
	        "frame": {"x":254,"y":1,"w":255,"h":391},
	        "rotated": false,
	        "trimmed": true,
	        "spriteSourceSize": {"x":19,"y":3,"w":255,"h":391},
	        "sourceSize": {"w":274,"h":394},
	        "anchor": {"x":0.478102,"y":0.997462}
	    },
	    "1_role2-sheet1.png":
	    {
	        "frame": {"x":1,"y":1,"w":251,"h":394},
	        "rotated": false,
	        "trimmed": true,
	        "spriteSourceSize": {"x":0,"y":0,"w":251,"h":394},
	        "sourceSize": {"w":274,"h":394},
	        "anchor": {"x":0.485401,"y":0.997462}
	    },
	    "1_role2-sheet2.png":
	    {
	        "frame": {"x":511,"y":1,"w":251,"h":391},
	        "rotated": false,
	        "trimmed": true,
	        "spriteSourceSize": {"x":0,"y":3,"w":251,"h":391},
	        "sourceSize": {"w":274,"h":394},
	        "anchor": {"x":0.485401,"y":0.997462}
	    }},
	"animations": {
	    "0": ["1_role2-sheet0.png"],
	    "1": ["1_role2-sheet1.png","1_role2-sheet2.png"]
	},
	"meta": {
	    "app": "https://www.codeandweb.com/texturepacker",
	    "version": "1.0",
	    "image": "1_role2.png",
	    "format": "RGBA8888",
	    "size": {"w":763,"h":396},
	    "scale": "1",
	    "smartupdate": "$TexturePacker:SmartUpdate:8d0d27b919b4fda6822284d52e1d67cd:c415d34ddf0629ae063141aa6244f453:ad483e3d8905e1e227b0a04d222a3ac4$"
	}
	}

	 */ 

}
declare module 'test/TestSyncInteraction' {
	///   path="../gui.d.ts" />
	///   types="@vf.js/vf" />
	export default class TestSyncInteraction {
	    private id;
	    constructor(app: vf.Application, uiStage: vf.gui.Stage);
	    private onLoad;
	}

}
declare module 'test/TestTextInput' {
	///   path="../gui.d.ts" />
	///   types="@vf.js/vf" />
	export default class TestTextInput {
	    constructor(app: vf.Application, uiStage: vf.gui.Stage);
	    private onLoad;
	}

}
declare module 'test/TestTicker' {
	///   path="../gui.d.ts" />
	///   types="@vf.js/vf" />
	export default class TestTicker {
	    constructor(app: vf.Application, uiStage: vf.gui.Stage);
	    private onLoad;
	    private update;
	}

}
declare module 'test/TestTimeLine' {
	///   path="../gui.d.ts" />
	///   types="@vf.js/vf" />
	export default class TestTimeLine {
	    constructor(app: vf.Application, uiStage: vf.gui.Stage);
	    private onLoad;
	}

}
declare module 'test/TestTracing' {
	///   path="../gui.d.ts" />
	///   types="@vf.js/vf" />
	export default class TestTracing {
	    private tracing;
	    private tracing2;
	    constructor(app: vf.Application, uiStage: vf.gui.Stage);
	    private onLoad;
	    private getNewRadio;
	    private onChange;
	}

}
declare module 'test/TestTween' {
	///   path="../gui.d.ts" />
	///   types="@vf.js/vf" />
	export default class TestTween {
	    constructor(app: vf.Application, uiStage: vf.gui.Stage);
	    private onLoad;
	    protected createBiTree(node: Node, layer: number): void;
	} class Node {
	    constructor(parent?: Node, root?: vf.gui.Container);
	    div: any;
	    parent?: Node;
	    isLeft: boolean;
	    leftChild?: Node;
	    rightChild?: Node;
	}
	export {};

}
declare module 'test/TestTween2' {
	///   path="../gui.d.ts" />
	///   types="@vf.js/vf" />
	export default class TestTween2 {
	    constructor(app: vf.Application, uiStage: vf.gui.Stage);
	    private onLoad;
	}

}
declare module 'test/TestVideo' {
	///   path="../gui.d.ts" />
	///   types="@vf.js/vf" />
	export default class TestVideo {
	    constructor(app: vf.Application, uiStage: vf.gui.Stage);
	    private onLoad;
	    private createBtn;
	}

}
declare module 'test/index' {
	///   path="../gui.d.ts" />
	export {};

}

    declare namespace vf.gui{
        export * from "src/UI";
    }
    