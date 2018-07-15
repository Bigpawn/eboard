/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/13 12:51
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/13 12:51
 * @disc:矩形Plugin  还可以使用Path实现   flipX flipY 不起作用，使用动态计算left top实现四象限
 */

// path 实现矩形绘制
/*var path =
    "M " +
    mouseFrom.x +
    " " +
    mouseFrom.y +
    " L " +
    mouseTo.x +
    " " +
    mouseFrom.y +
    " L " +
    mouseTo.x +
    " " +
    mouseTo.y +
    " L " +
    mouseFrom.x +
    " " +
    mouseTo.y +
    " L " +
    mouseFrom.x +
    " " +
    mouseFrom.y +
    " z";
canvasObject = new fabric.Path(path, {
    left: left,
    top: top,
    stroke: color,
    strokeWidth: drawWidth,
    fill: "rgba(255, 255, 255, 0)"
});*/
import {EBoardCanvas} from '../../../../EBoardCanvas';
import {fabric} from "fabric";
import {EBoardEngine} from '../../../../EBoardEngine';
import {ctrlKeyEnable} from '../../../../utils/decorators';
import {AbstractShapePlugin, Quadrant} from '../../AbstractShapePlugin';
import {IEvent} from '~fabric/fabric-impl';

@ctrlKeyEnable(true)
class Rectangle extends AbstractShapePlugin{
    protected instance?:fabric.Rect;
    private fill?:string;
    private stroke?:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    protected ctrlKeyEnable:boolean;
    protected ctrlKey:boolean=false;
    constructor(canvas:EBoardCanvas,eBoardEngine:EBoardEngine){
        super(canvas,eBoardEngine);
        this.ctrlKeyDownHandler=this.ctrlKeyDownHandler.bind(this);
        this.ctrlKeyUpHandler=this.ctrlKeyUpHandler.bind(this);
    }
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
    protected onMouseMove(event:IEvent){
        if(void 0 ===this.start){
            return;
        }
        super.onMouseMove(event);
        let pos = this.eBoardCanvas.getPointer(event.e);
        this.end = pos;
        const width=Math.abs(pos.x-this.start.x);
        const height=Math.abs(pos.y-this.start.y);
        const length = Math.min(width,height);
        const startPoint = this.ctrlKey?this.getCtrlStartPoint(length):this.getStartPoint();
        if(this.instance){
            this.instance.set({
                width:this.ctrlKey?length:width,
                height:this.ctrlKey?length:height,
                left: startPoint.x,
                top: startPoint.y,
            }).setCoords();
            this.eBoardCanvas.renderAll();
        }else{
            this.instance=new fabric.Rect({
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
        }
    };
    protected onMouseUp(event:IEvent){
        super.onMouseUp(event);
        this.instance = undefined as any;
        this.start = undefined as any;
    }
    private ctrlKeyDownHandler(e:KeyboardEvent){
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
            this.instance.set({
                width:length,
                height:length,
                left:startPoint.x,
                top:startPoint.y
            }).setCoords();
            this.eBoardCanvas.renderAll();
        }
    }
    private ctrlKeyUpHandler(e:KeyboardEvent){
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
            this.instance.set({
                width:width,
                height:height,
                left:startPoint.x,
                top:startPoint.y
            }).setCoords();
            this.eBoardCanvas.renderAll();
        }
    }
    public setEnable(enable:boolean){
        if(this.enable===enable){
            return;
        }
        this.enable=enable;
        const activePlugin=this.eBoardEngine.getActivePlugin();
        if(enable){
            // 关闭当前激活的组件
            if(activePlugin){
                activePlugin.setEnable(false);
            }
            this.eBoardEngine.setActivePlugin(this);
            this.eBoardCanvas.on('mouse:down', this.onMouseDown);
            this.eBoardCanvas.on('mouse:move', this.onMouseMove);
            this.eBoardCanvas.on('mouse:up', this.onMouseUp);
            if(this.ctrlKeyEnable){
                window.addEventListener("keydown",this.ctrlKeyDownHandler);
                window.addEventListener("keyup",this.ctrlKeyUpHandler);
            }
        }else{
            if(activePlugin && activePlugin instanceof Rectangle){
                this.eBoardEngine.setActivePlugin(undefined);
            }
            this.start=undefined as any;
            this.instance=undefined as any;
            this.eBoardCanvas.off('mouse:down', this.onMouseDown);
            this.eBoardCanvas.off('mouse:move', this.onMouseMove);
            this.eBoardCanvas.off('mouse:up', this.onMouseUp);
            window.removeEventListener("keydown",this.ctrlKeyDownHandler);
            window.removeEventListener("keyup",this.ctrlKeyUpHandler);
        }
        super.setEnable(enable);// 最后调用，先处理自定义逻辑
        return this;
    }
}

export {Rectangle};