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
import {
    IMessage,
    MessageTagEnum,
} from '../../../../middlewares/MessageMiddleWare';
import {Polygon as FabricPolygon} from "../../../../extends/Polygon";
import {message, setCursor} from '../../../../utils/decorators';
import {CursorTypeEnum} from '../../../../cursor/Enum';


export declare interface IPolygonMessage extends IMessage{
    points:any[];
    stroke:string;
    fill:string;
}


@setCursor(CursorTypeEnum.Cross)
class Polygon extends AbstractShapePlugin{
    protected instance:FabricPolygon;
    private points:fabric.Point[]=[];
    protected fill:string;
    protected stroke:string="rgb(0,0,0)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    private circle:fabric.Circle;// 起始点磁贴效果
    private replace(finished:boolean){// finished 是否自动关闭
        this.eBoardCanvas.renderOnAddRemove=false;
        const _close = this.requireClose(this.end);
        if(_close){
            if(!finished){
                this.showCircle();
            }else{
                this.points.pop();
                this.points.pop();
                this.points.push(this.points[0]);
                this.closeCircle();
            }
        }else{
            this.closeCircle();
        }
        this.eBoardCanvas.remove(this.instance);
        this.instance=new FabricPolygon(this.points,{
            stroke:this.getStrokeColor(),
            strokeDashArray:this.strokeDashArray,
            strokeWidth:this.getCanvasPixel(this.strokeWidth),
            fill:this.getFillColor(),
        }).setId(this.instance.id);
        this.eBoardCanvas.add(this.instance);
        this.eBoardCanvas.renderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
        this.throw();
        if(_close&&finished){
            this.points=[];
            this.start = undefined as any;
            this.instance = undefined as any;
            this.circle = undefined as any;
        }
    }
    @message
    private throw(){
        return this.instance?{
            id:this.instance.id,
            tag:MessageTagEnum.Shape,
            points:this.instance.points,
            type:this.instance.type,
            fill:this.instance.fill,
            stroke:this.instance.stroke
        }:undefined
    }
    protected onMouseDown(event:IEvent){
        const point = this.eBoardCanvas.getPointer(event.e);
        point.x=Math.round(point.x);
        point.y=Math.round(point.y);
        if(void 0 === this.start){
            this.start = {
                x:point.x,
                y:point.y
            };
        }
        this.points.pop();
        this.points.push(new fabric.Point(point.x,point.y));
        this.points.push(new fabric.Point(point.x,point.y));// 如果关闭则
        if(void 0 === this.instance){
            this.instance = new FabricPolygon(this.points,{
                stroke:this.getStrokeColor(),
                strokeDashArray:this.strokeDashArray,
                strokeWidth:this.getCanvasPixel(this.strokeWidth),
                fill:this.getFillColor(),
            });
            this.eBoardCanvas.add(this.instance);
            this.throw();
        }else{
            this.replace(true);
        }
    }
    
    
    /**
     * test want to close
     * @private
     * @param pointer
     */
    private requireClose(pointer:{x:number,y:number}){
        const start = this.start;
        if(this.points.length <=2){return false}
        const offsetX = Math.abs(pointer.x-start.x);
        const offsetY = Math.abs(pointer.y-start.y);
        const range = this.getCanvasPixel(5);
        return offsetX < range && offsetY < range;
    }
    private closeCircle(){
        if(this.circle){
            this.eBoardCanvas.remove(this.circle);
            this.circle=undefined as any;
        }
    }
    private showCircle(){
        if(void 0 === this.circle){
            this.circle = new fabric.Circle({
                originX:"center",
                originY:"center",
                fill:"#ff2d2d",
                left: this.start.x,
                top: this.start.y,
                stroke:"#ff8040",
                strokeWidth:this.getCanvasPixel(1),
                radius:this.getCanvasPixel(5),
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
        this.points.pop();
        this.points.push(new fabric.Point(Math.round(pos.x),Math.round(pos.y)));
        this.replace(false);
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
    
    
    /**
     * 接收消息处理
     * @param {ICircleMessage} message
     */
    public onMessage(message:IPolygonMessage){
        const {id,points,stroke,fill} = message;
        let instance = this.getInstanceById(id) as FabricPolygon;
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 !== instance){
            this.eBoardCanvas.remove(instance);
        }
        instance = new FabricPolygon(points,{
            stroke:stroke,
            strokeDashArray:this.strokeDashArray,
            strokeWidth:this.getCanvasPixel(this.strokeWidth),
            fill:fill,
        }).setId(id);
        this.eBoardCanvas.add(instance);
        this.eBoardCanvas.requestRenderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
    
    protected clear(){
        super.clear();
        this.circle=undefined as any;
        this.points=[];
    }
}

export {Polygon};