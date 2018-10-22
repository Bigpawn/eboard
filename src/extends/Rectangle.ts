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
import {IDefaultConfig} from '../interface/IConfig';
import {EBoardCanvas} from '../EBoardCanvas';
import {Context} from '../static/Context';

let _config:IDefaultConfig;
let _context:Context;

class Rectangle extends fabric.Rect implements IObject{
    public type:string="rectangle";
    public id:string;
    constructor(options: IRectOptions,eBoardCanvas:EBoardCanvas){
        super((_context=eBoardCanvas.context,_config=_context.getConfig(),Object.assign({
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
}

export {Rectangle};