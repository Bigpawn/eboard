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
import {IDefaultConfig} from '../interface/IConfig';
import {EBoardCanvas} from '../EBoardCanvas';
import {Context} from '../static/Context';

let _config:IDefaultConfig;
let _context:Context;

class Text extends fabric.IText implements IObject{
    public type:string="text";
    public id:string;
    constructor(text: string, options: IITextOptions,eBoardCanvas:EBoardCanvas){
        super(text,(_context=eBoardCanvas.context,_config=_context.getConfig(), Object.assign({
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
    public update(options?: IITextOptions){
        this.set(options as any).setCoords();
        return this;
    }
}

export {Text};