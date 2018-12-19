/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/20 16:52
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/20 16:52
 * @disc:Pdf 演示Frame 属于复合Frame ,器内部有多个Frame组成
 */
import {PDFDocumentProxy, PDFJSStatic, PDFPromise, PDFRenderParams} from 'pdfjs-dist';
import {CanvasFrame} from './CanvasFrame';
import {ScrollbarType} from "./HtmlFrame";
import {Pagination} from "../components/Pagination";
import {message} from '../utils/decorators';
import {
    IPdfFrame,
    IPdfFrameOptions,
} from '../interface/IFrameGroup';
import {EBoard} from '../EBoard';
import {Plugins} from '../plugins';
import {MessageTag} from '../enums/MessageTag';
import {Context} from '../static/Context';
import {IDGenerator} from '../utils/IDGenerator';
const pdfjsLib:PDFJSStatic  = require('pdfjs-dist/build/pdf.js');
const PdfjsWorker = require('pdfjs-dist/build/pdf.worker.js');
(pdfjsLib as any).GlobalWorkerOptions.workerPort = new PdfjsWorker();


class PdfFrame implements IPdfFrame{
    public pageFrame:CanvasFrame;
    private pagination:Pagination;
    private pdf:PDFPromise<PDFDocumentProxy>;
    public container:HTMLDivElement;
    public type:string="pdf-frame";
    public dom:HTMLDivElement;
    public url:string;
    public pageNum:number=1;
    public totalPages:number;
    public child:Map<number,CanvasFrame>=new Map();
    public options:IPdfFrameOptions;
    public parent?:EBoard;
    public groupId:string;
    public context:Context;
    constructor(context:Context,options:IPdfFrameOptions){
        this.context=context;
        this.groupId=options.groupId||IDGenerator.getId();
        this.options=options;
        this.container=options.container as any;
        context.addGroup(this.groupId,this).setActiveKey(this.groupId);
        this.onGo=this.onGo.bind(this);
        this.initLayout();
        this.initialize();
        this.initializeAction();
    }
    
    @message
    public initializeAction(){
        const {container,calcSize,...rest} = this.options as any;
        return Object.assign({},{
            tag:MessageTag.CreateFrameGroup,
            width:calcSize.width,
            ...rest
        });
    }
    
    @message
    public switchFrameAction(pageNum:number){
        return Object.assign({},{
            groupId:this.groupId,
            tag:MessageTag.TurnPage,
            pageNum:pageNum
        });
    }
    protected initLayout(){
        const {container,extraHtmlFragment} = this.options as any;
        const pagerContainer=document.createElement("div");
        pagerContainer.className="eboard-pager";
        pagerContainer.style.width="100%";
        pagerContainer.style.height="100%";
        pagerContainer.setAttribute("x-eboard-id",this.groupId);
        this.dom=pagerContainer;
        if(extraHtmlFragment){
            const fragment = document.createElement("div");
            fragment.innerHTML=extraHtmlFragment;
            if(fragment.firstChild){
                pagerContainer.appendChild(fragment.firstChild);
            }
        }
        container.appendChild(this.dom);
    };
    private static clearClassList(element:HTMLDivElement){
        element.className = element.className.replace(/eboard-pagination-enter-from-left|eboard-pagination-enter-from-right|eboard-pagination-leave-to-right|eboard-pagination-leave-to-left|eboard-pagination-show|eboard-pagination-hide/g,"").trim();
    }
    private initialize(){
        const options = this.options;
        this.url=options.url||'';
        this.setPageNum(options.pageNum||1);// 默认第一页
        this.setTotalPages(0);// 表示当前未获取到页数
        this.pdf=undefined as any;
        if(void 0 !== this.url){
            this.pdf = pdfjsLib.getDocument(this.url);
            this.pdf.then(pdf=>{
                this.setTotalPages(pdf.numPages);
            });
            const pageFrame = new CanvasFrame(this.context,{
                scrollbar:ScrollbarType.vertical,
                frameId:this.groupId+"_"+this.pageNum.toString(),
                container:this.dom,
                calcSize:this.options.calcSize,
                groupId:this.groupId
            });// 页码设置为id
            this.pageFrame=pageFrame;
            const pagination = new Pagination(this.pageNum,this.totalPages);// 分页管理器
            pagination.addGoListener(this.onGo);
            this.pagination=pagination;
            this.dom.appendChild(pagination.dom);

            this.child.set(this.pageNum,pageFrame);
            // load activePage content
            this.pdf.then(pdf=>{
                pdf.getPage(this.pageNum).then(page=>{
                    const canvas = pageFrame.canvas;
                    const defaultViewport = page.getViewport(1);
                    const scale = canvas.offsetWidth/defaultViewport.width;
                    const viewport = page.getViewport(scale);
                    canvas.width=viewport.width;
                    canvas.height=viewport.height;
                    (pageFrame as CanvasFrame).refreshLayout();// 需要reLayout
                    const renderContext = {
                        canvasContext: canvas.getContext("2d"),
                        viewport: viewport
                    };
                    page.render(renderContext as PDFRenderParams);
                })
            })
        }
    }
    
