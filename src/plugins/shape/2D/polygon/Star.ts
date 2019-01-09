/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/16 12:55
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/16 12:55
 * @disc:五角星 extend Polygon
 */
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import {IEvent} from "~fabric/fabric-impl";
import {Star as FabricStar} from "../../../../extends/Star";
import {
    authorityAssist,
    message,
    setCursor,
} from '../../../../utils/decorators';
import {IStarMessage} from '../../../../interface/IMessage';
import {MessageTag} from '../../../../enums/MessageTag';
import {CursorType} from '../../../../enums/CursorType';


@setCursor(CursorType.SystemCross)
class Star extends AbstractShapePlugin{
    protected instance:FabricStar;
    @message
    private throw(){
        return this.instance?{
            id:this.instance.id,
            tag:MessageTag.Shape,
            points:this.instance.points,
            type:this.instance.type,
            stroke:this.instance.stroke,
            fill:this.instance.fill,
            strokeWidth:this.instance.strokeWidth,
            strokeDashArray:this.instance.strokeDashArray
        }:undefined
    }
    @authorityAssist
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
            stroke: this.stroke,
            strokeWidth: this.strokeWidth,
            strokeDashArray:this.strokeDashArray,
            fill: this.fill,
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
        this.throw();
        super.onMouseUp(event);
    }
    
    /**
     * 接收消息处理
     * @param {ICircleMessage} message
     */
    public onMessage(message:IStarMessage){
        const {id,points,fill,stroke,strokeDashArray,strokeWidth} = message;
        let instance = this.getInstanceById(id) as FabricStar;
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 !== instance){
            this.eBoardCanvas.remove(instance);
        }
        instance = new FabricStar(points,{
            stroke,
            strokeWidth,
            fill,
            ...strokeDashArray?{strokeDashArray}:{},
        },this.eBoardCanvas).setId(id);
        this.eBoardCanvas.add(instance);
        this.eBoardCanvas.requestRenderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
}

export {Star};