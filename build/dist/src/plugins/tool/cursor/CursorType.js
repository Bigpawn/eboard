/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/5 17:16
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/5 17:16
 * @disc:光标、画笔类型  系统光标使用同一套方案实现，否则系统光标不支持url及光标点设置
 */
var _a;
export var CursorTypeName;
(function (CursorTypeName) {
    CursorTypeName["PaintBruch"] = "PaintBruch";
    CursorTypeName["Pencil"] = "Pencil";
    CursorTypeName["None"] = "None";
    CursorTypeName["Compass"] = "Compass";
})(CursorTypeName || (CursorTypeName = {}));
export var CursorType = (_a = {},
    _a[CursorTypeName.PaintBruch] = {
        svg: require("./svg/paintbrush.svg"),
        startPoint: {
            x: 0,
            y: 100
        }
    },
    _a[CursorTypeName.Pencil] = {
        svg: require("./svg/pencil.svg"),
        startPoint: {
            x: 0,
            y: 100
        }
    },
    _a[CursorTypeName.Compass] = {
        svg: require("./svg/compass.svg"),
        startPoint: {
            x: 50,
            y: 100
        }
    },
    _a);
//# sourceMappingURL=CursorType.js.map