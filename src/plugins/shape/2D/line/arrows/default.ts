/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/11 9:33
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/11 9:33
 * @disc:default Arrow
 */

import {ArrowLine} from '../../../../../extends/ArrowLine';
import {ArrowMode} from '../LineType';

export declare interface ILinePoints{
    x1:number;
    x2:number;
    y1:number;
    y2:number
}

class DefaultArrow{
    protected ctx:CanvasRenderingContext2D;
    protected line:ArrowLine;
    protected calcData:any;
    protected linePoints:ILinePoints;
    constructor(ctx:CanvasRenderingContext2D,line:ArrowLine){
        this.ctx=ctx;
        this.line=line;
    
        this.linePoints = line["calcLinePoints"]();
        
        const lineWidth=this.line.strokeWidth||this.ctx.lineWidth;
        const theta=30,headlen=Math.max(lineWidth*2+10,10);
        const angle = Math.atan2(this.linePoints.y1 - this.linePoints.y2, this.linePoints.x1 - this.linePoints.x2) * 180 / Math.PI,
            angle1 = (angle + theta) * Math.PI / 180,
            angle2 = (angle - theta) * Math.PI / 180,
            topX = headlen * Math.cos(angle1),
            topY = headlen * Math.sin(angle1),
            botX = headlen * Math.cos(angle2),
            botY = headlen * Math.sin(angle2);
        this.calcData={
            angle,
            angle1,
            angle2,
            topX,
            topY,
            botX,
            botY,
        };
    }
    protected drawPrev(){
        const p5={
            x:this.linePoints.x1 - this.calcData.topX,
            y: this.linePoints.y1 - this.calcData.topY
        };
        const p6={
            x:this.linePoints.x1 - this.calcData.botX,
            y:this.linePoints.y1 - this.calcData.botY
        };
        this.ctx.moveTo(p5.x, p5.y);
        this.ctx.lineTo(this.linePoints.x1, this.linePoints.y1);
        this.ctx.lineTo(p6.x,p6.y);
        this.ctx.lineTo(p5.x, p5.y);
        this.ctx.lineTo(this.linePoints.x1, this.linePoints.y1);
        this.ctx.fill();
        this.ctx.stroke();
    }
    protected drawNext(){
        const p3={
            x:this.linePoints.x2 + this.calcData.topX,
            y: this.linePoints.y2 + this.calcData.topY
        };
        const p4={
            x:this.linePoints.x2 + this.calcData.botX,
            y:this.linePoints.y2 + this.calcData.botY
        };
        this.ctx.moveTo(p3.x, p3.y);
        this.ctx.lineTo(this.linePoints.x2, this.linePoints.y2);
        this.ctx.lineTo(p4.x,p4.y);
        this.ctx.lineTo(p3.x, p3.y);
        this.ctx.lineTo(this.linePoints.x2, this.linePoints.y2);
        this.ctx.fill();
        this.ctx.stroke();
    }
    public draw(mode:ArrowMode){
        // 保存原有的画布样式，绘制完成后恢复
        const origStrokeStyle = this.ctx.strokeStyle;
        const originFillStyle=this.ctx.fillStyle;
        this.ctx.fillStyle=this.ctx.strokeStyle;
        this.ctx.beginPath();
     
        switch(mode){
            case ArrowMode.NEXT:
                this.drawNext();
                break;
            case ArrowMode.PREV:
                this.drawPrev();
                break;
            case ArrowMode.ALL:
                this.drawNext();
                this.drawPrev();
                break;
            default:
                break;
        }
        
        // Canvas 恢复
        this.ctx.fillStyle=originFillStyle;
        this.ctx.strokeStyle=origStrokeStyle;
    }
}

export default DefaultArrow;