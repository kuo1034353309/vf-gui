import { Tween } from "../Tween";
import { TickerShared } from "../../core/Ticker";

/**
 * 缓动列表
 * @private
 */
const _tweens: Tween[] = [];
/**
 * 是否运行中
 */
let isStarted = false;
/**
 * 空帧标识
 */
let emptyFrame = 0;
/**
 * 空帧后最大间隔帧率
 */
let powerModeThrottle = 120;
/**
 * 是否开启卡针后平滑处理
 */
let handleLag = true;

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
export const Plugins: any = {};

/**
 * 添加对象到缓动列表
 * @param {Tween} tween Tween 实例
 * @memberof vf.gui.tween
 * @example
 * let tween = new vf.gui.tween.Tween({x:0})
 * tween.to({x:200}, 1000)
 * vf.gui.tween.add(tween)
 */
export function add(tween: Tween) {
    const i = _tweens.indexOf(tween);

    if (i > -1) {
        _tweens.splice(i, 1);
    }

    _tweens.push(tween);

    emptyFrame = 0;

    isStarted = true;
}

/**
 * 没有缓动后，设置运行多少帧后，停止
 * @param {number} frameCount=120 删除所有动画后，要运行的剩余帧
 * @memberof vf.gui.tween
 * @example
 * vf.gui.tween.FrameThrottle(60)
 */
export function FrameThrottle(frameCount = 120) {
    powerModeThrottle = frameCount * 1.05;
}

/**
 * 延时处理，针对插件、canvas、dom
 * @param {number} state=true 是否平滑处理
 * @memberof vf.gui.tween
 * @example
 * vf.gui.tween.ToggleLagSmoothing(false)
 */
export function ToggleLagSmoothing(_state = true) {
    handleLag = _state;
}

/**
 * 获得所有缓动对象
 * @memberof vf.gui.tween
 * vf.gui.tween.getAll() 
 */
export function getAll() {
    return _tweens;
}

/**
 * 移除所有动画对象
 * @example  vf.gui.tween.removeAll()
 * @memberof vf.gui.tween
 */
export function removeAll() {
    _tweens.length = 0;
    isStarted = false;
}

/**
 * 获取对象
 * @param {Tween} tween 缓动对象实例 
 * @return {Tween} 返回对象或null
 * @memberof vf.gui.tween
 * @example
 * vf.gui.tween.get(tween)
 */
export function get(tween: Tween) {
    for (let i = 0; i < _tweens.length; i++) {
        if (tween === _tweens[i]) {
            return _tweens[i];
        }
    }
    return null;
}

/**
 * 从缓动列表移除对象
 * @param {Tween} tween Tween instance
 * @memberof vf.gui.tween
 * @example
 * vf.gui.tween.remove(tween)
 */
export function remove(tween: Tween) {
    const i = _tweens.indexOf(tween)
    if (i !== -1) {
        _tweens.splice(i, 1)
    }
    if (_tweens.length === 0) {
        isStarted = false;
    }
}


export function removeDisplay(uuid: string) {
    for (let i = 0; i < _tweens.length; i++) {
        if (_tweens[i].object.uuid && uuid === _tweens[i].object.uuid) {
            _tweens[i].stop();
            remove(_tweens[i]);
            return;
        }
    }
    return;
}

/**
 * 按给定时间更新缓动
 * @param {number=} time 时间戳
 * @param {Boolean=} preserve 完成后，防止删除动画对象
 * @memberof vf.gui.tween
 * @example
 * vf.gui.tween.update(500)
 */

export function update(deltaTime: number) {
    if (!isStarted) {
        return false;
    }
    if (emptyFrame >= powerModeThrottle && handleLag) {
        console.log("mptyFrame >= powerModeThrottle && handleLag");
        isStarted = false;
        emptyFrame = 0;
        return false;
    }

    if (!_tweens.length) {
        emptyFrame++;
    }

    let i = 0;
    let length = _tweens.length;
    while (i < length) {
        _tweens[i++].update(TickerShared.deltaMS, false);

        if (length > _tweens.length) {
            // The tween has been removed, keep same index
            i--;
        }

        length = _tweens.length;
    }
    return true;
}

/**
 * 是否正在运行中
 * @return {Boolean} 只要还有缓动在运行，返回true
 * @memberof vf.gui.tween
 * @example vf.gui.tween.isRunning()
 */
export function isRunning() {
    return isStarted;
}

/**
 * 返回是否开启延迟平滑状态
 * @return {Boolean} 
 * @memberof vf.gui.tween
 * @example vf.gui.tween.isRunning()
 */
export function isLagSmoothing() {
    return handleLag;
}