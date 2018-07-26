/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/5 15:52
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/5 15:52
 * @disc：分页管理组件
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
var Pagination = /** @class */ (function (_super) {
    __extends(Pagination, _super);
    function Pagination(props) {
        var _this = _super.call(this, props) || this;
        _this.currentIndex = 1;
        _this.onPageChange = _this.onPageChange.bind(_this);
        _this.onChange = _this.onChange.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        _this.setCurrentIndex = _this.setCurrentIndex.bind(_this);
        _this.prev = _this.prev.bind(_this);
        _this.next = _this.next.bind(_this);
        _this.currentIndex = props.defaultCurrentIndex || 1;
        _this.state = {
            currentIndex: props.defaultCurrentIndex || 1
        };
        return _this;
    }
    Pagination.prototype.onPageChange = function () {
        var current = Number(this.currentIndex);
        var next = Number(this.state.currentIndex);
        if (current !== next) {
            this.props.onPagerChange(next);
            this.currentIndex = next;
        }
    };
    Pagination.prototype.onBlur = function () {
        var _this = this;
        if (this.state.currentIndex) {
            this.onPageChange();
        }
        else {
            // 0
            this.setState({
                currentIndex: 0
            }, function () {
                _this.onPageChange();
            });
        }
    };
    Pagination.prototype.onChange = function (e) {
        // 不能小于0
        var value = parseInt(e.target.value, 10);
        if (value < 0 || value > this.props.totalPages) {
            return;
        }
        this.setState({
            currentIndex: Number(e.target.value)
        });
    };
    Pagination.prototype.setCurrentIndex = function (index) {
        this.setState({
            currentIndex: index
        });
    };
    Pagination.prototype.prev = function () {
        var _this = this;
        if (this.state.currentIndex > 1) {
            this.setState({
                currentIndex: this.state.currentIndex - 1
            }, function () {
                _this.onPageChange();
            });
        }
    };
    Pagination.prototype.next = function () {
        var _this = this;
        if (this.state.currentIndex < this.props.totalPages) {
            this.setState({
                currentIndex: this.state.currentIndex + 1
            }, function () {
                _this.onPageChange();
            });
        }
    };
    Pagination.prototype.render = function () {
        return ([
            React.createElement("div", { key: "left", className: "eboard-pagination-left", onClick: this.prev }, "prev"),
            React.createElement("div", { key: "right", className: "eboard-pagination-right", onClick: this.next }, "next"),
            React.createElement("div", { key: "bottom", className: "eboard-pagination-bottom" },
                React.createElement("input", { type: "number", className: "eboard-pagination-current", onBlur: this.onBlur, onChange: this.onChange, value: this.state.currentIndex }),
                "/",
                React.createElement("span", { className: "eboard-pagination-total" }, this.props.totalPages || 0)),
        ]);
    };
    return Pagination;
}(React.PureComponent));
export { Pagination };
//# sourceMappingURL=Pagination.js.map