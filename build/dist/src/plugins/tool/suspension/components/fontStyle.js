/*
 * @Author: Bigpawn
 * @Date: 2018/7/16 14:43
 * @Last Modified by: Bigpawn
 * @Last Modified time: 2018/7/16 14:43
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
import { fontFamily, fontSize } from "../enum/operationType";
var SelectSuspension = /** @class */ (function (_super) {
    __extends(SelectSuspension, _super);
    function SelectSuspension(props) {
        return _super.call(this, props) || this;
    }
    SelectSuspension.prototype.render = function () {
        var _a = this.props, type = _a.type, onChange = _a.onChange, className = _a.className;
        return (React.createElement("div", { className: className },
            React.createElement("select", { onChange: function (e) {
                    var value = type === "fontSize" ? parseInt(e.target.value) : e.target.value;
                    onChange && onChange(value);
                } }, type === "fontSize" ? fontSize.map(function (item, index) {
                return (React.createElement("option", { value: item.value, key: index }, item.type));
            }) : fontFamily.map(function (item, index) {
                return (React.createElement("option", { value: item.value, key: index }, item.type));
            }))));
    };
    return SelectSuspension;
}(React.PureComponent));
export { SelectSuspension };
//# sourceMappingURL=fontStyle.js.map