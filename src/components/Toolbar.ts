/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/31 15:30
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/7/31 15:30
 * @disc:工具栏 当前已激活的不重新触发
 * 兼容移动端
 */
import '../style/toolbar.less';
import "../font/iconfont.css";
import '../style/drop-down.less';
import {EBoard} from '../EBoard';

export declare interface IToolbarItem{
    name:string;
    icon:string;
    key:string;
    active?:boolean;
    children?:any[];
    color?:string;
    size?:number;
}


const newItems:IToolbarItem[][]=[
    [{
        name:'选择',
        icon:'xuanze',
        key:'select',
    }],[{
        name:'画笔',
        icon:'huabi',
        key:'pencil',
        children: [4,8,12,16],
    }],[{
        name:'文字',
        icon:'wenzi',
        key:'text',
        children: [14,18,24,26],
    }],[{
        name: '图形',
        icon: 'tuxing',
        key: 'rectangle',
    },{
        name:'直线',
        icon:'zhixian',
        key:'line',
    },{
        name:'实心圆',
        icon:'shixinyuan',
        key:'dotcircle',
    },{
        name:'实心五角星',
        icon:'shixinxing',
        key:'dotstar',
    },{
        name:'实心三角形',
        icon:'shixinsanjiao',
        key:'dottriangle',
    },{
        name:'实心矩形',
        icon:'shixinfangxing',
        key:'dotrectangle',
    },{
        name:'箭头',
        icon:'jiantou',
        key:'arrow-next',
    },{
        name:'空心圆',
        icon:'kongxinyuan',
        key:'circle',
    },{
        name:'空心五角星',
        icon:'kongxinxing',
        key:'star',
    },{
        name:'空心三角形',
        icon:'kongxinsanjiao',
        key:'triangle',
    },{
        name:'空心矩形',
        icon:'kongxinfangxing',
        key:'rectangle',
    }],[{
        name:'清空',
        icon:'qingkong',
        key:'clear',
        active:false,
    }],[{
        name:'教鞭',
        icon:'jiaobian',
        key:'ferule',
    }]
];

const colors = [
    "#ffffff",
    "#888888",
    "#555555",
    "#000000",
    "#f22500",
    "#f66c00",
    "#fad500",
    "#64cb00",
    "#00cac4",
    "#3698f3",
    "#8b6dc5",
    "#ff7c81"
    ];

