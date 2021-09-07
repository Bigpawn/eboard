import * as React from 'react';
import {Card} from 'antd';
// import "./Tab.less";
import {RefObject,MouseEvent} from "react";
import {autobind} from "core-decorators";

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
    private calcItem:HTMLDivElement;
    private prevBtnWidth:number=0;
    private nextBtnWidth:number=0;
    constructor(props:{}){
        super(props);
        this.state={tabs:[],showPager:false,scrollOffset:0};
    }
    private calcItemWidth(tabName:string){
        if(!this.calcItem){
            const tabItem = document.createElement("div");
            tabItem.className="tab-item tab-item-calc";
            this.calcItem=tabItem;
            (this.containerRef.current as HTMLDivElement).appendChild(this.calcItem);
        }
        this.calcItem.innerText=tabName;
        return this.calcItem.getBoundingClientRect().width;
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
            // calc nextItemWidth
            const itemWidth = this.calcItemWidth(tabItem.name);
            const scrollWidth = (this.scrollRef.current as HTMLDivElement).getBoundingClientRect().width;
            const addWidth = (this.addRef.current as HTMLDivElement).getBoundingClientRect().width;
            const {showPager} = this.state;
            const nextShowPager = showPager?showPager:addWidth+scrollWidth+itemWidth>allWidth;
            this.setState({
                tabs:tabs,
                showPager:nextShowPager,
                activeId:active===false?activeId:tabId
            },()=>{
                this.scrollToTab(tabId,showPager!==nextShowPager);
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
            const itemWidth = (items[index] as HTMLDivElement).getBoundingClientRect().width;
            const scrollWidth = (this.scrollRef.current as HTMLDivElement).scrollWidth;
            const addWidth = (this.addRef.current as HTMLDivElement).getBoundingClientRect().width;
            const nextActiveId = activeId === tabId ? tabs[tabs.length - 1].tabId : activeId as string;
            const nextShowPager = addWidth + scrollWidth - itemWidth > allWidth;
            const {showPager} = this.state;
            this.setState({
                tabs: tabs,
                showPager: nextShowPager,
                activeId: nextActiveId
            },()=>{
                this.scrollToTab(nextActiveId,showPager!==nextShowPager);
            });
        }
    }
    private scrollToTab(tabId:string,showPagerChange:boolean){
        const targetTab = (this.containerRef.current as HTMLDivElement).querySelector(`[data-id="${tabId}"]`) as HTMLDivElement;
        const scrollLeft =targetTab.offsetLeft+targetTab.offsetWidth;
        let scrollWidth = (this.scrollRef.current as HTMLDivElement).offsetWidth;
        if(showPagerChange){
            const prevBtn = (this.containerRef.current as HTMLDivElement).querySelector(".tab-prev") as HTMLDivElement;
            const nextBtn = (this.containerRef.current as HTMLDivElement).querySelector(".tab-prev") as HTMLDivElement;
            if(prevBtn&&nextBtn){
                scrollWidth=scrollWidth-this.prevBtnWidth-this.nextBtnWidth;
            }else{
                scrollWidth=scrollWidth+this.prevBtnWidth+this.nextBtnWidth;
            }
        }
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
    componentWillUpdate(
        nextProps: Readonly<{}>, nextState: Readonly<ITabInterface>,
        nextContext: any): void {
        const prevBtn = (this.containerRef.current as HTMLDivElement).querySelector(".tab-prev") as HTMLDivElement;
        const nextBtn = (this.containerRef.current as HTMLDivElement).querySelector(".tab-prev") as HTMLDivElement;
        if(prevBtn&&nextBtn){
            this.prevBtnWidth=prevBtn.offsetWidth;
            this.nextBtnWidth=nextBtn.offsetWidth;
        }
    }
    componentDidUpdate(
        prevProps: Readonly<{}>, prevState: Readonly<ITabInterface>,
        snapshot?: any): void {
        const prevBtn = (this.containerRef.current as HTMLDivElement).querySelector(".tab-prev") as HTMLDivElement;
        const nextBtn = (this.containerRef.current as HTMLDivElement).querySelector(".tab-prev") as HTMLDivElement;
        if(prevBtn&&nextBtn){
            this.prevBtnWidth=prevBtn.offsetWidth;
            this.nextBtnWidth=nextBtn.offsetWidth;
        }
    }
    public setActive(tabId:string){
        this.setState({
            activeId:tabId
        },()=>{
            this.scrollToTab(tabId,false);
        })
    }
    @autobind
    private removeItem(e:MouseEvent<HTMLDivElement>){
        const target = e.currentTarget.parentElement as HTMLDivElement;
        const tabId = target.getAttribute("data-id") as string;
        this.remove(tabId);
    }
    @autobind
    private onItemClick(e:MouseEvent<HTMLDivElement>){
        const target = e.target as HTMLDivElement;
        if(/tab-remove/.test(target.className)){
            return;
        }
        const tabId = target.getAttribute("data-id") as string;
        this.setActive(tabId);
    }
    render(){
        const {tabs,showPager,activeId,scrollOffset} = this.state;
        return (
            <div className="tab-container" ref={this.containerRef}>
                <div className={`tab-scroll ${showPager?"tab-scroll-pager":""}`} ref={this.scrollRef}>
                    <div className="tab-scroll-bar" style={{transform:`translateX(-${scrollOffset}px)`}}>
                        {
                            tabs.map(tab=>(
                                <div className={`tab-item ${activeId===tab.tabId?"tab-active":""}`} key={tab.tabId} data-id={tab.tabId} onClick={this.onItemClick}>
                                    {tab.name}
                                    {
                                        tab.canRemove!==false?(
                                            <i className="tab-remove eboard-icon eboard-icon-remove" onClick={this.removeItem}/>
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
        const names=["白板","测验讲解","wendang1","文档2","文档——01","图片——001","测验讲解y"];
        const random = Math.floor(Math.random()*7);
        (this.tabRef.current as EBoardTab).add({
           tabId:Date.now()+"",
           name:names[random],
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
