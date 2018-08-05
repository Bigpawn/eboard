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
 * @Date: 2018/7/15 14:58
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/15 14:58
 * @disc:直角三角形 继承自Path
 */
import { AbstractShapePlugin } from '../../AbstractShapePlugin';
import { OrTriangle } from '../../../../extends/OrTriangle';
import { MessageTagEnum, } from '../../../../middlewares/MessageMiddleWare';
import { MessageIdMiddleWare } from '../../../../middlewares/MessageIdMiddleWare';
var OrthogonalTriangle = /** @class */ (function (_super) {
    __extends(OrthogonalTriangle, _super);
    function OrthogonalTriangle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.stroke = "rgba(0,0,0,1)";
        _this.strokeWidth = 1;
        _this.type = "orthogonal-triangle";
        return _this;
    }
    OrthogonalTriangle.prototype.newInstance = function (points, type) {
        var instance = new OrTriangle(points, {
            type: type || this.type + "_" + Date.now(),
            stroke: this.stroke,
            strokeWidth: this.getCanvasPixel(this.strokeWidth),
            strokeDashArray: this.strokeDashArray,
            fill: this.fill,
        });
        this.eBoardCanvas.add(instance);
        return instance;
    };
    OrthogonalTriangle.prototype.onMouseMove = function (event) {
        if (void 0 === this.start) {
            return;
        }
        _super.prototype.onMouseMove.call(this, event);
        var points = OrTriangle.calcPointsByCursorPoint(this.start, this.end);
        if (void 0 === this.instance) {
            this.instance = this.newInstance(points);
            this.throw(MessageTagEnum.Start);
        }
        else {
            this.eBoardCanvas.renderOnAddRemove = false;
            this.eBoardCanvas.remove(this.instance);
            this.instance = this.newInstance(points, this.instance.type);
            this.eBoardCanvas.renderAll();
            this.eBoardCanvas.renderOnAddRemove = false;
            this.throw(MessageTagEnum.Temporary);
        }
    };
    ;
    OrthogonalTriangle.prototype.onMouseUp = function (event) {
        this.throw(MessageTagEnum.End);
        _super.prototype.onMouseUp.call(this, event);
    };
    OrthogonalTriangle.prototype.throw = function (tag) {
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
     * @param {number} id
     * @returns {"~fabric/fabric-impl".Circle | undefined}
     */
    OrthogonalTriangle.prototype.getInstanceById = function (type) {
        return this.eBoardCanvas.getObjects(type)[0];
    };
    /**
     * 接收消息处理
     * @param {ICircleMessage} message
     */
    OrthogonalTriangle.prototype.onMessage = function (message) {
        var type = message.type, tag = message.tag, points = message.points;
        var instance = this.getInstanceById(type);
        switch (tag) {
            case MessageTagEnum.Start:
                if (void 0 === instance) {
                    instance = this.newInstance(points, type);
                }
                break;
            case MessageTagEnum.Temporary:
            case MessageTagEnum.End:
                // 如果有则更新，否则创建
                this.eBoardCanvas.renderOnAddRemove = false;
                this.eBoardCanvas.remove(instance);
                instance = this.newInstance(points, type);
                this.eBoardCanvas.renderAll();
                this.eBoardCanvas.renderOnAddRemove = true;
                break;
            default:
                break;
        }
    };
    return OrthogonalTriangle;
}(AbstractShapePlugin));
export { OrthogonalTriangle };
//# sourceMappingURL=OrthogonalTriangle.js.map