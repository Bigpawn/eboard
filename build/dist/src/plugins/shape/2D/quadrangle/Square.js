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
 * @Date: 2018/7/13 15:40
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/13 15:40
 * @disc:Square 正方形 extends Rectangle without Ctrl KeyEvent;
 * 修改成起点为正方形中心点，终点为正方形一个角，自动旋转
 */
import { fabric } from "fabric";
import { AbstractShapePlugin } from '../../AbstractShapePlugin';
import { MessageTagEnum, } from '../../../../middlewares/MessageMiddleWare';
import { MessageIdMiddleWare } from '../../../../middlewares/MessageIdMiddleWare';
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.stroke = "rgba(0,0,0,1)";
        _this.strokeWidth = 1;
        _this.type = "square";
        return _this;
    }
    Square.prototype.newInstance = function (center, length, angle, type) {
        var instance = new fabric.Rect({
            type: type || this.type + "_" + Date.now(),
            fill: this.fill,
            left: center.x,
            top: center.y,
            stroke: this.stroke,
            strokeDashArray: this.strokeDashArray,
            strokeWidth: this.getCanvasPixel(this.strokeWidth),
            originX: "center",
            originY: "center",
            width: length,
            height: length,
            angle: angle
        });
        this.eBoardCanvas.add(instance);
        return instance;
    };
    Square.prototype.onMouseMove = function (event) {
        if (void 0 === this.start) {
            return;
        }
        _super.prototype.onMouseMove.call(this, event);
        var pos = this.end;
        var width = Math.abs(pos.x - this.start.x);
        var height = Math.abs(pos.y - this.start.y);
        var length = Math.sqrt(2) * Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
        var angle = this.calcAngle(pos);
        if (void 0 === this.instance) {
            this.instance = this.newInstance(this.start, length, angle - 45);
            this.throw(MessageTagEnum.Start);
        }
        else {
            this.instance.set({
                width: length,
                height: length,
                angle: angle - 45
            }).setCoords();
            this.eBoardCanvas.renderAll();
            this.throw(MessageTagEnum.Temporary);
        }
    };
    ;
    Square.prototype.onMouseUp = function (event) {
        this.throw(MessageTagEnum.End);
        _super.prototype.onMouseUp.call(this, event);
    };
    Square.prototype.throw = function (tag) {
        // 需要生成一个消息的id 及实例的id
        if (void 0 === this.instance) {
            return;
        }
        _super.prototype.throwMessage.call(this, {
            type: this.instance.type,
            messageId: MessageIdMiddleWare.getId(),
            tag: tag,
            start: this.start,
            length: this.instance.width,
            angle: this.instance.angle
        });
    };
    /**
     * 通过id获取实例
     * @param {number} id
     * @returns {"~fabric/fabric-impl".Circle | undefined}
     */
    Square.prototype.getInstanceById = function (type) {
        return this.eBoardCanvas.getObjects(type)[0];
    };
    /**
     * 接收消息处理
     * @param {ICircleMessage} message
     */
    Square.prototype.onMessage = function (message) {
        var type = message.type, start = message.start, length = message.length, angle = message.angle, tag = message.tag;
        var instance = this.getInstanceById(type);
        switch (tag) {
            case MessageTagEnum.Start:
                if (void 0 === instance) {
                    instance = this.newInstance(start, length, angle, type);
                }
                break;
            case MessageTagEnum.Temporary:
            case MessageTagEnum.End:
                // 如果有则更新，否则创建
                this.eBoardCanvas.renderOnAddRemove = false;
                if (void 0 === instance) {
                    instance = this.newInstance(start, length, angle, type);
                }
                instance.set({
                    width: length,
                    height: length,
                    angle: angle
                }).setCoords();
                this.eBoardCanvas.renderAll();
                this.eBoardCanvas.renderOnAddRemove = true;
                break;
            default:
                break;
        }
    };
    return Square;
}(AbstractShapePlugin));
export { Square };
//# sourceMappingURL=Square.js.map