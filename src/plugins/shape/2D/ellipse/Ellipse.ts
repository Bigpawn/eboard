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
import {
    IMessage,
    MessageTagEnum,
} from '../../../../middlewares/MessageMiddleWare';
import {Ellipse as FabricEllipse} from "../../../../extends/Ellipse";
import {message, setCursor} from '../../../../utils/decorators';
import {CursorTypeEnum} from '../../../../cursor/Enum';


export declare interface IEllipseMessage extends IMessage{
    start:{x:number;y:number};
    rx:number;
    ry:number;
}

@setCursor(CursorTypeEnum.Cross)
class Ellipse extends AbstractShapePlugin{
    private fill?:string;
    private stroke?:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
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
    private throw(tag:MessageTagEnum){
        return {
            id:this.instance.id,
            tag:tag,
            start:{x:this.instance.left,y:this.instance.top},
            rx:this.instance.rx,
            ry:this.instance.ry,
            type:this.instance.type
        }
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
        if(void 0 !== this.instance){
            this.instance.update({
                rx:this.ctrlKey?radius:rx,
                ry:this.ctrlKey?radius:ry,
                left: startPoint.x,
                top: startPoint.y,
            });
            this.eBoardCanvas.renderAll();
            this.throw(MessageTagEnum.Temporary);
        }else{
            this.instance=new FabricEllipse({
                fill:this.fill,
                left: startPoint.x,
                top: startPoint.y,
                rx:this.ctrlKey?radius:rx,
                ry:this.ctrlKey?radius:ry,
                stroke:this.stroke,
                strokeDashArray:this.strokeDashArray,
                strokeWidth:this.getCanvasPixel(this.strokeWidth)
            });
            this.eBoardCanvas.add(this.instance);
            this.throw(MessageTagEnum.Start);
        }
    };
    protected onMouseUp(event:IEvent){
        if(void 0 !== this.instance){
            this.throw(MessageTagEnum.End);
        }
        super.onMouseUp(event);
    }
    protected ctrlKeyDownHandler(e:KeyboardEvent){
        // 判断是否处于绘制模式
        const keyCode = e.keyCode;
        if(17===keyCode){
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
            this.instance.update({
                rx:radius,
                ry:radius,
                left: startPoint.x,
                top: startPoint.y,
            });
            this.eBoardCanvas.renderAll();
            this.throw(MessageTagEnum.Temporary);
        }
    }
    protected ctrlKeyUpHandler(e:KeyboardEvent){
        const keyCode = e.keyCode;
        if(17===keyCode){
            // 恢复
            this.ctrlKey=false;
            if(void 0 ===this.instance){
                return;
            }
            const rx=Math.round(Math.abs(this.end.x-this.start.x)/2);
            const ry=Math.round(Math.abs(this.end.y-this.start.y)/2);
            const startPoint = this.getStartPoint();
            this.instance.update({
                rx:rx,
                ry:ry,
                left: startPoint.x,
                top: startPoint.y,
            });
            this.eBoardCanvas.renderAll();
            this.throw(MessageTagEnum.Temporary);
        }
    }
    
    
    /**
     * 接收消息处理
     * @param {ICircleMessage} message
     */
    public onMessage(message:IEllipseMessage){
        const {id,start,rx,ry,tag} = message;
        let instance = this.getInstanceById(id) as FabricEllipse;
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 === instance){
            instance = new FabricEllipse({
                fill:this.fill,
                left: start.x,
                top: start.y,
                rx:rx,
                ry:ry,
                stroke:this.stroke,
                strokeDashArray:this.strokeDashArray,
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
                    rx:rx,
                    ry:ry,
                    left: start.x,
                    top: start.y,
                });
                break;
            default:
                break;
        }
        this.eBoardCanvas.requestRenderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
    
}

export {Ellipse};