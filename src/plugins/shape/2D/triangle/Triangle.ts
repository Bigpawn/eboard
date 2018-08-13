/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/13 21:47
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/13 21:47
 * @disc:三角形  flipX,flipY 实现翻转
 */

import {AbstractShapePlugin, Quadrant} from '../../AbstractShapePlugin';
import {IEvent} from '~fabric/fabric-impl';
import {ctrlKeyEnable, message, setCursor} from '../../../../utils/decorators';
import {
    IMessage,
    MessageTagEnum,
} from '../../../../middlewares/MessageMiddleWare';
import {Triangle as FabricTriangle} from "../../../../extends/Triangle";
import {CursorTypeEnum} from '../../../../cursor/Enum';


export declare interface ITriangleMessage extends IMessage{
    start:{x:number;y:number};
    width:number;
    height:number;
    flipX:boolean;
    flipY:boolean;
    stroke:string;
    fill:string;
}



@ctrlKeyEnable(true)
@setCursor(CursorTypeEnum.Cross)
class Triangle extends AbstractShapePlugin{
    protected instance:FabricTriangle;
    protected fill:string;
    protected stroke:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
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
    private getCtrlStartPoint(size:{width:number,height:number}):{x:number;y:number}{
        const start = this.start;
        const end = this.end;
        const quadrant = this.calcQuadrant(end);
        switch (quadrant){
            case Quadrant.RT:// 第一象限
                return {
                    x:start.x,
                    y:start.y-size.height
                };
            case Quadrant.LT:// 第二象限
                return {
                    x:start.x-size.width,
                    y:start.y-size.height
                };
            case Quadrant.LB:// 第三象限
                return {
                    x:start.x-size.width,
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
    protected onMouseMove(event:IEvent){
        if(void 0 === this.start){
            return;
        }
        super.onMouseMove(event);
        
        const pos = this.end;
        const offsetX = pos.x-this.start.x;
        const offsetY = pos.y-this.start.y;
        const width=Math.abs(offsetX);
        const height=Math.abs(offsetY);
        const calcSize = this.calcEquilate(width,height);
        const startPoint = this.ctrlKey?this.getCtrlStartPoint(calcSize):this.getStartPoint();
    
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 !== this.instance){
            this.eBoardCanvas.remove(this.instance);
        }
        const id = this.instance?this.instance.id:undefined;
        this.instance= new FabricTriangle({
            fill:this.getFillColor(),
            left: startPoint.x,
            top: startPoint.y,
            stroke:this.getStrokeColor(),
            flipX:offsetX<0,
            flipY:offsetY<0,
            width:this.ctrlKey?calcSize.width:width,
            height:this.ctrlKey?calcSize.height:height,
            strokeDashArray:this.strokeDashArray,
            strokeWidth:this.getCanvasPixel(this.strokeWidth)
        });
        if(void 0 !== id){
            this.instance.setId(id);
        }
        this.throw();
        this.eBoardCanvas.add(this.instance);
        this.eBoardCanvas.renderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    };
    private calcEquilate(width:number,height:number){
        // 根据宽度计算高度  根据高度计算宽度，同时取小值
        const calcHeight = width * Math.sqrt(3)/2;
        const calcWidth = height * 2 / Math.sqrt(3);
        return {
            width:Math.min(calcWidth,width),
            height:Math.min(calcHeight,height)
        }
    };
    protected ctrlKeyDownHandler(e:KeyboardEvent){
        // 判断是否处于绘制模式
        const keyCode = e.keyCode;
        if(17===keyCode){
            this.ctrlKey=true;
            if(void 0 !== this.instance){
                const offsetX = this.end.x-this.start.x;
                const offsetY = this.end.y-this.start.y;
                const width=Math.abs(offsetX);
                const height=Math.abs(offsetY);
                const calcSize = this.calcEquilate(width,height);
                const startPoint = this.getCtrlStartPoint(calcSize);
    
                this.eBoardCanvas.renderOnAddRemove=false;
                if(void 0 !== this.instance){
                    this.eBoardCanvas.remove(this.instance);
                }
                const id = this.instance?this.instance.id:undefined;
                this.instance= new FabricTriangle({
                    fill:this.getFillColor(),
                    left: startPoint.x,
                    top: startPoint.y,
                    stroke:this.getStrokeColor(),
                    flipX:offsetX<0,
                    flipY:offsetY<0,
                    width:calcSize.width,
                    height:calcSize.height,
                    strokeDashArray:this.strokeDashArray,
                    strokeWidth:this.getCanvasPixel(this.strokeWidth)
                });
                if(void 0 !== id){
                    this.instance.setId(id);
                }
                this.throw();
                this.eBoardCanvas.add(this.instance);
                this.eBoardCanvas.renderAll();
                this.eBoardCanvas.renderOnAddRemove=true;
            }
        }
    }
    protected ctrlKeyUpHandler(e:KeyboardEvent){
        const keyCode = e.keyCode;
        if(17===keyCode){
            // 恢复
            this.ctrlKey=false;
            if(void 0 !== this.instance){
                const width=Math.abs(this.end.x-this.start.x);
                const height=Math.abs(this.end.y-this.start.y);
                const offsetX = this.end.x-this.start.x;
                const offsetY = this.end.y-this.start.y;
                const startPoint = this.getStartPoint();
                this.eBoardCanvas.renderOnAddRemove=false;
                if(void 0 !== this.instance){
                    this.eBoardCanvas.remove(this.instance);
                }
                const id = this.instance?this.instance.id:undefined;
                this.instance= new FabricTriangle({
                    fill:this.getFillColor(),
                    left: startPoint.x,
                    top: startPoint.y,
                    stroke:this.getStrokeColor(),
                    flipX:offsetX<0,
                    flipY:offsetY<0,
                    width:width,
                    height:height,
                    strokeDashArray:this.strokeDashArray,
                    strokeWidth:this.getCanvasPixel(this.strokeWidth)
                });
                if(void 0 !== id){
                    this.instance.setId(id);
                }
                this.throw();
                this.eBoardCanvas.add(this.instance);
                this.eBoardCanvas.renderAll();
                this.eBoardCanvas.renderOnAddRemove=true;
            }
        }
    }
    
    protected onMouseUp(event:IEvent){
        this.throw();
        super.onMouseUp(event);
    }
    @message
    private throw(){
        return this.instance?{
            id:this.instance.id,
            tag:MessageTagEnum.Shape,
            start:{x:this.instance.left as number,y:this.instance.top as number},
            flipX:this.instance.flipX,
            flipY:this.instance.flipY,
            width:this.instance.width,
            height:this.instance.height,
            type:this.instance.type,
            fill:this.instance.fill,
            stroke:this.instance.stroke
        }:undefined
    }
    
    /**
     * 接收消息处理
     * @param {ICircleMessage} message
     */
    public onMessage(message:ITriangleMessage){
        const {id,start,flipX,flipY,width,height,stroke,fill} = message;
        let instance = this.getInstanceById(id) as FabricTriangle;
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 !== instance){
            this.eBoardCanvas.remove(instance);
        }
        instance = new FabricTriangle({
            fill:fill,
            left: start.x,
            top: start.y,
            stroke:stroke,
            flipX:flipX,
            flipY:flipY,
            width:width,
            height:height,
            strokeDashArray:this.strokeDashArray,
            strokeWidth:this.getCanvasPixel(this.strokeWidth)
        }).setId(id);
        this.eBoardCanvas.add(instance);
        this.eBoardCanvas.requestRenderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
}

export {Triangle};