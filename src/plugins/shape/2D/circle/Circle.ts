/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/12 21:10
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/12 21:10
 * @disc:Circle
 */

import {AbsractPlugin} from '../../../AbsractPlugin';
import {EBoardCanvas} from '../../../../EBoardCanvas';
import {EBoardEngine} from '../../../../EBoardEngine';
import {fabric} from "fabric";
import {setCursor} from '../../../../utils/decorators';
import {CursorTypeName} from '../../../tool/cursor/CursorType';

@setCursor(CursorTypeName.Compass)
class Circle extends AbsractPlugin{
    private circle?:fabric.Circle;
    private start?:{ x: number; y: number; };
    private fill?:string;
    private borderColor?:string="rgba(0,0,0,1)";
    private borderDashed?:any[];
    constructor(canvas:EBoardCanvas,eBoardEngine:EBoardEngine){
        super(canvas,eBoardEngine);
        this.downHandler=this.downHandler.bind(this);
        this.moveHandler=this.moveHandler.bind(this);
        this.upHandler=this.upHandler.bind(this);
    }
    private downHandler=(o:any)=>{
        this.start = this.eBoardCanvas.getPointer(o.e);
        // 创建对象实例
        this.circle=new fabric.Circle({
            originX:"center",
            originY:"center",
            fill:this.fill,
            left: this.start.x,
            top: this.start.y,
            stroke:this.borderColor,
            strokeDashArray:this.borderDashed,
        });
        this.eBoardCanvas.add(this.circle);
    };
    private moveHandler=(o:any)=>{
        if(this.start&&this.circle){
            let pos = this.eBoardCanvas.getPointer(o.e);
            const radius=Math.sqrt(Math.pow(pos.x-this.start.x,2)+Math.pow(pos.y-this.start.y,2));
            this.circle.set({
                radius:radius,
            }).setCoords();
            this.eBoardCanvas.requestRenderAll();
        }
    };
    private upHandler=(o:any)=>{
        if(this.start&&this.circle){
            let pos = this.eBoardCanvas.getPointer(o.e);
            const radius=Math.sqrt(Math.pow(pos.x-this.start.x,2)+Math.pow(pos.y-this.start.y,2));
            if(radius<4){
                this.eBoardCanvas.remove(this.circle);
            }else{
                this.circle.set({
                    radius:radius
                }).setCoords();
            }
            this.eBoardCanvas.requestRenderAll();
            this.circle=undefined;
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
            if(activePlugin && activePlugin instanceof Circle){
                this.eBoardEngine.setActivePlugin(undefined);
            }
            this.start=undefined;
            this.circle=undefined;
            this.eBoardCanvas.off('mouse:down', this.downHandler);
            this.eBoardCanvas.off('mouse:move', this.moveHandler);
            this.eBoardCanvas.off('mouse:up', this.upHandler);
        }
        super.setEnable(enable);// 最后调用，先处理自定义逻辑
        return this;
    }
}

export {Circle};