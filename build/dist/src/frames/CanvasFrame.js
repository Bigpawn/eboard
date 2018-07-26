/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/20 16:39
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/20 16:39
 * @disc:CanvasFrame 用于Pdfjs想显示等需要使用Canvas绘制的场景
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
import { HtmlFrame } from './HtmlFrame';
var CanvasFrame = /** @class */ (function (_super) {
    __extends(CanvasFrame, _super);
    function CanvasFrame(options, container) {
        return _super.call(this, options, container) || this;
    }
    CanvasFrame.prototype.getChildren = function () {
        var canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        this.canvas = canvas;
        return canvas;
    };
    return CanvasFrame;
}(HtmlFrame));
export { CanvasFrame };
//# sourceMappingURL=CanvasFrame.js.map