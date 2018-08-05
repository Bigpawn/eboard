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
 * @Date: 2018-06-13 22:29:18
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-07-05 16:34:45
 */
import { fabric } from 'fabric';
import * as util from '../../utils/utils';
import { Composite, Orientation, AbstractLayout, Alignment } from '../UICommon';
/**
 *
 */
var FlowData = /** @class */ (function () {
    function FlowData(ownerComponent) {
        this.ownerComponent = ownerComponent;
        this.ownerComponent = this.ownerComponent;
        this.alignment = Alignment.CENTER;
        this.ownerComponent.setLayoutData(this);
    }
    FlowData.prototype.setAlignElement = function (component) {
        this.alignElement = component;
    };
    FlowData.prototype.setAlignment = function (alignment) {
        this.alignment = alignment;
    };
    FlowData.prototype.calcAlignmentPartSize = function (orientation, recalculate) {
        var bounds = this.alignElement.calcBounds(false, recalculate);
        var partSize;
        if (orientation === Orientation.VERTICAL) {
            // Orientation is vertical case, calculate up size and down size.
            partSize = this.__calcVerticalPartSize(this.alignment, { 'up': 0, 'down': 0 }, bounds);
        }
        else {
            // Orientation is horizontal case, calculate left size and right size.
            partSize = this.__calcHorizontalPartSize(this.alignment, { 'left': 0, 'right': 0 }, bounds);
        }
        return partSize;
    };
    FlowData.prototype.__calcVerticalPartSize = function (alignment, partSize, bounds) {
        switch (this.alignment) {
            case Alignment.TOP:
                partSize.up += 0;
                partSize.down += bounds.height;
                break;
            case Alignment.BOTTOM:
                partSize.up += bounds.height;
                partSize.down += 0;
                break;
            default:
                var middle = bounds.height / 2;
                partSize.up += middle;
                partSize.down += middle;
        }
        return partSize;
    };
    FlowData.prototype.__calcHorizontalPartSize = function (alignment, partSize, bounds) {
        switch (this.alignment) {
            case Alignment.LEFT:
                partSize.left += 0;
                partSize.right += bounds.width;
                break;
            case Alignment.RIGHT:
                partSize.left += bounds.width;
                partSize.right += 0;
                break;
            default:
                var middle = bounds.height / 2;
                partSize.left += middle;
                partSize.right += middle;
        }
        return partSize;
    };
    return FlowData;
}());
export { FlowData };
/**
 * Most of expressions use FlowLayout, e.g. expression 'X = 2 + 3'
 */
