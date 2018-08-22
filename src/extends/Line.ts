/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/27 13:56
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/7/27 13:56
 * @disc:fabric.Line
 */
import {fabric} from "fabric";
import {IObjectOptions} from '~fabric/fabric-impl';
import {IObject} from '../interface/IObject';
import {IDefaultConfig} from '../interface/IConfig';
import {EDux} from '../utils/EDux';
import {EBoardCanvas} from '../EBoardCanvas';


let _config:IDefaultConfig;
let _eDux:EDux;

class Line extends fabric.Line implements IObject{
    public type:string="line";
    public id:string;
    
    /**
     *
     * @param {number[]} points
     * @param {IObjectOptions} options
     * @param eBoardCanvas
     */
    constructor(points: number[], options: IObjectOptions,eBoardCanvas:EBoardCanvas){
        super(points,(_eDux=eBoardCanvas.eDux,_config=_eDux.config , Object.assign({
            borderColor:_config.borderColor,
            cornerColor:_config.cornerColor,
            cornerStrokeColor:_config.cornerStrokeColor,
            cornerStyle:_config.cornerStyle,
            transparentCorners:_config.transparentCorners,
            cornerSize:_eDux.transform(_config.cornerSize),
            borderScaleFactor:_eDux.transform(_config.borderWidth)
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

export {Line};