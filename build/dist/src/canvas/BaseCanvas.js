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
 * @disc:fabric 占位canvas 采用常规显示器2倍缩放 ，范围[4000-4200]
 * @author:yanxinaliang
 * @time：2018/7/4 16:12
 */
import * as React from "react";
import "../style/canvas.less";
import { EBoardEngine } from '../EBoardEngine';
import { Suspension } from "../plugins/tool/suspension/Suspension";
var BaseCanvas = /** @class */ (function (_super) {
    __extends(BaseCanvas, _super);
    function BaseCanvas(props) {
        var _this = _super.call(this, props) || this;
        _this.__calc = _this.__calc.bind(_this);
        return _this;
    }
    /**
     * calc canvas offsetSize & dimensionSize
     * @param {HTMLElement} parentElement
     * @returns {{width: number; height: number; dimensions: {width: number; height: number}}}
     * @private
     */
    BaseCanvas.prototype.__calc = function (parentElement) {
        var size = {
            width: parentElement.offsetWidth,
            height: parentElement.offsetHeight
        };
        var _a = this.props.ratio, ratio = _a === void 0 ? "4:3" : _a;
        if (!/\d+:\d+/g.test(ratio)) {
            throw new Error("Expected string with compare symbol, got '" + ratio + "'.");
        }
        else {
            var _ratios = ratio.split(":");
            var _ratioW = Number(_ratios[0]);
            var _ratioH = Number(_ratios[1]);
            var ratioNum = _ratioW / _ratioH;
            var dimensionRate = Math.ceil(4000 / _ratioW);
            if (size.width / size.height > ratioNum) {
                // 宽度大，按照高度计算
                return {
                    width: size.height * ratioNum,
                    height: size.height,
                    dimensions: {
                        width: dimensionRate * _ratioW,
                        height: dimensionRate * _ratioH
                    }
                };
            }
            else {
                // 高度大，按照宽度计算
                return {
                    width: size.width,
                    height: size.width / ratioNum,
                    dimensions: {
                        width: dimensionRate * _ratioW,
                        height: dimensionRate * _ratioH
                    }
                };
            }
        }
    };
    BaseCanvas.prototype._initEBoardEngine = function () {
        this.eBoardEngine = new EBoardEngine(this._placeholder, {
            selection: false,
            skipTargetFind: true,
            containerClass: "eboard-canvas"
        });
    };
    BaseCanvas.prototype._initLayout = function (parentElement) {
        var calcSize = this.__calc(parentElement);
        this.eBoardEngine.eBoardCanvas.setDimensions({ width: calcSize.width, height: calcSize.height }); // 设置样式大小
        this.eBoardEngine.eBoardCanvas.setDimensions(calcSize.dimensions, { backstoreOnly: true }); // 设置canvas 画布大小
    };
    BaseCanvas.prototype.getParentElement = function () {
        return this._placeholder.parentElement;
    };
    BaseCanvas.prototype.componentDidMount = function () {
        var parentElement = this.getParentElement();
        // fix parent position
        var position = window.getComputedStyle(parentElement).position;
        if ("absolute" !== position && "fixed" !== position && "relative" !== position) {
            parentElement.style.position = "relative";
        }
        this._initEBoardEngine();
        this._initLayout(parentElement);
    };
    BaseCanvas.prototype.getPlugin = function (pluginName) {
        return this.eBoardEngine.getPlugin(pluginName);
    };
    BaseCanvas.prototype.getEBoardEngine = function () {
        return this.eBoardEngine;
    };
    BaseCanvas.prototype.render = function () {
        var _this = this;
        return [
            React.createElement("canvas", { ref: function (ref) { return _this._placeholder = ref; } }, "\u5F53\u524D\u6D4F\u89C8\u5668\u4E0D\u652F\u6301Canvas,\u8BF7\u5347\u7EA7\u6D4F\u89C8\u5668"),
            React.createElement(Suspension, null)
        ];
    };
    return BaseCanvas;
}(React.PureComponent));
export { BaseCanvas };
//# sourceMappingURL=BaseCanvas.js.map