var FlowLayout = /** @class */ (function (_super) {
    __extends(FlowLayout, _super);
    function FlowLayout(container, options) {
        return _super.call(this, container, options) || this;
    }
    /**
     * @override
     * @param container
     * @param options
     */
    FlowLayout.prototype._init = function (container, options) {
        _super.prototype._init.call(this, container, options);
        if (!this.options.orientation) {
            this.options.orientation = Orientation.HORIZONTAL;
        }
        if (!this.options.elements) {
            this.options.elements = [];
        }
    };
    FlowLayout.prototype.add = function (component, index) {
        if (!index || index === 0) {
            this.options.elements.push(component);
        }
        else {
            this.options.elements.splice(index, 0, component);
        }
    };
    FlowLayout.prototype.remove = function (component) {
        var index = this.options.elements.indexOf(component);
        if (index > -1) {
            this.options.elements.splice(index, 1);
        }
        return index;
    };
    FlowLayout.prototype.removeByIndex = function (index) {
        if (index > -1 && index < this.options.elements.length) {
            var expr = this.options.elements[index];
            this.options.elements.splice(index, 1);
            return expr;
        }
        return null;
    };
    /**
     * @override
     */
    FlowLayout.prototype.count = function () {
        return this.options.elements.length;
    };
    /**
     * @override
     */
    FlowLayout.prototype.first = function () {
        return this.options.elements[0] ? this.options.elements[0] : null;
    };
    /**
     * @override
     */
    FlowLayout.prototype.last = function () {
        if (this.options.elements && this.options.elements.length > 0) {
            return this.options.elements[this.options.elements.length - 1];
        }
        return null;
    };
    /**
     * @override
     * @param component
     */
    FlowLayout.prototype.next = function (component) {
        var index = this.options.elements.indexOf(component);
        return this._get(index + 1);
    };
    /**
     * @override
     * @param expression
     */
    FlowLayout.prototype.previous = function (component) {
        var index = this.options.elements.indexOf(component);
        return this._get(index - 1);
    };
    /**
     * @override
     * @param index
     */
    FlowLayout.prototype.valueOf = function (index) {
        return this._get(index);
    };
    /**
     * @override
     * @param expression
     */
    FlowLayout.prototype.indexOf = function (component) {
        return this.options.elements.indexOf(component);
    };
    FlowLayout.prototype._get = function (index) {
        if (index > -1 && index < this.options.elements.length) {
            return this.options.elements[index];
        }
        return null;
    };
    /**
     * Computes and returns the size of the specified composite's client area according to this layout.
     *
     * @param wHint
     * @param hHInt
     * @param flushCache
     */
    FlowLayout.prototype.computeSize = function (wHint, hHInt, flushCache) {
        var composite = this.container;
        var rect = composite.getBoundingRect();
        return new fabric.Point(rect.width, rect.height);
    };
    /**
     * Instruct the layout to flush any cached element associated with the control specified in the argument control.
     */
    FlowLayout.prototype.flushCache = function () {
        _super.prototype.flushCache.call(this);
        this.options.elements.map(function (ele, index) {
            // Clear cache if element is text.
            var obj = ele;
            if (obj._clearCache) {
                obj._clearCache();
            }
        });
    };
    /**
     * Lays out the children of the specified composite according to this layout.
     * @param flushCache
     */
    FlowLayout.prototype.layout = function (flushCache) {
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
        var leftEdgeMargin = util.max([this.options.marginWidth || 0, this.options.marginLeft || 0], ""), rightEdgeMargin = util.max([this.options.marginWidth || 0, this.options.marginRight || 0], ""), topEdgeMargin = util.max([this.options.marginHeight || 0, this.options.marginTop || 0], ""), bottomEdgeMargin = util.max([this.options.marginHeight || 0, this.options.marginBottom || 0], ""), width = 0, height = 0;
        var xOffset = 0;
        var yOffset = 0;
        if (this.options.orientation === Orientation.HORIZONTAL) {
            xOffset += leftEdgeMargin;
            yOffset += topEdgeMargin;
            width += leftEdgeMargin;
            var alignPartSize = { 'up': 0, 'down': 0 };
            var subPartSize = new Array(this.options.elements.length);
            // Compute boundary of each element and set left of each element.
            for (var i = 0; i < this.options.elements.length; i++) {
                if (i > 0) {
                    width += (this.options.hSpace ? this.options.hSpace : this.options.space) || 0;
                    xOffset += (this.options.hSpace ? this.options.hSpace : this.options.space) || 0;
                }
                var component = this.options.elements[i];
                var compBounds = void 0;
                // If sub component is a container then do layout first.
                if (component instanceof Composite) {
                    if (!component.isValid()) {
                        component.doLayout();
                    }
                    compBounds = component.calcBounds(false, false);
                }
                else {
                    compBounds = component.calcBounds(false, !component.isValid());
                }
                // Temporarily set left and top to calculate element's width and height.
                component.selfFabricObject().set({ 'left': compBounds.left + xOffset, 'top': compBounds.top + yOffset });
                width += compBounds.width;
                xOffset += compBounds.width;
                if (component instanceof Composite) {
                    var layoutData = component.getLayoutData();
                    subPartSize[i] = layoutData.calcAlignmentPartSize(Orientation.HORIZONTAL, false);
                    alignPartSize.up = util.max([alignPartSize.up, subPartSize[i].up], "");
                    alignPartSize.down = util.max([alignPartSize.down, subPartSize[i].down], "");
                }
                // Calculate max height.
                height = util.max([height, alignPartSize.up + alignPartSize.down], "");
            }
            xOffset += rightEdgeMargin;
            // Since the default originX/originY is center of container, so the top value of sub components is negative value.
            yOffset = -height / 2;
            width += rightEdgeMargin;
            height += topEdgeMargin + bottomEdgeMargin;
            // Set top position of each element according to total height and element original setting.
            for (var i = 0; i < this.options.elements.length; i++) {
                var component = this.options.elements[i];
                // Temporarily set left and top to calculate element's width and height.
                component.selfFabricObject().set({ 'top': yOffset + (alignPartSize.up - subPartSize[i].up) });
            }
        }
        else {
            // Orientation is Vertical
            xOffset += leftEdgeMargin;
            yOffset += topEdgeMargin;
            height += topEdgeMargin;
            var alignPartSize = { 'left': 0, 'right': 0 };
            var subPartSize = new Array(this.options.elements.length);
            // Compute boundary of each element and set left of each element.
            for (var i = 0; i < this.options.elements.length; i++) {
                if (i > 0) {
                    height += (this.options.vSpace ? this.options.vSpace : this.options.space) || 0;
                    yOffset += (this.options.vSpace ? this.options.vSpace : this.options.space) || 0;
                }
                var component = this.options.elements[i];
                var compBounds = void 0;
                // If sub component is a container then do layout first.
                if (component instanceof Composite) {
                    if (!component.isValid()) {
                        component.doLayout();
                    }
                    compBounds = component.calcBounds(false, false);
                }
                else {
                    compBounds = component.calcBounds(false, !component.isValid());
                }
                // Temporarily set left and top to calculate element's width and height.
                component.selfFabricObject().set({ 'top': compBounds.top + yOffset, 'left': compBounds.left + xOffset });
                height += compBounds.height;
                yOffset += compBounds.height;
                if (component instanceof Composite) {
                    var layoutData = component.getLayoutData();
                    subPartSize[i] = layoutData.calcAlignmentPartSize(Orientation.VERTICAL, false);
                    alignPartSize.left = util.max([alignPartSize.left, subPartSize[i].left], "");
                    alignPartSize.right = util.max([alignPartSize.right, subPartSize[i].right], "");
                }
                // Calculate max height.
                width = util.max([width, alignPartSize.left + alignPartSize.left], "");
            }
            yOffset += bottomEdgeMargin;
            // Since the default originX/originY is center of container, so the top value of sub components is negative value.
            xOffset = -width / 2;
            height += bottomEdgeMargin;
            width += leftEdgeMargin + rightEdgeMargin;
            // Set top position of each element according to total height and element original setting.
            for (var i = 0; i < this.options.elements.length; i++) {
                var component = this.options.elements[i];
                // Temporarily set left and top to calculate element's width and height.
                component.selfFabricObject().set({ 'left': xOffset + (alignPartSize.left - subPartSize[i].left) });
            }
        }
        // Set container's width and height.
        this.container.set({ 'width': width, 'height': height });
    };
    return FlowLayout;
}(AbstractLayout));
export { FlowLayout };
//# sourceMappingURL=FlowLayout.js.map