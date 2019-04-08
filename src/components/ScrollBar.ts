/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/3 11:08
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/8/3 11:08
 * @disc:ScrollBar
 */
import {
    PerfectScrollbarFactory,IScrollFactoryOptions
} from './perfectscrollbar/perfectscrollbarfactory';
import {IFrame} from '../interface/IFrame';
import {authorityMaster, message} from '../utils/decorators';
import {IScrollBarMessage} from '../interface/IMessage';
import {Authority, MessageTag} from '..';
import {Context} from '../static/Context';

declare interface IScrollBarOptions extends IScrollFactoryOptions{
    frameId?:string;
}

class ScrollBar{
    public parent:IFrame;
    private readonly container:HTMLElement;
    private readonly frameId?:string;
    public context?:Context;
    private scrollbar:PerfectScrollbarFactory;
    public static scrollbarList:PerfectScrollbarFactory[]=[];
    constructor(element: string | HTMLElement,options: IScrollBarOptions,context?:Context){
        const disabled = context&&context.config.authority!==Authority.Master&&context.config.authority!==Authority.Operator;
        this.container = typeof element === 'string'?document.querySelector(element) as HTMLElement:element;
        this.scrollbar=new PerfectScrollbarFactory(this.container,Object.assign({
            handlers:['click-rail', 'drag-thumb', 'keyboard','wheel'],
            disabled
        },options));
        this.context=context;
        this.frameId=options.frameId;
        this.initScrollEndEvent();
        if(context){
            ScrollBar.scrollbarList.push(this.scrollbar);
        }
    }
    private initScrollEndEvent(){
        this.container.addEventListener("ps-scroll-end",()=>{
            this.scrollAction();
        });
    }
    public update(){
        this.scrollbar.update();
    }
    
    public scrollToTop(scrollTop:number){
        this.scrollbar.scrollTop(scrollTop,true);
    }
    
    public scrollToLeft(scrollLeft:number){
        this.scrollbar.scrollLeft(scrollLeft,true);
    }
    
    @message
    @authorityMaster
    private scrollAction(){
        return {
            tag:MessageTag.Scroll,
            scrollTop:this.container.scrollTop,
            totalHeight:this.container.scrollHeight,
            totalWidth:this.container.scrollWidth,
            frameId:this.frameId
        }
    }
    
    /**
     * 会触发滚动消息
     * @param {IScrollBarMessage} message
     */
    public onMessage(message:IScrollBarMessage){
        const {scrollTop,totalHeight} = message;
        if(this.container){
            const {scrollHeight} = this.container;
            this.container.setAttribute("data-scroll-y",(scrollTop/totalHeight).toString());// 记录属性
            this.scrollToTop(scrollTop * scrollHeight/totalHeight);
        }
    }
    
    /**
     * 用于恢复，不触发滚动消息
     * 需要等待页面图片下载完成后才能滚动，如果不能滚动则添加属性，等待页面完成后再次调用属性
     */
    public recovery(message:IScrollBarMessage){
        const {scrollTop,totalHeight} = message;
        if(this.container){
            const {scrollHeight} = this.container;
            const scrollY = scrollTop * scrollHeight/totalHeight;
            this.container.scrollTop = scrollY;
            this.container.setAttribute("data-scroll-y",(scrollTop/totalHeight).toString());// 记录属性
        }
    }
}
export {ScrollBar};