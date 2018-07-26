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
 * @Date: 2018/7/19 14:00
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/19 14:00
 * @disc:清空  仅清空当前白板或者清空所有白板
 */
import { AbstractPlugin } from '../../AbstractPlugin';
var Clear = /** @class */ (function (_super) {
    __extends(Clear, _super);
    function Clear() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Clear.prototype.setEnable = function (enable) {
        return this;
    };
    /**
     * 清空当前白板
     */
    Clear.prototype.clear = function () {
        this.eBoardCanvas.clear();
    };
    /**
     * 清空所有白板
     */
    Clear.prototype.clearAll = function () {
        // 白板实例需要存放，涉及到数据结构，待定
    };
    return Clear;
}(AbstractPlugin));
export { Clear };
//# sourceMappingURL=Clear.js.map