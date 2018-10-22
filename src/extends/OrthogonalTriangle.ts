/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/30 9:13
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/30 9:13
 * @disc:fabric.OrthogonalTriangle
 */
import {fabric} from "fabric";
import {IObjectOptions} from '~fabric/fabric-impl';
import {IObject} from '../interface/IObject';
import {IDefaultConfig} from '../interface/IConfig';
import {EBoardCanvas} from '../EBoardCanvas';
import {Context} from '../static/Context';

let _config:IDefaultConfig;
let _context:Context;


class OrthogonalTriangle extends fabric.Polygon implements IObject{
    public type:string="orthogonal-triangle";
    public id:string;
    constructor(points: Array<{ x: number; y: number }>, options: IObjectOptions,eBoardCanvas:EBoardCanvas){
        super(points,(_context=eBoardCanvas.context,_config=_context.getConfig(), Object.assign({
            borderColor:_config.borderColor,
            cornerColor:_config.cornerColor,
            cornerStrokeColor:_config.cornerStrokeColor,
            cornerStyle:_config.cornerStyle,
            transparentCorners:_config.transparentCorners,
            cornerSize:_context.transform(_config.cornerSize),
            borderScaleFactor:_context.transform(_config.borderWidth)
        },options)));
        this.id=Date.now().toString();
    }
    public setId(id:string){
        this.id=id;
        return this;
    }
    
    public static calcPointsByCursorPoint(center:{x:number;y:number},point:{x:number;y:number}){
        return [
            new fabric.Point(center.x,center.y),
            new fabric.Point(point.x,point.y),
            new fabric.Point(center.x,point.y),
        ]
    }
}

export {OrthogonalTriangle};