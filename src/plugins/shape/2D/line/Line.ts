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
    private startAction(){
        return {
            id:this.instance.id,
            tag:MessageTagEnum.Start,
            start:this.start,
            end:this.end,
            type:this.instance.type,
            stroke:this.instance.stroke
        }
    }
    @message
    private moveAction(){
        return {
            id:this.instance.id,
            tag:MessageTagEnum.Temporary,
            start:this.start,
            end:this.end,
            type:this.instance.type,
            stroke:this.instance.stroke
        }
    }
    @message
    private endAction(){
        return {
            id:this.instance.id,
            tag:MessageTagEnum.End,
            start:this.start,
            end:this.end,
            type:this.instance.type,
            stroke:this.instance.stroke
        }
    }
    protected onMouseMove(event:IEvent){
        if(void 0 === this.start){
            return;
        }
        super.onMouseMove(event);
        if(void 0 === this.instance){
            this.instance=new FabricLine([this.start.x,this.start.y,this.end.x,this.end.y],{
                stroke: this.getStrokeColor(),
                strokeWidth:this.getCanvasPixel(this.lineWidth)
            });
            this.eBoardCanvas.add(this.instance);
            this.startAction();
        }else{
            this.instance.update({
                x1:this.start.x,
                y1:this.start.y,
                y2:this.end.y,
                x2:this.end.x,
            });
            this.eBoardCanvas.renderAll();
            this.moveAction();
        }
    }
    
    protected onMouseUp(event:IEvent){
        if(void 0 !== this.instance){
            this.endAction();
        }
        super.onMouseUp(event);
    }
    
    /**
     * 消息处理
     * @param {IEllipseMessage} message
     */
    public onMessage(message:ILineMessage){
        const {id,start,end,tag,stroke} = message;
        let instance = this.getInstanceById(id) as FabricLine;
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 === instance){
            instance = new FabricLine([start.x,start.y,end.x,end.y],{
                stroke: stroke,
                strokeWidth:this.getCanvasPixel(this.lineWidth)
            }).setId(id);
            this.eBoardCanvas.add(instance);
        }
        
        switch (tag){
            case MessageTagEnum.Start:
                break;
            case MessageTagEnum.Temporary:
            case MessageTagEnum.End:
                instance.update({
                    x1:start.x,
                    y1:start.y,
                    y2:end.y,
                    x2:end.x,
                });
                break;
            default:
                break;
        }
        this.eBoardCanvas.renderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
}

export {Line};