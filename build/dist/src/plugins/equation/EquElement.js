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
 * @Last Modified time: 2018-06-27 16:04:07
 */
import { fabric } from 'fabric';
import { Composite } from '../../widget/UICommon';
// import RectangleBrush from '../../brushes/shape/twodims/RectangleBrush';
/**
 *
 */
var Expression = /** @class */ (function (_super) {
    __extends(Expression, _super);
    function Expression() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Expression;
}(Composite));
export { Expression };
/**
 *
 */
var ExpressionUnit = /** @class */ (function (_super) {
    __extends(ExpressionUnit, _super);
    function ExpressionUnit(content, options) {
        var _this = _super.call(this, content || "", options) || this;
        _this.valid = false;
        return _this;
    }
    ExpressionUnit.prototype.setParent = function (parent) {
        this.parent = parent;
    };
    ExpressionUnit.prototype.getLayoutData = function () {
        return this.layoutData;
    };
    ExpressionUnit.prototype.setLayoutData = function (layoutData) {
        this.layoutData = layoutData;
    };
    /**
     *
     */
    ExpressionUnit.prototype.getContent = function () {
        return this.getText();
    };
    ExpressionUnit.prototype.selfFabricObject = function () {
        return this;
    };
    ExpressionUnit.prototype.calcBounds = function (absolute, recalculate) {
        return this.getBoundingRect(absolute, recalculate);
    };
    ExpressionUnit.prototype.isValid = function () {
        return this.valid;
    };
    /**
     * @override
     */
    ExpressionUnit.prototype.invalidate = function () {
        this.valid = false;
        if (this.parent) {
            this.parent.invalidate();
        }
    };
    /**
     * @override
     */
    ExpressionUnit.prototype.validate = function () {
        if (!this.isValid()) {
            this.calcBounds(false, true);
        }
    };
    /**
     * @override
     */
    ExpressionUnit.prototype.revalidate = function () {
        this.invalidate();
        var root = this.parent;
        if (!root) {
            this.validate();
        }
        else {
            while (!root.isValid()) {
                if (!root.parent) {
                    break;
                }
                root = root.parent;
            }
            root.validate();
        }
    };
    return ExpressionUnit;
}(fabric.IText));
export { ExpressionUnit };
var Operator = /** @class */ (function (_super) {
    __extends(Operator, _super);
    function Operator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Operator;
}(ExpressionUnit));
export { Operator };
var ExpressionOperand = /** @class */ (function (_super) {
    __extends(ExpressionOperand, _super);
    function ExpressionOperand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ExpressionOperand;
}(ExpressionUnit));
export { ExpressionOperand };
//# sourceMappingURL=EquElement.js.map