/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/3 9:07
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/8/3 9:07
 * @disc:fabric.Text
 */
import {fabric} from "fabric";
import {IITextOptions} from '~fabric/fabric-impl';
import {IObject} from '../interface/IObject';
import {EBoardCanvas} from '../EBoardCanvas';
import {IDGenerator} from '../utils/IDGenerator';
import {filterParams} from '../utils/decorators';


class Text extends fabric.IText implements IObject{

    public id:string;
    constructor(text: string, options: IITextOptions,eBoardCanvas:EBoardCanvas){
        super(text,filterParams(options,eBoardCanvas));
        this.id=IDGenerator.getId();
    }
    public setId(id:string){
        this.id=id;
        return this;
    }
    public update(options?: IITextOptions){
        this.set(options as any).setCoords();
        return this;
    }
}

export {Text};