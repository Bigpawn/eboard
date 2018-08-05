/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/11 9:33
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/11 9:33
 * @disc:default Arrow
 */
import { ArrowMode } from '../LineType';
var DefaultArrow = /** @class */ (function () {
    function DefaultArrow(ctx, line) {
        this.ctx = ctx;
        this.line = line;
        this.linePoints = line["calcLinePoints"]();
        var lineWidth = this.line.strokeWidth || this.ctx.lineWidth;
        var theta = 30, headlen = Math.max(lineWidth * 2 + 10, 10);
        var angle = Math.atan2(this.linePoints.y1 - this.linePoints.y2, this.linePoints.x1 - this.linePoints.x2) * 180 / Math.PI, angle1 = (angle + theta) * Math.PI / 180, angle2 = (angle - theta) * Math.PI / 180, topX = headlen * Math.cos(angle1), topY = headlen * Math.sin(angle1), botX = headlen * Math.cos(angle2), botY = headlen * Math.sin(angle2);
        this.calcData = {
            angle: angle,
            angle1: angle1,
            angle2: angle2,
            topX: topX,
            topY: topY,
            botX: botX,
            botY: botY,
        };
    }
    DefaultArrow.prototype.drawPrev = function () {
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
        this.ctx.lineTo(p5.x, p5.y);
        this.ctx.lineTo(this.linePoints.x1, this.linePoints.y1);
        this.ctx.fill();
        this.ctx.stroke();
    };
    DefaultArrow.prototype.drawNext = function () {
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
        this.ctx.lineTo(p3.x, p3.y);
        this.ctx.lineTo(this.linePoints.x2, this.linePoints.y2);
        this.ctx.fill();
        this.ctx.stroke();
    };
    DefaultArrow.prototype.draw = function (mode) {
        // 保存原有的画布样式，绘制完成后恢复
        var origStrokeStyle = this.ctx.strokeStyle;
        var originFillStyle = this.ctx.fillStyle;
        this.ctx.fillStyle = this.ctx.strokeStyle;
        this.ctx.beginPath();
        switch (mode) {
            case ArrowMode.NEXT:
                this.drawNext();
                break;
            case ArrowMode.PREV:
                this.drawPrev();
                break;
            case ArrowMode.ALL:
                this.drawNext();
                this.drawPrev();
                break;
            default:
                break;
        }
        // Canvas 恢复
        this.ctx.fillStyle = originFillStyle;
        this.ctx.strokeStyle = origStrokeStyle;
    };
    return DefaultArrow;
}());
export default DefaultArrow;
//# sourceMappingURL=default.js.map