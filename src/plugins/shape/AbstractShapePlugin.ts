/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/14 15:33
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/14 15:33
 * @disc:ShapePlugin抽象类
 */
import {AbstractPlugin} from '../AbstractPlugin';
import {IEvent} from "~fabric/fabric-impl";
import {EBoardCanvas} from '../../EBoardCanvas';
import {EBoardEngine} from '../../EBoardEngine';


export enum Quadrant{
    LT,
    LB,
    RT,
    RB
}

abstract class AbstractShapePlugin extends AbstractPlugin{
    constructor(canvas:EBoardCanvas,eBoardEngine:EBoardEngine){
        super(canvas,eBoardEngine);
    }
    
    /**
     * default mouseDown Event
     * @param {"~fabric/fabric-impl".IEvent} event
     */
    protected onMouseDown(event:IEvent){
        this.start = this.eBoardCanvas.getPointer(event.e);
    }
    
    /**
     * default mouseMove Event
     * @param {"~fabric/fabric-impl".IEvent} event
     */
    protected onMouseMove(event:IEvent){
        this.end = this.eBoardCanvas.getPointer(event.e);
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