/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/20 14:42
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/7/20 14:42
 * @disc:HTMLFrame HTMLFrame 支持配置是否显示滚动条 属于单层Frame，不会出现子Frame
 * HtmlFrame 必然会存在滚动条，滚动条配置不起作用，仅在Image时生效
 * 需要判断是接收端还是发送端？
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
    private htmlWrap:HTMLDivElement;
    public type="html-frame";
    private html:string|HTMLElement|undefined;
    protected getChildren():string|HTMLElement|undefined{
        return this.options.content;
    }
    private attachLoadReLayout(container:HTMLElement){
        const loadImage = document.createElement("img");
        loadImage.src="";
        loadImage.style.display="none";
        loadImage.onerror=()=>{
            container.removeChild(loadImage);
            this.initLayout();
        };
        container.appendChild(loadImage);
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
        const html = this.html =this.getChildren();
        if(typeof html === "string"){
            htmlWrap.innerHTML=html;
            this.attachLoadReLayout(container);
        }else{
            if(void 0 !==html){
                htmlWrap.innerHTML="";
                htmlWrap.appendChild(html);
                // 如果标签是image标签则不添加异常image元素
                this.attachLoadReLayout(container);
                if(html.tagName==="IMG"){
                    html.onload=()=>{
                        this.initLayout();
                    };
                    html.onerror=()=>{
                        this.initLayout();
                    };
                }
            }
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
        // scrollbar 设置  如果是html,必然存在滚动条
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
        this.dom = container;
    }
    protected initLayout(){
        let calcSize=this.calcSize;
        this.dom.style.width=calcSize.width+"px";
        this.dom.style.height=calcSize.height+"px";
        // 如果是图片还是
        const isHtml =typeof(this.html) === "string" || this.html&&this.html.tagName !== "IMG"&&this.html.tagName !== "CANVAS";
        let height:number;
        if(isHtml){
            this.htmlWrap.style.width=calcSize.originWidth + "px";
            if(calcSize.scale!==1){
                this.htmlWrap.style.transform=`scale(${calcSize.scale}) translateZ(0)`;
            }
            const offsetHeight = this.htmlWrap.offsetHeight;
            const scrollHeight = offsetHeight * calcSize.scale;
            if(scrollHeight !== 0 && this.htmlWrap.parentElement){// 排除0 影响
                this.htmlWrap.parentElement.style.height=scrollHeight + "px";
            }
            height = Math.max(scrollHeight,calcSize.height);// css 大小
        }else{
            height = Math.max(this.htmlWrap.offsetHeight,calcSize.height);// css 大小
        }
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