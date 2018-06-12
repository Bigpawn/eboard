/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-24 11:49:55
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-12 21:56:24
 */
import { fabric } from "fabric";
import ICursor from "./ICursor";
import { EBoardCanvas } from "../EBoardCanvas";
import { AbstractCustomCursor } from "./CustomCursor";

/**
 * Circle cursor.
 */
export default class CircleCursor extends AbstractCustomCursor {
    fill: fabric.Color;
    radius: number|string;
    stroke: fabric.Color;
    strokeWidth: number|string;

    constructor(options?: any, canvas?: EBoardCanvas) {
        super('circle', options, canvas || options.canvas);
        this._init(options || {});
    }

    protected _init(options: any) {                
        this.fill = new fabric.Color(this.options.fill || "rgba(255, 255, 255, 0)");
        this.radius = this.options.radius || (this.canvas && this.canvas.getFreeDrawingBrush().width / 2);
        this.stroke = new fabric.Color(this.options.stroke || 'black');
        this.strokeWidth = this.options.strokeWidth || 1;
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
            ctx.fillStyle = this.fill.toRgba();
            ctx.lineWidth = this.strokeWidth as number;
            ctx.strokeStyle = this.stroke.toRgba();
            ctx.beginPath();
            ctx.arc(point.x, point.y, this.radius as number, 0, Math.PI * 2, true);
            ctx.stroke();
            ctx.fill();
        }
    }
}