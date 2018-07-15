/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/15 9:16
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/15 9:16
 * @disc:等边三角形
 * 会触发两次重绘  后期考虑优化
 */
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import {fabric} from "fabric";
import {IEvent} from '~fabric/fabric-impl';
import {EqTriangle} from '../../../../extends/EqTriangle';

class EquilateralTriangle extends AbstractShapePlugin{
    private instance:fabric.Path;
    private fill?:string;
    private stroke?:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    private calcPoints(){
        const start = this.start;
        const end = this.end;
        const r = Math.sqrt(Math.pow(end.x-start.x,2)+Math.pow(end.y-start.y,2));
        // 根据k1 来确定点位置
        const angle = this.calcAngle(end);
        let angle1 = angle + 120;
        let angle2 = angle -120;// 0 -360范围
        if(angle1<0){
            angle1 +=360;
        }
        if(angle1>360){
            angle1-=360;
        }
        if(angle2<0){
            angle2 +=360;
        }
        if(angle2>360){
            angle2-=360;
        }
        const offsetY1 = Math.abs(r * Math.sin(angle1/180 * Math.PI));
        const offsetX1 = Math.abs(r * Math.cos(angle1/180 * Math.PI));
        const offsetY2 = Math.abs(r * Math.sin(angle2/180 * Math.PI));
        const offsetX2 = Math.abs(r * Math.cos(angle2/180 * Math.PI));
        let firstPoint,secondPoint;
        if(angle1>0&&angle1<=90){
            firstPoint={
                x:start.x+offsetX1,
                y:start.y+offsetY1
            }
        }else if(angle1>90&&angle1<=180){
            firstPoint={
                x:start.x-offsetX1,
                y:start.y+offsetY1
            }
        }else if(angle1>180&&angle1<=270){
            firstPoint={
                x:start.x-offsetX1,
                y:start.y-offsetY1
            }
        }else{
            firstPoint={
                x:start.x+offsetX1,
                y:start.y-offsetY1
            }
        }
    
        if(angle2>0&&angle2<=90){
            secondPoint={
                x:start.x+offsetX2,
                y:start.y+offsetY2
            }
        }else if(angle2>90&&angle2<=180){
            secondPoint={
                x:start.x-offsetX2,
                y:start.y+offsetY2
            }
        }else if(angle2>180&&angle2<=270){
            secondPoint={
                x:start.x-offsetX2,
                y:start.y-offsetY2
            }
        }else{
            secondPoint={
                x:start.x+offsetX2,
                y:start.y-offsetY2
            }
        }
        
        return {
            firstPoint,
            secondPoint,
            lastPoint: end
        }
    };
    protected onMouseMove(event:IEvent){
        if(void 0 === this.start){
            return;
        }
        super.onMouseMove(event);
        this.end = this.eBoardCanvas.getPointer(event.e);
        const calcPoints = this.calcPoints();
        const path =
            "M " +
            calcPoints.firstPoint.x +
            " " +
            calcPoints.firstPoint.y +
            " L " +
            calcPoints.secondPoint.x +
            " " +
            calcPoints.secondPoint.y +
            " L " +
            calcPoints.lastPoint.x +
            " " +
            calcPoints.lastPoint.y +
            " z";
        if(void 0 ===this.instance){
            this.instance=new EqTriangle(path, {
                stroke: this.stroke,
                strokeWidth: this.getCanvasPixel(this.strokeWidth),
                strokeDashArray:this.strokeDashArray,
                fill: this.fill
            });
            this.eBoardCanvas.add(this.instance);
        }else{
            this.eBoardCanvas.remove(this.instance);
            this.instance=new EqTriangle(path, {
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
            if(activePlugin && activePlugin instanceof EquilateralTriangle){
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
export {EquilateralTriangle};