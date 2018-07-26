/*
 * @Author: Bigpawn
 * @Date: 2018/7/13 9:59
 * @Last Modified by: Bigpawn
 * @Last Modified time: 2018/7/13 9:59
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
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Color } from "./components/color";
var SuspensionPosition = /** @class */ (function (_super) {
    __extends(SuspensionPosition, _super);
    function SuspensionPosition(eBoardCanvasObject, eBordCanvas) {
        var _this = _super.call(this, eBoardCanvasObject, eBordCanvas) || this;
        _this.init(eBoardCanvasObject, eBordCanvas);
        return _this;
    }
    SuspensionPosition.prototype.init = function (fabricObject, eBordCanvas) {
        var _a = this._count(fabricObject, eBordCanvas), left = _a.left, top = _a.top;
        this._createElement(eBordCanvas);
        ReactDOM.render(React.createElement(Color, { left: left, top: top }), this.divElement);
    };
    SuspensionPosition.prototype._createElement = function (eBordCanvas) {
        if (!this.divElement) {
            this.divElement = document.createElement('div');
            var container = eBordCanvas.getContainer();
            container.appendChild(this.divElement);
        }
    };
    SuspensionPosition.prototype._count = function (fabricObject, eBordCanvas) {
        var canvasWrapper = eBordCanvas.getContainer();
        var canvasWrapperWidth = canvasWrapper.clientWidth;
        var canvasWrapperHeight = canvasWrapper.clientHeight;
        var objectLeft = fabricObject.left || 0;
        var objectTop = fabricObject.top || 0;
        var thisLeft = canvasWrapperWidth * objectLeft / eBordCanvas.getWidth();
        var thisTop = canvasWrapperHeight * objectTop / eBordCanvas.getHeight();
        return {
            left: thisLeft,
            top: thisTop - 25
        };
    };
    SuspensionPosition.prototype.removeElement = function (eBordCanvas) {
        var container = eBordCanvas.getContainer();
        container.removeChild(this.divElement);
    };
    return SuspensionPosition;
}(React.PureComponent));
export { SuspensionPosition };
//# sourceMappingURL=suspensionPosition.js.map