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
/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-21 18:01:23
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-27 15:46:26
 */
import * as _ from 'lodash';
import { fabric } from 'fabric';
export var Alignment;
(function (Alignment) {
    Alignment["LEFT"] = "left";
    Alignment["RIGHT"] = "right";
    Alignment["TOP"] = "top";
    Alignment["BOTTOM"] = "bottom";
    Alignment["CENTER"] = "center";
})(Alignment || (Alignment = {}));
/**
 * Define expression align
 */
export var Orientation;
(function (Orientation) {
    Orientation["HORIZONTAL"] = "horizontal";
    Orientation["VERTICAL"] = "vertical";
})(Orientation || (Orientation = {}));
/**
 * Layout type definition.
 */
export var LayoutType;
(function (LayoutType) {
    LayoutType["FLOW_LAYOUT"] = "flow_layout";
    LayoutType["BORDER_LAYOUT"] = "border_layout";
    LayoutType["FORM_LAYOUT"] = "form_layout";
    LayoutType["GRID_LAYOUT"] = "grid_layout";
})(LayoutType || (LayoutType = {}));
/**
 * Composite class defines common functions of UI container.
 */
var Composite = /** @class */ (function (_super) {
    __extends(Composite, _super);
    function Composite(parent, items, options) {
        var _this = _super.call(this, items, options) || this;
        _this.valid = false;
        _this.parent = parent;
        _this.options = options || {};
        return _this;
    }
    /**
     * Return children layout of this expression.
     */
    Composite.prototype.getLayout = function () {
        return this.layout;
    };
    /**
     * Return this as type of Composite.
     */
    Composite.prototype.selfFabricObject = function () {
        var thiz = this;
        return thiz;
    };
    /**
     * Set layout data.
     *
     * @param layou
     */
    Composite.prototype.setLayout = function (layout) {
        this.layout = layout;
    };
    /**
     * Return layout setting of this expression.
     */
    Composite.prototype.getLayoutData = function () {
        return this.layoutData;
    };
    /**
     * Set layout data.
     *
     * @override
     * @param layouData
     */
    Composite.prototype.setLayoutData = function (layouData) {
        this.layoutData = layouData;
    };
    Composite.prototype.doLayout = function () {
        this.layout.layout();
        this.addWithUpdate(undefined);
        this.valid = true;
    };
    Composite.prototype.calcBounds = function (absolute, recalculate) {
        return this.getBoundingRect(absolute, recalculate);
    };
    Composite.prototype.isValid = function () {
        return this.valid;
    };
    /**
     * @override
     */
    Composite.prototype.invalidate = function () {
        this.valid = false;
        if (this.parent) {
            this.parent.invalidate();
        }
    };
    /**
     * @override
     */
    Composite.prototype.validate = function () {
        if (!this.isValid()) {
            this.doLayout();
        }
    };
    /**
     * @override
     */
    Composite.prototype.revalidate = function () {
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
    return Composite;
}(fabric.Group));
export { Composite };
/**
 * Abstract layout.
 */
var AbstractLayout = /** @class */ (function () {
    function AbstractLayout(container, options) {
        this.container = container;
        this._init(container, options);
    }
    AbstractLayout.prototype._init = function (container, options) {
        this.options = options || {};
    };
    AbstractLayout.prototype.getOption = function (optName) {
        var optObj = this.options;
        return optObj[optName];
    };
    AbstractLayout.prototype.setOptions = function (options) {
        var opts = {};
        _.defaultsDeep(opts, options, this.options);
        this.options = opts;
    };
    /**
     * Computes and returns the size of the specified composite's client area according to this layout.
     *
     * @param wHint
     * @param hHInt
     * @param flushCache
     */
    AbstractLayout.prototype.computeSize = function (wHint, hHInt, flushCache) {
        var composite = this.container;
        var rect = composite.getBoundingRect();
        return new fabric.Point(rect.width, rect.height);
    };
    /**
     * Instruct the layout to flush any cached values associated with the control specified in the argument control.
     */
    AbstractLayout.prototype.flushCache = function () {
        // TODO ...
    };
    /**
     * Lays out the children of the specified composite according to this layout.
     * @param flushCache
     */
    AbstractLayout.prototype.layout = function (flushCache) {
        // getBoundingRect
        // setCoords
        // calcCoords
        // _getTransformedDimensions
        // _getNonTransformedDimensions
        // makeBoundingBoxFromPoints
        // text.calcTextWidth
        // text.getLineWidth
        // text.measureLine
        // text._measureLine
        // text._getGraphemeBox
        // text._measureChar
        // text.initDimensions
        // text.getMeasuringContext
        throw new Error("Method not implemented.");
    };
    return AbstractLayout;
}());
export { AbstractLayout };
//# sourceMappingURL=UICommon.js.map
//# sourceMappingURL=UICommon.js.map