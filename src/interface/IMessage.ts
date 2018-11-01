/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/22 14:07
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/8/22 14:07
 * @disc:IMessage
 */

import {IFrameOptions} from './IFrame';
import {MessageTag} from '../enums/MessageTag';
import {CursorType} from '../enums/CursorType';
import {IObject} from './IObject';


export declare interface IMessage{
    tag:MessageTag;
    messageId?:number;
    id:string;
    frame?:IFrameOptions,// frame 创建属性
    frameGroup?:IFrameOptions// frame组创建属性
}




export declare interface ICursorMessage extends IMessage{
    center?:{x:number;y:number};
    type:CursorType;
    size:number;
}

export declare interface IArrowMessage extends IMessage{
    left:number;
    top:number;
    path:string|any[];
    fill:string;
    stroke:string;
    strokeDashArray:number[];
    strokeWidth:number;
}

export declare interface ICircleMessage extends IMessage{
    left:number;
    top:number;
    radius:number;
    stroke:string;
    fill:string;
    strokeDashArray:number[];
    strokeWidth:number;
}

export declare interface IEllipseMessage extends IMessage{
    left:number;
    top:number;
    rx:number;
    ry:number;
    fill:string;
    stroke:string;
    strokeDashArray:number[];
    strokeWidth:number;
}

export declare interface ILineMessage extends IMessage{
    start:{x:number;y:number};
    end:{x:number;y:number};
    stroke:string;
    strokeDashArray:number[];
    strokeWidth:number;
}

export declare interface IPencilMessage extends IMessage{
    path:string;
    stroke:string;
    strokeDashArray:number[];
    strokeWidth:number;
}

export declare interface IHexagonMessage extends IMessage{
    points:any[];
    stroke:string;
    fill:string;
    strokeDashArray:number[];
    strokeWidth:number;
}

export declare interface IPentagonMessage extends IMessage{
    points:any[];
    stroke:string;
    fill:string;
    strokeDashArray:number[];
    strokeWidth:number;
}

export declare interface IPolygonMessage extends IMessage{
    points:any[];
    stroke:string;
    fill:string;
    strokeDashArray:number[];
    strokeWidth:number;
}

export declare interface IStarMessage extends IMessage{
    points:any[];
    stroke:string;
    fill:string;
    strokeDashArray:number[];
    strokeWidth:number;
}

export declare interface IRectangleMessage extends IMessage{
    left:number;
    top:number;
    width:number;
    height:number;
    fill:string;
    stroke:string;
    strokeWidth:number;
    strokeDashArray:number[];
}

export declare interface ISquareMessage extends IMessage{
    left:number;
    top:number;
    length:number;
    angle:number;
    fill:string;
    stroke:string;
    strokeDashArray:number[];
    strokeWidth:number;
}

export declare interface ITextMessage extends IMessage{
    text:string;
    fill:string;
    fontSize:number;
    left:number;
    top:number;
}

export declare interface IEquilateralTriangleMessage extends IMessage{
    points:any[];
    fill:string;
    stroke:string;
    strokeDashArray:number[];
    strokeWidth:number;
}

export declare interface IOrthogonalTriangleMessage extends IMessage{
    points:any[];
    stroke:string;
    fill:string;
    strokeDashArray:number[];
    strokeWidth:number;
}

export declare interface ITriangleMessage extends IMessage{
    left:number;
    top:number;
    width:number;
    height:number;
    flipX:boolean;
    flipY:boolean;
    stroke:string;
    fill:string;
    strokeDashArray:number[];
    strokeWidth:number;
}

export declare interface IDeleteMessage extends IMessage{
    ids:string[];
}

export declare interface ISelectionMessage extends IMessage{
    ids:string[];
    transform:{
        left:number;
        top:number;
        width:number;
        height:number;
        angle:number;
        originX:string;
        originY:string;
        flipX:boolean;
        flipY:boolean;
        objects:Array<{flipX:boolean;flipY:boolean;angle:number}>;
    };
    objects?:IObject[];
}

export declare interface IScrollBarMessage extends IMessage{
    scrollTop:number;
    scrollLeft:number;
    totalHeight:number;
    totalWidth:number;
}