var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CanvasFrame } from './CanvasFrame';
import { ScrollbarType } from "./HtmlFrame";
import { Pagination } from "../components/Pagination";
import { pipMode, setAnimationName } from '../utils/decorators';
var pdfjsLib = require('pdfjs-dist/build/pdf.js');
var PdfjsWorker = require('pdfjs-dist/build/pdf.worker.js');
pdfjsLib.GlobalWorkerOptions.workerPort = new PdfjsWorker();
var PdfFrame = /** @class */ (function () {
    function PdfFrame(options, container) {
        this.group = true;
        this.child = new Map();
        this.options = options;
        this.container = container;
        this.type = options.type;
        this.messageId = options.messageId;
        this.ratio = options.ratio || "4:3";
        this.onGo = this.onGo.bind(this);
        this.fixContainer();
        this.initLayout();
        this.initialize();
    }
    PdfFrame.prototype.fixContainer = function () {
        var parentElement = this.container;
        // fix parent position
        var position = window.getComputedStyle(parentElement).position;
        if ("absolute" !== position && "fixed" !== position && "relative" !== position) {
            parentElement.style.position = "relative";
        }
    };
    PdfFrame.prototype.initLayout = function () {
        var pagerContainer = document.createElement("div");
        pagerContainer.className = "eboard-pager";
        pagerContainer.style.width = "100%";
        pagerContainer.style.height = "100%";
        this.dom = pagerContainer;
    };
    ;
    PdfFrame.prototype.initialize = function () {
        var _this = this;
        var options = this.options;
        this.url = options.url || '';
        this.setPageNum(options.pageNum || 1); // 默认第一页
        this.setTotalPages(0); // 表示当前未获取到页数
        this.pdf = undefined;
        if (this.child.size > 0) {
            // 清空子项
            this.child.forEach(function (frame) {
                frame.destroy();
            });
            this.child.clear();
        }
        if (void 0 !== this.url) {
            this.pdf = pdfjsLib.getDocument(this.url);
            this.pdf.then(function (pdf) {
                _this.setTotalPages(pdf.numPages);
            });
            var pageFrame_1 = new CanvasFrame({
                type: this.pageNum + "",
                messageId: options.messageId,
                ratio: options.ratio,
                scrollbar: ScrollbarType.vertical,
            }, this.container);
            this.pageFrame = pageFrame_1;
            this.dom.innerHTML = "";
            this.dom.appendChild(this.pageFrame.dom);
            var pagination = new Pagination(this.pageNum, this.totalPages); // 分页管理器
            pagination.addGoListener(this.onGo);
            this.pagination = pagination;
            this.dom.appendChild(pagination.dom);
            this.child.set(this.pageNum, pageFrame_1);
            // load activePage content
            this.pdf.then(function (pdf) {
                pdf.getPage(_this.pageNum).then(function (page) {
                    var canvas = pageFrame_1.canvas;
                    var defaultViewport = page.getViewport(1);
                    var scale = canvas.offsetWidth / defaultViewport.width;
                    var viewport = page.getViewport(scale);
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    var renderContext = {
                        canvasContext: canvas.getContext("2d"),
                        viewport: viewport
                    };
                    page.render(renderContext);
                });
            });
        }
    };
    PdfFrame.prototype.onGo = function (pageNum, messageId) {
        // TODO ID需要提前生成
        this.switchToFrame(pageNum, messageId); // 消息id，需要先生成消息id然后才能调用api
    };
    /**
     * 更新文档页数
     * @param totalPages
     * @returns {PdfFrame}
     */
    PdfFrame.prototype.setTotalPages = function (totalPages) {
        this.totalPages = totalPages;
        if (void 0 !== this.pagination) {
            this.pagination.setTotalPages(totalPages);
        }
        return this;
    };
    /**
     * 更新当前页数
     * @param {number} pageNum
     */
    PdfFrame.prototype.setPageNum = function (pageNum) {
        this.pageNum = pageNum;
        if (this.pagination) {
            this.pagination.setPageNum(pageNum);
        }
    };
    /**
     * 修改url
     * @param url
     * @returns {any}
     */
    PdfFrame.prototype.setUrl = function (url) {
        if (url === this.url) {
            return;
        }
        this.options.url = url;
        this.initialize();
        return this;
    };
    /**
     * 切换到指定页 需要加队列控制
     * @param {number} pageNum
     * @param {number} messageId
     * @returns {any}
     */
    PdfFrame.prototype.switchToFrame = function (pageNum, messageId) {
        var _this = this;
        if (this.pageNum === pageNum || void 0 === pageNum || void 0 === messageId) {
            return this;
        }
        var nextPageFrame = this.child.get(pageNum);
        if (void 0 === nextPageFrame) {
            // 创建
            nextPageFrame = new CanvasFrame({
                type: pageNum + "",
                messageId: messageId,
                ratio: this.options.ratio,
                scrollbar: ScrollbarType.vertical,
            }, this.container);
            this.child.set(pageNum, nextPageFrame);
            // 需要getPage
            this.pdf.then(function (pdf) {
                pdf.getPage(pageNum).then(function (page) {
                    var canvas = nextPageFrame.canvas;
                    var defaultViewport = page.getViewport(1);
                    var scale = canvas.offsetWidth / defaultViewport.width;
                    var viewport = page.getViewport(scale);
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    var renderContext = {
                        canvasContext: canvas.getContext("2d"),
                        viewport: viewport
                    };
                    page.render(renderContext);
                });
            });
        }
        return new Promise(function (resolve) {
            var frameDom = nextPageFrame.dom;
            var currentFrameDom = _this.pageFrame.dom;
            var enterClassName = _this.animationCssPrefix + "-enter-from-" + (pageNum > _this.pageNum ? "right" : "left");
            var leaveClassName = _this.animationCssPrefix + "-leave-to-" + (pageNum > _this.pageNum ? "left" : "right");
            frameDom.classList.add(enterClassName);
            currentFrameDom.classList.add(leaveClassName);
            _this.dom.insertBefore(frameDom, _this.pagination.dom);
            _this.setPageNum(pageNum);
            var transitionEndListener = function (e) {
                frameDom.removeEventListener('animationend', transitionEndListener);
                frameDom.classList.remove(enterClassName);
                currentFrameDom.classList.remove(leaveClassName);
                // 删除dom
                currentFrameDom.parentElement && currentFrameDom.parentElement.removeChild(currentFrameDom);
                _this.pageFrame = nextPageFrame;
                setTimeout(function () {
                    resolve(_this);
                }, 0);
            };
            frameDom.addEventListener('animationend', transitionEndListener);
        });
    };
    PdfFrame.prototype.getPlugin = function (pluginName) {
        return this.pageFrame ? this.pageFrame.getPlugin(pluginName) : undefined;
    };
    PdfFrame.prototype.destroy = function () {
        if (this.child.size > 0) {
            // 清空子项
            this.child.forEach(function (frame) {
                frame.destroy();
            });
            this.child.clear();
        }
    };
    __decorate([
        pipMode
    ], PdfFrame.prototype, "switchToFrame", null);
    PdfFrame = __decorate([
        setAnimationName('eboard-pager')
    ], PdfFrame);
    return PdfFrame;
}());
export { PdfFrame };
//# sourceMappingURL=PdfFrame.js.map