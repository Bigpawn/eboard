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
 * @Date: 2018/7/10 19:45
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/10 19:45
 * @disc:线条插件
 */
import { fabric } from "fabric";
import { ArrowMode, ArrowType, LineType } from './LineType';
import { AbsPlugin } from '../AbsPlugin';
import { ArrowLine } from './ArrowLine';
import { setCursor } from '../utils/decorators';
import { CursorTypeName } from '../cursor/CursorType';
var Color = fabric.Color;
var Line = /** @class */ (function (_super) {
    __extends(Line, _super);
    function Line(canvas, eBoardEngine) {
        var _this = _super.call(this, canvas, eBoardEngine) || this;
        _this.arrowType = ArrowType.NONE;
        _this.arrowMode = ArrowMode.NEXT;
        _this.lineWidth = 4;
        _this.downHandler = function (o) {
            _this.start = _this.eBoardCanvas.getPointer(o.e);
            // 创建对象实例
            _this.line = new ArrowLine([_this.start.x, _this.start.y, _this.start.x, _this.start.y], {
                stroke: _this.getColor(),
                strokeDashArray: _this.borderDashed,
                strokeWidth: _this.lineWidth,
                arrowType: _this.arrowType,
                arrowMode: _this.arrowMode
            });
            _this.eBoardCanvas.add(_this.line);
        };
        _this.moveHandler = function (o) {
            if (_this.start && _this.line) {
                var pos = _this.eBoardCanvas.getPointer(o.e);
                _this.line.set({
                    y2: pos.y,
                    x2: pos.x,
                }).setCoords();
                _this.eBoardCanvas.requestRenderAll();
            }
        };
        _this.upHandler = function (o) {
            if (_this.start && _this.line) {
                var pos = _this.eBoardCanvas.getPointer(o.e);
                var delX = Math.abs(pos.x - _this.start.x);
                var delY = Math.abs(pos.y - _this.start.y);
                if (delX < 4 && delY < 4) {
                    _this.eBoardCanvas.remove(_this.line);
                }
                else {
                    _this.line.set({
                        y2: pos.y,
                        x2: pos.x
                    }).setCoords();
                }
                _this.eBoardCanvas.requestRenderAll();
                _this.line = undefined;
                _this.start = undefined;
            }
        };
        _this.downHandler = _this.downHandler.bind(_this);
        _this.moveHandler = _this.moveHandler.bind(_this);
        _this.upHandler = _this.upHandler.bind(_this);
        return _this;
    }
    Line_1 = Line;
    Line.prototype.getColor = function () {
        var defaultColor = this.eBoardEngine ? this.eBoardEngine.getDefaultColor() : undefined;
        return this.color || defaultColor;
    };
    Line.prototype.setColor = function (color, alpha) {
        var colorObj = new Color(color);
        if (!alpha) {
            this.color = colorObj.toRgba();
        }
        else {
            var source = colorObj.getSource();
            source.splice(3, 1, alpha);
            this.color = Color.fromSource(source).toRgba();
        }
        if (this.line) {
            this.line.set({
                fill: this.color
            });
            this.eBoardCanvas.requestRenderAll();
        }
        return this;
    };
    ;
    Line.prototype.setAlpha = function (alpha) {
        var colorObj = new Color(this.color);
        colorObj.setAlpha(alpha);
        this.color = colorObj.toRgba();
        if (this.line) {
            this.line.set({
                fill: this.color
            });
            this.eBoardCanvas.requestRenderAll();
        }
        return this;
    };
    ;
    Line.prototype.setLineWidth = function (lineWidth) {
        this.lineWidth = lineWidth;
    };
    Line.prototype.setLineType = function (lineType) {
        switch (lineType) {
            case LineType.SOLID:
                this.borderDashed = undefined;
                break;
            case LineType.DASHED:
                this.borderDashed = [15, 5];
                break;
            default:
                this.borderDashed = undefined;
                break;
        }
        return this;
    };
    ;
    Line.prototype.setArrowType = function (arrowType) {
        this.arrowType = arrowType;
        return this;
    };
    Line.prototype.setArrowMode = function (arrowMode) {
        this.arrowMode = arrowMode;
        return this;
    };
    /**
     * @override
     * @param {boolean} enable
     * @returns {this}
     */
    Line.prototype.setEnable = function (enable) {
        if (this.enable === enable) {
            return;
        }
        this.enable = enable;
        var activePlugin = this.eBoardEngine.getActivePlugin();
        if (enable) {
            // 关闭当前激活的组件
            if (activePlugin) {
                activePlugin.setEnable(false);
            }
            this.eBoardEngine.setActivePlugin(this);
            this.eBoardCanvas.on('mouse:down', this.downHandler);
            this.eBoardCanvas.on('mouse:move', this.moveHandler);
            this.eBoardCanvas.on('mouse:up', this.upHandler);
        }
        else {
            if (activePlugin && activePlugin instanceof Line_1) {
                this.eBoardEngine.setActivePlugin(undefined);
            }
            this.start = undefined;
            this.line = undefined;
            this.eBoardCanvas.off('mouse:down', this.downHandler);
            this.eBoardCanvas.off('mouse:move', this.moveHandler);
            this.eBoardCanvas.off('mouse:up', this.upHandler);
        }
        _super.prototype.setEnable.call(this, enable); // 最后调用，先处理自定义逻辑
        return this;
    };
    var Line_1;
    Line = Line_1 = __decorate([
        setCursor(CursorTypeName.Pencil)
    ], Line);
    return Line;
}(AbsPlugin));
export { Line };
//# sourceMappingURL=Line.js.map