/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/25 9:26
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/7/25 9:26
 * @disc:单存线条，与Arrow分开
 */
import {setCursor} from '../../../../utils/decorators';
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import {CursorTypeName} from '../../../tool/cursor/CursorType';
import {fabric} from "fabric";
import {IEvent} from '~fabric/fabric-impl';
import {MessageIdMiddleWare} from '../../../../middlewares/MessageIdMiddleWare';
import {
    IMessage,
    MessageTagEnum,
} from '../../../../middlewares/MessageMiddleWare';

export declare interface ILineMessage extends IMessage{
    start:{x:number;y:number};
    end:{x:number;y:number};
}


@setCursor(CursorTypeName.Pencil)
class Line extends AbstractShapePlugin{
    private type="line";
    protected instance:fabric.Line;
    private color="rgba(0,0,0,1)";
    private lineWidth:number=1;
    private newInstance(start:{x:number;y:number},end:{x:number;y:number},type?:string){
        const instance = new fabric.Line([start.x,start.y,end.x,end.y],{
            type:type||`${this.type}_${Date.now()}`,
            stroke: this.color,
            strokeWidth:this.getCanvasPixel(this.lineWidth)
        });
        this.eBoardCanvas.add(instance);
        return instance;
    }
    protected onMouseMove(event:IEvent){
        if(void 0 === this.start){
            return;
        }
        super.onMouseMove(event);
        if(void 0 === this.instance){
            this.instance=this.newInstance(this.start,this.end);
            this.throw(MessageTagEnum.Start);
        }else{
            this.instance.set({
                y2:this.end.y,
                x2:this.end.x,
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
            start:this.start,
            end:this.end
        });
    }
    
    /**
     * 通过id获取实例
     * @returns {"~fabric/fabric-impl".Circle | undefined}
     * @param type
     */
    private getInstanceById(type:string){
        return this.eBoardCanvas.getObjects(type)[0];
    }
    
    /**
     * 消息处理
     * @param {IEllipseMessage} message
     */
    public onMessage(message:ILineMessage){
        const {type,start,end,tag} = message;
        let instance = this.getInstanceById(type) as fabric.Line;
        switch (tag){
            case MessageTagEnum.Start:
                if(void 0 === instance){
                    instance=this.newInstance(start,end,type);
                }
                break;
            case MessageTagEnum.Temporary:
            case MessageTagEnum.End:
                // 如果有则更新，否则创建
                this.eBoardCanvas.renderOnAddRemove=false;
                if(void 0 === instance){
                    instance=this.newInstance(start,end,type);
                }
                instance.set({
                    y2:end.y,
                    x2:end.x,
                }).setCoords();
                this.eBoardCanvas.renderAll();
                this.eBoardCanvas.renderOnAddRemove=true;
                break;
            default:
                break;
        }
    }
}

export {Line};