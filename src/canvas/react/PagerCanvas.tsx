/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/5 15:52
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/5 15:52
 * @disc：翻页Canvas 需要进行runtime 管理  该组件禁止render
 *
 * bug: props rerender
 *
 *
 *
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {EBoardEngine} from '../../EBoardEngine';
import {EBoardCanvas} from '../../EBoardCanvas';
import {HTMLCanvas, IHTMLCanvasProps} from './HTMLCanvas';
import {ImageCanvas} from './ImageCanvas';
import {Pagination} from '../../components/Pagination';
import {PageTurn} from '../PageTurn';
import {BaseCanvas} from './BaseCanvas';
import {pipMode} from '../../utils/decorators';
import {
    PDFDocumentProxy, PDFJSStatic, PDFPageProxy,
    PDFPromise,
} from 'pdfjs-dist';
import {PdfCanvas} from './PdfCanvas';

const pdfjsLib:PDFJSStatic  = require('pdfjs-dist/build/pdf.js');
const PdfjsWorker = require('pdfjs-dist/build/pdf.worker.js');
(pdfjsLib as any).GlobalWorkerOptions.workerPort = new PdfjsWorker();

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
    pageDataSet?:IPageData[];// 必传，如果没有则不创建该Element
    currentIndex?:number;
    filePath?:string;// load pdf file or ...
}

export declare interface IEBoardCache{
    eBoardEngine:EBoardEngine;
    eBoardCanvas:EBoardCanvas;
    element:HTMLElement;
}

/**
 * 分页canvas
 */
