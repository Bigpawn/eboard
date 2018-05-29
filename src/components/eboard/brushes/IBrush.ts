/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-24 10:03:52
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-05-29 19:18:10
 */
import { fabric } from 'fabric';
import { BrushType } from './BrushType';
import ICursor from '../cursor/ICursor';
import EBoardCanvas from '../EBoardCanvas';

/**
 * Default brush options.
 */
export interface IBrushOptions {
  canvas?: EBoardCanvas;
  callback?: Function;
  cursorOptions?: any;
  cursor?: ICursor;
  color?: fabric.Color | string;
  width?: number | string;
  shadow?: string;
  strokeLineCap?: number | string;
  strokeLineJoin?: number | string;
  strokeDashArray?: number | string;
  strokeStyle?: number | string;
  strokeMiterLimit?: number | string;

}

/**
 * Define brush interface.
 */
export interface IBrush {
  
  /**
   * Return type of brush.
   */
  getType(): BrushType;

  /**
   * Return cursor instance of current brush.
   */
  getCursor(): ICursor;
  
  /**
   * Handle mouse down event.
   * 
   * @param point 
   */
  onMouseDown(point: { x: number; y: number; } | fabric.Point): void;

  /**
   * Handle mouse up event.
   * 
   * @param point
   */
  onMouseUp(point: { x: number; y: number; } | fabric.Point): void;

  /**
   * Handle mouse move event.
   * 
   * @param point 
   */
  onMouseMove(point: { x: number; y: number; } | fabric.Point): void;
}
