export const enum Operate{
    Add, //添加
    Clear,  //清除
    Remove  //移除
}

export const enum Mode{
    Check,   //检查模式，判断轨迹是否正确
    Teach,   //教学模式，一笔一划教学
    Auto,     //自动播放
    Strict   //严格模式，需要严格按每个笔画的顺序书写，否则不会被书写。该笔画书写错误时会被清除
}

export const enum Result{
    Uncomplete,   //未完成
    Correct,      //正确
    Incorrect,     //不正确
    Complete      //audo或teach模式完成
}