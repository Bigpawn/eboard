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
    radius:number;
    start:{x:number;y:number};
}

@setCursor(CursorTypeEnum.Cross)
class Star extends AbstractShapePlugin{
    protected instance:FabricStar;
    private fill?:string;
    private stroke?:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    @message
    private startAction(){
        return {
            id:this.instance.id,
            tag:MessageTagEnum.Start,
            points:this.instance.points,
            start:this.start,
            radius:this.instance.width,
            type:this.instance.type
        }
    }
    @message
    private moveAction(){
        return {
            id:this.instance.id,
            tag:MessageTagEnum.Temporary,
            points:this.instance.points,
            start:this.start,
            radius:this.instance.width,
            type:this.instance.type
        }
    }
    @message
    private endAction(){
        return {
            id:this.instance.id,
            tag:MessageTagEnum.End,
            points:this.instance.points,
            start:this.start,
            radius:this.instance.width,
            type:this.instance.type
        }
    }
    protected onMouseMove(event:IEvent){
        if(void 0 === this.start){
            return;
        }
        super.onMouseMove(event);
        const radius = Math.sqrt(Math.pow(this.start.x-this.end.x,2)+Math.pow(this.start.y-this.end.y,2));
        const angle = this.calcAngle(this.end);
        const points = FabricStar.calcPointsByRadius(this.start,radius,angle);
        const length = radius*2;
        if(void 0 ===this.instance){
            this.instance = new FabricStar(points,{
                stroke: this.stroke,
                strokeWidth: this.getCanvasPixel(this.strokeWidth),
                strokeDashArray:this.strokeDashArray,
                fill: this.fill,
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
    public onMessage(message:IStarMessage){
        const {id,points,radius,start,tag} = message;
        let instance = this.getInstanceById(id) as FabricStar;
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 === instance){
            instance = new FabricStar(points,{
                stroke: this.stroke,
                strokeWidth: this.getCanvasPixel(this.strokeWidth),
                strokeDashArray:this.strokeDashArray,
                fill: this.fill,
                width:radius,
                height:radius,
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
                    width:radius,
                    height:radius,
                });
                break;
            default:
                break;
        }
        this.eBoardCanvas.requestRenderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
}

export {Star};