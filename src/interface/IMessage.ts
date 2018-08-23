/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/22 14:07
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/8/22 14:07
 * @disc:IMessage
 */

import {CursorTypeEnum} from '../cursor/Enum';
import {IMessage} from '../middlewares/MessageMiddleWare';
import {ArrowMode} from '../plugins/shape/2D/arrow/Arrow';

export declare interface ICursorMessage extends IMessage{
    center?:{x:number;y:number};
    type:CursorTypeEnum;
    size:number;
}

export declare interface IArrowMessage extends IMessage{
    start:{x:number;y:number};
    end:{x:number;y:number};
    mode:ArrowMode;
    fill:string;
    stroke:string;
    strokeDashArray:number[]
}

export declare interface ICircleMessage extends IMessage{
    start:{x:number;y:number};
    radius:number;
    stroke:string;
    fill:string;
    strokeDashArray:number[]
}

export declare interface IEllipseMessage extends IMessage{
    start:{x:number;y:number};
    rx:number;
    ry:number;
    fill:string;
    stroke:string;
    strokeDashArray:number[]
}

export declare interface ILineMessage extends IMessage{
    start:{x:number;y:number};
    end:{x:number;y:number};
    stroke:string;
    strokeDashArray:number[]
}

export declare interface IPencilMessage extends IMessage{
    path:string;
    stroke:string;
    strokeDashArray:number[]
}

export declare interface IHexagonMessage extends IMessage{
    points:any[];
    stroke:string;
    fill:string;
    strokeDashArray:number[]
}

export declare interface IPentagonMessage extends IMessage{
    points:any[];
    stroke:string;
    fill:string;
    strokeDashArray:number[]
}

export declare interface IPolygonMessage extends IMessage{
    points:any[];
    stroke:string;
    fill:string;
    strokeDashArray:number[]
}

export declare interface IStarMessage extends IMessage{
    points:any[];
    stroke:string;
    fill:string;
    strokeDashArray:number[]
}

export declare interface IRectangleMessage extends IMessage{
    start:{x:number;y:number};
    width:number;
    height:number;
    fill:string;
    stroke:string;
    strokeDashArray:number[]
}

export declare interface ISquareMessage extends IMessage{
    start:{x:number;y:number};
    length:number;
    angle:number;
    fill:string;
    stroke:string;
    strokeDashArray:number[]
}

export declare interface ITextMessage extends IMessage{
    text:string;
    start:{x:number;y:number};
    fill:string;
    fontSize:number;
}

export declare interface IEquilateralTriangleMessage extends IMessage{
    points:any[];
    fill:string;
    stroke:string;
    strokeDashArray:number[]
}

export declare interface IOrthogonalTriangleMessage extends IMessage{
    points:any[];
    stroke:string;
    fill:string;
    strokeDashArray:number[]
}

export declare interface ITriangleMessage extends IMessage{
    start:{x:number;y:number};
    width:number;
    height:number;
    flipX:boolean;
    flipY:boolean;
    stroke:string;
    fill:string;
    strokeDashArray:number[]
}