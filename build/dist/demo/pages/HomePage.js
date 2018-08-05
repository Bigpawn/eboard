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
import { Card } from "antd";
import { CursorTypeName } from '../../src/plugins/tool/cursor/CursorType';
import { Plugins } from '../../src/plugins';
import { FrameType } from '../../src/EBoard';
import { EBoardInstance } from './EBoardInstance';
var ToolBar = /** @class */ (function (_super) {
    __extends(ToolBar, _super);
    function ToolBar(props) {
        var _this = _super.call(this, props) || this;
        _this.setCursor = function () {
            var Cursor = _this.Canvas.getPlugin(Plugins.Cursor);
            Cursor.setType(CursorTypeName.PaintBruch).setSize("2rem", "2rem").setEnable(true);
        };
        _this.setPencilCursor = function () {
            var Cursor = _this.Canvas.getPlugin(Plugins.Cursor);
            Cursor.setType(CursorTypeName.Pencil).setSize("2rem", "2rem").setEnable(true);
        };
        _this.setCursorClose = function () {
            var Cursor = _this.Canvas.getPlugin(Plugins.Cursor);
            Cursor.setEnable(false);
        };
        _this.startLine = function () {
            var Line = _this.Canvas.getPlugin(Plugins.Line);
            Line.setEnable(true);
        };
        _this.startLine1 = function () {
            var Line = _this.Canvas.getPlugin(Plugins.Arrow);
            Line.setEnable(true);
        };
        _this.startText = function () {
            var Text = _this.Canvas.getPlugin(Plugins.Text);
            Text.setFontSize().setColor('blue').setEnable(true);
        };
        _this.selection = function () {
            var Selection = _this.Canvas.getPlugin(Plugins.Selection);
            Selection.setEnable(true);
        };
        _this.startPencilLine = function () {
            var PencilLine = _this.Canvas.getPlugin(Plugins.Pencil);
            PencilLine.setEnable(true);
        };
        _this.openHtml = function () {
            var HTML = _this.Canvas.getPlugin(Plugins.HTML);
            HTML.setEnable(true);
        };
        _this.circle = function () {
            var Circle = _this.Canvas.getPlugin(Plugins.Circle);
            Circle.setEnable(true);
        };
        _this.ellipse = function () {
            var Ellipse = _this.Canvas.getPlugin(Plugins.Ellipse);
            Ellipse.setEnable(true);
        };
        _this.rectangle = function () {
            var Rectangle = _this.Canvas.getPlugin(Plugins.Rectangle);
            Rectangle.setEnable(true);
        };
        _this.square = function () {
            var Square = _this.Canvas.getPlugin(Plugins.Square);
            Square.setEnable(true);
        };
        _this.triangle = function () {
            var Triangle = _this.Canvas.getPlugin(Plugins.Triangle);
            Triangle.setEnable(true);
        };
        _this.EquilateralTriangle = function () {
            var EquilateralTriangle = _this.Canvas.getPlugin(Plugins.EquilateralTriangle);
            EquilateralTriangle.setEnable(true);
        };
        _this.OrthogonalTriangle = function () {
            var OrthogonalTriangle = _this.Canvas.getPlugin(Plugins.OrthogonalTriangle);
            OrthogonalTriangle.setEnable(true);
        };
        _this.Polygon = function () {
            var Polygon = _this.Canvas.getPlugin(Plugins.Polygon);
            Polygon.setEnable(true);
        };
        _this.Star = function () {
            var Star = _this.Canvas.getPlugin(Plugins.Star);
            Star.setEnable(true);
        };
        _this.Pentagon = function () {
            var Pentagon = _this.Canvas.getPlugin(Plugins.Pentagon);
            Pentagon.setEnable(true);
        };
        _this.Hexagon = function () {
            var Hexagon = _this.Canvas.getPlugin(Plugins.Hexagon);
            Hexagon.setEnable(true);
        };
        _this.Clear = function () {
            var Clear = _this.Canvas.getPlugin(Plugins.Clear);
            Clear.clear();
        };
        _this.setCursor = _this.setCursor.bind(_this);
        _this.setCursorClose = _this.setCursorClose.bind(_this);
        return _this;
    }
    ToolBar.prototype.setCanvas = function (canvas) {
        this.Canvas = canvas;
    };
    ToolBar.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("button", { onClick: this.setCursor }, "PaintBrush"),
            React.createElement("button", { onClick: this.setPencilCursor }, "Pencil"),
            React.createElement("button", { onClick: this.setCursorClose }, "Cursor Close"),
            React.createElement("button", { onClick: this.startLine }, "Line"),
            React.createElement("button", { onClick: this.startLine1 }, "Line1"),
            React.createElement("button", { onClick: this.startText }, "Text"),
            React.createElement("button", { onClick: this.selection }, "Selection"),
            React.createElement("button", { onClick: this.startPencilLine }, "Pencil line"),
            React.createElement("button", { onClick: this.openHtml }, "HTML\u64CD\u4F5C"),
            React.createElement("button", { onClick: this.circle }, "Circle"),
            React.createElement("button", { onClick: this.ellipse }, "Ellipse"),
            React.createElement("button", { onClick: this.rectangle }, "Rectangle"),
            React.createElement("button", { onClick: this.square }, "Square"),
            React.createElement("button", { onClick: this.triangle }, "Triangle"),
            React.createElement("button", { onClick: this.EquilateralTriangle }, "EquilateralTriangle"),
            React.createElement("button", { onClick: this.OrthogonalTriangle }, "OrthogonalTriangle"),
            React.createElement("button", { onClick: this.Polygon }, "Polygon"),
            React.createElement("button", { onClick: this.Star }, "Star"),
            React.createElement("button", { onClick: this.Pentagon }, "Pentagon"),
            React.createElement("button", { onClick: this.Hexagon }, "Hexagon"),
            React.createElement("button", { onClick: this.Clear }, "Clear")));
    };
    return ToolBar;
}(React.Component));
export { ToolBar };
var eBoard = EBoardInstance.getInstance();
var HomePage = /** @class */ (function (_super) {
    __extends(HomePage, _super);
    function HomePage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HomePage.prototype.componentDidMount = function () {
        var frame = eBoard.clearCache().createBaseFrame({
            type: FrameType.Empty,
            ratio: "16:9",
            messageId: 0
        });
        eBoard.switchToFrame(frame);
        this.Toolbar.setCanvas(frame);
    };
    HomePage.prototype.render = function () {
        var _this = this;
        return (React.createElement(Card, { bordered: true, title: "Simple Canvas", style: { margin: "16px 16px" } },
            React.createElement(ToolBar, { ref: function (ref) { return _this.Toolbar = ref; } }),
            React.createElement("div", { ref: function (ref) { return _this.container = ref; }, id: "eboardContainer", style: { position: "relative", height: document.body.offsetHeight - 220 } })));
    };
    return HomePage;
}(React.Component));
export default HomePage;
//# sourceMappingURL=HomePage.js.map