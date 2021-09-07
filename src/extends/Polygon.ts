/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/27 14:46
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/7/27 14:46
 * @disc:fabric.Polygon 支持终点圆及检测
 */
import {fabric} from "fabric";
import {IPolylineOptions} from "~fabric/fabric-impl";
import {IObject} from '../interface/IObject';
import {EBoardCanvas} from '../EBoardCanvas';
import {IDGenerator} from '../utils/IDGenerator';
import {filterParams} from '../utils/decorators';

class Polygon extends fabric.Polyline implements IObject{

    public id:string;
    constructor(points: Array<{ x: number; y: number }>, options: IPolylineOptions,eBoardCanvas:EBoardCanvas){
        super(points,filterParams(options,eBoardCanvas));
        this.id=IDGenerator.getId();
    }
    public setId(id:string){
        this.id=id;
        return this;
    }
}

export {Polygon};