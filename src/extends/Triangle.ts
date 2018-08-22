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
import {EDux} from '../utils/EDux';
import {EBoardCanvas} from '../EBoardCanvas';

let _config:IDefaultConfig;
let _eDux:EDux;

class Triangle extends fabric.Triangle implements IObject{
    public type="triangle";
    public id:string;
    constructor(options: ITriangleOptions,eBoardCanvas:EBoardCanvas){
        super((_eDux=eBoardCanvas.eDux,_config=_eDux.config , Object.assign({
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