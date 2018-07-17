/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/16 12:55
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/16 12:55
 * @disc:五角星 extend Polygon
 */
import {FabricStar} from "../../../../extends/FabricStar";
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import {IEvent} from "~fabric/fabric-impl";
import {fabric} from "fabric";

class Star extends AbstractShapePlugin{
    protected instance:fabric.Polygon;
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
        
        const points = FabricStar.calcPointsByRadius(this.start,radius,angle);
        if(void 0 ===this.instance){
            this.instance=new FabricStar(points,{
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
            // 不能重新创建实例，需要确保一个实例，保证uuid不变，否则会出现不停创建的消息
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

export {Star};