import { CursorType } from "./CursorType";
/**
 * Abstract class of default cursor.
 */
var AbstractCustomCursor = /** @class */ (function () {
    function AbstractCustomCursor(name, options, canvas) {
        this.name = name;
        this.options = options || {};
        this.canvas = canvas;
    }
    /**
     * @override
     */
    AbstractCustomCursor.prototype.getType = function () {
        return CursorType.CUSTOM_CURSOR;
    };
    /**
     * @override
     */
    AbstractCustomCursor.prototype.getName = function () {
        return this.name;
    };
    AbstractCustomCursor.prototype.setCanvas = function (canvas) {
        this.canvas = canvas;
    };
    AbstractCustomCursor.prototype._canvas = function () {
        return this.canvas;
    };
    return AbstractCustomCursor;
}());
export { AbstractCustomCursor };
//# sourceMappingURL=CustomCursor.js.map