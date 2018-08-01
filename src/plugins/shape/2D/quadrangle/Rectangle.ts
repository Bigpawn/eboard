/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/13 12:51
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/13 12:51
 * @disc:矩形Plugin  还可以使用Path实现   flipX flipY 不起作用，使用动态计算left top实现四象限
 */

import {ctrlKeyEnable, message} from '../../../../utils/decorators';
import {AbstractShapePlugin, Quadrant} from '../../AbstractShapePlugin';
import {IEvent} from '~fabric/fabric-impl';
import {
    IMessage,
    MessageTagEnum,
} from '../../../../middlewares/MessageMiddleWare';
import {Rectangle as FabricRectangle} from "../../../../extends/Rectangle";

export declare interface IRectangleMessage extends IMessage{
    start:{x:number;y:number};
    width:number;
    height:number;
}


@ctrlKeyEnable(true)
class Rectangle extends AbstractShapePlugin{
    protected instance:FabricRectangle;
    private fill?:string;
    private stroke?:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    protected ctrlKeyEnable:boolean;
    protected ctrlKey:boolean=false;
    private getStartPoint():{x:number;y:number}{
        const start = this.start;
        const end = this.end;
        const quadrant = this.calcQuadrant(end);
        switch (quadrant){
            case Quadrant.RT:// 第一象限
                return {
                    x:start.x,
                    y:end.y
                };
            case Quadrant.LT:// 第二象限
                return {
                    x:end.x,
                    y:end.y
                };
            case Quadrant.LB:// 第三象限
                return {
                    x:end.x,
                    y:start.y
                };
            case Quadrant.RB:// 第四象限
            default:
                return {
                    x:start.x,
                    y:start.y
                };
        }
    }
    private getCtrlStartPoint(length:number):{x:number;y:number}{
        const start = this.start;
        const end = this.end;
        const quadrant = this.calcQuadrant(end);
        switch (quadrant){
            case Quadrant.RT:// 第一象限
                return {
                    x:start.x,
                    y:start.y-length
                };
            case Quadrant.LT:// 第二象限
                return {
                    x:start.x-length,
                    y:start.x-length
                };
            case Quadrant.LB:// 第三象限
                return {
                    x:start.x-length,
                    y:start.y
                };
            case Quadrant.RB:// 第四象限
            default:
                return {
                    x:start.x,
                    y:start.y
                };
        }
    };
    @message
    private startAction(){
        return {
            id:this.instance.id,
            tag:MessageTagEnum.Start,
            start:{x:this.instance.left,y:this.instance.top},
            width:this.instance.width,
            height:this.instance.height,
            type:this.instance.type
        }
    }
    @message
    private moveAction(){
        return {
            id:this.instance.id,
            tag:MessageTagEnum.Temporary,
            start:{x:this.instance.left,y:this.instance.top},
            width:this.instance.width,
            height:this.instance.height,
            type:this.instance.type
        }
    }
    @message
    private endAction(){
        return {
            id:this.instance.id,
            tag:MessageTagEnum.End,
            start:{x:this.instance.left,y:this.instance.top},
            width:this.instance.width,
            height:this.instance.height,
            type:this.instance.type
        }
    }
    protected onMouseMove(event:IEvent){
        if(void 0 ===this.start){
            return;
        }
        super.onMouseMove(event);
        const pos = this.end;
        const width=Math.abs(pos.x-this.start.x);
        const height=Math.abs(pos.y-this.start.y);
        const length = Math.min(width,height);
        const startPoint = this.ctrlKey?this.getCtrlStartPoint(length):this.getStartPoint();
        if(this.instance){
            this.instance.update({
                width:this.ctrlKey?length:width,
                height:this.ctrlKey?length:height,
                left: startPoint.x,
                top: startPoint.y,
            });
            this.eBoardCanvas.renderAll();
            this.moveAction();
        }else{
            this.instance = new FabricRectangle({
                fill:this.fill,
                left: this.start.x,
                top: this.start.y,
                stroke:this.stroke,
                strokeDashArray:this.strokeDashArray,
                width:this.ctrlKey?length:width,
                height:this.ctrlKey?length:height,
                strokeWidth:this.getCanvasPixel(this.strokeWidth)
            });
            this.eBoardCanvas.add(this.instance);
            this.startAction();
        }
    };
    protected ctrlKeyDownHandler(e:KeyboardEvent){
        // 判断是否处于绘制模式
        const keyCode = e.keyCode;
        if(17===keyCode){
            this.ctrlKey=true;
            if(void 0 === this.start || void 0 === this.instance){
                return;
            }
      
            const width=Math.abs(this.end.x-this.start.x);
            const height=Math.abs(this.end.y-this.start.y);
            const length = Math.min(width,height);
            const startPoint = this.getCtrlStartPoint(length);
            if(width===this.instance.width&&height===this.instance.height&&startPoint.x===this.instance.left&&startPoint.y===this.instance.top){
                return;
            }
            this.instance.update({
                width:length,
                height:length,
                left:startPoint.x,
                top:startPoint.y
            });
            this.eBoardCanvas.renderAll();
            this.moveAction();
        }
    }
    protected ctrlKeyUpHandler(e:KeyboardEvent){
        const keyCode = e.keyCode;
        if(17===keyCode){
            // 恢复
            this.ctrlKey=false;
            if(void 0 === this.instance){
                return;
            }
            const width=Math.abs(this.end.x-this.start.x);
            const height=Math.abs(this.end.y-this.start.y);
            const startPoint = this.getStartPoint();
            this.instance.update({
                width:width,
                height:height,
                left:startPoint.x,
                top:startPoint.y
            });
            this.eBoardCanvas.renderAll();
            this.moveAction();
        }
    }
    protected onMouseUp(event:IEvent){
        this.endAction();
        super.onMouseUp(event);
    }
    /**
     * 接收消息处理
     * @param {ICircleMessage} message
     */
    public onMessage(message:IRectangleMessage){
        const {id,start,width,height,tag} = message;
        let instance = this.getInstanceById(id) as FabricRectangle;
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 === instance){
            instance = new FabricRectangle({
                fill:this.fill,
                left: start.x,
                top: start.y,
                stroke:this.stroke,
                strokeDashArray:this.strokeDashArray,
                width:width,
                height:height,
                strokeWidth:this.getCanvasPixel(this.strokeWidth)
            }).setId(id);
            this.eBoardCanvas.add(instance);
        }
        switch (tag){
            case MessageTagEnum.Start:
                break;
            case MessageTagEnum.Temporary:
            case MessageTagEnum.End:
                instance.update({
                    width:width,
                    height:height,
                    left:start.x,
                    top:start.y
                });
                break;
            default:
                break;
        }
        this.eBoardCanvas.renderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
}

export {Rectangle};