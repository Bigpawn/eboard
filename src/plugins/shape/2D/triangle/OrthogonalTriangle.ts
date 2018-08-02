/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/15 14:58
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/15 14:58
 * @disc:直角三角形 继承自Path
 */
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import {IEvent} from '~fabric/fabric-impl';
import {
    IMessage,
    MessageTagEnum,
} from '../../../../middlewares/MessageMiddleWare';
import {OrthogonalTriangle as FabricOrthogonalTriangle} from "../../../../extends/OrthogonalTriangle";
import {message} from '../../../../utils/decorators';



export declare interface IOrthogonalTriangleMessage extends IMessage{
    points:any[];
    start:{x:number;y:number}
}

class OrthogonalTriangle extends AbstractShapePlugin{
    protected instance:FabricOrthogonalTriangle;
    private fill?:string;
    private stroke?:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    protected onMouseMove(event:IEvent){
        if(void 0 === this.start){
            return;
        }
        super.onMouseMove(event);
        const points= FabricOrthogonalTriangle.calcPointsByCursorPoint(this.start,this.end);
        const width = Math.abs(this.end.x-this.start.x);
        const height = Math.abs(this.end.y-this.start.y);
        const center = {
            x:(this.start.x+this.end.x)/2,
            y:(this.start.y+this.end.y)/2,
        };
        if(void 0 ===this.instance){
            this.instance = new FabricOrthogonalTriangle(points,{
                stroke: this.stroke,
                strokeWidth: this.getCanvasPixel(this.strokeWidth),
                strokeDashArray:this.strokeDashArray,
                fill: this.fill,
                left:center.x,
                top:center.y,
                originY:"center",
                originX:"center",
                width:width,
                height:height,
            });
            this.eBoardCanvas.add(this.instance);
            this.throw(MessageTagEnum.Start);
        }else{
            this.instance.update({
                points:points,
                width:width,
                height:height,
                left:center.x,
                top:center.y,
                originY:"center",
                originX:"center",
                pathOffset:center
            });
            this.eBoardCanvas.renderAll();
            this.throw(MessageTagEnum.Temporary);
        }
    };
    protected onMouseUp(event:IEvent){
        this.throw(MessageTagEnum.End);
        super.onMouseUp(event);
    }
    @message
    private throw(tag:MessageTagEnum){
        return {
            id:this.instance.id,
            start:this.instance.pathOffset,
            tag:tag,
            points:this.instance.points,
            width:this.instance.width,
            height:this.instance.height,
            type:this.instance.type
        };
    }
    
    /**
     * 接收消息处理
     * @param {ICircleMessage} message
     */
    public onMessage(message:IOrthogonalTriangleMessage){
        const {id,tag,points,start,width,height} = message;
        let instance = this.getInstanceById(id) as FabricOrthogonalTriangle;
        
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 === instance){
            instance = new FabricOrthogonalTriangle(points,{
                stroke: this.stroke,
                strokeWidth: this.getCanvasPixel(this.strokeWidth),
                strokeDashArray:this.strokeDashArray,
                fill: this.fill,
                left:start.x,
                top:start.y,
                originY:"center",
                originX:"center",
                width:width,
                height:height,
            }).setId(id);
            this.eBoardCanvas.add(instance);
        }
        switch (tag){
            case MessageTagEnum.Start:
                break;
            case MessageTagEnum.Temporary:
            case MessageTagEnum.End:
                instance.update({
                    points:points,
                    width:width,
                    height:height,
                    left:start.x,
                    top:start.y,
                    originY:"center",
                    originX:"center",
                    pathOffset:start
                });
                break;
            default:
                break;
        }
        this.eBoardCanvas.requestRenderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
}
export {OrthogonalTriangle};