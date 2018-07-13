/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/13 15:40
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/13 15:40
 * @disc:Square 正方形 extends Rectangle without Ctrl KeyEvent;
 * 修改成起点为正方形中心点，终点为正方形一个角，自动旋转
 */
import {EBoardCanvas} from '../../../../EBoardCanvas';
import {Ellipse} from '../ellipse/Ellipse';
import {fabric} from "fabric";
import {EBoardEngine} from '../../../../EBoardEngine';
import {AbstractPlugin} from '../../../AbstractPlugin';

class Square extends AbstractPlugin{
    private square?:fabric.Rect;
    private start?:{ x: number; y: number; };
    private fill?:string;
    private stroke?:string="rgba(0,0,0,1)";
    private strokeDashArray?:any[];
    private strokeWidth:number=1;
    constructor(canvas:EBoardCanvas,eBoardEngine:EBoardEngine){
        super(canvas,eBoardEngine);
        this.downHandler=this.downHandler.bind(this);
        this.moveHandler=this.moveHandler.bind(this);
        this.upHandler=this.upHandler.bind(this);
    }
    private downHandler(o:any){
        this.start = this.eBoardCanvas.getPointer(o.e);
        // 创建对象实例
        this.square=new fabric.Rect({
            fill:this.fill,
            left: this.start.x,
            top: this.start.y,
            stroke:this.stroke,
            strokeDashArray:this.strokeDashArray,
            strokeWidth:this.getCanvasPixel(this.strokeWidth),
            originX:"center",
            originY:"center"
        });
        this.eBoardCanvas.add(this.square);
    };
    private calcAngle(pos:{x:number;y:number}){
        if(this.start){
            const lengthAB = 10,
                lengthAC = Math.sqrt( Math.pow(this.start.x - pos.x, 2) + Math.pow(this.start.y - pos.y, 2)),
                lengthBC = Math.sqrt( Math.pow(this.start.x+10 - pos.x, 2) +
                    Math.pow(this.start.y - pos.y, 2));
            const cosA = (Math.pow(lengthAB, 2) + Math.pow(lengthAC, 2) - Math.pow(lengthBC, 2)) /
                (2 * lengthAB * lengthAC);
            const angleA = Math.round( Math.acos(cosA) * 180 / Math.PI );
            if(pos.y<this.start.y){
                return 360 - angleA;
            }else{
                return angleA;
            }
        }else{
            return 0;
        }
    }
    private moveHandler(o:any){
        if(this.start&&this.square){
            let pos = this.eBoardCanvas.getPointer(o.e);
            const width=Math.abs(pos.x-this.start.x);
            const height=Math.abs(pos.y-this.start.y);
            const length = Math.sqrt(2) * Math.sqrt(Math.pow(width,2)+Math.pow(height,2));
            
            // 计算角度
            const angle = this.calcAngle(pos);
            this.square.set({
                width:length,
                height:length,
                angle:angle-45
            }).setCoords();
            this.eBoardCanvas.renderAll();
            // this.eBoardCanvas.requestRenderAll();
        }
    };
    private upHandler(o:any){
        if(this.start&&this.square){
            let pos = this.eBoardCanvas.getPointer(o.e);
    
            const width=Math.abs(pos.x-this.start.x);
            const height=Math.abs(pos.y-this.start.y);
            const length = Math.sqrt(2) * Math.sqrt(Math.pow(width,2)+Math.pow(height,2));
            
            if(width<4||height<4){
                this.eBoardCanvas.remove(this.square);
            }else{
                const angle = this.calcAngle(pos);
                this.square.set({
                    width:length,
                    height:length,
                    angle:angle-45
                }).setCoords();
            }
            this.eBoardCanvas.renderAll();
            // this.eBoardCanvas.requestRenderAll();
            this.square=undefined;
            this.start=undefined;
        }
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
            this.eBoardCanvas.on('mouse:down', this.downHandler);
            this.eBoardCanvas.on('mouse:move', this.moveHandler);
            this.eBoardCanvas.on('mouse:up', this.upHandler);
        }else{
            if(activePlugin && activePlugin instanceof Ellipse){
                this.eBoardEngine.setActivePlugin(undefined);
            }
            this.start=undefined;
            this.square=undefined;
            this.eBoardCanvas.off('mouse:down', this.downHandler);
            this.eBoardCanvas.off('mouse:move', this.moveHandler);
            this.eBoardCanvas.off('mouse:up', this.upHandler);
        }
        super.setEnable(enable);// 最后调用，先处理自定义逻辑
        return this;
    }
}

export {Square}