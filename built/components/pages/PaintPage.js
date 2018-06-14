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
/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-28 20:01:31
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-12 21:53:18
 */
import * as _ from 'lodash';
import * as React from "react";
// import * as Redux from "redux";
import { connect } from "react-redux";
import * as classNames from 'classnames';
import { InputNumber } from "antd";
import { SketchPicker as ColorPicker } from 'react-color';
import { fabric } from "fabric";
import { BrushType } from "../eboard/brushes/BrushType";
import BrushManager from "../eboard/brushes/BrushManager";
import CircleCursor from "../eboard/cursor/CircleCursor";
import EBoardWidget from "../eboard/EBoardWidget";
import { PointerIcon, LineIcon, PenIcon, CircleIcon, RectangleIcon, PolygonIcon, TriangleIcon, TextIcon, EraserIcon, ColorPaletteIcon, UndoIcon, RedoIcon, RestoreIcon } from "../icons/SvgIcons";
import "./PaintPage.scss";
import { FabricObservingEventType } from '../eboard/mixins/FabricEvents';
var defaultCursorOptions = {
    fill: "rgb(255, 0, 0, 1)",
    stroke: "rgb(0, 255, 0, 1)",
    strokeWidth: 3,
    radius: 5
};
var defaultBrushOptions = {
    fill: "rgb(255, 0, 0, .1)",
    stroke: "rgb(0, 255, 0, .1)",
    strokeWidth: 3,
};
var PaintPage = /** @class */ (function (_super) {
    __extends(PaintPage, _super);
    function PaintPage(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            currentBrush: BrushType.POINTER_BRUSH,
            strokeColorPickerStyle: {
                "display": 'none',
                "zIndex": 99999,
                "position": 'absolute',
                "left": 0,
                "top": 0,
            },
            fillColorPickerStyle: {
                "display": 'none',
                "zIndex": 99999,
                "position": 'absolute',
                "left": 0,
                "top": 0,
            },
            brushSettings: {
                stroke: 'rgba(255, 0, 0, 1)',
                fill: 'rgba(0, 255, 0, 1)',
            },
            zoomValue: 1,
            undoSize: 0,
            redoSize: 0
        };
        return _this;
    }
    PaintPage.prototype.componentWillMount = function () {
        this.brushManager = new BrushManager();
    };
    PaintPage.prototype.__setEBoardEngine = function (eBoardEngine) {
        var _this = this;
        this.eBoardEngine = eBoardEngine;
        this.eBoardEngine.addEventListener(FabricObservingEventType.ZOOM_AFTER, function (event) { _this.__onZoom(event); });
    };
    PaintPage.prototype.__selectBrush = function (evt, brushType) {
        var eBoardCanvas = this.eBoardEngine.getEBoardCanvas();
        if (this.brushManager.isPointerBrush(brushType)) {
            eBoardCanvas.clearFreeDrawingBrush();
        }
        else {
            var brushOptions = {};
            _.defaultsDeep(brushOptions, { canvas: eBoardCanvas }, this.state.brushSettings, defaultBrushOptions);
            switch (brushType) {
                case BrushType.TEXT_BRUSH:
                    break;
                default:
                    var circleCursor = new CircleCursor(defaultCursorOptions, eBoardCanvas);
                    brushOptions.cursor = circleCursor;
            }
            var brush = this.brushManager.selectBrush(brushType, brushOptions, true);
            eBoardCanvas.setFreeDrawingBrush(brush);
        }
        this.setState({ currentBrush: brushType });
    };
    PaintPage.prototype.__openStrokeColorPickerDialog = function (evt) {
        var options = {};
        _.defaultsDeep(options, this.state.strokeColorPickerStyle);
        options.display = options.display === 'none' ? 'block' : 'none';
        options.left = evt.clientX;
        options.top = evt.clientY + 10;
        this.setState({ strokeColorPickerStyle: options });
    };
    PaintPage.prototype.__openFillColorPickerDialog = function (evt) {
        var options = {};
        _.defaultsDeep(options, this.state.fillColorPickerStyle);
        options.display = options.display === 'none' ? 'block' : 'none';
        options.left = evt.clientX + 10;
        options.top = evt.clientY + 10;
        this.setState({ fillColorPickerStyle: options });
    };
    PaintPage.prototype.__handleStrokeColorChanged = function (color) {
        var options = {};
        _.defaultsDeep(options, this.state.brushSettings);
        options.stroke = new fabric.Color(color.rgb).toRgba();
        if (this.brushManager.getCurrentBrush()) {
            this.brushManager.getCurrentBrush().updateOptions({ stroke: options.stroke });
        }
        this.setState({ brushSettings: options });
    };
    PaintPage.prototype.__handleFillColorChanged = function (color) {
        var options = {};
        _.defaultsDeep(options, this.state.brushSettings);
        options.fill = new fabric.Color(color.rgb).toRgba();
        if (this.brushManager.getCurrentBrush()) {
            this.brushManager.getCurrentBrush().updateOptions({ fill: options.fill });
        }
        this.setState({ brushSettings: options });
    };
    PaintPage.prototype.__handleStrokeColorMouseOut = function (evt) {
        // let options: any = {};
        // _.defaultsDeep(options, this.state.strokeColorPickerStyle);
        // options.display = 'none';
        // this.setState({strokeColorPickerStyle: options});
    };
    PaintPage.prototype.__handleFillColorMouseOut = function (evt) {
        // let options: any = {};
        // _.defaultsDeep(options, this.state.fillColorPickerStyle);
        // options.display = 'none';
        // this.setState({fillColorPickerStyle: options});
    };
    PaintPage.prototype.__restoreOriginalVpt = function (evt) {
        this.eBoardEngine.getEBoardCanvas().restoreOriginalViewportTransform();
        this.setState({ zoomValue: this.eBoardEngine.getEBoardCanvas().getOriginalViewportTransform()[0] });
    };
    PaintPage.prototype.__handlerZoomChanged = function (value) {
        this.eBoardEngine.getEBoardCanvas().setZoom(value);
    };
    PaintPage.prototype.__onZoom = function (event) {
        this.setState({ zoomValue: Math.floor(event.value * 100) / 100 });
    };
    PaintPage.prototype.__undo = function (event) {
        var size = this.eBoardEngine.undo();
        this.setState(size);
    };
    PaintPage.prototype.__redo = function (event) {
        var size = this.eBoardEngine.redo();
        this.setState(size);
    };
    PaintPage.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { style: { height: "900px" } },
            React.createElement("div", { style: { backgroundColor: "white" } },
                React.createElement(PointerIcon, { color: "primary", className: classNames("icon", { selected: this.state.currentBrush === BrushType.POINTER_BRUSH }), onClick: function (evt) { _this.__selectBrush(evt, BrushType.POINTER_BRUSH); } }),
                React.createElement(PenIcon, { color: "primary", className: classNames("icon", { selected: this.state.currentBrush === BrushType.PENCEIL_BRUSH }), onClick: function (evt) { _this.__selectBrush(evt, BrushType.PENCEIL_BRUSH); } }),
                React.createElement(LineIcon, { color: "primary", className: classNames("icon", { selected: this.state.currentBrush === BrushType.LINE_BRUSH }), onClick: function (evt) { _this.__selectBrush(evt, BrushType.LINE_BRUSH); } }),
                React.createElement(TextIcon, { color: "primary", className: classNames("icon", { selected: this.state.currentBrush === BrushType.TEXT_BRUSH }), onClick: function (evt) { _this.__selectBrush(evt, BrushType.TEXT_BRUSH); } }),
                React.createElement(RectangleIcon, { color: "primary", className: classNames("icon", { selected: this.state.currentBrush === BrushType.RECTANGLE_BRUSH }), onClick: function (evt) { _this.__selectBrush(evt, BrushType.RECTANGLE_BRUSH); } }),
                React.createElement(TriangleIcon, { color: "primary", className: classNames("icon", { selected: this.state.currentBrush === BrushType.TRIANGLE_BRUSH }), onClick: function (evt) { _this.__selectBrush(evt, BrushType.TRIANGLE_BRUSH); } }),
                React.createElement(CircleIcon, { color: "primary", className: classNames("icon", { selected: this.state.currentBrush === BrushType.CIRCLE_BRUSH }), onClick: function (evt) { _this.__selectBrush(evt, BrushType.CIRCLE_BRUSH); } }),
                React.createElement(PolygonIcon, { color: "primary", className: classNames("icon", { selected: this.state.currentBrush === BrushType.POLYGON_BRUSH }), onClick: function (evt) { _this.__selectBrush(evt, BrushType.POLYGON_BRUSH); } }),
                React.createElement(EraserIcon, { color: "primary", className: classNames("icon", { selected: this.state.currentBrush === BrushType.ERASER_BRUSH }), onClick: function (evt) { _this.__selectBrush(evt, BrushType.ERASER_BRUSH); } }),
                React.createElement(ColorPaletteIcon, { className: classNames("icon"), style: { 'backgroundColor': this.state.brushSettings.stroke }, onClick: function (evt) { _this.__openStrokeColorPickerDialog(evt); } }),
                React.createElement("div", { className: "color_palette", style: this.state.strokeColorPickerStyle, onMouseOut: function (event) { _this.__handleStrokeColorMouseOut(event); } },
                    React.createElement(ColorPicker, { color: this.state.brushSettings.stroke, onChangeComplete: function (color) { _this.__handleStrokeColorChanged(color); } })),
                React.createElement(ColorPaletteIcon, { className: classNames("icon"), style: { 'backgroundColor': this.state.brushSettings.fill }, onClick: function (evt) { _this.__openFillColorPickerDialog(evt); } }),
                React.createElement("div", { className: "color_palette", style: this.state.fillColorPickerStyle, onMouseOut: function (event) { _this.__handleFillColorMouseOut(event); } },
                    React.createElement(ColorPicker, { color: this.state.brushSettings.fill, onChangeComplete: function (color) { _this.__handleFillColorChanged(color); } })),
                React.createElement("div", null, "Zoom:"),
                React.createElement(InputNumber, { defaultValue: 1, min: 0.01, max: 20, value: this.state.zoomValue, step: 0.01, formatter: function (value) { return value * 100 + "%"; }, parser: function (value) { return parseInt(value.replace('%', ''), 10) / 100; }, onChange: function (value) { _this.__handlerZoomChanged(value); } }),
                React.createElement(UndoIcon, { color: this.state.undoSize > 0 ? "secondary" : "disabled", className: classNames("icon"), onClick: function (evt) { _this.__undo(evt); } }),
                React.createElement(RedoIcon, { color: this.state.redoSize > 0 ? "secondary" : "disabled", className: classNames("icon"), onClick: function (evt) { _this.__redo(evt); } }),
                React.createElement(RestoreIcon, { color: "primary", className: classNames("icon"), onClick: function (evt) { _this.__restoreOriginalVpt(evt); } })),
            React.createElement("div", { style: { height: "100%" } },
                React.createElement(EBoardWidget, { onInitEBoardEngine: function (eBoardEngine) { _this.__setEBoardEngine(eBoardEngine); } }))));
    };
    return PaintPage;
}(React.Component));
export default connect()(PaintPage);
//# sourceMappingURL=PaintPage.js.map