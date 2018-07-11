/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/10 11:39
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/10 11:39
 * @disc:Plugin抽象类
 */

import {EBoardCanvas} from './EBoardCanvas';
import {EBoardEngine} from './EBoardEngine';
abstract class AbsPlugin {
    protected eBoardCanvas:EBoardCanvas;
    protected eBoardEngine:EBoardEngine;
    constructor(canvas:EBoardCanvas,eBoardEngine:EBoardEngine){
        this.eBoardCanvas=canvas;
        this.eBoardEngine=eBoardEngine;
    }
    public abstract setEnable(enable:boolean):void;
}

export enum Plugins{
    Cursor="Cursor",// 画笔
    Line="Line", // 直线
    Text="Text",//文字输入
}


export {AbsPlugin};