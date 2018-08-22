/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/30 9:04
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/30 9:04
 * @disc:fabric.EquilateralTriangle
 */
import {fabric} from "fabric";
import {IObjectOptions} from '~fabric/fabric-impl';
import {IObject} from '../interface/IObject';
import {IDefaultConfig} from '../interface/IConfig';
import {EDux} from '../utils/EDux';
import {EBoardCanvas} from '../EBoardCanvas';


let _config:IDefaultConfig;
let _eDux:EDux;


class EquilateralTriangle extends fabric.Polygon implements IObject{
    public type:string="equilateral-triangle";
    public id:string;
    constructor(points: Array<{ x: number; y: number }>, options: IObjectOptions,eBoardCanvas:EBoardCanvas){
        super(points,(_eDux=eBoardCanvas.eDux,_config=_eDux.config,Object.assign({
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
    
    private static sin120:number=Math.sin(120/180 * Math.PI);
    private static sin240:number=Math.sin(240/180 * Math.PI);
    private static cos120:number=Math.cos(120/180 * Math.PI);
    private static cos240:number=Math.cos(240/180 * Math.PI);
    /**
     * 计算等边三角形三个点
     * @param center
     * @param {number} radius
     * @param {number} offsetAngle
     * @returns {any[]}
     */
    public static calcPointsByRadius(center:{x: number; y: number},radius:number,offsetAngle:number){
        // angle相对于正位置的偏角   72°间隔
        const angles=[offsetAngle,offsetAngle+120,offsetAngle+240];
        // cos sin 计算优化
        const sinOffsetAngle=Math.sin(offsetAngle/180 * Math.PI);
        const cosOffsetAngle=Math.cos(offsetAngle/180 * Math.PI);
        // 相差 180 °都是取反，此处只用到绝对值，不需要取反
        const sinObject=[sinOffsetAngle,sinOffsetAngle* this.cos120 + cosOffsetAngle * this.sin120,sinOffsetAngle* this.cos240 + cosOffsetAngle * this.sin240];// 一半值
        
        const cosObject=[cosOffsetAngle,cosOffsetAngle* this.cos120 - sinOffsetAngle * this.sin120,cosOffsetAngle* this.cos240 - sinOffsetAngle * this.sin240];// 一半值
        
        return angles.map((angle:number,index:number)=>{
            const _angle = angle%360;
            const cosAngle = Math.abs(cosObject[index]);// 通过已知角进行优化
            const sinAngle = Math.abs(sinObject[index]);
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

export {EquilateralTriangle};