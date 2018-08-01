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
import {message, pipMode, setAnimationName} from '../utils/decorators';
import {IPdfFrame, IPdfFrameOptions} from '../interface/IFrameGroup';
import {EBoard} from '../EBoard';
import {MessageIdMiddleWare} from '../middlewares/MessageIdMiddleWare';
import {
    MessageTagEnum,
} from '../middlewares/MessageMiddleWare';
import {IFrameGroupMessageInterface} from '../IMessageInterface';
const pdfjsLib:PDFJSStatic  = require('pdfjs-dist/build/pdf.js');
const PdfjsWorker = require('pdfjs-dist/build/pdf.worker.js');
(pdfjsLib as any).GlobalWorkerOptions.workerPort = new PdfjsWorker();


@setAnimationName('eboard-pager')
class PdfFrame implements IPdfFrame,IFrameGroupMessageInterface{
    private pageFrame:CanvasFrame;
    private pagination:Pagination;
    private pdf:PDFPromise<PDFDocumentProxy>;
    private animationCssPrefix:string;
    public container:HTMLDivElement;
    public type:string="pdf-frame";
    public messageId:number;
    public dom:HTMLDivElement;
    public url:string;
    public pageNum:number;
    public totalPages:number;
    public child:Map<number,CanvasFrame>=new Map();
    public options:IPdfFrameOptions;
    public parent?:EBoard;
    public id:string;
    constructor(options:IPdfFrameOptions,container:HTMLDivElement,parent?:EBoard,id?:string){
        this.id=id||Date.now().toString();
        this.options=options;
        this.container=container;
        this.messageId=options.messageId||MessageIdMiddleWare.getId();
        this.parent=parent;
        this.onGo=this.onGo.bind(this);
        this.initializeAction();// 创建子元素之前调用
        this.fixContainer();
        this.initLayout();
        this.initialize();
    }
    @message
    public initializeAction(){
        return {
            ...this.options,
            id:this.id,
            messageId:this.messageId,
            tag:MessageTagEnum.CreateFrameGroup
        }
    };
    
    @message
    public destroyAction(){
        return {
            tag:MessageTagEnum.DestroyFrameGroup,
            id:this.id
        }
    }
    
    @message
    public switchFrameAction(pageNum:number){
        return {
            tag:MessageTagEnum.SwitchToFrame,
            id:this.id,
            pageNum:pageNum
        }
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
        this.setPageNum(options.pageNum||1);// 默认第一页
        this.setTotalPages(0);// 表示当前未获取到页数
        this.pdf=undefined as any;
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
            // 判断是否有id options.id;// 没有标识操作端
            const pageFrame = new CanvasFrame({
                messageId:options.messageId,
                ratio:options.ratio,
                scrollbar:ScrollbarType.vertical,
            },this.container,this,this.pageNum.toString(),true);// 页码设置为id
            this.pageFrame=pageFrame;
            this.dom.innerHTML="";
            this.dom.appendChild(this.pageFrame.dom);
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
                    (pageFrame as CanvasFrame).initLayout();// 需要reLayout
                    const renderContext = {
                        canvasContext: canvas.getContext("2d"),
                        viewport: viewport
                    };
                    page.render(renderContext as PDFRenderParams);
                })
            })
        }
    }
    private onGo(pageNum:number,messageId?:number){
        this.switchToFrame(pageNum,messageId);// 消息id，需要先生成消息id然后才能调用api
        this.switchFrameAction(pageNum);
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
     * 切换到指定页 需要加队列控制
     * @param {number} pageNum
     * @param {number} messageId
     * @returns {any}
     */
    @pipMode
    public switchToFrame(pageNum:number,messageId?:number){
        if(this.pageNum === pageNum||void 0 === pageNum){
            return this;
        }
        let nextPageFrame = this.child.get(pageNum);
        if(void 0 === nextPageFrame){
            // 创建
            nextPageFrame = new CanvasFrame({
                messageId:messageId,
                ratio:this.options.ratio,
                scrollbar:ScrollbarType.vertical,
            },this.container,this,pageNum.toString(),true);
            this.child.set(pageNum,nextPageFrame);
            // 需要getPage
            this.pdf.then(pdf=>{
                pdf.getPage(pageNum).then((page)=>{
                    const canvas = (nextPageFrame as CanvasFrame).canvas;
                    const defaultViewport = page.getViewport(1);
                    const scale = canvas.offsetWidth/defaultViewport.width;
                    const viewport = page.getViewport(scale);
                    canvas.width=viewport.width;
                    canvas.height=viewport.height;
                    (nextPageFrame as CanvasFrame).initLayout();// 需要reLayout
                    const renderContext = {
                        canvasContext: canvas.getContext("2d"),
                        viewport: viewport
                    };
                    page.render(renderContext as PDFRenderParams);
                })
            })
        }
        return new Promise<this>((resolve)=>{
            const frameDom = (nextPageFrame as CanvasFrame).dom;
            const currentFrameDom = this.pageFrame.dom;
            const enterClassName = `${this.animationCssPrefix}-enter-from-${pageNum>this.pageNum?"right":"left"}`;
            const leaveClassName = `${this.animationCssPrefix}-leave-to-${pageNum>this.pageNum?"left":"right"}`;
            frameDom.classList.add(enterClassName);
            currentFrameDom.classList.add(leaveClassName);
            this.dom.insertBefore(frameDom,this.pagination.dom);
            this.setPageNum(pageNum);
            const transitionEndListener=(e:any)=>{
                frameDom.removeEventListener('animationend',transitionEndListener);
                frameDom.classList.remove(enterClassName);
                currentFrameDom.classList.remove(leaveClassName);
                // 删除dom
                currentFrameDom.parentElement&&currentFrameDom.parentElement.removeChild(currentFrameDom);
                this.pageFrame=nextPageFrame as CanvasFrame;
                setTimeout(()=>{
                    resolve(this);
                },0)
            };
            frameDom.addEventListener('animationend',transitionEndListener);
        });
    }
    public getPlugin(pluginName:string){
        return this.pageFrame?this.pageFrame.getPlugin(pluginName):undefined;
    }
    public destroy(){
        if(this.child.size>0){
            // 清空子项
            this.child.forEach(frame=>{
                frame.destroy(true);// 不想发出消息,仅发出本身消息即可
            });
            this.child.clear();
        }
        this.destroyAction();
    }
}

export {PdfFrame};