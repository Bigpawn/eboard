/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/15 14:58
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/15 14:58
 * @disc:直角三角形 继承自Path
 */
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import {IEvent} from '~fabric/fabric-impl';
import {OrTriangle} from '../../../../extends/OrTriangle';



class OrthogonalTriangle extends AbstractShapePlugin{
    protected instance:OrTriangle;
    private fill?:string;
    private stroke?:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    protected onMouseMove(event:IEvent){
        if(void 0 === this.start){
            return;
        }
        super.onMouseMove(event);
        const path =
            "M " +
            this.start.x +
            " " +
            this.start.y +
            " L " +
            this.start.x +
            " " +
            this.end.y +
            " L " +
            this.end.x +
            " " +
            this.end.y +
            " z";
        if(void 0 ===this.instance){
            this.instance=new OrTriangle(path, {
                stroke: this.stroke,
                strokeWidth: this.getCanvasPixel(this.strokeWidth),
                strokeDashArray:this.strokeDashArray,
                fill: this.fill
            });
            this.eBoardCanvas.add(this.instance);
        }else{
            this.eBoardCanvas.renderOnAddRemove=false;
            this.eBoardCanvas.remove(this.instance);
            this.instance=new OrTriangle(path, {
                stroke: this.stroke,
                strokeWidth: this.getCanvasPixel(this.strokeWidth),
                fill: this.fill,
                strokeDashArray:this.strokeDashArray,
            });
            this.eBoardCanvas.add(this.instance);
            this.eBoardCanvas.renderAll();
            this.eBoardCanvas.renderOnAddRemove=true;
        }
    };
}
export {OrthogonalTriangle};