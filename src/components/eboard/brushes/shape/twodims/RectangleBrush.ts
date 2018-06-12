/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-30 14:40:36
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-12 22:06:11
 */
import * as _ from "lodash";
import { fabric } from "fabric";
import { BrushType } from "../../BrushType";
import { IBrushOptions } from "../../IBrush";
import AbstractBrush from "../../AbstractBrush";

export default class RectangleBrush extends AbstractBrush {

    constructor(options?: IBrushOptions) {
        super(options);
    }
    
    /**
     * @override
     */
    public getType(): BrushType {
        return BrushType.RECTANGLE_BRUSH;
    }

    /**
     * @override
     */
    protected _createObject(): fabric.Object {
        if (!this._points || this._points.length < 2) {
            return null;
        }
        
        let p1 = this._points[0],
            p2 = this._points[1];

        if (p1.x === p2.x && p1.y === p2.y) {
            return null;
        }

        let _left = p1.x < p2.x ? p1.x : p2.x,
            _top = p1.y < p2.y ? p1.y : p2.y,
            _width = Math.abs(p1.x - p2.x),
            _height = Math.abs(p1.y - p2.y);

        let renderOpts = {};
        _.defaultsDeep(renderOpts, {'left': _left, 'top': _top, 'width': _width, 'height': _height, 'prePixelTargetFind': true}, this.options);
        return new fabric.Rect(renderOpts);
    }

    /**
     * @override
     */
    protected _addPoint(point: fabric.Point) {
        if (this._points.length < 1) {
            this._points.push(point);
        } else {
            this._points[1] = point;
        }
    }
}