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
 * @Date: 2018/7/20 14:25
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/20 14:25
 * @disc:图片Frame 单独的图片Frame 不允许出现滚动条，翻页中只支持滚动条，允许配置
 *      滚动条支持：perfect-scrollbar
 */
import { HtmlFrame } from './HtmlFrame';
var ImageFrame = /** @class */ (function (_super) {
    __extends(ImageFrame, _super);
    function ImageFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImageFrame.prototype.initialize = function (options) {
        _super.prototype.initialize.call(this, options);
        this.src = options.src || "";
    };
    ImageFrame.prototype.getChildren = function () {
        return "<img src=\"" + this.src + "\" style=\"width:100%\"/>";
    };
    return ImageFrame;
}(HtmlFrame));
export { ImageFrame };
//# sourceMappingURL=ImageFrame.js.map