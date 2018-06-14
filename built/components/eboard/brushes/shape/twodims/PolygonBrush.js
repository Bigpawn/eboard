var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-01 11:43:59
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-12 22:04:54
 */
import * as _ from "lodash";
import { fabric } from "fabric";
import { BrushType } from "../../BrushType";
import LineBrush from "./LineBrush";
var PolygonBrush = /** @class */ (function (_super) {
    __extends(PolygonBrush, _super);
    function PolygonBrush(options) {
        var _this = _super.call(this, options) || this;
        _this._polygonPoints = [];
        return _this;
    }
    /**
     * @override
     */
    PolygonBrush.prototype.getType = function () {
        return BrushType.POLYGON_BRUSH;
    };
    /**
     * Inovoked on mouse down
     * @param {fabric.Point} pointer
     */
    PolygonBrush.prototype.onMouseDown = function (pointer) {
        if (this._polygonPoints.length === 0) {
            this.canvas.enableDrawingModel();
            this.canvas.enableDrawingTrack();
        }
        if (!this.__isClosed(pointer)) {
            this.__capturePolygonPath(pointer);
        }
        this._points = [];
    };
    /**
     * Invoked on mouse up
     */
    PolygonBrush.prototype.onMouseUp = function (pointer) {
        // Enable drawing model to continue drawing.
        // this.canvas.enableDrawingModel();
        if (this.__isClosed(pointer)) {
            // this.canvas.disableDrawingModel();
            this.canvas.disableDrawingTrack();
            this._finalizeAndAddPath();
        }
        else {
            // clear top canvas
            this.canvas.clearContext(this.canvas.getSelectionCanvasContext());
            this._render();
        }
    };
    PolygonBrush.prototype.__capturePolygonPath = function (pointer) {
        var pointerPoint = new fabric.Point(pointer.x, pointer.y);
        this.__addPolygonPoint(pointerPoint);
    };
    PolygonBrush.prototype.__addPolygonPoint = function (pointer) {
        this._polygonPoints.push(pointer);
    };
    PolygonBrush.prototype.__isClosed = function (pointer) {
        if (!pointer) {
            return false;
        }
        if (this._polygonPoints.length < 2) {
            return false;
        }
        var sp = this._polygonPoints[0];
        var lx = sp.x - 5, rx = sp.x + 5, ty = sp.y - 5, by = sp.y + 5;
        if (pointer.x >= lx && pointer.x <= rx && pointer.y >= ty &&
            pointer.y <= by) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * @override
     */
    PolygonBrush.prototype._createShape = function () {
        var points = [];
        for (var i = 0; i < this._polygonPoints.length; i++) {
            points.push({ x: this._polygonPoints[i].x, y: this._polygonPoints[i].y });
        }
        points.push({ x: this._polygonPoints[0].x, y: this._polygonPoints[0].y });
        if (points.length === 0) {
            return null;
        }
        var renderOpts = {};
        _.defaultsDeep(renderOpts, this.options);
        return new fabric.Polygon(points, renderOpts);
    };
    PolygonBrush.prototype.__createPolyline = function () {
        var points = [];
        for (var i = 0; i < this._polygonPoints.length; i++) {
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
        var renderOpts = {};
        _.defaultsDeep(renderOpts, this.options);
        return new fabric.Polyline(points, renderOpts);
    };
    PolygonBrush.prototype.__createDot = function () {
        var left = this._polygonPoints[0].x - 5, top = this._polygonPoints[0].y - 5, radius = 5;
        var renderOpts = {};
        _.defaultsDeep(renderOpts, { 'radius': radius, 'fill': 'rgb(255, 255, 255, 0)', 'left': left, 'top': top }, this.options);
        return new fabric.Circle(renderOpts);
    };
    /**
     * @override
     */
    PolygonBrush.prototype._render = function () {
        var ctx = this.canvas.getSelectionCanvasContext(), v = this.canvas.viewportTransform, isClosed = this.__isClosed(this._points[1]);
        var polyline = this.__createPolyline();
        if (polyline == null) {
            return;
        }
        if (isClosed) {
            var dot = this.__createDot();
        }
        ctx.save();
        ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);
        if (isClosed) {
            dot.render(ctx);
        }
        polyline.render(ctx);
        ctx.restore();
    };
    /**
     * On mouseup after drawing the path on contextTop canvas
     * we use the points captured to create an new fabric path object
     * and add it to the fabric canvas.
     */
    PolygonBrush.prototype._finalizeAndAddPath = function () {
        // Create rect object.
        var polygon = this._createShape();
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
    };
    return PolygonBrush;
}(LineBrush));
export default PolygonBrush;
//# sourceMappingURL=PolygonBrush.js.map