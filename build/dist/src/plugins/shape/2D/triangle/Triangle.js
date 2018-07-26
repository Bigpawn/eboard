/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/13 21:47
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/13 21:47
 * @disc:三角形  flipX,flipY 实现翻转
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { fabric } from "fabric";
import { AbstractShapePlugin, Quadrant } from '../../AbstractShapePlugin';
import { ctrlKeyEnable } from '../../../../utils/decorators';
var Triangle = /** @class */ (function (_super) {
    __extends(Triangle, _super);
    function Triangle(canvas, eBoardEngine) {
        var _this = _super.call(this, canvas, eBoardEngine) || this;
        _this.stroke = "rgba(0,0,0,1)";
        _this.strokeWidth = 1;
        _this.ctrlKey = false;
        return _this;
    }
    Triangle.prototype.getStartPoint = function () {
        var start = this.start;
        var end = this.end;
        var quadrant = this.calcQuadrant(end);
        switch (quadrant) {
            case Quadrant.RT: // 第一象限
                return {
                    x: start.x,
                    y: end.y
                };
            case Quadrant.LT: // 第二象限
                return {
                    x: end.x,
                    y: end.y
                };
            case Quadrant.LB: // 第三象限
                return {
                    x: end.x,
                    y: start.y
                };
            case Quadrant.RB: // 第四象限
            default:
                return {
                    x: start.x,
                    y: start.y
                };
        }
    };
    Triangle.prototype.getCtrlStartPoint = function (size) {
        var start = this.start;
        var end = this.end;
        var quadrant = this.calcQuadrant(end);
        switch (quadrant) {
            case Quadrant.RT: // 第一象限
                return {
                    x: start.x,
                    y: start.y - size.height
                };
            case Quadrant.LT: // 第二象限
                return {
                    x: start.x - size.width,
                    y: start.y - size.height
                };
            case Quadrant.LB: // 第三象限
                return {
                    x: start.x - size.width,
                    y: start.y
                };
            case Quadrant.RB: // 第四象限
            default:
                return {
                    x: start.x,
                    y: start.y
                };
        }
    };
    ;
    Triangle.prototype.onMouseMove = function (event) {
        if (void 0 === this.start) {
            return;
        }
        _super.prototype.onMouseMove.call(this, event);
        var pos = this.end;
        var offsetX = pos.x - this.start.x;
        var offsetY = pos.y - this.start.y;
        var width = Math.abs(offsetX);
        var height = Math.abs(offsetY);
        var calcSize = this.calcEquilate(width, height);
        var startPoint = this.ctrlKey ? this.getCtrlStartPoint(calcSize) : this.getStartPoint();
        if (void 0 === this.instance) {
            this.instance = new fabric.Triangle({
                fill: this.fill,
                left: startPoint.x,
                top: startPoint.y,
                stroke: this.stroke,
                flipX: offsetX < 0,
                flipY: offsetY < 0,
                width: this.ctrlKey ? calcSize.width : width,
                height: this.ctrlKey ? calcSize.height : height,
                strokeDashArray: this.strokeDashArray,
                strokeWidth: this.getCanvasPixel(this.strokeWidth)
            });
            this.eBoardCanvas.add(this.instance);
        }
        else {
            this.instance.set({
                width: this.ctrlKey ? calcSize.width : width,
                height: this.ctrlKey ? calcSize.height : height,
                flipX: offsetX < 0,
                flipY: offsetY < 0,
                left: startPoint.x,
                top: startPoint.y,
            }).setCoords();
            this.eBoardCanvas.renderAll();
        }
    };
    ;
    Triangle.prototype.calcEquilate = function (width, height) {
        // 根据宽度计算高度  根据高度计算宽度，同时取小值
        var calcHeight = width * Math.sqrt(3) / 2;
        var calcWidth = height * 2 / Math.sqrt(3);
        return {
            width: Math.min(calcWidth, width),
            height: Math.min(calcHeight, height)
        };
    };
    ;
    Triangle.prototype.ctrlKeyDownHandler = function (e) {
        // 判断是否处于绘制模式
        var keyCode = e.keyCode;
        if (17 === keyCode) {
            this.ctrlKey = true;
            if (void 0 !== this.instance) {
                var offsetX = this.end.x - this.start.x;
                var offsetY = this.end.y - this.start.y;
                var width = Math.abs(offsetX);
                var height = Math.abs(offsetY);
                var calcSize = this.calcEquilate(width, height);
                var startPoint = this.getCtrlStartPoint(calcSize);
                this.instance.set({
                    width: this.ctrlKey ? calcSize.width : width,
                    height: this.ctrlKey ? calcSize.height : height,
                    flipY: offsetY < 0,
                    flipX: offsetX < 0,
                    left: startPoint.x,
                    top: startPoint.y,
                }).setCoords();
                this.eBoardCanvas.renderAll();
            }
        }
    };
    Triangle.prototype.ctrlKeyUpHandler = function (e) {
        var keyCode = e.keyCode;
        if (17 === keyCode) {
            // 恢复
            this.ctrlKey = false;
            if (void 0 !== this.instance) {
                var width = Math.abs(this.end.x - this.start.x);
                var height = Math.abs(this.end.y - this.start.y);
                var offsetX = this.end.x - this.start.x;
                var offsetY = this.end.y - this.start.y;
                var startPoint = this.getStartPoint();
                this.instance.set({
                    width: width,
                    height: height,
                    flipY: offsetY < 0,
                    flipX: offsetX < 0,
                    left: startPoint.x,
                    top: startPoint.y
                }).setCoords();
                this.eBoardCanvas.renderAll();
            }
        }
    };
    Triangle = __decorate([
        ctrlKeyEnable(true)
    ], Triangle);
    return Triangle;
}(AbstractShapePlugin));
export { Triangle };
//# sourceMappingURL=Triangle.js.map