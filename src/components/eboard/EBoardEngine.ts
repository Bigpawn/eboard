/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-24 23:34:18
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-06 11:45:04
 */
import { fabric } from 'fabric';
import { EBoardCanvas } from './EBoardCanvas';
import { UndoEngine } from './mixins/Undo';
import PathCreatedUndoAction from './undo/PathCreatedUndoAction';
import { FabricEventType, ZoomEvent } from './mixins/FabricEvents';
import ZoomUndoAction from './undo/ZoomUndoAction';

export default class EBoardEngine {
    /**
     * Instance of board canvas.
     */
    private eBoardCanvas: EBoardCanvas;

    /**
     * Instanceof undo/redo engine.
     */
    private undoEngine: UndoEngine;
    
    /**
     * Constructor.
     * 
     * @param wrapper 
     * @param canvasEl 
     * @param options 
     */
    constructor(wrapper: any, canvasEl: any, options?: any) {
        this.__initCanvas(wrapper, canvasEl, options);
        this.__initUndoListener();
        this.__init();
    }

    private __init() {
        this.undoEngine = new UndoEngine(this);
    }

    private __initCanvas(wrapper: any, canvasEl: any, options?: any) {
        this.eBoardCanvas = new EBoardCanvas(canvasEl, options);
        this.eBoardCanvas.setWidth(wrapper.clientWidth);
        this.eBoardCanvas.setHeight(wrapper.clientHeight);
        fabric.Object.prototype.transparentCorners = false;

        this.eBoardCanvas.clearFreeDrawingBrush();
    }

    private __initUndoListener() {
        // TODO ...
        // REGISTER LISTENER FOR UNDO/REDO
        this.eBoardCanvas.addEventListener(FabricEventType.PATH_CREATED, (event: any) => this.__handlePathCreated(event));
        this.eBoardCanvas.addEventListener(FabricEventType.ZOOM_AFTER, (event: ZoomEvent) => this.__handleZoomAfter(event));
    }

    /**
     * Return instance of board canvas.
     */
    public getEBoardCanvas(): EBoardCanvas {
        return this.eBoardCanvas;
    }
    
    /**
     * Undo operation.
     * 
     * @return {number, number} size of undo and redo stack.
     */
    public undo(): {undoSize: number, redoSize: number} {
        return this.undoEngine.undo();
    }

    /**
     * Redo operation.
     * 
     * @return {number, number} size of undo and redo stack.
     */
    public redo(): {undoSize: number, redoSize: number} {
        return this.undoEngine.redo();
    }

    private __handlePathCreated(event: any) {
        this.undoEngine.pushAction(new PathCreatedUndoAction(event));
    }

    private __handleZoomAfter(event: any) {
        this.undoEngine.pushAction(new ZoomUndoAction(event));
    }
 
    /**
     * Register event listener
     * 
     * @param eventType 
     * @param listener 
     */
    public addEventListener(eventType: FabricEventType, listener: (event: any) => void) {
        this.eBoardCanvas.addEventListener(eventType, listener);
    }
}
