/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/16 12:55
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/16 12:55
 * @disc:五角星 extend Polygon
 */
import {Star as FabricStar} from "../../../../extends/Star";
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import {IEvent} from "~fabric/fabric-impl";

class Star extends AbstractShapePlugin{
    protected instance:FabricStar;
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
        
        if(void 0 ===this.instance){
            this.instance=new FabricStar(this.start,radius, {
                stroke: this.stroke,
                strokeWidth: this.getCanvasPixel(this.strokeWidth),
                strokeDashArray:this.strokeDashArray,
                fill: this.fill,
                // left:this.start.x,
                // top:this.start.y,
                // originX:"center",
                // originY:"center",
                // width:radius * 2,
                // height:radius * 2
            });
            this.eBoardCanvas.add(this.instance);
        }else{
            this.eBoardCanvas.renderOnAddRemove=false;// 渲染过程控制
            this.eBoardCanvas.remove(this.instance);
            this.instance=new FabricStar(this.start,radius, {
                stroke: this.stroke,
                strokeWidth: this.getCanvasPixel(this.strokeWidth),
                strokeDashArray:this.strokeDashArray,
                fill: this.fill,
                // left:this.start.x,
                // top:this.start.y,
                // originX:"center",
                // originY:"center",
                // width:radius * 2,
                // height:radius * 2
            });
            this.eBoardCanvas.add(this.instance);
            this.eBoardCanvas.renderAll();
            this.eBoardCanvas.renderOnAddRemove=true;// 渲染过程控制
        }
    };
}

export {Star};