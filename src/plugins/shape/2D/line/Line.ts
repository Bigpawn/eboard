/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/25 9:26
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/7/25 9:26
 * @disc:单存线条，与Arrow分开
 */
import {message, setCursor} from '../../../../utils/decorators';
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import {IEvent} from '~fabric/fabric-impl';
import {
    IMessage,
    MessageTagEnum,
} from '../../../../middlewares/MessageMiddleWare';
import {Line as FabricLine} from "../../../../extends/Line";
import {CursorTypeEnum} from '../../../../cursor/Enum';

export declare interface ILineMessage extends IMessage{
    start:{x:number;y:number};
    end:{x:number;y:number};
    stroke:string;
}

@setCursor(CursorTypeEnum.Cross)
class Line extends AbstractShapePlugin{
    protected instance:FabricLine;
    protected stroke="rgba(0,0,0,1)";
    private lineWidth:number=1;
    @message
    private throw(){
        return this.instance?{
            id:this.instance.id,
            tag:MessageTagEnum.Shape,
            start:this.start,
            end:this.end,
            type:this.instance.type,
            stroke:this.instance.stroke
        }:undefined
    }
    protected onMouseMove(event:IEvent){
        if(void 0 === this.start){
            return;
        }
        super.onMouseMove(event);
    
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 !== this.instance){
            this.eBoardCanvas.remove(this.instance);
        }
        const id = this.instance?this.instance.id:undefined;
        this.instance=new FabricLine([this.start.x,this.start.y,this.end.x,this.end.y],{
            stroke: this.getStrokeColor(),
            strokeWidth:this.getCanvasPixel(this.lineWidth)
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
     * @param {IEllipseMessage} message
     */
    public onMessage(message:ILineMessage){
        const {id,start,end,stroke} = message;
        let instance = this.getInstanceById(id) as FabricLine;
        this.eBoardCanvas.renderOnAddRemove=false;
    
        if(void 0 !== instance){
            this.eBoardCanvas.remove(instance);
        }
        instance= new FabricLine([start.x,start.y,end.x,end.y],{
            stroke: stroke,
            strokeWidth:this.getCanvasPixel(this.lineWidth)
        }).setId(id);
        this.eBoardCanvas.add(instance);
        this.eBoardCanvas.requestRenderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
}

export {Line};