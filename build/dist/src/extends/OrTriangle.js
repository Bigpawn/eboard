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
/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/15 14:57
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/15 14:57
 * @disc:直角三角形
 */
import { fabric } from "fabric";
var OrTriangle = /** @class */ (function (_super) {
    __extends(OrTriangle, _super);
    function OrTriangle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "or-triangle";
        return _this;
    }
    OrTriangle.calcPointsByCursorPoint = function (center, point) {
        return [
            new fabric.Point(center.x, center.y),
            new fabric.Point(point.x, point.y),
            new fabric.Point(center.x, point.y),
        ];
    };
    return OrTriangle;
}(fabric.Polygon));
export { OrTriangle };
//# sourceMappingURL=OrTriangle.js.map