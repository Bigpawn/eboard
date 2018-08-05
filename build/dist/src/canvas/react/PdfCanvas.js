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
 * @Date: 2018/7/5 15:52
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/5 15:52
 * @disc：PdfCanvas  使用pdfjs 直接转换pdf文档进行显示
 */
import * as React from "react";
import { HTMLCanvas } from './HTMLCanvas';
/**
 * 显示Pdf 一页内容的私有组建
 */
var PdfCanvas = /** @class */ (function (_super) {
    __extends(PdfCanvas, _super);
    function PdfCanvas() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PdfCanvas.prototype.render = function () {
        var children = (React.createElement("canvas", { style: { width: "100%" } }));
        return _super.prototype._render.call(this, children);
    };
    return PdfCanvas;
}(HTMLCanvas));
export { PdfCanvas };
//# sourceMappingURL=PdfCanvas.js.map