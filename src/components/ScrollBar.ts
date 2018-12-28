/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/3 11:08
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/8/3 11:08
 * @disc:ScrollBar
 */
import {PerfectScrollbarFactory,IScrollFactoryOptions} from 'kxt-web/es/perfectscrollbar';
import {IFrame} from '../interface/IFrame';
import {message} from '../utils/decorators';
import {IScrollBarMessage} from '../interface/IMessage';
import {MessageTag} from '..';
import {Context} from '../static/Context';


declare interface IScrollBarOptions extends IScrollFactoryOptions{
    frameId?:string;
}

class ScrollBar extends PerfectScrollbarFactory{
    public parent:IFrame;
    private readonly container:HTMLElement;
    private readonly frameId?:string;
    public context?:Context;
    constructor(element: string | HTMLElement,options: IScrollBarOptions,context?:Context){
        super(element,Object.assign({
            handlers:['click-rail', 'drag-thumb', 'keyboard','wheel'],
        },options));
        this.context=context;
        this.frameId=options.frameId;
        this.container = typeof element === 'string'?document.querySelector(element) as HTMLElement:element;
        if(void 0 !== this.container){
            this.initScrollEndEvent();
        }
    }
    private initScrollEndEvent(){
        this.container.addEventListener("ps-scroll-end",()=>{
            this.scrollAction();
        });
    }
    
    /**
     * 滚动支持，添加动画
     * @param {number} scrollTop
     * @param {number} scrollLeft
     */
    public scrollTo(scrollTop:number,scrollLeft:number){
        this.scrollTop(scrollTop,true);
        this.scrollLeft(scrollLeft,true);
    }
    private get messageEnable(){
        return this.context&&this.context.getConfig("enable");
    }
    @message
    private scrollAction(){
        // 滚动消息，需要根据enable判断
        return this.messageEnable?{
            tag:MessageTag.Scroll,
            scrollTop:this.container.scrollTop,
            scrollLeft:this.container.scrollLeft,
            totalHeight:this.container.scrollHeight,
            totalWidth:this.container.scrollWidth,
            frameId:this.frameId
        }:undefined
    }
    
    /**
     * 会触发滚动消息
     * @param {IScrollBarMessage} message
     */
    public onMessage(message:IScrollBarMessage){
        const {scrollTop,scrollLeft,totalHeight,totalWidth} = message;
        if(this.container){
            const {scrollHeight,scrollWidth} = this.container;
            this.container.setAttribute("data-scroll-x",(scrollLeft/totalWidth).toString());// 记录属性
            this.container.setAttribute("data-scroll-y",(scrollTop/totalHeight).toString());// 记录属性
            this.scrollTo(scrollTop * scrollHeight/totalHeight,scrollLeft * scrollWidth / totalWidth);
        }
    }
    
    /**
     * 用于恢复，不触发滚动消息
     * 需要等待页面图片下载完成后才能滚动，如果不能滚动则添加属性，等待页面完成后再次调用属性
     */
    public recovery(message:IScrollBarMessage){
        const {scrollTop,scrollLeft,totalHeight,totalWidth} = message;
        if(this.container){
            const {scrollHeight,scrollWidth} = this.container;
            const scrollX = scrollLeft * scrollWidth / totalWidth;
            const scrollY = scrollTop * scrollHeight/totalHeight;
            this.container.scrollLeft = scrollX;
            this.container.scrollTop = scrollY;
            this.container.setAttribute("data-scroll-x",(scrollLeft/totalWidth).toString());// 记录属性
            this.container.setAttribute("data-scroll-y",(scrollTop/totalHeight).toString());// 记录属性
        }
    }
}
export {ScrollBar};