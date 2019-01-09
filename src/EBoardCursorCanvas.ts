import {ICanvasDimensions, ICanvasDimensionsOptions} from '~fabric/fabric-impl';

/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/10/25 15:52
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/10/25 15:52
 * @disc:教鞭或者光标层
 */

class EBoardCursorCanvas{
    private canvas:HTMLCanvasElement;
    // private context:CanvasRenderingContext2D;
    constructor(container:HTMLDivElement){
        this.canvas=document.createElement("canvas");
        // this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        container.appendChild(this.canvas);
    }
    public setDimensions(dimensions: ICanvasDimensions, options?: ICanvasDimensionsOptions){
        if(options&&options.backstoreOnly){
            // 分辨率设置
            this.canvas.width=dimensions.width;
            this.canvas.height=dimensions.height;
        }else{
            this.canvas.style.width=dimensions.width+"px";
            this.canvas.style.height=dimensions.height+"px";
        }
    }
}

export {EBoardCursorCanvas};