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

class Pagination{
    public dom:HTMLDivElement;
    private pageNum:number;
    private totalPages:number;
    constructor(pageNum:number,totalPages:number){
        this.pageNum=pageNum;
        this.totalPages=totalPages;
        this.initLayout();
    }
    private onPrev(){

    }
    private onNext(){

    }
    private initLayout(){
        const wrap = document.createElement("div");
        const prev = document.createElement("div");
        prev.className="eboard-pagination-left";
        prev.innerHTML='<i class="eboard-icon eboard-icon-prev"/>';
        const next = document.createElement("div");
        next.className="eboard-pagination-right";
        next.innerHTML='<i class="eboard-icon eboard-icon-next"/>';
        const bottom = document.createElement("div");
        bottom.className="eboard-pagination-bottom";
        const input = document.createElement("input");
        input.type="number";
        input.className="eboard-pagination-current";
        const span = document.createElement("span");
        span.className="eboard-pagination-total";
        span.innerText=this.totalPages;
        bottom.appendChild(input);
        bottom.appendChild(document.createTextNode("/"));
        bottom.appendChild(span);
        wrap.appendChild(prev);
        wrap.appendChild(next);
        wrap.appendChild(bottom);
        this.dom=wrap;
    }
}