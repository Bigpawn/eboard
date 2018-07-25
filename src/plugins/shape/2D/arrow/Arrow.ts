/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/25 10:51
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/7/25 10:51
 * @disc:箭头
 */

import {fabric} from "fabric";
import {setCursor} from '../../../../utils/decorators';
import {CursorTypeName} from '../../../tool/cursor/CursorType';
import {IEvent} from '~fabric/fabric-impl';
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import DefaultFactory from './factory/default';
import {
    IMessage,
    MessageTagEnum,
} from '../../../../middlewares/MessageMiddleWare';
import {MessageIdMiddleWare} from '../../../../middlewares/MessageIdMiddleWare';

export enum ArrowMode{
    PREV,
    NEXT,
    ALL
}

export enum ArrowFactory{
    DEFAULT="default",
    HOLLOW="hollow",
    FISH="fish"
}

export declare interface IArrowMessage extends IMessage{
    start:{x:number;y:number};
    end:{x:number;y:number};
}

@setCursor(CursorTypeName.Pencil)
class Arrow extends AbstractShapePlugin{
    protected instance:fabric.Path;
    private type="arrow";
    private color="rgba(0,0,0,1)";
    private lineWidth:number=1;
    private arrowFactory:ArrowFactory=ArrowFactory.HOLLOW;
    private arrowMode:ArrowMode=ArrowMode.ALL;
    private newInstance(start:{x:number;y:number},end:{x:number;y:number},type?:string){
        const arrowFactory = require(`./factory/${this.arrowFactory}`).default as typeof DefaultFactory;
        const headlen = Math.max(this.lineWidth * 2 +10,10);
        const {path,fill} = arrowFactory.calcPath(start,end,30,headlen,this.arrowMode,this.color);
        const instance = new fabric.Path(path,{
            type:type?type:`${this.type}_${Date.now()}`,
            stroke: this.color,
            strokeWidth:this.lineWidth,
            fill:fill
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
            this.eBoardCanvas.renderOnAddRemove=false;
            this.eBoardCanvas.remove(this.instance);
            this.instance=this.newInstance(this.start,this.end,this.instance.type);
            this.eBoardCanvas.renderAll();
            this.eBoardCanvas.renderOnAddRemove=true;
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
     * @param {IArrowMessage} message
     */
    public onMessage(message:IArrowMessage){
        const {type,start,end,tag} = message;
        let instance = this.getInstanceById(type) as fabric.Path;
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
                if(void 0 !== instance){
                    this.eBoardCanvas.remove(instance);
                }
                instance=this.newInstance(start,end,type);
                this.eBoardCanvas.renderAll();
                this.eBoardCanvas.renderOnAddRemove=true;
                break;
            default:
                break;
        }
    }
    
}

export {Arrow};