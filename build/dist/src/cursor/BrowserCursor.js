import { CursorType } from "./CursorType";
/**
 * Define browser cursor types.
 */
export var BrowserCursorName;
(function (BrowserCursorName) {
    BrowserCursorName["AUTO"] = "auto";
    BrowserCursorName["DEFAULT"] = "default";
    BrowserCursorName["NONE"] = "none";
    BrowserCursorName["CONTEXT_MENU"] = "context-menu";
    BrowserCursorName["HELP"] = "help";
    BrowserCursorName["POINTER"] = "pointer";
    BrowserCursorName["PROGRESS"] = "progress";
    BrowserCursorName["WAIT"] = "wait";
    BrowserCursorName["CELL"] = "cell";
    BrowserCursorName["CROSSHAIR"] = "crosshair";
    BrowserCursorName["TEXT"] = "text";
    BrowserCursorName["VERTICAL_TEXT"] = "vertical-text";
    BrowserCursorName["ALIAS"] = "alias";
    BrowserCursorName["COPY"] = "copy";
    BrowserCursorName["MOVE"] = "move";
    BrowserCursorName["NO_DROP"] = "no-drop";
    BrowserCursorName["NOT_ALLOWED"] = "not-allowed";
    BrowserCursorName["E_RESIZE"] = "e-resize";
    BrowserCursorName["N_RESIZE"] = "n-resize";
    BrowserCursorName["NE_RESIZE"] = "ne-resize";
    BrowserCursorName["NW_RESIZE"] = "nw-resize";
    BrowserCursorName["S_RESIZE"] = "s-resize";
    BrowserCursorName["SE_RESIZE"] = "se-resize";
    BrowserCursorName["SW_RESIZE"] = "sw-resize";
    BrowserCursorName["W_RESIZE"] = "w-resize";
    BrowserCursorName["EW_RESIZE"] = "ew-resize";
    BrowserCursorName["NS_RESIZE"] = "ns-resize";
    BrowserCursorName["NESW_RESIZE"] = "nesw-resize";
    BrowserCursorName["NWSE_RESIZE"] = "nwse-resize";
    BrowserCursorName["COL_RESIZE"] = "col-resize";
    BrowserCursorName["ROW_RESIZE"] = "row-resize";
    BrowserCursorName["ALL_SCROLL"] = "all-scroll";
    BrowserCursorName["ZOOM_IN"] = "zoom-in";
    BrowserCursorName["ZOOM_OUT"] = "zoom-out";
    BrowserCursorName["GRAB"] = "grab";
    BrowserCursorName["GRABBING"] = "grabbing";
})(BrowserCursorName || (BrowserCursorName = {}));
/**
 * Abstract class of default cursor.
 */
var DefaultCursor = /** @class */ (function () {
    function DefaultCursor(name, canvas) {
        this.name = name;
        this.canvas = canvas;
    }
    /**
     * @override
     */
    DefaultCursor.prototype.getType = function () {
        return CursorType.BROWSER_CURSOR;
    };
    /**
     * @override
     */
    DefaultCursor.prototype.getName = function () {
        return this.name;
    };
    /**
     * @override
     * @param point
     */
    DefaultCursor.prototype.render = function (point) {
        return;
    };
    DefaultCursor.prototype.setCanvas = function (canvas) {
        this.canvas = canvas;
    };
    DefaultCursor.prototype._canvas = function () {
        return this.canvas;
    };
    return DefaultCursor;
}());
export { DefaultCursor };
//# sourceMappingURL=BrowserCursor.js.map