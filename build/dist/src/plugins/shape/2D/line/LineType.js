/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/10 19:32
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/10 19:32
 * @disc:直线类型
 */
export var LineType;
(function (LineType) {
    LineType[LineType["SOLID"] = 0] = "SOLID";
    LineType[LineType["DASHED"] = 1] = "DASHED";
})(LineType || (LineType = {}));
export var ArrowType;
(function (ArrowType) {
    ArrowType["NONE"] = "none";
    ArrowType["DEFAULT"] = "default";
    ArrowType["HOLLOW"] = "hollow";
})(ArrowType || (ArrowType = {}));
export var ArrowMode;
(function (ArrowMode) {
    ArrowMode[ArrowMode["PREV"] = 0] = "PREV";
    ArrowMode[ArrowMode["NEXT"] = 1] = "NEXT";
    ArrowMode[ArrowMode["ALL"] = 2] = "ALL";
})(ArrowMode || (ArrowMode = {}));
//# sourceMappingURL=LineType.js.map