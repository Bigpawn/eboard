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
 * @Date: 2018/7/16 17:45
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/16 17:45
 * @disc:五边形
 */
import { fabric } from "fabric";
var FabricPentagon = /** @class */ (function (_super) {
    __extends(FabricPentagon, _super);
    function FabricPentagon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "pentagon";
        return _this;
    }
    /**
     * 计算五边形各定点坐标
     * @param {{x: number; y: number}} center
     * @param {number} radius
     * @param {number} offsetAngle
     * @returns {any[]}
     */
    FabricPentagon.calcPointsByRadius = function (center, radius, offsetAngle) {
        // angle相对于正位置的偏角   72°间隔
        var angles = [offsetAngle, offsetAngle + 72, offsetAngle + 144, offsetAngle + 216, offsetAngle + 288];
        // cos sin 计算优化
        var sinOffsetAngle = Math.sin(offsetAngle / 180 * Math.PI);
        var cosOffsetAngle = Math.cos(offsetAngle / 180 * Math.PI);
        // 相差 180 °都是取反，此处只用到绝对值，不需要取反
        var sinObject = [sinOffsetAngle, sinOffsetAngle * this.cos72 + cosOffsetAngle * this.sin72, sinOffsetAngle * this.cos144 + cosOffsetAngle * this.sin144,
            sinOffsetAngle * this.cos216 + cosOffsetAngle * this.sin216,
            sinOffsetAngle * this.cos288 + cosOffsetAngle * this.sin288]; // 一半值
        var cosObject = [cosOffsetAngle, cosOffsetAngle * this.cos72 - sinOffsetAngle * this.sin72, cosOffsetAngle * this.cos144 - sinOffsetAngle * this.sin144,
            cosOffsetAngle * this.cos216 - sinOffsetAngle * this.sin216,
            cosOffsetAngle * this.cos288 - sinOffsetAngle * this.sin288]; // 一半值
        return angles.map(function (angle, index) {
            var _angle = angle % 360;
            var cosAngle = Math.abs(cosObject[index]); // 通过已知角进行优化
            var sinAngle = Math.abs(sinObject[index]);
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
    FabricPentagon.sin72 = Math.sin(72 / 180 * Math.PI);
    FabricPentagon.sin144 = Math.sin(144 / 180 * Math.PI);
    FabricPentagon.sin216 = Math.sin(216 / 180 * Math.PI);
    FabricPentagon.sin288 = Math.sin(288 / 180 * Math.PI);
    FabricPentagon.cos72 = Math.cos(72 / 180 * Math.PI);
    FabricPentagon.cos144 = Math.cos(144 / 180 * Math.PI);
    FabricPentagon.cos216 = Math.cos(216 / 180 * Math.PI);
    FabricPentagon.cos288 = Math.cos(288 / 180 * Math.PI);
    return FabricPentagon;
}(fabric.Polygon));
export { FabricPentagon };
//# sourceMappingURL=FabricPentagon.js.map