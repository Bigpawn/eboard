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
import {Arrow as FabricArrow} from '../../../../extends/Arrow';
import {CursorTypeEnum} from '../../../../cursor/Enum';
import {IArrowMessage} from '../../../../interface/IMessage';
import {MessageTag} from '../../../../enums/MessageTag';

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

@setCursor(CursorTypeEnum.Cross)
class Arrow extends AbstractShapePlugin{
    protected instance:FabricArrow;
    private arrowFactory:ArrowFactory=ArrowFactory.FISH;
    protected arrowMode:ArrowMode=ArrowMode.ALL;
    private calcOptions(start:{x:number;y:number},end:{x:number;y:number},mode:ArrowMode){
        const arrowFactory = require(`./factory/${this.arrowFactory}`).default as typeof DefaultFactory;
        const headlen = Math.max(this.strokeWidth * 2 +10,10);
        const {path,fill} = arrowFactory.calcPath(start,end,30,headlen,mode,this.fill);
        return {path,fill};
    }
    @message
    private throw(){
        return this.instance?{
            id:this.instance.id,
            tag:MessageTag.Shape,
            start:this.start,
            end:this.end,
            type:this.instance.type,
            mode:this.arrowMode,
            fill:this.instance.fill,
            stroke:this.instance.stroke,
            strokeDashArray:this.instance.strokeDashArray
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
            stroke: this.stroke,
            strokeWidth:this.strokeWidth,
            top:center.y,
            left:center.x,
            fill,
            originX:"center",
            originY:"center",
            strokeDashArray:this.strokeDashArray,
        },this.eBoardCanvas);
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
        const {id,start,end,mode,stroke,fill,strokeDashArray} = message;
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
            strokeWidth:this.strokeWidth,
            fill,
            originX:"center",
            originY:"center",
            top:center.y,
            left:center.x,
            strokeDashArray:strokeDashArray,
        },this.eBoardCanvas).setId(id);
        this.eBoardCanvas.add(instance);
        this.eBoardCanvas.requestRenderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
    
}

export {Arrow};