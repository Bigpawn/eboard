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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/5 15:52
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/5 15:52
 * @disc：翻页Canvas 需要进行runtime 管理  该组件禁止render
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { HTMLCanvas } from './HTMLCanvas';
import { ImageCanvas } from './ImageCanvas';
import { Pagination } from './Pagination';
import { PageTurn } from './PageTurn';
export var PageType;
(function (PageType) {
    PageType["Image"] = "image";
    PageType["Pdf"] = "pdf";
    PageType["Html"] = "html";
})(PageType || (PageType = {}));
var PagerCanvas = /** @class */ (function (_super) {
    __extends(PagerCanvas, _super);
    function PagerCanvas(props) {
        var _this = _super.call(this, props) || this;
        _this.currentIndex = 1; // 默认第一页
        _this.eBoardCacheMap = new Map();
        // props.pageDataSet&&(this.pageDataSet=props.pageDataSet);
        _this.onPagerChange = _this.onPagerChange.bind(_this);
        _this.changeCallback = _this.changeCallback.bind(_this);
        _this.PageTurn = new PageTurn(_this.changeCallback);
        var _a = props.pageDataSet, pageDataSet = _a === void 0 ? [] : _a, _b = props.currentIndex, currentIndex = _b === void 0 ? 1 : _b;
        _this.pageDataSet = pageDataSet;
        _this.currentIndex = currentIndex;
        return _this;
    }
    PagerCanvas.prototype.changeCallback = function (currentElement, nextElement) {
        // 从节点中移除currentElement 并且进行缓存
        currentElement.parentElement.removeChild(currentElement);
    };
    PagerCanvas.prototype.onPagerChange = function (index) {
        // index切换
        if (index === this.currentIndex) {
            return;
        }
        else {
            this.Pagination && this.Pagination.setCurrentIndex(index);
            this.addPage(index, index > this.currentIndex);
            this.currentIndex = index; // 不能保证顺序
        }
    };
    PagerCanvas.prototype.addPage = function (index, next) {
        var _this = this;
        // 如果缓存中有则从缓存中取，否则创建
        var cache = this.eBoardCacheMap.get(index);
        if (void 0 !== cache) {
            var nextElement = cache.element;
            nextElement.className += "eboard-pager-hiden";
            this.pagerContainer.insertBefore(nextElement, this.pagerContainer.firstElementChild);
            if (next) {
                this.PageTurn.next(this.pagerContainer.children[1], nextElement);
            }
            else {
                this.PageTurn.prev(this.pagerContainer.children[1], nextElement);
            }
        }
        else {
            // 新页面，未缓存，需要动态创建
            var pageData = this.pageDataSet[index - 1];
            var wraper_1 = document.createElement("div");
            wraper_1.style.position = "absolute";
            wraper_1.style.width = "100%";
            wraper_1.style.height = "100%";
            wraper_1.style.left = "-100%";
            this.pagerContainer.insertBefore(wraper_1, this.pagerContainer.firstElementChild);
            var _a = this.props, pageDataSet = _a.pageDataSet, currentIndex = _a.currentIndex, props = __rest(_a, ["pageDataSet", "currentIndex"]);
            var newCanvas_1;
            ReactDOM.render(pageData.type === PageType.Image ? React.createElement(ImageCanvas, __assign({ className: "eboard-pager-hide", ref: function (ref) { return newCanvas_1 = ref; } }, props, { src: pageData.data })) :
                React.createElement(HTMLCanvas, __assign({ ref: function (ref) { return _this.canvas = ref; } }, props, { children: pageData.data })), wraper_1, function () {
                var eBoardEngine = newCanvas_1.getEBoardEngine();
                var child = wraper_1.firstElementChild;
                _this.eBoardCacheMap.set(_this.currentIndex, {
                    eBoardEngine: eBoardEngine,
                    eBoardCanvas: eBoardEngine.eBoardCanvas,
                    element: child,
                });
                _this.pagerContainer.replaceChild(child, wraper_1);
                if (next) {
                    _this.PageTurn.next(_this.pagerContainer.children[1], child);
                }
                else {
                    _this.PageTurn.prev(_this.pagerContainer.children[1], child);
                }
            });
        }
    };
    PagerCanvas.prototype.shouldComponentUpdate = function () {
        return false;
    };
    PagerCanvas.prototype.componentDidMount = function () {
        // 父容器样式修改
        if (this.pagerContainer) {
            var child = this.pagerContainer.firstElementChild;
            this.pagerContainer.style.width = child.offsetWidth + "px";
            this.pagerContainer.style.height = child.offsetHeight + "px";
            var eBoardEngine = this.canvas.getEBoardEngine();
            this.eBoardCacheMap.set(this.currentIndex, {
                eBoardEngine: eBoardEngine,
                eBoardCanvas: eBoardEngine.eBoardCanvas,
                element: child,
            });
        }
    };
    PagerCanvas.prototype.go = function (index) {
        if (index === this.currentIndex) {
            return;
        }
        else {
            this.Pagination && this.Pagination.setCurrentIndex(index);
            this.addPage(index, index > this.currentIndex);
            this.currentIndex = index;
        }
    };
    PagerCanvas.prototype.render = function () {
        var _this = this;
        var _a = this.props, pageDataSet = _a.pageDataSet, currentIndex = _a.currentIndex, props = __rest(_a, ["pageDataSet", "currentIndex"]);
        var pageData = pageDataSet[this.currentIndex - 1];
        var totalPages = this.pageDataSet.length;
        // 当前显示的需要显示，其他的则需要进行隐藏
        return (React.createElement("div", { className: "eboard-pager", ref: function (ref) { return _this.pagerContainer = ref; }, style: { width: "100%", height: "100%" } },
            pageData.type === PageType.Image ? React.createElement(ImageCanvas, __assign({ ref: function (ref) { return _this.canvas = ref; } }, props, { src: pageData.data })) : React.createElement(HTMLCanvas, __assign({ ref: function (ref) { return _this.canvas = ref; } }, props, { children: pageData.data })),
            totalPages > 1 ? React.createElement(Pagination, { ref: function (ref) { return _this.Pagination = ref; }, onPagerChange: this.onPagerChange, defaultCurrentIndex: this.currentIndex, totalPages: this.pageDataSet.length }) : null));
    };
    return PagerCanvas;
}(React.Component));
export { PagerCanvas };
//# sourceMappingURL=PagerCanvas.js.map