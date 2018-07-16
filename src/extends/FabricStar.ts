/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/16 13:32
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/16 13:32
 * @disc:五角星 继承自Polygon
 */
import {fabric} from "fabric";
import {IObjectOptions} from "~fabric/fabric-impl";


class FabricStar extends fabric.Polygon{
    public type:string="star";
    private static sin18:number=Math.abs(Math.sin(18/180 * Math.PI));
    private static cos18:number=Math.abs(Math.cos(18/180 * Math.PI));
    private static sin54:number=Math.abs(Math.sin(54/180 * Math.PI));
    private static cos54:number=Math.abs(Math.cos(54/180 * Math.PI));
    /**
     * 计算五角星各定点坐标
     * @param {{x: number; y: number}} center
     * @param {number} radius
     * @returns {"~fabric/fabric-impl".Point[]}
     */
    private static calcPointsByRadius(center:{x: number; y: number},radius:number){
        const innerRadius = radius / (3-4*Math.pow(this.sin18,2));
        let points:fabric.Point[]=[];
        points.push(new fabric.Point(center.x,center.y - radius));
        points.push(new fabric.Point(center.x + innerRadius*this.cos54,center.y - innerRadius*this.sin54));
        points.push(new fabric.Point(center.x + radius*this.cos18,center.y - radius*this.sin18));
        points.push(new fabric.Point(center.x + innerRadius*this.cos18,center.y + innerRadius*this.sin18));
        points.push(new fabric.Point(center.x + radius*this.cos54,center.y + radius*this.sin54));
        points.push(new fabric.Point(center.x,center.y + innerRadius));
        points.push(new fabric.Point(center.x - radius*this.cos54,center.y + radius*this.sin54));
        points.push(new fabric.Point(center.x - innerRadius*this.cos18,center.y + innerRadius*this.sin18));
        points.push(new fabric.Point(center.x - radius*this.cos18,center.y - radius*this.sin18));
        points.push(new fabric.Point(center.x - innerRadius*this.cos54,center.y - innerRadius*this.sin54));
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
        super(FabricStar.calcPointsByRadius(center,radius),options,skipOffset);
    }
}

export {FabricStar};