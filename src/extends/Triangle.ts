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
import {IDefaultConfig} from '../interface/IConfig';
import {EBoardCanvas} from '../EBoardCanvas';
import {Context} from '../static/Context';
import {IDGenerator} from '../utils/IDGenerator';

let _config:IDefaultConfig;
let _context:Context;

class Triangle extends fabric.Triangle implements IObject{
    public type="triangle";
    public id:string;
    constructor(options: ITriangleOptions,eBoardCanvas:EBoardCanvas){
        super((_context=eBoardCanvas.context,_config=_context.getConfig(), Object.assign({
            borderColor:_config.borderColor,
            cornerColor:_config.cornerColor,
            cornerStrokeColor:_config.cornerStrokeColor,
            cornerStyle:_config.cornerStyle,
            transparentCorners:_config.transparentCorners,
            cornerSize:_context.transform(_config.cornerSize),
            borderScaleFactor:_context.transform(_config.borderWidth)
        },options)));
        this.id=IDGenerator.getId();
    }
    public setId(id:string){
        this.id=id;
        return this;
    }
    
    /**
     * 更新
     * @param {ITriangleOptions} options
     */
    public update(options?: ITriangleOptions){
        this.set(options as any).setCoords();
        return this;
    }
}

export {Triangle};