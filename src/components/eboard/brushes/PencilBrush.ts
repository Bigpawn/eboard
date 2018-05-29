/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-27 22:13:21
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-05-29 19:22:56
 */
import {applyMixins} from '../utils/utils';
import {fabric} from "fabric";
import {BrushType} from "./BrushType";
import { AbstractBrush } from "./AbstractBrush";
import { IBrushOptions } from "./IBrush";

/**
 * Pencil brush
 */
export default class PencilBrush extends AbstractBrush {

    strokeMiterLimit: any;
    
    constructor(options?: IBrushOptions) {
        super(options);
        this._initialzie(options);
    }
    
    protected _initialzie(options?: IBrushOptions) {
        // if (options.cursorOptions) {
        //     // Create cursor object.
        // }
        // this.setCursor(new CircleCursor(this.options));
    }
    
    public getType(): BrushType {
        return BrushType.PENCEIL_BRUSH;
    }

    public onMouseDown(pointer: { x: number; y: number; } | fabric.Point): void {
        this._prepareForDrawing(pointer);
        // capture coordinates immediately
        // this allows to draw dots (when movement never occurs)
        this._captureDrawingPath(pointer);
        this._render();
    }
    
    public onMouseUp(pointer: fabric.Point | { x: number; y: number; }): void {
        this._finalizeAndAddPath();
    }

    public onMouseMove(pointer: fabric.Point | { x: number; y: number; }): void {
        this._captureDrawingPath(pointer);
        // redraw curve
        // clear top canvas
        this.canvas.clearContext(this.canvas.getSelectionCanvasContext());
        this._render();
    }
    
    protected _prepareForDrawing(pointer: fabric.Point | { x: number; y: number; }): void {
        var p = new fabric.Point(pointer.x, pointer.y);

        this._reset();
        this._addPoint(p);
  
        this.canvas.getSelectionCanvasContext().moveTo(p.x, p.y);
    }

    protected _captureDrawingPath(pointer: fabric.Point | { x: number; y: number; }): void {
        var pointerPoint = new fabric.Point(pointer.x, pointer.y);
        this._addPoint(pointerPoint);
    }

    // Methods from fabric.PencilBrush
    public convertPointsToSVGPath: (points: { x: number; y: number }[], minX?: number, minY?: number) => string[];
    public createPath: (pathData: string) => fabric.Path;
    protected _render: () => void;
    protected _finalizeAndAddPath: () => void;
    private _reset: () => void;
    protected _addPoint: (point: fabric.Point) => void;
}

applyMixins(PencilBrush, [fabric.PencilBrush]);