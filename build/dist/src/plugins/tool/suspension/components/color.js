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
var Color = /** @class */ (function (_super) {
    __extends(Color, _super);
    function Color(props) {
        return _super.call(this, props) || this;
    }
    Color.prototype.render = function () {
        return (React.createElement("div", { style: {
                position: 'absolute',
                left: this.props.left + "px",
                top: this.props.top + "px",
                width: '100px'
            } }, "\u6211\u662F\u989C\u8272\u63A7\u4EF6"));
    };
    return Color;
}(React.PureComponent));
export { Color };
//# sourceMappingURL=color.js.map