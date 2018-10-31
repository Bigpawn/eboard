/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/20 14:25
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/20 14:25
 * @disc:图片Frame 单独的图片Frame 不允许出现滚动条，翻页中只支持滚动条，允许配置
 *      滚动条支持：perfect-scrollbar
 *      高度需要等待图片加载完成后才能确定
 *      无滚动条时需要设置图片大小为填充模式
 */
import {GenericHtmlFrame} from './HtmlFrame';
import {IImageFrame, IImageFrameOptions} from '../interface/IFrame';
import {EBoardEngine} from '../EBoardEngine';
import {ImageUtil} from '../static/ImageUtil';

class ImageFrame extends GenericHtmlFrame<IImageFrameOptions> implements IImageFrame{
    public type="image-frame";
    public src:string;
    protected getChildren():any{
        const image = document.createElement("img");
        this.src = image.src=this.options.content||"";
        image.style.width="100%";
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
        const img = this.html =this.getChildren();// img标签
        htmlWrap.appendChild(img);
        ImageUtil.getSize(img,()=>{
            this.initLayout();
        });
        img.onerror=()=>{
            this.initLayout();
        };
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
}

export {ImageFrame};