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
import {
    IMessage,
    MessageTagEnum,
} from '../../../../middlewares/MessageMiddleWare';
import {EquilateralTriangle as FabricEquilateralTriangle} from "../../../../extends/EquilateralTriangle";
import {message, setCursor} from '../../../../utils/decorators';
import {CursorTypeEnum} from '../../../../cursor/Enum';


export declare interface IEquilateralTriangleMessage extends IMessage{
    points:any[];
    radius:number;
    start:{x:number,y:number},
    fill:string;
    stroke:string;
}
@setCursor(CursorTypeEnum.Cross)
class EquilateralTriangle extends AbstractShapePlugin{
    protected instance:FabricEquilateralTriangle;
    protected fill?:string;
    protected stroke?:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    @message
    private startAction(){
        return {
            id:this.instance.id,
            tag:MessageTagEnum.Start,
            points:this.instance.points,
            start:this.start,
            length:this.instance.width,
            type:this.instance.type,
            fill:this.instance.fill,
            stroke:this.instance.stroke
        }
    }
    @message
    private moveAction(){
        return {
            id:this.instance.id,
            tag:MessageTagEnum.Temporary,
            points:this.instance.points,
            start:this.start,
            length:this.instance.width,
            type:this.instance.type,
            fill:this.instance.fill,
            stroke:this.instance.stroke
        }
    }
    @message
    private endAction(){
        return {
            id:this.instance.id,
            tag:MessageTagEnum.End,
            points:this.instance.points,
            start:this.start,
            length:this.instance.width,
            type:this.instance.type,
            fill:this.instance.fill,
            stroke:this.instance.stroke
        }
    }
    protected onMouseMove(event:IEvent){
        if(void 0 === this.start){
            return;
        }
        super.onMouseMove(event);
        const radius = Math.sqrt(Math.pow(this.start.x-this.end.x,2)+Math.pow(this.start.y-this.end.y,2));
        const angle = this.calcAngle(this.end);
        const points = FabricEquilateralTriangle.calcPointsByRadius(this.start,radius,angle);
        const length = radius * 2;
        if(void 0 ===this.instance){
            this.instance = new FabricEquilateralTriangle(points,{
                stroke: this.getStrokeColor(),
                strokeWidth: this.getCanvasPixel(this.strokeWidth),
                strokeDashArray:this.strokeDashArray,
                fill: this.getFillColor(),
                width:length,
                height:length,
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
                width:length,
                height:length,
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
    public onMessage(message:IEquilateralTriangleMessage){
        const {id,tag,points,start,length,fill,stroke} = message;
        let instance = this.getInstanceById(id) as FabricEquilateralTriangle;
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 === instance){
            instance = new FabricEquilateralTriangle(points,{
                stroke: stroke,
                strokeWidth: this.getCanvasPixel(this.strokeWidth),
                strokeDashArray:this.strokeDashArray,
                fill: fill,
                width:length,
                height:length,
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
                    width:length,
                    height:length,
                });
                break;
            default:
                break;
        }
        this.eBoardCanvas.requestRenderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
}
export {EquilateralTriangle};