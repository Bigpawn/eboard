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
import * as React from "react";
import "../style/pagination.less";
import "../font/iconfont.css";
var Pagination = /** @class */ (function (_super) {
    __extends(Pagination, _super);
    function Pagination(props) {
        var _this = _super.call(this, props) || this;
        _this.pageNum = 1; // 变量缓存启用的页面，进行差量比较，如果props发生改变则判断state是否有值，如果有值则使用state中的值
        _this.onPageChange = _this.onPageChange.bind(_this);
        _this.onChange = _this.onChange.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        _this.onKeyUp = _this.onKeyUp.bind(_this);
        _this.prev = _this.prev.bind(_this);
        _this.next = _this.next.bind(_this);
        _this.pageNum = props.pageNum || 1;
        _this.state = {
            input: NaN,
        };
        return _this;
    }
    Pagination.prototype.onPageChange = function () {
        var current = Number(this.pageNum);
        this.props.onPagerChange(current);
        this.setState({
            input: NaN
        });
    };
    Pagination.prototype.onBlur = function () {
        if (!isNaN(this.state.input) && this.pageNum !== this.state.input) {
            if (-1 === this.state.input) {
                // 不变
                this.setState({
                    input: NaN
                });
            }
            else {
                this.pageNum = this.state.input;
                this.onPageChange();
            }
        }
    };
    Pagination.prototype.onChange = function (e) {
        // 不能大于最大值，可以为空，不能为0
        var value = Number(e.target.value); // maybe NaN
        if (value < 0 || value > this.props.totalPages || value === 0 && e.target.value !== "") {
            return; // 输入框禁用输入
        }
        this.setState({
            input: value ? value : -1 // -1表示空，内容删除，临街状态
        });
    };
    Pagination.prototype.prev = function () {
        if (this.pageNum > 1) {
            this.pageNum -= 1;
            this.onPageChange();
            this.setState({}); // 更新UI显示
        }
    };
    Pagination.prototype.next = function () {
        if (this.pageNum < this.props.totalPages) {
            this.pageNum += 1;
            this.onPageChange();
            this.setState({}); // 更新UI显示
        }
    };
    Pagination.prototype.onKeyUp = function (event) {
        if (event.keyCode === 13) {
            this.onBlur();
            event.target.blur(); // 自动失去焦点
        }
    };
    Pagination.prototype.componentWillReceiveProps = function (nextProps) {
        // 如果属性发生变化
        if (this.props.pageNum !== nextProps.pageNum && nextProps.pageNum !== this.pageNum) {
            this.pageNum = nextProps.pageNum; // 同步更新
            this.onPageChange();
        }
    };
    Pagination.prototype.render = function () {
        var currentIndex = isNaN(this.state.input) ? this.pageNum : this.state.input;
        var totalCount = this.props.totalPages || 0;
        // 计算当前翻页是否可用
        var canPrev = this.pageNum > 1; // 只能判断当前的
        var canNext = this.pageNum < totalCount;
        if (totalCount === 0) {
            return null;
        }
        else {
            return ([
                React.createElement("div", { key: "left", className: "eboard-pagination-left " + (canPrev ? "" : "disabled"), onClick: this.prev },
                    React.createElement("i", { className: "eboard-icon eboard-icon-prev" })),
                React.createElement("div", { key: "right", className: "eboard-pagination-right " + (canNext ? "" : "disabled"), onClick: this.next },
                    React.createElement("i", { className: "eboard-icon eboard-icon-next" })),
                React.createElement("div", { key: "bottom", className: "eboard-pagination-bottom" },
                    React.createElement("input", { onKeyUp: this.onKeyUp, type: "number", className: "eboard-pagination-current", onBlur: this.onBlur, onChange: this.onChange, value: currentIndex === -1 ? "" : currentIndex }),
                    "/",
                    React.createElement("span", { className: "eboard-pagination-total" }, totalCount)),
            ]);
        }
    };
    return Pagination;
}(React.PureComponent));
export { Pagination };
//# sourceMappingURL=Pagination.js.map