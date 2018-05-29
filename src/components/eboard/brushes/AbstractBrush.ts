/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-24 10:03:04
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-05-29 15:55:21
 */
import {applyMixins} from '../utils/utils';
import {fabric} from "fabric";
import EBoardCanvas from "../EBoardCanvas";
import {BrushType} from "./BrushType";
import { IBrush, IBrushOptions } from './IBrush';
import ICursor from '../cursor/ICursor';
import { CssCursor } from '../cursor/CssCursor';

/**
 * Define abstract brush class.
 */
export abstract class AbstractBrush extends fabric.BaseBrush implements IBrush {
  options?: any;

  canvas: EBoardCanvas;
      
  strokeStyle: any;

  strokeMiterLimit: number;

  cursor: ICursor;

  callback: Function;

  protected _points: Array<fabric.Point>;

  constructor(options?: IBrushOptions) {
    super();
    this.initialize(options);
  }

  initialize(options?: IBrushOptions) {
    this._points = [];
    this.initOptions(options);
  }

  public updateOptions(options: any) {
    options = options || {};
    applyMixins(options, [this.options] );
    this.initOptions(options);
  }

  public initOptions(options: any) {
    this.options = options || {} as IBrushOptions;
    this.callback = this.options.callback;
    this.canvas = this.options.canvas;
    this.cursor = this.options.cursor;
    this.color = this.options.color;
    this.width = this.options.width;
    this.shadow = this.options.shadow;
    this.strokeLineCap = this.options.strokeLineCap;
    this.strokeLineJoin = this.options.strokeLineJoin;
    this.strokeDashArray = this.options.strokeDashArray;
    this.strokeStyle = this.options.strokeStyle;
    this.strokeMiterLimit = this.options.strokeMiterLimit;
  }

  public abstract getType(): BrushType;

  public getCursor() {
    return this.cursor;
  }

  public setPadCanvas(canvas: EBoardCanvas) {
    this.canvas = canvas;
  }

  public setCursor(cursor: ICursor) {
    this.cursor = cursor;
    this.cursor.setCanvas(this.canvas);
    if (this.cursor && this.canvas) {
      // Disable system cursor, use custom cursor instead.
      this.canvas.freeDrawingCursor = CssCursor.NONE;
    }
  }

  public abstract onMouseDown(pointer: { x: number; y: number; } | fabric.Point): void;

  public abstract onMouseUp(pointer: { x: number; y: number; } | fabric.Point): void;

  public abstract onMouseMove(pointer: { x: number; y: number; } | fabric.Point): void;

  // Method from fabric.BashBrush
  protected _setBrushStyles: () => void;
  protected _setShadow: () => void;
  protected _resetShadow: () => void;
}

applyMixins(AbstractBrush, [fabric.BaseBrush]);