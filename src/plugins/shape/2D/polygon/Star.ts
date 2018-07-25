/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/16 12:55
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/16 12:55
 * @disc:五角星 extend Polygon
 */
import {FabricStar} from "../../../../extends/FabricStar";
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import {IEvent} from "~fabric/fabric-impl";
import {fabric} from "fabric";
import {
    IMessage,
    MessageTagEnum,
} from '../../../../middlewares/MessageMiddleWare';
import {MessageIdMiddleWare} from '../../../../middlewares/MessageIdMiddleWare';



export declare interface IStarMessage extends IMessage{
    points:any[];
    radius:number;
    start:{x:number;y:number};
}


class Star extends AbstractShapePlugin{
    protected instance:fabric.Polygon;
    private fill?:string;
    private stroke?:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    
    private newInstance(points:any[],radius:number,start:{x:number;y:number},type?:string){
        const instance = new FabricStar(points,{
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
        
        const points = FabricStar.calcPointsByRadius(this.start,radius,angle);
        if(void 0 ===this.instance){
            this.instance=this.newInstance(points,radius*2,this.start);
            this.throw(MessageTagEnum.Start);
        }else{
            // 不能重新创建实例，需要确保一个实例，保证uuid不变，否则会出现不停创建的消息
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
            radius:this.instance.width,
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
    public onMessage(message:IStarMessage){
        const {type,points,radius,start,tag} = message;
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
                    width:radius *2,
                    height:radius *2,
                }).setCoords();
                this.eBoardCanvas.renderAll();
                this.eBoardCanvas.renderOnAddRemove=true;
                break;
            default:
                break;
        }
    }
}

export {Star};