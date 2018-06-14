/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-24 23:34:18
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-12 21:41:23
 */
import { fabric } from 'fabric';
import { EBoardCanvas } from './EBoardCanvas';
import { UndoEngine } from './mixins/Undo';
import PathCreatedUndoAction from './undo/PathCreatedUndoAction';
import { FabricObservingEventType } from './mixins/FabricEvents';
import ZoomUndoAction from './undo/ZoomUndoAction';
var EBoardEngine = /** @class */ (function () {
    /**
     * Constructor.
     *
     * @param wrapper
     * @param canvasEl
     * @param options
     */
    function EBoardEngine(wrapper, canvasEl, options) {
        this.__initCanvas(wrapper, canvasEl, options);
        this.__initUndoListener();
        this.__init();
    }
    EBoardEngine.prototype.__init = function () {
        this.undoEngine = new UndoEngine(this);
    };
    EBoardEngine.prototype.__initCanvas = function (wrapper, canvasEl, options) {
        this.eBoardCanvas = new EBoardCanvas(canvasEl, options);
        this.eBoardCanvas.setWidth(wrapper.clientWidth);
        this.eBoardCanvas.setHeight(wrapper.clientHeight);
        fabric.Object.prototype.transparentCorners = false;
        this.eBoardCanvas.clearFreeDrawingBrush();
    };
    EBoardEngine.prototype.__initUndoListener = function () {
        var _this = this;
        // TODO ...
        // REGISTER LISTENER FOR UNDO/REDO
        this.eBoardCanvas.addEventListener(FabricObservingEventType.PATH_CREATED, function (event) { return _this.__handlePathCreated(event); });
        this.eBoardCanvas.addEventListener(FabricObservingEventType.ZOOM_AFTER, function (event) { return _this.__handleZoomAfter(event); });
    };
    /**
     * Return instance of board canvas.
     */
    EBoardEngine.prototype.getEBoardCanvas = function () {
        return this.eBoardCanvas;
    };
    /**
     * Undo operation.
     *
     * @return {number, number} size of undo and redo stack.
     */
    EBoardEngine.prototype.undo = function () {
        return this.undoEngine.undo();
    };
    /**
     * Redo operation.
     *
     * @return {number, number} size of undo and redo stack.
     */
    EBoardEngine.prototype.redo = function () {
        return this.undoEngine.redo();
    };
    EBoardEngine.prototype.__handlePathCreated = function (event) {
        this.undoEngine.pushAction(new PathCreatedUndoAction(event));
    };
    EBoardEngine.prototype.__handleZoomAfter = function (event) {
        this.undoEngine.pushAction(new ZoomUndoAction(event));
    };
    /**
     * Register event listener
     *
     * @param eventType
     * @param listener
     */
    EBoardEngine.prototype.addEventListener = function (eventType, listener) {
        this.eBoardCanvas.addEventListener(eventType, listener);
    };
    return EBoardEngine;
}());
export default EBoardEngine;
//# sourceMappingURL=EBoardEngine.js.map