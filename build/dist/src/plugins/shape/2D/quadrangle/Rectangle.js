/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/13 12:51
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/13 12:51
 * @disc:矩形Plugin  还可以使用Path实现   flipX flipY 不起作用，使用动态计算left top实现四象限
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
import { ctrlKeyEnable } from '../../../../utils/decorators';
import { AbstractShapePlugin, Quadrant } from '../../AbstractShapePlugin';
import { MessageTagEnum, } from '../../../../middlewares/MessageMiddleWare';
import { MessageIdMiddleWare } from '../../../../middlewares/MessageIdMiddleWare';
var Rectangle = /** @class */ (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle(canvas, eBoardEngine) {
        var _this = _super.call(this, canvas, eBoardEngine) || this;
        _this.stroke = "rgba(0,0,0,1)";
        _this.strokeWidth = 1;
        _this.ctrlKey = false;
        _this.type = "rectangle";
        return _this;
    }
    Rectangle.prototype.newInstance = function (start, width, height, type) {
        var instance = new fabric.Rect({
            type: type || this.type + "_" + Date.now(),
            fill: this.fill,
            left: start.x,
            top: start.y,
            stroke: this.stroke,
            strokeDashArray: this.strokeDashArray,
            width: width,
            height: height,
            strokeWidth: this.getCanvasPixel(this.strokeWidth)
        });
        this.eBoardCanvas.add(instance);
        return instance;
    };
    Rectangle.prototype.getStartPoint = function () {
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
    Rectangle.prototype.getCtrlStartPoint = function (length) {
        var start = this.start;
        var end = this.end;
        var quadrant = this.calcQuadrant(end);
        switch (quadrant) {
            case Quadrant.RT: // 第一象限
                return {
                    x: start.x,
                    y: start.y - length
                };
            case Quadrant.LT: // 第二象限
                return {
                    x: start.x - length,
                    y: start.x - length
                };
            case Quadrant.LB: // 第三象限
                return {
                    x: start.x - length,
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
    Rectangle.prototype.onMouseMove = function (event) {
        if (void 0 === this.start) {
            return;
        }
        _super.prototype.onMouseMove.call(this, event);
        var pos = this.end;
        var width = Math.abs(pos.x - this.start.x);
        var height = Math.abs(pos.y - this.start.y);
        var length = Math.min(width, height);
        var startPoint = this.ctrlKey ? this.getCtrlStartPoint(length) : this.getStartPoint();
        if (this.instance) {
            this.instance.set({
                width: this.ctrlKey ? length : width,
                height: this.ctrlKey ? length : height,
                left: startPoint.x,
                top: startPoint.y,
            }).setCoords();
            this.eBoardCanvas.renderAll();
            this.throw(MessageTagEnum.Temporary);
        }
        else {
            this.instance = this.newInstance(this.start, this.ctrlKey ? length : width, this.ctrlKey ? length : height);
            this.throw(MessageTagEnum.Start);
        }
    };
    ;
    Rectangle.prototype.ctrlKeyDownHandler = function (e) {
        // 判断是否处于绘制模式
        var keyCode = e.keyCode;
        if (17 === keyCode) {
            this.ctrlKey = true;
            if (void 0 === this.start || void 0 === this.instance) {
                return;
            }
            var width = Math.abs(this.end.x - this.start.x);
            var height = Math.abs(this.end.y - this.start.y);
            var length_1 = Math.min(width, height);
            var startPoint = this.getCtrlStartPoint(length_1);
            if (width === this.instance.width && height === this.instance.height && startPoint.x === this.instance.left && startPoint.y === this.instance.top) {
                return;
            }
            this.instance.set({
                width: length_1,
                height: length_1,
                left: startPoint.x,
                top: startPoint.y
            }).setCoords();
            this.eBoardCanvas.renderAll();
            this.throw(MessageTagEnum.Temporary);
        }
    };
    Rectangle.prototype.ctrlKeyUpHandler = function (e) {
        var keyCode = e.keyCode;
        if (17 === keyCode) {
            // 恢复
            this.ctrlKey = false;
            if (void 0 === this.instance) {
                return;
            }
            var width = Math.abs(this.end.x - this.start.x);
            var height = Math.abs(this.end.y - this.start.y);
            var startPoint = this.getStartPoint();
            this.instance.set({
                width: width,
                height: height,
                left: startPoint.x,
                top: startPoint.y
            }).setCoords();
            this.eBoardCanvas.renderAll();
            this.throw(MessageTagEnum.Temporary);
        }
    };
    Rectangle.prototype.onMouseUp = function (event) {
        this.throw(MessageTagEnum.End);
        _super.prototype.onMouseUp.call(this, event);
    };
    Rectangle.prototype.throw = function (tag) {
        // 需要生成一个消息的id 及实例的id
        if (void 0 === this.instance) {
            return;
        }
        _super.prototype.throwMessage.call(this, {
            type: this.instance.type,
            messageId: MessageIdMiddleWare.getId(),
            tag: tag,
            start: { x: this.instance.left, y: this.instance.top },
            width: this.instance.width,
            height: this.instance.height,
        });
    };
    /**
     * 通过id获取实例
     * @param {number} id
     * @returns {"~fabric/fabric-impl".Circle | undefined}
     */
    Rectangle.prototype.getInstanceById = function (type) {
        return this.eBoardCanvas.getObjects(type)[0];
    };
    /**
     * 接收消息处理
     * @param {ICircleMessage} message
     */
    Rectangle.prototype.onMessage = function (message) {
        var type = message.type, start = message.start, width = message.width, height = message.height, tag = message.tag;
        var instance = this.getInstanceById(type);
        switch (tag) {
            case MessageTagEnum.Start:
                if (void 0 === instance) {
                    instance = this.newInstance(start, width, height, type);
                }
                break;
            case MessageTagEnum.Temporary:
            case MessageTagEnum.End:
                // 如果有则更新，否则创建
                this.eBoardCanvas.renderOnAddRemove = false;
                if (void 0 === instance) {
                    instance = this.newInstance(start, width, height, type);
                }
                instance.set({
                    width: width,
                    height: height,
                    left: start.x,
                    top: start.y
                }).setCoords();
                this.eBoardCanvas.renderAll();
                this.eBoardCanvas.renderOnAddRemove = true;
                break;
            default:
                break;
        }
    };
    Rectangle = __decorate([
        ctrlKeyEnable(true)
    ], Rectangle);
    return Rectangle;
}(AbstractShapePlugin));
export { Rectangle };
//# sourceMappingURL=Rectangle.js.map