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
import {IDefaultConfig} from '../interface/IConfig';
import {Context} from '../static/Context';


let _config:IDefaultConfig;
let _context:Context;

class Arrow extends fabric.Path implements IObject{
    public type:string="arrow";
    public id:string;
    
    /**
     * 对象生成id
     * @param {string | any[]} path
     * @param {IPathOptions} options
     * @param eBoardCanvas
     */
    constructor(path: string | any[], options: IPathOptions,eBoardCanvas:EBoardCanvas){
        super(path,(_context=eBoardCanvas.context,_config=_context.getConfig(),Object.assign({
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
    
    /**
     * 修改id
     * @param {string} id
     * @returns {this}
     */
    public setId(id:string){
        this.id=id;
        return this;
    }
}

export {Arrow};