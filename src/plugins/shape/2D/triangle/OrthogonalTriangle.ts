/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/15 14:58
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/15 14:58
 * @disc:直角三角形  会触发两次重绘，后期考虑优化
 */
import {fabric} from "fabric";
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import {IEvent} from '~fabric/fabric-impl';
import {OrTriangle} from '../../../../extends/OrTriangle';



class OrthogonalTriangle extends AbstractShapePlugin{
    private instance:fabric.Path;
    private fill?:string;
    private stroke?:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    protected onMouseMove(event:IEvent){
        if(void 0 === this.start){
            return;
        }
        super.onMouseMove(event);
        this.end = this.eBoardCanvas.getPointer(event.e);
        const path =
            "M " +
            this.start.x +
            " " +
            this.start.y +
            " L " +
            this.start.x +
            " " +
            this.end.y +
            " L " +
            this.end.x +
            " " +
            this.end.y +
            " z";
        if(void 0 ===this.instance){
            this.instance=new OrTriangle(path, {
                stroke: this.stroke,
                strokeWidth: this.getCanvasPixel(this.strokeWidth),
                strokeDashArray:this.strokeDashArray,
                fill: this.fill
            });
            this.eBoardCanvas.add(this.instance);
        }else{
            this.eBoardCanvas.remove(this.instance);
            this.instance=new OrTriangle(path, {
                stroke: this.stroke,
                strokeWidth: this.getCanvasPixel(this.strokeWidth),
                fill: this.fill,
                strokeDashArray:this.strokeDashArray,
            });
            this.eBoardCanvas.add(this.instance);
        }
    };
    protected onMouseUp(event:IEvent){
        super.onMouseUp(event);
        this.start=undefined as any;
        this.instance=undefined as any;
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
            if(activePlugin && activePlugin instanceof OrthogonalTriangle){
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
export {OrthogonalTriangle};