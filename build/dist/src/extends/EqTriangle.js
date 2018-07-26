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
 * @Date: 2018/7/15 14:55
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/15 14:55
 * @disc:等边三角形 extenns Polygon
 */
import { fabric } from "fabric";
var EqTriangle = /** @class */ (function (_super) {
    __extends(EqTriangle, _super);
    function EqTriangle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "eq-triangle";
        return _this;
    }
    /**
     * 计算等边三角形三个点
     * @param {{x: number; y: number}} center
     * @param {number} radius
     * @param {number} offsetAngle
     * @returns {any[]}
     */
    EqTriangle.calcPointsByRadius = function (center, radius, offsetAngle) {
        // angle相对于正位置的偏角   72°间隔
        var angles = [offsetAngle, offsetAngle + 120, offsetAngle + 240];
        // cos sin 计算优化
        var sinOffsetAngle = Math.sin(offsetAngle / 180 * Math.PI);
        var cosOffsetAngle = Math.cos(offsetAngle / 180 * Math.PI);
        // 相差 180 °都是取反，此处只用到绝对值，不需要取反
        var sinObject = [sinOffsetAngle, sinOffsetAngle * this.cos120 + cosOffsetAngle * this.sin120, sinOffsetAngle * this.cos240 + cosOffsetAngle * this.sin240]; // 一半值
        var cosObject = [cosOffsetAngle, cosOffsetAngle * this.cos120 - sinOffsetAngle * this.sin120, cosOffsetAngle * this.cos240 - sinOffsetAngle * this.sin240]; // 一半值
        return angles.map(function (angle, index) {
            var _angle = angle % 360;
            var cosAngle = Math.abs(cosObject[index]); // 通过已知角进行优化
            var sinAngle = Math.abs(sinObject[index]);
            if (_angle > 0 && _angle <= 90) {
                return new fabric.Point(center.x + radius * cosAngle, center.y + radius * sinAngle);
            }
            else if (_angle > 90 && _angle <= 180) {
                return new fabric.Point(center.x - radius * cosAngle, center.y + radius * sinAngle);
            }
            else if (_angle > 180 && _angle <= 270) {
                return new fabric.Point(center.x - radius * cosAngle, center.y - radius * sinAngle);
            }
            else {
                return new fabric.Point(center.x + radius * cosAngle, center.y - radius * sinAngle);
            }
        });
    };
    EqTriangle.sin120 = Math.sin(120 / 180 * Math.PI);
    EqTriangle.sin240 = Math.sin(240 / 180 * Math.PI);
    EqTriangle.cos120 = Math.cos(120 / 180 * Math.PI);
    EqTriangle.cos240 = Math.cos(240 / 180 * Math.PI);
    return EqTriangle;
}(fabric.Polygon));
export { EqTriangle };
//# sourceMappingURL=EqTriangle.js.map