/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/27 17:28
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/27 17:28
 * @disc:fabric.Star
 */
import {fabric} from "fabric";
import {IObjectOptions, IPolygonOptions} from '~fabric/fabric-impl';
class Star extends fabric.Polygon{
    public type:string="star";
    public id:string;
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
    
    
    
    private static sin18:number=Math.abs(Math.sin(18/180 * Math.PI));
    private static sin36:number=Math.sin(36/180 * Math.PI);
    private static sin72:number=Math.sin(72/180 * Math.PI);
    private static sin108:number=Math.sin(108/180 * Math.PI);
    private static sin144:number=Math.sin(144/180 * Math.PI);
    private static cos36:number=Math.cos(36/180 * Math.PI);
    private static cos72:number=Math.cos(72/180 * Math.PI);
    private static cos108:number=Math.cos(108/180 * Math.PI);
    private static cos144:number=Math.cos(144/180 * Math.PI);
    
    /**
     * 计算五角星各定点坐标
     * @param {{x: number; y: number}} center
     * @param {number} radius
     * @param {number} offsetAngle 鼠标位置偏角
     * @returns {any[]}
     */
    public static calcPointsByRadius(center:{x: number; y: number},radius:number,offsetAngle:number){
        const innerRadius = radius / (3-4*Math.pow(this.sin18,2));
        // angle相对于正位置的偏角   72°间隔
        const angles=[offsetAngle,offsetAngle+36,offsetAngle+72,offsetAngle+108,offsetAngle+144,offsetAngle+180,offsetAngle+216,offsetAngle+252,offsetAngle+288,offsetAngle+324];
        // cos sin 计算优化
        const sinOffsetAngle=Math.sin(offsetAngle/180 * Math.PI);
        const cosOffsetAngle=Math.cos(offsetAngle/180 * Math.PI);
        // 相差 180 °都是取反，此处只用到绝对值，不需要取反
        const sinObject=[sinOffsetAngle,sinOffsetAngle* this.cos36 + cosOffsetAngle * this.sin36,
            sinOffsetAngle* this.cos72 + cosOffsetAngle * this.sin72,sinOffsetAngle* this.cos108 + cosOffsetAngle * this.sin108,
            sinOffsetAngle* this.cos144 + cosOffsetAngle * this.sin144];// 一半值
        
        const cosObject=[cosOffsetAngle,cosOffsetAngle* this.cos36 - sinOffsetAngle * this.sin36,
            cosOffsetAngle* this.cos72 - sinOffsetAngle * this.sin72,cosOffsetAngle* this.cos108 - sinOffsetAngle * this.sin108,
            cosOffsetAngle* this.cos144 - sinOffsetAngle * this.sin144];// 一半值
        
        return angles.map((angle:number,index:number)=>{
            const _angle = angle%360;
            const cosAngle = Math.abs(cosObject[index%5]);// 通过已知角进行优化
            const sinAngle = Math.abs(sinObject[index%5])
            // const cosAngle = Math.abs(Math.cos(_angle/180 * Math.PI));// 通过已知角进行优化
            // const sinAngle = Math.abs(Math.sin(_angle/180 * Math.PI));
            if(index%2===0){
                // 外角
                if(_angle>0 && _angle<=90){
                    return new fabric.Point(center.x + radius*cosAngle,center.y + radius*sinAngle);
                }else if(_angle>90 && _angle<=180){
                    return new fabric.Point(center.x - radius*cosAngle,center.y + radius*sinAngle);
                }else if(_angle>180 && _angle<=270){
                    return new fabric.Point(center.x - radius*cosAngle,center.y - radius*sinAngle);
                }else{
                    return new fabric.Point(center.x + radius*cosAngle,center.y - radius*sinAngle);
                }
            }else{
                // 内角
                if(_angle>0 && _angle<=90){
                    return new fabric.Point(center.x + innerRadius*cosAngle,center.y + innerRadius*sinAngle);
                }else if(_angle>90 && _angle<=180){
                    return new fabric.Point(center.x - innerRadius*cosAngle,center.y + innerRadius*sinAngle);
                }else if(_angle>180 && _angle<=270){
                    return new fabric.Point(center.x - innerRadius*cosAngle,center.y - innerRadius*sinAngle);
                }else{
                    return new fabric.Point(center.x + innerRadius*cosAngle,center.y - innerRadius*sinAngle);
                }
            }
        });
    }
}

export {Star};