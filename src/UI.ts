/** 工具类 */
import * as Utils from "./utils/Utils";
/** UI舞台，最顶级的层 展示所有UI组件 */
import { Stage } from "./core/Stage";
/** UI基础显示对象，一般不会直接使用，只作为类型推断 */
import { DisplayObject } from "./core/DisplayObject";
/** 心跳，需要在初始化完成后，启动心跳更新 */
import { TickerShared } from "./core/Ticker";
/** 滤镜的基础类 */
import { Filter } from './core/Filter';
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
import { Container } from "./display/Container";
/**
 * 滚动容器
 * 
 * @example let scrollingContainer = new vf.gui.ScrollingContainer();
 * 
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestRect
 */
import { ScrollingContainer } from "./display/ScrollingContainer";
/**
 * 图片
 * 
 * @example let image = new vf.gui.Image();
 * 
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestImage
 */
import { Image } from "./display/Image";
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
import { SpriteAnimated } from "./display/SpriteAnimated";
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
import { Label } from "./display/Label";
/**
 * 文本输入
 * 
 * @example let textInput = new vf.gui.TextInput(true|false);//单行或多行
 * 
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestTextInput
 */
import { TextInput } from "./display/TextInput";
/**
 * 滑动条/进度条
 * 
 * @example let slider = new vf.gui.Slider();
 * 
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestSlider
 */
import { Slider } from "./display/Slider";
/**
 * 按钮
 * 
 * @example let button = new vf.gui.Button();
 * 
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestButton
 */
import { Button } from "./display/Button";

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
import { CheckBox } from "./display/CheckBox";
/**
 * 绘制矩形或圆角矩形
 * 
 * @example let rect = new vf.gui.Rect();
 * 
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestRect
 */
import { Rect } from "./display/Rect";
/**
 * 绘制矩形或圆角矩形
 * 
 * @example let rect = new vf.gui.Circle();
 * 
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestCircle
 */
import { Circle } from "./display/Circle";
/**
 * 矢量绘制
 * 
 * @example let graphics = new vf.gui.Graphics();
 * 
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestTimeLine
 */
import { Graphics } from "./display/Graphics";
/**
 * 跟随划线（鼠标或触摸按下时）
 * 
 * @example let graphics = new vf.gui.FollowLine();
 * 
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestTimeLine
 */
import { FollowLine } from "./display/FollowLine";

import { Video } from "./display/Video";
/**
 * 连线组件
 * 
 * 
 * @example let connectLine = new vf.gui.ConnectLine();
 * 
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestConnectLine
 */
import { ConnectLine } from "./display/ConnectLine";
/**
 * 临摹组件
 *
 * @example let Tracing = new vf.gui.Tracing();
 *
 *
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestTracing
 */
import { Tracing } from "./display/Tracing";
/**
 * 滚动组件
 *
 * @example let scrollBar = new vf.gui.ScrollBar();
 *
 *
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/ScrollBar
 */
import { ScrollBar } from "./display/ScrollBar"
/**
 * 完整的缓动曲线列表
 * 
 * @example vf.gui.Easing.Linear.None;
 * 
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestTween
 */
import { Easing } from "./tween/Easing";
/**
 * 缓动动画
 * 
 * @example let tween = new vf.gui.Tween(myObject).to({width:'300px'}, 2000).start()
 * 
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestTween
 */
import { Tween } from "./tween/Tween";
/**
 * 基于帧的时间轴控制类
 * 
 * @example let timeline = new vf.gui.Timeline();
 * 
 * 
 * @link https://vipkid-edu.github.io/vf-gui/play/#example/TestTimeLine
 */
import { Timeline } from "./tween/Timeline";
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
import { Audio } from "./display/Audio";
/**
 * 事件绑定类，非继承于inputbase的组件是没有任何交互事件，需单独绑定
 */
import * as Interaction from "./interaction/Index";
/**
 * 事件名
 */
import * as Event from "./event/Index";

/**
 * 枚举
 */
import * as Enum from './enum/Index';

import { Scheduler } from './core/Scheduler';

export declare type Application = vf.Application;

/** 请不要在编写UI组件内部使用本类 */
export {
    Audio,Filter, Utils, Stage, Container, ScrollingContainer, Slider,
    Label, TextInput, Button,Video, CheckBox, Rect, Circle, Graphics, FollowLine, Tracing, ConnectLine, ScrollBar, Interaction,
    DisplayObject, TickerShared, Tween, Timeline, Easing, Image, SpriteAnimated, Event, Enum, Scheduler
};