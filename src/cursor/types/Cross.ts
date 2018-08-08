/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/8 9:11
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/8/8 9:11
 * @disc:CrossCursor
 */

import {fabric} from "fabric";
import {ICursorTypes} from '../../interface/ICursorTypes';

const crossImage = new Image();
crossImage.src=`../${require("../png/cross.png")}`;

class CrossCursor implements ICursorTypes{
    protected canvas:fabric.StaticCanvas;
    constructor(canvas:fabric.StaticCanvas){
        this.canvas=canvas;
    }
    public render(center:{x:number,y:number},size:number){
        const image = new fabric.Image(crossImage,{
            left: center.x,
            top: center.y,
            originX:"center",
            originY:"center"
        });
        image.scaleToWidth(size);
        return image;
    }
}

export default CrossCursor;