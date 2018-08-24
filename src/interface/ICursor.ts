/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/8 9:35
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/8/8 9:35
 * @disc:CursorTypesInterface
 */

import {fabric} from "fabric";

export declare interface ICursor{
    render(center:{x:number;y:number},size:number):fabric.Object;
}