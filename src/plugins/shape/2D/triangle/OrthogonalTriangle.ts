/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/15 14:58
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/15 14:58
 * @disc:直角三角形 继承自Path
 */
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import {IEvent} from '~fabric/fabric-impl';
import {
    IMessage,
    MessageTagEnum,
} from '../../../../middlewares/MessageMiddleWare';
import {OrthogonalTriangle as FabricOrthogonalTriangle} from "../../../../extends/OrthogonalTriangle";
import {message, setCursor} from '../../../../utils/decorators';
import {CursorTypeEnum} from '../../../../cursor/Enum';



export declare interface IOrthogonalTriangleMessage extends IMessage{
    points:any[];
    stroke:string;
    fill:string;
    strokeDashArray:number[]
}

@setCursor(CursorTypeEnum.Cross)
class OrthogonalTriangle extends AbstractShapePlugin{
    protected instance:FabricOrthogonalTriangle;
    protected onMouseMove(event:IEvent){
        if(void 0 === this.start){
            return;
        }
        super.onMouseMove(event);
        const points= FabricOrthogonalTriangle.calcPointsByCursorPoint(this.start,this.end);
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 !== this.instance){
            this.eBoardCanvas.remove(this.instance);
        }
        const id = this.instance?this.instance.id:undefined;
        this.instance=new FabricOrthogonalTriangle(points,{
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
    @message
    private throw(){
        return this.instance?{
            id:this.instance.id,
            tag:MessageTagEnum.Shape,
            points:this.instance.points,
            type:this.instance.type,
            fill:this.instance.fill,
            stroke:this.instance.stroke,
            strokeDashArray:this.instance.strokeDashArray
        }:undefined;
    }
    
    /**
     * 接收消息处理
     * @param {ICircleMessage} message
     */
    public onMessage(message:IOrthogonalTriangleMessage){
        const {id,points,stroke,fill,strokeDashArray} = message;
        let instance = this.getInstanceById(id) as FabricOrthogonalTriangle;
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 !== instance){
            this.eBoardCanvas.remove(instance);
        }
        instance = new FabricOrthogonalTriangle(points,{
            stroke: stroke,
            strokeWidth: this.strokeWidth,
            strokeDashArray:strokeDashArray,
            fill: fill,
        },this.eBoardCanvas).setId(id);
        this.eBoardCanvas.add(instance);
        this.eBoardCanvas.requestRenderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
}
export {OrthogonalTriangle};