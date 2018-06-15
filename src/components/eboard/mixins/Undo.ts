/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-05 15:51:37
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-07 09:26:35
 */
import EBoardEngine from "../EBoardEngine";

/**
 * Interface to define undo redo action.
 */
export interface IUndoRedoAction {
    /**
     * Return type of action.
     */
    getType(): any,

    /**
     * Return event of the action.
     */
    getEvent(): any,

    /**
     * Undo this event.
     * @param eBoardEngine 
     */
    undo(eBoardEngine: EBoardEngine): void;

    /**
     * Redo this event.
     * @param eBoardEngine 
     */
    redo(eBoardEngine: EBoardEngine): void;
}

/**
 * Abstract class to implement common functions for undo/redo action.
 */
export abstract class AbstractUndoAction implements IUndoRedoAction {
    /**
     * Event
     */
    protected event: any;

    /**
     * Constructor.
     * 
     * @param event 
     */
    constructor(event: any) {
        this.event = event;
    }

    /**
     * @override
     */
    public abstract getType(): any;

    /**
     * @override
     */
    public getEvent(): any {
        return this.event;
    }

    /**
     * @override
     */    
    public abstract undo(eBoardEngine: EBoardEngine): void;
    
    /**
     * @override
     */
    public abstract redo(eBoardEngine: EBoardEngine): void;
}

/**
 * The class executes undo/redo operation according to operation records.
 */
export class UndoEngine {
     private eBoardEngine: EBoardEngine;
 
     /**
      * Save history event for undo operation.
      */
     private undoStack: any[] = [];
 
     /**
      * Save history undo event for redo operation.
      */
     private redoStack: any[] = [];
 
     /**
      * Constructor
      * @param eBoardEngine 
      */
     constructor(eBoardEngine: EBoardEngine) {
         this.eBoardEngine = eBoardEngine;
     }
 
     /**
      * Save event into undo stack.
      * 
      * @param eventType 
      * @param event 
      */
     public pushAction(action: IUndoRedoAction) {
         this.undoStack.push(action);
         // Clear all redo events once push new event to undo stack.
         this.redoStack = [];
     }
 
     /**
      * Popup an operation from undo stack and undo the operation.
      * 
      * @return {number, number} size of undo and redo stack
      */
     public undo(): {undoSize: number, redoSize: number} {
         let action: IUndoRedoAction = this.undoStack.pop();
         if (action) {
             action.undo(this.eBoardEngine);
             this.redoStack.push(action);
         } 
         return {undoSize: this.undoStack.length, redoSize: this.redoStack.length};
     }
 
     /**
      * Popup an operation from redo stack and redo the operation.
      * 
      * @return {number, number} size of undo and redo stack
      */
     public redo(): {undoSize: number, redoSize: number} {
         let action: IUndoRedoAction = this.redoStack.pop();
         if (action) {
             action.redo(this.eBoardEngine);
             this.undoStack.push(action);
         }
         return {undoSize: this.undoStack.length, redoSize: this.redoStack.length};
     }
}