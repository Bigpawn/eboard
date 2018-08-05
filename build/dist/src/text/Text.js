/*
 * @Author: Bigpawn
 * @Date: 2018/7/11 13:36
 * @Last Modified by: Bigpawn
 * @Last Modified time: 2018/7/11 13:36
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
var Color = fabric.Color;
var Text = /** @class */ (function (_super) {
    __extends(Text, _super);
    function Text(canvas, eBoardEngine) {
        var _this = _super.call(this, canvas, eBoardEngine) || this;
        _this.downHandler = function (o) {
            _this.start = _this.eBoardCanvas.getPointer(o.e);
            if (!_this.text) {
                _this.text = new fabric.IText('', {
                    left: _this.start.x,
                    top: _this.start.y,
                    fontSize: _this.fontSize,
                    editingBorderColor: _this.color,
                    strokeWidth: 50,
                });
            }
            else {
            }
            _this.eBoardCanvas.add(_this.text);
            if (!_this.text.text) {
                _this.text.left = _this.start.x;
                _this.text.top = _this.start.y;
                _this.text.enterEditing();
            }
            if (_this.text && !_this.text.isEditing) {
                _this.text = null;
            }
            if (_this.text) {
                _this.eBoardCanvas.setActiveObject(_this.text);
            }
        };
        _this.upHandler = function (o) {
        };
        _this.setColor = function (color) {
            var colorObj = new Color(color ? color : 'block');
            _this.color = colorObj.toRgba();
            return _this;
        };
        _this.setFontSize = function (size) {
            _this.fontSize = size ? size : 100;
            return _this;
        };
        _this.downHandler.bind(_this);
        _this.upHandler.bind(_this);
        return _this;
    }
    Text.prototype.setEnable = function (enable) {
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
            this.eBoardCanvas.defaultCursor = 'text';
            this.eBoardCanvas.on('mouse:down', this.downHandler);
            this.eBoardCanvas.on('mouse:up', this.upHandler);
        }
        else {
            if (activePlugin && activePlugin instanceof Text) {
                this.eBoardEngine.setActivePlugin(undefined);
            }
            this.eBoardCanvas.off('mouse:down', this.downHandler);
            this.eBoardCanvas.off('mouse:up', this.upHandler);
        }
        return this;
    };
    return Text;
}(AbsPlugin));
export { Text };
//# sourceMappingURL=Text.js.map