/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-01 11:43:59
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-12 22:04:54
 */
import * as _ from "lodash";
import { fabric } from "fabric";
import { BrushType } from "../../BrushType";
import { IBrushOptions } from "../../IBrush";
import LineBrush from "./LineBrush";

export default class PolygonBrush extends LineBrush {
    _polygonPoints: any;
    
    constructor(options?: IBrushOptions) {
        super(options);
        this._polygonPoints = [];
    }
    
    /**
     * @override
     */
    public getType(): BrushType {
        return BrushType.POLYGON_BRUSH;
    }

    /**
     * Inovoked on mouse down
     * @param {fabric.Point} pointer
     */
    onMouseDown(pointer: fabric.Point) {
        if (this._polygonPoints.length === 0) {
            this.canvas.enableDrawingModel();
            this.canvas.enableDrawingTrack();
        }

        if (!this.__isClosed(pointer)) {
            this.__capturePolygonPath(pointer);
        }

        this._points = [];
    }

    /**
     * Invoked on mouse up
     */
    onMouseUp(pointer: fabric.Point) {
        // Enable drawing model to continue drawing.
        // this.canvas.enableDrawingModel();

        if (this.__isClosed(pointer)) {
            // this.canvas.disableDrawingModel();
            this.canvas.disableDrawingTrack();
            this._finalizeAndAddPath();
        } else {
            // clear top canvas
            this.canvas.clearContext(this.canvas.getSelectionCanvasContext());
            this._render();
        }
    }

    private __capturePolygonPath(pointer: fabric.Point) {
        var pointerPoint = new fabric.Point(pointer.x, pointer.y);
        this.__addPolygonPoint(pointerPoint);
    }

    private __addPolygonPoint(pointer: fabric.Point) {
        this._polygonPoints.push(pointer);
    }

    private __isClosed(pointer: fabric.Point): boolean {
        if (!pointer) {
            return false;
        }

        if (this._polygonPoints.length < 2) {
            return false;
        }

        let sp = this._polygonPoints[0];
        let lx = sp.x - 5, rx = sp.x + 5, ty = sp.y - 5, by = sp.y + 5;
        if (pointer.x >= lx && pointer.x <= rx && pointer.y >= ty &&
            pointer.y <= by) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * @override
     */
    protected _createShape(): fabric.Object|null {
        let points = [];
        for (let i = 0; i < this._polygonPoints.length; i++) {
            points.push(
                { x: this._polygonPoints[i].x, y: this._polygonPoints[i].y });
        }
        points.push(
            { x: this._polygonPoints[0].x, y: this._polygonPoints[0].y });

        if (points.length === 0) {
            return null;
        }
        
        let renderOpts = {};
        _.defaultsDeep(renderOpts, this.options);
        return new fabric.Polygon(points, renderOpts);

    }

    private __createPolyline(): fabric.Polyline {
        let points = [];
        for (let i = 0; i < this._polygonPoints.length; i++) {
            points.push({
                x: this._polygonPoints[i].x,
                y: this._polygonPoints[i].y
            });
        }
        if (this._points.length > 0) {
            points.push({
                x: this._points[this._points.length - 1].x,
                y: this._points[this._points.length - 1].y
            });
        }

        let renderOpts = {};
        _.defaultsDeep(renderOpts, this.options);
        return new fabric.Polyline(points, renderOpts);
    }

    private __createDot(): fabric.Circle {
        let left = this._polygonPoints[0].x - 5,
            top = this._polygonPoints[0].y - 5, radius = 5;
        
        let renderOpts = {};
        _.defaultsDeep(renderOpts, {'radius': radius, 'fill': 'rgb(255, 255, 255, 0)', 'left': left, 'top': top}, this.options);
        return new fabric.Circle(renderOpts);
    }

    /**
     * @override
     */
    protected _render() {
        var ctx = this.canvas.getSelectionCanvasContext(), v = this.canvas.viewportTransform,
            isClosed = this.__isClosed(this._points[1]);

        var polyline = this.__createPolyline();
        if (polyline == null) {
            return;
        }
        let dot:any;
        if (isClosed) {
            dot = this.__createDot();
        }

        ctx.save();
        ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);
        if (isClosed) {
            dot.render(ctx)
        }
        polyline.render(ctx)
        ctx.restore();
    }

    /**
     * On mouseup after drawing the path on contextTop canvas
     * we use the points captured to create an new fabric path object
     * and add it to the fabric canvas.
     */
    protected _finalizeAndAddPath() {
        // Create rect object.
        const polygon:any = this._createShape();
        // Clear points.
        this._points = [];
        this._polygonPoints = [];

        // Clear top brush canvas.
        this.canvas.clearContext(this.canvas.getSelectionCanvasContext());
               // Add current rect to main canvas layer.
        this.canvas.add(polygon);
        // Redraw all objects in main canvas layer.
        this.canvas.renderAll();
        polygon.setCoords();
        this._resetShadow();
        
        // fire event 'path' created
        this.canvas.trigger('path:created', { path: polygon });
    }
}