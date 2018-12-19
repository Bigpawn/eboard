/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/14 15:33
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/14 15:33
 * @disc:ShapePlugin抽象类
 */
import {AbstractPlugin} from '../AbstractPlugin';
import {IEvent} from "~fabric/fabric-impl";


export enum Quadrant{
    LT,
    LB,
    RT,
    RB
}

abstract class AbstractShapePlugin extends AbstractPlugin{
    protected _fill:string;
    protected _strokeWidth:number;// 私有strokeWidth,用于计算
    protected _stroke:string;
    private _strokeDashArray:number[];
    protected _fontSize:number;
    public get dashed(){
        return this.context.dashed;
    }
    public get color(){
        return this.context.color;
    }
    
    /**
     * 自动计算比例
     * @returns {number}
     */
    protected get strokeWidth(){
        return this.context.transform(this._strokeWidth||this.context.strokeWidth||this.context.getConfig("strokeWidth"));
    }
    /**
     * 设置线条宽度
     * @param {number} strokeWidth
     */
    protected set strokeWidth(strokeWidth:number){
        this._strokeWidth = strokeWidth;
    }
    
    protected get pencilWidth(){
        return this.context.transform(this._strokeWidth||this.context.pencilWidth||this.context.getConfig("strokeWidth"));
    }
  
    protected get fontColor(){
        return this._fill||this.context.fontColor||this.context.config.fontColor;
    }
    
    /**
     * 线条颜色
     * @returns {string}
     */
    protected get stroke(){
        return this.dashed?"":(this._stroke||this.color||this.context.config.stroke);
    }
    
    /**
     * 设置线条颜色
     * @param {string} stroke
     */
    protected set stroke(stroke:string){
        this._stroke=stroke;
    }
    
    /**
     * 填充色
     * @returns {string}
     */
    protected get fill(){
        return this.dashed?(this._fill||this.color||this.context.config.fill):"";
    }
    
    /**
     * 设置填充色
     * @param {string} fill
     */
    protected set fill(fill:string){
        this._fill = fill;
    }
    
    /**
     * 边框虚线点规则
     * @returns {any[] | undefined}
     */
    protected get strokeDashArray(){
        return this._strokeDashArray;
    }
    
    /**
     * 设置边框虚线
     * @param {number[]} strokeDashArray
     */
    protected set strokeDashArray(strokeDashArray:number[]){
        this._strokeDashArray = strokeDashArray;
    }
    
    /**
     * 字体大小
     * @returns {number}
     */
    protected get fontSize(){
        return this.context.transform(this._fontSize||this.context.fontSize||this.context.getConfig("fontSize"));
    }
    
    /**
     * 设置字体大小
     * @param {number} fontSize
     */
    protected set fontSize(fontSize:number){
        this._fontSize=fontSize;
    }
    
    /**
     * default mouseDown Event
     * @param {"~fabric/fabric-impl".IEvent} event
     */
    protected onMouseDown(event:IEvent){
        const point = this.eBoardCanvas.getPointer(event.e);
        this.start = {
            x:Math.round(point.x),
            y:Math.round(point.y)
        };
    }
    
    /**
     * default mouseMove Event
     * @param {"~fabric/fabric-impl".IEvent} event
     */
    protected onMouseMove(event:IEvent){
        const point = this.eBoardCanvas.getPointer(event.e);
        this.end = {
            x:Math.round(point.x),
            y:Math.round(point.y)
        };
    }
    
    /**
     * default mouseUp Event
     * 复杂逻辑
     * @param {"~fabric/fabric-impl".IEvent} event
     */
    protected onMouseUp(event:IEvent){
        this.instance=undefined as any;
        this.start=undefined as any;
    };
    /**
     * 计算位置相对象限
     * @param {{x: number; y: number}} point
     * @returns {any}
     */
    protected calcQuadrant(point:{x:number,y:number}){
        if(point.x>=this.start.x){
            // 右侧
            if(point.y>=this.start.y){
                return Quadrant.RB;
            }else{
                return Quadrant.RT;
            }
        }else{
            // 左侧
            if(point.y>=this.start.y){
                return Quadrant.LB;
            }else{
                return Quadrant.LT;
            }
        }
    }
    
    /**
     * 计算点相对于X轴角度
     * @param {{x: number; y: number}} pointer
     * @returns {number}
     */
    protected calcAngle(pointer:{x:number;y:number}){
        const offsetY = pointer.y - this.start.y;
        const offsetX = pointer.x - this.start.x;
        if(0===offsetY&&0===offsetX){
            return 0;
        }
        const angle = Math.atan(offsetY/offsetX)/Math.PI * 180;// 可能返回NaN 即0/0  没有移动，不做处理
        const quadrant = this.calcQuadrant(pointer);
        switch (quadrant){
            case Quadrant.RT:
                return 360 + angle;
            case Quadrant.LB:
                return 180 + angle;
            case Quadrant.LT:
                return 180 + angle;
            case Quadrant.RB:
            default:
                return angle;
        }
    }
}

export {AbstractShapePlugin};