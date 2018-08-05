/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/12 21:10
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/12 21:10
 * @disc:Circle  坐标采用四舍五入规则取整
 *      instanceId: type
 */

import {message, setCursor} from '../../../../utils/decorators';
import {CursorTypeName} from '../../../tool/cursor/CursorType';
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import {IEvent} from "~fabric/fabric-impl";
import {
    IMessage,
    MessageTagEnum,
} from '../../../../middlewares/MessageMiddleWare';
import {Circle as FabricCircle} from "../../../../extends/Circle";



export declare interface ICircleMessage extends IMessage{
    start:{x:number;y:number};
    radius:number;
}


@setCursor(CursorTypeName.Compass)
class Circle extends AbstractShapePlugin{
    private fill?:string;
    private stroke?:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    protected instance:FabricCircle;
    @message
    private startAction(){
        return {
            tag:MessageTagEnum.Start,
            id:this.instance.id,
            start:this.start,
            radius:this.instance.radius,
            type:this.instance.type
        }
    }
    @message
    private moveAction(){
        return {
            tag:MessageTagEnum.Temporary,
            id:this.instance.id,
            start:this.start,
            radius:this.instance.radius,
            type:this.instance.type
        }
    }
    @message
    private endAction(){
        return {
            tag:MessageTagEnum.End,
            id:this.instance.id,
            start:this.start,
            radius:this.instance.radius,
            type:this.instance.type
        }
    }
    protected onMouseMove(event:IEvent){
        if(void 0 ===this.start){
            return;
        }
        super.onMouseMove(event);
        const radius=Math.round(Math.sqrt(Math.pow(this.end.x-this.start.x,2)+Math.pow(this.end.y-this.start.y,2)));
        if(this.instance){
            this.instance.update({
                radius:radius,
            });
            this.eBoardCanvas.renderAll();
            this.moveAction();
        }else{
            this.instance=new FabricCircle({
                originX:"center",
                originY:"center",
                fill:this.fill,
                left: this.start.x,
                top: this.start.y,
                stroke:this.stroke,
                strokeDashArray:this.strokeDashArray,
                strokeWidth:this.getCanvasPixel(this.strokeWidth),
                radius:radius,
            });
            this.eBoardCanvas.add(this.instance);
            this.startAction();
        }
    };
    protected onMouseUp(event:IEvent){
        this.endAction()
        super.onMouseUp(event);
    }
    
    /**
     * 接收消息处理
     * @param {ICircleMessage} message
     */
    public onMessage(message:ICircleMessage){
        const {id,start,radius,tag} = message;
        let instance = this.getInstanceById(id) as FabricCircle;
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 === instance){
            instance=new FabricCircle({
                originX:"center",
                originY:"center",
                fill:this.fill,
                left: start.x,
                top: start.y,
                stroke:this.stroke,
                strokeDashArray:this.strokeDashArray,
                strokeWidth:this.getCanvasPixel(this.strokeWidth),
                radius:radius,
            }).setId(id);
            this.eBoardCanvas.add(instance);
        }
        switch (tag){
            case MessageTagEnum.Start:
                break;
            case MessageTagEnum.Temporary:
            case MessageTagEnum.End:
                instance.update({
                    radius:radius,
                });
                break;
            default:
                break;
        }
        this.eBoardCanvas.requestRenderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
}

export {Circle};