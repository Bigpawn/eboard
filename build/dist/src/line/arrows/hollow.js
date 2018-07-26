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
/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/11 10:05
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/11 10:05
 * @disc:空心箭头 继承默认箭头
 */
import DefaultArrow from './default';
var HollowArrow = /** @class */ (function (_super) {
    __extends(HollowArrow, _super);
    function HollowArrow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HollowArrow.prototype.drawPrev = function () {
        var p5 = {
            x: this.linePoints.x1 - this.calcData.topX,
            y: this.linePoints.y1 - this.calcData.topY
        };
        var p6 = {
            x: this.linePoints.x1 - this.calcData.botX,
            y: this.linePoints.y1 - this.calcData.botY
        };
        this.ctx.moveTo(p5.x, p5.y);
        this.ctx.lineTo(this.linePoints.x1, this.linePoints.y1);
        this.ctx.lineTo(p6.x, p6.y);
        this.ctx.stroke();
    };
    HollowArrow.prototype.drawNext = function () {
        var p3 = {
            x: this.linePoints.x2 + this.calcData.topX,
            y: this.linePoints.y2 + this.calcData.topY
        };
        var p4 = {
            x: this.linePoints.x2 + this.calcData.botX,
            y: this.linePoints.y2 + this.calcData.botY
        };
        this.ctx.moveTo(p3.x, p3.y);
        this.ctx.lineTo(this.linePoints.x2, this.linePoints.y2);
        this.ctx.lineTo(p4.x, p4.y);
        this.ctx.stroke();
    };
    return HollowArrow;
}(DefaultArrow));
export default HollowArrow;
//# sourceMappingURL=hollow.js.map