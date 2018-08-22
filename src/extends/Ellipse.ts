/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/27 13:47
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/27 13:47
 * @disc:fabric.Ellipse
 */
import {fabric} from "fabric";
import {IEllipseOptions} from "~fabric/fabric-impl";
import {IObject} from '../interface/IObject';
import {IDefaultConfig} from '../interface/IConfig';
import {EDux} from '../utils/EDux';
import {EBoardCanvas} from '../EBoardCanvas';


let _config:IDefaultConfig;
let _eDux:EDux;


class Ellipse extends fabric.Ellipse implements IObject{
    public type:string="ellipse";
    public id:string;
    
    /**
     * 对象生成id
     * @param {IEllipseOptions} options
     * @param eBoardCanvas
     */
    constructor(options: IEllipseOptions,eBoardCanvas:EBoardCanvas){
        super((_eDux=eBoardCanvas.eDux,_config=_eDux.config,Object.assign({
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

export {Ellipse};