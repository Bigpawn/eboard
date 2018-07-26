/*
 * @Author: Bigpawn
 * @Date: 2018/7/12 19:10
 * @Last Modified by: Bigpawn
 * @Last Modified time: 2018/7/12 19:10
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
var Suspension = /** @class */ (function (_super) {
    __extends(Suspension, _super);
    function Suspension() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Suspension.prototype.render = function () {
        return (React.createElement("div", { style: {
                position: 'absolute',
                left: 0,
                top: 0
            } }, "\u60AC\u6D6E\u7A97\u53E3"));
    };
    return Suspension;
}(React.PureComponent));
export { Suspension };
//# sourceMappingURL=Suspension.js.map