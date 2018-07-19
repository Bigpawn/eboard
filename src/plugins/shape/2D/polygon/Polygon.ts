/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/15 15:24
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/15 15:24
 * @disc:多边形
 * 使用折线来实现，需要考虑border边线设置问题，如果没有边线则最终绘制时需要将其去除， 起始点需要考虑磁铁效果
 */

import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import {fabric} from "fabric";
import {IEvent} from '~fabric/fabric-impl';


class Point extends fabric.Point{
    public state:"final"|"temporary";
    constructor(x:number,y:number,state:"final"|"temporary"){
        super(x,y);
        this.state=state;
    }
}


class Polygon extends AbstractShapePlugin{
    protected instance:fabric.Polygon;
    private points:Point[]=[];
    private fill?:string="#28ff28";
    private stroke?:string="pink";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    private circle:fabric.Circle;// 起始点磁贴效果
    protected onMouseDown(event:IEvent){
        // 关闭自动渲染
        if(void 0 === this.start){
            // 起点
            this.start = this.eBoardCanvas.getPointer(event.e);
            // 此时points length 为0
            this.points.push(new Point(this.start.x,this.start.y,"final"));
        }else{
            // 中间点
            this.points.pop();
            const finalPoint = this.eBoardCanvas.getPointer(event.e);
            const _close = this.__requireClose(finalPoint);
            if(_close){
                this.points.push(new Point(this.start.x,this.start.y,"final"));
                this.finish();
            }else{
                this.points.push(new Point(finalPoint.x,finalPoint.y,"final"));
            }
        }
        // 判断是否是起点，如果是起点则关闭并且在相差区域内默认调整为起点
    }
    private finish(){
        this.eBoardCanvas.renderOnAddRemove=false;// 渲染过程控制
        this.eBoardCanvas.remove(this.instance);
        this.instance = new fabric.Polyline(this.points, {
            stroke:this.stroke,
            strokeDashArray:this.strokeDashArray,
            strokeWidth:this.getCanvasPixel(this.strokeWidth),
            fill:this.fill,
        });
        this.eBoardCanvas.add(this.instance);
        this.circle&&this.eBoardCanvas.remove(this.circle);
        this.eBoardCanvas.renderAll();
        this.recovery();
        this.eBoardCanvas.renderOnAddRemove=true;// 渲染过程控制
    }
    
    /**
     * 资源回收
     */
    private recovery(){
        this.points=[];
        this.start = undefined as any;
        this.instance = undefined as any;
        this.circle = undefined as any;
    }
    /**
     * test want to close
     * @param {{x: number; y: number}} pointer
     * @private
     */
    private __requireClose(pointer:{x:number,y:number}){
        const start = this.start;
        if(this.points.length <=2){return false}
        const offsetX = Math.abs(pointer.x-start.x);
        const offsetY = Math.abs(pointer.y-start.y);
        const range = this.getCanvasPixel(10);
        return offsetX < range && offsetY < range;
    }
    private showCanvas(pointer:{x:number;y:number}){
        const _close = this.__requireClose(pointer);
        this.circle&&this.eBoardCanvas.remove(this.circle);
        if(_close){
            this.circle = new fabric.Circle({
                originX:"center",
                originY:"center",
                fill:"#ff2d2d",
                left: this.start.x,
                top: this.start.y,
                stroke:"#ff8040",
                strokeWidth:this.getCanvasPixel(1),
                radius:this.getCanvasPixel(3),
            });
            this.eBoardCanvas.add(this.circle);
        }
    }
    protected onMouseMove(event:IEvent){
        if(void 0 ===this.start){
            return;
        }
        super.onMouseMove(event);
        const pos = this.end;
        this.eBoardCanvas.renderOnAddRemove=false;// 渲染过程控制
        const lastPoint = this.points.pop() as Point;
        if("final"===lastPoint.state) {
            this.points.push(lastPoint,new Point(pos.x,pos.y,"temporary"));
        }else{
            this.points.push(new Point(pos.x,pos.y,"temporary"));
        }
        if(void 0 === this.instance){
            this.instance = new fabric.Polyline(this.points, {
                stroke:this.stroke,
                strokeDashArray:this.strokeDashArray,
                strokeWidth:this.getCanvasPixel(this.strokeWidth),
                fill:this.fill,
            });
            this.eBoardCanvas.add(this.instance);
        }else{
            this.eBoardCanvas.remove(this.instance);
            this.instance = new fabric.Polyline(this.points, {
                stroke:this.stroke,
                strokeDashArray:this.strokeDashArray,
                strokeWidth:this.getCanvasPixel(this.strokeWidth),
                fill:this.fill,
            });
            this.eBoardCanvas.add(this.instance);
            this.showCanvas(pos);
        }
        this.eBoardCanvas.renderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
    
    /**
     * @override
     * 清楚默认操作
     * @param {"~fabric/fabric-impl".IEvent} event
     */
    protected onMouseUp(event:IEvent){
        // 不进行实例消除
        // this.instance=undefined as any;
        // this.start=undefined as any;
    }
}

export {Polygon};