/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/13 12:51
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/13 12:51
 * @disc:矩形Plugin
 */
import {EBoardCanvas} from '../../../../EBoardCanvas';
import {fabric} from "fabric";
import {Ellipse} from '../ellipse/Ellipse';
import {EBoardEngine} from '../../../../EBoardEngine';
import {ctrlKeyEnable} from '../../../../utils/decorators';
import {AbstractPlugin} from '../../../AbstractPlugin';

@ctrlKeyEnable(true)
class Rectangle extends AbstractPlugin{
    private rect?:fabric.Rect;
    private start?:{ x: number; y: number; };
    private end:{ x: number; y: number; };
    private fill?:string;
    private stroke?:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    protected ctrlKeyEnable:boolean;
    protected ctrlKey:boolean=false;
    constructor(canvas:EBoardCanvas,eBoardEngine:EBoardEngine){
        super(canvas,eBoardEngine);
        this.downHandler=this.downHandler.bind(this);
        this.moveHandler=this.moveHandler.bind(this);
        this.upHandler=this.upHandler.bind(this);
        this.ctrlKeyDownHandler=this.ctrlKeyDownHandler.bind(this);
        this.ctrlKeyUpHandler=this.ctrlKeyUpHandler.bind(this);
    }
    private getStartPoint():{x:number;y:number}|undefined{
        const start = this.start;
        const end = this.end;
        if(start){
            return {
                x:Math.min(start.x,end.x),
                y:Math.min(start.y,end.y)
            };
        }else{
            return;
        }
    }
    private getCtrlStartPoint(length:number):{x:number;y:number}|undefined{
        const start = this.start;
        const end = this.end;
        if(start){
            // 如果end.x>start.x 则x===start.x，否则x===start.x-radius
            // 如果end.y>start.y 则y===start.y，否则y===start.y-radius
            return {
                x:end.x>start.x?start.x:start.x-length,
                y:end.y>start.y?start.y:start.y-length
            };
        }else{
            return;
        }
    };
    private downHandler(o:any){
        this.start = this.eBoardCanvas.getPointer(o.e);
        this.end = this.start;
        // 创建对象实例
        this.rect=new fabric.Rect({
            fill:this.fill,
            left: this.start.x,
            top: this.start.y,
            stroke:this.stroke,
            strokeDashArray:this.strokeDashArray,
            strokeWidth:this.getCanvasPixel(this.strokeWidth)
        });
        this.eBoardCanvas.add(this.rect);
    };
    private moveHandler(o:any){
        if(this.start&&this.rect){
            let pos = this.eBoardCanvas.getPointer(o.e);
            this.end = pos;
            const width=Math.abs(pos.x-this.start.x);
            const height=Math.abs(pos.y-this.start.y);
            const length = Math.min(width,height);
            const startPoint = this.ctrlKey?this.getCtrlStartPoint(length):this.getStartPoint();
            if(void 0 ===startPoint){return;}
            this.rect.set({
                width:this.ctrlKey?length:width,
                height:this.ctrlKey?length:height,
                left: startPoint.x,
                top: startPoint.y,
            }).setCoords();
            this.eBoardCanvas.renderAll();
        }
    };
    private upHandler(o:any){
        if(this.start&&this.rect){
            let pos = this.eBoardCanvas.getPointer(o.e);
            this.end = pos;
            const width=Math.abs(pos.x-this.start.x);
            const height=Math.abs(pos.y-this.start.y);
            if(width<4||height<4){
                this.eBoardCanvas.remove(this.rect);
            }else{
                const length = Math.min(width,height);
                const startPoint = this.ctrlKey?this.getCtrlStartPoint(length):this.getStartPoint();
                if(void 0 ===startPoint){return;}
                this.rect.set({
                    width:this.ctrlKey?length:width,
                    height:this.ctrlKey?length:height,
                    left: startPoint.x,
                    top: startPoint.y,
                }).setCoords();
            }
            this.eBoardCanvas.renderAll();
            this.rect=undefined;
            this.start=undefined;
        }
    };
    private ctrlKeyDownHandler(e:KeyboardEvent){
        // 判断是否处于绘制模式
        const keyCode = e.keyCode;
        if(17===keyCode){
            this.ctrlKey=true;
            if(this.start&&this.rect){
                const width=Math.abs(this.end.x-this.start.x);
                const height=Math.abs(this.end.y-this.start.y);
                const length = Math.min(width,height);
                // 起点需要重新算
                const startPoint = this.getCtrlStartPoint(length);
                if(void 0 === startPoint){return}
                this.rect.set({
                    width:length,
                    height:length,
                    left:startPoint.x,
                    top:startPoint.y
                }).setCoords();
                this.eBoardCanvas.renderAll();
            }
        }
    }
    private ctrlKeyUpHandler(e:KeyboardEvent){
        const keyCode = e.keyCode;
        if(17===keyCode){
            // 恢复
            this.ctrlKey=false;
            if(this.start&&this.rect){
                const width=Math.abs(this.end.x-this.start.x);
                const height=Math.abs(this.end.y-this.start.y);
                const startPoint = this.getStartPoint();
                if(void 0 === startPoint){return}
                this.rect.set({
                    width:width,
                    height:height,
                    left:startPoint.x,
                    top:startPoint.y
                }).setCoords();
                this.eBoardCanvas.renderAll();
            }
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
            this.eBoardCanvas.on('mouse:down', this.downHandler);
            this.eBoardCanvas.on('mouse:move', this.moveHandler);
            this.eBoardCanvas.on('mouse:up', this.upHandler);
            if(this.ctrlKeyEnable){
                window.addEventListener("keydown",this.ctrlKeyDownHandler);
                window.addEventListener("keyup",this.ctrlKeyUpHandler);
            }
        }else{
            if(activePlugin && activePlugin instanceof Ellipse){
                this.eBoardEngine.setActivePlugin(undefined);
            }
            this.start=undefined;
            this.rect=undefined;
            this.eBoardCanvas.off('mouse:down', this.downHandler);
            this.eBoardCanvas.off('mouse:move', this.moveHandler);
            this.eBoardCanvas.off('mouse:up', this.upHandler);
            window.removeEventListener("keydown",this.ctrlKeyDownHandler);
            window.removeEventListener("keyup",this.ctrlKeyUpHandler);
        }
        super.setEnable(enable);// 最后调用，先处理自定义逻辑
        return this;
    }
}

export {Rectangle};