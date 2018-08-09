/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/27 14:09
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/27 14:09
 * @disc:fabric.Hexagon
 */

import {fabric} from "fabric";
import {
     IObjectOptions,
    IPolygonOptions,
} from '~fabric/fabric-impl';
import {IObject} from '../interface/IObject';

class Hexagon extends fabric.Polygon implements IObject{
    public type:string="hexagon";
    public id:string;
    
    /**
     * @override
     * @param {Array<{x: number; y: number}>} points
     * @param {"~fabric/fabric-impl".IObjectOptions} options
     * @param {boolean} skipOffset
     */
    constructor(points: Array<{ x: number; y: number }>, options?: IObjectOptions, skipOffset?: boolean){
        super(points,options,skipOffset);
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
     * 更新
     * @param {IPolygonOptions} options
     */
    public update(options?: IPolygonOptions){
        this.set(options as any).setCoords();
        return this;
    }
    
    
    
    
    
    
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
        const angles=[offsetAngle,offsetAngle+60,offsetAngle+120,offsetAngle+180,offsetAngle+240,offsetAngle+300];
        const sinOffsetAngle=Math.sin(offsetAngle/180 * Math.PI);
        const cosOffsetAngle=Math.cos(offsetAngle/180 * Math.PI);
        const sinObject=[sinOffsetAngle,sinOffsetAngle* this.cos60 + cosOffsetAngle * this.sin60,sinOffsetAngle* this.cos120 + cosOffsetAngle * this.sin120];// 一半值
        const cosObject=[cosOffsetAngle,cosOffsetAngle* this.cos60 - sinOffsetAngle * this.sin60,cosOffsetAngle* this.cos120 - sinOffsetAngle * this.sin120];// 一半值
        return angles.map((angle:number,index:number)=>{
            const _angle = angle%360;
            const cosAngle = Math.abs(cosObject[index%3]);// 通过已知角进行优化
            const sinAngle = Math.abs(sinObject[index%3]);
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

export {Hexagon};