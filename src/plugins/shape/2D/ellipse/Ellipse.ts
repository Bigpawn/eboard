/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/12 21:38
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/12 21:38
 * @disc:Ellipse  flip翻转属性不起作用，使用动态计算起点位置实现
 * @changelist:
 *      1. 坐标取整：2018/07/25
 */

import {EBoardCanvas} from '../../../../EBoardCanvas';
import {fabric} from "fabric";
import {EBoardEngine} from '../../../../EBoardEngine';
import {AbstractShapePlugin, Quadrant} from '../../AbstractShapePlugin';
import {IEvent} from '~fabric/fabric-impl';
import {MessageIdMiddleWare} from '../../../../middlewares/MessageIdMiddleWare';
import {
    IMessage,
    MessageTagEnum,
} from '../../../../middlewares/MessageMiddleWare';


export declare interface IEllipseMessage extends IMessage{
    point:{x:number;y:number};
    rx:number;
    ry:number;
}

class Ellipse extends AbstractShapePlugin{
    private type="ellipse";
    protected instance:fabric.Ellipse;
    private fill?:string;
    private stroke?:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    private ctrlKey:boolean=false;
    constructor(canvas:EBoardCanvas,eBoardEngine:EBoardEngine){
        super(canvas,eBoardEngine);
    }
    private newInstance(point:{x:number;y:number},rx:number,ry:number,type?:string){
        const instance = new fabric.Ellipse({
            type:type||`${this.type}_${Date.now()}`,
            fill:this.fill,
            left: point.x,
            top: point.y,
            rx:rx,
            ry:ry,
            stroke:this.stroke,
            strokeDashArray:this.strokeDashArray,
            strokeWidth:this.getCanvasPixel(this.strokeWidth)
        });
        this.eBoardCanvas.add(instance);
        return instance;
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
        const rx=Math.round(Math.abs(this.end.x-this.start.x)/2);
        const ry=Math.round(Math.abs(this.end.y-this.start.y)/2);
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
            this.throw(MessageTagEnum.Temporary);// 不需要全部抛出消息
        }else{
            this.instance=this.newInstance(startPoint,this.ctrlKey?radius:rx,this.ctrlKey?radius:ry);
            this.throw(MessageTagEnum.Start);
        }
    };
    protected onMouseUp(event:IEvent){
        this.throw(MessageTagEnum.End);
        super.onMouseUp(event);
    }
    protected ctrlKeyDownHandler(e:KeyboardEvent){
        // 判断是否处于绘制模式
        const keyCode = e.keyCode;
        if(17===keyCode){
            this.ctrlKey=true;
            if(void 0 === this.instance||void 0 === this.start){
                return;
            }
            const rx=Math.round(Math.abs(this.end.x-this.start.x)/2);
            const ry=Math.round(Math.abs(this.end.y-this.start.y)/2);
            const radius = Math.min(rx,ry);
            const startPoint = this.getCtrlStartPoint(radius);
            if(radius===this.instance.rx&&radius===this.instance.ry&&startPoint.x===this.start.x&&startPoint.y===this.start.y){
                return;
            }
            this.instance.set({
                rx:radius,
                ry:radius,
                left: startPoint.x,
                top: startPoint.y,
            }).setCoords();
            this.eBoardCanvas.renderAll();
            this.throw(MessageTagEnum.Temporary);// 不需要全部抛出消息
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
            const rx=Math.round(Math.abs(this.end.x-this.start.x)/2);
            const ry=Math.round(Math.abs(this.end.y-this.start.y)/2);
            const startPoint = this.getStartPoint();
            this.instance.set({
                rx:rx,
                ry:ry,
                left: startPoint.x,
                top: startPoint.y,
            }).setCoords();
            this.eBoardCanvas.renderAll();
            this.throw(MessageTagEnum.Temporary);// 不需要全部抛出消息
        }
    }
    
    private throw(tag:MessageTagEnum){
        // 需要生成一个消息的id 及实例的id
        if(void 0 === this.instance){
            return;
        }
        super.throwMessage({
            type:this.instance.type as string,
            messageId:MessageIdMiddleWare.getId(),
            tag:tag,
            point:this.start,
            rx:this.instance.rx,
            ry:this.instance.ry,
        });
    }
    
    /**
     * 通过id获取实例
     * @param {number} id
     * @returns {"~fabric/fabric-impl".Circle | undefined}
     */
    private getInstanceById(type:string){
        return this.eBoardCanvas.getObjects(type)[0];
    }
    
    /**
     * 接收消息处理
     * @param {ICircleMessage} message
     */
    public onMessage(message:IEllipseMessage){
        const {type,point,rx,ry,tag} = message;
        let instance = this.getInstanceById(type) as fabric.Ellipse;
        switch (tag){
            case MessageTagEnum.Start:
                if(void 0 === instance){
                    instance=this.newInstance(point,rx,ry,type);
                }
                break;
            case MessageTagEnum.Temporary:
            case MessageTagEnum.End:
                // 如果有则更新，否则创建
                this.eBoardCanvas.renderOnAddRemove=false;
                if(void 0 === instance){
                    instance=this.newInstance(point,rx,ry,type);
                }
                instance.set({
                    rx:rx,
                    ry:ry,
                    left: point.x,
                    top: point.y,
                }).setCoords();
                this.eBoardCanvas.renderAll();
                this.eBoardCanvas.renderOnAddRemove=true;
                break;
            default:
                break;
        }
    }
    
}

export {Ellipse};