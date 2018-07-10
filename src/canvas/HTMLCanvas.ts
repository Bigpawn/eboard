/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/5 15:52
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/5 15:52
 * @disc:包含HTML层的Canvas
 */

import {Canvas} from './Canvas';

class HTMLCanvas extends Canvas{
    /**
     * 初始化白板引擎
     * @override
     */
    protected _initEBoardEngine(){
/*        this.eBoardEngine=new fabric.Canvas(this._placeholder,{
            selection:false,
            skipTargetFind:true,
            containerClass:"eboard-canvas"
        });*/
    }
}

export {HTMLCanvas};