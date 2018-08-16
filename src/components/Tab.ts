/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/14 17:04
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/8/14 17:04
 * @disc:Tab 组建
 * 通过消息调用API可能死循环
 * 支持添加按钮，添加空白项
 * API 纯净化，执行API不抛出事件，内部操作会抛出响应事件，外部根据事件来调用相应处理API
 */
import "../style/tab.less";
import "../font/iconfont.css";
import {EventBus} from '../utils/EventBus';
import {ScrollBar} from './ScrollBar';
import "../utils/ClassListPolyfill";// polyfill

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
    private container:HTMLDivElement;
    private scrollbar:ScrollBar;
    private addBtn:HTMLDivElement;
    constructor(container:HTMLDivElement){
        super();
        this.initContainer(container);
        this.initAddBtn();
        this.initScrollbar();
        this.initEvent();
    }
    private initContainer(container:HTMLDivElement){
        const tabContainer = document.createElement("div");
        tabContainer.className = "eboard-tabs";
        container.appendChild(tabContainer);
        this.container = tabContainer;
    }
    private initAddBtn(){
        this.container.innerHTML="";
        const addBtn = document.createElement("div");
        addBtn.className="eboard-tab-add eboard-icon eboard-icon-add";
        this.container.appendChild(addBtn);
        this.addBtn=addBtn;
    }
    private initScrollbar(){
        this.scrollbar= new ScrollBar(this.container,{
            wheelSpeed: 2,
            suppressScrollY:true,
        });
    }
    private initEvent(){
        this.container.addEventListener("click",(e:any)=>{
            const target = e.target||e.srcElement;
            const classList = target.classList;
            if(classList.contains("eboard-tab")){
                if(!classList.contains("eboard-tab-active")){
                    const tabId = target.getAttribute("data-id");
                    this.trigger(TabEventEnum.Switch,tabId);// 非当前激活项
                }
            }else if(classList.contains("eboard-tab-remove")){
                const tabId = target.parentElement.getAttribute("data-id");
                this.trigger(TabEventEnum.Remove,tabId);
            }else if(target.classList.contains("eboard-tab-add")){
                this.trigger(TabEventEnum.Add);
            }
        })
    }
    
    /**
     * add Tab
     * @param {ITabOptions} options
     */
    public addTab(options:ITabOptions){
        const tabItem = document.createElement("div");
        tabItem.className="eboard-tab eboard-tab-active";
        tabItem.innerText=options.label;
        tabItem.setAttribute("data-id",options.tabId);
        const remove = document.createElement("i");
        remove.className="eboard-tab-remove eboard-icon eboard-icon-remove";
        tabItem.appendChild(remove);
        const active = this.container.querySelector(".eboard-tab-active");
        if(void 0 !== active && null !== active){
            active.classList.remove("eboard-tab-active");
        }
        this.container.insertBefore(tabItem,this.addBtn);
        this.scrollbar.update();
        const scrollWidth = this.container.scrollWidth;
        const scrollLeft = Math.max(0,scrollWidth - this.container.offsetWidth);
        this.scrollbar.scrollTo(0,scrollLeft);
    }
    
    /**
     * remove Tab
     * @param {string} tabId
     */
    public removeTab(tabId:string){
        const tabItem = this.container.querySelector(`[data-id='${tabId}']`);
        tabItem&&this.container.removeChild(tabItem);
    }
    
    /**
     * switch Tab
     * @param {string} tabId
     */
    public switchTo(tabId:string){
        const tabItem = this.container.querySelector(`[data-id='${tabId}']`);
        if(tabItem&&/eboard-tab-active/.test(tabItem.className)){
            return;
        }
        const active = this.container.querySelector(".eboard-tab-active");
        if(void 0 !== active && null !== active){
            active.classList.remove("eboard-tab-active");
        }
        tabItem&&tabItem.classList.add("eboard-tab-active");
    }
}

export {Tab};