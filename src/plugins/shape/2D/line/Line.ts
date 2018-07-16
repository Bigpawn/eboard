/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/10 19:45
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/10 19:45
 * @disc:线条插件
 */
import {fabric} from "fabric";
import {ArrowMode, ArrowType, LineType} from './LineType';
import {EBoardCanvas} from '../../../../EBoardCanvas';
import {EBoardEngine} from '../../../../EBoardEngine';
import {ArrowLine} from '../../../../extends/ArrowLine';
import {setCursor} from '../../../../utils/decorators';
import {CursorTypeName} from '../../../tool/cursor/CursorType';
import {IEvent} from '~fabric/fabric-impl';
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
const {Color} =fabric;





@setCursor(CursorTypeName.Pencil)
class Line extends AbstractShapePlugin{
    protected instance:ArrowLine;
    private color?:string;
    private borderDashed?:number[];
    private arrowType:ArrowType=ArrowType.NONE;
    private arrowMode:ArrowMode=ArrowMode.NEXT;
    private lineWidth:number=4;
    constructor(canvas:EBoardCanvas,eBoardEngine:EBoardEngine){
        super(canvas,eBoardEngine);
    }
    private getColor(){
        const defaultColor=this.eBoardEngine?this.eBoardEngine.getDefaultColor():undefined;
        return this.color||defaultColor;
    }
    protected onMouseMove(event:IEvent){
        if(void 0 === this.start){
            return;
        }
        super.onMouseDown(event);
        if(void 0 === this.instance){
            this.instance=new ArrowLine([this.start.x,this.start.y,this.end.x,this.end.y],{
                stroke: this.getColor(),
                strokeDashArray:this.borderDashed,
                strokeWidth:this.lineWidth,
                arrowType:this.arrowType,
                arrowMode:this.arrowMode
            });
            this.eBoardCanvas.add(this.instance);
        }else{
            this.instance.set({
                y2:this.end.y,
                x2:this.end.x,
            }).setCoords();
            this.eBoardCanvas.renderAll();
        }
    }
    public setColor(color:string,alpha?:number){
        const colorObj=new Color(color);
        if(!alpha){
            this.color=colorObj.toRgba();
        }else{
            let source = colorObj.getSource();
            source.splice(3,1,alpha);
            this.color=Color.fromSource(source).toRgba();
        }
        if(this.instance){
            this.instance.set({
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
        if(this.instance){
            this.instance.set({
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
}

export {Line};