/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/30 9:20
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/30 9:20
 * @disc:fabric.Triangle
 */
import {fabric} from "fabric";
import {ITriangleOptions} from '~fabric/fabric-impl';
import {IObject} from '../interface/IObject';
import {EBoardCanvas} from '../EBoardCanvas';
import {IDGenerator} from '../utils/IDGenerator';
import {filterParams} from '../utils/decorators';


class Triangle extends fabric.Triangle implements IObject{
    public type="triangle";
    public id:string;
    constructor(options: ITriangleOptions,eBoardCanvas:EBoardCanvas){
        super(filterParams(options,eBoardCanvas));
        this.id=IDGenerator.getId();
    }
    public setId(id:string){
        this.id=id;
        return this;
    }
}

export {Triangle};