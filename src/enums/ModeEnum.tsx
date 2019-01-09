/**
 * @disc:模式
 * @author:yanxinaliang
 * @time：2018/12/5 9:57
 */

/**
 * Master 可以操作所有
 * Assist 仅可以在当前画布上绘制，不能翻页、滚动、切换
 * ViewOnly 不能执行任何操作
 */
export enum ModeEnum {
    Master,
    Assist,
    ViewOnly
}