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
 * @Date: 2018/7/14 15:33
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/14 15:33
 * @disc:ShapePlugin抽象类
 */
import { AbstractPlugin } from '../AbstractPlugin';
export var Quadrant;
(function (Quadrant) {
    Quadrant[Quadrant["LT"] = 0] = "LT";
    Quadrant[Quadrant["LB"] = 1] = "LB";
    Quadrant[Quadrant["RT"] = 2] = "RT";
    Quadrant[Quadrant["RB"] = 3] = "RB";
})(Quadrant || (Quadrant = {}));
var AbstractShapePlugin = /** @class */ (function (_super) {
    __extends(AbstractShapePlugin, _super);
    function AbstractShapePlugin(canvas, eBoardEngine) {
        return _super.call(this, canvas, eBoardEngine) || this;
    }
    /**
     * default mouseDown Event
     * @param {"~fabric/fabric-impl".IEvent} event
     */
    AbstractShapePlugin.prototype.onMouseDown = function (event) {
        var point = this.eBoardCanvas.getPointer(event.e);
        this.start = {
            x: Math.round(point.x),
            y: Math.round(point.y)
        };
    };
    /**
     * default mouseMove Event
     * @param {"~fabric/fabric-impl".IEvent} event
     */
    AbstractShapePlugin.prototype.onMouseMove = function (event) {
        var point = this.eBoardCanvas.getPointer(event.e);
        this.end = {
            x: Math.round(point.x),
            y: Math.round(point.y)
        };
    };
    /**
     * default mouseUp Event
     * 复杂逻辑
     * @param {"~fabric/fabric-impl".IEvent} event
     */
    AbstractShapePlugin.prototype.onMouseUp = function (event) {
        this.instance = undefined;
        this.start = undefined;
    };
    ;
    /**
     * 计算位置相对象限
     * @param {{x: number; y: number}} point
     * @returns {any}
     */
    AbstractShapePlugin.prototype.calcQuadrant = function (point) {
        if (point.x >= this.start.x) {
            // 右侧
            if (point.y >= this.start.y) {
                return Quadrant.RB;
            }
            else {
                return Quadrant.RT;
            }
        }
        else {
            // 左侧
            if (point.y >= this.start.y) {
                return Quadrant.LB;
            }
            else {
                return Quadrant.LT;
            }
        }
    };
    /**
     * 计算点相对于X轴角度
     * @param {{x: number; y: number}} pointer
     * @returns {number}
     */
    AbstractShapePlugin.prototype.calcAngle = function (pointer) {
        var offsetY = pointer.y - this.start.y;
        var offsetX = pointer.x - this.start.x;
        if (0 === offsetY && 0 === offsetX) {
            return 0;
        }
        var angle = Math.atan(offsetY / offsetX) / Math.PI * 180; // 可能返回NaN 即0/0  没有移动，不做处理
        var quadrant = this.calcQuadrant(pointer);
        switch (quadrant) {
            case Quadrant.RT:
                return 360 + angle;
            case Quadrant.LB:
                return 180 + angle;
            case Quadrant.LT:
                return 180 + angle;
            case Quadrant.RB:
            default:
                return angle;
        }
    };
    /**
     * 根据两点坐标计算角度
     * @param {{x: number; y: number}} pointer1
     * @param {{x: number; y: number}} pointer2
     * @returns {number}
     */
    AbstractShapePlugin.prototype.calcAngleByPoints = function (pointer1, pointer2) {
        var offsetY = pointer2.y - pointer1.y;
        var offsetX = pointer2.x - pointer1.x;
        if (0 === offsetY && 0 === offsetX) {
            return 0;
        }
        var angle = Math.atan(offsetY / offsetX) / Math.PI * 180; // 可能返回NaN 即0/0  没有移动，不做处理
        var quadrant = this.calcQuadrant(pointer2);
        switch (quadrant) {
            case Quadrant.RT:
                return 360 + angle;
            case Quadrant.LB:
                return 180 + angle;
            case Quadrant.LT:
                return 180 + angle;
            case Quadrant.RB:
            default:
                return angle;
        }
    };
    return AbstractShapePlugin;
}(AbstractPlugin));
export { AbstractShapePlugin };
//# sourceMappingURL=AbstractShapePlugin.js.map