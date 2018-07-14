/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/10 11:39
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/10 11:39
 * @disc:Plugin抽象类
 */

import {EBoardCanvas} from '../EBoardCanvas';
import {EBoardEngine} from '../EBoardEngine';
import {CursorTypeName} from './tool/cursor/CursorType';
import {Cursor} from './tool/cursor/Cursor';
import {Plugins} from "./index";

abstract class AbsractPlugin {
    protected eBoardCanvas:EBoardCanvas;
    protected eBoardEngine:EBoardEngine;
    protected cursorType:CursorTypeName;
    protected enable:boolean=false;
    constructor(canvas:EBoardCanvas,eBoardEngine:EBoardEngine){
        this.eBoardCanvas=canvas;
        this.eBoardEngine=eBoardEngine;
    }
    
    /**
     * 自动处理光标显示
     * @param {boolean} enable
     */
    public setEnable(enable:boolean){
        // 光标使用
        const cursorPlugin = this.eBoardEngine.getPlugin(Plugins.Cursor) as Cursor;
        if(enable){
            // Cursor启用
            if(this.cursorType){
                if(CursorTypeName.None === this.cursorType){
                    cursorPlugin&&cursorPlugin.setEnable(false);
                }else{
                    cursorPlugin&&cursorPlugin.setType(this.cursorType).setEnable(true);
                }
            }else{
                cursorPlugin&&cursorPlugin.setEnable(false);
            }
        }else{
            // Cursor关闭
            if(this.cursorType){
                cursorPlugin&&cursorPlugin.setEnable(false);
            }
        }
    };
    
    /**
     * Canvas 像素与实际像素换算
     * @param {number} pixel
     * @returns {number}
     */
    public getCanvasPixel(pixel:number){
        return pixel * this.eBoardEngine.getPixelRatio();
    }
}

export {AbsractPlugin};