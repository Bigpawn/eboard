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
 * @Date: 2018-06-07 09:11:03
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-11 19:35:06
 */
import { FabricObservingEventType } from '../mixins/FabricEvents';
import { AbstractUndoAction } from '../mixins/Undo';
/**
 * "path:created" undo/redo action.
 */
var ZoomUndoAction = /** @class */ (function (_super) {
    __extends(ZoomUndoAction, _super);
    function ZoomUndoAction(event) {
        return _super.call(this, event) || this;
    }
    /**
     * @override
     */
    ZoomUndoAction.prototype.getType = function () {
        return FabricObservingEventType.ZOOM_AFTER;
    };
    /**
     * @override
     * @param eBoardEngine
     */
    ZoomUndoAction.prototype.undo = function (eBoardEngine) {
        var event = this.event;
        eBoardEngine.getEBoardCanvas().setViewportTransform(event.oldVpt);
    };
    /**
     * @override
     * @param eBoardEngine
     */
    ZoomUndoAction.prototype.redo = function (eBoardEngine) {
        var event = this.event;
        eBoardEngine.getEBoardCanvas().setViewportTransform(event.lastVpt);
    };
    return ZoomUndoAction;
}(AbstractUndoAction));
export default ZoomUndoAction;
//# sourceMappingURL=ZoomUndoAction.js.map