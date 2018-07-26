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
// import * as PropTypes from 'prop-types';
import { ToolBar } from './HomePage';
import Card from 'antd/es/card';
import HomePage from './HomePage';
import { FrameType } from "../../src/EBoard";
import { EBoardInstance } from './EBoardInstance';
/*
const pdfjsLib:PDFJSStatic  = require('pdfjs-dist/build/pdf.js');
const PdfjsWorker = require('pdfjs-dist/build/pdf.worker.js');
(pdfjsLib as any).GlobalWorkerOptions.workerPort = new PdfjsWorker();
*/
var eBoard = EBoardInstance.getInstance();
var MaterialUIPage = /** @class */ (function (_super) {
    __extends(MaterialUIPage, _super);
    function MaterialUIPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MaterialUIPage.prototype.componentDidMount = function () {
        // this.Toolbar.setCanvas(this.canvas);
        var frame = eBoard.clearCache().createPdfFrame({
            type: FrameType.Pdf,
            ratio: "16:9",
            url: require("./4.pdf"),
            pageNum: 1,
            messageId: 0
        });
        eBoard.switchToFrame(frame);
        this.Toolbar.setCanvas(frame);
    };
    MaterialUIPage.prototype.render = function () {
        var _this = this;
        return (React.createElement(Card, { bordered: true, title: "PdfCanvas", style: { margin: "16px 16px" } },
            React.createElement(ToolBar, { ref: function (ref) { return _this.Toolbar = ref; } }),
            React.createElement("div", { id: "eboardContainer", ref: function (ref) { return _this.container = ref; }, style: { position: "relative", height: document.body.offsetHeight - 220 } })));
    };
    return MaterialUIPage;
}(HomePage));
export default MaterialUIPage;
//# sourceMappingURL=MaterialUIPage.js.map