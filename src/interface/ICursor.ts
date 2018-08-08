/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/7 17:00
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/8/7 17:00
 * @disc:Cursor
 */

import {fabric} from "fabric";

export declare interface ICursor{
    renderCursor(center:{x:number;y:number}):fabric.Object;
    onMouseMove(event:MouseEvent):void;
    destroy():void;
}