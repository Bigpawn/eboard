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
    constructor(pageNum:number,totalPages:number){
        this.pageNum=pageNum;
        this.totalPages=totalPages;
        this.onPrev=this.onPrev.bind(this);
        this.onNext=this.onNext.bind(this);
        this.initLayout();
        this.setPageNum(pageNum);
        this.setTotalPages(totalPages);
    }
    private onPrev(){
        alert("prev");
    }
    private onNext(){
        alert("next");
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
        input.className="eboard-pagination-current";
        this.input=input;
        const span = document.createElement("span");
        span.className="eboard-pagination-total";
        this.span=span;
        bottom.appendChild(input);
        bottom.appendChild(document.createTextNode("/"));
        bottom.appendChild(span);
        wrap.appendChild(prev);
        wrap.appendChild(next);
        wrap.appendChild(bottom);
        this.dom=wrap;
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
        this.input.value=pageNum;
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
        this.span.innerText=totalPages;
        if(totalPages>0){
            this.dom.style.display="block";
        }else{
            this.dom.style.display="none";
        }
        this.initPagerAction();
        return this;
    }
}

export {Pagination}