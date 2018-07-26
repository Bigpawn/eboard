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
import { AbsPlugin } from "../AbsPlugin";
var PolyLine = /** @class */ (function (_super) {
    __extends(PolyLine, _super);
    function PolyLine(canvas, eBoardEngine) {
        var _this = _super.call(this, canvas, eBoardEngine) || this;
        _this.downHandler = function (o) {
            _this.polyLine = new fabric.Polyline([{ x: 10, y: 10 }], {
                stroke: 'red',
                left: 100,
                top: 100
            });
        };
        _this.moveHandler = function (o) {
            if (_this.polyLine) {
            }
        };
        _this.upHandler = function (o) {
        };
        _this.downHandler.bind(_this);
        _this.moveHandler.bind(_this);
        _this.upHandler.bind(_this);
        return _this;
    }
    PolyLine.prototype.setEnable = function (enable) {
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
            if (activePlugin && activePlugin instanceof PolyLine) {
                this.eBoardEngine.setActivePlugin(undefined);
            }
            this.eBoardCanvas.off('mouse:down', this.downHandler);
            this.eBoardCanvas.off('mouse:move', this.moveHandler);
            this.eBoardCanvas.off('mouse:up', this.upHandler);
        }
    };
    return PolyLine;
}(AbsPlugin));
export { PolyLine };
//# sourceMappingURL=PolyLine.js.map