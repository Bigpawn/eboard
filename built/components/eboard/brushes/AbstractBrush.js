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
 * @Date: 2018-05-24 10:03:04
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-12 22:09:53
 */
import * as _ from 'lodash';
import { applyMixins } from '../utils/utils';
import { fabric } from 'fabric';
import { BrowserCursorName } from '../cursor/BrowserCursor';
import { CursorType } from '../cursor/CursorType';
/**
 * Define abstract brush class.
 */
var AbstractBrush = /** @class */ (function (_super) {
    __extends(AbstractBrush, _super);
    function AbstractBrush(options) {
        var _this = _super.call(this) || this;
        _this.initialize(options);
        return _this;
    }
    AbstractBrush.prototype.initialize = function (options) {
        this._points = [];
        this.initOptions(options);
    };
    /**
     * Update brush's properties with speicified options.
     *
     * @param options
     */
    AbstractBrush.prototype.updateOptions = function (options) {
        options = options || {};
        // applyMixins(options, [this.options] );
        _.defaultsDeep(options, this.options);
        this.initOptions(options);
    };
    /**
     * Init brush's properties with specified options.
     *
     * @param options
     */
    AbstractBrush.prototype.initOptions = function (options) {
        this.options = options || {};
        if (this.options.callback) {
            this.callback = this.options.callback;
        }
        // TOOD , NEED TO CHECK IF OPTIONS CONTAINS PROPERTY.
        this.canvas = this.options.canvas;
        this.cursor = this.options.cursor;
        this.color = this.options.stroke ? this.options.stroke : this.options.color;
        this.width = this.options.strokeWidth ? this.options.strokeWidth :
            this.options.width;
        this.shadow = this.options.shadow;
        this.strokeLineCap = this.options.strokeLineCap;
        this.strokeLineJoin = this.options.strokeLineJoin;
        this.strokeDashArray = this.options.strokeDashArray;
        this.strokeStyle = this.options.strokeStyle;
        this.strokeMiterLimit = this.options.strokeMiterLimit;
    };
    /**
     * Set relative canvas.
     *
     * @param canvas
     */
    AbstractBrush.prototype.setEBoardCanvas = function (canvas) {
        this.canvas = canvas;
        if (this.cursor) {
            this.cursor.setCanvas(this.canvas);
        }
        this._updateFreeDrawingCursor();
    };
    /**
     * Return corresponding cursor.
     */
    AbstractBrush.prototype.getCursor = function () {
        return this.cursor;
    };
    /**
     *
     * @param cursor Set cursor.
     */
    AbstractBrush.prototype.setCursor = function (cursor) {
        this.cursor = cursor;
        this.cursor.setCanvas(this.canvas);
        this._updateFreeDrawingCursor();
    };
    AbstractBrush.prototype._updateFreeDrawingCursor = function () {
        if (this.cursor) {
            if (this.cursor.getType() === CursorType.CUSTOM_CURSOR && this.canvas) {
                // Disable system cursor, use custom cursor instead.
                this.canvas.freeDrawingCursor = BrowserCursorName.NONE;
            }
            else {
                this.canvas.freeDrawingCursor = this.cursor.getName();
            }
        }
        else {
            this.canvas.freeDrawingCursor = BrowserCursorName.DEFAULT;
        }
    };
    /**
     * Inovoked on mouse down
     * @param {fabric.Point} pointer
     */
    AbstractBrush.prototype.onMouseDown = function (pointer) {
        this._prepareForDrawing(pointer);
        // capture coordinates immediately this allows to draw dots (when movement
        // never occurs)
        this._captureDrawingPath(pointer);
        this._render();
    };
    /**
     * Inovoked on mouse move
     * @param {fabric.Point} pointer
     */
    AbstractBrush.prototype.onMouseMove = function (pointer) {
        this._captureDrawingPath(pointer);
        // redraw curve clear top canvas
        this.canvas.clearContext(this.canvas.getSelectionCanvasContext());
        this._render();
    };
    /**
     * Invoked on mouse up
     */
    AbstractBrush.prototype.onMouseUp = function (pointer) {
        this.canvas.disableDrawingTrack();
        this._finalizeAndAddPath();
    };
    /**
     * @private
     * @param {Object} pointer Actual mouse position related to the canvas.
     */
    AbstractBrush.prototype._prepareForDrawing = function (pointer) {
        var p = new fabric.Point(pointer.x, pointer.y);
        this._reset();
        this._addPoint(p);
        this.canvas.getSelectionCanvasContext().moveTo(p.x, p.y);
    };
    /**
     * @private
     * @param {fabric.Point} point Point to be added to points array
     */
    AbstractBrush.prototype._addPoint = function (point) {
        if (this._points.length > 1 &&
            point.eq(this._points[this._points.length - 1])) {
            return;
        }
        this._points.push(point);
    };
    /**
     * Clear points array and set contextTop canvas style.
     * @private
     */
    AbstractBrush.prototype._reset = function () {
        this._points.length = 0;
        this._setBrushStyles();
        this._setShadow();
    };
    /**
     * @private
     * @param {Object} pointer Actual mouse position related to the canvas.
     */
    AbstractBrush.prototype._captureDrawingPath = function (pointer) {
        var pointerPoint = new fabric.Point(pointer.x, pointer.y);
        this._addPoint(pointerPoint);
    };
    /**
     * Draw object track.
     *
     * @override
     */
    AbstractBrush.prototype._render = function () {
        var canvas = this.canvas;
        var ctx = canvas.getSelectionCanvasContext(), v = canvas.getViewportTransform();
        var object = this._createObject();
        if (object == null) {
            return;
        }
        ctx.save();
        ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);
        object.render(ctx);
        ctx.restore();
    };
    /**
     * Draw the final path of shape.
     *
     * @override
     */
    AbstractBrush.prototype._finalizeAndAddPath = function () {
        var canvas = this.canvas;
        // Create render object
        var object = this._createObject();
        if (object == null) {
            return;
        }
        // Clear points.
        this._points = [];
        canvas.clearContext(canvas.getSelectionCanvasContext());
        canvas.add(object);
        canvas.renderAll();
        object.setCoords();
        this._resetShadow();
        // fire event 'path' created
        canvas.trigger('path:created', { path: object });
    };
    return AbstractBrush;
}(fabric.BaseBrush));
export default AbstractBrush;
applyMixins(AbstractBrush, [fabric.BaseBrush]);
//# sourceMappingURL=AbstractBrush.js.map