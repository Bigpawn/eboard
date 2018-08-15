/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/14 17:04
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/8/14 17:04
 * @disc:Tab 组建
 */
import "../style/tab.less";
import {EventBus} from '../utils/EventBus';
import {ScrollBar} from './ScrollBar';

export declare interface ITabOptions{
    label:string;
    tabId:string;
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
            if(/eboard-tab/.test(target.className)){
                const tabId = target.getAttribute("data-id");
                this.switchTo(tabId);
                this.trigger("switch",tabId);
            }
        })
    }
    public addTab(options:ITabOptions){
        const tabItem = document.createElement("div");
        tabItem.className="eboard-tab eboard-tab-active";
        tabItem.innerText=options.label;
        tabItem.setAttribute("data-id",options.tabId);
        const active = this.wrap.querySelector(".eboard-tab-active");
        if(void 0 !== active && null !== active){
            active.classList.remove("eboard-tab-active");
        }
        this.wrap.appendChild(tabItem);
        this.scrollbar.update();
        const scrollWidth = this.wrap.scrollWidth;
        const scrollLeft = Math.max(0,scrollWidth - this.wrap.offsetWidth);
        this.scrollbar.scrollTo(0,scrollLeft);
    }
    public removeTab(tabId:string){
        const tabItem = this.wrap.querySelector(`[data-id='${tabId}']`);
        tabItem&&this.wrap.removeChild(tabItem);
        this.trigger("remove",tabId);
    }
    public switchTo(tabId:string){
        const tabItem = this.wrap.querySelector(`[data-id='${tabId}']`);
        if(tabItem&&/eboard-tab-active/.test(tabItem.className)){
            return;
        }
        const active = this.wrap.querySelector(".eboard-tab-active");
        if(void 0 !== active && null !== active){
            active.classList.remove("eboard-tab-active");
        }
        tabItem&&tabItem.classList.add("eboard-tab-active");
    }
}

export {Tab};