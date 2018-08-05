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

class ImageFrame extends GenericHtmlFrame<IImageFrameOptions> implements IImageFrame{
    public type="image-frame";
    public src:string;
    protected getChildren(){
        const image = document.createElement("img");
        image.src=this.options.content||"";
        image.style.width="100%";
        image.onload=()=>{
            this.initLayout();
        };
        image.onerror=()=>{
            this.initLayout();
        };
        return image;
    }
}

export {ImageFrame};