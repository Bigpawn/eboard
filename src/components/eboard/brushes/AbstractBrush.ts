/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-24 10:03:04
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-01 15:07:32
 */
import * as _ from 'lodash';
import { applyMixins } from '../utils/utils';
import { fabric } from 'fabric';
import { CssCursor } from '../cursor/CssCursor';
import ICursor from '../cursor/ICursor';
import { EBoardCanvas } from '../EBoardCanvas';
import { BrushType } from './BrushType';
import { IBrush } from './IBrush';

/**
 * Define abstract brush class.
 */
export default abstract class AbstractBrush extends fabric.BaseBrush implements
    IBrush {
  options: any;

  canvas: EBoardCanvas;

  cursor: ICursor;

  callback: Function;

  strokeStyle: any;

  strokeMiterLimit: number;

  protected _points: Array<fabric.Point>;

  constructor(options?: any) {
    super();
    this.initialize(options);
  }

  initialize(options?: any) {
    this._points = [];
    this.initOptions(options);
  }

  /**
   * Update brush's properties with speicified options.
   *
   * @param options
   */
  public updateOptions(options: any) {
    options = options || {};
    // applyMixins(options, [this.options] );
    _.defaultsDeep(options, this.options);
    this.initOptions(options);
  }

  /**
   * Init brush's properties with specified options.
   *
   * @param options
   */
  public initOptions(options: any) {
    this.options = options || {};
    if (this.options.callback) {
      this.callback = this.options.callback;
    }

    // TOOD , NEED TO CHECK IF OPTIONS CONTAINS PROPERTY.
    this.canvas = this.options.canvas;
    this.cursor = this.options.cursor;
    this.color = this.options.stroke ? this.options.stroke : this.options.color;
    this.width = this.options.strokeWidth ? this.options.strokeWidth :
                                            this.options.width;
    this.shadow = this.options.shadow;
    this.strokeLineCap = this.options.strokeLineCap;
    this.strokeLineJoin = this.options.strokeLineJoin;
    this.strokeDashArray = this.options.strokeDashArray;
    this.strokeStyle = this.options.strokeStyle;
    this.strokeMiterLimit = this.options.strokeMiterLimit;
  }

  /**
   * Return type of current brush.
   */
  public abstract getType(): BrushType;

  /**
   * Set relative canvas.
   *
   * @param canvas
   */
  public setEBoardCanvas(canvas: EBoardCanvas) {
    this.canvas = canvas;
  }

  /**
   * Return corresponding cursor.
   */
  public getCursor() {
    return this.cursor;
  }

  /**
   *
   * @param cursor Set cursor.
   */
  public setCursor(cursor: ICursor) {
    this.cursor = cursor;
    this.cursor.setCanvas(this.canvas);
    if (this.cursor && this.canvas) {
      // Disable system cursor, use custom cursor instead.
      this.canvas.freeDrawingCursor = CssCursor.NONE;
    }
  }

  /**
   * Inovoked on mouse down
   * @param {fabric.Point} pointer
   */
  public onMouseDown(pointer: fabric.Point): void {
    this._prepareForDrawing(pointer);
    // capture coordinates immediately this allows to draw dots (when movement
    // never occurs)
    this._captureDrawingPath(pointer);
    this._render();
  }

  /**
   * Inovoked on mouse move
   * @param {fabric.Point} pointer
   */
  public onMouseMove(pointer: fabric.Point): void {
    this._captureDrawingPath(pointer);
    // redraw curve clear top canvas
    this.canvas.clearContext(this.canvas.getSelectionCanvasContext());
    this._render();
  }

  /**
   * Invoked on mouse up
   */
  public onMouseUp(pointer: fabric.Point): void {
    this.canvas.disableDrawingTrack();
    this._finalizeAndAddPath();
  }

  /**
   * @private
   * @param {Object} pointer Actual mouse position related to the canvas.
   */
  protected _prepareForDrawing(pointer: fabric.Point) {
    var p = new fabric.Point(pointer.x, pointer.y);

    this._reset();
    this._addPoint(p);

    this.canvas.getSelectionCanvasContext().moveTo(p.x, p.y);
  }

  /**
   * @private
   * @param {fabric.Point} point Point to be added to points array
   */
  protected _addPoint(point: fabric.Point) {
    if (this._points.length > 1 &&
        point.eq(this._points[this._points.length - 1])) {
      return;
    }
    this._points.push(point);
  }

  /**
   * Clear points array and set contextTop canvas style.
   * @private
   */
  protected _reset() {
    this._points.length = 0;

    this._setBrushStyles();
    this._setShadow();
  }

  /**
   * @private
   * @param {Object} pointer Actual mouse position related to the canvas.
   */
  protected _captureDrawingPath(pointer: fabric.Point) {
    var pointerPoint = new fabric.Point(pointer.x, pointer.y);
    this._addPoint(pointerPoint);
  }

  /**
   * Create concete shape of this brush for rendering, subclass must implement
   * this method.
   */
  protected abstract _createShape(): fabric.Object;

  /**
   * Draw shape track.
   *
   * @override
   */
  protected _render() {
    let canvas = this.canvas as EBoardCanvas;
    let ctx: CanvasRenderingContext2D = canvas.getSelectionCanvasContext(),
             v = canvas.getViewportTransform();

    let shape: fabric.Object = this._createShape();
    if (shape == null) {
      return;
    }

    ctx.save();
    ctx.transform(v[0], v[1], v[2], v[3], v[4], v[5]);

    shape.render(ctx);

    ctx.restore();
  }

  /**
   * Draw the final path of shape.
   *
   * @override
   */
  protected _finalizeAndAddPath() {
    let canvas = this.canvas as EBoardCanvas;

    // Create shape
    let shape: fabric.Object = this._createShape();

    // Clear points.
    this._points = [];

    canvas.clearContext(canvas.getSelectionCanvasContext());
    canvas.add(shape);
    canvas.renderAll();
    shape.setCoords();
    this._resetShadow();

    // fire event 'path' created
    canvas.trigger('path:created', {path: shape});
  }

  // Method from fabric.BashBrush
  protected _setBrushStyles: () => void;
  protected _setShadow: () => void;
  protected _resetShadow: () => void;
}

applyMixins(AbstractBrush, [fabric.BaseBrush]);