/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/13 15:40
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/13 15:40
 * @disc:Square 正方形 extends Rectangle without Ctrl KeyEvent;
 * 修改成起点为正方形中心点，终点为正方形一个角，自动旋转
 */
import {fabric} from "fabric";
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import {IEvent} from '~fabric/fabric-impl';

class Square extends AbstractShapePlugin{
    private instance:fabric.Rect;
    private fill?:string;
    private stroke?:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    protected onMouseMove(event:IEvent){
        if(void 0 === this.start){
            return;
        }
        super.onMouseMove(event);
        const pos = this.eBoardCanvas.getPointer(event.e);
        const width=Math.abs(pos.x-this.start.x);
        const height=Math.abs(pos.y-this.start.y);
        const length = Math.sqrt(2) * Math.sqrt(Math.pow(width,2)+Math.pow(height,2));
        const angle = this.calcAngle(pos);
        if(void 0 === this.instance){
            this.instance=new fabric.Rect({
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
                angle:angle-45
            });
            this.eBoardCanvas.add(this.instance);
        }else{
            this.instance.set({
                width:length,
                height:length,
                angle:angle-45
            }).setCoords();
            this.eBoardCanvas.renderAll();
        }
    };
    protected onMouseUp(event:IEvent){
        super.onMouseUp(event);
        this.instance=undefined as any;
        this.start=undefined as any;
    };
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
        }else{
            if(activePlugin && activePlugin instanceof Square){
                this.eBoardEngine.setActivePlugin(undefined);
            }
            this.start=undefined as any;
            this.instance=undefined as any;
            this.eBoardCanvas.off('mouse:down', this.onMouseDown);
            this.eBoardCanvas.off('mouse:move', this.onMouseMove);
            this.eBoardCanvas.off('mouse:up', this.onMouseUp);
        }
        super.setEnable(enable);// 最后调用，先处理自定义逻辑
        return this;
    }
}

export {Square}