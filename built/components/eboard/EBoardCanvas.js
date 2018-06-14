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
 * @Date: 2018-05-24 10:56:54
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-13 09:39:32
 */
import * as _ from 'lodash';
import { fabric } from 'fabric';
import './mixins/ExFabric';
import { BrushType } from './brushes/BrushType';
import { BrowserCursorName } from './cursor/BrowserCursor';
import { FabricObservingEventType } from './mixins/FabricEvents';
/**
 * The class extends <code>fabric.Canvas</code> to expose necessary properties and functions.
 */
var FabricCanvas = /** @class */ (function (_super) {
    __extends(FabricCanvas, _super);
    function FabricCanvas() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FabricCanvas.prototype.getWrapperElement = function () {
        return this.wrapperEl;
    };
    /**
     * Return main drawing canvas.
     *
     * @return <HTMLCanvasElement> instance.
     */
    FabricCanvas.prototype.getCanvasElement = function () {
        return this.lowerCanvasEl;
    };
    /**
     * Return canvas context of main drawing canvas.
     *
     * @return <CanvasRenderingContext2D> instance.
     */
    FabricCanvas.prototype.getCanvasContext = function () {
        return this.contextContainer;
    };
    /**
     * Return selection canvas which is used to drawing volatile things like selection, drawing track and so on.
     */
    FabricCanvas.prototype.getSelectionCanvasElement = function () {
        return this.getSelectionElement();
    };
    /**
     * Return canvas context of selection canvas.
     */
    FabricCanvas.prototype.getSelectionCanvasContext = function () {
        return this.getSelectionContext();
    };
    /**
     * Return current viewport transform.
     */
    FabricCanvas.prototype.getViewportTransform = function () {
        return this.viewportTransform;
    };
    return FabricCanvas;
}(fabric.Canvas));
/**
 * The class supports white pad functions.
 */