    private onGo(pageNum:number){
        const pageNumber=Number(pageNum);
        this.switchToFrame(pageNumber);
        this.switchFrameAction(pageNumber);
    }
    
    public pageTo(pageNum:number){
        const pageNumber=Number(pageNum);
        this.switchToFrame(pageNumber);
    }
    /**
     * 更新文档页数
     * @param totalPages
     * @returns {PdfFrame}
     */
    private setTotalPages(totalPages:number){
        this.totalPages=totalPages;
        if(void 0 !== this.pagination){
            this.pagination.setTotalPages(totalPages);
        }
        return this;
    }
    
    /**
     * 更新当前页数
     * @param {number} pageNum
     */
    private setPageNum(pageNum:number){
        this.pageNum=pageNum;
        if(this.pagination){
            this.pagination.setPageNum(pageNum);
        }
    }
    
    
    private getFrame(pageNum:number){
        let nextPageFrame = this.child.get(pageNum);
        if(void 0 === nextPageFrame){
            nextPageFrame = new CanvasFrame(this.context,{
                scrollbar:ScrollbarType.vertical,
                container:this.dom,
                frameId:this.groupId+"_"+pageNum.toString(),
                calcSize:this.options.calcSize,
                groupId:this.groupId
            });
            this.child.set(pageNum,nextPageFrame);
            this.pdf.then(pdf=>{
                pdf.getPage(pageNum).then((page)=>{
                    const canvas = (nextPageFrame as CanvasFrame).canvas;
                    const defaultViewport = page.getViewport(1);
                    const scale = canvas.offsetWidth/defaultViewport.width;
                    const viewport = page.getViewport(scale);
                    canvas.width=viewport.width;
                    canvas.height=viewport.height;
                    (nextPageFrame as CanvasFrame).refreshLayout();// 需要reLayout
                    const renderContext = {
                        canvasContext: canvas.getContext("2d"),
                        viewport: viewport
                    };
                    page.render(renderContext as PDFRenderParams);
                })
            })
        }
        return nextPageFrame;
    }
    
    public switchToFrame(pageNum:number){
        if(this.pageNum === pageNum||void 0 === pageNum){
            return this;
        }
        let nextPageFrame = this.getFrame(pageNum);
        const frameDom = nextPageFrame.dom;
        const currentFrameDom = this.pageFrame.dom;
        PdfFrame.clearClassList(frameDom);
        PdfFrame.clearClassList(currentFrameDom);
        frameDom.classList.add(this.pageNum>pageNum?"eboard-pagination-enter-from-left":"eboard-pagination-enter-from-right");
        currentFrameDom.classList.add(this.pageNum>pageNum?"eboard-pagination-leave-to-right":"eboard-pagination-leave-to-left");
        this.setPageNum(pageNum);
        this.pageFrame=nextPageFrame;
        return this;
    }
    
    private recoveryToFrame(pageNum:number){
        if(this.pageNum === pageNum||void 0 === pageNum){
            return this;
        }
        let nextPageFrame = this.getFrame(pageNum);
        const frameDom = nextPageFrame.dom;
        this.child.forEach((imageFrame)=>{
            const dom = imageFrame.dom;
            PdfFrame.clearClassList(dom);
            dom.classList.add("eboard-pagination-hide");
        });
        frameDom.classList.add("eboard-pagination-show");
        this.setPageNum(pageNum);
        this.pageFrame=nextPageFrame;
        return this;
    }
    public recovery(pageNum:number){
        const pageNumber=Number(pageNum);
        this.recoveryToFrame(pageNumber);
    }
    
    
    public getPlugin(pluginName:Plugins){
        return this.pageFrame?this.pageFrame.getPlugin(pluginName):undefined;
    }
    public destroy(){
        if(this.child.size>0){
            // 清空子项
            this.child.forEach(frame=>{
                frame.destroy();// 不想发出消息,仅发出本身消息即可
                this.context.deleteFrame(frame.frameId);
            });
            this.child.clear();
        }
    }
}

export {PdfFrame};