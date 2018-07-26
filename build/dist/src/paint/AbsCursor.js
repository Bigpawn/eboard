var AbsCursor = /** @class */ (function () {
    function AbsCursor() {
        this.width = "0.5rem";
        this.height = "0.5rem";
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
}());
export { AbsCursor };
//# sourceMappingURL=AbsCursor.js.map