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
 * @Date: 2018/7/25 11:24
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/25 11:24
 * @disc:空心
 */
import DefaultFactory from './default';
var HollowFactory = /** @class */ (function (_super) {
    __extends(HollowFactory, _super);
    function HollowFactory() {
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
    HollowFactory.calcPath = function (start, end, theta, headlen, mode, color) {
        var calc = _super.calcPath.call(this, start, end, theta, headlen, mode, color);
        return {
            path: calc.path,
            fill: "rgba(0,0,0,0)"
        };
    };
    return HollowFactory;
}(DefaultFactory));
export default HollowFactory;
//# sourceMappingURL=hollow.js.map