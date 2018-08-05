/*
 * @Author: Bigpawn
 * @Date: 2018/7/16 11:43
 * @Last Modified by: Bigpawn
 * @Last Modified time: 2018/7/16 11:43
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
import { SketchPicker } from 'react-color';
import { OperationType } from "../enum/operationType";
var ColorPicker = /** @class */ (function (_super) {
    __extends(ColorPicker, _super);
    function ColorPicker(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            visibile: false
        };
        return _this;
    }
    ColorPicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, onChange = _a.onChange, type = _a.type, className = _a.className, presetColors = _a.presetColors;
        return (React.createElement("div", { className: className },
            React.createElement("i", { className: "eboard-icon eboard-screen-button-color-icon " + (type === OperationType.颜色 ? 'eboard-icon-font-color' : type === OperationType.边框颜色 ? 'eboard-icon-boder-color' : 'eboard-icon-fill-color'), style: { color: this.props.defaultValue }, title: type === OperationType.颜色 ? '颜色' : type === OperationType.边框颜色 ? '边框颜色' : '填充颜色', onClick: function () {
                    _this.setState({
                        visibile: !_this.state.visibile
                    });
                } }),
            this.state.visibile ? React.createElement(SketchPicker, { className: "eboard-screen-button-color", color: this.props.defaultValue, presetColors: presetColors, onChange: function (value, e) {
                    onChange && onChange(value.hex);
                    _this.setState({
                        visibile: !_this.state.visibile
                    });
                } }) : null));
    };
    return ColorPicker;
}(React.PureComponent));
export { ColorPicker };
//# sourceMappingURL=colorPicker.js.map