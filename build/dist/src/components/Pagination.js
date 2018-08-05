/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/5 15:52
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/5 15:52
 * @disc：分页管理组件
 * changelist:
 *      * 支持总页数动态修改
 *      * 支持当前页数动态修改
 *      * 当当前显示页数发生改变时触发onPagerChange事件
 *      * 支持翻页disabled判断
 */
import "../style/pagination.less";
import "../font/iconfont.css";
var Pagination = /** @class */ (function () {
    function Pagination(pageNum, totalPages) {
        this.pageNum = pageNum;
        this.totalPages = totalPages;
        this.onPrev = this.onPrev.bind(this);
        this.onNext = this.onNext.bind(this);
        this.onKeyEnter = this.onKeyEnter.bind(this);
        this.initLayout();
        this.setPageNum(pageNum);
        this.setTotalPages(totalPages);
    }
    Pagination.prototype.onPrev = function () {
        if (this.onGoListener) {
            // TODO 需要调用Api生成消息Id
            this.onGoListener.call(this, this.pageNum - 1, 10);
        }
    };
    Pagination.prototype.onNext = function () {
        if (this.onGoListener) {
            // TODO 需要调用Api生成消息Id
            this.onGoListener.call(this, this.pageNum + 1, 10);
        }
    };
    Pagination.prototype.initLayout = function () {
        var wrap = document.createElement("div");
        var prev = document.createElement("div");
        prev.className = "eboard-pagination-left";
        prev.innerHTML = '<i class="eboard-icon eboard-icon-prev"/>';
        this.prev = prev;
        var next = document.createElement("div");
        next.className = "eboard-pagination-right";
        next.innerHTML = '<i class="eboard-icon eboard-icon-next"/>';
        this.next = next;
        var bottom = document.createElement("div");
        bottom.className = "eboard-pagination-bottom";
        var input = document.createElement("input");
        input.type = "number";
        input.className = "eboard-pagination-current";
        input.addEventListener("keydown", this.onKeyEnter);
        this.input = input;
        var span = document.createElement("span");
        span.className = "eboard-pagination-total";
        this.span = span;
        bottom.appendChild(input);
        bottom.appendChild(document.createTextNode("/"));
        bottom.appendChild(span);
        wrap.appendChild(prev);
        wrap.appendChild(next);
        wrap.appendChild(bottom);
        this.dom = wrap;
    };
    Pagination.prototype.todoChange = function () {
        var value = this.input.value;
        var number = Number(value);
        if ("" === value || number < 1 || number > this.totalPages) {
            this.input.value = this.pageNum;
        }
        else {
            this.pageNum = number;
            if (this.onGoListener) {
                // TODO 需要调用Api生成消息Id
                this.onGoListener.call(this, number, 10);
            }
        }
    };
    Pagination.prototype.onKeyEnter = function (event) {
        if (event.keyCode === 13) {
            // 回车
            this.todoChange();
            this.input.blur(); // 自动失去焦点
        }
    };
    /**
     * 初始化分页操作
     * @returns {Pagination}
     */
    Pagination.prototype.initPagerAction = function () {
        if (this.pageNum <= 1) {
            this.prev.classList.add("disabled");
            this.prev.removeEventListener("click", this.onPrev);
        }
        else {
            this.prev.classList.remove("disabled");
            this.prev.addEventListener("click", this.onPrev);
        }
        if (this.pageNum >= this.totalPages) {
            this.next.classList.add("disabled");
            this.next.removeEventListener("click", this.onNext);
        }
        else {
            this.next.classList.remove("disabled");
            this.next.addEventListener("click", this.onNext);
        }
        return this;
    };
    /**
     * 设置当前页
     * @param pageNum
     * @returns {Pagination}
     */
    Pagination.prototype.setPageNum = function (pageNum) {
        this.pageNum = pageNum;
        this.input.value = pageNum;
        this.initPagerAction();
        return this;
    };
    /**
     * 更新文档页数
     * @param totalPages
     * @returns {Pagination}
     */
    Pagination.prototype.setTotalPages = function (totalPages) {
        this.totalPages = totalPages;
        this.span.innerText = totalPages;
        if (totalPages > 0) {
            this.dom.style.display = "block";
        }
        else {
            this.dom.style.display = "none";
        }
        this.initPagerAction();
        return this;
    };
    /**
     * 翻页事件监听
     * @param {(pageNum: number, messageId: number) => void} onGoListener
     */
    Pagination.prototype.addGoListener = function (onGoListener) {
        this.onGoListener = onGoListener;
    };
    return Pagination;
}());
export { Pagination };
//# sourceMappingURL=Pagination.js.map