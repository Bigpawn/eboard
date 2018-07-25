/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/15 14:58
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/15 14:58
 * @disc:直角三角形 继承自Path
 */
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import {IEvent} from '~fabric/fabric-impl';
import {OrTriangle} from '../../../../extends/OrTriangle';
import {
    IMessage,
    MessageTagEnum,
} from '../../../../middlewares/MessageMiddleWare';
import {MessageIdMiddleWare} from '../../../../middlewares/MessageIdMiddleWare';
import {fabric} from "fabric";

export declare interface IOrthogonalTriangleMessage extends IMessage{
    points:any[]
}

class OrthogonalTriangle extends AbstractShapePlugin{
    protected instance:OrTriangle;
    private fill?:string;
    private stroke?:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    private type="orthogonal-triangle";
    private newInstance(points:any[],type?:string){
        const instance = new OrTriangle(points, {
            type:type||`${this.type}_${Date.now()}`,
            stroke: this.stroke,
            strokeWidth: this.getCanvasPixel(this.strokeWidth),
            strokeDashArray:this.strokeDashArray,
            fill: this.fill,
        });
        this.eBoardCanvas.add(instance);
        return instance;
    }
    protected onMouseMove(event:IEvent){
        if(void 0 === this.start){
            return;
        }
        super.onMouseMove(event);
        const points= OrTriangle.calcPointsByCursorPoint(this.start,this.end);
        if(void 0 ===this.instance){
            this.instance=this.newInstance(points);
            this.throw(MessageTagEnum.Start);
        }else{
            this.eBoardCanvas.renderOnAddRemove=false;
            this.eBoardCanvas.remove(this.instance);
            this.instance=this.newInstance(points,this.instance.type);
            this.eBoardCanvas.renderAll();
            this.eBoardCanvas.renderOnAddRemove=false;
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
            type:this.instance.type as string,
            messageId:MessageIdMiddleWare.getId(),
            tag:tag,
            points:this.instance.points
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
    public onMessage(message:IOrthogonalTriangleMessage){
        const {type,tag,points} = message;
        let instance = this.getInstanceById(type) as fabric.Triangle;
        switch (tag){
            case MessageTagEnum.Start:
                if(void 0 === instance){
                    instance=this.newInstance(points,type);
                }
                break;
            case MessageTagEnum.Temporary:
            case MessageTagEnum.End:
                // 如果有则更新，否则创建
                this.eBoardCanvas.renderOnAddRemove=false;
                this.eBoardCanvas.remove(instance);
                instance=this.newInstance(points,type);
                this.eBoardCanvas.renderAll();
                this.eBoardCanvas.renderOnAddRemove=true;
                break;
            default:
                break;
        }
    }
}
export {OrthogonalTriangle};