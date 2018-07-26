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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ScreenComponent } from "./components/screenComponent";
var SuspensionShell = /** @class */ (function (_super) {
    __extends(SuspensionShell, _super);
    function SuspensionShell(eBoardCanvasObject, eBordCanvas) {
        var _this = _super.call(this, eBoardCanvasObject, eBordCanvas) || this;
        _this.initSuspension(eBoardCanvasObject, eBordCanvas);
        return _this;
    }
    /**
     *
     * @param {module:.fabric/fabric-impl.Object} fabricObject
     * @param eBordCanvas
     */
    SuspensionShell.prototype.initSuspension = function (fabricObject, eBordCanvas) {
        var _a = this._count(fabricObject, eBordCanvas), left = _a.left, top = _a.top;
        var typeArray = this._typeArray(fabricObject);
        var initStyleArray = this._initStyle(fabricObject);
        this._createElement(eBordCanvas);
        ReactDOM.render(React.createElement(ScreenComponent, { left: left, top: top, fabricObject: fabricObject, eBordCanvas: eBordCanvas, typeArray: typeArray, initStyleArray: initStyleArray }), this.divElement);
    };
    /**
     * 创建浮层外层元素
     * @param eBordCanvas
     * @private
     */
    SuspensionShell.prototype._createElement = function (eBordCanvas) {
        if (!this.divElement) {
            this.divElement = document.createElement('div');
            var container = eBordCanvas.getContainer();
            container.appendChild(this.divElement);
        }
    };
    /**
     * 位置
     * @param {module:.fabric/fabric-impl.Object} fabricObject
     * @param eBordCanvas
     * @returns {{left: number; top: number}}
     * @private
     */
    SuspensionShell.prototype._count = function (fabricObject, eBordCanvas) {
        var canvasWrapper = eBordCanvas.getContainer();
        var canvasWrapperWidth = canvasWrapper.clientWidth;
        var canvasWrapperHeight = canvasWrapper.clientHeight;
        var objectLeft = fabricObject.left || 0;
        var objectTop = fabricObject.top || 0;
        var thisLeft = canvasWrapperWidth * objectLeft / eBordCanvas.getWidth();
        var thisTop = canvasWrapperHeight * objectTop / eBordCanvas.getHeight();
        return {
            left: thisLeft,
            top: thisTop - 59
        };
    };
    /**
     * 被选中元素的type集合
     * @param fabricObject
     * @returns {any}
     * @private
     */
    SuspensionShell.prototype._typeArray = function (fabricObject) {
        var array = [];
        var objects = fabricObject && fabricObject._objects;
        if (objects && objects.length > 0) {
            objects.map(function (item, index) {
                array.push(item.type);
            });
        }
        else {
            fabricObject && array.push(fabricObject.type);
        }
        return array;
    };
    /**
     * 默认样式
     * @param fabricObject
     * @returns {any}
     * @private
     */
    SuspensionShell.prototype._initStyle = function (fabricObject) {
        var objects = fabricObject && fabricObject._objects;
        var initStyleArray;
        if (!objects) {
            initStyleArray = __assign({}, fabricObject);
        }
        return initStyleArray;
    };
    /**
     * 移除外层元素
     * @param eBordCanvas
     */
    SuspensionShell.prototype.removeElement = function (eBordCanvas) {
        var container = eBordCanvas.getContainer();
        container.removeChild(this.divElement);
    };
    return SuspensionShell;
}(React.PureComponent));
export { SuspensionShell };
//# sourceMappingURL=SuspensionShell.js.map