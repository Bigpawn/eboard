/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/20 14:42
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/7/20 14:42
 * @disc:HTMLFrame HTMLFrame 支持配置是否显示滚动条 属于单层Frame，不会出现子Frame
 * HtmlFrame 必然会存在滚动条，滚动条配置不起作用，仅在Image时生效
 */
import {GenericBaseFrame} from './BaseFrame';
import {EBoardEngine} from '../EBoardEngine';
import {IFrame,IHTMLFrame, IHTMLFrameOptions} from '../interface/IFrame';
import "perfect-scrollbar/css/perfect-scrollbar.css";
import "../style/scrollbar.less";
import {IFrameMessageInterface} from '../IMessageInterface';
import {ScrollBar} from '../components/ScrollBar';

export enum ScrollbarType{
    horizontal,
    vertical,
    both,
    none
}

class GenericHtmlFrame<T extends IHTMLFrameOptions> extends GenericBaseFrame<T> implements IFrame,IFrameMessageInterface{
    private htmlWrap:HTMLDivElement;
    public type="html-frame";
    public scrollbar:ScrollBar;
    protected getChildren():string|HTMLElement|undefined{
        return this.options.content;
    }
    protected getLoadedImage(){
        const image =document.createElement("img");
        image.src="";
        image.style.display="none";
        image.onerror=()=>{
            this.initLayout();
        };
        return image;
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
            if(void 0 !==html){
                htmlWrap.innerHTML="";
                htmlWrap.appendChild(html);
                // 如果标签是image标签则不添加异常image元素
                if(html.tagName!=="IMG"){
                    container.appendChild(this.getLoadedImage());
                }
            }
        }
        // 通过image模拟实现监听显示事件
        const placeholder = document.createElement("canvas");
        placeholder.innerHTML="当前浏览器不支持Canvas,请升级浏览器";
        container.appendChild(htmlContainer);
        container.appendChild(placeholder);
        this.engine = new EBoardEngine(placeholder,{
            selection:false,
            skipTargetFind:true,
            containerClass:"eboard-canvas"
        },this);
        // scrollbar 设置  如果是html,必然存在滚动条
        switch (this.options.scrollbar){
            case ScrollbarType.horizontal:
                this.scrollbar= new ScrollBar(container,{
                    wheelSpeed: 2,
                    suppressScrollY:true
                },this);
                break;
            case ScrollbarType.vertical:
                this.scrollbar= new ScrollBar(container,{
                    wheelSpeed: 2,
                    suppressScrollX:true
                },this);
                break;
            case ScrollbarType.both:
                this.scrollbar= new ScrollBar(container,{
                    wheelSpeed: 2,
                },this);
                break;
            case ScrollbarType.none:
            default:
                if(this.type==="html-frame"){
                    this.scrollbar= new ScrollBar(container,{
                        wheelSpeed: 2,
                        suppressScrollX:true
                    },this);
                }
                break;
        }
        this.dom = container;
    }
    protected initLayout(){
        const calcSize=this.calc();
        // set container size
        this.dom.style.width=calcSize.width+"px";
        this.dom.style.height=calcSize.height+"px";
        // 还没有append则不能计算出高度  ========== fix
        const height = Math.max(this.htmlWrap.offsetHeight,calcSize.height);
        this.engine.eBoardCanvas.setDimensions({width:calcSize.width,height:height});// 根据实际分辨率设置大小
        this.engine.eBoardCanvas.setDimensions({width:calcSize.width,height:height},{backstoreOnly:true});// 设置canvas 画布大小
    }
    public destroy(silent?:boolean){
        super.destroy(silent);
        if(this.scrollbar){
            this.scrollbar.destroy();
            this.scrollbar=undefined as any;
        }
    }
}


class HtmlFrame extends GenericHtmlFrame<IHTMLFrameOptions> implements IHTMLFrame{

}


export {HtmlFrame,GenericHtmlFrame};