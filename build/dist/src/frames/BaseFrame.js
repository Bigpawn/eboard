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
import { EBoardEngine } from '../EBoardEngine';
var GenericBaseFrame = /** @class */ (function () {
    function GenericBaseFrame(options, container, parent) {
        this.container = container;
        this.options = options;
        this.parent = parent;
        if (parent) {
            this.handleAll = parent["handleAll"];
            this.messageHandle = parent["messageHandle"].bind(this);
        }
        this.initialize(options);
        this.fixContainer();
        this.initEngine();
        this.initLayout();
    }
    GenericBaseFrame.prototype.initialize = function (options) {
        this.type = options.type;
        this.messageId = options.messageId;
        this.ratio = options.ratio || "4:3";
    };
    GenericBaseFrame.prototype.fixContainer = function () {
        var parentElement = this.container;
        // fix parent position
        var position = window.getComputedStyle(parentElement).position;
        if ("absolute" !== position && "fixed" !== position && "relative" !== position) {
            parentElement.style.position = "relative";
        }
    };
    GenericBaseFrame.prototype.initEngine = function () {
        var placeholder = document.createElement("canvas");
        placeholder.innerHTML = "当前浏览器不支持Canvas,请升级浏览器";
        this.engine = new EBoardEngine(placeholder, {
            selection: false,
            skipTargetFind: true,
            containerClass: "eboard-canvas"
        }, this);
        this.dom = this.engine.eBoardCanvas.getContainer();
    };
    GenericBaseFrame.prototype.calc = function () {
        var parentElement = this.container;
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
            // const dimensionRate = Math.ceil(4000/_ratioW);
            if (size.width / size.height > ratioNum) {
                // 宽度大，按照高度计算
                return {
                    width: size.height * ratioNum,
                    height: size.height,
                    dimensions: {
                        // width:dimensionRate * _ratioW,
                        // height:dimensionRate * _ratioH
                        width: size.height * ratioNum,
                        height: size.height,
                    }
                };
            }
            else {
                // 高度大，按照宽度计算
                return {
                    width: size.width,
                    height: size.width / ratioNum,
                    dimensions: {
                        // width:dimensionRate * _ratioW,
                        // height:dimensionRate * _ratioH
                        width: size.width,
                        height: size.width / ratioNum,
                    }
                };
            }
        }
    };
    GenericBaseFrame.prototype.initLayout = function () {
        var calcSize = this.calc();
        this.engine.eBoardCanvas.setDimensions({ width: calcSize.width, height: calcSize.height }); // 设置样式大小
        this.engine.eBoardCanvas.setDimensions(calcSize.dimensions, { backstoreOnly: true }); // 设置canvas 画布大小
    };
    ;
    GenericBaseFrame.prototype.getPlugin = function (pluginName) {
        return this.engine.getPlugin(pluginName);
    };
    GenericBaseFrame.prototype.destroy = function () {
        if (this.dom && this.dom.parentElement) {
            this.dom.parentElement.removeChild(this.dom);
        }
        this.engine.eBoardCanvas.clear();
    };
    GenericBaseFrame.prototype.getParent = function () {
        return this.parent;
    };
    GenericBaseFrame.prototype.isHandleAll = function () {
        return this.handleAll;
    };
    GenericBaseFrame.prototype.getMessageHandle = function () {
        return this.messageHandle;
    };
    return GenericBaseFrame;
}());
export { GenericBaseFrame };
var BaseFrame = /** @class */ (function (_super) {
    __extends(BaseFrame, _super);
    function BaseFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BaseFrame;
}(GenericBaseFrame));
export { BaseFrame };
//# sourceMappingURL=BaseFrame.js.map