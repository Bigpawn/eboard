/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/31 15:30
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/7/31 15:30
 * @disc:工具栏 当前已激活的不重新触发
 */
import "../style/toolbar.less";
import Timer = NodeJS.Timer;


export declare interface IToolbarItem{
    name:string;
    icon:string;
    key:string;
}


const items:IToolbarItem[][]=[[{
    name:"直线",
    icon:"line",
    key:"line",
}],[{
    name:"左箭头",
    icon:"arrow-prev",
    key:"arrow-prev"
},{
    name:"右箭头",
    icon:"arrow-next",
    key:"arrow-next"
},{
    name:"双箭头",
    icon:"arrow-both",
    key:"arrow-both"
}],[{
    name:"正圆",
    icon:"circle",
    key:"circle"
},{
    name:"椭圆",
    icon:"ellipse",
    key:"ellipse"
}],[{
    name:"等腰三角形",
    icon:"triangle",
    key:"triangle"
},{
    name:"等边三角形",
    icon:"equilateral-triangle",
    key:"equilateral-triangle"
},{
    name:"直角三角形",
    icon:"orthogonal-triangle",
    key:"orthogonal-triangle"
}],[{
    name:"矩形",
    icon:"rectangle",
    key:"rectangle"
},{
    name:"正方形",
    icon:"square",
    key:"square"
}],[{
    name:"五角星",
    icon:"star",
    key:"star"
},{
    name:"五边形",
    icon:"pentagon",
    key:"pentagon",
},{
    name:"六边形",
    icon:"hexagon",
    key:"hexagon",
},{
    name:"多边形",
    icon:"polygon",
    key:"polygon",
}],[{
    name:"文字",
    icon:"text",
    key:"text",
}],[{
    name:"铅笔",
    icon:"pencil",
    key:"pencil",
}],[{
    name:"清空",
    icon:"clear",
    key:"clear",
}],[{
    name:"删除",
    icon:"del",
    key:"del",
}]];


class ToolbarChildren{
    private from:HTMLDivElement;
    private items:IToolbarItem[];
    private dom:HTMLDivElement;
    private listener?:(item:IToolbarItem)=>void;
    constructor(from:HTMLDivElement,items:IToolbarItem[],listener?:(item:IToolbarItem)=>void){
        this.from = from;
        this.items=items;
        this.listener=listener;
        this.initOffset();
        this.initItems();
        this.initRemoveListener();
    }
    private initOffset(){
        const wrap = document.createElement("div");
        const {offsetLeft,offsetTop,offsetHeight} = this.from;
        wrap.className="eboard-toolbar-category";
        wrap.style.top = offsetTop+offsetHeight + 5 +"px";
        wrap.style.left = offsetLeft + "px";
        this.dom=wrap;
        this.from.parentElement&&this.from.parentElement.appendChild(wrap);
    }
    private initRemoveListener(){
        // 才创建就能收到click事件
        const listener = ()=>{
            this.destroy();
            window.removeEventListener("click",listener);
        };
        window.addEventListener("click",listener);
    }
    private initItems(){
        this.items.forEach((item,index)=>{
            const itemDom = document.createElement("div");
            itemDom.title=item.name;
            itemDom.className = `eboard-toolbar-item eboard-icon eboard-icon-${item.icon}`;
            this.dom.appendChild(itemDom);
            itemDom.addEventListener("click",()=>{
                this.listener&&this.listener.call(this,item);
                this.from.setAttribute("active",index.toString());
                this.from.className = this.from.className.replace(/eboard-icon-\S+/,"eboard-icon-"+item.icon);
            })
        });
    }
    public destroy(){
        this.dom.parentElement&&this.dom.parentElement.removeChild(this.dom);
    }
}



class Toolbar{
    private dom:HTMLDivElement;
    private listener?:(item:IToolbarItem)=>void;
    private childInstance:ToolbarChildren;
    private activeKey:string;
    constructor(container:HTMLElement,listener?:(item:IToolbarItem)=>void){
        this.listener=listener;
        this.initWrap();
        this.initItems();
        container.innerHTML="";
        container.appendChild(this.dom);
    }
    private initWrap(){
        const wrap = document.createElement("div");
        wrap.className="eboard-toolbar";
        this.dom=wrap;
    }
    
    
    private initItems(){
        items.forEach((members)=>{
            const itemDom = document.createElement("div");
            const length = members.length;
            const item = members[0];
            itemDom.title=item.name;
            itemDom.className = `eboard-toolbar-item eboard-icon eboard-icon-${item.icon} ${length>1?"eboard-toolbar-expend":""}`;
            itemDom.setAttribute("active","0");
            if(length>1){
                itemDom.innerHTML="<i class='eboard-icon eboard-icon-expend'/>";
            }
            this.dom.appendChild(itemDom);
            let timer:Timer;
            
            itemDom.addEventListener("mousedown",(event:any)=>{
                event.cancelBubble = true;
                event.stopPropagation();
                this.closeChild();
                const activeItem = Number(itemDom.getAttribute("active"))||0;
                const key = members[activeItem].key;
                if(key !== this.activeKey){
                    this.activeKey= key;
                    this.listener&&this.listener.call(this,members[activeItem]);// 可能不是该item
                }
                const active = itemDom.parentElement?itemDom.parentElement.querySelector(".active"):undefined;
                active&&active.classList.remove("active");
                itemDom.classList.add("active");// 移除
                if(length>1){
                    timer = setTimeout(()=>{
                        clearTimeout(timer);
                        timer = undefined as any;
                        this.showChild(itemDom,members);
                    },300);
                }
            });
            itemDom.addEventListener("click",(event:any)=>{
                event.cancelBubble = true;
                event.stopPropagation();
                if(timer){
                    clearTimeout(timer);
                    timer = undefined as any;
                }
            })
        });
    }
    private closeChild(){
        if(void 0 !== this.childInstance){
            this.childInstance.destroy();
            this.childInstance=undefined as any;
        }
    }
    private showChild(from:HTMLDivElement,items:IToolbarItem[]) {
        this.closeChild();
        this.childInstance = new ToolbarChildren(from,items,(item)=>{
            const key = item.key;
            if(key !== this.activeKey){
                this.activeKey= key;
                this.listener&&this.listener.call(this,item);// 可能不是该item
            }
        });
    }
}

export {Toolbar};