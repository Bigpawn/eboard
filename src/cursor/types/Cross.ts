/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/8 9:11
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/8/8 9:11
 * @disc:CrossCursor 使用绘制
 */

import {fabric} from "fabric";
import {ICursor} from '../../interface/ICursor';
import {EBoardCanvas} from '../../EBoardCanvas';

class CrossCursor implements ICursor{
    protected canvas:EBoardCanvas;
    constructor(canvas:EBoardCanvas){
        this.canvas=canvas;
    }
    public render(center:{x:number,y:number},size:number){
        const half = size/2;
        const path = `M ${center.x - half} ${center.y} L ${center.x+half} ${center.y} M ${center.x} ${center.y-half} L ${center.x} ${center.y+half}`;
        return new fabric.Path(path,{
            strokeWidth:this.canvas.eDux.transform(2),
            stroke:"#5EBBE2",
        });
    }
}

export default CrossCursor;