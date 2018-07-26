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
import HomePage, { ToolBar } from './HomePage';
import { Card } from "antd";
import { EBoard, FrameType } from '../../src/EBoard';
import { ScrollbarType } from '../../src/frames/HtmlFrame';
var AboutPage = /** @class */ (function (_super) {
    __extends(AboutPage, _super);
    function AboutPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AboutPage.prototype.componentDidMount = function () {
        // this.Toolbar.setCanvas(this.canvas);
        EBoard.clearCache().createFrame({
            container: document.getElementById("eboardContainer"),
            type: FrameType.Image,
            id: 3,
            messageId: 4,
            ratio: "16:9",
            src: "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2622681255,3418216244&fm=173&app=25&f=JPEG?w=639&h=381&s=7084E2BB4A501CC0543717BC0300700E",
            scrollbar: ScrollbarType.vertical,
        }).switchToFrame(3);
        var frame = EBoard.findFrameById(3);
        this.Toolbar.setCanvas(frame);
    };
    AboutPage.prototype.render = function () {
        var _this = this;
        return (React.createElement(Card, { bordered: true, title: "ImageCanvas", style: { margin: "16px 16px" } },
            React.createElement(ToolBar, { ref: function (ref) { return _this.Toolbar = ref; } }),
            React.createElement("div", { id: "eboardContainer", ref: function (ref) { return _this.container = ref; }, style: { position: "relative", height: document.body.offsetHeight - 220 } })));
    };
    return AboutPage;
}(HomePage));
export default AboutPage;
//# sourceMappingURL=AboutPage.js.map