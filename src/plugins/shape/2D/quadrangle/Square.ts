/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/13 15:40
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/13 15:40
 * @disc:Square 正方形 extends Rectangle without Ctrl KeyEvent;
 * 修改成起点为正方形中心点，终点为正方形一个角，自动旋转
 */
import {fabric} from "fabric";
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import {IEvent} from '~fabric/fabric-impl';
import {
    IMessage,
    MessageTagEnum,
} from '../../../../middlewares/MessageMiddleWare';
import {MessageIdMiddleWare} from '../../../../middlewares/MessageIdMiddleWare';

export declare interface ISquareMessage extends IMessage{
    start:{x:number;y:number};
    length:number;
    angle:number;
}



class Square extends AbstractShapePlugin{
    protected instance:fabric.Rect;
    private fill?:string;
    private stroke?:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    private type="square";
    private newInstance(center:{x:number;y:number},length:number,angle:number,type?:string){
        const instance = new fabric.Rect({
            type:type||`${this.type}_${Date.now()}`,
            fill:this.fill,
            left: center.x,
            top: center.y,
            stroke:this.stroke,
            strokeDashArray:this.strokeDashArray,
            strokeWidth:this.getCanvasPixel(this.strokeWidth),
            originX:"center",
            originY:"center",
            width:length,
            height:length,
            angle:angle
        });
        this.eBoardCanvas.add(instance);
        return instance;
    }
    
    protected onMouseMove(event:IEvent){
        if(void 0 === this.start){
            return;
        }
        super.onMouseMove(event);
        const pos = this.end;
        const width=Math.abs(pos.x-this.start.x);
        const height=Math.abs(pos.y-this.start.y);
        const length = Math.sqrt(2) * Math.sqrt(Math.pow(width,2)+Math.pow(height,2));
        const angle = this.calcAngle(pos);
        if(void 0 === this.instance){
            this.instance=this.newInstance(this.start,length,angle-45);
            this.throw(MessageTagEnum.Start);
        }else{
            this.instance.set({
                width:length,
                height:length,
                angle:angle-45
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
            length:this.instance.width,
            angle:this.instance.angle
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
    public onMessage(message:ISquareMessage){
        const {type,start,length,angle,tag} = message;
        let instance = this.getInstanceById(type) as fabric.Rect;
        switch (tag){
            case MessageTagEnum.Start:
                if(void 0 === instance){
                    instance=this.newInstance(start,length,angle,type);
                }
                break;
            case MessageTagEnum.Temporary:
            case MessageTagEnum.End:
                // 如果有则更新，否则创建
                this.eBoardCanvas.renderOnAddRemove=false;
                if(void 0 === instance){
                    instance=this.newInstance(start,length,angle,type);
                }
                instance.set({
                    width:length,
                    height:length,
                    angle:angle
                }).setCoords();
                this.eBoardCanvas.renderAll();
                this.eBoardCanvas.renderOnAddRemove=true;
                break;
            default:
                break;
        }
    }
}

export {Square}