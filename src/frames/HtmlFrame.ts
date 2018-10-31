/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/20 14:42
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/7/20 14:42
 * @disc:HTMLFrame
 * frame 只要调用就会显示在dom中
 */
import {GenericBaseFrame} from './EmptyFrame';
import {EBoardEngine} from '../EBoardEngine';
import {IFrame,IHTMLFrame, IHTMLFrameOptions} from '../interface/IFrame';
import "perfect-scrollbar/css/perfect-scrollbar.css";
import "../style/scrollbar.less";
import {ScrollBar} from '../components/ScrollBar';

export enum ScrollbarType{
    horizontal,
    vertical,
    both,
    none
}

class GenericHtmlFrame<T extends IHTMLFrameOptions> extends GenericBaseFrame<T> implements IFrame{
    protected htmlWrap:HTMLDivElement;
    public type="html-frame";
    protected html?:string|HTMLDivElement;
    protected getChildren(){
        return this.options.content;
    }
    protected attachLoadReLayout(container:HTMLElement){
        const loadImage = document.createElement("img");
        loadImage.src="";
        loadImage.style.display="none";
        loadImage.onerror=()=>{
            container.removeChild(loadImage);
            this.initLayout();
        };
        container.appendChild(loadImage);
    }
    protected initScrollbar(container:HTMLDivElement){
        switch (this.options.scrollbar){
            case ScrollbarType.horizontal:
                this.scrollbar= new ScrollBar(container,{
                    wheelSpeed: 2,
                    suppressScrollY:true,
                    frameId:this.frameId
                },this.context);
                break;
            case ScrollbarType.vertical:
                this.scrollbar= new ScrollBar(container,{
                    wheelSpeed: 2,
                    suppressScrollX:true,
                    frameId:this.frameId
                },this.context);
                break;
            case ScrollbarType.both:
                this.scrollbar= new ScrollBar(container,{
                    wheelSpeed: 2,
                    frameId:this.frameId
                },this.context);
                break;
            case ScrollbarType.none:
            default:
                if(this.type==="html-frame"){
                    this.scrollbar= new ScrollBar(container,{
                        wheelSpeed: 2,
                        suppressScrollX:true,
                        frameId:this.frameId
                    },this.context);
                }
                break;
        }
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
        const html = this.html =this.getChildren();
        if(void 0 !== html){
            if(typeof html === "string"){
                htmlWrap.innerHTML=html;
            }else{
                htmlWrap.appendChild(html);
            }
            this.attachLoadReLayout(container);// 显示后重新布局
        }
        // 通过image模拟实现监听显示事件
        const placeholder = document.createElement("canvas");
        placeholder.innerHTML="当前浏览器不支持Canvas,请升级浏览器";
        container.appendChild(htmlContainer);
        container.appendChild(placeholder);
        this.engine = new EBoardEngine(placeholder,this.context,{
            selection:false,
            skipTargetFind:true,
            containerClass:"eboard-canvas",
            frame:this.frameId,
            group:this.groupId
        });
        this.initScrollbar(container);
        this.dom = container;
    }
    protected recoveryScrollbar(){
        setTimeout(()=>{
            const scrollX = this.dom.getAttribute("data-scroll-x");
            const scrollY = this.dom.getAttribute("data-scroll-y");
            const {scrollHeight,scrollWidth} = this.dom;
            if(scrollX){
                this.dom.scrollLeft = Number(scrollX)*scrollWidth;
            }
            if(scrollY){
                this.dom.scrollTop = Number(scrollY)*scrollHeight;
            }
        },0);
    }
    protected initLayout(){
        let calcSize=this.calcSize;
        this.dom.style.width=calcSize.width+"px";
        this.dom.style.height=calcSize.height+"px";
        // 如果是图片还是
        this.htmlWrap.style.width=calcSize.originWidth + "px";
        if(calcSize.scale!==1){
            this.htmlWrap.style.transform=`scale(${calcSize.scale}) translateZ(0)`;
        }
        const offsetHeight = this.htmlWrap.offsetHeight;
        const scrollHeight = offsetHeight * calcSize.scale;
        if(scrollHeight !== 0 && this.htmlWrap.parentElement){// 排除0 影响
            this.htmlWrap.parentElement.style.height=scrollHeight + "px";
        }
        let height = Math.max(scrollHeight,calcSize.height);// css 大小
        if(void 0 !==this.scrollbar){
            this.scrollbar.update();
        }
        const dimensions = {
            width:calcSize.dimensions.width,
            height:calcSize.dimensions.width * height / calcSize.width, // 都需要计算，根据dimensions.width 按照比例计算
        };
        this.engine.eBoardCanvas.setDimensions({width:calcSize.width,height:height});// 样式大小
        this.engine.eBoardCanvas.setDimensions(dimensions,{backstoreOnly:true});// canvas分辨率
        this.recoveryScrollbar();
    }
    public destroy(){
        super.destroy();
        if(this.scrollbar){
            this.scrollbar=undefined as any;
        }
    }
}


class HtmlFrame extends GenericHtmlFrame<IHTMLFrameOptions> implements IHTMLFrame{

}


export {HtmlFrame,GenericHtmlFrame};