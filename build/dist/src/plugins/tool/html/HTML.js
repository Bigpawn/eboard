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
 * @Date: 2018/7/11 14:35
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/11 14:35
 * @disc:HTML 操作，禁用画板所有操作，启用html操作，仅HTMLCanvas 有效
 */
import { AbstractPlugin } from '../../AbstractPlugin';
var HTML = /** @class */ (function (_super) {
    __extends(HTML, _super);
    function HTML() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HTML.prototype.setEnable = function (enable) {
        _super.prototype.setEnable.call(this, enable);
        var parentElement = this.eBoardCanvas.getContainer();
        if (enable) {
            if (/eboard-html-canvas/.test(parentElement.className)) {
                parentElement.style.pointerEvents = "none";
                parentElement.previousElementSibling.style.pointerEvents = "all";
            }
        }
        else {
            if (/eboard-html-canvas/.test(parentElement.className)) {
                parentElement.style.pointerEvents = "all";
                parentElement.previousElementSibling.style.pointerEvents = "none";
            }
        }
        return this;
    };
    return HTML;
}(AbstractPlugin));
export { HTML };
//# sourceMappingURL=HTML.js.map