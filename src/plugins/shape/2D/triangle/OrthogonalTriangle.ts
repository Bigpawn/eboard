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
    start:{x:number;y:number};
    stroke:string;
    fill:string
}

@setCursor(CursorTypeEnum.Cross)
class OrthogonalTriangle extends AbstractShapePlugin{
    protected instance:FabricOrthogonalTriangle;
    protected fill:string;
    protected stroke:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    protected onMouseMove(event:IEvent){
        if(void 0 === this.start){
            return;
        }
        super.onMouseMove(event);
        const points= FabricOrthogonalTriangle.calcPointsByCursorPoint(this.start,this.end);
        const width = Math.abs(this.end.x-this.start.x);
        const height = Math.abs(this.end.y-this.start.y);
        const center = {
            x:(this.start.x+this.end.x)/2,
            y:(this.start.y+this.end.y)/2,
        };
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 !== this.instance){
            this.eBoardCanvas.remove(this.instance);
        }
        const id = this.instance?this.instance.id:undefined;
        this.instance=new FabricOrthogonalTriangle(points,{
            stroke: this.getStrokeColor(),
            strokeWidth: this.getCanvasPixel(this.strokeWidth),
            strokeDashArray:this.strokeDashArray,
            fill: this.getFillColor(),
            left:center.x,
            top:center.y,
            originY:"center",
            originX:"center",
            width:width,
            height:height,
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
    @message
    private throw(){
        return this.instance?{
            id:this.instance.id,
            start:this.instance.pathOffset,
            tag:MessageTagEnum.Shape,
            points:this.instance.points,
            width:this.instance.width,
            height:this.instance.height,
            type:this.instance.type,
            fill:this.instance.fill,
            stroke:this.instance.stroke
        }:undefined;
    }
    
    /**
     * 接收消息处理
     * @param {ICircleMessage} message
     */
    public onMessage(message:IOrthogonalTriangleMessage){
        const {id,points,start,width,height,stroke,fill} = message;
        let instance = this.getInstanceById(id) as FabricOrthogonalTriangle;
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 !== instance){
            this.eBoardCanvas.remove(instance);
        }
        instance = new FabricOrthogonalTriangle(points,{
            stroke: stroke,
            strokeWidth: this.getCanvasPixel(this.strokeWidth),
            strokeDashArray:this.strokeDashArray,
            fill: fill,
            left:start.x,
            top:start.y,
            originY:"center",
            originX:"center",
            width:width,
            height:height,
        }).setId(id);
        this.eBoardCanvas.add(instance);
        this.eBoardCanvas.requestRenderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
}
export {OrthogonalTriangle};