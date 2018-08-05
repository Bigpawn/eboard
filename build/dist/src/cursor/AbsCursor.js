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
import { AbsPlugin } from '../AbsPlugin';
var AbsCursor = /** @class */ (function (_super) {
    __extends(AbsCursor, _super);
    function AbsCursor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.width = "1rem";
        _this.height = "1rem";
        return _this;
    }
    /**
     * Return size of cursor
     * @returns {{width: string; height: string}}
     */
    AbsCursor.prototype.getSize = function () {
        return {
            width: this.width,
            height: this.height
        };
    };
    ;
    /**
     * set size of cursor
     * @param {string} width
     * @param {string} height
     */
    AbsCursor.prototype.setSize = function (width, height) {
        this.width = width;
        this.height = height;
        if (this.cursorEl) {
            this.cursorEl.style.width = width;
            this.cursorEl.style.height = height;
        }
    };
    return AbsCursor;
}(AbsPlugin));
export { AbsCursor };
//# sourceMappingURL=AbsCursor.js.map