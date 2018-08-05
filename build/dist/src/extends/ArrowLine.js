/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/10 19:32
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/10 19:32
 * @disc:直线箭头扩展
 */
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
import { fabric as Fabric } from "fabric";
import { ArrowMode, ArrowType } from '../plugins/shape/2D/line/LineType';
var ArrowLine = /** @class */ (function (_super) {
    __extends(ArrowLine, _super);
    function ArrowLine(points, objObjects) {
        var _this = _super.call(this, points, objObjects) || this;
        _this.type = "arrow-line";
        _this.arrowType = ArrowType.NONE;
        _this.arrowMode = ArrowMode.NEXT;
        _this.arrowType = (objObjects && objObjects.arrowType) ? objObjects.arrowType : ArrowType.NONE;
        _this.arrowMode = (objObjects && objObjects.arrowMode) ? objObjects.arrowMode : ArrowMode.NEXT;
        return _this;
    }
    ArrowLine.prototype._render = function (ctx) {
        _super.prototype["_render"].call(this, ctx); // 私有方法
        // 自定义箭头类
        if (ArrowType.NONE !== this.arrowType) {
            try {
                var arrowInstance = new (require("../plugins/shape/2D/line/arrows/" + this.arrowType).default)(ctx, this);
                arrowInstance.draw(this.arrowMode);
            }
            catch (e) {
                throw "未找到箭头类实例";
            }
        }
    };
    return ArrowLine;
}(Fabric.Line));
export { ArrowLine };
//# sourceMappingURL=ArrowLine.js.map