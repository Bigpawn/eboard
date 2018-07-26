/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/20 14:42
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/20 14:42
 * @disc:HTMLFrame HTMLFrame 支持配置是否显示滚动条 属于单层Frame，不会出现子Frame
 */
import {GenericBaseFrame} from './BaseFrame';
import {EBoardEngine} from '../EBoardEngine';
import PerfectScrollbar from 'perfect-scrollbar';
import {IFrame, IFrameOptions, IHTMLFrame, IHTMLFrameOptions} from './IFrame';
import "perfect-scrollbar/css/perfect-scrollbar.css";
import "../style/scrollbar.less";

export enum ScrollbarType{
    horizontal,
    vertical,
    both,
    none
}

class GenericHtmlFrame<T extends IFrameOptions> extends GenericBaseFrame<T> implements IFrame{
    private supportScrollbar:ScrollbarType=ScrollbarType.none;
    private scrollbar:PerfectScrollbar;
    private htmlFragment:string|HTMLElement;
    private htmlWrap:HTMLDivElement;
    protected initialize(options:T){
        super.initialize(options);
        this.supportScrollbar=(options as any).scrollbar||ScrollbarType.none;
        this.htmlFragment=(options as any).htmlFragment||"";
    }
    protected getChildren():string|HTMLElement{
        return this.htmlFragment;
    }
    protected initEngine(){
        const container = document.createElement("div");
        container.className="eboard-container";
        const htmlContainer = document.createElement("div");
        htmlContainer.className="eboard-html-container";
        const htmlWrap = document.createElement("div");
        htmlWrap.className="eboard-html";
        this.htmlWrap=htmlWrap;
        htmlContainer.appendChild(htmlWrap);
        // 支持dom节点
        const html=this.getChildren();
        if(typeof html === "string"){
            htmlWrap.innerHTML=html;
        }else{
            htmlWrap.innerHTML="";
            htmlWrap.appendChild(html);
        }
        const placeholder = document.createElement("canvas");
        placeholder.innerHTML="当前浏览器不支持Canvas,请升级浏览器";
        container.appendChild(htmlContainer);
        container.appendChild(placeholder);
        this.engine = new EBoardEngine(placeholder,{
            selection:false,
            skipTargetFind:true,
            containerClass:"eboard-canvas"
        },this);
        // scrollbar 设置
        switch (this.supportScrollbar){
            case ScrollbarType.horizontal:
                this.scrollbar= new PerfectScrollbar(container,{
                    wheelSpeed: 2,
                    suppressScrollY:true
                });
                break;
            case ScrollbarType.vertical:
                this.scrollbar= new PerfectScrollbar(container,{
                    wheelSpeed: 2,
                    suppressScrollX:true
                });
                break;
            case ScrollbarType.both:
                this.scrollbar= new PerfectScrollbar(container,{
                    wheelSpeed: 2,
                });
                break;
            case ScrollbarType.none:
            default:
                break;
        }
        this.dom = container;
    }
    protected initLayout(){
        const calcSize=this.calc();
        // set container size
        this.dom.style.width=calcSize.width+"px";
        this.dom.style.height=calcSize.height+"px";
        
        
        // 需要根据html内容的高度设置画布的高度
        const height = Math.max(this.htmlWrap.offsetHeight,calcSize.height);
        this.engine.eBoardCanvas.setDimensions({width:calcSize.width,height:height});// 根据实际分辨率设置大小
        this.engine.eBoardCanvas.setDimensions({width:calcSize.width,height:height},{backstoreOnly:true});// 设置canvas 画布大小
    }
    public getScrollbar(){
        return this.scrollbar;
    }
    
    /**
     * 修改html内容
     * @param {string} htmlFragment
     */
    public setHtml(htmlFragment:string){
        this.htmlWrap.innerHTML=htmlFragment;
        if(this.scrollbar){
            this.scrollbar.update();
        }
    }
    public destroy(){
        super.destroy();
        if(this.scrollbar){
            this.scrollbar.destroy();
            this.scrollbar=undefined as any;
        }
    }
}


class HtmlFrame extends GenericHtmlFrame<IHTMLFrameOptions> implements IHTMLFrame{

}


export {HtmlFrame,GenericHtmlFrame};