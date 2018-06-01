/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-24 23:34:18
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-05-29 19:28:33
 */
import {fabric} from 'fabric';
import EBoardCanvas from './EBoardCanvas';

export default class EBoardEngine {
    private eBoardCanvas: EBoardCanvas;

    constructor(wrapper: any, canvasEl: any) {
        this.__initCanvas(wrapper, canvasEl);
    }

    private __initCanvas(wrapper: any, canvasEl: any) {
        this.eBoardCanvas = new EBoardCanvas(canvasEl);
        this.eBoardCanvas.setWidth(wrapper.clientWidth);
        this.eBoardCanvas.setHeight(wrapper.clientHeight);
        fabric.Object.prototype.transparentCorners = false;

        this.eBoardCanvas.clearFreeDrawingBrush();
    }

    public getEBoardCanvas(): EBoardCanvas {
        return this.eBoardCanvas;
    }
}
