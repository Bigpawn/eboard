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
import {MessageIdMiddleWare} from '../../../../middlewares/MessageIdMiddleWare';
import {OrthogonalTriangle as FabricOrthogonalTriangle} from "../../../../extends/OrthogonalTriangle";



export declare interface IOrthogonalTriangleMessage extends IMessage{
    points:any[]
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
        if(void 0 ===this.instance){
            this.instance = new FabricOrthogonalTriangle(points,{
                stroke: this.stroke,
                strokeWidth: this.getCanvasPixel(this.strokeWidth),
                strokeDashArray:this.strokeDashArray,
                fill: this.fill,
            });
            this.eBoardCanvas.add(this.instance);
            this.throw(MessageTagEnum.Start);
        }else{
            this.instance.update({
                points:points
            });
            this.eBoardCanvas.renderAll();
            this.throw(MessageTagEnum.Temporary);
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
            id:this.instance.id,
            messageId:MessageIdMiddleWare.getId(),
            tag:tag,
            points:this.instance.points
        });
    }
    
    /**
     * 接收消息处理
     * @param {ICircleMessage} message
     */
    public onMessage(message:IOrthogonalTriangleMessage){
        const {id,tag,points} = message;
        let instance = this.getInstanceById(id) as FabricOrthogonalTriangle;
        
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 === instance){
            instance = new FabricOrthogonalTriangle(points,{
                stroke: this.stroke,
                strokeWidth: this.getCanvasPixel(this.strokeWidth),
                strokeDashArray:this.strokeDashArray,
                fill: this.fill,
            }).setId(id);
            this.eBoardCanvas.add(instance);
        }
        switch (tag){
            case MessageTagEnum.Start:
                break;
            case MessageTagEnum.Temporary:
            case MessageTagEnum.End:
                instance.update({
                    points:points
                });
                break;
            default:
                break;
        }
        this.eBoardCanvas.renderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
}
export {OrthogonalTriangle};