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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
 *
 * bug: props rerender
 *
 *
 *
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { HTMLCanvas } from './HTMLCanvas';
import { ImageCanvas } from './ImageCanvas';
import { Pagination } from '../../components/Pagination';
import { PageTurn } from '../PageTurn';
import { pipMode } from '../../utils/decorators';
import { PdfCanvas } from './PdfCanvas';
var pdfjsLib = require('pdfjs-dist/build/pdf.js');
var PdfjsWorker = require('pdfjs-dist/build/pdf.worker.js');
pdfjsLib.GlobalWorkerOptions.workerPort = new PdfjsWorker();
export var PageType;
(function (PageType) {
    PageType["Image"] = "image";
    PageType["Pdf"] = "pdf";
    PageType["Html"] = "html";
})(PageType || (PageType = {}));
/**
 * 分页canvas
 */
var PagerCanvas = /** @class */ (function (_super) {
    __extends(PagerCanvas, _super);
    function PagerCanvas(props) {
        var _this = _super.call(this, props) || this;
        _this.pageDataSet = [];
        _this.eBoardCacheMap = new Map();
        _this.onPagerChange = _this.onPagerChange.bind(_this);
        _this.PageTurn = new PageTurn();
        var _a = props.filePath, filePath = _a === void 0 ? "" : _a, _b = props.pageDataSet, pageDataSet = _b === void 0 ? [] : _b, _c = props.pageNum, pageNum = _c === void 0 ? 1 : _c;
        if (/.pdf$/.test(filePath)) {
            // pdf 文件
            _this.filePath = filePath;
            // 获取页数
        }
        else {
            _this.pageDataSet = pageDataSet;
        }
        _this.state = {
            pageNum: pageNum || 1,
            totalPages: _this.filePath ? 0 : pageDataSet.length
        };
        return _this;
    }
    PagerCanvas.prototype.onPagerChange = function (index) {
        // index切换
        if (index === this.state.pageNum) {
            return 0;
        }
        else {
            var isNext = index > this.state.pageNum;
            this.setState({
                pageNum: index
            });
            return this.addPage(index, isNext);
        }
    };
    PagerCanvas.prototype.getCurrentElement = function () {
        return this.pagerContainer.querySelector(".eboard-container");
    };
    PagerCanvas.prototype.addPage = function (index, next) {
        var _this = this;
        // 如果缓存中有则从缓存中取，否则创建
        return new Promise(function (resolve) {
            var cache = _this.eBoardCacheMap.get(index);
            var currentElement = _this.getCurrentElement();
            if (void 0 !== cache) {
                var nextElement = cache.element;
                nextElement.className += "eboard-pager-hiden";
                _this.pagerContainer.insertBefore(nextElement, currentElement);
                if (next) {
                    _this.PageTurn.next(currentElement, nextElement, function () {
                        currentElement.parentElement.removeChild(currentElement);
                        resolve(true);
                    });
                }
                else {
                    _this.PageTurn.prev(currentElement, nextElement, function () {
                        currentElement.parentElement.removeChild(currentElement);
                        resolve(true);
                    });
                }
            }
            else {
                // 新页面，未缓存，需要动态创建
                var pageData = _this.pageDataSet[index - 1];
                var wraper_1 = document.createElement("div");
                wraper_1.style.position = "absolute";
                wraper_1.style.width = "100%";
                wraper_1.style.height = "100%";
                wraper_1.style.left = "-100%";
                _this.pagerContainer.insertBefore(wraper_1, currentElement);
                var _a = _this.props, pageDataSet = _a.pageDataSet, pageNum = _a.pageNum, props = __rest(_a, ["pageDataSet", "pageNum"]);
                var newCanvas_1;
                ReactDOM.render(_this.filePath ? React.createElement(PdfCanvas, __assign({ ref: function (ref) { return newCanvas_1 = ref; } }, props)) : pageData.type === PageType.Image ? React.createElement(ImageCanvas, __assign({ className: "eboard-pager-hide", ref: function (ref) { return newCanvas_1 = ref; } }, props, { src: pageData.data })) :
                    React.createElement(HTMLCanvas, __assign({ ref: function (ref) { return newCanvas_1 = ref; } }, props, { children: pageData.data })), wraper_1, function () {
                    var eBoardEngine = newCanvas_1.getEBoardEngine();
                    var child = wraper_1.firstElementChild;
                    _this.eBoardCacheMap.set(_this.state.pageNum, {
                        eBoardEngine: eBoardEngine,
                        eBoardCanvas: eBoardEngine.eBoardCanvas,
                        element: child,
                    });
                    _this.pagerContainer.replaceChild(child, wraper_1);
                    // pdf 模式需要后续处理
                    if (_this.filePath) {
                        // child
                        var canvas_1 = child.querySelector(".eboard-html").firstElementChild;
                        _this.loadPdfPage(index, function (page) {
                            var defaultViewport = page.getViewport(1);
                            var scale = child.offsetWidth / defaultViewport.width;
                            var viewport = page.getViewport(scale);
                            canvas_1.width = viewport.width;
                            canvas_1.height = viewport.height;
                            var renderContext = {
                                canvasContext: canvas_1.getContext("2d"),
                                viewport: viewport
                            };
                            page.render(renderContext);
                        });
                    }
                    if (next) {
                        _this.PageTurn.next(currentElement, child, function () {
                            currentElement.parentElement.removeChild(currentElement);
                            resolve(true);
                        });
                    }
                    else {
                        _this.PageTurn.prev(currentElement, child, function () {
                            currentElement.parentElement.removeChild(currentElement);
                            resolve(true);
                        });
                    }
                });
            }
        });
    };
    PagerCanvas.prototype.loadPdfPage = function (pageNumber, callback) {
        // return page
        this.loadPdfDocumentPromise.then(function (pdf) {
            pdf.getPage(pageNumber).then(callback);
        });
    };
    ;
    PagerCanvas.prototype.componentDidMount = function () {
        var _this = this;
        // 父容器样式修改
        if (this.pagerContainer) {
            var child = this.pagerContainer.firstElementChild;
            var offswtWidth_1 = child.offsetWidth;
            this.pagerContainer.style.width = offswtWidth_1 + "px";
            this.pagerContainer.style.height = child.offsetHeight + "px";
            var eBoardEngine = this.canvas.getEBoardEngine();
            this.eBoardCacheMap.set(this.state.pageNum, {
                eBoardEngine: eBoardEngine,
                eBoardCanvas: eBoardEngine.eBoardCanvas,
                element: child,
            });
            // 如果是文档则加在第一页
            if (this.filePath) {
                this.loadPdfDocumentPromise = pdfjsLib.getDocument(this.filePath);
                var canvas_2 = child.querySelector(".eboard-html").firstElementChild;
                this.loadPdfDocumentPromise.then(function (pdf) {
                    _this.setState({
                        totalPages: pdf.numPages
                    });
                    _this.loadPdfPage(1, function (page) {
                        var defaultViewport = page.getViewport(1);
                        var scale = offswtWidth_1 / defaultViewport.width;
                        var viewport = page.getViewport(scale);
                        canvas_2.width = viewport.width;
                        canvas_2.height = viewport.height;
                        var renderContext = {
                            canvasContext: canvas_2.getContext("2d"),
                            viewport: viewport
                        };
                        page.render(renderContext);
                    });
                });
            }
        }
    };
    PagerCanvas.prototype.go = function (index) {
        // 加入队列
        if (index === this.state.pageNum) {
            return;
        }
        else {
            this.setState({
                pageNum: index
            });
        }
    };
    /**
     * @override
     */
    PagerCanvas.prototype.getPlugin = function (pluginName) {
        var eBoardCache = this.eBoardCacheMap.get(this.state.pageNum);
        return eBoardCache.eBoardEngine.getPlugin(pluginName);
    };
    PagerCanvas.prototype.render = function () {
        var _this = this;
        var filePath = this.filePath;
        var _a = this.props, pageDataSet = _a.pageDataSet, pageNum = _a.pageNum, props = __rest(_a, ["pageDataSet", "pageNum"]);
        var _b = this.state, pageIndex = _b.pageNum, totalPages = _b.totalPages;
        var pageData = this.pageDataSet[pageIndex - 1];
        // 当前显示的需要显示，其他的则需要进行隐藏
        return (React.createElement("div", { className: "eboard-pager", ref: function (ref) { return _this.pagerContainer = ref; }, style: { width: "100%", height: "100%" } },
            filePath ? React.createElement(PdfCanvas, __assign({ ref: function (ref) { return _this.canvas = ref; } }, props)) : pageData.type === PageType.Image ? React.createElement(ImageCanvas, __assign({ ref: function (ref) { return _this.canvas = ref; } }, props, { src: pageData.data })) : React.createElement(HTMLCanvas, __assign({ ref: function (ref) { return _this.canvas = ref; } }, props, { children: pageData.data })),
            React.createElement(Pagination, { ref: function (ref) { return _this.Pagination = ref; }, onPagerChange: this.onPagerChange, pageNum: pageIndex, totalPages: totalPages })));
    };
    __decorate([
        pipMode
    ], PagerCanvas.prototype, "onPagerChange", null);
    return PagerCanvas;
}(React.Component));
export { PagerCanvas };
//# sourceMappingURL=PagerCanvas.js.map