/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/27 17:44
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/27 17:44
 * @disc:fabric.Rectangle
 */
import {fabric} from "fabric";
import {IRectOptions} from '~fabric/fabric-impl';
import {IObject} from '../interface/IObject';
import {EBoardCanvas} from '../EBoardCanvas';
import {IDGenerator} from '../utils/IDGenerator';
import {filterParams} from '../utils/decorators';


class Rectangle extends fabric.Rect implements IObject{
  
    public id:string;
    constructor(options: IRectOptions,eBoardCanvas:EBoardCanvas){
        super(filterParams(options,eBoardCanvas));
        this.id=IDGenerator.getId();
    }
    public setId(id:string){
        this.id=id;
        return this;
    }
}

export {Rectangle};