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
import { MessageTagEnum, } from '../../../../middlewares/MessageMiddleWare';
import { MessageIdMiddleWare } from '../../../../middlewares/MessageIdMiddleWare';
var Triangle = /** @class */ (function (_super) {
    __extends(Triangle, _super);
    function Triangle(canvas, eBoardEngine) {
        var _this = _super.call(this, canvas, eBoardEngine) || this;
        _this.stroke = "rgba(0,0,0,1)";
        _this.strokeWidth = 1;
        _this.ctrlKey = false;
        _this.type = "triangle";
        return _this;
    }
    Triangle.prototype.newInstance = function (start, flipX, flipY, width, height, type) {
        var instance = new fabric.Triangle({
            type: type || this.type + "_" + Date.now(),
            fill: this.fill,
            left: start.x,
            top: start.y,
            stroke: this.stroke,
            flipX: flipX,
            flipY: flipY,
            width: width,
            height: height,
            strokeDashArray: this.strokeDashArray,
            strokeWidth: this.getCanvasPixel(this.strokeWidth)
        });
        this.eBoardCanvas.add(instance);
        return instance;
    };
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
            this.instance = this.newInstance(startPoint, offsetX < 0, offsetY < 0, this.ctrlKey ? calcSize.width : width, this.ctrlKey ? calcSize.height : height);
            this.throw(MessageTagEnum.Start);
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
            this.throw(MessageTagEnum.Temporary);
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
                this.throw(MessageTagEnum.Temporary);
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
                this.throw(MessageTagEnum.Temporary);
            }
        }
    };
    Triangle.prototype.onMouseUp = function (event) {
        this.throw(MessageTagEnum.End);
        _super.prototype.onMouseUp.call(this, event);
    };
    Triangle.prototype.throw = function (tag) {
        // 需要生成一个消息的id 及实例的id
        if (void 0 === this.instance) {
            return;
        }
        _super.prototype.throwMessage.call(this, {
            type: this.instance.type,
            messageId: MessageIdMiddleWare.getId(),
            tag: tag,
            start: { x: this.instance.left, y: this.instance.top },
            flipX: this.instance.flipX,
            flipY: this.instance.flipY,
            width: this.instance.width,
            height: this.instance.height,
        });
    };
    /**
     * 通过id获取实例
     * @param {number} id
     * @returns {"~fabric/fabric-impl".Circle | undefined}
     */
    Triangle.prototype.getInstanceById = function (type) {
        return this.eBoardCanvas.getObjects(type)[0];
    };
    /**
     * 接收消息处理
     * @param {ICircleMessage} message
     */
    Triangle.prototype.onMessage = function (message) {
        var type = message.type, start = message.start, flipX = message.flipX, flipY = message.flipY, width = message.width, height = message.height, tag = message.tag;
        var instance = this.getInstanceById(type);
        switch (tag) {
            case MessageTagEnum.Start:
                if (void 0 === instance) {
                    instance = this.newInstance(start, flipX, flipY, width, height, type);
                }
                break;
            case MessageTagEnum.Temporary:
            case MessageTagEnum.End:
                // 如果有则更新，否则创建
                this.eBoardCanvas.renderOnAddRemove = false;
                if (void 0 === instance) {
                    instance = this.newInstance(start, flipX, flipY, width, height, type);
                }
                instance.set({
                    width: width,
                    height: height,
                    flipX: flipX,
                    flipY: flipY,
                    left: start.x,
                    top: start.y,
                }).setCoords();
                this.eBoardCanvas.renderAll();
                this.eBoardCanvas.renderOnAddRemove = true;
                break;
            default:
                break;
        }
    };
    Triangle = __decorate([
        ctrlKeyEnable(true)
    ], Triangle);
    return Triangle;
}(AbstractShapePlugin));
export { Triangle };
//# sourceMappingURL=Triangle.js.map