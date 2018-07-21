/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/20 16:52
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/20 16:52
 * @disc:Pdf 演示Frame 属于复合Frame ,器内部有多个Frame组成
 */
import {IFrame, IFrameOptions} from './IFrame';
import {PDFDocumentProxy, PDFJSStatic, PDFPromise, PDFRenderParams} from 'pdfjs-dist';
import {CanvasFrame} from './CanvasFrame';
import {ScrollbarType} from "./HtmlFrame";
const pdfjsLib:PDFJSStatic  = require('pdfjs-dist/build/pdf.js');
const PdfjsWorker = require('pdfjs-dist/build/pdf.worker.js');
(pdfjsLib as any).GlobalWorkerOptions.workerPort = new PdfjsWorker();


class PdfFrame implements IFrame{
    public container:HTMLDivElement;
    public id:number;
    public messageId:number;
    public ratio:string;
    public dom:HTMLDivElement;
    public url:string;
    public pageNum:number;
    public totalPages:number;
    public child:Map<number,CanvasFrame>=new Map();
    private pdf:PDFPromise<PDFDocumentProxy>;
    private options:IFrameOptions;
    constructor(options:IFrameOptions){
        this.options=options;
        this.container=options.container;
        this.id=options.id;
        this.messageId=options.messageId;
        this.ratio=options.ratio||"4:3";
       this.initialize();
       this.fixContainer();
    }
    private fixContainer(){
        const parentElement = this.container;
        // fix parent position
        const position = window.getComputedStyle(parentElement).position;
        if("absolute" !== position && "fixed" !== position && "relative" !== position) {
            parentElement.style.position="relative";
        }
    }
    protected initLayout(){
        const pagerContainer=document.createElement("div");
        pagerContainer.className="eboard-pager";
        pagerContainer.style.width="100%";
        pagerContainer.style.height="100%";
        const pagination = new Pagination(this.pageNum,this.totalPages);
        pagerContainer.appendChild(pagination.dom);
        this.dom=pagerContainer;
    };
    private initialize(){
        const options = this.options;
        this.url=options.url||'';
        this.pageNum=options.pageNum||1;// 默认第一页
        this.totalPages=0;// 表示当前未获取到页数
        this.pdf=null;
        if(this.child.size>0){
            // 清空子项
            this.child.forEach(frame=>{
                frame.destroy();
            });
            this.child.clear();
        }
        if(void 0 !== this.url){
            this.pdf = pdfjsLib.getDocument(this.url);
            this.pdf.then(pdf=>{
                this.totalPages=pdf.numPages;
            });
            const pageFrame = new CanvasFrame({
                container:option.container,
                id:this.pageNum,
                messageId:options.childMessageId,
                ratio:options.ratio,
                scrollbar:ScrollbarType.vertical,
            });
            this.child.set(this.pageNum,pageFrame);
            // load activePage content
            this.pdf.then(pdf=>{
                pdf.getPage(this.pageNum).then(page=>{
                    const canvas = pageFrame.canvas;
                    const defaultViewport = page.getViewport(1);
                    const scale = canvas.offswtWidth/defaultViewport.width;
                    const viewport = page.getViewport(scale);
                    canvas.width=viewport.width;
                    canvas.height=viewport.height;
                    const renderContext = {
                        canvasContext: canvas.getContext("2d"),
                        viewport: viewport
                    };
                    page.render(renderContext as PDFRenderParams);
                })
            })
        }
    }

    /**
     * 修改url
     * @param url
     * @returns {any}
     */
    public setUrl(url:string){
        if(url === this.url){
            return;
        }
        this.options.url=url;
        this.initialize();
        return this;
    }
}

export {PdfFrame};