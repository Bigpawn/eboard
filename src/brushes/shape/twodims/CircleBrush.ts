/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-31 22:56:05
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-12 22:02:52
 */
/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-31 19:29:46
 * @Last Modified by:   Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-05-31 19:29:46
 */
import * as _ from "lodash";
import { fabric } from "fabric";
import { IBrushOptions } from "../../IBrush";
import { BrushType } from "../../BrushType";
import RectangleBrush from "./RectangleBrush";

export default class CircleBrush extends RectangleBrush {
    constructor(options?: IBrushOptions) {
        super(options);
    }

    /**
     * @override
     */
    public getType(): BrushType {
        return BrushType.CIRCLE_BRUSH;
    }

    /**
     * @override
     */
    protected _createObject(): fabric.Object|null {
        if (!this._points || this._points.length === 0) {
            return null;
        }

        let start = this._points[0],
            end = this._points[1];

        if (start.x === end.x && start.y === end.y) {
            return null;
        }

        let xOff = Math.abs(start.x - end.x),
            yOff = Math.abs(start.y - end.y),
            radius;
        if (xOff > yOff) {
            radius = yOff / 2;
        } else {
            radius = xOff / 2;
        }

        let renderOpts = {};
        _.defaultsDeep(renderOpts, {'radius': radius, 'left': start.x, 'top': start.y}, this.options);
        return new fabric
            .Circle(renderOpts);
    }
}