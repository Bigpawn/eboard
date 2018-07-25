/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/13 12:51
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/13 12:51
 * @disc:矩形Plugin  还可以使用Path实现   flipX flipY 不起作用，使用动态计算left top实现四象限
 */

import {EBoardCanvas} from '../../../../EBoardCanvas';
import {fabric} from "fabric";
import {EBoardEngine} from '../../../../EBoardEngine';
import {ctrlKeyEnable} from '../../../../utils/decorators';
import {AbstractShapePlugin, Quadrant} from '../../AbstractShapePlugin';
import {IEvent} from '~fabric/fabric-impl';
import {
    IMessage,
    MessageTagEnum,
} from '../../../../middlewares/MessageMiddleWare';
import {MessageIdMiddleWare} from '../../../../middlewares/MessageIdMiddleWare';

export declare interface IRectangleMessage extends IMessage{
    start:{x:number;y:number};
    width:number;
    height:number;
}


@ctrlKeyEnable(true)
class Rectangle extends AbstractShapePlugin{
    protected instance:fabric.Rect;
    private fill?:string;
    private stroke?:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    protected ctrlKeyEnable:boolean;
    protected ctrlKey:boolean=false;
    private type="rectangle";
    constructor(canvas:EBoardCanvas,eBoardEngine:EBoardEngine){
        super(canvas,eBoardEngine);
    }
    private newInstance(start:{x:number;y:number},width:number,height:number,type?:string){
        const instance = new fabric.Rect({
            type:type||`${this.type}_${Date.now()}`,
            fill:this.fill,
            left: start.x,
            top: start.y,
            stroke:this.stroke,
            strokeDashArray:this.strokeDashArray,
            width:width,
            height:height,
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
    private getCtrlStartPoint(length:number):{x:number;y:number}{
        const start = this.start;
        const end = this.end;
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
        const pos = this.end;
        const width=Math.abs(pos.x-this.start.x);
        const height=Math.abs(pos.y-this.start.y);
        const length = Math.min(width,height);
        const startPoint = this.ctrlKey?this.getCtrlStartPoint(length):this.getStartPoint();
        if(this.instance){
            this.instance.set({
                width:this.ctrlKey?length:width,
                height:this.ctrlKey?length:height,
                left: startPoint.x,
                top: startPoint.y,
            }).setCoords();
            this.eBoardCanvas.renderAll();
            this.throw(MessageTagEnum.Temporary);
        }else{
            this.instance=this.newInstance(this.start,this.ctrlKey?length:width,this.ctrlKey?length:height);
            this.throw(MessageTagEnum.Start);
        }
    };
    protected ctrlKeyDownHandler(e:KeyboardEvent){
        // 判断是否处于绘制模式
        const keyCode = e.keyCode;
        if(17===keyCode){
            this.ctrlKey=true;
            if(void 0 === this.start || void 0 === this.instance){
                return;
            }
      
            const width=Math.abs(this.end.x-this.start.x);
            const height=Math.abs(this.end.y-this.start.y);
            const length = Math.min(width,height);
            const startPoint = this.getCtrlStartPoint(length);
            if(width===this.instance.width&&height===this.instance.height&&startPoint.x===this.instance.left&&startPoint.y===this.instance.top){
                return;
            }
            this.instance.set({
                width:length,
                height:length,
                left:startPoint.x,
                top:startPoint.y
            }).setCoords();
            this.eBoardCanvas.renderAll();
            this.throw(MessageTagEnum.Temporary);
        }
    }
    protected ctrlKeyUpHandler(e:KeyboardEvent){
        const keyCode = e.keyCode;
        if(17===keyCode){
            // 恢复
            this.ctrlKey=false;
            if(void 0 === this.instance){
                return;
            }
            const width=Math.abs(this.end.x-this.start.x);
            const height=Math.abs(this.end.y-this.start.y);
            const startPoint = this.getStartPoint();
            this.instance.set({
                width:width,
                height:height,
                left:startPoint.x,
                top:startPoint.y
            }).setCoords();
            this.eBoardCanvas.renderAll();
            this.throw(MessageTagEnum.Temporary);
        }
    }
    protected onMouseUp(event:IEvent){
        this.throw(MessageTagEnum.End);
        super.onMouseUp(event);
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
            start:{x:this.instance.left as number,y:this.instance.top as number},
            width:this.instance.width,
            height:this.instance.height,
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
    public onMessage(message:IRectangleMessage){
        const {type,start,width,height,tag} = message;
        let instance = this.getInstanceById(type) as fabric.Rect;
        switch (tag){
            case MessageTagEnum.Start:
                if(void 0 === instance){
                    instance=this.newInstance(start,width,height,type);
                }
                break;
            case MessageTagEnum.Temporary:
            case MessageTagEnum.End:
                // 如果有则更新，否则创建
                this.eBoardCanvas.renderOnAddRemove=false;
                if(void 0 === instance){
                    instance=this.newInstance(start,width,height,type);
                }
                instance.set({
                    width:width,
                    height:height,
                    left:start.x,
                    top:start.y
                }).setCoords();
                this.eBoardCanvas.renderAll();
                this.eBoardCanvas.renderOnAddRemove=true;
                break;
            default:
                break;
        }
    }
}

export {Rectangle};