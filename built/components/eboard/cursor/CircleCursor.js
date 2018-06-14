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
 * @Date: 2018-05-24 11:49:55
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-12 21:56:24
 */
import { fabric } from "fabric";
import { AbstractCustomCursor } from "./CustomCursor";
/**
 * Circle cursor.
 */
var CircleCursor = /** @class */ (function (_super) {
    __extends(CircleCursor, _super);
    function CircleCursor(options, canvas) {
        var _this = _super.call(this, 'circle', options, canvas || options.canvas) || this;
        _this._init(options || {});
        return _this;
    }
    CircleCursor.prototype._init = function (options) {
        this.fill = new fabric.Color(this.options.fill || "rgba(255, 255, 255, 0)");
        this.radius = this.options.radius || (this.canvas && this.canvas.getFreeDrawingBrush().width / 2);
        this.stroke = new fabric.Color(this.options.stroke || 'black');
        this.strokeWidth = this.options.strokeWidth || 1;
    };
    CircleCursor.prototype.setCanvas = function (canvas) {
        this.canvas = canvas;
    };
    CircleCursor.prototype._canvas = function () {
        return this.canvas;
    };
    CircleCursor.prototype.render = function (point) {
        var ctx = this.canvas.getCursorCanvasContext();
        if (ctx) {
            ctx.fillStyle = this.fill.toRgba();
            ctx.lineWidth = this.strokeWidth;
            ctx.strokeStyle = this.stroke.toRgba();
            ctx.beginPath();
            ctx.arc(point.x, point.y, this.radius, 0, Math.PI * 2, true);
            ctx.stroke();
            ctx.fill();
        }
    };
    return CircleCursor;
}(AbstractCustomCursor));
export default CircleCursor;
//# sourceMappingURL=CircleCursor.js.map