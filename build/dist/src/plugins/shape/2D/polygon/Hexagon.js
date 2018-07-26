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
 * @Date: 2018/7/16 17:58
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/16 17:58
 * @disc:六边形  暂不支持旋转
 */
import { AbstractShapePlugin } from '../../AbstractShapePlugin';
import { FabricHexagon } from '../../../../extends/FabricHexagon';
import { MessageIdMiddleWare } from '../../../../middlewares/MessageIdMiddleWare';
import { MessageTagEnum, } from '../../../../middlewares/MessageMiddleWare';
var Hexagon = /** @class */ (function (_super) {
    __extends(Hexagon, _super);
    function Hexagon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.stroke = "rgba(0,0,0,1)";
        _this.strokeWidth = 1;
        _this.type = "hexagon";
        return _this;
    }
    Hexagon.prototype.newInstance = function (points, radius, start, type) {
        var instance = new FabricHexagon(points, {
            type: type || this.type + "_" + Date.now(),
            stroke: this.stroke,
            strokeWidth: this.getCanvasPixel(this.strokeWidth),
            strokeDashArray: this.strokeDashArray,
            fill: this.fill,
            width: radius,
            height: radius,
            left: start.x,
            top: start.y,
            originY: "center",
            originX: "center"
        });
        this.eBoardCanvas.add(instance);
        return instance;
    };
    Hexagon.prototype.onMouseMove = function (event) {
        if (void 0 === this.start) {
            return;
        }
        _super.prototype.onMouseMove.call(this, event);
        var radius = Math.sqrt(Math.pow(this.start.x - this.end.x, 2) + Math.pow(this.start.y - this.end.y, 2));
        var angle = this.calcAngle(this.end);
        var points = FabricHexagon.calcPointsByRadius(this.start, radius, angle);
        if (void 0 === this.instance) {
            this.instance = this.newInstance(points, radius * 2, this.start);
            this.throw(MessageTagEnum.Start);
        }
        else {
            this.instance.set({
                points: points,
                width: radius * 2,
                height: radius * 2,
            }).setCoords();
            this.eBoardCanvas.renderAll();
            this.throw(MessageTagEnum.Temporary);
        }
    };
    ;
    Hexagon.prototype.onMouseUp = function (event) {
        this.throw(MessageTagEnum.End);
        _super.prototype.onMouseUp.call(this, event);
    };
    Hexagon.prototype.throw = function (tag) {
        // 需要生成一个消息的id 及实例的id
        if (void 0 === this.instance) {
            return;
        }
        _super.prototype.throwMessage.call(this, {
            type: this.instance.type,
            messageId: MessageIdMiddleWare.getId(),
            tag: tag,
            start: this.start,
            radius: this.instance.width,
            points: this.instance.points
        });
    };
    /**
     * 通过id获取实例
     * @returns {"~fabric/fabric-impl".Circle | undefined}
     * @param type
     */
    Hexagon.prototype.getInstanceById = function (type) {
        return this.eBoardCanvas.getObjects(type)[0];
    };
    /**
     * 接收消息处理
     * @param {ICircleMessage} message
     */
    Hexagon.prototype.onMessage = function (message) {
        var type = message.type, points = message.points, start = message.start, radius = message.radius, tag = message.tag;
        var instance = this.getInstanceById(type);
        switch (tag) {
            case MessageTagEnum.Start:
                if (void 0 === instance) {
                    instance = this.newInstance(points, radius, start, type);
                }
                break;
            case MessageTagEnum.Temporary:
            case MessageTagEnum.End:
                // 如果有则更新，否则创建
                this.eBoardCanvas.renderOnAddRemove = false;
                if (void 0 === instance) {
                    instance = this.newInstance(points, radius, start, type);
                }
                instance.set({
                    points: points,
                    width: radius,
                    height: radius,
                }).setCoords();
                this.eBoardCanvas.renderAll();
                this.eBoardCanvas.renderOnAddRemove = true;
                break;
            default:
                break;
        }
    };
    return Hexagon;
}(AbstractShapePlugin));
export { Hexagon };
//# sourceMappingURL=Hexagon.js.map