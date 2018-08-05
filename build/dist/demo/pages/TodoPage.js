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
import { FrameType } from '../../src/EBoard';
import { ScrollbarType } from '../../src/frames/HtmlFrame';
import { EBoardInstance } from './EBoardInstance';
var eBoard = EBoardInstance.getInstance();
var HTMLPage = /** @class */ (function (_super) {
    __extends(HTMLPage, _super);
    function HTMLPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HTMLPage.prototype.componentDidMount = function () {
        // this.Toolbar.setCanvas(this.canvas);
        var frame = eBoard.clearCache().createHtmlFrame({
            type: FrameType.HTML,
            ratio: "16:9",
            scrollbar: ScrollbarType.vertical,
            htmlFragment: 'html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>\n' +
                '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
                '                        <br/>',
            messageId: 0
        });
        eBoard.switchToFrame(frame);
        this.Toolbar.setCanvas(frame);
    };
    HTMLPage.prototype.render = function () {
        var _this = this;
        return (React.createElement(Card, { bordered: true, title: "HTML Canvas", style: { margin: "16px 16px" } },
            React.createElement(ToolBar, { ref: function (ref) { return _this.Toolbar = ref; } }),
            React.createElement("div", { id: "eboardContainer", ref: function (ref) { return _this.container = ref; }, style: { position: "relative", height: document.body.offsetHeight - 220 } })));
    };
    return HTMLPage;
}(HomePage));
export default HTMLPage;
//# sourceMappingURL=TodoPage.js.map