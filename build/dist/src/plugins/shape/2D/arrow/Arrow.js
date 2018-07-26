/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/25 10:51
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/7/25 10:51
 * @disc:箭头
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
import { setCursor } from '../../../../utils/decorators';
import { CursorTypeName } from '../../../tool/cursor/CursorType';
import { AbstractShapePlugin } from '../../AbstractShapePlugin';
import { MessageTagEnum, } from '../../../../middlewares/MessageMiddleWare';
import { MessageIdMiddleWare } from '../../../../middlewares/MessageIdMiddleWare';
export var ArrowMode;
(function (ArrowMode) {
    ArrowMode[ArrowMode["PREV"] = 0] = "PREV";
    ArrowMode[ArrowMode["NEXT"] = 1] = "NEXT";
    ArrowMode[ArrowMode["ALL"] = 2] = "ALL";
})(ArrowMode || (ArrowMode = {}));
export var ArrowFactory;
(function (ArrowFactory) {
    ArrowFactory["DEFAULT"] = "default";
    ArrowFactory["HOLLOW"] = "hollow";
    ArrowFactory["FISH"] = "fish";
})(ArrowFactory || (ArrowFactory = {}));
var Arrow = /** @class */ (function (_super) {
    __extends(Arrow, _super);
    function Arrow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "arrow";
        _this.color = "rgba(0,0,0,1)";
        _this.lineWidth = 1;
        _this.arrowFactory = ArrowFactory.HOLLOW;
        _this.arrowMode = ArrowMode.ALL;
        return _this;
    }
    Arrow.prototype.newInstance = function (start, end, type) {
        var arrowFactory = require("./factory/" + this.arrowFactory).default;
        var headlen = Math.max(this.lineWidth * 2 + 10, 10);
        var _a = arrowFactory.calcPath(start, end, 30, headlen, this.arrowMode, this.color), path = _a.path, fill = _a.fill;
        var instance = new fabric.Path(path, {
            type: type ? type : this.type + "_" + Date.now(),
            stroke: this.color,
            strokeWidth: this.lineWidth,
            fill: fill
        });
        this.eBoardCanvas.add(instance);
        return instance;
    };
    Arrow.prototype.onMouseMove = function (event) {
        if (void 0 === this.start) {
            return;
        }
        _super.prototype.onMouseMove.call(this, event);
        if (void 0 === this.instance) {
            this.instance = this.newInstance(this.start, this.end);
            this.throw(MessageTagEnum.Start);
        }
        else {
            this.eBoardCanvas.renderOnAddRemove = false;
            this.eBoardCanvas.remove(this.instance);
            this.instance = this.newInstance(this.start, this.end, this.instance.type);
            this.eBoardCanvas.renderAll();
            this.eBoardCanvas.renderOnAddRemove = true;
            this.throw(MessageTagEnum.Temporary);
        }
    };
    Arrow.prototype.onMouseUp = function (event) {
        this.throw(MessageTagEnum.End);
        _super.prototype.onMouseUp.call(this, event);
    };
    Arrow.prototype.throw = function (tag) {
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
    Arrow.prototype.getInstanceById = function (type) {
        return this.eBoardCanvas.getObjects(type)[0];
    };
    /**
     * 消息处理
     * @param {IArrowMessage} message
     */
    Arrow.prototype.onMessage = function (message) {
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
                if (void 0 !== instance) {
                    this.eBoardCanvas.remove(instance);
                }
                instance = this.newInstance(start, end, type);
                this.eBoardCanvas.renderAll();
                this.eBoardCanvas.renderOnAddRemove = true;
                break;
            default:
                break;
        }
    };
    Arrow = __decorate([
        setCursor(CursorTypeName.Pencil)
    ], Arrow);
    return Arrow;
}(AbstractShapePlugin));
export { Arrow };
//# sourceMappingURL=Arrow.js.map