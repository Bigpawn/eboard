/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/10 11:39
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/10 11:39
 * @disc:Plugin抽象类
 */
import { CursorTypeName } from './tool/cursor/CursorType';
import { Plugins } from "./index";
var AbsractPlugin = /** @class */ (function () {
    function AbsractPlugin(canvas, eBoardEngine) {
        this.enable = false;
        this.eBoardCanvas = canvas;
        this.eBoardEngine = eBoardEngine;
    }
    /**
     * 自动处理光标显示
     * @param {boolean} enable
     */
    AbsractPlugin.prototype.setEnable = function (enable) {
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
    /**
     * Canvas 像素与实际像素换算
     * @param {number} pixel
     * @returns {number}
     */
    AbsractPlugin.prototype.getCanvasPixel = function (pixel) {
        return pixel * this.eBoardEngine.getPixelRatio();
    };
    return AbsractPlugin;
}());
export { AbsractPlugin };
//# sourceMappingURL=AbsractPlugin.js.map