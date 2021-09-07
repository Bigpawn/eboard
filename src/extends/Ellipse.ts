/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/27 13:47
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/27 13:47
 * @disc:fabric.Ellipse
 */
import {fabric} from "fabric";
import {IEllipseOptions} from "~fabric/fabric-impl";
import {IObject} from '../interface/IObject';
import {EBoardCanvas} from '../EBoardCanvas';
import {IDGenerator} from '../utils/IDGenerator';
import {filterParams} from '../utils/decorators';


class Ellipse extends fabric.Ellipse implements IObject{
    public id:string;
    constructor(options: IEllipseOptions,eBoardCanvas:EBoardCanvas){
        super(filterParams(options,eBoardCanvas));
        this.id=IDGenerator.getId();
    }
    public setId(id:string){
        this.id=id;
        return this;
    }
}

export {Ellipse};