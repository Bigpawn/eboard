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
import {EBoardCanvas} from '../EBoardCanvas';
import {IDGenerator} from '../utils/IDGenerator';
import {filterParams} from '../utils/decorators';


class OrthogonalTriangle extends fabric.Polygon implements IObject{

    public id:string;
    constructor(points: Array<{ x: number; y: number }>, options: IObjectOptions,eBoardCanvas:EBoardCanvas){
        super(points,filterParams(options,eBoardCanvas));
        this.id=IDGenerator.getId();
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