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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/11 13:31
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/11 13:31
 * @disc:选择 Selection状态下应该恢复默认的鼠标或者使用自定义系统鼠标
 */
import { setCursor } from '../../../utils/decorators';
import { CursorTypeName } from '../cursor/CursorType';
import { AbstractPlugin } from '../../AbstractPlugin';
import { SuspensionShell } from "../suspension/SuspensionShell";
var Selection = /** @class */ (function (_super) {
    __extends(Selection, _super);
    function Selection(canvas, eboardEngine) {
        return _super.call(this, canvas, eboardEngine) || this;
    }
    Selection.prototype.onMouseUp = function (o) {
        if (this.eBoardCanvas.getActiveObject()) {
            if (!this.suspensionShell) {
                this.suspensionShell = new SuspensionShell(this.eBoardCanvas.getActiveObject(), this.eBoardCanvas);
            }
            else {
                this.suspensionShell.initSuspension(this.eBoardCanvas.getActiveObject(), this.eBoardCanvas);
            }
        }
        else {
            if (this.suspensionShell) {
                this.suspensionShell.removeElement(this.eBoardCanvas);
                this.suspensionShell = null;
            }
        }
    };
    ;
    Selection.prototype.onMouseMove = function (o) {
        if (this.eBoardCanvas.getActiveObject()) {
            if (!this.suspensionShell) {
                this.suspensionShell = new SuspensionShell(this.eBoardCanvas.getActiveObject(), this.eBoardCanvas);
            }
            else {
                this.suspensionShell.initSuspension(this.eBoardCanvas.getActiveObject(), this.eBoardCanvas);
            }
        }
        else {
            if (this.suspensionShell) {
                this.suspensionShell.removeElement(this.eBoardCanvas);
                this.suspensionShell = null;
            }
        }
    };
    ;
    Selection.prototype.setEnable = function (enable) {
        _super.prototype.setEnable.call(this, enable);
        if (enable) {
            this.eBoardCanvas.selection = true;
            this.eBoardCanvas.skipTargetFind = false;
        }
        else {
            this.eBoardCanvas.selection = false;
            this.eBoardCanvas.skipTargetFind = true;
        }
        return this;
    };
    Selection = __decorate([
        setCursor(CursorTypeName.None)
    ], Selection);
    return Selection;
}(AbstractPlugin));
export { Selection };
//# sourceMappingURL=Selection.js.map