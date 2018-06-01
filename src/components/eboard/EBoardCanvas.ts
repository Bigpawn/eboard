/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-24 10:56:54
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-01 15:07:48
 */
import { fabric } from 'fabric';
import AbstractBrush from './brushes/AbstractBrush';
import { BrushType } from './brushes/BrushType';
import { CssCursor } from './cursor/CssCursor';

/**
 * The class extends <code>fabric.Canvas</code> to expose necessary properties and functions.
 */
class FabricCanvas extends fabric.Canvas {

  /**
   * Override default definition.
   * @override
   */
  freeDrawingBrush: AbstractBrush;

  public getWrapperElement(): HTMLElement {
    return this.wrapperEl;
  }

  /**
   * Return main drawing canvas.
   * 
   * @return <HTMLCanvasElement> instance.
   */
  public getCanvasElement(): HTMLCanvasElement {
    return this.lowerCanvasEl;
  }

  /**
   * Return canvas context of main drawing canvas.
   * 
   * @return <CanvasRenderingContext2D> instance.
   */
  public getCanvasContext(): CanvasRenderingContext2D {
    return this.contextContainer;
  }

  /**
   * Return selection canvas which is used to drawing volatile things like selection, drawing track and so on.
   */
  public getSelectionCanvasElement(): HTMLCanvasElement {
    return this.getSelectionElement();
  }

  /**
   * Return canvas context of selection canvas.
   */
  public getSelectionCanvasContext(): CanvasRenderingContext2D {
    return this.getSelectionContext();
  }

  /**
   * Return current viewport transform.
   */
  public getViewportTransform(): number[] {
    return this.viewportTransform;
  }
}

/**
 * The class supports white pad functions.
 */
export default class EBoardCanvas extends FabricCanvas {

  /**
   * The canvas is used to drawing cursor.
   */
  cursorCanvasEl: HTMLCanvasElement | any;

  /**
   * The canvas context of cursor canvas.
   */
  contextCursor: CanvasRenderingContext2D;

  /**
   * Constructor
   * @param element <canvas> element to initialize instance on
   * @param [options] Options object
   */
  constructor(element: HTMLCanvasElement | string, options?: fabric.ICanvasOptions) {
    super(element, options);
    this._initialize(element, options);
  }

  /**
   * Initialize necessary things.
   * 
   * @protected
   * @param element <canvas> element to initialize instance on
   * @param [options] Options object
   */
  protected _initialize(element: HTMLCanvasElement | string, options?: fabric.ICanvasOptions) {
    this._createCursorCanvas();
  }

  /**
   * Return cursor canvas.
   */
  public getCursorCanvasEl(): HTMLCanvasElement {
    return this.cursorCanvasEl;
  }

  /**
   * Return canvas context of cursor canvas.
   */
  public getCursorCanvasContext(): CanvasRenderingContext2D | null {
    return this.contextCursor;
  }

  /**
   * Create cursor canvas.
   * @protected
   */
  protected _createCursorCanvas() {
    let lowerCanvasClass = this.getElement().className.replace(/\s*lower-canvas\s*/, '');
    if (this.cursorCanvasEl) {
      this.cursorCanvasEl.className = '';
    } else {
      this.cursorCanvasEl = this._createCanvasElement();
    }
    fabric.util.addClass(this.cursorCanvasEl, 'cursor-canvas' + lowerCanvasClass);

    this.getWrapperElement().appendChild(this.cursorCanvasEl);

    this._copyCanvasStyle(this.lowerCanvasEl, this.cursorCanvasEl);
    this._applyCanvasStyle(this.cursorCanvasEl);
    this.contextCursor = this.cursorCanvasEl.getContext('2d');

    // Disable defualt cursor.
    this.cursorCanvasEl.style.pointerEvents = 'none';
  }

  /**
   * Override default implemtation to set cursor canvas dimension.
   * See {@linkcode fabric.StaticCanvas._setBackstoreDimension}.
   * @override 
   * @protected
   * 
   * @param prop 
   * @param value 
   *
   */
  _setBackstoreDimension(prop: string, value: number): void {
    if (this.cursorCanvasEl) {
      this.cursorCanvasEl[prop] = value;
    }

    super._setBackstoreDimension(prop, value);
  }

  /**
   * Override default implementation to set cursor canvas dimension.
   * See {@linkcode fabric.StaticCanvas._setCssDimension}.
   * @override
   * @protected
   * 
   * @param prop 
   * @param value 
   */
  _setCssDimension(prop: string, value: number): void {
    if (this.cursorCanvasEl) {
      this.cursorCanvasEl.style[prop] = value;
    }
    super._setCssDimension(prop, value);
  }

