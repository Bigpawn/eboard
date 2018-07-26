/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/25 11:47
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/25 11:47
 * @disc:鱼头类箭头
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
import DefaultFactory from './default';
import { ArrowMode } from '../Arrow';
var FishFactory = /** @class */ (function (_super) {
    __extends(FishFactory, _super);
    function FishFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     *
     * @param start
     * @param end
     * @param {number} theta
     * @param {number} headlen
     * @param {ArrowMode} mode
     * @param {string} color
     * @returns {{path: string; fill: string}}
     */
    FishFactory.calcPath = function (start, end, theta, headlen, mode, color) {
        var fromX = start.x, fromY = start.y;
        var toX = end.x, toY = end.y;
        var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI, angle1 = (angle + theta) * Math.PI / 180, angle2 = (angle - theta) * Math.PI / 180, topX = headlen * Math.cos(angle1), topY = headlen * Math.sin(angle1), botX = headlen * Math.cos(angle2), botY = headlen * Math.sin(angle2);
        var path = " M " + fromX + " " + fromY;
        path += " L " + toX + " " + toY;
        // 取中间点，然后跟终点1/3 点
        if (mode === ArrowMode.PREV || mode === ArrowMode.ALL) {
            var point1 = {
                x: fromX - topX,
                y: fromY - topY
            };
            var point2 = {
                x: fromX - botX,
                y: fromY - botY
            };
            var point3 = {
                x: (point1.x + point2.x) / 2,
                y: (point1.y + point2.y) / 2,
            };
            var point4 = {
                x: (fromX - point3.x) / 3 + point3.x,
                y: (fromY - point3.y) / 3 + point3.y,
            };
            path += " M " + point1.x + " " + point1.y;
            path += " L " + fromX + " " + fromY;
            path += " L " + point2.x + " " + point2.y;
            path += " L " + point4.x + " " + point4.y;
            path += " Z";
        }
        if (mode === ArrowMode.NEXT || mode === ArrowMode.ALL) {
            // endArrow
            var point1 = {
                x: toX + topX,
                y: toY + topY
            };
            var point2 = {
                x: toX + botX,
                y: toY + botY
            };
            var point3 = {
                x: (point1.x + point2.x) / 2,
                y: (point1.y + point2.y) / 2,
            };
            var point4 = {
                x: (toX - point3.x) / 3 + point3.x,
                y: (toY - point3.y) / 3 + point3.y,
            };
            path += " M " + point1.x + " " + point1.y;
            path += " L " + toX + " " + toY;
            path += " L " + point2.x + " " + point2.y;
            path += " L " + point4.x + " " + point4.y;
            path += " Z";
        }
        return {
            path: path,
            fill: color
        };
    };
    return FishFactory;
}(DefaultFactory));
export default FishFactory;
//# sourceMappingURL=fish.js.map