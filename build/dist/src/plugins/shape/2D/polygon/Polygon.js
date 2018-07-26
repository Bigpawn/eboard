/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/15 15:24
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/15 15:24
 * @disc:多边形
 * 使用折线来实现，需要考虑border边线设置问题，如果没有边线则最终绘制时需要将其去除， 起始点需要考虑磁铁效果
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
import { AbstractShapePlugin } from '../../AbstractShapePlugin';
import { fabric } from "fabric";
import { MessageTagEnum, } from '../../../../middlewares/MessageMiddleWare';
import { MessageIdMiddleWare } from '../../../../middlewares/MessageIdMiddleWare';
var Point = /** @class */ (function (_super) {
    __extends(Point, _super);
    function Point(x, y, state) {
        var _this = _super.call(this, x, y) || this;
        _this.state = state;
        return _this;
    }
    return Point;
}(fabric.Point));
var Polygon = /** @class */ (function (_super) {
    __extends(Polygon, _super);
    function Polygon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.points = [];
        _this.fill = "#28ff28";
        _this.stroke = "pink";
        _this.strokeWidth = 1;
        _this.type = "polygon";
        return _this;
    }
    Polygon.prototype.onMouseDown = function (event) {
        // 关闭自动渲染
        if (void 0 === this.start) {
            // 起点
            this.start = this.eBoardCanvas.getPointer(event.e);
            // 此时points length 为0
            this.points.push(new Point(this.start.x, this.start.y, "final"));
        }
        else {
            // 中间点
            this.points.pop();
            var finalPoint = this.eBoardCanvas.getPointer(event.e);
            var _close = this.__requireClose(finalPoint);
            if (_close) {
                this.points.push(new Point(this.start.x, this.start.y, "final"));
                this.finish();
            }
            else {
                this.points.push(new Point(finalPoint.x, finalPoint.y, "final"));
            }
        }
        // 判断是否是起点，如果是起点则关闭并且在相差区域内默认调整为起点
    };
    Polygon.prototype.finish = function () {
        this.eBoardCanvas.renderOnAddRemove = false; // 渲染过程控制
        this.eBoardCanvas.remove(this.instance);
        this.instance = new fabric.Polyline(this.points, {
            type: this.instance.type,
            stroke: this.stroke,
            strokeDashArray: this.strokeDashArray,
            strokeWidth: this.getCanvasPixel(this.strokeWidth),
            fill: this.fill,
        });
        this.eBoardCanvas.add(this.instance);
        this.circle && this.eBoardCanvas.remove(this.circle);
        this.eBoardCanvas.renderAll();
        this.throw(MessageTagEnum.End);
        this.recovery();
        this.eBoardCanvas.renderOnAddRemove = true; // 渲染过程控制
    };
    /**
     * 资源回收
     */
    Polygon.prototype.recovery = function () {
        this.points = [];
        this.start = undefined;
        this.instance = undefined;
        this.circle = undefined;
    };
    /**
     * test want to close
     * @param {{x: number; y: number}} pointer
     * @private
     */
    Polygon.prototype.__requireClose = function (pointer) {
        var start = this.start;
        if (this.points.length <= 2) {
            return false;
        }
        var offsetX = Math.abs(pointer.x - start.x);
        var offsetY = Math.abs(pointer.y - start.y);
        var range = this.getCanvasPixel(10);
        return offsetX < range && offsetY < range;
    };
    Polygon.prototype.showCanvas = function (pointer) {
        var _close = this.__requireClose(pointer);
        this.circle && this.eBoardCanvas.remove(this.circle);
        if (_close) {
            this.circle = new fabric.Circle({
                originX: "center",
                originY: "center",
                fill: "#ff2d2d",
                left: this.start.x,
                top: this.start.y,
                stroke: "#ff8040",
                strokeWidth: this.getCanvasPixel(1),
                radius: this.getCanvasPixel(3),
            });
            this.eBoardCanvas.add(this.circle);
        }
    };
    Polygon.prototype.onMouseMove = function (event) {
        if (void 0 === this.start) {
            return;
        }
        _super.prototype.onMouseMove.call(this, event);
        var pos = this.end;
        this.eBoardCanvas.renderOnAddRemove = false; // 渲染过程控制
        var lastPoint = this.points.pop();
        if ("final" === lastPoint.state) {
            this.points.push(lastPoint, new Point(pos.x, pos.y, "temporary"));
        }
        else {
            this.points.push(new Point(pos.x, pos.y, "temporary"));
        }
        if (void 0 === this.instance) {
            this.instance = new fabric.Polyline(this.points, {
                type: this.type + "_" + Date.now(),
                stroke: this.stroke,
                strokeDashArray: this.strokeDashArray,
                strokeWidth: this.getCanvasPixel(this.strokeWidth),
                fill: this.fill,
            });
            this.eBoardCanvas.add(this.instance);
            this.throw(MessageTagEnum.Start);
        }
        else {
            this.eBoardCanvas.remove(this.instance);
            this.instance = new fabric.Polyline(this.points, {
                type: this.instance.type,
                stroke: this.stroke,
                strokeDashArray: this.strokeDashArray,
                strokeWidth: this.getCanvasPixel(this.strokeWidth),
                fill: this.fill,
            });
            this.eBoardCanvas.add(this.instance);
            this.showCanvas(pos);
            this.throw(MessageTagEnum.Temporary);
        }
        this.eBoardCanvas.renderAll();
        this.eBoardCanvas.renderOnAddRemove = true;
    };
    /**
     * @override
     * 清楚默认操作
     * @param {"~fabric/fabric-impl".IEvent} event
     */
    Polygon.prototype.onMouseUp = function (event) {
        // 不进行实例消除
        // this.instance=undefined as any;
        // this.start=undefined as any;
    };
    Polygon.prototype.throw = function (tag) {
        // 需要生成一个消息的id 及实例的id
        if (void 0 === this.instance) {
            return;
        }
        _super.prototype.throwMessage.call(this, {
            type: this.instance.type,
            messageId: MessageIdMiddleWare.getId(),
            tag: tag,
            points: this.instance.points
        });
    };
    /**
     * 通过id获取实例
     * @returns {"~fabric/fabric-impl".Circle | undefined}
     * @param type
     */
    Polygon.prototype.getInstanceById = function (type) {
        return this.eBoardCanvas.getObjects(type)[0];
    };
    /**
     * 接收消息处理
     * @param {ICircleMessage} message
     */
    Polygon.prototype.onMessage = function (message) {
        var type = message.type, points = message.points, tag = message.tag;
        var instance = this.getInstanceById(type);
        switch (tag) {
            case MessageTagEnum.Start:
                if (void 0 === instance) {
                    instance = new fabric.Polyline(points, {
                        type: type,
                        stroke: this.stroke,
                        strokeDashArray: this.strokeDashArray,
                        strokeWidth: this.getCanvasPixel(this.strokeWidth),
                        fill: this.fill,
                    });
                    this.eBoardCanvas.add(instance);
                }
                break;
            case MessageTagEnum.Temporary:
            case MessageTagEnum.End:
                // 如果有则更新，否则创建
                this.eBoardCanvas.renderOnAddRemove = false;
                this.eBoardCanvas.remove(instance);
                instance = new fabric.Polyline(points, {
                    type: type,
                    stroke: this.stroke,
                    strokeDashArray: this.strokeDashArray,
                    strokeWidth: this.getCanvasPixel(this.strokeWidth),
                    fill: this.fill,
                });
                this.eBoardCanvas.add(instance);
                this.eBoardCanvas.renderAll();
                this.eBoardCanvas.renderOnAddRemove = true;
                break;
            default:
                break;
        }
    };
    return Polygon;
}(AbstractShapePlugin));
export { Polygon };
//# sourceMappingURL=Polygon.js.map