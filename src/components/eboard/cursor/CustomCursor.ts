/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-12 17:56:24
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-12 18:06:17
 */
import ICursor from "./ICursor";
import { EBoardCanvas } from "../EBoardCanvas";
import { CursorType } from "./CursorType";

/**
 * Abstract class of default cursor.
 */
export abstract class AbstractCustomCursor implements ICursor {

    name: string;

    options: any;

    canvas: EBoardCanvas;
  
    constructor(name: any, options: any, canvas?: EBoardCanvas) {
      this.name = name;
      this.options = options || {};
      this.canvas = canvas;
    }
  
    /**
     * @override
     */
    getType(): CursorType {
      return CursorType.CUSTOM_CURSOR;
    }
  
    /**
     * @override
     */
    getName(): string {
        return this.name;
    }

    setCanvas(canvas: EBoardCanvas): void {
      this.canvas = canvas;
    }
  
    _canvas(): EBoardCanvas {
      return this.canvas;
    }

    /**
     * @override
     * @param point 
     */
    abstract render(point: { x: number; y: number; } | fabric.Point): void;
  }