/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/10 19:45
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/10 19:45
 * @disc:线条插件
 */
import {fabric} from "fabric";
import {ArrowMode, ArrowType, LineType} from './LineType';
import {AbsPlugin} from '../AbsPlugin';
import {EBoardCanvas} from '../EBoardCanvas';
import {EBoardEngine} from '../EBoardEngine';
import {ArrowLine} from './ArrowLine';
const {Color} =fabric;






class Line extends AbsPlugin{
    private line?:ArrowLine;
    private color?:string;
    private borderDashed?:number[];
    private arrowType:ArrowType=ArrowType.NONE;
    private arrowMode:ArrowMode=ArrowMode.NEXT;
    private enable:boolean=false;
    private lineWidth:number=4;
    constructor(canvas:EBoardCanvas,eBoardEngine:EBoardEngine){
        super(canvas,eBoardEngine);
        this.downHandler=this.downHandler.bind(this);
        this.moveHandler=this.moveHandler.bind(this);
        this.upHandler=this.upHandler.bind(this);
    }
    private getColor(){
        const defaultColor=this.eBoardEngine?this.eBoardEngine.getDefaultColor():undefined;
        return this.color||defaultColor;
    }
    private start?:{ x: number; y: number; };
    private downHandler=(o:any)=>{
        this.start = this.eBoardCanvas.getPointer(o.e);
        // 创建对象实例
        this.line=new ArrowLine([this.start.x,this.start.y,this.start.x,this.start.y],{
            stroke: this.getColor(),
            strokeDashArray:this.borderDashed,
            strokeWidth:this.lineWidth,
            arrowType:this.arrowType,
            arrowMode:this.arrowMode
        });
        this.eBoardCanvas.add(this.line);
    };
    private moveHandler=(o:any)=>{
        if(this.start&&this.line){
            let pos = this.eBoardCanvas.getPointer(o.e);
            this.line.set({
                y2:pos.y,
                x2:pos.x,
            }).setCoords();
            this.eBoardCanvas.requestRenderAll();
        }
    };
    private upHandler=(o:any)=>{
        if(this.start&&this.line){
            let pos = this.eBoardCanvas.getPointer(o.e);
            const delX=Math.abs(pos.x-this.start.x);
            const delY=Math.abs(pos.y-this.start.y);
            if(delX<4&&delY<4){
                this.eBoardCanvas.remove(this.line);
            }else{
                this.line.set({
                    y2:pos.y,
                    x2:pos.x
                }).setCoords();
            }
            this.eBoardCanvas.requestRenderAll();
            this.line=undefined;
            this.start=undefined;
        }
    };
    public setColor(color:string,alpha?:number){
        const colorObj=new Color(color);
        if(!alpha){
            this.color=colorObj.toRgba();
        }else{
            let source = colorObj.getSource();
            source.splice(3,1,alpha);
            this.color=Color.fromSource(source).toRgba();
        }
        if(this.line){
            this.line.set({
                fill:this.color
            });
            this.eBoardCanvas.requestRenderAll();
        }
        return this;
    };
    public setAlpha(alpha:number){
        let colorObj=new Color(this.color);
        colorObj.setAlpha(alpha);
        this.color=colorObj.toRgba();
        if(this.line){
            this.line.set({
                fill:this.color
            });
            this.eBoardCanvas.requestRenderAll();
        }
        return this;
    };
    public setLineWidth(lineWidth:number){
        this.lineWidth=lineWidth;
    }
    public setLineType(lineType:LineType){
        switch (lineType){
            case LineType.SOLID:
                this.borderDashed=undefined;
                break;
            case LineType.DASHED:
                this.borderDashed=[15,5];
                break;
            default:
                this.borderDashed=undefined;
                break;
        }
        return this;
    };
    public setArrowType(arrowType:ArrowType){
        this.arrowType=arrowType;
        return this;
    }
    public setArrowMode(arrowMode:ArrowMode){
        this.arrowMode=arrowMode;
        return this;
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
        }else{
            if(activePlugin && activePlugin instanceof Line){
                this.eBoardEngine.setActivePlugin(undefined);
            }
            this.start=undefined;
            this.line=undefined;
            this.eBoardCanvas.off('mouse:down', this.downHandler);
            this.eBoardCanvas.off('mouse:move', this.moveHandler);
            this.eBoardCanvas.off('mouse:up', this.upHandler);
        }
        return this;
    }
}

export {Line};