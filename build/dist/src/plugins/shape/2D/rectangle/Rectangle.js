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
 * @Date: 2018/7/13 12:51
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/13 12:51
 * @disc:矩形Plugin
 */
import { AbsractPlugin } from '../../../AbsractPlugin';
import { fabric } from "fabric";
import { Ellipse } from '../ellipse/Ellipse';
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(canvas, eBoardEngine) {
        var _this = _super.call(this, canvas, eBoardEngine) || this;
        _this.borderColor = "rgba(0,0,0,1)";
        _this.strokeWidth = 1;
        _this.ctrlKey = false;
        _this.downHandler = _this.downHandler.bind(_this);
        _this.moveHandler = _this.moveHandler.bind(_this);
        _this.upHandler = _this.upHandler.bind(_this);
        _this.ctrlKeyDownHandler = _this.ctrlKeyDownHandler.bind(_this);
        _this.ctrlKeyUpHandler = _this.ctrlKeyUpHandler.bind(_this);
        return _this;
    }
    Rectangle.prototype.getStartPoint = function () {
        var start = this.start;
        var end = this.end;
        if (start) {
            return {
                x: Math.min(start.x, end.x),
                y: Math.min(start.y, end.y)
            };
        }
        else {
            return;
        }
    };
    Rectangle.prototype.getCtrlStartPoint = function (length) {
        var start = this.start;
        var end = this.end;
        if (start) {
            // 如果end.x>start.x 则x===start.x，否则x===start.x-radius
            // 如果end.y>start.y 则y===start.y，否则y===start.y-radius
            return {
                x: end.x > start.x ? start.x : start.x - length,
                y: end.y > start.y ? start.y : start.y - length
            };
        }
        else {
            return;
        }
    };
    ;
    Rectangle.prototype.downHandler = function (o) {
        this.start = this.eBoardCanvas.getPointer(o.e);
        this.end = this.start;
        // 创建对象实例
        this.rect = new fabric.Rect({
            fill: this.fill,
            left: this.start.x,
            top: this.start.y,
            stroke: this.borderColor,
            strokeDashArray: this.borderDashed,
            strokeWidth: this.getCanvasPixel(this.strokeWidth)
        });
        this.eBoardCanvas.add(this.rect);
    };
    ;
    Rectangle.prototype.moveHandler = function (o) {
        if (this.start && this.rect) {
            var pos = this.eBoardCanvas.getPointer(o.e);
            this.end = pos;
            var width = Math.abs(pos.x - this.start.x);
            var height = Math.abs(pos.y - this.start.y);
            var length_1 = Math.min(width, height);
            var startPoint = this.ctrlKey ? this.getCtrlStartPoint(length_1) : this.getStartPoint();
            if (void 0 === startPoint) {
                return;
            }
            this.rect.set({
                width: this.ctrlKey ? length_1 : width,
                height: this.ctrlKey ? length_1 : height,
                left: startPoint.x,
                top: startPoint.y,
            }).setCoords();
            this.eBoardCanvas.requestRenderAll();
        }
    };
    ;
    Rectangle.prototype.upHandler = function (o) {
        if (this.start && this.rect) {
            var pos = this.eBoardCanvas.getPointer(o.e);
            this.end = pos;
            var width = Math.abs(pos.x - this.start.x);
            var height = Math.abs(pos.y - this.start.y);
            if (width < 4 || height < 4) {
                this.eBoardCanvas.remove(this.rect);
            }
            else {
                var length_2 = Math.min(width, height);
                var startPoint = this.ctrlKey ? this.getCtrlStartPoint(length_2) : this.getStartPoint();
                if (void 0 === startPoint) {
                    return;
                }
                this.rect.set({
                    width: this.ctrlKey ? length_2 : width,
                    height: this.ctrlKey ? length_2 : height,
                    left: startPoint.x,
                    top: startPoint.y,
                }).setCoords();
            }
            this.eBoardCanvas.requestRenderAll();
            this.rect = undefined;
            this.start = undefined;
        }
    };
    ;
    Rectangle.prototype.ctrlKeyDownHandler = function (e) {
        // 判断是否处于绘制模式
        var keyCode = e.keyCode;
        if (17 === keyCode) {
            this.ctrlKey = true;
            if (this.start && this.rect) {
                var width = Math.abs(this.end.x - this.start.x);
                var height = Math.abs(this.end.y - this.start.y);
                var length_3 = Math.min(width, height);
                // 起点需要重新算
                var startPoint = this.getCtrlStartPoint(length_3);
                if (void 0 === startPoint) {
                    return;
                }
                this.rect.set({
                    width: length_3,
                    height: length_3,
                    left: startPoint.x,
                    top: startPoint.y
                }).setCoords();
                this.eBoardCanvas.requestRenderAll();
            }
        }
    };
    Rectangle.prototype.ctrlKeyUpHandler = function (e) {
        var keyCode = e.keyCode;
        if (17 === keyCode) {
            // 恢复
            this.ctrlKey = false;
            if (this.start && this.rect) {
                var width = Math.abs(this.end.x - this.start.x);
                var height = Math.abs(this.end.y - this.start.y);
                var startPoint = this.getStartPoint();
                if (void 0 === startPoint) {
                    return;
                }
                this.rect.set({
                    width: width,
                    height: height,
                    left: startPoint.x,
                    top: startPoint.y
                }).setCoords();
                this.eBoardCanvas.requestRenderAll();
            }
        }
    };
    Rectangle.prototype.setEnable = function (enable) {
        if (this.enable === enable) {
            return;
        }
        this.enable = enable;
        var activePlugin = this.eBoardEngine.getActivePlugin();
        if (enable) {
            // 关闭当前激活的组件
            if (activePlugin) {
                activePlugin.setEnable(false);
            }
            this.eBoardEngine.setActivePlugin(this);
            this.eBoardCanvas.on('mouse:down', this.downHandler);
            this.eBoardCanvas.on('mouse:move', this.moveHandler);
            this.eBoardCanvas.on('mouse:up', this.upHandler);
            window.addEventListener("keydown", this.ctrlKeyDownHandler);
            window.addEventListener("keyup", this.ctrlKeyUpHandler);
        }
        else {
            if (activePlugin && activePlugin instanceof Ellipse) {
                this.eBoardEngine.setActivePlugin(undefined);
            }
            this.start = undefined;
            this.rect = undefined;
            this.eBoardCanvas.off('mouse:down', this.downHandler);
            this.eBoardCanvas.off('mouse:move', this.moveHandler);
            this.eBoardCanvas.off('mouse:up', this.upHandler);
            window.removeEventListener("keydown", this.ctrlKeyDownHandler);
            window.removeEventListener("keyup", this.ctrlKeyUpHandler);
        }
        _super.prototype.setEnable.call(this, enable); // 最后调用，先处理自定义逻辑
        return this;
    };
    return Rectangle;
}(AbsractPlugin));
export { Rectangle };
//# sourceMappingURL=Rectangle.js.map