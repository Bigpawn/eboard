/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/10 11:39
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/10 11:39
 * @disc:Plugin抽象类
 */
import { CursorTypeName } from './cursor/CursorType';
var AbsPlugin = /** @class */ (function () {
    function AbsPlugin(canvas, eBoardEngine) {
        this.enable = false;
        this.eBoardCanvas = canvas;
        this.eBoardEngine = eBoardEngine;
    }
    /**
     * 自动处理光标显示
     * @param {boolean} enable
     */
    AbsPlugin.prototype.setEnable = function (enable) {
        // 光标使用
        var cursorPlugin = this.eBoardEngine.getPlugin(Plugins.Cursor);
        if (enable) {
            // Cursor启用
            if (this.cursorType) {
                if (CursorTypeName.None === this.cursorType) {
                    cursorPlugin && cursorPlugin.setEnable(false);
                }
                else {
                    cursorPlugin && cursorPlugin.setType(this.cursorType).setEnable(true);
                }
            }
            else {
                cursorPlugin && cursorPlugin.setEnable(false);
            }
        }
        else {
            // Cursor关闭
            if (this.cursorType) {
                cursorPlugin && cursorPlugin.setEnable(false);
            }
        }
    };
    ;
    return AbsPlugin;
}());
export var Plugins;
(function (Plugins) {
    Plugins["Cursor"] = "Cursor";
    Plugins["Line"] = "Line";
    Plugins["Text"] = "Text";
    Plugins["Selection"] = "Selection";
    Plugins["Pencil"] = "Pencil";
})(Plugins || (Plugins = {}));
export { AbsPlugin };
//# sourceMappingURL=AbsPlugin.js.map