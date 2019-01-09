/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/27 9:15
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/7/27 9:15
 * @disc:箭头
 */
import {fabric} from "fabric";
import {IPathOptions} from '~fabric/fabric-impl';
import {IObject} from '../interface/IObject';
import {EBoardCanvas} from '../EBoardCanvas';
import {IDGenerator} from '../utils/IDGenerator';
import {filterParams} from '../utils/decorators';

class Arrow extends fabric.Path implements IObject{
    public readonly type:string="arrow";
    public id:string;
    constructor(path: string | any[], options: IPathOptions,eBoardCanvas:EBoardCanvas){
        super(path,filterParams(options,eBoardCanvas));
        this.id=IDGenerator.getId();
    }
    public setId(id:string){
        this.id=id;
        return this;
    }
}

export {Arrow};