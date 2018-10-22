/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/27 14:46
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/7/27 14:46
 * @disc:fabric.Polygon 支持终点圆及检测
 */
import {fabric} from "fabric";
import {IPolylineOptions} from "~fabric/fabric-impl";
import {IObject} from '../interface/IObject';
import {IDefaultConfig} from '../interface/IConfig';
import {EBoardCanvas} from '../EBoardCanvas';
import {Context} from '../static/Context';

let _config:IDefaultConfig;
let _context:Context;

class Polygon extends fabric.Polyline implements IObject{
    public type:string="polygon";
    public id:string;
    
    /**
     * @override
     * @param points
     * @param {IPolylineOptions} options
     * @param eBoardCanvas
     */
    constructor(points: Array<{ x: number; y: number }>, options: IPolylineOptions,eBoardCanvas:EBoardCanvas){
        super(points,(_context=eBoardCanvas.context,_config=_context.getConfig() , Object.assign({
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

export {Polygon};