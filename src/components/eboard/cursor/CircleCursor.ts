/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-24 11:49:55
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-05-29 19:23:22
 */
import { fabric } from "fabric";
import ICursor from "./ICursor";
import EBoardCanvas from "../EBoardCanvas";

/**
 * Circle cursor.
 */
export default class CircleCursor implements ICursor {

    options?: any;
    canvas: EBoardCanvas;
    color: fabric.Color;
    fill: fabric.Color;
    redius: number|string;
    lineWidth: number|string;

    constructor(options: any, canvas?: EBoardCanvas) {
        this.options = options || {};
        this.canvas = canvas || this.options.canvas;
        this.color = new fabric.Color(this.options.color || 'black');
        this.fill = new fabric.Color(this.options.fill || "rgba(255, 255, 255, 0)");
        this.redius = this.options.radius || (this.canvas && this.canvas.getFreeDrawingBrush().width / 2);
        this.lineWidth = this.options.width || 1;
    }

    setCanvas(canvas: EBoardCanvas): void {
        this.canvas = canvas;
    }

    _canvas(): EBoardCanvas {
        return this.canvas;
    }

    render(point: fabric.Point): void {
        let ctx = this.canvas.getCursorCanvasContext();
        if (ctx) {
            ctx.fillStyle = this.fill.toHex();
            ctx.lineWidth = this.lineWidth as number;
            ctx.strokeStyle = this.color.toHex();
            ctx.beginPath();
            ctx.arc(point.x, point.y, this.redius as number, 0, Math.PI * 2, true);
            ctx.stroke();
            ctx.fill();
        }
    }
}