const defaultActive=JSON.parse(localStorage.getItem("defaultActive"))||{
    activeH: {
        size: "8",
        color: "#f66c00",
    },
    activeW: {
        size: "18",
        color: "#f66c00",
    },
    activeT: {
        index: "10",
        color: "#f66c00",
    },
    activeKey: {
        key: ""
    }
};
localStorage.setItem("defaultActive", JSON.stringify(defaultActive));
const setActive = (item, active:any) =>{
    const localActive=JSON.parse(localStorage.getItem("defaultActive"));
    localActive[item] = {...localActive[item], ...active};
    localStorage.setItem("defaultActive", JSON.stringify(localActive));
};


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
        const wrap = document.createElement('div');
        const {offsetLeft,offsetTop,offsetHeight} = this.from;
        wrap.className='eboard-toolbar-category';
        wrap.style.top = offsetTop+offsetHeight + 5 +'px';
        wrap.style.left = offsetLeft + 'px';
        this.dom=wrap;
        const colorDom = document.createElement('div');
        colorDom.className = `eboard-toolbar-category-color`;
        colors.forEach((item:string)=>{
            const itemDom = document.createElement('div');
            itemDom.className = `eboard-toolbar-category-color-item`;
            itemDom.style.backgroundColor = item;
            colorDom.appendChild(itemDom);
            itemDom.addEventListener('click',()=>{
                this.from.click();
                this.from.setAttribute('activeColor',item);
                this.from.firstChild&&((this.from.firstChild as HTMLElement).style.backgroundColor = item);
                this.listener&&this.listener({
                    key:"color",
                    name:this.items[0].key,
                    icon:"",
                    color:item
                });
                setActive(this.items[0].icon === "wenzi" ? "activeW" : this.items[0].icon === "huabi" ? "activeH" : "activeT", {color:item});
            });

            const activeColor = this.from.getAttribute('activeColor');
            if(activeColor && activeColor === item){
                itemDom.classList.add('active');
                this.listener&&this.listener({
                    key:"color",
                    name:this.items[0].key,
                    icon:"",
                    color:item
                });
                setActive(this.items[0].icon === "wenzi" ? "activeW" : this.items[0].icon === "huabi" ? "activeH" : "activeT", {color:item});
            }
        });
        const lineDom = document.createElement('div');
        lineDom.className = `eboard-toolbar-category-line`;
        this.dom.appendChild(lineDom);
        this.dom.appendChild(colorDom);
        this.from.parentElement&&this.from.parentElement.appendChild(wrap);
        const childrens = this.items[0].children;
        if(childrens){
            const itemDom = document.createElement('div');
            if(this.items[0].icon === "huabi"){
                itemDom.className = "eboard-toolbar-huabi";
            }else if(this.items[0].icon === "wenzi"){
                itemDom.className = "eboard-toolbar-wenzi";
            }
            childrens.forEach((item1)=>{
                const itemDom1 = document.createElement('div');
                itemDom1.className = `eboard-toolbar-item1`;
                if(this.items[0].icon === "huabi"){
                    itemDom1.style.width = item1 + "px";
                    itemDom1.style.height = item1 + "px";
                }else if(this.items[0].icon === "wenzi"){
                    itemDom1.innerText = item1 + "";
                }
                itemDom.appendChild(itemDom1);

                itemDom1.addEventListener('click',()=>{
                    this.from.click();
                    this.from.setAttribute(this.items[0].icon === "huabi" ? "activeH" : "activeW",item1);
                    this.listener&&this.listener({
                        key:"size",
                        name:this.items[0].key,
                        icon:"",
                        size:item1
                    });
                    setActive(this.items[0].icon === "huabi" ? "activeH" : "activeW", {size:item1});
                });

                const active = this.from.getAttribute(this.items[0].icon === "huabi" ? "activeH" : "activeW");
                if(active && active === item1.toString()){
                    itemDom1.classList.add('active');
                    this.listener&&this.listener({
                        key:"size",
                        name:this.items[0].key,
                        icon:"",
                        size:item1
                    });
                    setActive(this.items[0].icon === "huabi" ? "activeH" : "activeW", {size:item1});
                }
            });
            this.dom.appendChild(itemDom);
        }
    }
    private initRemoveListener(){
        // 才创建就能收到click事件
        const listener = (e:any)=>{
            // 仅当点击区域是
            const target = e.target;
            if(target.classList.contains("eboard-toolbar-category-color-item")||target.classList.contains("eboard-toolbar-item1")){
                this.destroy();
                window.removeEventListener('click',listener);
            }
        };
        window.addEventListener('click',listener);
    }
    private initItems(){
        this.items.forEach((item,index)=>{
            const itemDom = document.createElement('div');
            itemDom.title=item.name;
            itemDom.className = `eboard-toolbar-item1 eboard-icon eboard-icon-${item.icon}`;
            if(index){
                this.dom.appendChild(itemDom);
            }

            itemDom.addEventListener('click',()=>{
                this.listener&&this.listener.call(this,item);
                this.from.setAttribute('active',index.toString());
                this.from.className = this.from.className.replace(/eboard-icon-\S+/,'eboard-icon-'+item.icon);
                setActive("activeT", {index:index.toString()});
            });

            const active = this.from.getAttribute('active');
            if(active && active === index.toString()){
                itemDom.classList.add('active');
            }
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
    private over:boolean;
    constructor(container:HTMLElement,eBoard:EBoard,listener?:(item:IToolbarItem)=>void){
        this.listener=listener;
        this.initWrap();
        this.initNewItems();
        container.innerHTML='';
        container.appendChild(this.dom);
    }
    private initWrap(){
        const wrap = document.createElement('div');
        wrap.className='eboard-toolbar';
        this.dom=wrap;
    }
    private initNewItems(){
        newItems.forEach((members)=>{
            const itemDom = document.createElement('div');
            const length = members.length;
            const item = members[0];
            itemDom.title=item.name;
            itemDom.className = `eboard-toolbar-item eboard-icon eboard-icon-${item.icon} ${length>1||members[0].children?'eboard-toolbar-expend':''}`;
            itemDom.setAttribute('active','0');
            if(length>1||members[0].children){
                if(item.icon === "wenzi"){
                    itemDom.innerHTML='<i class=\'eboard-icon eboard-icon-line\'/>';
                }else{
                    itemDom.innerHTML='<i class=\'eboard-icon eboard-icon-expend\'/>';
                }
            }
            this.dom.appendChild(itemDom);

            let timer:any;
            const startEvent=(event:any)=>{
                event.cancelBubble = true;
                event.stopPropagation();
                this.closeChild();
                const activeItem = Number(itemDom.getAttribute('active'))||0;
                const key = members[activeItem].key;
                const active = members[activeItem].active;
                if(key !== this.activeKey){
                    this.listener&&this.listener.call(this,members[activeItem]);// 可能不是该item
                }
                if(active !== false){
                    const active = itemDom.parentElement?itemDom.parentElement.querySelector('.active'):undefined;
                    active&&active.classList.remove('active');
                    itemDom.classList.add('active');// 移除
                    this.activeKey= key;
                }
                if(length>1||members[0].children){
                    timer = setTimeout(()=>{
                        clearTimeout(timer);
                        timer = undefined as any;
                        const newMembers = [...members];
                        this.showChild(itemDom,newMembers);
                    },300);
                }
            };
            const hoverEvent=(event:any)=>{
                // this.closeChild();
                if(length>1||members[0].children){
                    this.over = true;
                    this.showChild(itemDom,members);
                }
            };
            const outEvent=(event:any)=>{
                this.dom.lastChild.addEventListener('mousemove',colorEvent);
                this.dom.lastChild.addEventListener('mouseleave',()=>{
                    this.closeChild();
                });
                this.over = false;
                timer = setTimeout(()=>{
                    !this.over&&this.closeChild();
                },300);
            };
            const colorEvent=(event:any)=>{
                clearTimeout(timer);
                timer = undefined as any;
            };
            itemDom.addEventListener('touchstart',startEvent);
            itemDom.addEventListener('mousemove',hoverEvent);
            itemDom.addEventListener('mouseleave',outEvent);
            itemDom.addEventListener('click',(event:any)=>{
                event.cancelBubble = true;
                event.stopPropagation();
                const activeItem = Number(itemDom.getAttribute('active'))||0;
                const key = members[activeItem].key;
                const active = members[activeItem].active;
                if(key !== this.activeKey){
                    this.listener&&this.listener.call(this,members[activeItem]);// 可能不是该item
                }
                if(active !== false){
                    const active = itemDom.parentElement?itemDom.parentElement.querySelector('.active'):undefined;
                    active&&active.classList.remove('active');
                    itemDom.classList.add('active');// 移除
                    this.activeKey= key;
                }
                setActive("activeKey", {key});
                this.closeChild();
            });

            //默认值
            !itemDom.getAttribute('activeColor')&&itemDom.setAttribute('activeColor',defaultActive[members[0].icon === "wenzi" ? "activeW" : members[0].icon === "huabi" ? "activeH" : "activeT"].color);
            !itemDom.getAttribute('activeH')&&itemDom.setAttribute('activeH',defaultActive.activeH.size);
            !itemDom.getAttribute('activeW')&&itemDom.setAttribute('activeW',defaultActive.activeW.size);
            const activeColor = itemDom.getAttribute('activeColor');
            itemDom.firstChild&&((itemDom.firstChild as HTMLElement).style.backgroundColor = activeColor);
            //延时设置缓存的activeKey
            setTimeout(()=>{
                //默认activeT
                if(members[0].icon === "tuxing"&&!Number(itemDom.getAttribute('active'))){
                    itemDom.setAttribute('active',defaultActive.activeT.index);
                    itemDom.className = itemDom.className.replace(/eboard-icon-\S+/,'eboard-icon-'+members[Number(defaultActive.activeT.index)].icon);
                }
                if(members[Number(itemDom.getAttribute('active'))||0].key === defaultActive.activeKey.key){
                    hoverEvent();
                    itemDom.click();
                }
            },500);
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
    
    /**
     * 取消选中
     * @returns {this}
     */
    public disActive(){
        const active = this.dom.querySelector(".active");
        active&&active.classList.remove("active");
        return this;
    }
}

export {Toolbar};