  /**
   * Set drawing brush.
   * 
   * @param brush
   */
  public setFreeDrawingBrush(brush: AbstractBrush, options?: any): void {
    this.freeDrawingBrush = brush;
    if (this.freeDrawingBrush) {
      this.freeDrawingBrush.setEBoardCanvas(this);
    }

    if (brush.getType() !== BrushType.POINTER_BRUSH) {
      this.setPointerCursor(CssCursor.NONE);
      // this.deactivateAll();
      this.renderAll();
      this.enableDrawingModel();

    } else {
      this.setPointerCursor(CssCursor.DEFAULT);
      this.clearFreeDrawingBrush();
    }
  }

  /**
   * Clear free draw brush.
   */
  public clearFreeDrawingBrush(): void {
    this.disableDrawingModel();
    delete this.freeDrawingBrush;
  }

  public setPointerCursor(cursor: CssCursor) {
    this.freeDrawingCursor = cursor;
  }

  /**
   * Return free draing brush instance.
   * 
   * @return AbstractBrush | fabric.BaseBrush
   */
  public getFreeDrawingBrush(): AbstractBrush | fabric.BaseBrush {
    return this.freeDrawingBrush;
  }

  /**
   * Set drawing model.
   * 
   * @param flag 
   */
  public setDrawingModel(flag: boolean): void {
    if (!this.freeDrawingBrush || this.isDrawingMode === flag) {
      return;
    }
    this.isDrawingMode = flag;
  }

  /**
   * Enable drawing mdoel.
   */
  public enableDrawingModel(): void {
    this.setDrawingModel(true);
  }

  /**
   * Disable drawing model.
   */
  public disableDrawingModel(): void {
    this.setDrawingModel(false);
  }

  /**
   * Return drawing model state.
   * 
   * @return boolean
   */
  public isDrawingModel(): boolean | undefined {
    return this.isDrawingMode;
  }

  /**
   * Set drawing track model.
   * 
   * @param flag
   */
  public setCurrentDrawing(flag: boolean): void {
    this._isCurrentlyDrawing = flag;
  }

  /**
   * Return true if current free brush is set with drawing track model.
   * 
   * @return boolean
   */
  public isCurrentlyDrawing(): boolean | undefined {
    return this._isCurrentlyDrawing;
  }

  /**
   * Enable drawing track model when using free brush to drawing on canvas.
   */
  public enableDrawingTrack(): void {
    this.setCurrentDrawing(true);
  }

  /**
   * Disable drawing
   */
  public disableDrawingTrack(): void {
    this.setCurrentDrawing(false);
  }
  /**
   * Override default implementation to check isDrawingModel case.
   * 
   * @override
   * @param e 
   */
  _onMouseOut(e: Event): void {
    super._onMouseOut(e);

    if (this.isDrawingMode) {
      this.clearContext(this.contextCursor);
    }
  }

  /**
   * Override default implementation to paint cursor.
   * @override
   * @param {Event} e Event object fired on mousemove
   */
  _onMouseMoveInDrawingMode(e: Event): void {
    if (this._isCurrentlyDrawing || this.freeDrawingBrush.getCursor()) {
      // let ivt = fabric.util.invertTransform(this.viewportTransform),
      // // this.getPointer(e, true);
      // p = this.getPointer(e, true),
      // pointer = fabric.util.transformPoint(new fabric.Point(p.x, p.y), ivt);
      let pointer = this.getPointer(e);
      if (this._isCurrentlyDrawing) {
        this.freeDrawingBrush.onMouseMove(pointer as fabric.Point);
      }

      // Draw cursor.
      if (this.freeDrawingBrush.getCursor()) {
        this.clearContext(this.contextCursor);
        this.freeDrawingBrush.getCursor().render(pointer);
      }
    }

    this.setCursor(this.freeDrawingCursor as string);
    this._handleEvent(e, 'move');
  }

  /**
   * Overide default implementation
   * @override
   * @param {Event} e Event object fired on mousedown
   */
  _onMouseDownInDrawingMode(e: Event): void {
    super._onMouseDownInDrawingMode(e);
  }

  /**
   * Override default implementation to pass point when calling brush's onMouseUp.
   * 
   * @override
   * @param {Event} e Event object fired on mouseup
   */
  _onMouseUpInDrawingMode(e: Event): void {
    if (this.clipTo) {
      this.getSelectionCanvasContext().restore();
    }
       
    if (this.freeDrawingBrush) {
      this.freeDrawingBrush.onMouseUp(this.getPointer(e) as fabric.Point);
    } else {
      this.disableDrawingTrack();
    }

    this._handleEvent(e, 'up');
  }
} 
