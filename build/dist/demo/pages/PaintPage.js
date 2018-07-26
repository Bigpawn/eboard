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
import HomePage, { ToolBar } from './HomePage';
import { EBoard, FrameType } from '../../src/EBoard';
var PaintPage = /** @class */ (function (_super) {
    __extends(PaintPage, _super);
    function PaintPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PaintPage.prototype.componentDidMount = function () {
        // this.Toolbar.setCanvas(this.canvas);
        var dataSet = [];
        for (var i = 0; i < 114; i++) {
            dataSet.push(i + ".png");
        }
        EBoard.clearCache().createFrame({
            container: document.getElementById("eboardContainer"),
            type: FrameType.Images,
            id: 9,
            childMessageId: 7,
            messageId: 6,
            ratio: "16:9",
            pageNum: 1,
            urlPrefix: "https://res2dev.9itest.com/resource2/1000/document/20180716/56e61d90a7d7435c80a2499621055ceb_png/",
            images: dataSet
        }).switchToFrame(9);
        var frame = EBoard.findFrameById(9);
        this.Toolbar.setCanvas(frame);
    };
    PaintPage.prototype.render = function () {
        var _this = this;
        return (React.createElement(Card, { bordered: true, title: "PagerCanvas", style: { margin: "16px 16px" } },
            React.createElement(ToolBar, { ref: function (ref) { return _this.Toolbar = ref; } }),
            React.createElement("div", { id: "eboardContainer", ref: function (ref) { return _this.container = ref; }, style: { position: "relative", height: document.body.offsetHeight - 220 } })));
    };
    return PaintPage;
}(HomePage));
export default PaintPage;
//# sourceMappingURL=PaintPage.js.map