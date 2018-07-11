/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-12 17:35:17
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-19 13:42:48
 */
import * as _ from 'lodash';
import AbstractBrush from '../../AbstractBrush';
import { IBrushOptions, TextType } from '../../IBrush';
import { BrushType } from '../../BrushType';
import { fabric } from 'fabric';

const defaultOpts = {
    textType: TextType.I_TEXT,
    fontSize: 40,
}

export default class TextBrush extends AbstractBrush {

  protected value:string;

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
    this.value?this.value='':null;
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
    this.canvas.disableDrawingTrack();
    // this._finalizeAndAddPath();
      this.__createInput(pointer);
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
  protected _createObject(): fabric.Object|null {
    if (!this._points || this._points.length === 0) {
        return null;
    }
    
    let textFunc = fabric[this.options.textType];
    let renderOpts = {};
    _.defaultsDeep(renderOpts, {'left': this._points[0].x, 'top': this._points[0].y}, this.options);
    return new textFunc(this.value, renderOpts);
  }

    /**
     * @param {module:.fabric/fabric-impl.Point} pointer
     * @private
     */
  protected __createInput(pointer:fabric.Point) {
    let canvasWapper:any = document.getElementById('canvas-container'),Input:any;
    if(!this.value) {
        Input = document.createElement('input');
        canvasWapper.appendChild(Input);
    }
    let that = this;
    Input.focus();
    Input.style.position = 'absolute';
    Input.style.left = `${pointer.x}px`;
    Input.style.top = `${pointer.y}px`;
    Input.addEventListener('blur',function (e:any){
        that._points[0] = pointer;
        that.value = e.target.value;
        e.target.value?that._finalizeAndAddPath():null;
        canvasWapper?canvasWapper.removeChild(this):null;
    });
  }
}