/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/16 17:51
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/16 17:51
 * @disc:六边形 extends Polygon 暂不支持旋转
 */

import {fabric} from "fabric";
import {IObjectOptions} from "~fabric/fabric-impl";


class FabricHexagon extends fabric.Polygon{
    public type:string="hexagon";
    private static sqrt3:number=Math.sqrt(3)/2;
    /**
     * 计算五边形各定点坐标
     * @param {{x: number; y: number}} center
     * @param {number} radius
     * @returns {"~fabric/fabric-impl".Point[]}
     */
    private static calcPointsByRadius(center:{x: number; y: number},radius:number){
        let points:fabric.Point[]=[];
        points.push(new fabric.Point(center.x + radius/2,center.y - radius * this.sqrt3));
        points.push(new fabric.Point(center.x + radius,center.y));
        points.push(new fabric.Point(center.x + radius/2,center.y + radius * this.sqrt3));
        points.push(new fabric.Point(center.x - radius/2,center.y + radius * this.sqrt3));
        points.push(new fabric.Point(center.x - radius,center.y));
        points.push(new fabric.Point(center.x - radius/2,center.y - radius * this.sqrt3));
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
        super(FabricHexagon.calcPointsByRadius(center,radius),options,skipOffset);
    }
}

export {FabricHexagon};