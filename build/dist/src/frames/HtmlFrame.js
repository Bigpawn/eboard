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
 * @Date: 2018/7/20 14:42
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/20 14:42
 * @disc:HTMLFrame HTMLFrame 支持配置是否显示滚动条 属于单层Frame，不会出现子Frame
 */
import { GenericBaseFrame } from './BaseFrame';
import { EBoardEngine } from '../EBoardEngine';
import PerfectScrollbar from 'perfect-scrollbar';
import "perfect-scrollbar/css/perfect-scrollbar.css";
import "../style/scrollbar.less";
export var ScrollbarType;
(function (ScrollbarType) {
    ScrollbarType[ScrollbarType["horizontal"] = 0] = "horizontal";
    ScrollbarType[ScrollbarType["vertical"] = 1] = "vertical";
    ScrollbarType[ScrollbarType["both"] = 2] = "both";
    ScrollbarType[ScrollbarType["none"] = 3] = "none";
})(ScrollbarType || (ScrollbarType = {}));
var GenericHtmlFrame = /** @class */ (function (_super) {
    __extends(GenericHtmlFrame, _super);
    function GenericHtmlFrame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.supportScrollbar = ScrollbarType.none;
        return _this;
    }
    GenericHtmlFrame.prototype.initialize = function (options) {
        _super.prototype.initialize.call(this, options);
        this.supportScrollbar = options.scrollbar || ScrollbarType.none;
        this.htmlFragment = options.htmlFragment || "";
    };
    GenericHtmlFrame.prototype.getChildren = function () {
        return this.htmlFragment;
    };
    GenericHtmlFrame.prototype.initEngine = function () {
        var container = document.createElement("div");
        container.className = "eboard-container";
        var htmlContainer = document.createElement("div");
        htmlContainer.className = "eboard-html-container";
        var htmlWrap = document.createElement("div");
        htmlWrap.className = "eboard-html";
        this.htmlWrap = htmlWrap;
        htmlContainer.appendChild(htmlWrap);
        // 支持dom节点
        var html = this.getChildren();
        if (typeof html === "string") {
            htmlWrap.innerHTML = html;
        }
        else {
            htmlWrap.innerHTML = "";
            htmlWrap.appendChild(html);
        }
        var placeholder = document.createElement("canvas");
        placeholder.innerHTML = "当前浏览器不支持Canvas,请升级浏览器";
        container.appendChild(htmlContainer);
        container.appendChild(placeholder);
        this.engine = new EBoardEngine(placeholder, {
            selection: false,
            skipTargetFind: true,
            containerClass: "eboard-canvas"
        }, this);
        // scrollbar 设置
        switch (this.supportScrollbar) {
            case ScrollbarType.horizontal:
                this.scrollbar = new PerfectScrollbar(container, {
                    wheelSpeed: 2,
                    suppressScrollY: true
                });
                break;
            case ScrollbarType.vertical:
                this.scrollbar = new PerfectScrollbar(container, {
                    wheelSpeed: 2,
                    suppressScrollX: true
                });
                break;
            case ScrollbarType.both:
                this.scrollbar = new PerfectScrollbar(container, {
                    wheelSpeed: 2,
                });
                break;
            case ScrollbarType.none:
            default:
                break;
        }
        this.dom = container;
    };
    GenericHtmlFrame.prototype.initLayout = function () {
        var calcSize = this.calc();
        // set container size
        this.dom.style.width = calcSize.width + "px";
        this.dom.style.height = calcSize.height + "px";
        // 需要等待图片加载
        // 还没有append则不能计算出高度  ========== fix
        this.dom.style.visibility = "hidden";
        this.container.appendChild(this.dom);
        console.log(this.htmlWrap.offsetHeight);
        var height = Math.max(this.htmlWrap.offsetHeight, calcSize.height); // 没显示
        this.container.removeChild(this.dom);
        this.dom.style.visibility = "visible";
        this.engine.eBoardCanvas.setDimensions({ width: calcSize.width, height: height }); // 根据实际分辨率设置大小
        this.engine.eBoardCanvas.setDimensions({ width: calcSize.width, height: height }, { backstoreOnly: true }); // 设置canvas 画布大小
    };
    GenericHtmlFrame.prototype.getScrollbar = function () {
        return this.scrollbar;
    };
    /**
     * 修改html内容
     * @param {string} htmlFragment
     */
    GenericHtmlFrame.prototype.setHtml = function (htmlFragment) {
        this.htmlWrap.innerHTML = htmlFragment;
        if (this.scrollbar) {
            this.scrollbar.update();
        }
    };
    GenericHtmlFrame.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        if (this.scrollbar) {
            this.scrollbar.destroy();
            this.scrollbar = undefined;
        }
    };
    return GenericHtmlFrame;
}(GenericBaseFrame));
var HtmlFrame = /** @class */ (function (_super) {
    __extends(HtmlFrame, _super);
    function HtmlFrame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return HtmlFrame;
}(GenericHtmlFrame));
export { HtmlFrame, GenericHtmlFrame };
//# sourceMappingURL=HtmlFrame.js.map