import * as React from 'react';
import {Card} from 'antd';
import "./Tab.less";
import {RefObject,MouseEvent} from "react";


declare interface ITabItem{
    name:string;
    icon?:string;
    tabId:string;
    canRemove?:boolean;
}

declare interface ITabInterface{
    tabs:ITabItem[];
    showPager:boolean;
    activeId?:string;
    scrollOffset:number;
}


class EBoardTab extends React.Component<{}, ITabInterface>{
    private containerRef:RefObject<HTMLDivElement>=React.createRef();
    private scrollRef:RefObject<HTMLDivElement>=React.createRef();
    private addRef:RefObject<HTMLDivElement>=React.createRef();
    constructor(props:{}){
        super(props);
        this.state={tabs:[],showPager:false,scrollOffset:0};
    }
    public add(tabItem:ITabItem,active?:boolean){
        const {tabId} = tabItem;
        const {tabs,activeId} = this.state;
        const items = (this.containerRef.current as HTMLDivElement).querySelectorAll(".tab-item");
        tabs.push(tabItem);
        if(tabs.length===0||!items||items.length===0){
            this.setState({
                tabs:tabs,
                showPager:false,
                activeId:active===false?activeId:tabId,
                scrollOffset:0
            })
        }else{
            const allWidth = (this.containerRef.current as HTMLDivElement).getBoundingClientRect().width;
            const itemWidth = (items[0] as HTMLDivElement).getBoundingClientRect().width;
            const scrollWidth = (this.scrollRef.current as HTMLDivElement).getBoundingClientRect().width;
            const addWidth = (this.addRef.current as HTMLDivElement).getBoundingClientRect().width;
            this.setState({
                tabs:tabs,
                showPager:addWidth+scrollWidth+itemWidth>allWidth,
                activeId:active===false?activeId:tabId
            },()=>{
                this.scrollToTab(tabId);
            });
        }
    };
    public remove(tabId:string){
        const {tabs,activeId} = this.state;
        const items = (this.containerRef.current as HTMLDivElement).querySelectorAll(".tab-item");
        const index = tabs.findIndex((tab)=>tab.tabId===tabId);
        tabs.splice(index,1);
        if(tabs.length===0||!items||items.length===0){
            this.setState({
                tabs:tabs,
                showPager:false,
                activeId:undefined,
                scrollOffset:0
            })
        }else{
            const allWidth = (this.containerRef.current as HTMLDivElement).getBoundingClientRect().width;
            const itemWidth = (items[0] as HTMLDivElement).getBoundingClientRect().width;
            const scrollWidth = (this.scrollRef.current as HTMLDivElement).scrollWidth;
            const addWidth = (this.addRef.current as HTMLDivElement).getBoundingClientRect().width;
            const nextActiveId = activeId === tabId ? tabs[tabs.length - 1].tabId : activeId as string;
            this.setState({
                tabs: tabs,
                showPager: addWidth + scrollWidth - itemWidth > allWidth,
                activeId: activeId === tabId ? tabs[tabs.length - 1].tabId : activeId
            },()=>{
                this.scrollToTab(nextActiveId);
            });
        }
    }
    private scrollToTab(tabId:string){
        const targetTab = (this.containerRef.current as HTMLDivElement).querySelector(`[data-id="${tabId}"]`) as HTMLDivElement;
        const scrollLeft =targetTab.offsetLeft+targetTab.offsetWidth;
        const scrollWidth = (this.scrollRef.current as HTMLDivElement).offsetWidth;
        if(scrollLeft<=scrollWidth){
            this.setState({
                scrollOffset:0
            })
        }else{
            this.setState({
                scrollOffset:scrollLeft-scrollWidth
            })
        }
    }
    public setActive(tabId:string){
        this.setState({
            activeId:tabId
        },()=>{
            this.scrollToTab(tabId);
        })
    }
    private removeItem(e:MouseEvent<HTMLDivElement>){
        const target = e.currentTarget.parentElement as HTMLDivElement;
        const tabId = target.getAttribute("data-id") as string;
        this.remove(tabId);
    }
    render(){
        const {tabs,showPager,activeId,scrollOffset} = this.state;
        return (
            <div className="tab-container" ref={this.containerRef}>
                <div className={`tab-scroll ${showPager?"tab-scroll-pager":""}`} ref={this.scrollRef}>
                    <div className="tab-scroll-bar" style={{transform:`translateX(-${scrollOffset}px)`}}>
                        {
                            tabs.map(tab=>(
                                <div className={`tab-item ${activeId===tab.tabId?"tab-active":""}`} key={tab.tabId} data-id={tab.tabId}>
                                    {tab.name}
                                    {
                                        tab.canRemove!==false?(
                                            <i className="tab-remove eboard-icon eboard-icon-remove" onClick={this.removeItem.bind(this)}/>
                                        ):null
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
                {
                    showPager?[
                        <div className="tab-prev">《</div>,
                        <div className="tab-next">》</div>
                    ]:null
                }
                <div className="tab-add" ref={this.addRef}>+</div>
            </div>
        )
    }
}



class Tab extends React.Component<{}, ITabInterface> {
    protected canvas:any;
    protected container:any;
    private tabRef:RefObject<EBoardTab>=React.createRef();
    constructor(props:{}){
        super(props);
    }
    componentDidMount(){
    }
    private add(){
        (this.tabRef.current as EBoardTab).add({
           tabId:Date.now()+"",
           name:"tab",
        });
    }
    public render(): JSX.Element {
        return (
            <Card bordered title="Simple Canvas" style={{ margin: "16px 16px"}}>
                <EBoardTab ref={this.tabRef}/>
                <button onClick={this.add.bind(this)}>添加</button>
            </Card>
        );
    }
}

export default Tab;
