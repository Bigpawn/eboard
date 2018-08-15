/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/14 17:04
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/8/14 17:04
 * @disc:Tab 组建
 * 通过消息调用API可能死循环
 * 支持添加按钮，添加空白项
 */
import "../style/tab.less";
import "../font/iconfont.css";
import {EventBus} from '../utils/EventBus';
import {ScrollBar} from './ScrollBar';

export declare interface ITabOptions{
    label:string;
    tabId:string;
}

export enum TabEventEnum{
    Add="add",
    Switch="switch",
    Remove="remove"
}


class Tab extends EventBus{
    private wrap:HTMLDivElement;
    private scrollbar:ScrollBar;
    constructor(container:HTMLDivElement){
        super();
        this.wrap=container;
        this.initScrollbar(container);
        this.initEvent();
    }
    private initScrollbar(wrap:HTMLDivElement){
        this.scrollbar= new ScrollBar(wrap,{
            wheelSpeed: 2,
            suppressScrollY:true,
        });
    }
    private initEvent(){
        this.wrap.addEventListener("click",(e:any)=>{
            const target = e.target||e.srcElement;
            if(target.classList.contains("eboard-tab")){
                const tabId = target.getAttribute("data-id");
                this.switchTo(tabId);
            }else if(target.classList.contains("eboard-tab-remove")){
                const tabId = target.parentElement.getAttribute("data-id");
                this.removeTab(tabId);
            }
        })
    }
    
    /**
     * 是否发送消息参数化
     * @param {ITabOptions} options
     * @param {boolean} silence 是否静默
     */
    public addTab(options:ITabOptions,silence?:boolean){
        const tabItem = document.createElement("div");
        tabItem.className="eboard-tab eboard-tab-active";
        tabItem.innerText=options.label;
        tabItem.setAttribute("data-id",options.tabId);
        const remove = document.createElement("i");
        remove.className="eboard-tab-remove eboard-icon eboard-icon-remove";
        tabItem.appendChild(remove);
        const active = this.wrap.querySelector(".eboard-tab-active");
        if(void 0 !== active && null !== active){
            active.classList.remove("eboard-tab-active");
        }
        this.wrap.appendChild(tabItem);
        this.scrollbar.update();
        const scrollWidth = this.wrap.scrollWidth;
        const scrollLeft = Math.max(0,scrollWidth - this.wrap.offsetWidth);
        this.scrollbar.scrollTo(0,scrollLeft);
        !silence&&this.trigger(TabEventEnum.Add,options);
    }
    public removeTab(tabId:string,silence?:boolean){
        const tabItem = this.wrap.querySelector(`[data-id='${tabId}']`);
        tabItem&&this.wrap.removeChild(tabItem);
        !silence&&this.trigger(TabEventEnum.Remove,tabId);
    }
    public switchTo(tabId:string,silence?:boolean){
        const tabItem = this.wrap.querySelector(`[data-id='${tabId}']`);
        if(tabItem&&/eboard-tab-active/.test(tabItem.className)){
            return;
        }
        const active = this.wrap.querySelector(".eboard-tab-active");
        if(void 0 !== active && null !== active){
            active.classList.remove("eboard-tab-active");
        }
        tabItem&&tabItem.classList.add("eboard-tab-active");
        !silence&&this.trigger(TabEventEnum.Switch,tabId);
    }
}

export {Tab};