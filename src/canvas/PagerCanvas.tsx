/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/5 15:52
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/5 15:52
 * @disc：翻页Canvas 需要进行runtime 管理  该组件禁止render
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {EBoardEngine} from '../EBoardEngine';
import {EBoardCanvas} from '../EBoardCanvas';
import {HTMLCanvas, IHTMLCanvasProps} from './HTMLCanvas';
import {ImageCanvas} from './ImageCanvas';
import {Pagination} from './Pagination';
import {PageTurn} from './PageTurn';
import {BaseCanvas} from './BaseCanvas';

export enum PageType{
    Image="image",
    Pdf="pdf",
    Html="html"
}

export declare interface IPageData{
    type:PageType;
    data:string;
    render?:boolean;// 是否开始render
}

export declare interface IPagerCanvasProps extends IHTMLCanvasProps{
    pageDataSet:IPageData[];// 必传，如果没有则不创建该Element
    currentIndex?:number
}

export declare interface IEBoardCache{
    eBoardEngine:EBoardEngine;
    eBoardCanvas:EBoardCanvas;
    element:HTMLElement;
}



class PagerCanvas extends React.Component<IPagerCanvasProps>{
    private pageDataSet:IPageData[];
    private currentIndex:number=1;// 默认第一页
    private pagerContainer:HTMLDivElement;
    private eBoardCacheMap=new Map<number,IEBoardCache>();
    private canvas:BaseCanvas;
    private PageTurn:PageTurn;
    private Pagination:Pagination;
    constructor(props:IPagerCanvasProps){
        super(props);
        // props.pageDataSet&&(this.pageDataSet=props.pageDataSet);
        this.onPagerChange=this.onPagerChange.bind(this);
        this.changeCallback=this.changeCallback.bind(this);
        this.PageTurn = new PageTurn(this.changeCallback);
        let {pageDataSet=[],currentIndex=1} = props;
        this.pageDataSet=pageDataSet;
        this.currentIndex=currentIndex;
    }
    private changeCallback(currentElement:HTMLElement,nextElement:HTMLElement){
        // 从节点中移除currentElement 并且进行缓存
        (currentElement.parentElement as HTMLElement).removeChild(currentElement);
    }
    private onPagerChange(index:number){
        // index切换
        if(index===this.currentIndex){
            return;
        }else{
            this.Pagination&&this.Pagination.setCurrentIndex(index);
            this.addPage(index,index>this.currentIndex);
            this.currentIndex=index;// 不能保证顺序
        }
    }
    private addPage(index:number,next:boolean){
        // 如果缓存中有则从缓存中取，否则创建
        const cache = this.eBoardCacheMap.get(index);
        if(void 0 !==cache){
            const nextElement = cache.element;
            nextElement.className +="eboard-pager-hiden";
            this.pagerContainer.insertBefore(nextElement,this.pagerContainer.firstElementChild);
            if(next){
                this.PageTurn.next(this.pagerContainer.children[1] as HTMLElement,nextElement);
            }else{
                this.PageTurn.prev(this.pagerContainer.children[1] as HTMLElement,nextElement);
            }
        }else{
            // 新页面，未缓存，需要动态创建
            const pageData = this.pageDataSet[index-1];
            const wraper=document.createElement("div");
            wraper.style.position="absolute";
            wraper.style.width="100%";
            wraper.style.height="100%";
            wraper.style.left="-100%";
            this.pagerContainer.insertBefore(wraper,this.pagerContainer.firstElementChild);
            const {pageDataSet,currentIndex,...props} = this.props;
            let newCanvas:ImageCanvas;
            ReactDOM.render(
                pageData.type===PageType.Image?<ImageCanvas className="eboard-pager-hide" ref={(ref:ImageCanvas)=>newCanvas=ref} {...props} src={pageData.data}/>:
                    <HTMLCanvas ref={(ref:HTMLCanvas)=>this.canvas=ref} {...props} children={pageData.data}/>,
                wraper,
                ()=>{
                    const eBoardEngine = newCanvas.getEBoardEngine();
                    const child = wraper.firstElementChild as HTMLElement;
                    this.eBoardCacheMap.set(this.currentIndex,{
                        eBoardEngine:eBoardEngine,
                        eBoardCanvas:eBoardEngine.eBoardCanvas,
                        element:child,
                    });
                    this.pagerContainer.replaceChild(child,wraper);
                    if(next){
                        this.PageTurn.next(this.pagerContainer.children[1] as HTMLElement,child);
                    }else{
                        this.PageTurn.prev(this.pagerContainer.children[1] as HTMLElement,child);
                    }
                }
            );
        }
    }
    shouldComponentUpdate(){
        return false;
    }
    componentDidMount(){
        // 父容器样式修改
        if(this.pagerContainer){
            const child = this.pagerContainer.firstElementChild as HTMLElement;
            this.pagerContainer.style.width = child.offsetWidth + "px";
            this.pagerContainer.style.height = child.offsetHeight + "px";
            const eBoardEngine = this.canvas.getEBoardEngine();
            this.eBoardCacheMap.set(this.currentIndex,{
                eBoardEngine:eBoardEngine,
                eBoardCanvas:eBoardEngine.eBoardCanvas,
                element:child,
            });
        }
    }
    public go(index:number){
        if(index === this.currentIndex){
            return;
        }else{
            this.Pagination&&this.Pagination.setCurrentIndex(index);
            this.addPage(index,index>this.currentIndex);
            this.currentIndex=index;
        }
    }
    render(){
        const {pageDataSet,currentIndex,...props} = this.props;
        const pageData = pageDataSet[this.currentIndex-1];
        const totalPages = this.pageDataSet.length;
        // 当前显示的需要显示，其他的则需要进行隐藏
        return (
            <div className="eboard-pager" ref={(ref:HTMLDivElement)=>this.pagerContainer=ref} style={{width:"100%",height:"100%"}}>
                {/*显示第一个需要显示的，后面都进行动态创建，动态创建怎么获取其实力*/}
                {
                    pageData.type===PageType.Image?<ImageCanvas ref={(ref:ImageCanvas)=>this.canvas=ref} {...props} src={pageData.data}/>:<HTMLCanvas ref={(ref:HTMLCanvas)=>this.canvas=ref} {...props} children={pageData.data}/>
                }
                {
                    totalPages>1?<Pagination ref={(ref:Pagination)=>this.Pagination=ref} onPagerChange={this.onPagerChange} defaultCurrentIndex={this.currentIndex} totalPages={this.pageDataSet.length}/>:null
                }
            </div>
        );
    }
}

export {PagerCanvas}
