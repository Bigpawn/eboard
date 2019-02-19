/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/12 16:58
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/12 16:58
 * @disc:plugins export
 */

import {Line} from './shape/2D/line/Line';
import {HTML} from './tool/html/HTML';
import {Selection} from './tool/selection/Selection';
import {Text} from './shape/2D/text/Text';
import {Pencil} from './shape/2D/pencil/Pencil';
import {Circle} from './shape/2D/circle/Circle';
import {Ellipse} from './shape/2D/ellipse/Ellipse';
import {Rectangle} from './shape/2D/quadrangle/Rectangle';
import {Square} from './shape/2D/quadrangle/Square';
import {Triangle} from './shape/2D/triangle/Triangle';
import {EquilateralTriangle} from './shape/2D/triangle/EquilateralTriangle';
import {OrthogonalTriangle} from './shape/2D/triangle/OrthogonalTriangle';
import {Polygon} from './shape/2D/polygon/Polygon';
import {Star} from './shape/2D/polygon/Star';
import {Pentagon} from './shape/2D/polygon/Pentagon';
import {Hexagon} from './shape/2D/polygon/Hexagon';
import {Clear} from './tool/clear/Clear';
import {Arrow} from './shape/2D/arrow/Arrow';
import {ArrowNext} from './shape/2D/arrow/ArrowNext';
import {ArrowPrev} from './shape/2D/arrow/ArrowPrev';
import {Delete} from './tool/del/Delete';
import {Ferule} from './shape/2D/ferule/Ferule';
import {DotLine} from './shape/2D/line/DotLine';
import {UndoRedo} from './tool/undoredo/UndoRedo';

export {Line,DotLine,Text,HTML,Selection,Pencil,Circle,Ellipse,Rectangle,Square,Triangle,EquilateralTriangle,OrthogonalTriangle,Polygon,Star,Pentagon,Hexagon,Clear,Arrow,ArrowNext,ArrowPrev,Delete,Ferule,UndoRedo};
export type IPlugins =Line| DotLine|Text | HTML | Selection | Pencil | Circle | Ellipse | Rectangle | Square | Triangle | EquilateralTriangle | OrthogonalTriangle | Polygon | Star | Pentagon | Hexagon | Clear | Arrow | ArrowNext | ArrowPrev | Delete | Ferule | UndoRedo;
export enum Plugins{
    Line='Line', // 直线
    DotLine='DotLine',
    Text='Text',// 文字输入
    Selection='Selection',// 选择
    HTML='HTML', // HTML操作插件
    Pencil='Pencil',// 铅笔操作
    Circle='Circle',
    Ellipse='Ellipse',
    Rectangle='Rectangle',
    Square='Square',
    Triangle='Triangle',
    EquilateralTriangle='EquilateralTriangle',
    OrthogonalTriangle='OrthogonalTriangle',
    Polygon='Polygon',
    Star='Star',
    Pentagon='Pentagon',
    Hexagon='Hexagon',
    Clear='Clear',
    Arrow='Arrow',
    ArrowNext='ArrowNext',
    ArrowPrev = 'ArrowPrev',
    Delete = 'Delete',
    Ferule='Ferule'
}