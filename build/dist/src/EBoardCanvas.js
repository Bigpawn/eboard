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
 * @Date: 2018/7/10 10:48
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/10 10:48
 * @disc:EBoardCanvas extend fabric.Canvas
 */
import { fabric } from "fabric";
var EBoardCanvas = /** @class */ (function (_super) {
    __extends(EBoardCanvas, _super);
    function EBoardCanvas(element, options) {
        return _super.call(this, element, options) || this;
    }
    EBoardCanvas.prototype.getLowerCanvas = function () {
        return this.getElement();
    };
    EBoardCanvas.prototype.getUpperCanvas = function () {
        return this.getElement().nextElementSibling;
    };
    EBoardCanvas.prototype.getContainer = function () {
        return this.getElement().parentElement;
    };
    return EBoardCanvas;
}(fabric.Canvas));
export { EBoardCanvas };
//# sourceMappingURL=EBoardCanvas.js.map