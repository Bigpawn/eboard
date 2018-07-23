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
import {Pagination} from "../components/Pagination";
import {setAnimationName} from "../utils/decorators";
const pdfjsLib:PDFJSStatic  = require('pdfjs-dist/build/pdf.js');
const PdfjsWorker = require('pdfjs-dist/build/pdf.worker.js');
(pdfjsLib as any).GlobalWorkerOptions.workerPort = new PdfjsWorker();

@setAnimationName('eboard-pager')
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
    private pageFrame:CanvasFrame;
    private pagination:Pagination;
    private animationCssPrefix:string;
    constructor(options:IFrameOptions){
        this.options=options;
        this.container=options.container;
        this.id=options.id;
        this.messageId=options.messageId;
        this.ratio=options.ratio||"4:3";
       this.fixContainer();
        this.initLayout();
        this.initialize();
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
        this.dom=pagerContainer;
    };
    private initialize(){
        const options = this.options;
        this.url=options.url||'';
        this.pageNum=options.pageNum||1;// 默认第一页
        this.setTotalPages(0);// 表示当前未获取到页数
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
                this.setTotalPages(pdf.numPages);
            });
            const pageFrame = new CanvasFrame({
                container:options.container,
                id:this.pageNum,
                messageId:options.childMessageId,
                ratio:options.ratio,
                scrollbar:ScrollbarType.vertical,
            });
            this.pageFrame=pageFrame;
            this.dom.innerHTML="";
            this.dom.appendChild(this.pageFrame.dom);
            const pagination = new Pagination(this.pageNum,this.totalPages);// 分页管理器
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

    /**
     * 切换到指定页
     * @param pageNum
     * @returns {PdfFrame}
     */
    public switchToFrame(pageNum:number){

        return this;
    }
    private next(currentElement:HTMLElement,nextElement:HTMLElement,callback:(currentElement:HTMLElement,nextElement:HTMLElement)=>void){
        // this.pageFrame 表示当前的Frame

        const nextPageFrame = this.child.get(this.pageNum+1);
        if(void 0 === nextPageFrame){
            // 没有需要的frame则创建

        }else{

        }





        const nextElementClassName=nextElement.className.replace('eboard-pager-hide','');
        currentElement.className += ` ${this.animationCssPrefix}-leave-to-left`;
        nextElement.className = nextElementClassName + ` ${this.animationCssPrefix}-enter-from-right`;
        const transitionEndListener=(e:any)=>{
            currentElement.removeEventListener('animationend',transitionEndListener);
            currentElement.className = currentElement.className
                .replace(`${this.animationCssPrefix}-enter-from-right`,'')
                .replace(`${this.animationCssPrefix}-enter-from-left`,'')
                .replace(`${this.animationCssPrefix}-leave-to-right`,'')
                .replace(`${this.animationCssPrefix}-leave-to-left`,'');
            nextElement.className = currentElement.className
                .replace(`${this.animationCssPrefix}-enter-from-right`,'')
                .replace(`${this.animationCssPrefix}-enter-from-left`,'')
                .replace(`${this.animationCssPrefix}-leave-to-right`,'')
                .replace(`${this.animationCssPrefix}-leave-to-left`,'');
            callback(currentElement,nextElement);
        };
        currentElement.addEventListener('animationend',transitionEndListener);
    }
}

export {PdfFrame};