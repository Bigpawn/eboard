/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/25 10:51
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/7/25 10:51
 * @disc:箭头
 */

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
import {Arrow as FabricArrow} from '../../../../extends/Arrow';

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
    protected instance:FabricArrow;
    private color="rgba(0,0,0,1)";
    private lineWidth:number=1;
    private arrowFactory:ArrowFactory=ArrowFactory.FISH;
    private arrowMode:ArrowMode=ArrowMode.ALL;
    private calcOptions(start:{x:number;y:number},end:{x:number;y:number}){
        const arrowFactory = require(`./factory/${this.arrowFactory}`).default as typeof DefaultFactory;
        const headlen = Math.max(this.lineWidth * 2 +10,10);
        const {path,fill} = arrowFactory.calcPath(start,end,30,headlen,this.arrowMode,this.color);
        return {path,fill};
    }
    protected onMouseMove(event:IEvent){
        if(void 0 === this.start){
            return;
        }
        super.onMouseMove(event);
        const {path,fill} = this.calcOptions(this.start,this.end);
        const center = {
            x:(this.start.x+this.end.x)/2,
            y:(this.start.y+this.end.y)/2,
        };
        if(void 0 === this.instance){
            this.instance=new FabricArrow(path,{
                stroke: this.color,
                strokeWidth:this.lineWidth,
                fill,
                originX:"center",
                originY:"center"
            });
            this.eBoardCanvas.add(this.instance);
            this.throw(MessageTagEnum.Start);
        }else{
            this.instance.update({
                path:path,
                top:center.y,
                left:center.x,
                width:Math.abs(this.start.x-this.end.x),
                height:Math.abs(this.start.y-this.end.y),
                pathOffset:center,
                originX:"center",
                originY:"center"
            });
            this.eBoardCanvas.renderAll();
            this.throw(MessageTagEnum.Temporary);
        }
    }
    
    protected onMouseUp(event:IEvent){
        this.throw(MessageTagEnum.End);
        super.onMouseUp(event);
        console.log(this.eBoardCanvas.getObjects());
    }
    
    private throw(tag:MessageTagEnum){
        // 需要生成一个消息的id 及实例的id
        if(void 0 === this.instance){
            return;
        }
        super.throwMessage({
            id:this.instance.id,
            messageId:MessageIdMiddleWare.getId(),
            tag:tag,
            start:this.start,
            end:this.end,
        });
    }
    
    /**
     * 消息处理
     * @param {IArrowMessage} message
     */
    public onMessage(message:IArrowMessage){
        const {id,start,end,tag} = message;
        let instance = this.getInstanceById(id) as FabricArrow;
        this.eBoardCanvas.renderOnAddRemove=false;
        const {path,fill} = this.calcOptions(start,end);
        if(void 0 === instance){
            instance = new FabricArrow(path,{
                stroke: this.color,
                strokeWidth:this.lineWidth,
                fill,
                originX:"center",
                originY:"center"
            }).setId(id);
            this.eBoardCanvas.add(instance);
        }
        switch (tag){
            case MessageTagEnum.Start:
                break;
            case MessageTagEnum.Temporary:
            case MessageTagEnum.End:
                const center = {
                    x:(this.start.x+this.end.x)/2,
                    y:(this.start.y+this.end.y)/2,
                };
                instance.update({
                    path:path,
                    top:center.y,
                    left:center.x,
                    width:Math.abs(start.x-end.x),
                    height:Math.abs(start.y-end.y),
                    pathOffset:center,
                    originX:"center",
                    originY:"center"
                });
                break;
            default:
                break;
        }
        this.eBoardCanvas.renderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
    
}

export {Arrow};