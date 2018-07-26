/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/25 10:54
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/7/25 10:54
 * @disc:箭头生成工厂
 */
import { ArrowMode } from '../Arrow';
var DefaultFactory = /** @class */ (function () {
    function DefaultFactory() {
    }
    /**
     * 计算路径
     * @param start
     * @param end
     * @param {number} theta
     * @param {number} headlen
     * @param {ArrowMode} mode
     * @param {string} color
     * @returns {{path: string; fill: string}}
     */
    DefaultFactory.calcPath = function (start, end, theta, headlen, mode, color) {
        var fromX = start.x, fromY = start.y;
        var toX = end.x, toY = end.y;
        var angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI, angle1 = (angle + theta) * Math.PI / 180, angle2 = (angle - theta) * Math.PI / 180, topX = headlen * Math.cos(angle1), topY = headlen * Math.sin(angle1), botX = headlen * Math.cos(angle2), botY = headlen * Math.sin(angle2);
        var arrowX = fromX - topX, arrowY = fromY - topY;
        var path = " M " + fromX + " " + fromY;
        path += " L " + toX + " " + toY;
        // 判断是否有两个
        if (mode === ArrowMode.PREV || mode === ArrowMode.ALL) {
            // startArrow
            arrowX = fromX - topX;
            arrowY = fromY - topY;
            path += " M " + arrowX + " " + arrowY;
            path += " L " + fromX + " " + fromY;
            arrowX = fromX - botX;
            arrowY = fromY - botY;
            path += " L " + arrowX + " " + arrowY;
        }
        if (mode === ArrowMode.NEXT || mode === ArrowMode.ALL) {
            // endArrow
            arrowX = toX + topX;
            arrowY = toY + topY;
            path += " M " + arrowX + " " + arrowY;
            path += " L " + toX + " " + toY;
            arrowX = toX + botX;
            arrowY = toY + botY;
            path += " L " + arrowX + " " + arrowY;
        }
        return {
            path: path,
            fill: color
        };
    };
    return DefaultFactory;
}());
export default DefaultFactory;
//# sourceMappingURL=default.js.map