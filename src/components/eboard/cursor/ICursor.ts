/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-24 11:36:43
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-12 18:03:28
 */
// import {HTMLCanvasElement} from "react";
import { fabric } from 'fabric';
import { EBoardCanvas } from '../EBoardCanvas';
import { CursorType } from "./CursorType";

/**
 * Cursor interface
 */
export default interface ICursor {

    /**
     * Return type of cursor.
     */
    getType(): CursorType;

    /**
     * Return name of cursor.
     */
    getName(): string;

    /**
     * Set e-board canvas.
     * 
     * @param canvas 
     */
    setCanvas(canvas: EBoardCanvas): void;

    /**
     * Return current Canvas instance.
     * @protected
     */
    _canvas(): EBoardCanvas;

    /**
     * Render cursor.
     * 
     * @param point position of cursor.
     */
    render(point: {x: number, y: number} | fabric.Point): void;
}