/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/16 17:51
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/16 17:51
 * @disc:六边形 extends Polygon
 * 扩展旋转
 */

import {fabric} from "fabric";


class FabricHexagon extends fabric.Polygon{
    public type:string="hexagon";
    private static sin60:number=Math.sin(60/180 * Math.PI);
    private static sin120:number=Math.sin(120/180 * Math.PI);
    private static cos60:number=Math.cos(60/180 * Math.PI);
    private static cos120:number=Math.cos(120/180 * Math.PI);
    
    /**
     * 计算五边形各定点坐标
     * @param {{x: number; y: number}} center
     * @param {number} radius
     * @param {number} offsetAngle
     * @returns {any[]}
     */
    public static calcPointsByRadius(center:{x: number; y: number},radius:number,offsetAngle:number){
        // angle相对于正位置的偏角   72°间隔
        const angles=[offsetAngle,offsetAngle+60,offsetAngle+120,offsetAngle+180,offsetAngle+240,offsetAngle+300];
        // cos sin 计算优化
        const sinOffsetAngle=Math.sin(offsetAngle/180 * Math.PI);
        const cosOffsetAngle=Math.cos(offsetAngle/180 * Math.PI);
        // 相差 180 °都是取反，此处只用到绝对值，不需要取反
        const sinObject=[sinOffsetAngle,sinOffsetAngle* this.cos60 + cosOffsetAngle * this.sin60,sinOffsetAngle* this.cos120 + cosOffsetAngle * this.sin120];// 一半值
    
        const cosObject=[cosOffsetAngle,cosOffsetAngle* this.cos60 - sinOffsetAngle * this.sin60,cosOffsetAngle* this.cos120 - sinOffsetAngle * this.sin120];// 一半值
    
        return angles.map((angle:number,index:number)=>{
            const _angle = angle%360;
            const cosAngle = Math.abs(cosObject[index%3]);// 通过已知角进行优化
            const sinAngle = Math.abs(sinObject[index%3]);
            // const cosAngle = Math.abs(Math.cos(_angle/180 * Math.PI));// 通过已知角进行优化
            // const sinAngle = Math.abs(Math.sin(_angle/180 * Math.PI));
            if(_angle>0 && _angle<=90){
                return new fabric.Point(center.x + radius*cosAngle,center.y + radius*sinAngle);
            }else if(_angle>90 && _angle<=180){
                return new fabric.Point(center.x - radius*cosAngle,center.y + radius*sinAngle);
            }else if(_angle>180 && _angle<=270){
                return new fabric.Point(center.x - radius*cosAngle,center.y - radius*sinAngle);
            }else{
                return new fabric.Point(center.x + radius*cosAngle,center.y - radius*sinAngle);
            }
        });
    }
}

export {FabricHexagon};