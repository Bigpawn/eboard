/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/12 21:10
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/12 21:10
 * @disc:Circle
 */

import {fabric} from "fabric";
import {setCursor} from '../../../../utils/decorators';
import {CursorTypeName} from '../../../tool/cursor/CursorType';
import {AbstractShapePlugin} from '../../AbstractShapePlugin';

@setCursor(CursorTypeName.Compass)
class Circle extends AbstractShapePlugin{
    private fill?:string;
    private stroke?:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    protected instance:fabric.Circle;
    protected onMouseMove(event:any){
        if(void 0 ===this.start){
            return;
        }
        super.onMouseMove(event);
        const radius=Math.sqrt(Math.pow(this.end.x-this.start.x,2)+Math.pow(this.end.y-this.start.y,2));
        if(this.instance){
            this.instance.set({
                radius:radius,
            }).setCoords();
            this.eBoardCanvas.renderAll();
        }else{
            this.instance=new fabric.Circle({
                originX:"center",
                originY:"center",
                fill:this.fill,
                left: this.start.x,
                top: this.start.y,
                stroke:this.stroke,
                strokeDashArray:this.strokeDashArray,
                strokeWidth:this.getCanvasPixel(this.strokeWidth),
                radius:radius
            });
            this.eBoardCanvas.add(this.instance);
        }
    };
}

export {Circle};