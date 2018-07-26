/*
 * @Author: Bigpawn
 * @Date: 2018/7/12 10:45
 * @Last Modified by: Bigpawn
 * @Last Modified time: 2018/7/12 10:45
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
import { AbsractPlugin } from "../../../AbsractPlugin";
var PencilLine = /** @class */ (function (_super) {
    __extends(PencilLine, _super);
    function PencilLine(canvas, eBoardEngine) {
        var _this = _super.call(this, canvas, eBoardEngine) || this;
        _this.color = 'block';
        _this.width = 10;
        _this.downHandler = function (o) {
            _this.start = _this.eBoardCanvas.getPointer(o.e);
            _this.polyLine = new fabric.PencilBrush();
            _this.polyLine.color = _this.color;
            _this.polyLine.width = _this.width;
            _this.polyLine.initialize(_this.eBoardCanvas);
            _this.polyLine.onMouseDown(_this.start);
        };
        _this.moveHandler = function (o) {
            var movePoint = _this.eBoardCanvas.getPointer(o.e);
            if (_this.polyLine) {
                _this.polyLine.onMouseMove(movePoint);
            }
        };
        _this.upHandler = function (o) {
            _this.polyLine._finalizeAndAddPath();
            _this.polyLine.initialize(undefined);
        };
        _this.setColor = function (color) {
            _this.color = color;
            return _this;
        };
        _this.setWidth = function (width) {
            _this.width = width;
            return _this;
        };
        _this.downHandler.bind(_this);
        _this.moveHandler.bind(_this);
        _this.upHandler.bind(_this);
        return _this;
    }
    PencilLine.prototype.setEnable = function (enable) {
        if (this.enable === enable) {
            return;
        }
        this.enable = enable;
        var activePlugin = this.eBoardEngine.getActivePlugin();
        if (enable) {
            if (activePlugin) {
                activePlugin.setEnable(false);
            }
            this.eBoardEngine.setActivePlugin(this);
            this.eBoardCanvas.on('mouse:down', this.downHandler);
            this.eBoardCanvas.on('mouse:move', this.moveHandler);
            this.eBoardCanvas.on('mouse:up', this.upHandler);
        }
        else {
            if (activePlugin && activePlugin instanceof PencilLine) {
                this.eBoardEngine.setActivePlugin(undefined);
            }
            this.eBoardCanvas.off('mouse:down', this.downHandler);
            this.eBoardCanvas.off('mouse:move', this.moveHandler);
            this.eBoardCanvas.off('mouse:up', this.upHandler);
        }
        return this;
    };
    return PencilLine;
}(AbsractPlugin));
export { PencilLine };
//# sourceMappingURL=Line.js.map