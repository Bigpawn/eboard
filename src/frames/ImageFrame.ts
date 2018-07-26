/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/20 14:25
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/20 14:25
 * @disc:图片Frame 单独的图片Frame 不允许出现滚动条，翻页中只支持滚动条，允许配置
 *      滚动条支持：perfect-scrollbar
 */
import {HtmlFrame} from './HtmlFrame';
import {IImageFrame, IImageFrameOptions} from './IFrame';

class ImageFrame extends HtmlFrame implements IImageFrame{
    public src:string;
    protected initialize(options:IImageFrameOptions){
        super.initialize(options);
        this.src=options.src||"";
    }
    protected getChildren(){
        return `<img src="${this.src}" style="width:100%"/>`;
    }
}

export {ImageFrame};