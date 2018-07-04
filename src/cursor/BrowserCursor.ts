/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-27 22:52:05
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-12 18:40:03
 */
import ICursor from "./ICursor";
import { CursorType } from "./CursorType";
import { EBoardCanvas } from "../EBoardCanvas";
import {fabric} from "fabric";

/**
 * Define browser cursor types.
 */
export enum BrowserCursorName {
  AUTO = 'auto',
  DEFAULT = 'default',
  NONE = 'none',
  CONTEXT_MENU = 'context-menu',
  HELP = 'help',
  POINTER = 'pointer',
  PROGRESS = 'progress',
  WAIT = 'wait',
  CELL = 'cell',
  CROSSHAIR = 'crosshair',
  TEXT = 'text',
  VERTICAL_TEXT = 'vertical-text',
  ALIAS = 'alias',
  COPY = 'copy',
  MOVE = 'move',
  NO_DROP = 'no-drop',
  NOT_ALLOWED = 'not-allowed',
  E_RESIZE = 'e-resize',
  N_RESIZE = 'n-resize',
  NE_RESIZE = 'ne-resize',
  NW_RESIZE = 'nw-resize',
  S_RESIZE = 's-resize',
  SE_RESIZE = 'se-resize',
  SW_RESIZE = 'sw-resize',
  W_RESIZE = 'w-resize',
  EW_RESIZE = 'ew-resize',
  NS_RESIZE = 'ns-resize',
  NESW_RESIZE = 'nesw-resize',
  NWSE_RESIZE = 'nwse-resize',
  COL_RESIZE = 'col-resize',
  ROW_RESIZE = 'row-resize',
  ALL_SCROLL = 'all-scroll',
  ZOOM_IN = 'zoom-in',
  ZOOM_OUT = 'zoom-out',
  GRAB = 'grab',
  GRABBING = 'grabbing',
}

/**
 * Abstract class of default cursor.
 */
export class DefaultCursor implements ICursor {
  name: string;
  canvas: EBoardCanvas|undefined;

  constructor(name: string, canvas?: EBoardCanvas) {
    this.name = name;
    this.canvas = canvas;
  }

  /**
   * @override
   */
  getType(): CursorType {
    return CursorType.BROWSER_CURSOR;
  }

  /**
   * @override
   */
  getName(): string {
    return this.name;
  }

  /**
   * @override
   * @param point 
   */
  render(point: { x: number; y: number; } | fabric.Point): void {
    return;
  }

  setCanvas(canvas: EBoardCanvas): void {
    this.canvas = canvas;
  }

  _canvas(): EBoardCanvas|undefined {
    return this.canvas;
  }
}