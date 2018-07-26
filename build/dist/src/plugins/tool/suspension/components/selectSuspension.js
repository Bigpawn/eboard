/*
 * @Author: Bigpawn
 * @Date: 2018/7/16 14:43
 * @Last Modified by: Bigpawn
 * @Last Modified time: 2018/7/16 14:43
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
import * as React from 'react';
import { fontFamily, fontSize, lineWidth, lineStyle } from "../enum/operationType";
// import Select from 'react-select';
// import 'react-select/dist/react-select.css';
import Select, { Option } from 'rc-select';
import 'rc-select/assets/index.css';
var SelectSuspension = /** @class */ (function (_super) {
    __extends(SelectSuspension, _super);
    function SelectSuspension(props) {
        var _this = _super.call(this, props) || this;
        _this.handleChange = function (value) {
            var onChange = _this.props.onChange;
            if (_this.props.type === "fontFamily") {
                fontFamily.map(function (item) {
                    if (item.value === value) {
                        _this.setState({ value: item.label });
                    }
                });
            }
            else {
                _this.setState({
                    value: value
                });
            }
            if (value.indexOf(',') > 0) {
                value = value.split(',');
            }
            onChange && onChange(value);
        };
        _this.state = {
            value: ''
        };
        return _this;
    }
    SelectSuspension.prototype.componentWillMount = function () {
        var _this = this;
        if (this.props.type === "fontFamily") {
            fontFamily.map(function (item) {
                if (item.value === _this.props.defaultValue) {
                    _this.setState({
                        value: item.label
                    });
                }
            });
        }
        else {
            this.setState({
                value: this.props.defaultValue
            });
        }
    };
    SelectSuspension.prototype.render = function () {
        var _a = this.props, type = _a.type, className = _a.className;
        return (React.createElement("div", { className: className },
            React.createElement(Select, { placeholder: "jack", onChange: this.handleChange, className: "eboard-screen-select-wrapper", value: this.state.value }, type === "fontSize" ? fontSize.map(function (item) {
                return (React.createElement(Option, { key: item.value }, item.label));
            }) : type === "fontFamily" ? fontFamily.map(function (item) {
                return (React.createElement(Option, { key: item.value },
                    React.createElement("span", { style: { fontFamily: item.label } }, item.label)));
            }) : type === "lineWidth" ? lineWidth.map(function (item) {
                return (React.createElement(Option, { key: item.value },
                    React.createElement("span", { className: "eboard-screen-select-options", style: { height: item.value + "px" } })));
            }) : lineStyle.map(function (item) {
                return (React.createElement(Option, { key: item.value },
                    React.createElement("span", { className: "eboard-screen-select-style", style: { borderTop: "2px " + item.label + " #000000" } })));
            }))));
    };
    return SelectSuspension;
}(React.PureComponent));
export { SelectSuspension };
//# sourceMappingURL=selectSuspension.js.map