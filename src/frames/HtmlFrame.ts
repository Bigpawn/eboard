/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/20 14:42
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/7/20 14:42
 * @disc:HTMLFrame HTMLFrame 支持配置是否显示滚动条 属于单层Frame，不会出现子Frame
 * HtmlFrame 必然会存在滚动条，滚动条配置不起作用，仅在Image时生效
 * 需要判断是接收端还是发送端？
 */
import {GenericBaseFrame} from './BaseFrame';
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
    public scrollbar:ScrollBar;
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
                if(html.tagName!=="IMG"){
                    this.attachLoadReLayout(container);
                }else{
                    // 添加onload 或onerror事件支持
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
        this.engine = new EBoardEngine(placeholder,{
            selection:false,
            skipTargetFind:true,
            containerClass:"eboard-canvas"
        },{
            eDux:this.eDux,
            extraMessage:this.nextMessage
        });
        // scrollbar 设置  如果是html,必然存在滚动条
        switch (this.options.scrollbar){
            case ScrollbarType.horizontal:
                this.scrollbar= new ScrollBar(container,{
                    wheelSpeed: 2,
                    suppressScrollY:true,
                    eDux:this.eDux,
                    extraMessage:this.nextMessage
                });
                break;
            case ScrollbarType.vertical:
                this.scrollbar= new ScrollBar(container,{
                    wheelSpeed: 2,
                    suppressScrollX:true,
                    eDux:this.eDux,
                    extraMessage:this.nextMessage
                });
                break;
            case ScrollbarType.both:
                this.scrollbar= new ScrollBar(container,{
                    wheelSpeed: 2,
                    eDux:this.eDux,
                    extraMessage:this.nextMessage
                });
                break;
            case ScrollbarType.none:
            default:
                if(this.type==="html-frame"){
                    this.scrollbar= new ScrollBar(container,{
                        wheelSpeed: 2,
                        suppressScrollX:true,
                        eDux:this.eDux,
                        extraMessage:this.nextMessage
                    });
                }
                break;
        }
        this.dom = container;
    }
    protected initLayout(){
        let calcSize=this.calc();
        // set container size
        this.dom.style.width=calcSize.width+"px";
        this.dom.style.height=calcSize.height+"px";
        if(typeof(this.html) === "string" || this.html&&this.html.tagName !== "IMG"&&this.html.tagName !== "CANVAS"){
            this.htmlWrap.style.width=calcSize.cacheWidth + "px";
            this.htmlWrap.style.transform=`scale(${calcSize.scale}) translateZ(0)`;
            const offsetHeight = this.htmlWrap.offsetHeight;
            const scaleHeight = offsetHeight * calcSize.scale;
            if(scaleHeight !== 0 && this.htmlWrap.parentElement){// 排除0 影响
                this.htmlWrap.parentElement.style.height=scaleHeight + "px";
            }
            if(void 0 !==this.scrollbar){
                this.scrollbar.update();
            }
            
            const height = Math.max(scaleHeight,calcSize.height);// css 大小
            const dimensions = {
                width:calcSize.dimensions.width,
                height:calcSize.dimensions.width * height / calcSize.width, // 都需要计算，根据dimensions.width 按照比例计算
            };
    
    
            this.engine.eBoardCanvas.setDimensions({width:calcSize.width,height:height});// 样式大小
            this.engine.eBoardCanvas.setDimensions(dimensions,{backstoreOnly:true});// canvas分辨率
        }else{
            // 图片模式不需要进行缩放控制
            const height = Math.max(this.htmlWrap.offsetHeight,calcSize.height);// css 大小
            const dimensions = {
                width:calcSize.dimensions.width,
                height:calcSize.dimensions.width * height / calcSize.width, // 都需要计算，根据dimensions.width 按照比例计算
            };
            this.engine.eBoardCanvas.setDimensions({width:calcSize.width,height:height});// 样式大小
            this.engine.eBoardCanvas.setDimensions(dimensions,{backstoreOnly:true});// canvas分辨率
        }
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