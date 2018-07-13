/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/12 16:58
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/12 16:58
 * @disc:plugins export
 */

import {Line} from './shape/2D/line/Line';
import {HTML} from './tool/html/HTML';
import {Cursor} from './tool/cursor/Cursor';
import {Selection} from './tool/selection/Selection';
import {Text} from './shape/2D/text/Text';
import {Pencil} from './shape/2D/pencil/Pencil';
import {Circle} from './shape/2D/circle/Circle';
import {Ellipse} from './shape/2D/ellipse/Ellipse';
import {Rectangle} from './shape/2D/rectangle/Rectangle';
import {Square} from './shape/2D/square/Square';
import {Triangle} from './shape/2D/triangle/Triangle';

export {Line,Text,Cursor,HTML,Selection,Pencil,Circle,Ellipse,Rectangle,Square,Triangle};
export type IPlugins =Line| Text | Cursor | HTML | Selection | Pencil | Circle | Ellipse | Rectangle | Square | Triangle;
export enum Plugins{
    Cursor='Cursor',// 画笔
    Line='Line', // 直线
    Text='Text',// 文字输入
    Selection='Selection',// 选择
    HTML='HTML', // HTML操作插件
    Pencil='Pencil',// 铅笔操作
    Circle='Circle',
    Ellipse='Ellipse',
    Rectangle='Rectangle',
    Square='Square',
    Triangle="Triangle"
}