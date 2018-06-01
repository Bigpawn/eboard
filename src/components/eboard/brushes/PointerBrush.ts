/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-24 10:09:34
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-01 10:55:40
 */
import {fabric} from "fabric";
import {BrushType} from "./BrushType";
import AbstractBrush from "./AbstractBrush";
import { IBrushOptions } from "./IBrush";

/**
 * Empty pointer brush.
 */
export default class PointerBrush extends AbstractBrush {

    protected _createShape(): fabric.Object {
        throw new Error("Method not implemented.");
    }
    // point: fabric.Point;

    constructor(options?: IBrushOptions) {
        super(options);
    }

    public getType(): BrushType {
        return BrushType.POINTER_BRUSH;
    }

    public onMouseDown(pointer: fabric.Point): void {
        return;
    }
    
    public onMouseUp(pointer: fabric.Point): void {
        return;
    }

    public onMouseMove(pointer: fabric.Point): void {
        return;
    }

    // protected _prepareForDrawing(pointer: fabric.Point): void {
    //     this._setBrushStyles();
    //     this._setShadow();

    //     this.canvas.clearContext(this.canvas.getSelectionCanvasContext());
    // }

    // protected _captureDrawingPath(pointer: fabric.Point): void {
    //     this.point = pointer;
    // }

    // protected _render(): void {
    //     let ctx = this.canvas.getSelectionCanvasContext(), v = this.canvas.viewportTransform,
    //     x = this.point.x, y = this.point.y;
    //     ctx.lineWidth = 1;
    //     ctx.save();
    //     ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);
    //     ctx.fillStyle = this.color;
    //     ctx.strokeStyle = this.strokeStyle;
    //     ctx.beginPath();
    //     ctx.arc(x, y, 20, 0, Math.PI * 2);
    //     ctx.stroke();
    //     ctx.fill();
    //     ctx.lineWidth = 1;
    //     ctx.moveTo(x, 0);
    //     ctx.lineTo(x, this.canvas.getHeight());
    //     ctx.stroke();
    //     ctx.moveTo(0, y);
    //     ctx.lineTo(this.canvas.getWidth(), y);
    //     ctx.stroke();
    // }

    // protected _finalizeAndCallback(): void {
    //     if (this.callback) {
    //         this.callback(this.point);
    //     }
    // }
}
