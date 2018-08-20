/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/13 15:40
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/13 15:40
 * @disc:Square 正方形 extends Rectangle without Ctrl KeyEvent;
 * 修改成起点为正方形中心点，终点为正方形一个角，自动旋转
 */
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import {IEvent} from '~fabric/fabric-impl';
import {
    IMessage,
    MessageTagEnum,
} from '../../../../middlewares/MessageMiddleWare';
import {Square as FabricSquare} from "../../../../extends/Square";
import {message, setCursor} from '../../../../utils/decorators';
import {CursorTypeEnum} from '../../../../cursor/Enum';

export declare interface ISquareMessage extends IMessage{
    start:{x:number;y:number};
    length:number;
    angle:number;
    fill:string;
    stroke:string;
}


@setCursor(CursorTypeEnum.Cross)
class Square extends AbstractShapePlugin{
    protected instance:FabricSquare;
    protected fill:string;
    protected stroke:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    @message
    private throw(){
        return this.instance?{
            id:this.instance.id,
            tag:MessageTagEnum.Shape,
            start:this.start,
            length:this.instance.width,
            angle:this.instance.angle,
            type:this.instance.type,
            fill:this.instance.fill,
            stroke:this.instance.stroke
        }:undefined
    }
    protected onMouseMove(event:IEvent){
        if(void 0 === this.start){
            return;
        }
        super.onMouseMove(event);
        const pos = this.end;
        const width=Math.abs(pos.x-this.start.x);
        const height=Math.abs(pos.y-this.start.y);
        const length = Math.sqrt(2) * Math.sqrt(Math.pow(width,2)+Math.pow(height,2));
        const angle = this.calcAngle(pos) - 45;
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 !== this.instance){
            this.eBoardCanvas.remove(this.instance);
        }
        const id = this.instance?this.instance.id:undefined;
        this.instance=new FabricSquare({
            fill:this.getFillColor(),
            left: this.start.x,
            top: this.start.y,
            stroke:this.getStrokeColor(),
            strokeDashArray:this.strokeDashArray,
            strokeWidth:this.strokeWidth,
            originX:"center",
            originY:"center",
            width:length,
            height:length,
            angle:angle,
            borderScaleFactor:this.getCanvasPixel(1),
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
    public onMessage(message:ISquareMessage){
        const {id,start,length,angle,fill,stroke} = message;
        let instance = this.getInstanceById(id) as FabricSquare;
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 !== instance){
            this.eBoardCanvas.remove(instance);
        }
        instance = new FabricSquare({
            fill:fill,
            left: start.x,
            top: start.y,
            stroke:stroke,
            strokeDashArray:this.strokeDashArray,
            strokeWidth:this.strokeWidth,
            originX:"center",
            originY:"center",
            width:length,
            height:length,
            angle:angle,
            borderScaleFactor:this.getCanvasPixel(1),
        }).setId(id);
        this.eBoardCanvas.add(instance);
        this.eBoardCanvas.requestRenderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
}

export {Square}