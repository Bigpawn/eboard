/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/27 13:35
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/27 13:35
 * @disc:fabric 扩展Circle
 */
import {fabric} from "fabric";
import {ICircleOptions} from "~fabric/fabric-impl";
import {IObject} from '../interface/IObject';
import {EBoardCanvas} from '../EBoardCanvas';
import {IDGenerator} from '../utils/IDGenerator';
import {filterParams} from '../utils/decorators';


class Circle extends fabric.Circle implements IObject{
    public id:string;
    constructor(options: ICircleOptions,eBoardCanvas:EBoardCanvas){
        super(filterParams(options,eBoardCanvas));
        this.id=IDGenerator.getId();
    }
    public setId(id:string){
        this.id=id;
        return this;
    }
}

export {Circle};