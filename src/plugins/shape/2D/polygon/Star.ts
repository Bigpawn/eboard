/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/16 12:55
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/16 12:55
 * @disc:五角星 extend Polygon
 */
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import {IEvent} from "~fabric/fabric-impl";
import {
    IMessage,
    MessageTagEnum,
} from '../../../../middlewares/MessageMiddleWare';
import {Star as FabricStar} from "../../../../extends/Star";
import {message, setCursor} from '../../../../utils/decorators';
import {CursorTypeEnum} from '../../../../cursor/Enum';


export declare interface IStarMessage extends IMessage{
    points:any[];
    stroke:string;
    fill:string;
}

@setCursor(CursorTypeEnum.Cross)
class Star extends AbstractShapePlugin{
    protected instance:FabricStar;
    protected fill:string;
    protected stroke:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    @message
    private throw(){
        return this.instance?{
            id:this.instance.id,
            tag:MessageTagEnum.Shape,
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
        const angle = this.calcAngle(this.end);
        const points = FabricStar.calcPointsByRadius(this.start,radius,angle);
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 !== this.instance){
            this.eBoardCanvas.remove(this.instance);
        }
        const id = this.instance?this.instance.id:undefined;
        this.instance=new FabricStar(points,{
            stroke: this.getStrokeColor(),
            strokeWidth: this.strokeWidth,
            strokeDashArray:this.strokeDashArray,
            fill: this.getFillColor(),
            borderScaleFactor:this.borderWidth,
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
    public onMessage(message:IStarMessage){
        const {id,points,fill,stroke} = message;
        let instance = this.getInstanceById(id) as FabricStar;
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 !== instance){
            this.eBoardCanvas.remove(instance);
        }
        instance = new FabricStar(points,{
            stroke: stroke,
            strokeWidth: this.strokeWidth,
            strokeDashArray:this.strokeDashArray,
            fill: fill,
            borderScaleFactor:this.borderWidth,
        }).setId(id);
        this.eBoardCanvas.add(instance);
        this.eBoardCanvas.requestRenderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
}

export {Star};