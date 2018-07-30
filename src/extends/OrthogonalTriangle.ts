/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/30 9:13
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/30 9:13
 * @disc:fabric.OrthogonalTriangle
 */
import {fabric} from "fabric";
import {IObjectOptions, IPolygonOptions} from '~fabric/fabric-impl';



export declare interface IExtendPolygonOptions extends IPolygonOptions{
    pathOffset?:{x:number;y:number}
}


class OrthogonalTriangle extends fabric.Polygon{
    public pathOffset:{x:number;y:number};
    public type:string="orthogonal-triangle";
    public id:string;
    constructor(points: Array<{ x: number; y: number }>, options?: IObjectOptions, skipOffset?: boolean){
        super(points,options,skipOffset);
        this.id=Date.now().toString();
    }
    public setId(id:string){
        this.id=id;
        return this;
    }
    
    /**
     * 更新
     * @param {IExtendPolygonOptions} options
     */
    public update(options?: IExtendPolygonOptions){
        this.set(options as any).setCoords();
        return this;
    }
    
    
    public static calcPointsByCursorPoint(center:{x:number;y:number},point:{x:number;y:number}){
        return [
            new fabric.Point(center.x,center.y),
            new fabric.Point(point.x,point.y),
            new fabric.Point(center.x,point.y),
        ]
    }
}

export {OrthogonalTriangle};