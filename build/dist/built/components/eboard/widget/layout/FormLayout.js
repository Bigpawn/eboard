var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b)
            if (b.hasOwnProperty(p))
                d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { FlowLayout } from './FlowLayout';
/**
 * alignment specifies the alignment of the control side that is attached to a control.
 */
export var FormAlignment;
(function (FormAlignment) {
    /**
     * Attach the side to the top side of the specified control.
     */
    FormAlignment[FormAlignment["TOP"] = 0] = "TOP";
    /**
     * Attach the side to the bottom side of the specified control.
     */
    FormAlignment[FormAlignment["BOTTOM"] = 1] = "BOTTOM";
    /**
     * Attach the side to the left side of the specified control.
     */
    FormAlignment[FormAlignment["LEFT"] = 2] = "LEFT";
    /**
     * Attach the side to the right side of the specified control.
     */
    FormAlignment[FormAlignment["RIGHT"] = 3] = "RIGHT";
    /**
     * Attach the side at a position which will center the control on the specified control.
     */
    FormAlignment[FormAlignment["CENTER"] = 4] = "CENTER";
    /**
     * Attach the side to the adjacent side of the specified control.
     */
    FormAlignment[FormAlignment["DEFAULT"] = 5] = "DEFAULT";
})(FormAlignment || (FormAlignment = {}));
/**
 *
 */
var FormData = /** @class */ (function () {
    function FormData() {
    }
    return FormData;
}());
export { FormData };
var FormAttachment = /** @class */ (function () {
    function FormAttachment() {
        // Do nothing.    
    }
    /**
     * Constructs a new instance of this class given a expression, an offset and an alignment.
     *
     * @param component
     * @param offset
     * @param alignment
     */
    FormAttachment.newWithControl = function (component, offset, alignment) {
        var form = new FormAttachment();
        form.component = component;
        form.offset = offset;
        form.alignment = alignment;
        return form;
    };
    /**
     * Constructs a new instance of this class given a numerator and denominator and an offset.
     *
     * @param numerator
     * @param offset
     * @param demoninator
     */
    FormAttachment.newWithNumerator = function (numerator, offset, demoninator) {
        var form = new FormAttachment();
        form.numerator = numerator;
        form.offset = offset;
        form.denominator = demoninator;
        return form;
    };
    return FormAttachment;
}());
export { FormAttachment };
/**
 *
 */
var FormLayout = /** @class */ (function (_super) {
    __extends(FormLayout, _super);
    function FormLayout(container, options) {
        return _super.call(this, container, options) || this;
    }
    /**
     * @override
     * @param container
     * @param options
     */
    FormLayout.prototype._init = function (container, options) {
        this.options = options || {};
        if (!this.options.elements) {
            this.options.elements = [];
        }
    };
    return FormLayout;
}(FlowLayout));
export { FormLayout };
//# sourceMappingURL=FormLayout.js.map
//# sourceMappingURL=FormLayout.js.map