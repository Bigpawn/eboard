/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-12 17:40:14
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-12 18:02:23
 */
export var CursorType;
(function (CursorType) {
    /**
     * Browser cursors are supported by browser as default and is renderd by browser.
     */
    CursorType["BROWSER_CURSOR"] = "browser_cursor";
    /**
     * Custom cursor is implemented by user and is rendered on canvas.
     */
    CursorType["CUSTOM_CURSOR"] = "custom_cursor";
})(CursorType || (CursorType = {}));
//# sourceMappingURL=CursorType.js.map