/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/10 19:32
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/10 19:32
 * @disc:直线箭头扩展
 */

import {fabric as Fabric} from "fabric";
import {IObjectOptions} from "fabric/fabric-impl";
import {ArrowMode, ArrowType} from '../plugins/shape/2D/line/LineType';
import DefaultArrow from '../plugins/shape/2D/line/arrows/default';

export declare interface ILineArrowOptions extends IObjectOptions{
    arrowType?:ArrowType;
    arrowMode?:ArrowMode;
}


class ArrowLine extends Fabric.Line{
    public type:string="arrow-line";
    private arrowType:ArrowType=ArrowType.NONE;
    private arrowMode:ArrowMode=ArrowMode.NEXT;
    constructor(points?: number[], objObjects?: ILineArrowOptions){
        super(points,objObjects);
        this.arrowType = (objObjects && objObjects.arrowType) ?objObjects.arrowType:ArrowType.NONE;
        this.arrowMode = (objObjects && objObjects.arrowMode) ?objObjects.arrowMode:ArrowMode.NEXT;
        console.log(objObjects);
    }
    protected _render(ctx:CanvasRenderingContext2D){
        super["_render"](ctx);// 私有方法
        
        // 自定义箭头类
        if(ArrowType.NONE!==this.arrowType){
            try{
                const arrowInstance:DefaultArrow = new (require(`./arrows/${this.arrowType}`).default as typeof DefaultArrow)(ctx,this);
                arrowInstance.draw(this.arrowMode);
            }catch(e){
                throw "未找到箭头类实例";
            }
        }
    }
}

export {ArrowLine};