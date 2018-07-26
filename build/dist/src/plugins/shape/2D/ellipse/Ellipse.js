/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/12 21:38
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/12 21:38
 * @disc:Ellipse  flip翻转属性不起作用，使用动态计算起点位置实现
 * @changelist:
 *      1. 坐标取整：2018/07/25
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
import { fabric } from "fabric";
import { AbstractShapePlugin, Quadrant } from '../../AbstractShapePlugin';
import { MessageIdMiddleWare } from '../../../../middlewares/MessageIdMiddleWare';
import { MessageTagEnum, } from '../../../../middlewares/MessageMiddleWare';
var Ellipse = /** @class */ (function (_super) {
    __extends(Ellipse, _super);
    function Ellipse(canvas, eBoardEngine) {
        var _this = _super.call(this, canvas, eBoardEngine) || this;
        _this.type = "ellipse";
        _this.stroke = "rgba(0,0,0,1)";
        _this.strokeWidth = 1;
        _this.ctrlKey = false;
        return _this;
    }
    Ellipse.prototype.newInstance = function (point, rx, ry, type) {
        var instance = new fabric.Ellipse({
            type: type || this.type + "_" + Date.now(),
            fill: this.fill,
            left: point.x,
            top: point.y,
            rx: rx,
            ry: ry,
            stroke: this.stroke,
            strokeDashArray: this.strokeDashArray,
            strokeWidth: this.getCanvasPixel(this.strokeWidth)
        });
        this.eBoardCanvas.add(instance);
        return instance;
    };
    Ellipse.prototype.getStartPoint = function () {
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
    Ellipse.prototype.getCtrlStartPoint = function (radius) {
        var start = this.start;
        var end = this.end;
        var length = radius * 2;
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
    Ellipse.prototype.onMouseMove = function (event) {
        if (void 0 === this.start) {
            return;
        }
        _super.prototype.onMouseMove.call(this, event);
        var rx = Math.round(Math.abs(this.end.x - this.start.x) / 2);
        var ry = Math.round(Math.abs(this.end.y - this.start.y) / 2);
        var radius = Math.min(rx, ry);
        var startPoint = this.ctrlKey ? this.getCtrlStartPoint(radius) : this.getStartPoint();
        if (this.instance) {
            this.instance.set({
                rx: this.ctrlKey ? radius : rx,
                ry: this.ctrlKey ? radius : ry,
                left: startPoint.x,
                top: startPoint.y,
            }).setCoords();
            this.eBoardCanvas.renderAll();
            this.throw(MessageTagEnum.Temporary); // 不需要全部抛出消息
        }
        else {
            this.instance = this.newInstance(startPoint, this.ctrlKey ? radius : rx, this.ctrlKey ? radius : ry);
            this.throw(MessageTagEnum.Start);
        }
    };
    ;
    Ellipse.prototype.onMouseUp = function (event) {
        this.throw(MessageTagEnum.End);
        _super.prototype.onMouseUp.call(this, event);
    };
    Ellipse.prototype.ctrlKeyDownHandler = function (e) {
        // 判断是否处于绘制模式
        var keyCode = e.keyCode;
        if (17 === keyCode) {
            this.ctrlKey = true;
            if (void 0 === this.instance || void 0 === this.start) {
                return;
            }
            var rx = Math.round(Math.abs(this.end.x - this.start.x) / 2);
            var ry = Math.round(Math.abs(this.end.y - this.start.y) / 2);
            var radius = Math.min(rx, ry);
            var startPoint = this.getCtrlStartPoint(radius);
            if (radius === this.instance.rx && radius === this.instance.ry && startPoint.x === this.start.x && startPoint.y === this.start.y) {
                return;
            }
            this.instance.set({
                rx: radius,
                ry: radius,
                left: startPoint.x,
                top: startPoint.y,
            }).setCoords();
            this.eBoardCanvas.renderAll();
            this.throw(MessageTagEnum.Temporary); // 不需要全部抛出消息
        }
    };
    Ellipse.prototype.ctrlKeyUpHandler = function (e) {
        var keyCode = e.keyCode;
        if (17 === keyCode) {
            // 恢复
            this.ctrlKey = false;
            if (void 0 === this.instance) {
                return;
            }
            var rx = Math.round(Math.abs(this.end.x - this.start.x) / 2);
            var ry = Math.round(Math.abs(this.end.y - this.start.y) / 2);
            var startPoint = this.getStartPoint();
            this.instance.set({
                rx: rx,
                ry: ry,
                left: startPoint.x,
                top: startPoint.y,
            }).setCoords();
            this.eBoardCanvas.renderAll();
            this.throw(MessageTagEnum.Temporary); // 不需要全部抛出消息
        }
    };
    Ellipse.prototype.throw = function (tag) {
        // 需要生成一个消息的id 及实例的id
        if (void 0 === this.instance) {
            return;
        }
        _super.prototype.throwMessage.call(this, {
            type: this.instance.type,
            messageId: MessageIdMiddleWare.getId(),
            tag: tag,
            point: this.start,
            rx: this.instance.rx,
            ry: this.instance.ry,
        });
    };
    /**
     * 通过id获取实例
     * @param {number} id
     * @returns {"~fabric/fabric-impl".Circle | undefined}
     */
    Ellipse.prototype.getInstanceById = function (type) {
        return this.eBoardCanvas.getObjects(type)[0];
    };
    /**
     * 接收消息处理
     * @param {ICircleMessage} message
     */
    Ellipse.prototype.onMessage = function (message) {
        var type = message.type, point = message.point, rx = message.rx, ry = message.ry, tag = message.tag;
        var instance = this.getInstanceById(type);
        switch (tag) {
            case MessageTagEnum.Start:
                if (void 0 === instance) {
                    instance = this.newInstance(point, rx, ry, type);
                }
                break;
            case MessageTagEnum.Temporary:
            case MessageTagEnum.End:
                // 如果有则更新，否则创建
                this.eBoardCanvas.renderOnAddRemove = false;
                if (void 0 === instance) {
                    instance = this.newInstance(point, rx, ry, type);
                }
                instance.set({
                    rx: rx,
                    ry: ry,
                    left: point.x,
                    top: point.y,
                }).setCoords();
                this.eBoardCanvas.renderAll();
                this.eBoardCanvas.renderOnAddRemove = true;
                break;
            default:
                break;
        }
    };
    return Ellipse;
}(AbstractShapePlugin));
export { Ellipse };
//# sourceMappingURL=Ellipse.js.map