/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/10 11:39
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/10 11:39
 * @disc:Plugin抽象类
 * 对象创建方式：mousedown事件中不创建对象，mousemove中检测，如果有对象则修改对象属性，否则创建对象，mouseend事件中销毁对象实例
 * bug: 通过对象创建及销毁来实现动态属性修改，此过程中会调用两次renderAll，性能低于调用api修改属性
 */

import {EBoardCanvas} from '../EBoardCanvas';
import {EBoardEngine} from '../EBoardEngine';
import {CursorTypeName} from './tool/cursor/CursorType';
import {Cursor} from './tool/cursor/Cursor';
import {Plugins} from "./index";

abstract class AbstractPlugin {
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

export {AbstractPlugin};