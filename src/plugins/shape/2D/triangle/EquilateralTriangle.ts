/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/15 9:16
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/15 9:16
 * @disc:等边三角形
 * 会触发两次重绘  后期考虑优化
 */
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import {IEvent} from '~fabric/fabric-impl';
import {EqTriangle} from '../../../../extends/EqTriangle';

class EquilateralTriangle extends AbstractShapePlugin{
    protected instance:EqTriangle;
    private fill?:string;
    private stroke?:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    protected onMouseMove(event:IEvent){
        if(void 0 === this.start){
            return;
        }
        super.onMouseMove(event);
    
    
    
    
        const radius = Math.sqrt(Math.pow(this.start.x-this.end.x,2)+Math.pow(this.start.y-this.end.y,2));
        const angle = this.calcAngle(this.end);
        const points = EqTriangle.calcPointsByRadius(this.start,radius,angle);
        
        
        
        if(void 0 ===this.instance){
            this.instance=new EqTriangle(points, {
                stroke: this.stroke,
                strokeWidth: this.getCanvasPixel(this.strokeWidth),
                strokeDashArray:this.strokeDashArray,
                fill: this.fill,
                width:radius *2,
                height:radius *2,
                left:this.start.x,
                top:this.start.y,
                originY:"center",
                originX:"center"
            });
            this.eBoardCanvas.add(this.instance);
        }else{
            this.instance.set({
                points:points,
                width:radius *2,
                height:radius *2,
                left:this.start.x,
                top:this.start.y,
                originY:"center",
                originX:"center"
            }).setCoords();
            this.eBoardCanvas.renderAll();
        }
    };
}
export {EquilateralTriangle};