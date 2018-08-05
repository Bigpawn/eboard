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
 * @Date: 2018-05-30 14:40:36
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-12 22:06:11
 */
import * as _ from "lodash";
import { fabric } from "fabric";
import { BrushType } from "../../BrushType";
import AbstractBrush from "../../AbstractBrush";
var RectangleBrush = /** @class */ (function (_super) {
    __extends(RectangleBrush, _super);
    function RectangleBrush(options) {
        return _super.call(this, options) || this;
    }
    /**
     * @override
     */
    RectangleBrush.prototype.getType = function () {
        return BrushType.RECTANGLE_BRUSH;
    };
    /**
     * @override
     */
    RectangleBrush.prototype._createObject = function () {
        if (!this._points || this._points.length < 2) {
            return null;
        }
        var p1 = this._points[0], p2 = this._points[1];
        if (p1.x === p2.x && p1.y === p2.y) {
            return null;
        }
        var _left = p1.x < p2.x ? p1.x : p2.x, _top = p1.y < p2.y ? p1.y : p2.y, _width = Math.abs(p1.x - p2.x), _height = Math.abs(p1.y - p2.y);
        var renderOpts = {};
        _.defaultsDeep(renderOpts, { 'left': _left, 'top': _top, 'width': _width, 'height': _height, 'prePixelTargetFind': true }, this.options);
        return new fabric.Rect(renderOpts);
    };
    /**
     * @override
     */
    RectangleBrush.prototype._addPoint = function (point) {
        if (this._points.length < 1) {
            this._points.push(point);
        }
        else {
            this._points[1] = point;
        }
    };
    return RectangleBrush;
}(AbstractBrush));
export default RectangleBrush;
//# sourceMappingURL=RectangleBrush.js.map