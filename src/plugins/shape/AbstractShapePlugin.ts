/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/14 15:33
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/14 15:33
 * @disc:ShapePlugin抽象类
 */
import {AbstractPlugin} from '../AbstractPlugin';
import {IEvent} from "~fabric/fabric-impl";
import Config from '../../utils/Config';


export enum Quadrant{
    LT,
    LB,
    RT,
    RB
}

abstract class AbstractShapePlugin extends AbstractPlugin{
    private _fill:string;
    private _strokeWidth:number=1;// 私有strokeWidth,用于计算
    private _borderWidth:number=1;
    private _stroke:string="rgb(0,0,0)";
    private _strokeDashArray:number[];
    
    /**
     * 操作框大小
     * @returns {number}
     */
    protected get cornerSize(){
        return this.eBoardCanvas.getSize(Config.getCornerSize());
    }
    /**
     * 自动计算比例
     * @returns {number}
     */
    protected get strokeWidth(){
        return this.eBoardCanvas.getSize(this._strokeWidth);
    }
    
    /**
     * 设置线条宽度
     * @param {number} strokeWidth
     */
    protected set strokeWidth(strokeWidth:number){
        this._strokeWidth = strokeWidth;
    }
    
    /**
     * border 线条宽度
     * @returns {number}
     */
    protected get borderWidth(){
        return this.eBoardCanvas.getSize(this._borderWidth);
    }
    
    /**
     * 设置border 宽度
     * @param {number} borderWidth
     */
    protected set borderWidth(borderWidth:number){
        this._borderWidth = borderWidth;
    }
    
    /**
     * 线条颜色
     * @returns {string}
     */
    protected get stroke(){
        return this.eDux.sharedData.stroke||this._stroke;
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
        return this.eDux.sharedData.fill||this._fill;
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
    
    /**
     * 根据两点坐标计算角度
     * @param {{x: number; y: number}} pointer1
     * @param {{x: number; y: number}} pointer2
     * @returns {number}
     */
    protected calcAngleByPoints(pointer1:{x:number;y:number},pointer2:{x:number;y:number}){
        const offsetY = pointer2.y - pointer1.y;
        const offsetX = pointer2.x - pointer1.x;
        if(0===offsetY&&0===offsetX){
            return 0;
        }
        const angle = Math.atan(offsetY/offsetX)/Math.PI * 180;// 可能返回NaN 即0/0  没有移动，不做处理
        const quadrant = this.calcQuadrant(pointer2);
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