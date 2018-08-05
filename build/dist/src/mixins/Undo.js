/**
 * Abstract class to implement common functions for undo/redo action.
 */
var AbstractUndoAction = /** @class */ (function () {
    /**
     * Constructor.
     *
     * @param event
     */
    function AbstractUndoAction(event) {
        this.event = event;
    }
    /**
     * @override
     */
    AbstractUndoAction.prototype.getEvent = function () {
        return this.event;
    };
    return AbstractUndoAction;
}());
export { AbstractUndoAction };
/**
 * The class executes undo/redo operation according to operation records.
 */
var UndoEngine = /** @class */ (function () {
    /**
     * Constructor
     * @param eBoardEngine
     */
    function UndoEngine(eBoardEngine) {
        /**
         * Save history event for undo operation.
         */
        this.undoStack = [];
        /**
         * Save history undo event for redo operation.
         */
        this.redoStack = [];
        this.eBoardEngine = eBoardEngine;
    }
    /**
     * Save event into undo stack.
     *
     * @param eventType
     * @param event
     */
    UndoEngine.prototype.pushAction = function (action) {
        this.undoStack.push(action);
        // Clear all redo events once push new event to undo stack.
        this.redoStack = [];
    };
    /**
     * Popup an operation from undo stack and undo the operation.
     *
     * @return {number, number} size of undo and redo stack
     */
    UndoEngine.prototype.undo = function () {
        var action = this.undoStack.pop();
        if (action) {
            action.undo(this.eBoardEngine);
            this.redoStack.push(action);
        }
        return { undoSize: this.undoStack.length, redoSize: this.redoStack.length };
    };
    /**
     * Popup an operation from redo stack and redo the operation.
     *
     * @return {number, number} size of undo and redo stack
     */
    UndoEngine.prototype.redo = function () {
        var action = this.redoStack.pop();
        if (action) {
            action.redo(this.eBoardEngine);
            this.undoStack.push(action);
        }
        return { undoSize: this.undoStack.length, redoSize: this.redoStack.length };
    };
    return UndoEngine;
}());
export { UndoEngine };
//# sourceMappingURL=Undo.js.map