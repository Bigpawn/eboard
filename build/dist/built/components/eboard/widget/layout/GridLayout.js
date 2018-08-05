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
import { AbstractLayout } from '../UICommon';
export var Align;
(function (Align) {
    Align[Align["BEGINNING"] = 0] = "BEGINNING";
    Align[Align["CENTER"] = 1] = "CENTER";
    Align[Align["END"] = 2] = "END";
    Align[Align["FILL"] = 3] = "FILL";
})(Align || (Align = {}));
var GridData = /** @class */ (function () {
    function GridData() {
    }
    return GridData;
}());
export { GridData };
var GridLayout = /** @class */ (function (_super) {
    __extends(GridLayout, _super);
    function GridLayout(container, options) {
        return _super.call(this, container, options) || this;
    }
    /**
     * @override
     * @param container
     * @param options
     */
    GridLayout.prototype._init = function (container, options) {
        var _this = this;
        _super.prototype._init.call(this, container, options);
        if (!this.options.elements) {
            this.options.elements = new Array(this.options.numRows);
            this.options.elements.map(function (value, index) {
                _this.options.elements[index] = new Array(_this.options.numColumns);
            });
        }
    };
    GridLayout.prototype.setCell = function (row, col, component) {
        this.options.elements[row][col] = component;
    };
    GridLayout.prototype.getCell = function (row, col) {
        return this.options.elements[row][col];
    };
    GridLayout.prototype.count = function () {
        var _this = this;
        var count = 0;
        this.options.elements.map(function (value, index) {
            _this.options.elements[index].map(function (v, i) {
                if (_this.options.elements[index][i]) {
                    count++;
                }
            });
        });
        return count;
    };
    GridLayout.prototype.first = function () {
        for (var rowIndex = 0; rowIndex < this.options.numRows; rowIndex++) {
            for (var colIndex = 0; colIndex < this.options.numColumns; colIndex++) {
                if (this.options.elements[rowIndex][colIndex]) {
                    return this.options.elements[rowIndex][colIndex];
                }
            }
        }
        return null;
    };
    GridLayout.prototype.last = function () {
        for (var rowIndex = this.options.numRows - 1; rowIndex >= 0; rowIndex--) {
            for (var colIndex = this.options.numColumns - 1; colIndex >= 0; colIndex--) {
                if (this.options.elements[rowIndex][colIndex]) {
                    return this.options.elements[rowIndex][colIndex];
                }
            }
        }
        return null;
    };
    GridLayout.prototype.next = function (component) {
        var find = false;
        for (var rowIndex = 0; rowIndex < this.options.numRows; rowIndex++) {
            for (var colIndex = 0; colIndex < this.options.numColumns; colIndex++) {
                if (find && this.options.elements[rowIndex][colIndex]) {
                    return this.options.elements[rowIndex][colIndex];
                }
                if (component === this.options.elements[rowIndex][colIndex]) {
                    find = true;
                }
            }
        }
        return null;
    };
    GridLayout.prototype.previous = function (component) {
        var find = false;
        for (var rowIndex = this.options.numRows - 1; rowIndex >= 0; rowIndex--) {
            for (var colIndex = this.options.numColumns - 1; colIndex >= 0; colIndex--) {
                if (find && this.options.elements[rowIndex][colIndex]) {
                    return this.options.elements[rowIndex][colIndex];
                }
                if (component === this.options.elements[rowIndex][colIndex]) {
                    find = true;
                }
            }
        }
        return null;
    };
    GridLayout.prototype.valueOf = function (rowIndex, colIndex) {
        if (!colIndex) {
            return this.options.elements[rowIndex];
        }
        else {
            return [this.options.elements[rowIndex][colIndex]];
        }
    };
    GridLayout.prototype.indexOf = function (component) {
        for (var rowIndex = 0; rowIndex < this.options.numRows; rowIndex++) {
            for (var colIndex = 0; colIndex < this.options.numColumns; colIndex++) {
                if (component === this.options.elements[rowIndex][colIndex]) {
                    return { 'rowIndex': rowIndex, 'colIndex': colIndex };
                }
            }
        }
        return { 'rowIndex': -1, 'colIndex': -1 };
    };
    return GridLayout;
}(AbstractLayout));
export { GridLayout };
//# sourceMappingURL=GridLayout.js.map
//# sourceMappingURL=GridLayout.js.map