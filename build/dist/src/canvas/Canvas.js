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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @disc:fabric 占位canvas 采用常规显示器2倍缩放 ，范围[4000-4200]
 * @author:yanxinaliang
 * @time：2018/7/4 16:12
 */
import * as React from "react";
import "../style/canvas.less";
import { mixinPlugin } from '../utils/decorators';
var Canvas = /** @class */ (function (_super) {
    __extends(Canvas, _super);
    function Canvas(props) {
        var _this = _super.call(this, props) || this;
        _this.pluginInstanceMap = {};
        _this.__calc = _this.__calc.bind(_this);
        return _this;
    }
    Canvas.prototype.__calc = function () {
        var size = {
            width: this._parentElement.offsetWidth,
            height: this._parentElement.offsetHeight
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
    Canvas.prototype._initEBoardEngine = function () {
        this.eBoardEngine = new fabric.Canvas(this._placeholder, {
            selection: false,
            skipTargetFind: true,
            containerClass: "eboard-canvas"
        });
    };
    Canvas.prototype._initLayout = function (calcSize) {
        this.eBoardEngine.setDimensions({ width: calcSize.width, height: calcSize.height }); // 设置样式大小
        this.eBoardEngine.setDimensions(calcSize.dimensions, { backstoreOnly: true }); // 设置canvas 画布大小
    };
    Canvas.prototype.componentDidMount = function () {
        var _this = this;
        this._parentElement = this._placeholder.parentElement;
        // fix parent position
        var position = window.getComputedStyle(this._parentElement).position;
        if ("absolute" !== position && "fixed" !== position && "relative" !== position) {
            this._parentElement.style.position = "relative";
        }
        var calcSize = this.__calc();
        this._initEBoardEngine();
        this._initLayout(calcSize);
        // plugins 实例化
        this.pluginList.forEach(function (plugin) {
            _this.pluginInstanceMap[plugin.pluginName] = new plugin.pluginReflectClass(_this.eBoardEngine); // 该参数统一传递
        });
    };
    Canvas.prototype.render = function () {
        var _this = this;
        return (React.createElement("canvas", { ref: function (ref) { return _this._placeholder = ref; } }, "\u5F53\u524D\u6D4F\u89C8\u5668\u4E0D\u652F\u6301Canvas,\u8BF7\u5347\u7EA7\u6D4F\u89C8\u5668"));
    };
    Canvas = __decorate([
        mixinPlugin("paint")
    ], Canvas);
    return Canvas;
}(React.Component));
export { Canvas };
//# sourceMappingURL=Canvas.js.map