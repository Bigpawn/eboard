var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ScrollbarType } from "./HtmlFrame";
import { Pagination } from "../components/Pagination";
import { pipMode, setAnimationName } from '../utils/decorators';
import { ImageFrame } from './ImageFrame';
var ImagesFrame = /** @class */ (function () {
    function ImagesFrame(options) {
        this.child = new Map();
        this.options = options;
        this.container = options.container;
        this.id = options.id;
        this.messageId = options.messageId;
        this.ratio = options.ratio || "4:3";
        this.onGo = this.onGo.bind(this);
        this.fixContainer();
        this.initLayout();
        this.initialize();
    }
    ImagesFrame.prototype.fixContainer = function () {
        var parentElement = this.container;
        // fix parent position
        var position = window.getComputedStyle(parentElement).position;
        if ("absolute" !== position && "fixed" !== position && "relative" !== position) {
            parentElement.style.position = "relative";
        }
    };
    ImagesFrame.prototype.initLayout = function () {
        var pagerContainer = document.createElement("div");
        pagerContainer.className = "eboard-pager";
        pagerContainer.style.width = "100%";
        pagerContainer.style.height = "100%";
        this.dom = pagerContainer;
    };
    ;
    ImagesFrame.prototype.initialize = function () {
        var options = this.options;
        this.urlPrefix = options.urlPrefix || "";
        this.images = options.images || [];
        this.setPageNum(options.pageNum || 1); // 默认第一页
        this.setTotalPages(this.images.length); // 表示当前未获取到页数
        if (this.child.size > 0) {
            // 清空子项
            this.child.forEach(function (frame) {
                frame.destroy();
            });
            this.child.clear();
        }
        if (this.images.length > 0) {
            var pageFrame = new ImageFrame({
                container: options.container,
                id: this.pageNum,
                messageId: options.childMessageId,
                ratio: options.ratio,
                src: this.urlPrefix + this.images[this.pageNum],
                scrollbar: ScrollbarType.vertical,
            });
            this.pageFrame = pageFrame;
            this.dom.innerHTML = "";
            this.dom.appendChild(this.pageFrame.dom);
            var pagination = new Pagination(this.pageNum, this.totalPages); // 分页管理器
            pagination.addGoListener(this.onGo);
            this.pagination = pagination;
            this.dom.appendChild(pagination.dom);
            this.child.set(this.pageNum, pageFrame);
        }
    };
    ImagesFrame.prototype.onGo = function (pageNum, messageId) {
        // TODO ID需要提前生成
        this.switchToFrame(pageNum, messageId); // 消息id，需要先生成消息id然后才能调用api
    };
    /**
     * 更新文档页数
     * @param totalPages
     * @returns {PdfFrame}
     */
    ImagesFrame.prototype.setTotalPages = function (totalPages) {
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
    ImagesFrame.prototype.setPageNum = function (pageNum) {
        this.pageNum = pageNum;
        if (this.pagination) {
            this.pagination.setPageNum(pageNum);
        }
    };
    /**
     * 修改images地址
     * @param {string} urlPrefix
     * @param {string[]} images
     * @returns {this}
     */
    ImagesFrame.prototype.setImages = function (urlPrefix, images) {
        if (this.urlPrefix === urlPrefix && JSON.stringify(this.images) === JSON.stringify(images)) {
            return;
        }
        this.options.urlPrefix = urlPrefix;
        this.options.images = images;
        this.initialize();
        return this;
    };
    /**
     * 切换到指定页 需要加队列控制
     * @param {number} pageNum
     * @param {number} messageId
     * @returns {any}
     */
    ImagesFrame.prototype.switchToFrame = function (pageNum, messageId) {
        var _this = this;
        if (this.pageNum === pageNum || void 0 === pageNum || void 0 === messageId) {
            return this;
        }
        var nextPageFrame = this.child.get(pageNum);
        if (void 0 === nextPageFrame) {
            // 创建
            nextPageFrame = new ImageFrame({
                container: this.options.container,
                id: pageNum,
                messageId: messageId,
                src: this.urlPrefix + this.images[pageNum],
                ratio: this.options.ratio,
                scrollbar: ScrollbarType.vertical,
            });
            this.child.set(pageNum, nextPageFrame);
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
    ImagesFrame.prototype.getPlugin = function (pluginName) {
        return this.pageFrame ? this.pageFrame.getPlugin(pluginName) : undefined;
    };
    ImagesFrame.prototype.destroy = function () {
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
    ], ImagesFrame.prototype, "switchToFrame", null);
    ImagesFrame = __decorate([
        setAnimationName('eboard-pager')
    ], ImagesFrame);
    return ImagesFrame;
}());
export { ImagesFrame };
//# sourceMappingURL=ImagesFrame.js.map