var EBoardCanvas = /** @class */ (function (_super) {
    __extends(EBoardCanvas, _super);
    /**
     * Constructor
     * @param element <canvas> element to initialize instance on
     * @param [options] Options object
     */
    function EBoardCanvas(element, options) {
        var _this = _super.call(this, element, options) || this;
        _this.options = options ? options : {};
        _this._initialize(element, options);
        return _this;
    }
    /**
     * Initialize necessary things.
     *
     * @protected
     * @param element <canvas> element to initialize instance on
     * @param [options] Options object
     */
    EBoardCanvas.prototype._initialize = function (element, options) {
        this._createCursorCanvas();
        if (this.isZoom === true) {
            this.enableZooming();
        }
        this.originalVpt = _.map(this.getViewportTransform(), _.clone);
    };
    /**
     * Return cursor canvas.
     */
    EBoardCanvas.prototype.getCursorCanvasEl = function () {
        return this.cursorCanvasEl;
    };
    /**
     * Return canvas context of cursor canvas.
     */
    EBoardCanvas.prototype.getCursorCanvasContext = function () {
        return this.contextCursor;
    };
    /**
     * Create cursor canvas.
     * @protected
     */
    EBoardCanvas.prototype._createCursorCanvas = function () {
        var lowerCanvasClass = this.getElement().className.replace(/\s*lower-canvas\s*/, '');
        if (this.cursorCanvasEl) {
            this.cursorCanvasEl.className = '';
        }
        else {
            this.cursorCanvasEl = this._createCanvasElement();
        }
        fabric.util.addClass(this.cursorCanvasEl, 'cursor-canvas ' + lowerCanvasClass);
        this.getWrapperElement().appendChild(this.cursorCanvasEl);
        this._copyCanvasStyle(this.lowerCanvasEl, this.cursorCanvasEl);
        this._applyCanvasStyle(this.cursorCanvasEl);
        this.contextCursor = this.cursorCanvasEl.getContext('2d');
        // Disable pointer events on cursor canvas.
        // The pointer events enables on upper canvas as default.
        this.cursorCanvasEl.style.pointerEvents = 'none';
    };
    /**
     * Override default implemtation to set cursor canvas dimension.
     * See {@linkcode fabric.StaticCanvas._setBackstoreDimension}.
     * @override
     * @protected
     *
     * @param prop
     * @param value
     *
     */
    EBoardCanvas.prototype._setBackstoreDimension = function (prop, value) {
        if (this.cursorCanvasEl) {
            this.cursorCanvasEl[prop] = value;
        }
        _super.prototype._setBackstoreDimension.call(this, prop, value);
    };
    /**
     * Override default implementation to set cursor canvas dimension.
     * See {@linkcode fabric.StaticCanvas._setCssDimension}.
     * @override
     * @protected
     *
     * @param prop
     * @param value
     */
    EBoardCanvas.prototype._setCssDimension = function (prop, value) {
        if (this.cursorCanvasEl) {
            this.cursorCanvasEl.style[prop] = value;
        }
        _super.prototype._setCssDimension.call(this, prop, value);
    };
    /**
     * Set drawing brush.
     *
     * @param brush
     */
    EBoardCanvas.prototype.setFreeDrawingBrush = function (brush, options) {
        this.freeDrawingBrush = brush;
        if (this.freeDrawingBrush) {
            this.freeDrawingBrush.setEBoardCanvas(this);
        }
        if (brush.getType() !== BrushType.POINTER_BRUSH) {
            // this.deactivateAll();
            this.renderAll();
            this.enableDrawingModel();
        }
        else {
            this.setPointerCursor(BrowserCursorName.DEFAULT);
            this.clearFreeDrawingBrush();
        }
    };
    /**
     * Clear free draw brush.
     */
    EBoardCanvas.prototype.clearFreeDrawingBrush = function () {
        this.disableDrawingModel();
        delete this.freeDrawingBrush;
    };
    EBoardCanvas.prototype.setPointerCursor = function (cursor) {
        this.freeDrawingCursor = cursor;
    };
    /**
     * Return free draing brush instance.
     *
     * @return AbstractBrush | fabric.BaseBrush
     */
    EBoardCanvas.prototype.getFreeDrawingBrush = function () {
        return this.freeDrawingBrush;
    };
    /**
     * Set drawing model.
     *
     * @param flag
     */
    EBoardCanvas.prototype.setDrawingModel = function (flag) {
        if (!this.freeDrawingBrush || this.isDrawingMode === flag) {
            return;
        }
        this.isDrawingMode = flag;
    };
    /**
     * Enable drawing mdoel.
     */
    EBoardCanvas.prototype.enableDrawingModel = function () {
        this.setDrawingModel(true);
    };
    /**
     * Disable drawing model.
     */
    EBoardCanvas.prototype.disableDrawingModel = function () {
        this.setDrawingModel(false);
    };
    /**
     * Return drawing model state.
     *
     * @return boolean
     */
    EBoardCanvas.prototype.isDrawingModel = function () {
        return this.isDrawingMode;
    };
    /**
     * Set drawing track model.
     *
     * @param flag
     */
    EBoardCanvas.prototype.setCurrentDrawing = function (flag) {
        this._isCurrentlyDrawing = flag;
    };
    /**
     * Return true if current free brush is set with drawing track model.
     *
     * @return boolean
     */
    EBoardCanvas.prototype.isCurrentlyDrawing = function () {
        return this._isCurrentlyDrawing;
    };
    /**
     * Enable drawing track model when using free brush to drawing on canvas.
     */
    EBoardCanvas.prototype.enableDrawingTrack = function () {
        this.setCurrentDrawing(true);
    };
    /**
     * Disable drawing
     */
    EBoardCanvas.prototype.disableDrawingTrack = function () {
        this.setCurrentDrawing(false);
    };
    /**
     * Override default implementation to check isDrawingModel case.
     *
     * @override
     * @param e
     */
    EBoardCanvas.prototype._onMouseOut = function (e) {
        _super.prototype._onMouseOut.call(this, e);
        if (this.isDrawingMode) {
            this.clearContext(this.contextCursor);
        }
    };
    /**
     * Override default implementation to paint cursor.
     * @override
     * @param {Event} e Event object fired on mousemove
     */
    EBoardCanvas.prototype._onMouseMoveInDrawingMode = function (e) {
        if (this._isCurrentlyDrawing || this.freeDrawingBrush.getCursor()) {
            var pointer = this.getPointer(e);
            if (this._isCurrentlyDrawing) {
                this.freeDrawingBrush.onMouseMove(pointer);
            }
            // Draw cursor.
            if (this.freeDrawingBrush.getCursor()) {
                this.clearContext(this.contextCursor);
                this.freeDrawingBrush.getCursor().render(pointer);
            }
        }
        this.setCursor(this.freeDrawingCursor);
        this._handleEvent(e, 'move');
    };
    /**
     * Overide default implementation
     * @override
     * @param {Event} e Event object fired on mousedown
     */
    EBoardCanvas.prototype._onMouseDownInDrawingMode = function (e) {
        _super.prototype._onMouseDownInDrawingMode.call(this, e);
    };
    /**
     * Override default implementation to pass point when calling brush's onMouseUp.
     *
     * @override
     * @param {Event} e Event object fired on mouseup
     */
    EBoardCanvas.prototype._onMouseUpInDrawingMode = function (e) {
        if (this.clipTo) {
            this.getSelectionCanvasContext().restore();
        }
        if (this.freeDrawingBrush) {
            this.freeDrawingBrush.onMouseUp(this.getPointer(e));
        }
        else {
            this.disableDrawingTrack();
        }
        this._handleEvent(e, 'up');
    };
    /**
     * Add listener
     *
     * @param eventType
     * @param listener
     */
    EBoardCanvas.prototype.addEventListener = function (eventType, listener) {
        this.on(eventType, listener);
        return this;
    };
    /**
     * Remove listener.
     * @param eventType
     * @param listener
     */
    EBoardCanvas.prototype.removeEventListener = function (eventType, listener) {
        this.off(eventType, listener);
        return this;
    };
    /**
     * Remove all registered listeners.
     */
    EBoardCanvas.prototype.removeAllListeners = function () {
        this.off();
        return this;
    };
    EBoardCanvas.prototype.isEnabledZooming = function () {
        return this.isZoom || false;
    };
    EBoardCanvas.prototype.enableZooming = function () {
        this.set({ 'isZoom': true });
        this.addEventListener(FabricObservingEventType.MOUSE_WHEEL, this.__handleZooming);
    };
    EBoardCanvas.prototype.disableZooming = function () {
        this.removeEventListener(FabricObservingEventType.MOUSE_WHEEL, this.__handleZooming);
        this.set({ 'isZoom': false });
    };
    EBoardCanvas.prototype.isEnabledPanning = function () {
        return this.isPanning || false;
    };
    EBoardCanvas.prototype.setPanning = function (isPanning) {
        this.set({ 'isPanning': isPanning });
    };
    EBoardCanvas.prototype.__handleZooming = function (opt) {
        var delta = opt.e.deltaY;
        var pointer;
        if (this.isEnabledPanning()) {
            pointer = this.getPointer(opt.e);
        }
        var zoom = this.getZoom();
        zoom = zoom + delta / 200;
        if (zoom > 20) {
            zoom = 20;
        }
        if (zoom < 0.01) {
            zoom = 0.01;
        }
        if (this.isEnabledPanning()) {
            this.zoomToPoint({ x: pointer.x, y: pointer.y }, zoom);
        }
        else {
            this.setZoom(zoom);
        }
        opt.e.preventDefault();
        opt.e.stopPropagation();
    };
    /**
     * @override
     */
    EBoardCanvas.prototype.zoomToPoint = function (point, value) {
        var before = point, vpt = this.viewportTransform.slice(0);
        var oldVpt = _.map(vpt, _.clone);
        point = fabric.util.transformPoint(point, fabric.util.invertTransform(this.viewportTransform));
        vpt[0] = value;
        vpt[3] = value;
        var after = fabric.util.transformPoint(point, vpt);
        vpt[4] += before.x - after.x;
        vpt[5] += before.y - after.y;
        var ret = this.setViewportTransform(vpt);
        // Fire a zoom event for undo/redo
        this.trigger(FabricObservingEventType.ZOOM_AFTER, { 'oldVpt': oldVpt, 'value': value, 'point': point, 'lastVpt': _.map(vpt, _.clone) });
        return ret;
    };
    /**
     *  Restore original viewport transform.
     */
    EBoardCanvas.prototype.restoreOriginalViewportTransform = function () {
        this.setViewportTransform(this.originalVpt);
    };
    /**
     * Return original viewport transform.
     */
    EBoardCanvas.prototype.getOriginalViewportTransform = function () {
        return this.originalVpt;
    };
    return EBoardCanvas;
}(FabricCanvas));
export { EBoardCanvas };
//# sourceMappingURL=EBoardCanvas.js.map