/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/12 21:10
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/12 21:10
 * @disc:Circle  坐标采用四舍五入规则取整
 *      instanceId: type
 */

import {fabric} from "fabric";
import {setCursor} from '../../../../utils/decorators';
import {CursorTypeName} from '../../../tool/cursor/CursorType';
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import {IEvent} from "~fabric/fabric-impl";
import {
    IMessage,
    MessageTagEnum,
} from '../../../../middlewares/MessageMiddleWare';
import {MessageIdMiddleWare} from '../../../../middlewares/MessageIdMiddleWare';

export declare interface ICircleMessage extends IMessage{
    point:{x:number;y:number};
    radius:number;
}


@setCursor(CursorTypeName.Compass)
class Circle extends AbstractShapePlugin{
    private fill?:string;
    private stroke?:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    protected instance:fabric.Circle;
    public type:string="circle";
    private newInstance(point:{x:number;y:number},radius:number,type?:string){
        const instance =  new fabric.Circle({
            type:type||`${this.type}_${Date.now()}`,
            originX:"center",
            originY:"center",
            fill:this.fill,
            left: point.x,
            top: point.y,
            stroke:this.stroke,
            strokeDashArray:this.strokeDashArray,
            strokeWidth:this.getCanvasPixel(this.strokeWidth),
            radius:radius,
        });
        this.eBoardCanvas.add(instance);
        return instance;
    }
    protected onMouseMove(event:IEvent){
        if(void 0 ===this.start){
            return;
        }
        super.onMouseMove(event);
        const radius=Math.round(Math.sqrt(Math.pow(this.end.x-this.start.x,2)+Math.pow(this.end.y-this.start.y,2)));
        if(this.instance){
            this.instance.set({
                radius:radius,
            }).setCoords();
            this.eBoardCanvas.renderAll();
            this.throw(MessageTagEnum.Temporary);// 不需要全部抛出消息
        }else{
            // 实例Id 支持
            this.instance=this.newInstance(this.start,radius);
            this.throw(MessageTagEnum.Start);
        }
    };
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
            point:this.start,
            radius:this.instance.radius,
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
    public onMessage(message:ICircleMessage){
        const {type,point,radius,tag} = message;
        let instance = this.getInstanceById(type) as fabric.Circle;
        switch (tag){
            case MessageTagEnum.Start:
                if(void 0 === instance){
                    instance=this.newInstance(point,radius,type);
                }
                break;
            case MessageTagEnum.Temporary:
            case MessageTagEnum.End:
                // 如果有则更新，否则创建
                this.eBoardCanvas.renderOnAddRemove=false;
                if(void 0 === instance){
                    instance=this.newInstance(point,radius,type);
                }
                instance.set({
                    radius:radius,
                }).setCoords();
                this.eBoardCanvas.renderAll();
                this.eBoardCanvas.renderOnAddRemove=true;
                break;
            default:
                break;
        }
    }
}

export {Circle};