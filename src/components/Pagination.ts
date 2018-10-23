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

class Pagination{
    public dom:HTMLDivElement;
    private pageNum:number;
    private totalPages:number;
    private span:HTMLSpanElement;
    private prev:HTMLDivElement;
    private next:HTMLDivElement;
    private input:HTMLInputElement;
    private onGoListener:(pageNum:number,messageId:number)=>void;
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
            // TODO 需要调用Api生成消息Id
            this.onGoListener.call(this,this.pageNum-1);
        }
    }
    private onNext(){
        if(this.onGoListener){
            // TODO 需要调用Api生成消息Id
            this.onGoListener.call(this,this.pageNum+1);
        }
    }
    private initLayout(){
        const wrap = document.createElement("div");
        const prev = document.createElement("div");
        prev.className="eboard-pagination-left";
        prev.innerHTML='<i class="eboard-icon eboard-icon-prev"/>';
        this.prev=prev;
        const next = document.createElement("div");
        next.className="eboard-pagination-right";
        next.innerHTML='<i class="eboard-icon eboard-icon-next"/>';
        this.next=next;
        const bottom = document.createElement("div");
        bottom.className="eboard-pagination-bottom";
        const input = document.createElement("input");
        input.type="number";
        input.oninput=()=>{
            console.log(input.value);
            input.value=input.value.replace(/\D/g,'');
            const number = Number(input.value);
            if(number>this.totalPages){
                input.value = this.totalPages.toString();
            }
            if(input.value==="0"){
                input.value = "1";
            }
        };
        input.onblur=()=>{
            const number = Number(input.value);
            if(number<1){
                input.value = "1";
            }
        };
        input.className="eboard-pagination-current";
        input.addEventListener("keydown",this.onKeyEnter);
        this.input=input;
        const span = document.createElement("span");
        span.className="eboard-pagination-total";
        this.span=span;
        const bottomGo = document.createElement("div");
        bottomGo.innerText = "GO";
        bottomGo.className="eboard-pagination-bottomGo";
        bottomGo.addEventListener("click",this.onGo);
        
        bottom.appendChild(this.prev);
        bottom.appendChild(input);
        bottom.appendChild(document.createTextNode("/"));
        bottom.appendChild(span);
        bottom.appendChild(this.next);
        bottom.appendChild(bottomGo);
        // wrap.appendChild(prev);
        // wrap.appendChild(next);
        wrap.appendChild(bottom);
        this.dom=wrap;
    }
    private todoChange(){
        const value = this.input.value;
        const number =Number(value);
        if("" === value || number<1 || number>this.totalPages){
            this.input.value=this.pageNum as any;
        }else{
            this.pageNum = number;
            if(this.onGoListener){
                // TODO 需要调用Api生成消息Id
                this.onGoListener.call(this,number);
            }
        }
    }

    private onGo(){
        // 翻页
        this.todoChange();
        this.input.blur();// 自动失去焦点
    }
    
    private onKeyEnter(event:any){
        if(event.keyCode === 13){
            // 回车
            this.todoChange();
            this.input.blur();// 自动失去焦点
        }
    }

    /**
     * 初始化分页操作
     * @returns {Pagination}
     */
    private initPagerAction(){
        if(this.pageNum<=1){
            this.prev.classList.add("disabled");
            this.prev.removeEventListener("click",this.onPrev);
        }else{
            this.prev.classList.remove("disabled");
            this.prev.addEventListener("click",this.onPrev);
        }
        if(this.pageNum>=this.totalPages){
            this.next.classList.add("disabled");
            this.next.removeEventListener("click",this.onNext);
        }else{
            this.next.classList.remove("disabled");
            this.next.addEventListener("click",this.onNext);
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
        this.input.value=pageNum as any;
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
            this.dom.style.display="block";
        }else{
            this.dom.style.display="none";
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