/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-30 11:47:19
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-12 18:34:03
 */
import { fabric } from "fabric";
import { BrushType } from '../../BrushType';
import { IBrushOptions } from '../../IBrush';
import AbstractBrush from "../../AbstractBrush";

export default class LineBrush extends AbstractBrush {

  constructor(options?: IBrushOptions) {
    super(options);
  }

  /**
   * @override
   */
  public getType(): BrushType {
    return BrushType.LINE_BRUSH;
  }

  /**
   * @override
   */
  protected _createObject(): fabric.Object|null {
    if (!this._points || this._points.length < 2) {
        return null;
    }

    let points: number[] = [];
    points[0] = this._points[0].x;
    points[1] = this._points[0].y;
    points[2] = this._points[1].x;
    points[3] = this._points[1].y;

    return new fabric.Line(points, this.options);
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