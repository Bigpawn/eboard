/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/20 11:45
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/20 11:45
 * @disc:前端应用架构类
 * changeList:
 *      画布分辨率固定值设置，不进行差异化处理，像素进行比例处理
 *      支持多实例模式,EDux初始化时共享，不需要进行层级传递（ClassFactory类维护）
 */

import "./style/canvas.less";
import {IBaseFrameOptions, IFrame, IHTMLFrameOptions, IImageFrameOptions} from './interface/IFrame';
import {EmptyFrame} from './frames/EmptyFrame';
import {HtmlFrame} from './frames/HtmlFrame';
import {ImageFrame} from './frames/ImageFrame';
import {PdfFrame} from "./frames/PdfFrame";
import {ImagesFrame} from './frames/ImagesFrame';
import {MessageMiddleWare} from './middlewares/MessageMiddleWare';
import {MessageAdapter} from './interceptor/MessageAdapter';
import {IImagesFrameOptions,IPdfFrameOptions} from './interface/IFrameGroup';
import {
    Arrow, Circle, Clear, Ellipse, EquilateralTriangle, Hexagon, Line,
    OrthogonalTriangle, Pencil, Pentagon,
    Plugins, Polygon, Rectangle, Square, Star, Triangle, Text, Delete,Selection
} from './plugins';
import {Tab, TabEventEnum} from './components/Tab';
import {Toolbar} from './components/Toolbar';
import {message} from './utils/decorators';
import {IConfig} from './interface/IConfig';
import {MessageTag} from './enums/MessageTag';
import {Context} from './static/Context';
import {FrameType, IPluginConfigOptions} from './enums/SDKEnum';
import {Config} from './static/Config';


class EBoard{
    private body:HTMLDivElement;
    private readonly container:HTMLDivElement;
    private tab:Tab;
    public toolbar:Toolbar;
    private calcSize:any;
    private middleWare:MessageMiddleWare;
    private readonly context:Context;
    constructor(container:HTMLDivElement,config?:IConfig){
        this.context=new Context(config);
        this.container=container;
        this.initLayout();
        this.init();
        const {showTab,showToolbar} = this.context.getConfig() as Config;
        if(showTab){
            this.initTab();
        }
        if(showToolbar){
            this.initToolbar();
        }
        // plugin事件监听
        this.observePlugins();
    }
    /**
     * 初始化config 及事件Emitter 消息adapter
     */
    private init(){
        this.middleWare=new MessageMiddleWare(this.context);
        this.context.adapter = new MessageAdapter(this.middleWare);
        this.calcSize=this.calc();
        // 画布分辨率比例计算
        this.context.transform=(size:number)=>{
            return size * this.calcSize.dimensions.width / this.calcSize.width;
        };
        
        window.addEventListener("resize",()=>{
            this.calcSize=this.calc();
            // 画布分辨率比例计算
            this.context.transform=(size:number)=>{
                return size * this.calcSize.dimensions.width / this.calcSize.width;
            };
            // 触发所有frame 的重新layout
            this.context.trigger("resize",this.calcSize);
        })
    }
    
    
    private initLayout(){
        const body = document.createElement("div");
        body.className="eboard-body";
        this.body=body;
        this.container.appendChild(body);
    }
    
