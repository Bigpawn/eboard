/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/20 16:39
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/20 16:39
 * @disc:CanvasFrame 用于Pdfjs想显示等需要使用Canvas绘制的场景
 */

import {GenericHtmlFrame} from './HtmlFrame';
import {ICanvasFrame, ICanvasFrameOptions} from '../interface/IFrame';
class CanvasFrame extends GenericHtmlFrame<ICanvasFrameOptions> implements ICanvasFrame{
    public type:string="canvas-frame";
    public canvas:HTMLCanvasElement;
    protected getChildren():any{
        const canvas = document.createElement("canvas");
        canvas.style.width="100%";
        this.canvas = canvas;
        return canvas;
    }
    protected initLayout(){
        let calcSize=this.calcSize;
        this.dom.style.width=calcSize.width+"px";
        this.dom.style.height=calcSize.height+"px";
        let height = Math.max(this.htmlWrap.offsetHeight,calcSize.height);// css 大小
        if(void 0 !==this.scrollbar){
            this.scrollbar.update();
        }
        const dimensions = {
            width:calcSize.dimensions.width,
            height:calcSize.dimensions.width * height / calcSize.width, // 都需要计算，根据dimensions.width 按照比例计算
        };
        this.engine.eBoardCanvas.setDimensions({width:calcSize.width,height:height});// 样式大小
        this.engine.eBoardCanvas.setDimensions(dimensions,{backstoreOnly:true});// canvas分辨率
        // 需要更新滚动条位置
        this.recoveryScrollbar();
    }
    public refreshLayout(){
        this.initLayout();
    }
}

export {CanvasFrame};