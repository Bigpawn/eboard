/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/12 21:10
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/12 21:10
 * @disc:Circle  坐标采用四舍五入规则取整
 *      instanceId: type
 */

import {message, setCursor} from '../../../../utils/decorators';
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import {IEvent} from "~fabric/fabric-impl";
import {Circle as FabricCircle} from "../../../../extends/Circle";
import {ICircleMessage} from '../../../../interface/IMessage';
import {MessageTag} from '../../../../enums/MessageTag';
import {CursorType} from '../../../../enums/CursorType';


@setCursor(CursorType.Cross)
class Circle extends AbstractShapePlugin{
    protected instance:FabricCircle;
    @message
    private throw(){
        return this.instance?{
            tag:MessageTag.Shape,
            id:this.instance.id,
            start:this.start,
            radius:this.instance.radius,
            type:this.instance.type,
            stroke:this.instance.stroke,
            fill:this.instance.fill,
            strokeDashArray:this.instance.strokeDashArray
        }:undefined
    }
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
    protected onMouseUp(event:IEvent){
        this.throw();
        super.onMouseUp(event);
    }
    
    /**
     * 接收消息处理
     * @param {ICircleMessage} message
     */
    public onMessage(message:ICircleMessage){
        const {id,start,radius,stroke,fill,strokeDashArray} = message;
        let instance = this.getInstanceById(id) as FabricCircle;
        this.eBoardCanvas.renderOnAddRemove=false;
        
        if(void 0 !== instance){
            this.eBoardCanvas.remove(instance);
        }
        instance=new FabricCircle({
            originX:"center",
            originY:"center",
            fill:fill,
            left: start.x,
            top: start.y,
            stroke:stroke,
            strokeDashArray:strokeDashArray,
            strokeWidth:this.strokeWidth,
            radius:radius,
        },this.eBoardCanvas).setId(id);
        this.eBoardCanvas.add(instance);
        this.eBoardCanvas.requestRenderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
}

export {Circle};