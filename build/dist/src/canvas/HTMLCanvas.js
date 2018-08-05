/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/5 15:52
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/5 15:52
 * @disc:包含HTML层的Canvas
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
import { BaseCanvas } from './BaseCanvas';
import * as React from "react";
import Scrollbars from 'react-custom-scrollbars';
import { EBoardEngine } from '../EBoardEngine';
/**
 * HTMLCanvas 需要用到源画布大小，根据源画布大小计算scale比例
 */
var HTMLCanvas = /** @class */ (function (_super) {
    __extends(HTMLCanvas, _super);
    function HTMLCanvas(props) {
        return _super.call(this, props) || this;
    }
    HTMLCanvas.prototype.getParentElement = function () {
        return this.container.parentElement;
    };
    HTMLCanvas.prototype._initLayout = function (parentElement) {
        var calcSize = this.__calc(parentElement);
        // set container size
        this.container.style.width = calcSize.width + "px";
        this.container.style.height = calcSize.height + "px";
        if (this.props.width && this.props.height) {
            // 作为子Canvas
            // html实际高度及缩放大小计算  计算transform scale倍数
            var scale = calcSize.width / this.props.width;
            var height = Math.max(this.props.height * scale, calcSize.height); // Html区域实际高度
            this.htmlContainer.style.height = height + "px"; // 最小高度
            this.htmlContainer.firstElementChild.style.transform = "scale(" + scale + ")";
            // 计算html 占用高度，通过该高度计算canvas高度
            this.eBoardEngine.eBoardCanvas.setDimensions({ width: calcSize.width, height: height }); // 根据实际分辨率设置大小
            // 需要计算实际的大小
            this.eBoardEngine.eBoardCanvas.setDimensions({
                width: calcSize.dimensions.width,
                height: calcSize.dimensions.width * this.props.height / this.props.width // 实际分辨率计算
            }, { backstoreOnly: true }); // 设置canvas 画布大小
        }
        else {
            // 作为源Canvas
            var height = Math.max(this.htmlContainer.offsetHeight, calcSize.height);
            this.eBoardEngine.eBoardCanvas.setDimensions({ width: calcSize.width, height: height }); // 根据实际分辨率设置大小
            // 需要计算实际的大小
            this.eBoardEngine.eBoardCanvas.setDimensions({
                width: calcSize.dimensions.width,
                height: calcSize.dimensions.width * height / calcSize.width // 实际分辨率计算
            }, { backstoreOnly: true }); // 设置canvas 画布大小
        }
    };
    HTMLCanvas.prototype._initEBoardEngine = function () {
        this.eBoardEngine = new EBoardEngine(this._placeholder, {
            selection: false,
            skipTargetFind: true,
            containerClass: "eboard-html-canvas"
        });
    };
    HTMLCanvas.prototype.render = function () {
        return this._render(this.props.children);
    };
    HTMLCanvas.prototype._render = function (children) {
        var _this = this;
        return (React.createElement("div", { className: "eboard-container " + (this.props.className || ""), ref: function (ref) { return _this.container = ref; } },
            React.createElement(Scrollbars, { universal: true },
                React.createElement("div", { className: "eboard-html-container", ref: function (ref) { return _this.htmlContainer = ref; } },
                    React.createElement("div", { className: "eboard-html" }, children)),
                React.createElement("canvas", { ref: function (ref) { return _this._placeholder = ref; } }, "\u5F53\u524D\u6D4F\u89C8\u5668\u4E0D\u652F\u6301Canvas,\u8BF7\u5347\u7EA7\u6D4F\u89C8\u5668"))));
    };
    return HTMLCanvas;
}(BaseCanvas));
export { HTMLCanvas };
//# sourceMappingURL=HTMLCanvas.js.map