/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-24 10:03:52
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-12 20:58:42
 */
import { fabric } from 'fabric';
import { BrushType } from './BrushType';
import ICursor from '../cursor/ICursor';
import { EBoardCanvas } from '../EBoardCanvas';

export enum TextType {
  TEXT = 'Text',
  I_TEXT= 'IText',
  TEXT_BOX = 'TextBox',
}

export enum FontWeight {
  NORMAL = 'normal',
  BOLD = 'bold',
}

export enum TextAlign {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
}

/**
 * Default brush options.
 */
export interface IBrushOptions {
  canvas?: EBoardCanvas;
  callback?: Function;
  cursorOptions?: any;
  cursor?: ICursor;
  
  width?: number | string;
  height?: number | string;
  left?: number | string;
  top?: number | string;
  
  fill?: fabric.Color | string;
  color?: fabric.Color | string;
  opacity?: number;
  shadow?: string;
  
  // Line settings.
  // Border color
  stroke?: fabric.Color | string;
  // Border width
  strokeWidth?: number | string;
  strokeLineCap?: number | string;
  strokeLineJoin?: number | string;
  strokeMiterLimit?: number | string;
  strokeDashArray?: any[];

  scaleX?: number | string;
  scaleY?: number | string;
  angle?: number;
  radius?: number | string;

  flipX?: boolean;
  flipY?: boolean;

  skewX?: number;
  skewY?: number;

  // For Circle
  redius?: number | string;

  // For text
  // 'text' or 'itext' or 'textbox'
  textType?: TextType;
  fontStyle?: string;
  fontFamily?: string;
  fontSize?: number | string;
  // css font weight
  // "normal", "bold"
  fontWeight?: FontWeight;
  underline?: boolean;
  linethrough?: boolean;
  overline?: boolean;
  // "left", "center", and "right".
  textAlign?: TextAlign;
  lineHeight?: number;
  textBackgroundColor?: fabric.Color | string;

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

  /**
   * 设置options
   * @param options  
   */
  updateOptions(options: any): void;
}
