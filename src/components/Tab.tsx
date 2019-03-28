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
// @ts-ignore
import Hammer from "hammerjs";
import {EBoardTab, ITabItem} from '../rcComponents/Tab';
import * as ReactDOM from "react-dom";
import {EventBus} from '../utils/EventBus';
import * as React from 'react';


export declare interface ITabOptions{
    label:string;
    tabId:string;
    icon?:string;
    canRemove?:boolean;
}

export enum TabEventEnum{
    Add="add",
    Switch="switch",
    Remove="remove",
    API_ADD="api:add",
    API_SWITCH="api:switch",
    API_REMOVE="api:remove",
}


class Tab{
    private tabIdList:string[]=[];
    private readonly visible?:boolean;
    private eventBus:EventBus=new EventBus();
    constructor(container:HTMLDivElement,visible?:boolean){
        this.visible=void 0 === visible||null === visible?true:visible;
        if(this.visible){
            ReactDOM.render(<EBoardTab eventBus={this.eventBus}/>,container);
        }
    }
    public on(name:TabEventEnum,listener:EventListenerOrEventListenerObject){
        this.eventBus.on(name,listener);
    }
    
    public addTab(tabItem:ITabItem){
        this.tabIdList.push(tabItem.tabId);
        this.eventBus.trigger(TabEventEnum.API_ADD,tabItem);
    }
    public switchTo(tabId:string){
        this.eventBus.trigger(TabEventEnum.API_SWITCH,tabId);
    }
    public removeTab(tabId:string){
        this.tabIdList=this.tabIdList.filter((id)=>id!==tabId);
        this.eventBus.trigger(TabEventEnum.API_REMOVE,tabId);
    }
    public getLastTabId(){
        return this.tabIdList[this.tabIdList.length-1];
    }
}

export {Tab};