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
    private imageWrap:HTMLDivElement;
    protected getChildren():any{
        const image = document.createElement("img");
        this.src = image.src=this.options.content||"";
        image.style.width="100%";
        return image;
    }
    protected initEngine(){
        const {container} = this.options as any;
        const wrap = document.createElement("div");
        this.dom = wrap;
        wrap.className="eboard-container";
        const imageContainer = document.createElement("div");
        imageContainer.className="eboard-html-container";
        const imageWrap = document.createElement("div");
        imageWrap.className="eboard-html";
        this.imageWrap=imageWrap;
        imageContainer.appendChild(imageWrap);
        const img = this.getChildren();// img标签
        imageWrap.appendChild(img);
        ImageUtil.getSize(img,()=>{
            this.initLayout();
        });
        const placeholder = document.createElement("canvas");
        placeholder.innerHTML="当前浏览器不支持Canvas,请升级浏览器";
        wrap.appendChild(imageContainer);
        wrap.appendChild(placeholder);
        this.engine = new EBoardEngine(placeholder,this.context,{
            selection:false,
            skipTargetFind:true,
            containerClass:"eboard-canvas",
            frame:this.frameId,
            group:this.groupId
        });
        container.appendChild(wrap); // fix engine not defined
        this.initScrollbar(wrap);
    }
    protected initLayout(){
        let calcSize=this.calcSize;
        this.dom.style.width=calcSize.width+"px";
        this.dom.style.height=calcSize.height+"px";
        let height = Math.max(this.imageWrap.offsetHeight,calcSize.height);// css 大小
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
}

export {ImageFrame};