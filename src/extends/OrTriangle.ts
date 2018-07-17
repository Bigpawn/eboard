/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/15 14:57
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/15 14:57
 * @disc:直角三角形
 */
import {fabric} from "fabric";

class OrTriangle extends fabric.Polygon{
    public type="or-triangle";
    public static calcPointsByCursorPoint(center:{x:number;y:number},point:{x:number;y:number}){
        return [
            new fabric.Point(center.x,center.y),
            new fabric.Point(point.x,point.y),
            new fabric.Point(center.x,point.y),
        ]
    }
    
}

export {OrTriangle};



