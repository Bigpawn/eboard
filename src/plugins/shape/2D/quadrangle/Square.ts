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
import {message} from '../../../../utils/decorators';

export declare interface ISquareMessage extends IMessage{
    start:{x:number;y:number};
    length:number;
    angle:number;
}



class Square extends AbstractShapePlugin{
    protected instance:FabricSquare;
    private fill?:string;
    private stroke?:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    @message
    private startAction(){
        return {
            id:this.instance.id,
            tag:MessageTagEnum.Start,
            start:this.start,
            length:this.instance.width,
            angle:this.instance.angle,
            type:this.instance.type
        }
    }
    @message
    private moveAction(){
        return {
            id:this.instance.id,
            tag:MessageTagEnum.Temporary,
            start:this.start,
            length:this.instance.width,
            angle:this.instance.angle,
            type:this.instance.type
        }
    }
    @message
    private endAction(){
        return {
            id:this.instance.id,
            tag:MessageTagEnum.End,
            start:this.start,
            length:this.instance.width,
            angle:this.instance.angle,
            type:this.instance.type
        }
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
        if(void 0 === this.instance){
            this.instance = new FabricSquare({
                fill:this.fill,
                left: this.start.x,
                top: this.start.y,
                stroke:this.stroke,
                strokeDashArray:this.strokeDashArray,
                strokeWidth:this.getCanvasPixel(this.strokeWidth),
                originX:"center",
                originY:"center",
                width:length,
                height:length,
                angle:angle
            });
            this.eBoardCanvas.add(this.instance);
            this.startAction();
        }else{
            this.instance.update({
                width:length,
                height:length,
                angle:angle
            });
            this.eBoardCanvas.renderAll();
            this.moveAction();
        }
    };
    protected onMouseUp(event:IEvent){
        this.endAction();
        super.onMouseUp(event);
    }
    
    /**
     * 接收消息处理
     * @param {ICircleMessage} message
     */
    public onMessage(message:ISquareMessage){
        const {id,start,length,angle,tag} = message;
        let instance = this.getInstanceById(id) as FabricSquare;
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 === instance){
            instance = new FabricSquare({
                fill:this.fill,
                left: start.x,
                top: start.y,
                stroke:this.stroke,
                strokeDashArray:this.strokeDashArray,
                strokeWidth:this.getCanvasPixel(this.strokeWidth),
                originX:"center",
                originY:"center",
                width:length,
                height:length,
                angle:angle
            }).setId(id);
            this.eBoardCanvas.add(instance);
        }
        switch (tag){
            case MessageTagEnum.Start:
                break;
            case MessageTagEnum.Temporary:
            case MessageTagEnum.End:
                instance.update({
                    width:length,
                    height:length,
                    angle:angle
                });
                break;
            default:
                break;
        }
        this.eBoardCanvas.requestRenderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
}

export {Square}