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
import { AbsPlugin } from '../AbsPlugin';
import { setCursor } from '../utils/decorators';
import { CursorTypeName } from '../cursor/CursorType';
var Selection = /** @class */ (function (_super) {
    __extends(Selection, _super);
    function Selection() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Selection_1 = Selection;
    Selection.prototype.setEnable = function (enable) {
        if (this.enable === enable) {
            return;
        }
        this.enable = enable;
        var activePlugin = this.eBoardEngine.getActivePlugin();
        if (enable) {
            // 禁用当前激活的插件
            if (activePlugin) {
                activePlugin.setEnable(false);
            }
            this.eBoardEngine.setActivePlugin(this);
            this.eBoardCanvas.selection = true;
            this.eBoardCanvas.skipTargetFind = false;
        }
        else {
            // 关闭当前的插件
            if (activePlugin && activePlugin instanceof Selection_1) {
                this.eBoardEngine.setActivePlugin(undefined);
            }
            this.eBoardCanvas.selection = false;
            this.eBoardCanvas.skipTargetFind = true;
        }
        _super.prototype.setEnable.call(this, enable);
    };
    var Selection_1;
    Selection = Selection_1 = __decorate([
        setCursor(CursorTypeName.None)
    ], Selection);
    return Selection;
}(AbsPlugin));
export { Selection };
//# sourceMappingURL=Selection.js.map