/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-24 11:36:43
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-05-27 23:40:09
 */
// import {HTMLCanvasElement} from "react";
import { fabric } from 'fabric';
import EBoardCanvas from '../EBoardCanvas';

/**
 *
 */
export default interface ICursor {

    setCanvas(canvas: EBoardCanvas): void;

    /**
     * Return current Canvas instance.
     * @proteced
     */
    _canvas(): EBoardCanvas;

    /**
     * Render cursor.
     * 
     * @param point position of cursor.
     */
    render(point: {x: number, y: number} | fabric.Point): void;
}