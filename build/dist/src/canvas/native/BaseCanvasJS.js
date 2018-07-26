/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/12 10:27
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/12 10:27
 * @disc:BaseCanvas JS 模式
 */
import { EBoardEngine } from '../../EBoardEngine';
var BaseCanvasJS = /** @class */ (function () {
    function BaseCanvasJS(parentElement, ratio) {
        this.parentElement = parentElement;
        this.ratio = ratio || "4:3";
        this.render();
        this.componentDidMount();
    }
    BaseCanvasJS.prototype.__calc = function (parentElement) {
        var size = {
            width: parentElement.offsetWidth,
            height: parentElement.offsetHeight
        };
        var ratio = this.ratio;
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
    BaseCanvasJS.prototype._initEBoardEngine = function () {
        this.eBoardEngine = new EBoardEngine(this._placeholder, {
            selection: false,
            skipTargetFind: true,
            containerClass: "eboard-canvas"
        });
    };
    BaseCanvasJS.prototype._initLayout = function (parentElement) {
        var calcSize = this.__calc(parentElement);
        this.eBoardEngine.eBoardCanvas.setDimensions({ width: calcSize.width, height: calcSize.height }); // 设置样式大小
        this.eBoardEngine.eBoardCanvas.setDimensions(calcSize.dimensions, { backstoreOnly: true }); // 设置canvas 画布大小
    };
    BaseCanvasJS.prototype.componentDidMount = function () {
        var parentElement = this.parentElement;
        // fix parent position
        var position = window.getComputedStyle(parentElement).position;
        if ("absolute" !== position && "fixed" !== position && "relative" !== position) {
            parentElement.style.position = "relative";
        }
        this._initEBoardEngine();
        this._initLayout(parentElement);
    };
    BaseCanvasJS.prototype.render = function () {
        var placeholder = document.createElement("canvas");
        placeholder.innerHTML = "当前浏览器不支持Canvas,请升级浏览器";
        this._placeholder = placeholder;
        this.parentElement.appendChild(placeholder);
    };
    return BaseCanvasJS;
}());
export { BaseCanvasJS };
//# sourceMappingURL=BaseCanvasJS.js.map