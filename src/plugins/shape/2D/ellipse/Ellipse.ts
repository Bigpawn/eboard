/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/12 21:38
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/12 21:38
 * @disc:Ellipse  flip翻转属性不起作用，使用动态计算起点位置实现
 * @changelist:
 *      1. 坐标取整：2018/07/25
 */

import {AbstractShapePlugin, Quadrant} from '../../AbstractShapePlugin';
import {IEvent} from '~fabric/fabric-impl';
import {Ellipse as FabricEllipse} from "../../../../extends/Ellipse";
import {message, setCursor} from '../../../../utils/decorators';
import {IEllipseMessage} from '../../../../interface/IMessage';
import {Keys} from '../../../../enums/Keys';
import {MessageTag} from '../../../../enums/MessageTag';
import {CursorType} from '../../../../enums/CursorType';

@setCursor(CursorType.Cross)
class Ellipse extends AbstractShapePlugin{
    private ctrlKey:boolean=false;
    protected instance:FabricEllipse;
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
    private getCtrlStartPoint(radius:number):{x:number;y:number}{
        const start = this.start;
        const end = this.end;
        const length = radius * 2;
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
            start:{x:this.instance.left,y:this.instance.top},
            rx:this.instance.rx,
            ry:this.instance.ry,
            type:this.instance.type,
            fill:this.instance.fill,
            stroke:this.instance.stroke,
            strokeDashArray:this.instance.strokeDashArray
        }:undefined
    }
    
    private update(startPoint:{x:number;y:number},radius:number,rx:number,ry:number){
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 !== this.instance){
            this.eBoardCanvas.remove(this.instance);
        }
        const id = this.instance?this.instance.id:undefined;
        this.instance=new FabricEllipse({
            fill:this.fill,
            left: startPoint.x,
            top: startPoint.y,
            rx:this.ctrlKey?radius:rx,
            ry:this.ctrlKey?radius:ry,
            stroke:this.stroke,
            strokeDashArray:this.strokeDashArray,
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
    
    protected onMouseMove(event:IEvent){
        if(void 0 ===this.start){
            return;
        }
        super.onMouseMove(event);
        const rx=Math.round(Math.abs(this.end.x-this.start.x)/2);
        const ry=Math.round(Math.abs(this.end.y-this.start.y)/2);
        const radius = Math.min(rx,ry);
        const startPoint = this.ctrlKey?this.getCtrlStartPoint(radius):this.getStartPoint();
        this.update(startPoint,radius,rx,ry);
    };
    protected onMouseUp(event:IEvent){
        this.throw();
        super.onMouseUp(event);
    }
    protected ctrlKeyDownHandler(e:KeyboardEvent){
        // 判断是否处于绘制模式
        const keyCode = e.keyCode;
        if(Keys.Ctrl===keyCode){
            this.ctrlKey=true;
            if(void 0 === this.instance||void 0 === this.start){
                return;
            }
            const rx=Math.round(Math.abs(this.end.x-this.start.x)/2);
            const ry=Math.round(Math.abs(this.end.y-this.start.y)/2);
            const radius = Math.min(rx,ry);
            const startPoint = this.getCtrlStartPoint(radius);
            if(radius===this.instance.rx&&radius===this.instance.ry&&startPoint.x===this.start.x&&startPoint.y===this.start.y){
                return;
            }
            this.update(startPoint,radius,rx,ry);
        }
    }
    protected ctrlKeyUpHandler(e:KeyboardEvent){
        const keyCode = e.keyCode;
        if(Keys.Ctrl===keyCode){
            // 恢复
            this.ctrlKey=false;
            if(void 0 ===this.instance){
                return;
            }
            const rx=Math.round(Math.abs(this.end.x-this.start.x)/2);
            const ry=Math.round(Math.abs(this.end.y-this.start.y)/2);
            const startPoint = this.getStartPoint();
            this.update(startPoint,rx,rx,ry);
        }
    }
    
    
    /**
     * 接收消息处理
     * @param {ICircleMessage} message
     */
    public onMessage(message:IEllipseMessage){
        const {id,start,rx,ry,fill,stroke,strokeDashArray} = message;
        let instance = this.getInstanceById(id) as FabricEllipse;
        this.eBoardCanvas.renderOnAddRemove=false;
    
        if(void 0 !== instance){
            this.eBoardCanvas.remove(instance);
        }
        instance = new FabricEllipse({
            fill:fill,
            left: start.x,
            top: start.y,
            rx:rx,
            ry:ry,
            stroke:stroke,
            strokeDashArray:strokeDashArray,
            strokeWidth:this.strokeWidth,
        },this.eBoardCanvas).setId(id);
        this.eBoardCanvas.add(instance);
        this.eBoardCanvas.requestRenderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
    
}

export {Ellipse};