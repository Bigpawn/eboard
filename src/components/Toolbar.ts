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
import {jsColorPicker} from './ColorPicker/ColorPicker';
import easydropdown from 'easydropdown';
import {EBoard} from '../EBoard';

export declare interface IToolbarItem{
    name:string;
    icon:string;
    key:string;
    active?:boolean;
    children?:[];
}


const items:IToolbarItem[][]=[[{
    name:'直线',
    icon:'line',
    key:'line',
},{
    name:'虚线',
    icon:'dotline',
    key:'dotline',
}],[{
    name:'左箭头',
    icon:'arrow-prev',
    key:'arrow-prev',
},{
    name:'右箭头',
    icon:'arrow-next',
    key:'arrow-next',
},{
    name:'双箭头',
    icon:'arrow-both',
    key:'arrow-both',
}],[{
    name:'正圆',
    icon:'circle',
    key:'circle',
},{
    name:'椭圆',
    icon:'ellipse',
    key:'ellipse',
}],[{
    name:'等腰三角形',
    icon:'triangle',
    key:'triangle',
},{
    name:'等边三角形',
    icon:'equilateral-triangle',
    key:'equilateral-triangle',
},{
    name:'直角三角形',
    icon:'orthogonal-triangle',
    key:'orthogonal-triangle',
}],[{
    name:'矩形',
    icon:'rectangle',
    key:'rectangle',
},{
    name:'正方形',
    icon:'square',
    key:'square',
}],[{
    name:'五角星',
    icon:'star',
    key:'star',
},{
    name:'五边形',
    icon:'pentagon',
    key:'pentagon',
},{
    name:'六边形',
    icon:'hexagon',
    key:'hexagon',
},{
    name:'多边形',
    icon:'polygon',
    key:'polygon',
}],[{
    name:'文字',
    icon:'text',
    key:'text',
}],[{
    name:'铅笔',
    icon:'pencil',
    key:'pencil',
}],[{
    name:'清空',
    icon:'clear',
    key:'clear',
    active:false,
}],[{
    name:'删除',
    icon:'del',
    key:'del',
}],[{
    name:'选择',
    icon:'select',
    key:'select',
}],[{
    name:'教鞭',
    icon:'ferule',
    key:'ferule',
}]];

