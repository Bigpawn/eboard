/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/27 14:25
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/27 14:25
 * @disc:fabric.Pentagon
 */
import {fabric} from "fabric";
import {IObjectOptions} from '~fabric/fabric-impl';
import {IObject} from '../interface/IObject';
import {IDefaultConfig} from '../interface/IConfig';
import {EDux} from '../utils/EDux';
import {EBoardCanvas} from '../EBoardCanvas';

let _config:IDefaultConfig;
let _eDux:EDux;

class Pentagon extends fabric.Polygon implements IObject{
    public type:string="pentagon";
    public id:string;
    
    /**
     * @override
     * @param points
     * @param {"~fabric/fabric-impl".IObjectOptions} options
     * @param eBoardCanvas
     */
    constructor(points: Array<{ x: number; y: number }>, options: IObjectOptions, eBoardCanvas: EBoardCanvas){
        super(points,(_eDux=eBoardCanvas.eDux,_config=_eDux.config , Object.assign({
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
    
    /**
     * 修改id
     * @param {string} id
     * @returns {this}
     */
    public setId(id:string){
        this.id=id;
        return this;
    }
    
    private static sin72:number=Math.sin(72/180 * Math.PI);
    private static sin144:number=Math.sin(144/180 * Math.PI);
    private static sin216:number=Math.sin(216/180 * Math.PI);
    private static sin288:number=Math.sin(288/180 * Math.PI);
    private static cos72:number=Math.cos(72/180 * Math.PI);
    private static cos144:number=Math.cos(144/180 * Math.PI);
    private static cos216:number=Math.cos(216/180 * Math.PI);
    private static cos288:number=Math.cos(288/180 * Math.PI);
    
    /**
     * 计算五边形各定点坐标
     * @param {{x: number; y: number}} center
     * @param {number} radius
     * @param {number} offsetAngle
     * @returns {any[]}
     */
    public static calcPointsByRadius(center:{x: number; y: number},radius:number,offsetAngle:number){
        // angle相对于正位置的偏角   72°间隔
        const angles=[offsetAngle,offsetAngle+72,offsetAngle+144,offsetAngle+216,offsetAngle+288];
        // cos sin 计算优化
        const sinOffsetAngle=Math.sin(offsetAngle/180 * Math.PI);
        const cosOffsetAngle=Math.cos(offsetAngle/180 * Math.PI);
        // 相差 180 °都是取反，此处只用到绝对值，不需要取反
        const sinObject=[sinOffsetAngle,sinOffsetAngle* this.cos72 + cosOffsetAngle * this.sin72,sinOffsetAngle* this.cos144 + cosOffsetAngle * this.sin144,
            sinOffsetAngle* this.cos216 + cosOffsetAngle * this.sin216,
            sinOffsetAngle* this.cos288 + cosOffsetAngle * this.sin288];// 一半值
        
        const cosObject=[cosOffsetAngle,cosOffsetAngle* this.cos72 - sinOffsetAngle * this.sin72,cosOffsetAngle* this.cos144 - sinOffsetAngle * this.sin144,
            cosOffsetAngle* this.cos216 - sinOffsetAngle * this.sin216,
            cosOffsetAngle* this.cos288 - sinOffsetAngle * this.sin288];// 一半值
        
        return angles.map((angle:number,index:number)=>{
            const _angle = angle%360;
            const cosAngle = Math.abs(cosObject[index]);// 通过已知角进行优化
            const sinAngle = Math.abs(sinObject[index]);
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

export {Pentagon};