class PagerCanvas extends React.Component<IPagerCanvasProps>{
    private pageDataSet:IPageData[]=[];
    private currentIndex:number=1;// 默认第一页
    private pagerContainer:HTMLDivElement;
    private eBoardCacheMap=new Map<number,IEBoardCache>();
    private canvas:BaseCanvas;
    private PageTurn:PageTurn;
    private Pagination:Pagination;
    private filePath?:string;// load pdf file
    private numPages:number=0;// 文档页数
    constructor(props:IPagerCanvasProps){
        super(props);
        this.onPagerChange=this.onPagerChange.bind(this);
        this.PageTurn = new PageTurn();
        let {filePath="",pageDataSet=[],currentIndex=1} = props;
        if(/.pdf$/.test(filePath)){
            // pdf 文件
            this.filePath=filePath;
            // 获取页数
        }else{
            this.pageDataSet=pageDataSet;
            this.numPages=pageDataSet.length;
        }
        this.currentIndex=currentIndex;
    }
    @pipMode
    private onPagerChange(index:number){
        // index切换
        if(index===this.currentIndex){
            return 0;
        }else{
            this.Pagination&&this.Pagination.setCurrentIndex(index);
            const isNext=index>this.currentIndex;
            this.currentIndex=index;
            return this.addPage(index,isNext);
        }
    }
    private getCurrentElement(){
        return  this.pagerContainer.querySelector(".eboard-container") as HTMLElement;
    }
    private addPage(index:number,next:boolean){
        // 如果缓存中有则从缓存中取，否则创建
        return new Promise((resolve)=>{
            const cache = this.eBoardCacheMap.get(index);
            const currentElement = this.getCurrentElement();
            if(void 0 !==cache){
                const nextElement = cache.element;
                nextElement.className +="eboard-pager-hiden";
                this.pagerContainer.insertBefore(nextElement,currentElement);
                if(next){
                    this.PageTurn.next(currentElement,nextElement,()=>{
                        (currentElement.parentElement as HTMLElement).removeChild(currentElement);
                        resolve(true);
                    });
                }else{
                    this.PageTurn.prev(currentElement,nextElement,()=>{
                        (currentElement.parentElement as HTMLElement).removeChild(currentElement);
                        resolve(true);
                    });
                }
            }else{
                // 新页面，未缓存，需要动态创建
                
                const pageData = this.pageDataSet[index-1];
                const wraper=document.createElement("div");
                wraper.style.position="absolute";
                wraper.style.width="100%";
                wraper.style.height="100%";
                wraper.style.left="-100%";
                this.pagerContainer.insertBefore(wraper,currentElement);
                const {pageDataSet,currentIndex,...props} = this.props;
                let newCanvas:ImageCanvas|PdfCanvas|HTMLCanvas;
                ReactDOM.render(
                    this.filePath?<PdfCanvas ref={(ref:PdfCanvas)=>newCanvas=ref} {...props}/>:pageData.type===PageType.Image?<ImageCanvas className="eboard-pager-hide" ref={(ref:ImageCanvas)=>newCanvas=ref} {...props} src={pageData.data}/>:
                        <HTMLCanvas ref={(ref:HTMLCanvas)=>newCanvas=ref} {...props} children={pageData.data}/>,
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
                        
                        // child
                        const canvas = (child.querySelector(".eboard-html") as any).firstElementChild as HTMLCanvasElement;
                        this.loadPdfPage(index,(page)=>{
                            const defaultViewport = page.getViewport(1);
                            const scale = child.offsetWidth/defaultViewport.width;
                            const viewport = page.getViewport(scale);
                            canvas.width=viewport.width;
                            canvas.height=viewport.height;
                            const renderContext = {
                                canvasContext: canvas.getContext("2d"),
                                viewport: viewport
                            };
                            page.render(renderContext as any);
                        });
                        if(next){
                            this.PageTurn.next(currentElement,child,()=>{
                                (currentElement.parentElement as HTMLElement).removeChild(currentElement);
                                resolve(true);
                            });
                        }else{
                            this.PageTurn.prev(currentElement,child,()=>{
                                (currentElement.parentElement as HTMLElement).removeChild(currentElement);
                                resolve(true);
                            });
                        }
                    }
                );
            }
        })
    }
    private loadPdfDocumentPromise:PDFPromise<PDFDocumentProxy>;
    private loadPdfPage(pageNumber:number,callback:(page:PDFPageProxy)=>void){
        // return page
        this.loadPdfDocumentPromise.then((pdf)=>{
            pdf.getPage(pageNumber).then(callback);
        })
    };
    shouldComponentUpdate(){
        return true;
        // return false;
    }
    componentDidMount(){
        // 父容器样式修改
        if(this.pagerContainer){
            const child = this.pagerContainer.firstElementChild as HTMLElement;
            const offswtWidth = child.offsetWidth;
            this.pagerContainer.style.width = offswtWidth + "px";
            this.pagerContainer.style.height = child.offsetHeight + "px";
            const eBoardEngine = this.canvas.getEBoardEngine();
            this.eBoardCacheMap.set(this.currentIndex,{
                eBoardEngine:eBoardEngine,
                eBoardCanvas:eBoardEngine.eBoardCanvas,
                element:child,
            });
            // 如果是文档则加在第一页
            if(this.filePath){
                this.loadPdfDocumentPromise = pdfjsLib.getDocument(this.filePath);
                const canvas = (child.querySelector(".eboard-html") as any).firstElementChild as HTMLCanvasElement;
                this.loadPdfDocumentPromise.then(pdf=>{
                    this.numPages=pdf.numPages;
                    this.setState({});
                    this.loadPdfPage(1,(page)=>{
                        const defaultViewport = page.getViewport(1);
                        const scale = offswtWidth/defaultViewport.width;
                        const viewport = page.getViewport(scale);
                        canvas.width=viewport.width;
                        canvas.height=viewport.height;
                        const renderContext = {
                            canvasContext: canvas.getContext("2d"),
                            viewport: viewport
                        };
                        page.render(renderContext as any);
                    });
                });
            }
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
    /**
     * @override
     */
    public getPlugin(pluginName:string){
        const eBoardCache = this.eBoardCacheMap.get(this.currentIndex) as IEBoardCache;
        return eBoardCache.eBoardEngine.getPlugin(pluginName);
    }
    render(){
        const filePath = this.filePath;
        const numPages = this.numPages;
        const {pageDataSet,currentIndex,...props} = this.props;
        
        const pageData = this.pageDataSet[this.currentIndex-1];
        // 当前显示的需要显示，其他的则需要进行隐藏
        return (
            <div className="eboard-pager" ref={(ref:HTMLDivElement)=>this.pagerContainer=ref} style={{width:"100%",height:"100%"}}>
                {/*显示第一个需要显示的，后面都进行动态创建，动态创建怎么获取其实力*/}
                {
                    filePath?<PdfCanvas ref={(ref:ImageCanvas)=>this.canvas=ref} {...props}/>:pageData.type===PageType.Image?<ImageCanvas ref={(ref:ImageCanvas)=>this.canvas=ref} {...props} src={pageData.data}/>:<HTMLCanvas ref={(ref:HTMLCanvas)=>this.canvas=ref} {...props} children={pageData.data}/>
                }
                {
                    numPages>1?<Pagination ref={(ref:Pagination)=>this.Pagination=ref} onPagerChange={this.onPagerChange} defaultCurrentIndex={this.currentIndex} totalPages={numPages}/>:null
                }
            </div>
        );
    }
}

export {PagerCanvas}
