/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/16 17:51
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/16 17:51
 * @disc:六边形 extends Polygon
 * 扩展旋转
 */
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
import { fabric } from "fabric";
var FabricHexagon = /** @class */ (function (_super) {
    __extends(FabricHexagon, _super);
    function FabricHexagon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "hexagon";
        return _this;
    }
    /**
     * 计算五边形各定点坐标
     * @param {{x: number; y: number}} center
     * @param {number} radius
     * @param {number} offsetAngle
     * @returns {any[]}
     */
    FabricHexagon.calcPointsByRadius = function (center, radius, offsetAngle) {
        // angle相对于正位置的偏角   72°间隔
        var angles = [offsetAngle, offsetAngle + 60, offsetAngle + 120, offsetAngle + 180, offsetAngle + 240, offsetAngle + 300];
        // cos sin 计算优化
        var sinOffsetAngle = Math.sin(offsetAngle / 180 * Math.PI);
        var cosOffsetAngle = Math.cos(offsetAngle / 180 * Math.PI);
        // 相差 180 °都是取反，此处只用到绝对值，不需要取反
        var sinObject = [sinOffsetAngle, sinOffsetAngle * this.cos60 + cosOffsetAngle * this.sin60, sinOffsetAngle * this.cos120 + cosOffsetAngle * this.sin120]; // 一半值
        var cosObject = [cosOffsetAngle, cosOffsetAngle * this.cos60 - sinOffsetAngle * this.sin60, cosOffsetAngle * this.cos120 - sinOffsetAngle * this.sin120]; // 一半值
        return angles.map(function (angle, index) {
            var _angle = angle % 360;
            var cosAngle = Math.abs(cosObject[index % 3]); // 通过已知角进行优化
            var sinAngle = Math.abs(sinObject[index % 3]);
            // const cosAngle = Math.abs(Math.cos(_angle/180 * Math.PI));// 通过已知角进行优化
            // const sinAngle = Math.abs(Math.sin(_angle/180 * Math.PI));
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
    FabricHexagon.sin60 = Math.sin(60 / 180 * Math.PI);
    FabricHexagon.sin120 = Math.sin(120 / 180 * Math.PI);
    FabricHexagon.cos60 = Math.cos(60 / 180 * Math.PI);
    FabricHexagon.cos120 = Math.cos(120 / 180 * Math.PI);
    return FabricHexagon;
}(fabric.Polygon));
export { FabricHexagon };
//# sourceMappingURL=FabricHexagon.js.map