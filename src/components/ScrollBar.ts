/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/3 11:08
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/8/3 11:08
 * @disc:ScrollBar
 */

import PerfectScrollbar from 'perfect-scrollbar';
import {IFrame} from '../interface/IFrame';
import Timer = NodeJS.Timer;
import {message} from '../utils/decorators';
import {IMessage, MessageTagEnum} from '../middlewares/MessageMiddleWare';

export declare interface IScrollBarMessage extends IMessage{
    scrollTop:number;
    scrollLeft:number;
    totalHeight:number;
    totalWidth:number;
}


class ScrollBar extends PerfectScrollbar{
    public parent:IFrame;
    private container:HTMLElement;
    private delPixel:number=5;
    private scrollInterval:Timer;
    constructor(element: string | HTMLElement, options?: PerfectScrollbar.Options,parent?:IFrame){
        super(element,options);
        this.container = typeof element === 'string'?document.querySelector(element) as HTMLElement:element;
        parent && (this.parent = parent);
        if(void 0 !== this.container){
            this.initScrollEndEvent();
        }
    }
    private initScrollEndEvent(){
        let scrollTimer:Timer,_self = this;
        this.container.addEventListener("ps-scroll-x",function(e: any) {
            if(void 0 !== scrollTimer){
                clearTimeout(scrollTimer);
                scrollTimer = undefined as any;
            }
            scrollTimer = setTimeout(function () {
                _self.scrollAction();
            }, 500)
        });
        this.container.addEventListener("ps-scroll-y",function(e: any) {
            if(void 0 !== scrollTimer){
                clearTimeout(scrollTimer);
                scrollTimer = undefined as any;
            }
            scrollTimer = setTimeout(function () {
                _self.scrollAction();
            }, 500)
        });
    }
    
    /**
     * 滚动支持，添加动画
     * @param {number} scrollTop
     * @param {number} scrollLeft
     */
    private scrollTo(scrollTop:number,scrollLeft:number){
        if(void 0 !== this.scrollInterval){
            // 如果当前在滚动过程中先暂停
            clearInterval(this.scrollInterval);
            this.scrollInterval=undefined as any;
        }
        this.scrollInterval=setInterval(()=>{
            const {scrollTop:top,scrollLeft:left} = this.container;
            const targetScrollTop = scrollTop>top?Math.min(top+this.delPixel,scrollTop):Math.max(top-this.delPixel,scrollTop);
            const targetScrollLeft = scrollLeft>left?Math.min(left+this.delPixel,scrollLeft):Math.max(left-this.delPixel,scrollLeft);
            this.container.scrollLeft = targetScrollLeft;
            this.container.scrollTop = targetScrollTop;
            if(targetScrollTop === scrollTop && targetScrollLeft === scrollLeft){
                clearInterval(this.scrollInterval);
                this.scrollInterval=undefined as any;
            }
        },1);
    }
    @message
    private scrollAction(){
        // 返回总高度
        return {
            tag:MessageTagEnum.Scroll,
            scrollTop:this.container.scrollTop,
            scrollLeft:this.container.scrollLeft,
            totalHeight:this.container.scrollHeight,
            totalWidth:this.container.scrollWidth,
        }
    }
    
    public onMessage(message:IScrollBarMessage){
        const {scrollTop,scrollLeft,totalHeight,totalWidth} = message;
        if(this.container){
            const {scrollHeight,scrollWidth} = this.container;
            this.scrollTo(scrollTop * scrollHeight/totalHeight,scrollLeft * scrollWidth / totalWidth);
        }
    }
}
export {ScrollBar};