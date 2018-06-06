/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-24 23:34:18
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-06 11:45:04
 */
import { fabric } from 'fabric';
import { EBoardCanvas } from './EBoardCanvas';
import { UndoRedoEngine } from './mixins/UndoRedo';
import PathCreatedUndoAction from './undo/PathCreatedUndoAction';

export default class EBoardEngine {
    /**
     * Instance of board canvas.
     */
    private eBoardCanvas: EBoardCanvas;

    /**
     * Instanceof undo/redo engine.
     */
    private undoRedoEngine: UndoRedoEngine;
    
    constructor(wrapper: any, canvasEl: any) {
        this.__initCanvas(wrapper, canvasEl);
        this.__initUndoListener();
        this.__init();
    }

    private __init() {
        this.undoRedoEngine = new UndoRedoEngine(this);
        this.eBoardCanvas.enableZooming();
    }

    private __initCanvas(wrapper: any, canvasEl: any) {
        this.eBoardCanvas = new EBoardCanvas(canvasEl);
        this.eBoardCanvas.setWidth(wrapper.clientWidth);
        this.eBoardCanvas.setHeight(wrapper.clientHeight);
        fabric.Object.prototype.transparentCorners = false;

        this.eBoardCanvas.clearFreeDrawingBrush();
    }

    private __initUndoListener() {
        // TODO ...
        // REGISTER LISTENER FOR UNDO/REDO
        this.eBoardCanvas.addEventListener("path:created", (event: any) => this.__handlePathCreated(event));
    }

    /**
     * Return instance of board canvas.
     */
    public getEBoardCanvas(): EBoardCanvas {
        return this.eBoardCanvas;
    }
    
    /**
     * Undo operation.
     */
    public undo(): boolean {
        return this.undoRedoEngine.undo();
    }

    /**
     * Redo operation.
     */
    public redo(): boolean {
        return this.undoRedoEngine.redo();
    }

    private __handlePathCreated(event: any) {
        this.undoRedoEngine.pushAction(new PathCreatedUndoAction(event));
    }
 
    /**
     * Register event listener
     * 
     * @param eventType 
     * @param listener 
     */
    public addEventListener(eventType: string, listener: (event: any) => void) {
        this.eBoardCanvas.addEventListener(eventType, listener);
    }
}
