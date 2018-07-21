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
 * @Date: 2018-06-13 22:42:44
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-14 15:05:33
 */
import { AbstractLayout } from '../UICommon';
/**
 * Define order of border element.
 */
export var BorderElementPosition;
(function (BorderElementPosition) {
    BorderElementPosition[BorderElementPosition["TOP"] = 0] = "TOP";
    BorderElementPosition[BorderElementPosition["LEFT"] = 1] = "LEFT";
    BorderElementPosition[BorderElementPosition["CENTER"] = 2] = "CENTER";
    BorderElementPosition[BorderElementPosition["RIGHT"] = 3] = "RIGHT";
    BorderElementPosition[BorderElementPosition["BOTTOM"] = 4] = "BOTTOM";
})(BorderElementPosition || (BorderElementPosition = {}));
/**
 * The element order of border layout is top, left, center, right and bottom.
 */
var BorderLayout = /** @class */ (function (_super) {
    __extends(BorderLayout, _super);
    function BorderLayout(container, options) {
        return _super.call(this, container, options) || this;
    }
    /**
     * @override
     * @param container
     * @param options
     */
    BorderLayout.prototype._init = function (container, options) {
        _super.prototype._init.call(this, container, options);
        if (!this.options.elements) {
            this.options.elements = new Array(5);
        }
    };
    BorderLayout.prototype.getTop = function () {
        return this.options.elements[BorderElementPosition.TOP];
    };
    BorderLayout.prototype.setTop = function (top) {
        this.options.elements[BorderElementPosition.TOP] = top;
    };
    BorderLayout.prototype.getBottom = function () {
        return this.options.elements[BorderElementPosition.BOTTOM];
    };
    BorderLayout.prototype.setBottom = function (bottom) {
        this.options.elements[BorderElementPosition.BOTTOM] = bottom;
    };
    BorderLayout.prototype.getLeft = function () {
        return this.options.elements[BorderElementPosition.LEFT];
    };
    BorderLayout.prototype.setLeft = function (left) {
        this.options.elements[BorderElementPosition.LEFT] = left;
    };
    BorderLayout.prototype.getRight = function () {
        return this.options.elements[BorderElementPosition.RIGHT];
    };
    BorderLayout.prototype.setRight = function (right) {
        this.options.elements[BorderElementPosition.RIGHT] = right;
    };
    BorderLayout.prototype.getCenter = function () {
        return this.options.elements[BorderElementPosition.CENTER];
    };
    BorderLayout.prototype.setCenter = function (center) {
        this.options.elements[BorderElementPosition.CENTER] = center;
    };
    /**
     * @override
     */
    BorderLayout.prototype.count = function () {
        var num = 0;
        this.options.elements.map(function (value, index) {
            if (value) {
                num++;
            }
        });
        return num;
    };
    /**
     * @override
     */
    BorderLayout.prototype.first = function () {
        var ele;
        this.options.elements.map(function (value, index) {
            if (!ele && value) {
                ele = value;
            }
        });
        return ele;
    };
    /**
     * @override
     */
    BorderLayout.prototype.last = function () {
        var ele;
        this.options.elements.slice(0).reverse().map(function (value, index) {
            if (!ele && value) {
                ele = value;
            }
        });
        return ele;
    };
    /**
     * @override
     * @param component
     */
    BorderLayout.prototype.next = function (component) {
        var skip = true, ele;
        this.options.elements.map(function (value, index) {
            if (!skip && !ele && value) {
                ele = value;
            }
            if (value === component) {
                skip = false;
            }
        });
        return ele;
    };
    /**
     * @override
     * @param component
     */
    BorderLayout.prototype.previous = function (component) {
        var skip = true, ele;
        this.options.elements.slice(0).reverse().map(function (value, index) {
            if (!skip && !ele && value) {
                ele = value;
            }
            if (value === component) {
                skip = false;
            }
        });
        return ele;
    };
    /**
     * @override
     * @param prop
     */
    BorderLayout.prototype.valueOf = function (prop) {
        return this._get(prop);
    };
    /**
     * @override
     * @param component
     */
    BorderLayout.prototype.indexOf = function (component) {
        return this.options.elements.indexOf(component);
    };
    BorderLayout.prototype._get = function (index) {
        var _index = index;
        if (_index > -1 && _index < this.options.elements.length) {
            return this.options.elements[_index];
        }
        return null;
    };
    return BorderLayout;
}(AbstractLayout));
export { BorderLayout };
//# sourceMappingURL=BorderLayout.js.map