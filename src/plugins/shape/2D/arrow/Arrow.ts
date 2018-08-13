/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/25 10:51
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/7/25 10:51
 * @disc:箭头
 */

import {message, setCursor} from '../../../../utils/decorators';
import {IEvent} from '~fabric/fabric-impl';
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import DefaultFactory from './factory/default';
import {
    IMessage,
    MessageTagEnum,
} from '../../../../middlewares/MessageMiddleWare';
import {Arrow as FabricArrow} from '../../../../extends/Arrow';
import {CursorTypeEnum} from '../../../../cursor/Enum';

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
    mode:ArrowMode;
    fill:string;
    stroke:string;
}

@setCursor(CursorTypeEnum.Cross)
class Arrow extends AbstractShapePlugin{
    protected instance:FabricArrow;
    protected stroke="rgb(0,0,0)";
    protected fill="rgba(0,0,0,1)";
    private lineWidth:number=1;
    private arrowFactory:ArrowFactory=ArrowFactory.FISH;
    protected arrowMode:ArrowMode=ArrowMode.ALL;
    private calcOptions(start:{x:number;y:number},end:{x:number;y:number},mode:ArrowMode){
        const arrowFactory = require(`./factory/${this.arrowFactory}`).default as typeof DefaultFactory;
        const headlen = Math.max(this.lineWidth * 2 +10,10);
        const {path,fill} = arrowFactory.calcPath(start,end,30,headlen,mode,this.getFillColor());
        return {path,fill};
    }
    @message
    private throw(){
        return this.instance?{
            id:this.instance.id,
            tag:MessageTagEnum.Shape,
            start:this.start,
            end:this.end,
            type:this.instance.type,
            mode:this.arrowMode,
            fill:this.instance.fill,
            stroke:this.instance.stroke
        }:undefined;
    }
    protected onMouseMove(event:IEvent){
        if(void 0 === this.start){
            return;
        }
        super.onMouseMove(event);
        const {path,fill} = this.calcOptions(this.start,this.end,this.arrowMode);
        const center = {
            x:(this.start.x+this.end.x)/2,
            y:(this.start.y+this.end.y)/2,
        };
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 !== this.instance){
            this.eBoardCanvas.remove(this.instance);
        }
        const id = this.instance?this.instance.id:undefined;
        this.instance=new FabricArrow(path,{
            stroke: this.getStrokeColor(),
            strokeWidth:this.lineWidth,
            top:center.y,
            left:center.x,
            fill,
            originX:"center",
            originY:"center"
        });
        if(void 0 !== id){
            this.instance.setId(id);
        }
        this.throw();
        this.eBoardCanvas.add(this.instance);
        this.eBoardCanvas.renderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
    
    protected onMouseUp(event:IEvent){
        this.throw();
        super.onMouseUp(event);
    }
    
    /**
     * 消息处理
     * @param {IArrowMessage} message
     */
    public onMessage(message:IArrowMessage){
        const {id,start,end,mode,stroke,fill} = message;
        let instance = this.getInstanceById(id) as FabricArrow;
        this.eBoardCanvas.renderOnAddRemove=false;
        const {path} = this.calcOptions(start,end,mode);
        if(void 0 !== instance){
            this.eBoardCanvas.remove(instance);
        }
        const center = {
            x:(start.x+end.x)/2,
            y:(start.y+end.y)/2,
        };
        instance = new FabricArrow(path,{
            stroke: stroke,
            strokeWidth:this.lineWidth,
            fill,
            originX:"center",
            originY:"center",
            top:center.y,
            left:center.x,
        }).setId(id);
        this.eBoardCanvas.add(instance);
        this.eBoardCanvas.requestRenderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
    
}

export {Arrow};