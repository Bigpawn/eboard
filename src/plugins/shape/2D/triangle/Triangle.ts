/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/13 21:47
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/13 21:47
 * @disc:三角形  flipX,flipY 实现翻转
 */

import {EBoardCanvas} from '../../../../EBoardCanvas';
import {fabric} from "fabric";
import {EBoardEngine} from '../../../../EBoardEngine';
import {AbstractShapePlugin, Quadrant} from '../../AbstractShapePlugin';
import {IEvent} from '~fabric/fabric-impl';
import {ctrlKeyEnable} from '../../../../utils/decorators';

@ctrlKeyEnable(true)
class Triangle extends AbstractShapePlugin{
    protected instance:fabric.Triangle;
    private fill?:string;
    private stroke?:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    protected ctrlKeyEnable:boolean;
    protected ctrlKey:boolean=false;
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
    private getCtrlStartPoint(size:{width:number,height:number}):{x:number;y:number}{
        const start = this.start;
        const end = this.end;
        const quadrant = this.calcQuadrant(end);
        switch (quadrant){
            case Quadrant.RT:// 第一象限
                return {
                    x:start.x,
                    y:start.y-size.height
                };
            case Quadrant.LT:// 第二象限
                return {
                    x:start.x-size.width,
                    y:start.y-size.height
                };
            case Quadrant.LB:// 第三象限
                return {
                    x:start.x-size.width,
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
        if(void 0 === this.start){
            return;
        }
        super.onMouseMove(event);
        
        const pos = this.end;
        const offsetX = pos.x-this.start.x;
        const offsetY = pos.y-this.start.y;
        const width=Math.abs(offsetX);
        const height=Math.abs(offsetY);
        const calcSize = this.calcEquilate(width,height);
        const startPoint = this.ctrlKey?this.getCtrlStartPoint(calcSize):this.getStartPoint();
        if(void 0 ===this.instance){
            this.instance=new fabric.Triangle({
                fill:this.fill,
                left: startPoint.x,
                top: startPoint.y,
                stroke:this.stroke,
                flipX:offsetX<0,
                flipY:offsetY<0,
                width:this.ctrlKey?calcSize.width:width,
                height:this.ctrlKey?calcSize.height:height,
                strokeDashArray:this.strokeDashArray,
                strokeWidth:this.getCanvasPixel(this.strokeWidth)
            });
            this.eBoardCanvas.add(this.instance);
        }else{
            this.instance.set({
                width:this.ctrlKey?calcSize.width:width,
                height:this.ctrlKey?calcSize.height:height,
                flipX:offsetX<0,
                flipY:offsetY<0,
                left: startPoint.x,
                top: startPoint.y,
            }).setCoords();
            this.eBoardCanvas.renderAll();
        }
    };
    private calcEquilate(width:number,height:number){
        // 根据宽度计算高度  根据高度计算宽度，同时取小值
        const calcHeight = width * Math.sqrt(3)/2;
        const calcWidth = height * 2 / Math.sqrt(3);
        return {
            width:Math.min(calcWidth,width),
            height:Math.min(calcHeight,height)
        }
    };
    protected ctrlKeyDownHandler(e:KeyboardEvent){
        // 判断是否处于绘制模式
        const keyCode = e.keyCode;
        if(17===keyCode){
            this.ctrlKey=true;
            if(void 0 !== this.instance){
                const offsetX = this.end.x-this.start.x;
                const offsetY = this.end.y-this.start.y;
                const width=Math.abs(offsetX);
                const height=Math.abs(offsetY);
                const calcSize = this.calcEquilate(width,height);
                const startPoint = this.getCtrlStartPoint(calcSize);
                this.instance.set({
                    width:this.ctrlKey?calcSize.width:width,
                    height:this.ctrlKey?calcSize.height:height,
                    flipY:offsetY<0,
                    flipX:offsetX<0,
                    left: startPoint.x,
                    top: startPoint.y,
                }).setCoords();
                this.eBoardCanvas.renderAll();
            }
        }
    }
    protected ctrlKeyUpHandler(e:KeyboardEvent){
        const keyCode = e.keyCode;
        if(17===keyCode){
            // 恢复
            this.ctrlKey=false;
            if(void 0 !== this.instance){
                const width=Math.abs(this.end.x-this.start.x);
                const height=Math.abs(this.end.y-this.start.y);
                const offsetX = this.end.x-this.start.x;
                const offsetY = this.end.y-this.start.y;
                const startPoint = this.getStartPoint();
                this.instance.set({
                    width:width,
                    height:height,
                    flipY:offsetY<0,
                    flipX:offsetX<0,
                    left:startPoint.x,
                    top:startPoint.y
                }).setCoords();
                this.eBoardCanvas.renderAll();
            }
        }
    }
}

export {Triangle};