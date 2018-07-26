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
import { BrushType } from "./BrushType";
import AbstractBrush from "./AbstractBrush";
/**
 * Empty pointer brush.
 */
var PointerBrush = /** @class */ (function (_super) {
    __extends(PointerBrush, _super);
    // point: fabric.Point;
    function PointerBrush(options) {
        return _super.call(this, options) || this;
    }
    PointerBrush.prototype._createObject = function () {
        throw new Error("Method not implemented.");
    };
    PointerBrush.prototype.getType = function () {
        return BrushType.POINTER_BRUSH;
    };
    PointerBrush.prototype.onMouseDown = function (pointer) {
        return;
    };
    PointerBrush.prototype.onMouseUp = function (pointer) {
        return;
    };
    PointerBrush.prototype.onMouseMove = function (pointer) {
        return;
    };
    return PointerBrush;
}(AbstractBrush));
export default PointerBrush;
//# sourceMappingURL=PointerBrush.js.map