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
 * @Date: 2018-05-31 22:56:05
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-12 22:02:52
 */
/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-31 19:29:46
 * @Last Modified by:   Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-05-31 19:29:46
 */
import * as _ from "lodash";
import { fabric } from "fabric";
import { BrushType } from "../../BrushType";
import RectangleBrush from "./RectangleBrush";
var CircleBrush = /** @class */ (function (_super) {
    __extends(CircleBrush, _super);
    function CircleBrush(options) {
        return _super.call(this, options) || this;
    }
    /**
     * @override
     */
    CircleBrush.prototype.getType = function () {
        return BrushType.CIRCLE_BRUSH;
    };
    /**
     * @override
     */
    CircleBrush.prototype._createObject = function () {
        if (!this._points || this._points.length === 0) {
            return undefined;
        }
        var start = this._points[0], end = this._points[1];
        if (start.x === end.x && start.y === end.y) {
            return null;
        }
        var xOff = Math.abs(start.x - end.x), yOff = Math.abs(start.y - end.y), radius;
        if (xOff > yOff) {
            radius = yOff / 2;
        }
        else {
            radius = xOff / 2;
        }
        var renderOpts = {};
        _.defaultsDeep(renderOpts, { 'radius': radius, 'left': start.x, 'top': start.y }, this.options);
        return new fabric
            .Circle(renderOpts);
    };
    return CircleBrush;
}(RectangleBrush));
export default CircleBrush;
//# sourceMappingURL=CircleBrush.js.map