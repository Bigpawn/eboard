import { EBoard } from '../../src/EBoard';
/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/26 10:03
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/26 10:03
 * @disc:DESC
 */
var EBoardInstance = /** @class */ (function () {
    function EBoardInstance() {
    }
    EBoardInstance.getInstance = function () {
        if (!this.instance) {
            this.instance = new EBoard(function () { return document.getElementById("eboardContainer"); });
        }
        return this.instance;
    };
    return EBoardInstance;
}());
export { EBoardInstance };
//# sourceMappingURL=EBoardInstance.js.map