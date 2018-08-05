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
 * @Date: 2018/7/12 10:35
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/12 10:35
 * @disc:HTMLCanvas JS模式
 */
import { BaseCanvasJS } from './BaseCanvasJS';
import { EBoardEngine } from '../EBoardEngine';
var HTMLCanvasJS = /** @class */ (function (_super) {
    __extends(HTMLCanvasJS, _super);
    function HTMLCanvasJS(parentElement, ratio, className) {
        var _this = _super.call(this, parentElement, ratio) || this;
        _this.className = className;
        return _this;
    }
    HTMLCanvasJS.prototype._initLayout = function (parentElement) {
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
    HTMLCanvasJS.prototype._initEBoardEngine = function () {
        this.eBoardEngine = new EBoardEngine(this._placeholder, {
            selection: false,
            skipTargetFind: true,
            containerClass: "eboard-html-canvas"
        });
    };
    HTMLCanvasJS.prototype.render = function () {
    };
    HTMLCanvasJS.prototype._render = function () {
        // const container = document.createElement();
        // 滚动  需要实现一套 react-custom-scroll js 版本
    };
    return HTMLCanvasJS;
}(BaseCanvasJS));
export { HTMLCanvasJS };
//# sourceMappingURL=HTMLCanvasJS.js.map