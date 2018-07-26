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
 * @Date: 2018/7/15 9:16
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/15 9:16
 * @disc:等边三角形
 * 会触发两次重绘  后期考虑优化
 */
import { AbstractShapePlugin } from '../../AbstractShapePlugin';
import { EqTriangle } from '../../../../extends/EqTriangle';
var EquilateralTriangle = /** @class */ (function (_super) {
    __extends(EquilateralTriangle, _super);
    function EquilateralTriangle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.stroke = "rgba(0,0,0,1)";
        _this.strokeWidth = 1;
        return _this;
    }
    EquilateralTriangle.prototype.onMouseMove = function (event) {
        if (void 0 === this.start) {
            return;
        }
        _super.prototype.onMouseMove.call(this, event);
        var radius = Math.sqrt(Math.pow(this.start.x - this.end.x, 2) + Math.pow(this.start.y - this.end.y, 2));
        var angle = this.calcAngle(this.end);
        var points = EqTriangle.calcPointsByRadius(this.start, radius, angle);
        if (void 0 === this.instance) {
            this.instance = new EqTriangle(points, {
                stroke: this.stroke,
                strokeWidth: this.getCanvasPixel(this.strokeWidth),
                strokeDashArray: this.strokeDashArray,
                fill: this.fill,
                width: radius * 2,
                height: radius * 2,
                left: this.start.x,
                top: this.start.y,
                originY: "center",
                originX: "center"
            });
            this.eBoardCanvas.add(this.instance);
        }
        else {
            this.instance.set({
                points: points,
                width: radius * 2,
                height: radius * 2,
                left: this.start.x,
                top: this.start.y,
                originY: "center",
                originX: "center"
            }).setCoords();
            this.eBoardCanvas.renderAll();
        }
    };
    ;
    return EquilateralTriangle;
}(AbstractShapePlugin));
export { EquilateralTriangle };
//# sourceMappingURL=EquilateralTriangle.js.map