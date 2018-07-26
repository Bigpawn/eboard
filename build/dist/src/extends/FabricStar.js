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
 * @Date: 2018/7/16 13:32
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/16 13:32
 * @disc:五角星 继承自Polygon
 * 扩展旋转功能
 */
import { fabric } from "fabric";
var FabricStar = /** @class */ (function (_super) {
    __extends(FabricStar, _super);
    function FabricStar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "star";
        return _this;
    }
    /**
     * 计算五角星各定点坐标
     * @param {{x: number; y: number}} center
     * @param {number} radius
     * @param {number} offsetAngle 鼠标位置偏角
     * @returns {any[]}
     */
    FabricStar.calcPointsByRadius = function (center, radius, offsetAngle) {
        var innerRadius = radius / (3 - 4 * Math.pow(this.sin18, 2));
        // angle相对于正位置的偏角   72°间隔
        var angles = [offsetAngle, offsetAngle + 36, offsetAngle + 72, offsetAngle + 108, offsetAngle + 144, offsetAngle + 180, offsetAngle + 216, offsetAngle + 252, offsetAngle + 288, offsetAngle + 324];
        // cos sin 计算优化
        var sinOffsetAngle = Math.sin(offsetAngle / 180 * Math.PI);
        var cosOffsetAngle = Math.cos(offsetAngle / 180 * Math.PI);
        // 相差 180 °都是取反，此处只用到绝对值，不需要取反
        var sinObject = [sinOffsetAngle, sinOffsetAngle * this.cos36 + cosOffsetAngle * this.sin36,
            sinOffsetAngle * this.cos72 + cosOffsetAngle * this.sin72, sinOffsetAngle * this.cos108 + cosOffsetAngle * this.sin108,
            sinOffsetAngle * this.cos144 + cosOffsetAngle * this.sin144]; // 一半值
        var cosObject = [cosOffsetAngle, cosOffsetAngle * this.cos36 - sinOffsetAngle * this.sin36,
            cosOffsetAngle * this.cos72 - sinOffsetAngle * this.sin72, cosOffsetAngle * this.cos108 - sinOffsetAngle * this.sin108,
            cosOffsetAngle * this.cos144 - sinOffsetAngle * this.sin144]; // 一半值
        return angles.map(function (angle, index) {
            var _angle = angle % 360;
            var cosAngle = Math.abs(cosObject[index % 5]); // 通过已知角进行优化
            var sinAngle = Math.abs(sinObject[index % 5]);
            // const cosAngle = Math.abs(Math.cos(_angle/180 * Math.PI));// 通过已知角进行优化
            // const sinAngle = Math.abs(Math.sin(_angle/180 * Math.PI));
            if (index % 2 === 0) {
                // 外角
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
            }
            else {
                // 内角
                if (_angle > 0 && _angle <= 90) {
                    return new fabric.Point(center.x + innerRadius * cosAngle, center.y + innerRadius * sinAngle);
                }
                else if (_angle > 90 && _angle <= 180) {
                    return new fabric.Point(center.x - innerRadius * cosAngle, center.y + innerRadius * sinAngle);
                }
                else if (_angle > 180 && _angle <= 270) {
                    return new fabric.Point(center.x - innerRadius * cosAngle, center.y - innerRadius * sinAngle);
                }
                else {
                    return new fabric.Point(center.x + innerRadius * cosAngle, center.y - innerRadius * sinAngle);
                }
            }
        });
    };
    FabricStar.sin18 = Math.abs(Math.sin(18 / 180 * Math.PI));
    FabricStar.sin36 = Math.sin(36 / 180 * Math.PI);
    FabricStar.sin72 = Math.sin(72 / 180 * Math.PI);
    FabricStar.sin108 = Math.sin(108 / 180 * Math.PI);
    FabricStar.sin144 = Math.sin(144 / 180 * Math.PI);
    FabricStar.cos36 = Math.cos(36 / 180 * Math.PI);
    FabricStar.cos72 = Math.cos(72 / 180 * Math.PI);
    FabricStar.cos108 = Math.cos(108 / 180 * Math.PI);
    FabricStar.cos144 = Math.cos(144 / 180 * Math.PI);
    return FabricStar;
}(fabric.Polygon));
export { FabricStar };
//# sourceMappingURL=FabricStar.js.map