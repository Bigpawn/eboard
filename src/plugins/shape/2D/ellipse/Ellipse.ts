/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/12 21:38
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/12 21:38
 * @disc:Ellipse  flip翻转属性不起作用，使用动态计算起点位置实现
 */

import {EBoardCanvas} from '../../../../EBoardCanvas';
import {fabric} from "fabric";
import {EBoardEngine} from '../../../../EBoardEngine';
import {AbstractShapePlugin, Quadrant} from '../../AbstractShapePlugin';
import {IEvent} from '~fabric/fabric-impl';


class Ellipse extends AbstractShapePlugin{
    protected instance:fabric.Ellipse;
    private fill?:string;
    private stroke?:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    private ctrlKey:boolean=false;
    constructor(canvas:EBoardCanvas,eBoardEngine:EBoardEngine){
        super(canvas,eBoardEngine);
    }
    private getStartPoint():{x:number;y:number}{
        const start = this.start;
        const end = this.end;
        const quadrant = this.calcQuadrant(end);
        switch (quadrant){
            case Quadrant.RT:// 第一象限
                return {
                    x:start.x,
                    y:end.y
                };
            case Quadrant.LT:// 第二象限
                return {
                    x:end.x,
                    y:end.y
                };
            case Quadrant.LB:// 第三象限
                return {
                    x:end.x,
                    y:start.y
                };
            case Quadrant.RB:// 第四象限
            default:
                return {
                    x:start.x,
                    y:start.y
                };
        }
    }
    private getCtrlStartPoint(radius:number):{x:number;y:number}{
        const start = this.start;
        const end = this.end;
        const length = radius * 2;
        const quadrant = this.calcQuadrant(end);
        switch (quadrant){
            case Quadrant.RT:// 第一象限
                return {
                    x:start.x,
                    y:start.y-length
                };
            case Quadrant.LT:// 第二象限
                return {
                    x:start.x-length,
                    y:start.x-length
                };
            case Quadrant.LB:// 第三象限
                return {
                    x:start.x-length,
                    y:start.y
                };
            case Quadrant.RB:// 第四象限
            default:
                return {
                    x:start.x,
                    y:start.y
                };
        }
    };
    protected onMouseMove(event:IEvent){
        if(void 0 ===this.start){
            return;
        }
        super.onMouseMove(event);
        const rx=Math.abs(this.end.x-this.start.x)/2;
        const ry=Math.abs(this.end.y-this.start.y)/2;
        const radius = Math.min(rx,ry);
        const startPoint = this.ctrlKey?this.getCtrlStartPoint(radius):this.getStartPoint();
        if(this.instance){
            this.instance.set({
                rx:this.ctrlKey?radius:rx,
                ry:this.ctrlKey?radius:ry,
                left: startPoint.x,
                top: startPoint.y,
            }).setCoords();
            this.eBoardCanvas.renderAll();
        }else{
            this.instance = new fabric.Ellipse({
                    fill:this.fill,
                    left: startPoint.x,
                    top: startPoint.y,
                    rx:this.ctrlKey?radius:rx,
                    ry:this.ctrlKey?radius:ry,
                    stroke:this.stroke,
                    strokeDashArray:this.strokeDashArray,
                    strokeWidth:this.getCanvasPixel(this.strokeWidth)
                });
            this.eBoardCanvas.add(this.instance);
        }
    };
    protected ctrlKeyDownHandler(e:KeyboardEvent){
        // 判断是否处于绘制模式
        const keyCode = e.keyCode;
        if(17===keyCode){
            this.ctrlKey=true;
            if(void 0 === this.instance||void 0 === this.start){
                return;
            }
            const rx=Math.abs(this.end.x-this.start.x)/2;
            const ry=Math.abs(this.end.y-this.start.y)/2;
            const radius = Math.min(rx,ry);
            const startPoint = this.getCtrlStartPoint(radius);
            this.instance.set({
                rx:radius,
                ry:radius,
                left: startPoint.x,
                top: startPoint.y,
            }).setCoords();
            this.eBoardCanvas.renderAll();
        }
    }
    protected ctrlKeyUpHandler(e:KeyboardEvent){
        const keyCode = e.keyCode;
        if(17===keyCode){
            // 恢复
            this.ctrlKey=false;
            if(void 0 ===this.instance){
                return;
            }
            const rx=Math.abs(this.end.x-this.start.x)/2;
            const ry=Math.abs(this.end.y-this.start.y)/2;
            const startPoint = this.getStartPoint();
            this.instance.set({
                rx:rx,
                ry:ry,
                left: startPoint.x,
                top: startPoint.y,
            }).setCoords();
            this.eBoardCanvas.renderAll();
        }
    }
}

export {Ellipse};