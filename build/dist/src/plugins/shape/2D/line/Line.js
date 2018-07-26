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
/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/25 9:26
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/7/25 9:26
 * @disc:单存线条，与Arrow分开
 */
import { setCursor } from '../../../../utils/decorators';
import { AbstractShapePlugin } from '../../AbstractShapePlugin';
import { CursorTypeName } from '../../../tool/cursor/CursorType';
import { fabric } from "fabric";
import { MessageIdMiddleWare } from '../../../../middlewares/MessageIdMiddleWare';
import { MessageTagEnum, } from '../../../../middlewares/MessageMiddleWare';
var Line = /** @class */ (function (_super) {
    __extends(Line, _super);
    function Line() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "line";
        _this.color = "rgba(0,0,0,1)";
        _this.lineWidth = 1;
        return _this;
    }
    Line.prototype.newInstance = function (start, end, type) {
        var instance = new fabric.Line([start.x, start.y, end.x, end.y], {
            type: type || this.type + "_" + Date.now(),
            stroke: this.color,
            strokeWidth: this.getCanvasPixel(this.lineWidth)
        });
        this.eBoardCanvas.add(instance);
        return instance;
    };
    Line.prototype.onMouseMove = function (event) {
        if (void 0 === this.start) {
            return;
        }
        _super.prototype.onMouseMove.call(this, event);
        if (void 0 === this.instance) {
            this.instance = this.newInstance(this.start, this.end);
            this.throw(MessageTagEnum.Start);
        }
        else {
            this.instance.set({
                y2: this.end.y,
                x2: this.end.x,
            }).setCoords();
            this.eBoardCanvas.renderAll();
            this.throw(MessageTagEnum.Temporary);
        }
    };
    Line.prototype.onMouseUp = function (event) {
        this.throw(MessageTagEnum.End);
        _super.prototype.onMouseUp.call(this, event);
    };
    Line.prototype.throw = function (tag) {
        // 需要生成一个消息的id 及实例的id
        if (void 0 === this.instance) {
            return;
        }
        _super.prototype.throwMessage.call(this, {
            type: this.instance.type,
            messageId: MessageIdMiddleWare.getId(),
            tag: tag,
            start: this.start,
            end: this.end
        });
    };
    /**
     * 通过id获取实例
     * @returns {"~fabric/fabric-impl".Circle | undefined}
     * @param type
     */
    Line.prototype.getInstanceById = function (type) {
        return this.eBoardCanvas.getObjects(type)[0];
    };
    /**
     * 消息处理
     * @param {IEllipseMessage} message
     */
    Line.prototype.onMessage = function (message) {
        var type = message.type, start = message.start, end = message.end, tag = message.tag;
        var instance = this.getInstanceById(type);
        switch (tag) {
            case MessageTagEnum.Start:
                if (void 0 === instance) {
                    instance = this.newInstance(start, end, type);
                }
                break;
            case MessageTagEnum.Temporary:
            case MessageTagEnum.End:
                // 如果有则更新，否则创建
                this.eBoardCanvas.renderOnAddRemove = false;
                if (void 0 === instance) {
                    instance = this.newInstance(start, end, type);
                }
                instance.set({
                    y2: end.y,
                    x2: end.x,
                }).setCoords();
                this.eBoardCanvas.renderAll();
                this.eBoardCanvas.renderOnAddRemove = true;
                break;
            default:
                break;
        }
    };
    Line = __decorate([
        setCursor(CursorTypeName.Pencil)
    ], Line);
    return Line;
}(AbstractShapePlugin));
export { Line };
//# sourceMappingURL=Line.js.map