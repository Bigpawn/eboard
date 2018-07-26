var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { EBoardEngine } from '../EBoardEngine';
import { MessageHandlerInterceptorAdapter } from '../interceptor/MessageHandlerInterceptorAdapter';
import { registerMessageInterceptor } from '../utils/decorators';
var BaseFrame = /** @class */ (function () {
    function BaseFrame(options, container) {
        this.container = container;
        this.options = options;
        this.initialize(options);
        this.fixContainer();
        this.initEngine();
        this.initLayout();
    }
    BaseFrame.prototype.initialize = function (options) {
        this.type = options.type;
        this.messageId = options.messageId;
        this.ratio = options.ratio || "4:3";
    };
    BaseFrame.prototype.fixContainer = function () {
        var parentElement = this.container;
        // fix parent position
        var position = window.getComputedStyle(parentElement).position;
        if ("absolute" !== position && "fixed" !== position && "relative" !== position) {
            parentElement.style.position = "relative";
        }
    };
    BaseFrame.prototype.initEngine = function () {
        var placeholder = document.createElement("canvas");
        placeholder.innerHTML = "当前浏览器不支持Canvas,请升级浏览器";
        this.engine = new EBoardEngine(placeholder, {
            selection: false,
            skipTargetFind: true,
            containerClass: "eboard-canvas"
        }, this);
        this.dom = this.engine.eBoardCanvas.getContainer();
    };
    BaseFrame.prototype.calc = function () {
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
    BaseFrame.prototype.initLayout = function () {
        var calcSize = this.calc();
        this.engine.eBoardCanvas.setDimensions({ width: calcSize.width, height: calcSize.height }); // 设置样式大小
        this.engine.eBoardCanvas.setDimensions(calcSize.dimensions, { backstoreOnly: true }); // 设置canvas 画布大小
    };
    ;
    BaseFrame.prototype.getPlugin = function (pluginName) {
        return this.engine.getPlugin(pluginName);
    };
    BaseFrame.prototype.destroy = function () {
        if (this.dom && this.dom.parentElement) {
            this.dom.parentElement.removeChild(this.dom);
        }
        this.engine.eBoardCanvas.clear();
    };
    BaseFrame = __decorate([
        registerMessageInterceptor(MessageHandlerInterceptorAdapter)
    ], BaseFrame);
    return BaseFrame;
}());
export { BaseFrame };
//# sourceMappingURL=BaseFrame.js.map