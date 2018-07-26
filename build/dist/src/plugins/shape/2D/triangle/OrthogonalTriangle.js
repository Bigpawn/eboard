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
 * @Date: 2018/7/15 14:58
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/15 14:58
 * @disc:直角三角形 继承自Path
 */
import { AbstractShapePlugin } from '../../AbstractShapePlugin';
import { OrTriangle } from '../../../../extends/OrTriangle';
var OrthogonalTriangle = /** @class */ (function (_super) {
    __extends(OrthogonalTriangle, _super);
    function OrthogonalTriangle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.stroke = "rgba(0,0,0,1)";
        _this.strokeWidth = 1;
        return _this;
    }
    OrthogonalTriangle.prototype.onMouseMove = function (event) {
        if (void 0 === this.start) {
            return;
        }
        _super.prototype.onMouseMove.call(this, event);
        var points = OrTriangle.calcPointsByCursorPoint(this.start, this.end);
        if (void 0 === this.instance) {
            this.instance = new OrTriangle(points, {
                stroke: this.stroke,
                strokeWidth: this.getCanvasPixel(this.strokeWidth),
                strokeDashArray: this.strokeDashArray,
                fill: this.fill,
            });
            this.eBoardCanvas.add(this.instance);
        }
        else {
            this.eBoardCanvas.renderOnAddRemove = false;
            this.eBoardCanvas.remove(this.instance);
            this.instance = new OrTriangle(points, {
                stroke: this.stroke,
                strokeWidth: this.getCanvasPixel(this.strokeWidth),
                strokeDashArray: this.strokeDashArray,
                fill: this.fill,
            });
            this.eBoardCanvas.add(this.instance);
            this.eBoardCanvas.renderAll();
            this.eBoardCanvas.renderOnAddRemove = false;
        }
    };
    ;
    return OrthogonalTriangle;
}(AbstractShapePlugin));
export { OrthogonalTriangle };
//# sourceMappingURL=OrthogonalTriangle.js.map