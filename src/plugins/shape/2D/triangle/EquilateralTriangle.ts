/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/15 9:16
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/15 9:16
 * @disc:等边三角形
 * 会触发两次重绘  后期考虑优化
 */
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import {IEvent} from '~fabric/fabric-impl';
import {EquilateralTriangle as FabricEquilateralTriangle} from "../../../../extends/EquilateralTriangle";
import {message, setCursor} from '../../../../utils/decorators';
import {IEquilateralTriangleMessage} from '../../../../interface/IMessage';
import {MessageTag} from '../../../../enums/MessageTag';
import {CursorType} from '../../../../enums/CursorType';


@setCursor(CursorType.SystemCross)
class EquilateralTriangle extends AbstractShapePlugin{
    protected instance:FabricEquilateralTriangle;
    @message
    private throw(){
        return this.instance?{
            id:this.instance.id,
            tag:MessageTag.Shape,
            points:this.instance.points,
            type:this.instance.type,
            fill:this.instance.fill,
            stroke:this.instance.stroke,
            strokeWidth:this.instance.strokeWidth,
            strokeDashArray:this.instance.strokeDashArray
        }:undefined
    }
    protected onMouseMove(event:IEvent){
        if(void 0 === this.start){
            return;
        }
        super.onMouseMove(event);
        const radius = Math.sqrt(Math.pow(this.start.x-this.end.x,2)+Math.pow(this.start.y-this.end.y,2));
        const angle = this.calcAngle(this.end);
        const points = FabricEquilateralTriangle.calcPointsByRadius(this.start,radius,angle);
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 !== this.instance){
            this.eBoardCanvas.remove(this.instance);
        }
        const id = this.instance?this.instance.id:undefined;
        this.instance=new FabricEquilateralTriangle(points,{
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
    protected onMouseUp(event:IEvent){
        this.throw();
        super.onMouseUp(event);
    }
    /**
     * 接收消息处理
     * @param {ICircleMessage} message
     */
    public onMessage(message:IEquilateralTriangleMessage){
        const {id,points,fill,stroke,strokeDashArray,strokeWidth} = message;
        let instance = this.getInstanceById(id) as FabricEquilateralTriangle;
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 !== instance){
            this.eBoardCanvas.remove(instance);
        }
        instance = new FabricEquilateralTriangle(points,{
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
export {EquilateralTriangle};