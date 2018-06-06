/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-24 23:34:18
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-05 17:13:17
 */
import { fabric } from 'fabric';
import { EBoardCanvas } from './EBoardCanvas';
import { UndoRedoAction, AbstractUndoRedoAction, UndoRedoEngine } from './mixins/UndoRedo';

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
        this.__init();
        this.__initCanvas(wrapper, canvasEl);
        this.__initUndoListener();
    }

    private __init() {
        this.undoRedoEngine = new UndoRedoEngine(this);
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
        this.eBoardCanvas.addListener("path:created", (event: any) => this.__handlePathCreated(event));
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

}

/**
 * The operation type indicates path 
 */
export enum OperationType {
    PATH_CREATED = "path:created" 
}

/**
 * "path:created" undo/redo action.
 */
export class PathCreatedUndoAction extends AbstractUndoRedoAction {
    constructor(event: any) {
        super(event);
    }
    
    /**
     * @override
     */
    public getType(): any {
        return OperationType.PATH_CREATED;
    }

    /**
     * @override
     * @param eBoardEngine 
     */
    undo(eBoardEngine: EBoardEngine): void {
        if (this.event.path) {
            eBoardEngine.getEBoardCanvas().remove(this.event.path);
        }
    }

    /**
     * @override
     * @param eBoardEngine 
     */
    redo(eBoardEngine: EBoardEngine): void {
        if (this.event.path) {
            eBoardEngine.getEBoardCanvas().add(this.event.path);
        }
    }
}
