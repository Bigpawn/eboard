/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/12 21:10
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/12 21:10
 * @disc:Circle  坐标采用四舍五入规则取整
 *      instanceId: type
 */

import {
    authorityAssist,
    message,
    setCursor,
} from '../../../../utils/decorators';
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import {IEvent} from "~fabric/fabric-impl";
import {Circle as FabricCircle} from "../../../../extends/Circle";
import {ICircleMessage} from '../../../../interface/IMessage';
import {MessageTag} from '../../../../enums/MessageTag';
import {CursorType} from '../../../../enums/CursorType';


@setCursor(CursorType.SystemCross)
class Circle extends AbstractShapePlugin{
    public readonly type:string="circle";
    protected instance:FabricCircle;
    @message
    private throw(){
        return this.instance?{
            tag:MessageTag.Shape,
            id:this.instance.id,
            left:this.start.x,
            top:this.start.y,
            radius:this.instance.radius,
            type:this.type,
            stroke:this.instance.stroke,
            fill:this.instance.fill,
            strokeWidth:this.instance.strokeWidth,
            strokeDashArray:this.instance.strokeDashArray
        }:undefined
    }
    @authorityAssist
    protected onMouseMove(event:IEvent){
        if(void 0 ===this.start){
            return;
        }
        super.onMouseMove(event);
        const radius=Math.round(Math.sqrt(Math.pow(this.end.x-this.start.x,2)+Math.pow(this.end.y-this.start.y,2)));
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 !== this.instance){
            this.eBoardCanvas.remove(this.instance);
        }
        const id = this.instance?this.instance.id:undefined;
        this.instance=new FabricCircle({
            originX:"center",
            originY:"center",
            fill:this.fill,
            left: this.start.x,
            top: this.start.y,
            stroke:this.stroke,
            strokeDashArray:this.strokeDashArray,
            strokeWidth:this.strokeWidth,
            radius:radius,
        },this.eBoardCanvas);
        if(void 0 !== id){
            this.instance.setId(id);
        }
        this.throw();
        this.eBoardCanvas.add(this.instance);
        this.eBoardCanvas.renderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    };
    @authorityAssist
    protected onMouseUp(event:IEvent){
        const data = this.throw();
        super.onMouseUp(event);
        // save state
        this.eBoardCanvas.eventBus.trigger("object:added",data);
    }
    
    /**
     * 接收消息处理
     * @param {ICircleMessage} message
     */
    public onMessage(message:ICircleMessage){
        const {id,left,top,radius,stroke,fill,strokeDashArray,strokeWidth} = message;
        let instance = this.getInstanceById(id) as FabricCircle;
        this.eBoardCanvas.renderOnAddRemove=false;
        
        if(void 0 !== instance){
            this.eBoardCanvas.remove(instance);
        }
        instance=new FabricCircle({
            originX:"center",
            originY:"center",
            fill,
            left,
            top,
            stroke,
            strokeWidth,
            radius,
            ...strokeDashArray?{strokeDashArray}:{},
        },this.eBoardCanvas).setId(id);
        this.eBoardCanvas.add(instance);
        this.eBoardCanvas.requestRenderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
}

export {Circle};