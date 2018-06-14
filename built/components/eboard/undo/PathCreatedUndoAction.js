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
 * @Date: 2018-06-06 11:10:47
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-12 11:21:26
 */
import { FabricOtherEventType } from '../mixins/FabricEvents';
import { AbstractUndoAction } from '../mixins/Undo';
/**
 * "path:created" undo/redo action.
 */
var PathCreatedUndoAction = /** @class */ (function (_super) {
    __extends(PathCreatedUndoAction, _super);
    function PathCreatedUndoAction(event) {
        return _super.call(this, event) || this;
    }
    /**
     * @override
     */
    PathCreatedUndoAction.prototype.getType = function () {
        return FabricOtherEventType.PATH_CREATED;
    };
    /**
     * @override
     * @param eBoardEngine
     */
    PathCreatedUndoAction.prototype.undo = function (eBoardEngine) {
        if (this.event.path) {
            eBoardEngine.getEBoardCanvas().remove(this.event.path);
        }
    };
    /**
     * @override
     * @param eBoardEngine
     */
    PathCreatedUndoAction.prototype.redo = function (eBoardEngine) {
        if (this.event.path) {
            eBoardEngine.getEBoardCanvas().add(this.event.path);
        }
    };
    return PathCreatedUndoAction;
}(AbstractUndoAction));
export default PathCreatedUndoAction;
//# sourceMappingURL=PathCreatedUndoAction.js.map