    @message
    private switchMessage(id:string){
        return {
            activeKey:id,
            tag:MessageTag.SwitchToFrame
        }
    }
    private initTab(){
        if(!this.context.config.showTab){
            return;
        }
        this.tab=new Tab(this.container);
        this.tab.on(TabEventEnum.Add,()=>{
           // 创建空白的画布
           this.addEmptyFrame({
               type:FrameType.Empty,
               name:"空白"
           })
        });
        this.tab.on(TabEventEnum.Switch,(e: any) => {
            const tabId = e.data;
            this.switchToTab(tabId);// switch事件
        });
        this.tab.on(TabEventEnum.Remove,(e: any)=>{
            const tabId = e.data;
            this.removeTab(tabId);
        });
    }
    private initToolbar(){
        const wrap = document.createElement("div");
        wrap.className="eboard-toolbar-wrap";
        this.container.appendChild(wrap);
        this.toolbar = new Toolbar(wrap,this.context.config,(item:any)=>{
            const {name,color,size} = item;
            switch (item.key){
                case "line":
                    this.context.dashed=false;
                    this.setActivePlugin(Plugins.Line);
                    break;
                case "dotline":
                    this.context.dashed=false;
                    this.setActivePlugin(Plugins.DotLine);
                    break;
                case "arrow-next":
                    this.context.dashed=false;
                    this.setActivePlugin(Plugins.ArrowNext);
                    break;
                case "arrow-prev":
                    this.context.dashed=false;
                    this.setActivePlugin(Plugins.ArrowPrev);
                    break;
                case "arrow-both":
                    this.context.dashed=false;
                    this.setActivePlugin(Plugins.Arrow);
                    break;
                case "dotcircle":
                    this.context.dashed=true;
                    this.setActivePlugin(Plugins.Circle);
                    break;
                case "circle":
                    this.context.dashed=false;
                    this.setActivePlugin(Plugins.Circle);
                    break;
                case "ellipse":
                    this.setActivePlugin(Plugins.Ellipse);
                    break;
                case "dottriangle":
                    this.context.dashed=true;
                    this.setActivePlugin(Plugins.Triangle);
                    break;
                case "triangle":
                    this.context.dashed=false;
                    this.setActivePlugin(Plugins.Triangle);
                    break;
                case "equilateral-triangle":
                    this.setActivePlugin(Plugins.EquilateralTriangle);
                    break;
                case "orthogonal-triangle":
                    this.setActivePlugin(Plugins.OrthogonalTriangle);
                    break;
                case "dotrectangle":
                    this.context.dashed=true;
                    this.setActivePlugin(Plugins.Rectangle);
                    break;
                case "rectangle":
                    this.context.dashed=false;
                    this.setActivePlugin(Plugins.Rectangle);
                    break;
                case "square":
                    this.setActivePlugin(Plugins.Square);
                    break;
                case "dotstar":
                    this.context.dashed=true;
                    this.setActivePlugin(Plugins.Star);
                    break;
                case "star":
                    this.context.dashed=false;
                    this.setActivePlugin(Plugins.Star);
                    break;
                case "pentagon":
                    this.setActivePlugin(Plugins.Pentagon);
                    break;
                case "hexagon":
                    this.setActivePlugin(Plugins.Hexagon);
                    break;
                case "polygon":
                    this.setActivePlugin(Plugins.Polygon);
                    break;
                case "text":
                    this.setActivePlugin(Plugins.Text);
                    break;
                case "pencil":
                    this.setActivePlugin(Plugins.Pencil);
                    break;
                case "clear":
                    this.setActivePlugin(Plugins.Clear);
                    break;
                case "del":
                    this.setActivePlugin(Plugins.Delete);
                    break;
                case "select":
                    this.setActivePlugin(Plugins.Selection);
                    break;
                case "ferule":
                    this.setActivePlugin(Plugins.Ferule);
                    break;
                case "stroke":
                    break;
                case "fill":
                    break;
                case "color":
                    // 颜色设置
                    switch (name){
                        case "pencil":
                            this.context.pencilColor=color;
                            break;
                        case "text":
                            this.context.fontColor=color;
                            break;
                        default:
                            this.context.color=color;
                            break;
                    }
                    break;
                case "size":
                    switch (name){
                        case "pencil":
                            this.context.pencilWidth=size;
                            break;
                        case "text":
                            this.context.fontSize=size;
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }
        });
    }
    private observePlugins(){
        this.context.store.on("plugin:active",(event:any)=>{
            const data = event.data;
            const {plugin,options} = data;
            switch (plugin){
                case Plugins.ArrowPrev:
                case Plugins.Arrow:
                case Plugins.ArrowNext:
                case Plugins.Line:
                case Plugins.Hexagon:
                case Plugins.Pentagon:
                case Plugins.Star:
                case Plugins.Polygon:
                case Plugins.OrthogonalTriangle:
                case Plugins.EquilateralTriangle:
                case Plugins.Triangle:
                case Plugins.Square:
                case Plugins.Rectangle:
                case Plugins.Circle:
                case Plugins.Pencil:
                case Plugins.Text:
                case Plugins.Ellipse:
                case Plugins.HTML:
                case Plugins.Selection:
                case Plugins.Ferule:
                    this.context.store.plugins.clear();
                    this.context.store.plugins.set(plugin,{
                        ...options,
                        enable:true,
                    });
                    break;
                case Plugins.Clear:
                    // 不设置，仅清空当前显示的画布 发送clear消息
                    const activeKey = this.context.activeKey;
                    // 判断是frame还是frameGroup
                    const group = this.context.getGroupById(activeKey);
                    if(group){
                        // group
                        const frame = group.pageFrame;
                        if(void 0 !== frame){
                            const instance = frame.getPlugin(Plugins.Clear) as Clear;
                            instance.clear();
                        }
                    }else{
                        // frame
                        const frame = this.context.getFrameById(activeKey);
                        if(void 0 !== frame){
                            const instance = frame.getPlugin(Plugins.Clear) as Clear;
                            instance.clear();
                        }
                    }
                    return;
                default:
                    break;
            }
        });
        this.context.store.on("plugin:disable",(event:any)=>{
            const data = event.data;
            const {plugin} = data;
            if(this.context.store.plugins.has(plugin)){
                this.context.store.plugins.delete(plugin);
            }
        });
    }
    
    
    /**
     * 添加空白画布
     * @param {IBaseFrameOptions} options
     * @returns {IBaseFrame}
     */
    public addEmptyFrame(options:IBaseFrameOptions){
        const {frameId} = options;
        let frame = void 0 !== frameId?this.context.getFrameById(frameId):undefined;
        if(void 0 !==frame) return frame;
        options.calcSize =Object.assign({},this.calcSize,options.width?{
            originWidth:options.width,
            scale:this.calcSize.width/options.width
        }:{});
        options.container = this.body;
        frame = new EmptyFrame(this.context,options);
        if(void 0 !== this.tab){
            this.tab.addTab({
                tabId:frame.frameId,
                label:options.name||""
            });
        }
        return frame;
    }
    
    /**
     * 添加HtmlFrame
     * @param {IHTMLFrameOptions} options
     * @returns {IHTMLFrame}
     */
    public addHtmlFrame(options:IHTMLFrameOptions){
        const {frameId} = options;
        let frame=void 0 !== frameId?this.context.getFrameById(frameId):undefined;
        if(void 0 !==frame) return frame;
        options.calcSize =Object.assign({},this.calcSize,options.width?{
            originWidth:options.width,
            scale:this.calcSize.width/options.width
        }:{});
        options.container = this.body;
        frame = new HtmlFrame(this.context,options);
        if(void 0 !== this.tab){
            this.tab.addTab({
                tabId:frame.frameId,
                label:options.name||""
            });
        }
        return frame;
    }
    
    /**
     * 添加ImageFrame
     * @param {IImageFrameOptions} options
     * @returns {IImageFrame}
     */
    public addImageFrame(options:IImageFrameOptions){
        const {frameId} = options;
        let frame=void 0 !== frameId?this.context.getFrameById(frameId):undefined;
        if(void 0 !==frame) return frame;
        options.calcSize =Object.assign({},this.calcSize,options.width?{
            originWidth:options.width,
            scale:this.calcSize.width/options.width
        }:{});
        options.container = this.body;
        frame = new ImageFrame(this.context,options);
        if(void 0 !== this.tab){
            this.tab.addTab({
                tabId:frame.frameId,
                label:options.name||""
            });
        }
        return frame;
    }
    
    /**
     * 添加PdfFrame
     * @param {IPdfFrameOptions} options
     * @returns {IPdfFrame}
     */
    public addPdfFrame(options:IPdfFrameOptions){
        const {groupId} = options;
        let group = void 0 !== groupId?this.context.getGroupById(groupId):undefined;
        if(group) return group;
        options.calcSize =Object.assign({},this.calcSize,options.width?{
            originWidth:options.width,
            scale:this.calcSize.width/options.width
        }:{});
        options.container = this.body;
        group = new PdfFrame(this.context,options);
        if(void 0 !== this.tab){
            this.tab.addTab({
                tabId:group.groupId,
                label:options.name||""
            });
        }
        return group;
    }
    
    /**
     * 添加ImagesFrame
     * @param {IImagesFrameOptions} options
     * @returns {ImagesFrame}
     */
    public addImagesFrame(options:IImagesFrameOptions){
        const {groupId} = options;
        let group = void 0 !== groupId?this.context.getGroupById(groupId):undefined;
        if(group) return group;
        options.calcSize =Object.assign({},this.calcSize,options.width?{
            originWidth:options.width,
            scale:this.calcSize.width/options.width
        }:{});
        options.container = this.body;
        group = new ImagesFrame(this.context,options);
        if(void 0 !== this.tab){
            this.tab.addTab({
                tabId:group.groupId,
                label:options.name||""
            });
        }
        return group;
    }
    
    /**
     * 计算calc add 时需要调用，传递进去，发送消息时需要使用
     * @param {number} originWidth
     * @returns {any}
     * 接收端仅originWidth和scale受影响，其他不变
     */
    private calc(){
        const parentElement = this.body;
        const {offsetWidth:width,offsetHeight:height} = parentElement;
        let ratio=this.context.config.ratio;
        const _ratioW=ratio.w;
        const _ratioH=ratio.h;
        const ratioNum=_ratioW/_ratioH;
        let calcSize:any;
        const defaultDimensionW = this.context.config.dimensions.width;
        let w:number,h:number;
        if(width/height>ratioNum){
            w = height * ratioNum;
            h = height;
        }else{
            w = width;
            h = width / ratioNum;
        }
        calcSize={
            width:w,
            height:h,
            dimensions:{
                width:defaultDimensionW,
                height:defaultDimensionW * h/w,
            },
            originWidth:w,
            scale:1
        };
        return calcSize;
    }
    
    /**
     * 添加FrameGroup
     * @param {IImagesFrameOptions | IPdfFrameOptions} options
     * @returns {(ImagesFrame | ImagesFrame) | (PdfFrame | PdfFrame)}
     */
    private addFrameGroup(options:IImagesFrameOptions|IPdfFrameOptions){
        const type = options.type;
        return type === FrameType.Images?this.addImagesFrame(options as IImagesFrameOptions):this.addPdfFrame(options as IPdfFrameOptions);
    }
    
    /**
     * 添加 Frame
     * @param {IBaseFrameOptions | IImageFrameOptions | IHTMLFrameOptions} options
     * @returns {(ImageFrame | ImageFrame) | (HtmlFrame | HtmlFrame) | (BaseFrame | BaseFrame)}
     */
    private addFrame(options:IBaseFrameOptions|IImageFrameOptions|IHTMLFrameOptions){
        const type = options.type;
        return type === FrameType.Image?this.addImageFrame(options as IImageFrameOptions):type === FrameType.HTML?this.addHtmlFrame(options as IHTMLFrameOptions):this.addEmptyFrame(options as IBaseFrameOptions);
    }
    
    /**
     * 显示指定的Frame
     * @param {string | IFrame | IFrameGroup} id
     * @param forbidMessage
     * @returns {undefined | IFrame | IFrameGroup}
     */
    public switchToTab(id:string,forbidMessage?:boolean){
        const activeKey = this.context.activeKey;
        if(id===activeKey) return;
        const frameInstance = this.context.getFrameById(id);
        const groupInstance = this.context.getGroupById(id);
        
        if(!frameInstance&&!groupInstance){
            return;
        }
        // 显示隐藏，不能进行移除
        if(activeKey){
            const oldFrameInstance = this.context.getFrameById(activeKey);
            const oldGroupInstance = this.context.getGroupById(activeKey);
            if(oldFrameInstance&&oldFrameInstance.dom&&oldFrameInstance.dom.parentElement){
                oldFrameInstance.dom.classList.add("eboard-hide");
                // oldFrameInstance.dom.parentElement.removeChild(oldFrameInstance.dom); // 隐藏
            }
            if(oldGroupInstance&&oldGroupInstance.dom&&oldGroupInstance.dom.parentElement){
                oldGroupInstance.dom.classList.add("eboard-hide");
                // oldGroupInstance.dom.parentElement.removeChild(oldGroupInstance.dom); // 隐藏
            }
        }
        if(frameInstance&&frameInstance.dom){
            if(frameInstance.dom.parentElement){
                frameInstance.dom.classList.remove("eboard-hide");
            }else{
                frameInstance.container.appendChild(frameInstance.dom);
            }
        }else if(groupInstance&&groupInstance.dom){
            if(groupInstance&&groupInstance.dom.parentElement){
                groupInstance.dom.classList.remove("eboard-hide");
            }else{
                groupInstance.container.appendChild(groupInstance.dom);
            }
        }
        this.context.setActiveKey(id);
        if(void 0 !== this.tab){
            this.tab.switchTo(id);
        }
        if(!forbidMessage){
            this.switchMessage(id);
        }
    }
    
    @message
    public removeTab(tabId:string, forbidMessage?:boolean){
        const frameInstance = this.context.getFrameById(tabId);
        const groupInstance = this.context.getGroupById(tabId);
        if(void 0 !== frameInstance){
            frameInstance.destroy();
            this.context.deleteFrame(tabId);
            frameInstance.dom.parentElement&&frameInstance.dom.parentElement.removeChild(frameInstance.dom);
        }else if(groupInstance){
            groupInstance.destroy();
            this.context.deleteGroup(tabId);
            groupInstance.dom.parentElement&&groupInstance.dom.parentElement.removeChild(groupInstance.dom);
        }
        if(void 0 !== this.tab){
            this.tab.removeTab(tabId);
        }
        
        // 显示最后一个tab
        const activeKey = this.context.activeKey;
        if(activeKey === tabId){
            const activeTabId = this.tab.getLastTabId();
            if(activeTabId){
                this.switchToTab(activeTabId,true);
            }
        }
        return forbidMessage?undefined:{
            tag:MessageTag.RemoveTab,
            tabId:tabId
        }
    }
    
    
    
    /**
     * 数据恢复  会暂停消息接收，等待回执完成后触发消息接收
     * @param {string[]} messageList
     */
    public recovery(messageList:string[]){
    
    }
    
    
    /**
     * 消息分发
     * @param {string} message
     * 消息内容节能会被压缩，需要解压
     * @param recovery 是否用于恢复
     */
    public onMessage(message:string,recovery?:boolean){
        const messageObj:any = this.middleWare.decompressMessage(message);
        const {frameId,groupId,...options} = messageObj;
        let {tag,type} = options;
        if(tag===MessageTag.CreateFrame){
            this.addFrame(messageObj);
            return;
        }
        if(tag===MessageTag.CreateFrameGroup){
            this.addFrameGroup(messageObj);
            return;
        }
        if(frameId){
            this.context.getFrame(frameId).then((frame:IFrame)=>{
                switch (tag){
                    case MessageTag.Clear:
                        // 清空
                        (frame.getPlugin(Plugins.Clear) as Clear).onMessage();
                        break;
                    case MessageTag.Delete:
                        (frame.getPlugin(Plugins.Delete) as Delete).onMessage(options);
                        break;
                    case MessageTag.Scroll:
                        if(recovery){
                            frame.scrollbar&&frame.scrollbar.recovery(options);
                        }else{
                            frame.scrollbar&&frame.scrollbar.onMessage(options);
                        }
                        break;
                    case MessageTag.Cursor:
                        frame.engine&&frame.engine.eBoardCanvas.onMessage(options);
                        break;
                    case MessageTag.SelectionMove:
                        (frame.getPlugin(Plugins.Selection) as Selection).onMessage(options);
                        break;
                    case MessageTag.SelectionScale:
                        (frame.getPlugin(Plugins.Selection) as Selection).onMessage(options);
                        break;
                    case MessageTag.SelectionRotate:
                        (frame.getPlugin(Plugins.Selection) as Selection).onMessage(options);
                        break;
                    case MessageTag.Paste:
                        (frame.getPlugin(Plugins.Selection) as Selection).onMessage(options);
                        break;
                    case MessageTag.Cut:
                        (frame.getPlugin(Plugins.Selection) as Selection).onMessage(options);
                        break;
                    default:
                        if(void 0 !== frame){
                            switch (type){
                                case "line":
                                    (frame.getPlugin(Plugins.Line) as Line).onMessage(options);
                                    break;
                                case "arrow":
                                    (frame.getPlugin(Plugins.Arrow) as Arrow).onMessage(options);
                                    break;
                                case "circle":
                                    (frame.getPlugin(Plugins.Circle) as Circle).onMessage(options);
                                    break;
                                case "ellipse":
                                    (frame.getPlugin(Plugins.Ellipse) as Ellipse).onMessage(options);
                                    break;
                                case "hexagon":
                                    (frame.getPlugin(Plugins.Hexagon) as Hexagon).onMessage(options);
                                    break;
                                case "pentagon":
                                    (frame.getPlugin(Plugins.Pentagon) as Pentagon).onMessage(options);
                                    break;
                                case "polygon":
                                    (frame.getPlugin(Plugins.Polygon) as Polygon).onMessage(options);
                                    break;
                                case "star":
                                    (frame.getPlugin(Plugins.Star) as Star).onMessage(options);
                                    break;
                                case "rectangle":
                                    (frame.getPlugin(Plugins.Rectangle) as Rectangle).onMessage(options);
                                    break;
                                case "square":
                                    (frame.getPlugin(Plugins.Square) as Square).onMessage(options);
                                    break;
                                case "equilateral-triangle":
                                    (frame.getPlugin(Plugins.EquilateralTriangle) as EquilateralTriangle).onMessage(options);
                                    break;
                                case "orthogonal-triangle":
                                    (frame.getPlugin(Plugins.OrthogonalTriangle) as OrthogonalTriangle).onMessage(options);
                                    break;
                                case "triangle":
                                    (frame.getPlugin(Plugins.Triangle) as Triangle).onMessage(options);
                                    break;
                                case "pencil":
                                    (frame.getPlugin(Plugins.Pencil) as Pencil).onMessage(options);
                                    break;
                                case "text":
                                    (frame.getPlugin(Plugins.Text) as Text).onMessage(options);
                                    break;
                                default:
                                    break;
                            }
                        }
                        break;
                }
            })
        }else if(groupId){
            switch (tag) {
                case MessageTag.CreateFrame:// 创建frame
                    this.addFrame(messageObj);
                    break;
                case MessageTag.CreateFrameGroup:
                    this.addFrameGroup(messageObj);
                    break;
                case MessageTag.TurnPage:
                    this.context.getGroup(groupId).then((group:any)=>{
                        group.onGo(options.pageNum,options.messageId);
                    });
                    break;
                default:
                    break;
            }
        }else{
            switch (tag){
                case MessageTag.SwitchToFrame:
                    this.switchToTab(options.activeKey,true);
                    break;
                case MessageTag.RemoveTab:
                    this.removeTab(options.tabId,true);
                    break;
                default:
                    break;
            }
        }
    }
    
    /**
     * 事件监听
     * @param {string} type
     * @param {(data: any) => void} listener
     */
    public on(type:string,listener:(data:any)=>void){
        this.context.on(type,listener);
    };
    public off(type:string,listener:(data:any)=>void){
        this.context.off(type,listener);
    }
    /**
     * 支持后台运行模式启用
     * @param {Plugins} plugin
     * @param {IPluginConfigOptions} options
     */
    public setActivePlugin(plugin:Plugins,options?:IPluginConfigOptions){
        this.context.store.trigger("plugin:active",{
            plugin:plugin,
            options:options||{}
        });
    }
    
    /**
     * 设置不可用
     * @returns {this}
     */
    public setDisable(){
        const container = this.body;
        container.parentElement&&container.parentElement.classList.add("eboard-disable");
        this.context.setConfig("enable",false);
        return this;
    }
    
    /**
     * 设置可用
     * @returns {this}
     */
    public setEnable(){
        const container = this.body;
        container.parentElement&&container.parentElement.classList.remove("eboard-disable");
        this.context.setConfig("enable",true);
        return this;
    }
    
    public getFrameGroup(groupId:string){
        return this.context.getGroupById(groupId);
    }
    public getFrame(frameId:string){
        return this.context.getFrameById(frameId);
    }
}

export {EBoard};