/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-27 22:13:21
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-12 20:42:39
 */
import {fabric} from 'fabric';
import AbstractBrush from '../../AbstractBrush';
import {BrushType} from '../../BrushType';
import {IBrushOptions} from '../../IBrush';

/**
 * Pencil brush
 */
export default class PencilBrush extends AbstractBrush {

  strokeMiterLimit: any;

  constructor(options?: IBrushOptions) {
    super(options);
  }

  public getType(): BrushType {
    return BrushType.PENCEIL_BRUSH;
  }

  /**
   * Draw a smooth path on the topCanvas using quadraticCurveTo
   * @private
   */
  protected _render() {
    let ctx = this.canvas.getSelectionCanvasContext(), i, len,
        v = this.canvas.viewportTransform, p1 = this._points[0],
        p2 = this._points[1];

    ctx.save();
    ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);
    ctx.beginPath();
    // if we only have 2 points in the path and they are the same
    // it means that the user only clicked the canvas without moving the mouse
    // then we should be drawing a dot. A path isn't drawn between two
    // identical dots  that's why we set them apart a bit
    if (this._points.length === 2 && p1.x === p2.x && p1.y === p2.y) {
      var width = this.width / 1000;
      p1 = new fabric.Point(p1.x, p1.y);
      p2 = new fabric.Point(p2.x, p2.y);
      p1.x -= width;
      p2.x += width;
    }
    ctx.moveTo(p1.x, p1.y);

    for (i = 1, len = this._points.length; i < len; i++) {
      // we pick the point between pi + 1 & pi + 2 as the
      // end point and p1 as our control point.
      var midPoint = p1.midPointFrom(p2);
      ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y);

      p1 = this._points[i];
      p2 = this._points[i + 1];
    }
    // Draw last line as a straight line while
    // we wait for the next point to be able to calculate
    // the bezier control point
    ctx.lineTo(p1.x, p1.y);
    ctx.stroke();
    ctx.restore();
  }

  /**
   * Converts points to SVG path
   * @param {Array} points Array of points
   * @return {String} SVG path
   */
  public convertPointsToSVGPath(points: fabric.Point[]) {
    let path = [], i, width = this.width / 1000,
        p1 = new fabric.Point(points[0].x, points[0].y),
        p2 = new fabric.Point(points[1].x, points[1].y), len = points.length,
        multSignX = 1, multSignY = 1, manyPoints = len > 2;

    if (manyPoints) {
      multSignX = points[2].x < p2.x ? -1 : points[2].x === p2.x ? 0 : 1;
      multSignY = points[2].y < p2.y ? -1 : points[2].y === p2.y ? 0 : 1;
    }
    path.push(
        'M ', p1.x - multSignX * width, ' ', p1.y - multSignY * width, ' ');
    for (i = 1; i < len; i++) {
      if (!p1.eq(p2)) {
        var midPoint = p1.midPointFrom(p2);
        // p1 is our bezier control point
        // midpoint is our endpoint
        // start point is p(i-1) value.
        path.push('Q ', p1.x, ' ', p1.y, ' ', midPoint.x, ' ', midPoint.y, ' ');
      }
      p1 = points[i];
      if ((i + 1) < points.length) {
        p2 = points[i + 1];
      }
    }
    if (manyPoints) {
      multSignX =
          p1.x > points[i - 2].x ? 1 : p1.x === points[i - 2].x ? 0 : -1;
      multSignY =
          p1.y > points[i - 2].y ? 1 : p1.y === points[i - 2].y ? 0 : -1;
    }
    path.push('L ', p1.x + multSignX * width, ' ', p1.y + multSignY * width);
    return path;
  }

  /**
   * Creates fabric.Path object to add on canvas
   * @param {String} pathData Path data
   * @return {fabric.Path} Path to add on canvas
   */
  public createPath(pathData: any) {
    let path = new fabric.Path(pathData, {
      fill: undefined,
      stroke: this.color,
      strokeWidth: this.width,
      strokeLineCap: this.strokeLineCap,
      strokeMiterLimit: this.strokeMiterLimit,
      strokeLineJoin: this.strokeLineJoin,
      strokeDashArray: this.strokeDashArray,
    });
    let position = new fabric.Point(
        path.left + path.width / 2, path.top + path.height / 2);
    position = path.translateToGivenOrigin(
        position, 'center', 'center', path.originX as string, path.originY as string);
    path.top = position.y;
    path.left = position.x;
    if (this.shadow) {
      let thisShadow = this.shadow as fabric.Shadow;
      thisShadow.affectStroke = true;
      path.setShadow(this.shadow);
    }

    return path;
  }

  /**
   * On mouseup after drawing the path on contextTop canvas
   * we use the points captured to create an new fabric path object
   * and add it to the fabric canvas.
   */
  protected _finalizeAndAddPath() {
    var ctx = this.canvas.getSelectionCanvasContext();
    ctx.closePath();

    var pathData = this.convertPointsToSVGPath(this._points).join('');
    if (pathData === 'M 0 0 Q 0 0 0 0 L 0 0') {
      // do not create 0 width/height paths, as they are
      // rendered inconsistently across browsers
      // Firefox 4, for example, renders a dot,
      // whereas Chrome 10 renders nothing
      this.canvas.requestRenderAll();
      return;
    }

    var path = this.createPath(pathData);
    this.canvas.clearContext(this.canvas.getSelectionCanvasContext());
    this.canvas.add(path);
    this.canvas.renderAll();
    path.setCoords();
    this._resetShadow();

    // fire event 'path' created
    this.canvas.trigger('path:created', {path: path});
  }

  /**
   * @override
   */
  protected _createObject(): fabric.Object {
    throw new Error("Method not implemented.");
  }
}