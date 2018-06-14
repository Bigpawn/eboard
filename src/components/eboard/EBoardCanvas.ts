/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-24 10:56:54
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-14 16:06:28
 */
import * as _ from 'lodash';
import { fabric } from 'fabric';
import './mixins/ExFabric';
import AbstractBrush from './brushes/AbstractBrush';
import { BrushType } from './brushes/BrushType';
import { BrowserCursorName } from './cursor/BrowserCursor';
import { FabricObservingEventType, ZoomEvent } from './mixins/FabricEvents';

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
 * EBoardCanvas option defintions.
 */
export interface IEBoardCanvasOptions extends fabric.ICanvasOptions {
  /**
   * Indicates if zoom is enabled or not.
   */
  isZoom: boolean;

  /**
   * Indicates if zoom is using panning mode.
   */
  isPanning: boolean;

  /**
   * Backup original viewport transform.
   */
  originalVpt: number[];
}

/**
 * The class supports white pad functions.
 */
export class EBoardCanvas extends FabricCanvas implements fabric.ICanvasOptions {
  /**
   * Indicates if zoom is enabled or not.
   */
  isZoom: boolean;

  /**
   * Indicates if zoom is using panning mode.
   */
  isPanning: boolean;

  /**
   * Backup original viewport transform.
   */
  originalVpt: number[];

  /**
   * The canvas is used to drawing cursor.
   */
  cursorCanvasEl: HTMLCanvasElement | any;

  /**
   * The canvas context of cursor canvas.
   */
  contextCursor: CanvasRenderingContext2D;

  options: IEBoardCanvasOptions;

  /**
   * Constructor
   * @param element <canvas> element to initialize instance on
   * @param [options] Options object
   */
  constructor(element: HTMLCanvasElement | string, options?: IEBoardCanvasOptions) {
    super(element, options);
    this.options = options ? options : {} as IEBoardCanvasOptions;
    this._initialize(element, options);
  }

  /**
   * Initialize necessary things.
   * 
   * @protected
   * @param element <canvas> element to initialize instance on
   * @param [options] Options object
   */
  protected _initialize(element: HTMLCanvasElement | string, options?: IEBoardCanvasOptions) {
    this._createCursorCanvas();

    if (this.isZoom === true) {
      this.enableZooming();      
    }
    
    this.originalVpt = _.map(this.getViewportTransform(), _.clone);
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
    fabric.util.addClass(this.cursorCanvasEl, 'cursor-canvas ' + lowerCanvasClass);

    this.getWrapperElement().appendChild(this.cursorCanvasEl);

    this._copyCanvasStyle(this.lowerCanvasEl, this.cursorCanvasEl);
    this._applyCanvasStyle(this.cursorCanvasEl);
    this.contextCursor = this.cursorCanvasEl.getContext('2d');

    // Disable pointer events on cursor canvas.
    // The pointer events enables on upper canvas as default.
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
      // this.deactivateAll();
      this.renderAll();
      this.enableDrawingModel();
      
    } else {
      this.setPointerCursor(BrowserCursorName.DEFAULT);
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

  public setPointerCursor(cursor: BrowserCursorName) {
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

  /**
   * Add listener
   * 
   * @param eventType 
   * @param listener 
   */
  public addEventListener(eventType: FabricObservingEventType, listener: (event: any) => void): EBoardCanvas {
    this.on(eventType, listener);
    return this;
  }

  /**
   * Remove listener.
   * @param eventType 
   * @param listener 
   */
  public removeEventListener(eventType: FabricObservingEventType, listener?: (event: any) => void): EBoardCanvas  {
    this.off(eventType, listener);
    return this;
  } 

  /**
   * Remove all registered listeners.
   */
  public removeAllListeners(): EBoardCanvas  {
    this.off();
    return this;
  }

  public isEnabledZooming(): boolean {
    return this.isZoom || false;
  }

  public enableZooming() {
    this.set({'isZoom': true}); 
    this.addEventListener(FabricObservingEventType.MOUSE_WHEEL, this.__handleZooming);
  }
  
  public disableZooming() {
    this.removeEventListener(FabricObservingEventType.MOUSE_WHEEL, this.__handleZooming);
    this.set({'isZoom': false});
  }

  public isEnabledPanning(): boolean {
    return this.isPanning || false;
  }

  public setPanning(isPanning: boolean) {
    this.set({'isPanning': isPanning});
  }

  private __handleZooming(opt: any)  {
    let delta = opt.e.deltaY;
    let pointer;
    if (this.isEnabledPanning()) {
       pointer = this.getPointer(opt.e);
    }

    let zoom = this.getZoom();
    zoom = zoom + delta / 200;
    if (zoom > 20) {
        zoom = 20;
    }
    if (zoom < 0.01) {
        zoom = 0.01;
    }

    if (this.isEnabledPanning()) {
      this.zoomToPoint({ x: pointer.x, y: pointer.y } as fabric.Point, zoom)
    } else {
      this.setZoom(zoom);
    }
    opt.e.preventDefault();
    opt.e.stopPropagation();
  }

  /**
   * @override
   */
  public zoomToPoint(point: fabric.Point, value: number): this {
    let before = point, vpt = this.viewportTransform.slice(0);
    let oldVpt = _.map(vpt, _.clone);

    point = fabric.util.transformPoint(point, fabric.util.invertTransform(this.viewportTransform));
    vpt[0] = value;
    vpt[3] = value;
    var after = fabric.util.transformPoint(point, vpt);
    vpt[4] += before.x - after.x;
    vpt[5] += before.y - after.y;
    let ret = this.setViewportTransform(vpt);
    
    // Fire a zoom event for undo/redo
    this.trigger(FabricObservingEventType.ZOOM_AFTER, {'oldVpt': oldVpt, 'value': value, 'point': point, 'lastVpt': _.map(vpt, _.clone)} as ZoomEvent)

    return ret;
  }

  /**
   *  Restore original viewport transform.
   */
  public restoreOriginalViewportTransform(): void {
    this.setViewportTransform(this.originalVpt);
  }

  /**
   * Return original viewport transform.
   */
  public getOriginalViewportTransform(): number[] {
    return this.originalVpt;
  }
} 
