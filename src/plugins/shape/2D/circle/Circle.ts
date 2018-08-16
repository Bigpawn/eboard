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
import {
    IMessage,
    MessageTagEnum,
} from '../../../../middlewares/MessageMiddleWare';
import {Circle as FabricCircle} from "../../../../extends/Circle";
import {CursorTypeEnum} from '../../../../cursor/Enum';



export declare interface ICircleMessage extends IMessage{
    start:{x:number;y:number};
    radius:number;
    stroke:string;
    fill:string;
}

@setCursor(CursorTypeEnum.Cross)
class Circle extends AbstractShapePlugin{
    protected fill:string;
    protected stroke:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    protected instance:FabricCircle;
    
    @message
    private throw(){
        return this.instance?{
            tag:MessageTagEnum.Shape,
            id:this.instance.id,
            start:this.start,
            radius:this.instance.radius,
            type:this.instance.type,
            stroke:this.instance.stroke,
            fill:this.instance.fill
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
            fill:this.getFillColor(),
            left: this.start.x,
            top: this.start.y,
            stroke:this.getStrokeColor(),
            strokeDashArray:this.strokeDashArray,
            strokeWidth:this.getCanvasPixel(this.strokeWidth),
            radius:radius,
            borderScaleFactor:this.eBoardCanvas.getSize(1),
        });
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
        const {id,start,radius,stroke,fill} = message;
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
            strokeDashArray:this.strokeDashArray,
            strokeWidth:this.getCanvasPixel(this.strokeWidth),
            radius:radius,
            borderScaleFactor:this.eBoardCanvas.getSize(1),
        }).setId(id);
        this.eBoardCanvas.add(instance);
        this.eBoardCanvas.requestRenderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
}

export {Circle};