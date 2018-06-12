/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-12 17:35:17
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-12 21:15:03
 */
import * as _ from 'lodash';
import AbstractBrush from '../../AbstractBrush';
import { IBrushOptions, TextType } from '../../IBrush';
import { BrushType } from '../../BrushType';
import { BrowserCursorName, DefaultCursor } from '../../../cursor/BrowserCursor';

const defaultOpts = {
    textType: TextType.I_TEXT,
    fontSize: 40,
}

export default class TextBrush extends AbstractBrush {

  constructor(options?: IBrushOptions) {
    super(_.defaultsDeep(options, defaultOpts));
    this._init(this.options);
  }

  protected _init(options: any) {
    this.setCursor(new DefaultCursor(BrowserCursorName.TEXT, this.options.canvas));
    this.canvas.enableDrawingModel();
  }

  public getType(): BrushType {
    return BrushType.TEXT_BRUSH;
  }

  /**
   * Inovoked on mouse down
   * @param {fabric.Point} pointer
   */
  public onMouseDown(pointer: fabric.Point): void {
    this._prepareForDrawing(pointer);
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
    this._finalizeAndAddPath();
  }

  /**
   * @override
   */
  protected _render() {
      return;
  }
  
  /**
   * @private
   * @param {fabric.Point} point Point to be added to points array
   */
  protected _addPoint(point: fabric.Point) {
    this._points[0] = point;
  }

  /**
   * @override
   */
  protected _createObject(): fabric.Object {
    let textFunc = fabric[this.options.textType];
    let renderOpts = {};
    _.defaultsDeep(renderOpts, {'left': this._points[0].x, 'top': this._points[0].y}, this.options);
    return new textFunc("This is Text.", renderOpts);
  }

}