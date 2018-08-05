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
 * @Date: 2018/7/5 17:15
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/5 17:15
 * @disc:画笔类光标
 * *********************************@changelist:*********************************
 * 新增开启关闭控制，创建对象修改为不启用
 */
import { AbsCursor } from './AbsCursor';
import { CursorType, CursorTypeName } from './CursorType';
import { RemUntil } from '../../../utils/RemUntil';
var Cursor = /** @class */ (function (_super) {
    __extends(Cursor, _super);
    function Cursor(canvas, eBoardEngine) {
        var _this = _super.call(this, canvas, eBoardEngine) || this;
        _this.container = canvas.getElement().parentElement;
        _this.cursorMoveListener = _this.cursorMoveListener.bind(_this);
        _this.cursorLeaveListener = _this.cursorLeaveListener.bind(_this);
        return _this;
    }
    ;
    Cursor.createSvgElement = function (svgObject) {
        return "<svg version=\"1.2\" viewBox=\"" + svgObject.viewBox + "\" xmlns=\"http://www.w3.org/2000/svg\"><use xlink:href=\"#" + svgObject.id + "\"></use></svg>";
    };
    Cursor.prototype.setCursorElement = function () {
        if (this.typeName === CursorTypeName.None) {
            // 使用系统默认的
            return;
        }
        this.eBoardCanvas.defaultCursor = "none";
        void 0 !== this.cursorEl && this.cursorEl.parentElement.removeChild(this.cursorEl);
        this.cursorEl = document.createElement("div");
        this.cursorEl.className = "eboard-cursor";
        this.cursorEl.style.width = this.width;
        this.cursorEl.style.height = this.height;
        this.cursorEl.style.display = "none";
        this.cursorEl.style.transition = "all 1ms ease";
        var cursorType = CursorType[this.typeName];
        var _a = cursorType.startPoint, x = _a.x, y = _a.y;
        var widthSizeObject = RemUntil.getSizeObject(this.width);
        var heightSizeObject = RemUntil.getSizeObject(this.height);
        var offsetWidth = widthSizeObject.number * x / 100 + widthSizeObject.unit; // 单位不同，需要计算
        var offsetHeight = heightSizeObject.number * y / 100 + heightSizeObject.unit; // 单位不同，需要计算
        this.cursorEl.style.transform = "translate(-" + offsetWidth + ",-" + offsetHeight + ")";
        var svgObject = cursorType.svg["default"];
        this.cursorEl.innerHTML = Cursor.createSvgElement(svgObject);
        this.container.appendChild(this.cursorEl);
    };
    Cursor.prototype.cursorLeaveListener = function () {
        if (this.typeName === CursorTypeName.None) {
            // 使用系统默认的
            return;
        }
        this.cursorEl.style.display = "none";
    };
    Cursor.prototype.cursorMoveListener = function (options) {
        if (this.typeName === CursorTypeName.None) {
            // 使用系统默认的
            return;
        }
        var event = options.e;
        var canvasOffset = this.eBoardCanvas.calcOffset();
        var _a = canvasOffset._offset, left = _a.left, top = _a.top;
        var offsetX = event.pageX - left;
        var offsetY = event.pageY - top;
        this.cursorEl.style.display = "block";
        this.cursorEl.style.left = offsetX + "px";
        this.cursorEl.style.top = offsetY + "px";
        // 消息发送传递{offsetX,offsetY,canvasOffset.width,canvasOffset.height};
    };
    Cursor.prototype.setSize = function (width, height) {
        _super.prototype.setSize.call(this, width, height);
        this.setCursorElement();
        return this;
    };
    Cursor.prototype.setType = function (typeName) {
        this.typeName = typeName;
        this.setCursorElement();
        return this;
    };
    ;
    Cursor.prototype.getName = function () {
        return this.typeName;
    };
    Cursor.prototype.getType = function () {
        return CursorType[this.typeName];
    };
    /**
     * 设置cursor位置
     * @param {number} offsetX
     * @param {number} offsetY
     * @param {number} canvasWidth
     * @param {number} canvasHeight
     */
    Cursor.prototype.moveTo = function (offsetX, offsetY, canvasWidth, canvasHeight) {
        var canvasOffset = this.eBoardCanvas.calcOffset();
        var width = canvasOffset.width, height = canvasOffset.height;
        this.cursorEl.style.display = "block";
        this.cursorEl.style.left = offsetX * width / canvasWidth + "px";
        this.cursorEl.style.top = offsetY * height / canvasHeight + "px";
        return this;
    };
    /**
     * @override Cursor不需要默认处理Cursor的逻辑
     * @param {boolean} enable
     * @returns {this}
     */
    Cursor.prototype.setEnable = function (enable) {
        if (this.enable === enable) {
            return;
        }
        this.enable = enable;
        if (enable) {
            this.eBoardCanvas.defaultCursor = "none";
            this.eBoardCanvas.on('mouse:move', this.cursorMoveListener);
            this.eBoardCanvas.on('mouse:out', this.cursorLeaveListener);
        }
        else {
            this.eBoardCanvas.defaultCursor = "default";
            this.eBoardCanvas.off('mouse:move', this.cursorMoveListener);
            this.eBoardCanvas.off('mouse:out', this.cursorLeaveListener);
            this.cursorEl && (this.cursorEl.style.display = "none");
        }
        return this;
    };
    return Cursor;
}(AbsCursor));
export { Cursor };
//# sourceMappingURL=Cursor.js.map