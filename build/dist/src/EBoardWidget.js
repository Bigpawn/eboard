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
 * @Date: 2018-05-24 10:07:19
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-07-05 16:28:20
 */
import * as React from "react";
import "./EBoardWidget.less";
import EBoardEngine from "./EBoardEngine";
/**
 *
 */
var EBoardWidget = /** @class */ (function (_super) {
    __extends(EBoardWidget, _super);
    function EBoardWidget(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            numPages: 1,
            pageNumber: 1,
        };
        _this.__CANVAS_WRAPPER_NAME = "fabricCanvasWrapper";
        _this.__CANVAS_ELEMENT_NAME = "fabricCanvasEl";
        return _this;
    }
    EBoardWidget.prototype.onPdfLoad = function (evt) {
        // this.setState({numPages: evt.numPages});
        this.pdfNumPages = evt.numPages;
    };
    EBoardWidget.prototype.onPdfPageLoad = function (evt) {
        this.setState({
            numPages: this.pdfNumPages,
            pageNumber: evt.pageNumber,
        });
    };
    EBoardWidget.prototype.componentDidMount = function () {
        var options = {
            isZoom: true,
            isPanning: true
        };
        this.eBoardEngine = new EBoardEngine(this.getCanvasWrapper(), this.getCanvasElement(), options);
        this.props.onInitEBoardEngine(this.eBoardEngine);
    };
    EBoardWidget.prototype.getCanvasWrapper = function () {
        return this.refs.fabricCanvasWrapper;
    };
    EBoardWidget.prototype.getCanvasElement = function () {
        return this.refs.fabricCanvasEl;
    };
    EBoardWidget.prototype.render = function () {
        return (React.createElement("div", { ref: this.__CANVAS_WRAPPER_NAME, className: "drawing-area", id: "canvas-container" },
            React.createElement("canvas", { ref: this.__CANVAS_ELEMENT_NAME })));
    };
    return EBoardWidget;
}(React.Component));
export default EBoardWidget;
//# sourceMappingURL=EBoardWidget.js.map