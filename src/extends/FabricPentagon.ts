/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/16 17:45
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/16 17:45
 * @disc:五边形
 */
import {fabric} from "fabric";
import {IObjectOptions} from "~fabric/fabric-impl";


class FabricPentagon extends fabric.Polygon{
    public type:string="pentagon";
    public static sin18:number=Math.abs(Math.sin(18/180 * Math.PI));
    public static cos18:number=Math.abs(Math.cos(18/180 * Math.PI));
    public static sin54:number=Math.abs(Math.sin(54/180 * Math.PI));
    public static cos54:number=Math.abs(Math.cos(54/180 * Math.PI));
    /**
     * 计算五边形各定点坐标
     * @param {{x: number; y: number}} center
     * @param {number} radius
     * @returns {"~fabric/fabric-impl".Point[]}
     */
    private static calcPointsByRadius(center:{x: number; y: number},radius:number){
        let points:fabric.Point[]=[];
        points.push(new fabric.Point(center.x,center.y - radius));
        points.push(new fabric.Point(center.x + radius*this.cos18,center.y - radius*this.sin18));
        points.push(new fabric.Point(center.x + radius*this.cos54,center.y + radius*this.sin54));
        points.push(new fabric.Point(center.x - radius*this.cos54,center.y + radius*this.sin54));
        points.push(new fabric.Point(center.x - radius*this.cos18,center.y - radius*this.sin18));
        return points;
    }
    
    /**
     * @override
     * 根据半径动态计算各点坐标
     * @param {{x: number; y: number}} center
     * @param {number} radius
     * @param {"~fabric/fabric-impl".IObjectOptions} options
     * @param {boolean} skipOffset
     */
    constructor(center:{x: number; y: number},radius:number,options?: IObjectOptions, skipOffset?: boolean){
        super(FabricPentagon.calcPointsByRadius(center,radius),options,skipOffset);
    }
}

export {FabricPentagon};