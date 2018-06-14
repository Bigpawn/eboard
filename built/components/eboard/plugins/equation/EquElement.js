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
 * @Date: 2018-06-09 15:18:23
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-12 11:29:00
 */
import { fabric } from 'fabric';
/**
 * 公式排列方式
 */
var ExprArrange;
(function (ExprArrange) {
    ExprArrange["HORIZONTAL"] = "horizontal";
    ExprArrange["VERTICAL"] = "vertical";
})(ExprArrange || (ExprArrange = {}));
/**
 * 算式
 * Expression = { Expression... } || { Operand... } || { Operator... } || { Symbol... }
 */
var Expression = /** @class */ (function (_super) {
    __extends(Expression, _super);
    function Expression(options) {
        var _this = _super.call(this, options) || this;
        _this.options = options || {};
        return _this;
    }
    return Expression;
}(fabric.Group));
/**
 * 操作数
 * number, text
 */
var Operand = /** @class */ (function (_super) {
    __extends(Operand, _super);
    function Operand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Operand;
}(fabric.IText));
/**
 * 运算符
 * +, -, * , / , > , =,
 */
var Operator = /** @class */ (function (_super) {
    __extends(Operator, _super);
    function Operator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Operator;
}(fabric.IText));
/**
 * 公式内符号
 * {, }, [, ]
 */
var Symbol = /** @class */ (function (_super) {
    __extends(Symbol, _super);
    function Symbol() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Symbol;
}(fabric.Path));
//# sourceMappingURL=EquElement.js.map