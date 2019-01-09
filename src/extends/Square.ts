/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/27 17:56
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/27 17:56
 * @disc:fabric.Square
 */
import {fabric} from "fabric";
import {IRectOptions} from "~fabric/fabric-impl";
import {IObject} from '../interface/IObject';
import {EBoardCanvas} from '../EBoardCanvas';
import {IDGenerator} from '../utils/IDGenerator';
import {filterParams} from '../utils/decorators';


class Square extends fabric.Rect implements IObject{
    public type:string="square";
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

export {Square};