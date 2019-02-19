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
import {Square as FabricSquare} from "../../../../extends/Square";
import {
    authorityAssist,
    message,
    setCursor,
} from '../../../../utils/decorators';
import {ISquareMessage} from '../../../../interface/IMessage';
import {MessageTag} from '../../../../enums/MessageTag';
import {CursorType} from '../../../../enums/CursorType';




@setCursor(CursorType.SystemCross)
class Square extends AbstractShapePlugin{
    public type:string="square";
    protected instance:FabricSquare;
    @message
    private throw(){
        return this.instance?{
            id:this.instance.id,
            tag:MessageTag.Shape,
            left:this.start.x,
            top:this.start.y,
            length:this.instance.width,
            angle:this.instance.angle,
            type:this.type,
            fill:this.instance.fill,
            stroke:this.instance.stroke,
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
            fill:this.fill,
            left: this.start.x,
            top: this.start.y,
            stroke:this.stroke,
            strokeDashArray:this.strokeDashArray,
            strokeWidth:this.strokeWidth,
            originX:"center",
            originY:"center",
            width:length,
            height:length,
            angle:angle,
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
        // save state
        this.eBoardCanvas.eventBus.trigger("object:added");
    }
    
    /**
     * 接收消息处理
     * @param {ICircleMessage} message
     */
    public onMessage(message:ISquareMessage){
        const {id,left,top,length,angle,fill,stroke,strokeDashArray,strokeWidth} = message;
        let instance = this.getInstanceById(id) as FabricSquare;
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 !== instance){
            this.eBoardCanvas.remove(instance);
        }
        instance = new FabricSquare({
            fill,
            left,
            top,
            stroke,
            strokeWidth,
            originX:"center",
            originY:"center",
            width:length,
            height:length,
            angle,
            ...strokeDashArray?{strokeDashArray}:{},
        },this.eBoardCanvas).setId(id);
        this.eBoardCanvas.add(instance);
        this.eBoardCanvas.requestRenderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
}

export {Square}