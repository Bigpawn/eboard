/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/15 9:16
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/15 9:16
 * @disc:等边三角形
 * 会触发两次重绘  后期考虑优化
 */
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import {IEvent} from '~fabric/fabric-impl';
import {EqTriangle} from '../../../../extends/EqTriangle';
import {
    IMessage,
    MessageTagEnum,
} from '../../../../middlewares/MessageMiddleWare';
import {MessageIdMiddleWare} from '../../../../middlewares/MessageIdMiddleWare';


export declare interface IEquilateralTriangleMessage extends IMessage{
    points:any[];
    radius:number;
    start:{x:number,y:number}
}

class EquilateralTriangle extends AbstractShapePlugin{
    protected instance:EqTriangle;
    private fill?:string;
    private stroke?:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    private type="equilateral-triangle";
    private newInstance(points:any[],start:{x:number;y:number},radius:number,type?:string){
        const instance = new EqTriangle(points, {
            type:type||`${this.type}_${Date.now()}`,
            stroke: this.stroke,
            strokeWidth: this.getCanvasPixel(this.strokeWidth),
            strokeDashArray:this.strokeDashArray,
            fill: this.fill,
            width:radius,
            height:radius,
            left:start.x,
            top:start.y,
            originY:"center",
            originX:"center"
        });
        this.eBoardCanvas.add(instance);
        return instance;
    }
    protected onMouseMove(event:IEvent){
        if(void 0 === this.start){
            return;
        }
        super.onMouseMove(event);
        const radius = Math.sqrt(Math.pow(this.start.x-this.end.x,2)+Math.pow(this.start.y-this.end.y,2));
        const angle = this.calcAngle(this.end);
        const points = EqTriangle.calcPointsByRadius(this.start,radius,angle);
        
        if(void 0 ===this.instance){
            this.instance=this.newInstance(points,this.start,radius*2);
            this.throw(MessageTagEnum.Start);
        }else{
            this.instance.set({
                points:points,
                width:radius *2,
                height:radius *2,
            }).setCoords();
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
            type:this.instance.type as string,
            messageId:MessageIdMiddleWare.getId(),
            tag:tag,
            points:this.instance.points,
            start:this.start,
            radius:this.instance.width
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
    public onMessage(message:IEquilateralTriangleMessage){
        const {type,tag,points,start,radius} = message;
        let instance = this.getInstanceById(type) as EqTriangle;
        switch (tag){
            case MessageTagEnum.Start:
                if(void 0 === instance){
                    instance=this.newInstance(points,start,radius,type);
                }
                break;
            case MessageTagEnum.Temporary:
            case MessageTagEnum.End:
                // 如果有则更新，否则创建
                this.eBoardCanvas.renderOnAddRemove=false;
                if(void 0 === instance){
                    instance=this.newInstance(points,start,radius,type);
                }
                instance.set({
                    points:points,
                    width:radius,
                    height:radius,
                }).setCoords();
                this.eBoardCanvas.renderAll();
                this.eBoardCanvas.renderOnAddRemove=true;
                break;
            default:
                break;
        }
    }
}
export {EquilateralTriangle};