/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/15 9:16
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/15 9:16
 * @disc:等边三角形
 * 使用多边形来实现
 */
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import {IEvent} from '~fabric/fabric-impl';
import {EqTriangle} from '../../../../extends/EqTriangle';
import {fabric} from "fabric";

class EquilateralTriangle extends AbstractShapePlugin{
    protected instance:EqTriangle;
    private fill?:string;
    private stroke?:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    private calcPoints(){
        const start = this.start;
        const end = this.end;
        const r = Math.sqrt(Math.pow(end.x-start.x,2)+Math.pow(end.y-start.y,2));
        const angle = this.calcAngle(end);
        const width = Math.sqrt(3) * r / 2;
        return {
            firstPoint:{
                x:start.x,
                y:start.y-r
            },
            secondPoint:{
                x:start.x+width,
                y:start.y+r/2
            },
            endPoint:{
                x:start.x-width,
                y:start.y+r/2
            },
            angle:angle - 30,
            width:2*r,
            height:2*r
        }
    }
    
    protected onMouseMove(event:IEvent){
        if(void 0 === this.start){
            return;
        }
        super.onMouseMove(event);
        const calcPoints = this.calcPoints();
        if(void 0 ===this.instance){
            this.instance=new EqTriangle([calcPoints.firstPoint,calcPoints.secondPoint,calcPoints.endPoint], {
                stroke: this.stroke,
                strokeWidth: this.getCanvasPixel(this.strokeWidth),
                strokeDashArray:this.strokeDashArray,
                fill: this.fill,
                width:calcPoints.width,
                height:calcPoints.height,
                angle:calcPoints.angle,
                left:this.start.x,
                top:this.start.y,
                originX:"center",
                originY:"center"
            });
            this.eBoardCanvas.add(this.instance);
        }else{
            this.instance.set({
                points:[new fabric.Point(calcPoints.firstPoint.x,calcPoints.firstPoint.y),new fabric.Point(calcPoints.secondPoint.x,calcPoints.secondPoint.y),new fabric.Point(calcPoints.endPoint.x,calcPoints.endPoint.y)],
                width:calcPoints.width,
                height:calcPoints.height,
                angle:calcPoints.angle,
            });
            this.eBoardCanvas.renderAll();
        }
    };
}
export {EquilateralTriangle};