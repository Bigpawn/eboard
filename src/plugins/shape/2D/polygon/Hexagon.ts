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
import {message, setCursor} from '../../../../utils/decorators';
import {CursorTypeEnum} from '../../../../cursor/Enum';


export declare interface IHexagonMessage extends IMessage{
    start:{x:number;y:number};
    radius:number;
    points:any[];
    stroke:string;
    fill:string;
}

@setCursor(CursorTypeEnum.Cross)
class Hexagon extends AbstractShapePlugin{
    protected instance:FabricHexagon;
    protected fill:string;
    protected stroke:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    @message
    private throw(){
        return this.instance?{
            id:this.instance.id,
            tag:MessageTagEnum.Shape,
            start:this.start,
            radius:this.instance.width,
            points:this.instance.points,
            type:this.instance.type,
            stroke:this.instance.stroke,
            fill:this.instance.fill
        }:undefined
    }
    protected onMouseMove(event:IEvent){
        if(void 0 === this.start){
            return;
        }
        super.onMouseMove(event);
        const radius = Math.sqrt(Math.pow(this.start.x-this.end.x,2)+Math.pow(this.start.y-this.end.y,2));
        const angle =this.calcAngle(this.end);
        const points = FabricHexagon.calcPointsByRadius(this.start,radius,angle);
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 !== this.instance){
            this.eBoardCanvas.remove(this.instance);
        }
        const id = this.instance?this.instance.id:undefined;
        this.instance=new FabricHexagon(points,{
            stroke: this.getStrokeColor(),
            strokeWidth: this.getCanvasPixel(this.strokeWidth),
            strokeDashArray:this.strokeDashArray,
            fill: this.getFillColor(),
            width:radius,
            height:radius,
            left:this.start.x,
            top:this.start.y,
            originY:"center",
            originX:"center"
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
    public onMessage(message:IHexagonMessage){
        const {id,points,start,radius,fill,stroke} = message;
        let instance = this.getInstanceById(id) as FabricHexagon;
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 !== instance){
            this.eBoardCanvas.remove(instance);
        }
        instance= new FabricHexagon(points,{
            stroke: stroke,
            strokeWidth: this.getCanvasPixel(this.strokeWidth),
            strokeDashArray:this.strokeDashArray,
            fill: fill,
            width:radius,
            height:radius,
            left:start.x,
            top:start.y,
            originY:"center",
            originX:"center"
        }).setId(id);
        this.eBoardCanvas.add(instance);
        this.eBoardCanvas.requestRenderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
}

export {Hexagon};