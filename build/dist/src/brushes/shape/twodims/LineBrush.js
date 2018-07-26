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
 * @Date: 2018-05-30 11:47:19
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-07-05 13:51:13
 */
import { fabric } from "fabric";
import AbstractBrush from "../../AbstractBrush";
import { BrushType } from '../../BrushType';
var LineBrush = /** @class */ (function (_super) {
    __extends(LineBrush, _super);
    function LineBrush(options) {
        return _super.call(this, options) || this;
    }
    /**
     * @override
     */
    LineBrush.prototype.getType = function () {
        return BrushType.LINE_BRUSH;
    };
    /**
     * @override
     */
    LineBrush.prototype._createObject = function () {
        if (!this._points || this._points.length < 2) {
            return null;
        }
        var points = [];
        points[0] = this._points[0].x;
        points[1] = this._points[0].y;
        points[2] = this._points[1].x;
        points[3] = this._points[1].y;
        return new fabric.Line(points, this.options);
    };
    /**
     * @override
     */
    LineBrush.prototype._addPoint = function (point) {
        if (this._points.length < 1) {
            this._points.push(point);
        }
        else {
            this._points[1] = point;
        }
    };
    return LineBrush;
}(AbstractBrush));
export default LineBrush;
//# sourceMappingURL=LineBrush.js.map