const newItems:IToolbarItem[][]=[
    [{
        name:'选择',
        icon:'xuanze',
        key:'xuanze',
    }],[{
        name:'画笔',
        icon:'huabi',
        key:'huabi',
        children: [4,8,12,16],
    }],[{
        name:'文字',
        icon:'wenzi',
        key:'wenzi',
        children: [14,18,24,26],
    }],[{
        name: '图形',
        icon: 'tuxing',
        key: 'tuxing',
    },{
        name:'直线',
        icon:'zhixian',
        key:'zhixian',
    },{
        name:'实心圆',
        icon:'shixinyuan',
        key:'shixinyuan',
    },{
        name:'实心五角星',
        icon:'shixinxing',
        key:'shixinxing',
    },{
        name:'实心三角形',
        icon:'shixinsanjiao',
        key:'shixinsanjiao',
    },{
        name:'实心矩形',
        icon:'shixinfangxing',
        key:'shixinfangxing',
    },{
        name:'箭头',
        icon:'jiantou',
        key:'jiantou',
    },{
        name:'空心圆',
        icon:'kongxinyuan',
        key:'kongxinyuan',
    },{
        name:'空心五角星',
        icon:'kongxinxing',
        key:'kongxinxing',
    },{
        name:'空心三角形',
        icon:'kongxinsanjiao',
        key:'kongxinsanjiao',
    },{
        name:'空心矩形',
        icon:'kongxinfangxing',
        key:'kongxinfangxing',
    }],[{
        name:'清空',
        icon:'qingkong',
        key:'qingkong',
        active:false,
    }],[{
        name:'教鞭',
        icon:'jiaobian',
        key:'jiaobian',
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
        colors.forEach((item)=>{
            const itemDom = document.createElement('div');
            itemDom.className = `eboard-toolbar-category-color-item`;
            itemDom.style.backgroundColor = item;
            colorDom.appendChild(itemDom);

            itemDom.addEventListener('click',()=>{
                this.from.setAttribute('activeColor',item);
                this.from.firstChild.style.backgroundColor = item;
            });

            const activeColor = this.from.getAttribute('activeColor');
            if(activeColor && activeColor === item){
                itemDom.classList.add('active');
            }
        });
        const lineDom = document.createElement('div');
        lineDom.className = `eboard-toolbar-category-line`;
        this.dom.appendChild(lineDom);
        this.dom.appendChild(colorDom);
        this.from.parentElement&&this.from.parentElement.appendChild(wrap);

        if(this.items[0].children){
            const itemDom = document.createElement('div');
            if(this.items[0].icon === "huabi"){
                itemDom.className = "eboard-toolbar-huabi";
            }else if(this.items[0].icon === "wenzi"){
                itemDom.className = "eboard-toolbar-wenzi";
            }
            this.items[0].children.forEach((item1)=>{
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
                    this.from.setAttribute('activeH',item1);
                });

                const active = this.from.getAttribute('activeH');
                if(active && active === item1.toString()){
                    itemDom1.classList.add('active');
                }
            });
            this.dom.appendChild(itemDom);
        }
    }
    private initRemoveListener(){
        // 才创建就能收到click事件
        const listener = ()=>{
            this.destroy();
            window.removeEventListener('click',listener);
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
    private eBoard:EBoard;
    constructor(container:HTMLElement,eBoard:EBoard,listener?:(item:IToolbarItem)=>void){
        this.listener=listener;
        this.eBoard=eBoard;
        this.initWrap();
        // this.initItems();
        this.initNewItems();
        container.innerHTML='';
        container.appendChild(this.dom);
        // this.createPicker();
        // this.initFontSizePicker();
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
            itemDom.addEventListener('touchstart',startEvent);
            itemDom.addEventListener('mousedown',startEvent);
            itemDom.addEventListener('click',(event:any)=>{
                event.cancelBubble = true;
                event.stopPropagation();
                if(timer){
                    clearTimeout(timer);
                    timer = undefined as any;
                }
            });
        });
    }
    private initItems(){
        items.forEach((members)=>{
            const itemDom = document.createElement('div');
            const length = members.length;
            const item = members[0];
            itemDom.title=item.name;
            itemDom.className = `eboard-toolbar-item eboard-icon eboard-icon-${item.icon} ${length>1?'eboard-toolbar-expend':''}`;
            itemDom.setAttribute('active','0');
            if(length>1){
                itemDom.innerHTML='<i class=\'eboard-icon eboard-icon-expend\'/>';
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
                if(length>1){
                    timer = setTimeout(()=>{
                        clearTimeout(timer);
                        timer = undefined as any;
                        this.showChild(itemDom,members);
                    },300);
                }
            };
            itemDom.addEventListener('touchstart',startEvent);
            itemDom.addEventListener('mousedown',startEvent);
            itemDom.addEventListener('click',(event:any)=>{
                event.cancelBubble = true;
                event.stopPropagation();
                if(timer){
                    clearTimeout(timer);
                    timer = undefined as any;
                }
            });
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
    private createPicker(){
        const strokePickerWrap = document.createElement("div");
        strokePickerWrap.className="eboard-toolbar-item eboard-toolbar-picker";
        strokePickerWrap.title="线条/字体颜色";
        const strokePickerEl = document.createElement('input');
        strokePickerEl.id="eboard_stroke_picker";
        strokePickerEl.value="rgb(0,0,0)";
        strokePickerWrap.appendChild(strokePickerEl);
        this.dom.appendChild(strokePickerWrap);
    
    
        const fillPickerWrap = document.createElement("div");
        fillPickerWrap.className="eboard-toolbar-item eboard-toolbar-picker";
        fillPickerWrap.title="填充颜色";
        const fillPickerEl = document.createElement('input');
        fillPickerEl.id="eboard_fill_picker";
        fillPickerEl.value="rgba(255,255,255,0)";
        fillPickerWrap.appendChild(fillPickerEl);
        this.dom.appendChild(fillPickerWrap);
    
    
        // 触发事件绑定
        strokePickerWrap.addEventListener("click",()=>{
            let ev:any=document.createEvent("MouseEvents");
            ev.initEvent("focus", true, false);
            strokePickerEl.dispatchEvent(ev);
        });
        
        // 触发事件绑定
        fillPickerWrap.addEventListener("click",()=>{
            let ev:any=document.createEvent("MouseEvents");
            ev.initEvent("focus", true, false);
            fillPickerEl.dispatchEvent(ev);
        });
        
        jsColorPicker('.eboard-toolbar-picker > input', {
            customBG: '#222',
            readOnly: true,
            size:3,
            memoryColors: [
                {r: 100, g: 200, b: 10, a: 0.6},
                {r: 80, g: 100, b: 50, a: 0.9},
                {r: 70, g: 80, b: 10, a: 0.9},
                {r: 20, g: 200, b: 60, a: 0.9},
                {r: 88, g: 0, b: 30, a: 0.4},
                {r: 100, g: 0, b: 100, a: 0.6},
                {r: 200, g: 0, b: 0},
                {r: 200, g: 30, b: 100}
            ],
            actionCallback:(e, action)=>{
                if("saveAsBackground" === action){
                    /*      // 保存
                          let ev:any=document.createEvent("MouseEvents");
                          ev.initEvent("blur", true, false);
                          pickerEl.dispatchEvent(ev);*/
                }
            },
            displayCallback:()=>{
                const input = c.input;
                input.parentElement&&(input.parentElement.style.backgroundColor = input.value);
                this.listener&&this.listener.call(this,{
                    key:input.id === "eboard_stroke_picker"?"stroke":"fill",
                    color:input.value
                });
            },
            init:(input:HTMLInputElement)=>{
                input.parentElement&&(input.parentElement.style.backgroundColor = input.value);
            }
        });
    }
    
    /**
     * 12px 以下不支持
     */
    private initFontSizePicker(){
        const fontSizeWrap = document.createElement("div");
        fontSizeWrap.className="eboard-toolbar-item eboard-toolbar-select";
        fontSizeWrap.title="字体大小";
        const fontSizeSelect = document.createElement('select');
        const options:string[]=[];
        options.push("<option value='"+this.eBoard.eDux.config.fontSize+"'>默认</option>");
        options.push("<option value='56'>初号</option>");
        options.push("<option value='48'>小初</option>");
        options.push("<option value='34.7'>一号</option>");
        options.push("<option value='32'>小一</option>");
        options.push("<option value='29.3'>二号</option>");
        options.push("<option value='24'>小二</option>");
        options.push("<option value='21.3'>三号</option>");
        options.push("<option value='20'>小三</option>");
        options.push("<option value='18.7'>四号</option>");
        options.push("<option value='16'>小四</option>");
        options.push("<option value='14'>五号</option>");
        options.push("<option value='12'>小五</option>");
        fontSizeSelect.innerHTML=options.join("");
        fontSizeWrap.appendChild(fontSizeSelect);
        this.dom.appendChild(fontSizeWrap);
        easydropdown(fontSizeSelect,{
            callbacks:{
                onSelect:(value:string)=>{
                    const fontSize = parseFloat(value);
                    this.listener&&this.listener.call(this,{
                        key:"fontSize",
                        fontSize:fontSize
                    });
                }
            }
        });
        // 默认值
        fontSizeSelect.value=this.eBoard.eDux.config.fontSize+"";
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