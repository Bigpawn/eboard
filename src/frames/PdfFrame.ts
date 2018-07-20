/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/20 16:52
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/20 16:52
 * @disc:Pdf 演示Frame 属于复合Frame ,器内部有多个Frame组成
 */
import {IFrame, IFrameOptions} from './IFrame';
import {PDFDocumentProxy, PDFJSStatic, PDFPromise} from 'pdfjs-dist';
import {CanvasFrame} from './CanvasFrame';
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
    constructor(options:IFrameOptions){
        this.container=options.container;
        this.id=options.id;
        this.messageId=options.messageId;
        this.ratio=options.ratio||"4:3";
        this.url=options.url||'';
        this.pageNum=options.pageNum||1;// 默认第一页
        this.totalPages=0;// 表示当前未获取到页数
        if(void 0 !== this.url){
            this.pdf = pdfjsLib.getDocument(this.url);
        }
    }
    private loadPdf(){
        return pdfjsLib.getDocument(this.url).then((pdf)=>{
            this.totalPages=pdf.numPages;
        });
    }
    
    public setUrl(url:string){
        if(url === this.url){
            return;
        }
        this.url=url;
        // url发生变化
        // 初始化当前frame 并且开始重新加载
        
    }
}

export {PdfFrame};