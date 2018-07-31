/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/20 16:39
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/20 16:39
 * @disc:CanvasFrame 用于Pdfjs想显示等需要使用Canvas绘制的场景
 */

import {GenericHtmlFrame} from './HtmlFrame';
import {ICanvasFrame, ICanvasFrameOptions} from './IFrame';
class CanvasFrame extends GenericHtmlFrame<ICanvasFrameOptions> implements ICanvasFrame{
    public type:string="canvas-frame";
    public canvas:HTMLCanvasElement;
    protected getChildren(){
        const canvas = document.createElement("canvas");
        canvas.style.width="100%";
        this.canvas = canvas;
        return canvas;
    }
    
    /**
     * @override
     * set public
     */
    public initLayout(){
        super.initLayout();
    }
}

export {CanvasFrame};