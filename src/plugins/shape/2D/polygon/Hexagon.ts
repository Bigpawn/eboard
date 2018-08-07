/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/16 17:58
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/16 17:58
 * @disc:六边形
 */
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import {IEvent} from '~fabric/fabric-impl';
import {
    IMessage,
    MessageTagEnum,
} from '../../../../middlewares/MessageMiddleWare';

import {Hexagon as FabricHexagon} from "../../../../extends/Hexagon";
import {message} from '../../../../utils/decorators';


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
    @message
    private startAction(){
        return {
            id:this.instance.id,
            tag:MessageTagEnum.Start,
            start:this.start,
            radius:this.instance.width,
            points:this.instance.points,
            type:this.instance.type
        }
    }
    @message
    private moveAction(){
        return {
            id:this.instance.id,
            tag:MessageTagEnum.Temporary,
            start:this.start,
            radius:this.instance.width,
            points:this.instance.points,
            type:this.instance.type
        }
    }
    @message
    private endAction(){
        return {
            id:this.instance.id,
            tag:MessageTagEnum.End,
            start:this.start,
            radius:this.instance.width,
            points:this.instance.points,
            type:this.instance.type
        }
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
            this.instance = new FabricHexagon(points,{
                stroke: this.stroke,
                strokeWidth: this.getCanvasPixel(this.strokeWidth),
                strokeDashArray:this.strokeDashArray,
                fill: this.fill,
                width:radius,
                height:radius,
                left:this.start.x,
                top:this.start.y,
                originY:"center",
                originX:"center"
            });
            this.eBoardCanvas.add(this.instance);
            this.startAction();
        }else{
            this.instance.update({
                points:points,
                width:radius *2,
                height:radius *2,
            });
            this.eBoardCanvas.renderAll();
            this.moveAction();
        }
    };
    
    protected onMouseUp(event:IEvent){
        if(void 0 !== this.instance){
            this.endAction();
        }
        super.onMouseUp(event);
    }
    
    /**
     * 接收消息处理
     * @param {ICircleMessage} message
     */
    public onMessage(message:IHexagonMessage){
        const {id,points,start,radius,tag} = message;
        let instance = this.getInstanceById(id) as FabricHexagon;
        this.eBoardCanvas.renderOnAddRemove=false;
        
        if(void 0 === instance){
            instance = new FabricHexagon(points,{
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
                    width:radius,
                    height:radius,
                });
                break;
            default:
                break;
        }
        this.eBoardCanvas.requestRenderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
}

export {Hexagon};