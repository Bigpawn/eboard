/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-06 09:13:13
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-07-05 14:01:46
 */
/**
 * The module extends standard fabricjs implementation.
 */
var fabric = window.fabric;
var Color = fabric.Color;
fabric.Color.prototype._tryParsingColor = function (color) {
    var source;
    if (color in Color.colorNameMap) {
        color = Color.colorNameMap[color];
    }
    if (color === 'transparent') {
        source = [255, 255, 255, 0];
    }
    if (!source && color instanceof Object) {
        source = Color.sourceFromRgbObject(color);
        if (!source) {
            source = Color.sourceFromHslObject(color);
        }
    }
    else {
        if (!source) {
            source = Color.sourceFromHex(color);
        }
        if (!source) {
            source = Color.sourceFromRgb(color);
        }
        if (!source) {
            source = Color.sourceFromHsl(color);
        }
    }
    if (!source) {
        // if color is not recognize let's make black as canvas does
        source = [0, 0, 0, 1];
    }
    if (source) {
        this.setSource(source);
    }
};
fabric.Color.sourceFromRgbObject = function (color) {
    var arr = [];
    if (typeof color.r === undefined) {
        return undefined;
    }
    var _color;
    arr.push(color.r);
    arr.push(color.g);
    arr.push(color.b);
    if (typeof color.a !== undefined) {
        arr.push(color.a);
        _color = "rgba(" + arr.join() + ")";
    }
    else {
        _color = "rgb(" + arr.join() + ")";
    }
    return Color.sourceFromRgb(_color);
};
fabric.Color.sourceFromHslObject = function (color) {
    var arr = [];
    if (typeof color.h === undefined) {
        return undefined;
    }
    var _color;
    arr.push(color.h);
    arr.push(color.s * 100 + "%");
    arr.push(color.l * 100 + "%");
    if (typeof color.a !== undefined) {
        arr.push(color.a);
        _color = "hsla(" + arr.join() + ")";
    }
    else {
        _color = "hsl(" + arr.join() + ")";
    }
    return Color.sourceFromHsl(_color);
};
// fabric.Canvas.prototype._searchPossibleTargets = function (objects: any, pointer: any) {
//     // Cache all targets where their bounding box contains point.
//     var target, i = objects.length, normalizedPointer, subTarget;
//     // Do not check for currently grouped objects, since we check the parent group itself.
//     // until we call this function specifically to search inside the activeGroup
//     while (i--) {
//         if (this._checkTarget(pointer, objects[i])) {
//             target = objects[i];
//             if (target.subTargetCheck && target instanceof fabric.Group) {
//                 normalizedPointer = this._normalizePointer(target, pointer);
//                 subTarget = this._searchPossibleTargets(target._objects, normalizedPointer);
//                 subTarget && this.targets.push(subTarget);
//             }
//             break;
//         }
//     }
//     return target;
// }
//# sourceMappingURL=ExFabric.js.map