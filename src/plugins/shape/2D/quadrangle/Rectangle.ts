/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/13 12:51
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/13 12:51
 * @disc:矩形Plugin  还可以使用Path实现   flipX flipY 不起作用，使用动态计算left top实现四象限
 */

import {
    authorityAssist,
    message,
    setCursor,
} from '../../../../utils/decorators';
import {AbstractShapePlugin, Quadrant} from '../../AbstractShapePlugin';
import {IEvent} from '~fabric/fabric-impl';
import {Rectangle as FabricRectangle} from "../../../../extends/Rectangle";
import {IRectangleMessage} from '../../../../interface/IMessage';
import {Keys} from '../../../../enums/Keys';
import {MessageTag} from '../../../../enums/MessageTag';
import {CursorType} from '../../../../enums/CursorType';

@setCursor(CursorType.SystemCross)
class Rectangle extends AbstractShapePlugin{
    public type:string="rectangle";
    protected instance:FabricRectangle;
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
    private throw(){
        return this.instance?{
            id:this.instance.id,
            tag:MessageTag.Shape,
            left:this.instance.left,
            top:this.instance.top,
            width:this.instance.width,
            height:this.instance.height,
            type:this.type,
            fill:this.instance.fill,
            stroke:this.instance.stroke,
            strokeWidth:this.instance.strokeWidth,
            strokeDashArray:this.instance.strokeDashArray
        }:undefined
    }
    private update(startPoint:{x:number;y:number},length:number,width:number,height:number){
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 !== this.instance){
            this.eBoardCanvas.remove(this.instance);
        }
        const id = this.instance?this.instance.id:undefined;
        this.instance= new FabricRectangle({
            fill:this.fill,
            left: startPoint.x,
            top: startPoint.y,
            stroke:this.stroke,
            strokeDashArray:this.strokeDashArray,
            width:this.ctrlKey?length:width,
            height:this.ctrlKey?length:height,
            strokeWidth:this.strokeWidth,
        },this.eBoardCanvas);
        if(void 0 !== id){
            this.instance.setId(id);
        }
        this.throw();
        this.eBoardCanvas.add(this.instance);
        this.eBoardCanvas.renderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
    @authorityAssist
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
        this.update(startPoint,length,width,height);
    };
    @authorityAssist
    protected ctrlKeyDownHandler(e:KeyboardEvent){
        // 判断是否处于绘制模式
        const keyCode = e.keyCode;
        if(Keys.Ctrl===keyCode){
            this.ctrlKey=true;
            if(void 0 === this.start || void 0 === this.instance){
                return;
            }
            const width=Math.abs(this.end.x-this.start.x);
            const height=Math.abs(this.end.y-this.start.y);
            const length = Math.min(width,height);
            const startPoint = this.getCtrlStartPoint(length);
            this.update(startPoint,length,width,height);
        }
    }
    @authorityAssist
    protected ctrlKeyUpHandler(e:KeyboardEvent){
        const keyCode = e.keyCode;
        if(Keys.Ctrl===keyCode){
            // 恢复
            this.ctrlKey=false;
            if(void 0 === this.instance){
                return;
            }
            const width=Math.abs(this.end.x-this.start.x);
            const height=Math.abs(this.end.y-this.start.y);
            const length = Math.min(width,height);
            const startPoint = this.getStartPoint();
            this.update(startPoint,length,width,height);
        }
    }
    @authorityAssist
    protected onMouseUp(event:IEvent){
        const data = this.throw();
        super.onMouseUp(event);
        // save state
        this.eBoardCanvas.eventBus.trigger("object:added",data);
    }
    /**
     * 接收消息处理
     * @param {ICircleMessage} message
     */
    public onMessage(message:IRectangleMessage){
        const {id,left,top,width,height,fill,stroke,strokeDashArray,strokeWidth} = message;
        let instance = this.getInstanceById(id) as FabricRectangle;
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 !== instance){
            this.eBoardCanvas.remove(instance);
        }
        instance = new FabricRectangle({
            fill,
            left,
            top,
            stroke,
            width,
            height,
            strokeWidth,
            ...strokeDashArray?{strokeDashArray}:{},
        },this.eBoardCanvas).setId(id);
        this.eBoardCanvas.add(instance);
        this.eBoardCanvas.requestRenderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
}

export {Rectangle};