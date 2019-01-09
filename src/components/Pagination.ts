/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/5 15:52
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/5 15:52
 * @disc：分页管理组件
 * changelist:
 *      * 支持总页数动态修改
 *      * 支持当前页数动态修改
 *      * 当当前显示页数发生改变时触发onPagerChange事件
 *      * 支持翻页disabled判断
 */
import "../style/pagination.less";
import "../font/iconfont.css";
// @ts-ignore
import Hammer from "hammerjs";

class Pagination{
    public dom:HTMLDivElement;
    private pageNum:number;
    private totalPages:number;
    private span:HTMLSpanElement;
    private prev:HTMLDivElement;
    private next:HTMLDivElement;
    private input:HTMLInputElement;
    private inputLabel:HTMLSpanElement;
    private onGoListener:(pageNum:number,messageId:number)=>void;
    private goHammer:Hammer;
    private prevHammer:Hammer;
    private nextHammer:Hammer;
    constructor(pageNum:number,totalPages:number){
        this.pageNum=pageNum;
        this.totalPages=totalPages;
        this.onPrev=this.onPrev.bind(this);
        this.onNext=this.onNext.bind(this);
        this.onKeyEnter=this.onKeyEnter.bind(this);
        this.onGo=this.onGo.bind(this);
        this.initLayout();
        this.setPageNum(pageNum);
        this.setTotalPages(totalPages);
    }
    private onPrev(){
        if(this.onGoListener){
            this.onGoListener.call(this,this.pageNum-1);
        }
    }
    private onNext(){
        if(this.onGoListener){
            this.onGoListener.call(this,this.pageNum+1);
        }
    }
    private updatePageNum(pageNum:number){
        const label = pageNum.toString();
        this.input.value=label;
        this.inputLabel.innerText=label;
    }
    private initLayout(){
        const container = document.createElement("div");
        container.className="eboard-pagination";
        const prev = document.createElement("div");
        prev.className="eboard-pagination-left";
        prev.innerHTML='<i class="eboard-icon eboard-icon-prev"/>';
        this.prev=prev;
        const input = document.createElement("input");
        input.type="number";
        input.className="eboard-pagination-input";
        input.addEventListener("keydown",this.onKeyEnter);
        const inputSpan = this.inputLabel = document.createElement("span");
        inputSpan.className="eboard-pagination-input-label";
        input.oninput=()=>{
            input.value=input.value.replace(/\D/g,'');
            const number = Number(input.value);
            if(number>this.totalPages){
                input.value = this.totalPages.toString();
            }
            if(input.value==="0"){
                input.value = "1";
            }
            inputSpan.innerText=input.value;
        };
        input.onblur=()=>{
            const number = Number(input.value);
            if(number<1){
                input.value = "1";
            }
        };
    
        this.input=input;
        
        const next = document.createElement("div");
        next.className="eboard-pagination-right";
        next.innerHTML='<i class="eboard-icon eboard-icon-next"/>';
        this.next=next;
      
        const span = document.createElement("span");
        span.className="eboard-pagination-total";
        this.span=span;
        const go = document.createElement("div");
        go.className="eboard-pagination-go";
        go.innerText = "GO";
        container.appendChild(this.prev);
        container.appendChild(input);
        container.appendChild(inputSpan);
        container.appendChild(span);
        container.appendChild(this.next);
        container.appendChild(go);
        this.dom=container;
    
        this.goHammer = new Hammer(go);
        this.goHammer.on('tap', this.onGo);
        this.prevHammer = new Hammer(prev);
        this.nextHammer = new Hammer(next);
    }
    private todoChange(){
        const value = this.input.value;
        const number =Number(value);
        if("" === value || number<1 || number>this.totalPages){
            this.updatePageNum(this.pageNum);
        }else{
            this.pageNum = number;
            if(this.onGoListener){
                this.onGoListener.call(this,number);
            }
        }
    }

    private onGo(){
        this.todoChange();
        this.input.blur();// 自动失去焦点
    }
    
    private onKeyEnter(event:any){
        if(event.keyCode === 13){
            this.todoChange();
            this.input.blur();// 自动失去焦点
        }
    }

    /**
     * 初始化分页操作
     * @returns {Pagination}
     */
    private initPagerAction(){
        this.prevHammer.off("tap",this.onPrev);
        this.nextHammer.off("tap",this.onNext);
        if(this.pageNum<=1){
            this.prev.classList.add("disabled");
        }else{
            this.prev.classList.remove("disabled");
            this.prevHammer.on("tap",this.onPrev);
        }
        if(this.pageNum>=this.totalPages){
            this.next.classList.add("disabled");
        }else{
            this.next.classList.remove("disabled");
            this.nextHammer.on("tap",this.onNext);
        }
        return this;
    }

    /**
     * 设置当前页
     * @param pageNum
     * @returns {Pagination}
     */
    public setPageNum(pageNum:number){
        this.pageNum=pageNum;
        this.updatePageNum(pageNum);
        this.initPagerAction();
        return this;
    }

    /**
     * 更新文档页数
     * @param totalPages
     * @returns {Pagination}
     */
    public setTotalPages(totalPages:number){
        this.totalPages=totalPages;
        this.span.innerText=totalPages as any;
        if(totalPages>0){
            this.dom.classList.remove("eboard-none");
        }else{
            this.dom.classList.add("eboard-none");
        }
        this.initPagerAction();
        return this;
    }
    
    /**
     * 翻页事件监听
     * @param {(pageNum: number, messageId: number) => void} onGoListener
     */
    public addGoListener(onGoListener:(pageNum:number)=>void){
        this.onGoListener=onGoListener;
    }
}

export {Pagination}