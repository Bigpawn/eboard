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
class Polygon extends fabric.Polyline{
    public type:string="polygon";
    public id:string;
    private options?:IPolylineOptions;
    /**
     * @override
     * @param points
     * @param {IPolylineOptions} options
     */
    constructor(points: Array<{ x: number; y: number }>, options?: IPolylineOptions){
        super(points,options);
        this.options=options;
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
    
    public replace(points:fabric.Point[],eBoardCanvas:EBoardCanvas,options?: IPolylineOptions){
        eBoardCanvas.renderOnAddRemove=false;
        eBoardCanvas.remove(this);
        const replace = new Polygon(points,options).setId(this.id);
        eBoardCanvas.add(replace);
        eBoardCanvas.renderOnAddRemove=true;
        return replace;
    }
}

export {Polygon};