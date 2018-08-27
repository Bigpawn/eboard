/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/8 9:11
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/8/8 9:11
 * @disc:defaultCursor
 */
import {fabric} from "fabric";
import {ICursor} from '../interface/ICursor';

class DefaultCursor implements ICursor{
    private scale:number=0.6;
    protected canvas:fabric.StaticCanvas;
    constructor(canvas:fabric.StaticCanvas){
        this.canvas=canvas;
    }
    public render(center:{x:number;y:number},size:number){
        return new fabric.Circle({
            originX:"center",
            originY:"center",
            fill:"red",
            left: center.x,
            top: center.y,
            stroke:"black",
            radius:size/2 * this.scale,
        })
    }
}

export default DefaultCursor;