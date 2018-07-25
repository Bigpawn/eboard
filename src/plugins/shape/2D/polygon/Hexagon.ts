/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/16 17:58
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/16 17:58
 * @disc:六边形  暂不支持旋转
 */
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import {FabricHexagon} from '../../../../extends/FabricHexagon';
import {IEvent} from '~fabric/fabric-impl';
import {MessageIdMiddleWare} from '../../../../middlewares/MessageIdMiddleWare';
import {
    IMessage,
    MessageTagEnum,
} from '../../../../middlewares/MessageMiddleWare';
import {fabric} from "fabric";

export declare interface IHexagonMessage extends IMessage{
    start:{x:number;y:number};
    radius:number;
    points:any[]
}

class Hexagon extends AbstractShapePlugin{
    protected instance:FabricHexagon;
    private fill?:string;
    private stroke?:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    private type="hexagon";
    private newInstance(points:any[],radius:number,start:{x:number;y:number},type?:string){
        const instance = new FabricHexagon(points, {
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
        const angle =this.calcAngle(this.end);
        const points = FabricHexagon.calcPointsByRadius(this.start,radius,angle);
        if(void 0 ===this.instance){
            this.instance=this.newInstance(points,radius * 2,this.start);
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
            start:this.start,
            radius:this.instance.width,
            points:this.instance.points
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
     * 接收消息处理
     * @param {ICircleMessage} message
     */
    public onMessage(message:IHexagonMessage){
        const {type,points,start,radius,tag} = message;
        let instance = this.getInstanceById(type) as fabric.Polygon;
        switch (tag){
            case MessageTagEnum.Start:
                if(void 0 === instance){
                    instance=this.newInstance(points,radius,start,type);
                }
                break;
            case MessageTagEnum.Temporary:
            case MessageTagEnum.End:
                // 如果有则更新，否则创建
                this.eBoardCanvas.renderOnAddRemove=false;
                if(void 0 === instance){
                    instance=this.newInstance(points,radius,start,type);
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

export {Hexagon};