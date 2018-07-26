/*
 * @Author: Bigpawn
 * @Date: 2018/7/13 10:55
 * @Last Modified by: Bigpawn
 * @Last Modified time: 2018/7/13 10:55
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
import '../../../../style/screencomponent.less';
import { TypeProcess } from "../common/typeProcess";
import { OperationType } from "../enum/operationType";
import { ColorPicker } from "./colorPicker";
import { SelectSuspension } from "./selectSuspension";
import { fabric } from "fabric";
import { DisplayType } from "../enum/displayType";
var ScreenComponent = /** @class */ (function (_super) {
    __extends(ScreenComponent, _super);
    function ScreenComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            isBlod: false,
            isItalic: false
        };
        return _this;
    }
    /**
     * click
     * @param {OperationType} type
     * @param content
     */
    ScreenComponent.prototype.handleClick = function (type, content) {
        var _this = this;
        var typeProcess = new TypeProcess();
        var objects = this.props.fabricObject && this.props.fabricObject._objects;
        if (objects && objects.length > 0) {
            objects.map(function (item, index) {
                _this.props.eBordCanvas && typeProcess.init(_this.props.eBordCanvas, item, type, content);
            });
        }
        else {
            this.props.fabricObject && this.props.eBordCanvas && typeProcess.init(this.props.eBordCanvas, this.props.fabricObject, type, content);
        }
    };
    ScreenComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, left = _a.left, top = _a.top, typeArray = _a.typeArray, initStyleArray = _a.initStyleArray;
        return (React.createElement("div", { className: "eboard-screen-component-wapper", style: {
                left: left + "px",
                top: top + "px"
            } },
            typeArray.indexOf(DisplayType.IText) >= 0 ? [
                React.createElement(ColorPicker, { key: "textColor", type: OperationType.颜色, className: "eboard-screen-button-layout", defaultValue: initStyleArray && initStyleArray.fill ? initStyleArray.fill : '', onChange: function (value) {
                        var color = new fabric.Color(value).toRgba();
                        _this.handleClick(OperationType.颜色, color);
                    } }),
                React.createElement("div", { className: "eboard-screen-button-layout " + (this.state.isBlod ? 'eboard-icon-active' : ''), key: "textBold" },
                    React.createElement("i", { className: "eboard-icon eboard-icon-bold eboard-screen-button-color-icon", title: "\u52A0\u7C97", onClick: function () {
                            _this.handleClick(OperationType.字体加粗, !_this.state.isBlod ? 1000 : null);
                            _this.setState({
                                isBlod: !_this.state.isBlod
                            });
                        } })),
                React.createElement("div", { className: "eboard-screen-button-layout " + (this.state.isItalic ? 'eboard-icon-active' : ''), key: "textOblique" },
                    React.createElement("i", { className: "eboard-icon eboard-icon-xieti eboard-screen-button-color-icon", title: "\u503E\u659C", onClick: function () {
                            _this.handleClick(OperationType.字体倾斜, !_this.state.isItalic ? 'oblique' : 'normal');
                            _this.setState({
                                isItalic: !_this.state.isItalic
                            });
                        } })),
                React.createElement(SelectSuspension, { type: "fontSize", className: "eboard-screen-button-layout", key: "fontsize", defaultValue: initStyleArray && initStyleArray.fontSize ? initStyleArray.fontSize : 12, onChange: function (value) {
                        _this.handleClick(OperationType.字体大小, value);
                    } }),
                React.createElement(SelectSuspension, { type: "fontFamily", className: "eboard-screen-button-layout", key: "fontfamily", defaultValue: initStyleArray && initStyleArray.fontFamily ? initStyleArray.fontFamily : 'Microsoft YaHei', onChange: function (value) {
                        _this.handleClick(OperationType.字体类型, value);
                    } })
            ] : null,
            typeArray.indexOf(DisplayType.Star) >= 0
                || typeArray.indexOf(DisplayType.Polyline) >= 0
                || typeArray.indexOf(DisplayType.Pentagon) >= 0
                || typeArray.indexOf(DisplayType.Hexagon) >= 0
                || typeArray.indexOf(DisplayType.Triangle) >= 0
                || typeArray.indexOf(DisplayType.EqTriangle) >= 0
                || typeArray.indexOf(DisplayType.OrTriangle) >= 0
                || typeArray.indexOf(DisplayType.Ellipse) >= 0
                || typeArray.indexOf(DisplayType.Circle) >= 0
                || typeArray.indexOf(DisplayType.Rect) >= 0
                || typeArray.indexOf(DisplayType.Path) >= 0
                || typeArray.indexOf(DisplayType.ArrowLine) >= 0 ? [
                React.createElement(ColorPicker, { className: "eboard-screen-button-layout", type: OperationType.边框颜色, key: "bordercolor", defaultValue: initStyleArray && initStyleArray.stroke ? initStyleArray.stroke : '', onChange: function (value) {
                        var color = new fabric.Color(value).toRgba();
                        _this.handleClick(OperationType.边框颜色, color);
                    } }),
                React.createElement(ColorPicker, { className: "eboard-screen-button-layout", type: OperationType.填充色, key: "fill", defaultValue: initStyleArray && initStyleArray.fill ? initStyleArray.fill : '', onChange: function (value) {
                        var color = new fabric.Color(value).toRgba();
                        _this.handleClick(OperationType.填充色, color);
                    } }),
                React.createElement(SelectSuspension, { type: "lineWidth", className: "eboard-screen-button-layout", key: "borderType", defaultValue: initStyleArray && initStyleArray.strokeWidth ? initStyleArray.strokeWidth : 1, onChange: function (value) {
                        _this.handleClick(OperationType.线型粗细, value);
                    } }),
                React.createElement(SelectSuspension, { type: "lineStyle", className: "eboard-screen-button-layout", key: "borderstyle", defaultValue: initStyleArray && initStyleArray.strokeDashArray ? initStyleArray.strokeDashArray : [0, 0], onChange: function (value) {
                        _this.handleClick(OperationType.样式线型, value);
                    } })
            ] : null));
    };
    return ScreenComponent;
}(React.PureComponent));
export { ScreenComponent };
//# sourceMappingURL=screenComponent.js.map