/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/27 14:46
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/7/27 14:46
 * @disc:fabric.Polygon 支持终点圆及检测
 */
import {fabric} from "fabric";
import {IPolylineOptions} from "~fabric/fabric-impl";
import {EBoardCanvas} from '../EBoardCanvas';
import {IObject} from '../interface/IObject';
class Polygon extends fabric.Polyline implements IObject{
    public type:string="polygon";
    public id:string;
    /**
     * @override
     * @param points
     * @param {IPolylineOptions} options
     */
    constructor(points: Array<{ x: number; y: number }>, options?: IPolylineOptions){
        super(points,options);
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
    
    /**
     * 调用会卡顿，通过重新创建来修改属性
     * @param {"~fabric/fabric-impl".IPolylineOptions} options
     * @returns {this}
     */
    public update(options:IPolylineOptions){
        this.set(options as any).setCoords();
        return this;
    }
}

export {Polygon};