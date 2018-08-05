/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/10 10:48
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/10 10:48
 * @disc:EBoardCanvas extend fabric.Canvas
 */
import {fabric} from "fabric";
import {ICanvasOptions} from "~fabric/fabric-impl";

class EBoardCanvas extends fabric.Canvas{
    constructor(element: HTMLCanvasElement | string, options?: ICanvasOptions){
        super(element,options);
    }
    public getLowerCanvas(){
        return this.getElement() as HTMLCanvasElement;
    }
    public getUpperCanvas(){
        return this.getElement().nextElementSibling as HTMLCanvasElement;
    }
    public getContainer(){
        return this.getElement().parentElement as HTMLDivElement;
    }
}

export {EBoardCanvas};