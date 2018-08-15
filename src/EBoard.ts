/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/20 11:45
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/20 11:45
 * @disc:前端应用架构类 设计到窗口概念  frame 可应用为Tab
 * frame 中管理canvas实例，canvas实例中管理绘制object实例  层级化，frame中提供object实例查询 canvas中提供跨实例object实例查询
 * 支持页面中多实例模式，多容器模式，从静态类修改成实体类
 * 消息代理应该从该对象拦截
 * 通过事件传递插件启用状态
 * 数据共享机制通过eventBus进行缓存
 *
 * 添加enable控制：disable情况下所有操作均不可用，且误操作不会发送消息
 *
 */

import {
    IBaseFrameOptions, ICanvasFrameOptions, IFrame,
    IHTMLFrameOptions, IImageFrameOptions,
} from './interface/IFrame';
import {BaseFrame} from './frames/BaseFrame';
import {HtmlFrame} from './frames/HtmlFrame';
import {ImageFrame} from './frames/ImageFrame';
import {CanvasFrame} from './frames/CanvasFrame';
import {PdfFrame} from "./frames/PdfFrame";
import {ImagesFrame} from './frames/ImagesFrame';

import "./style/canvas.less";
import {
    MessageMiddleWare, MessageTagEnum,
} from './middlewares/MessageMiddleWare';
import {MessageAdapter} from './interceptor/MessageAdapter';
import {
    IFrameGroup, IImagesFrameOptions,
    IPdfFrameOptions,
} from './interface/IFrameGroup';
import {
    Arrow, Circle, Clear, Ellipse, EquilateralTriangle, Hexagon, Line,
    OrthogonalTriangle, Pencil, Pentagon,
    Plugins, Polygon, Rectangle, Square, Star, Triangle, Text, Delete,Selection
} from './plugins';
import {EDux, IPluginConfigOptions} from './utils/EDux';
import {Tab} from './components/Tab';
import {Toolbar} from './components/Toolbar';
import {message} from './utils/decorators';

export enum FrameType{
    Empty="empty-frame",Image="image-frame",HTML="html-frame",Canvas="canvas-frame",Pdf="pdf-frame",Images="images-frame"
}

declare interface IEboardOptions{
    ratio:string
}

class EBoard{
    private eDux:EDux=new EDux();
    private frames:Map<string,IFrame|IFrameGroup>=new Map();// frame管理
    private activeFrame:string;
    private container:HTMLDivElement;
    public messageMiddleWare = new MessageMiddleWare();
    private tabContainer:HTMLDivElement;
    private tab:Tab;
    private ratio:string;
    private getContainer(){
        return this.container;
    }
    constructor(container:HTMLDivElement,options?:IEboardOptions){
        this.ratio = options?(options.ratio||"16:9"):"16:9";
        
        
        // plugin事件监听
        this.observePlugins();
        this.eDux.adapter = new MessageAdapter(this,false);
        
       this.initTab(container);
    
        const body = document.createElement("div");
        body.className="eboard-body";
        this.container=body;
        container.appendChild(body);
        
        
        this.initToolbar(container);
        
        
        
    }
    
    @message
    private switchMessage(id:string){
        return {
            frameId:id,
            tag:MessageTagEnum.SwitchToFrame
        }
    }
    private initTab(container:HTMLDivElement){
        const tabContainer = document.createElement("div");
        tabContainer.className = "eboard-tabs";
        this.tabContainer=tabContainer;
        container.appendChild(tabContainer);
        this.tab=new Tab(tabContainer);
        this.tab.on("switch",(e: any) => {
            const tabId = e.data;
            this.switchToFrame(tabId);// switch事件
            this.switchMessage(tabId);
        });
        this.tab.on("remove",function(e: any) {
            const tabId = e.data;
            alert(tabId);
        });
    }
    private initToolbar(container:HTMLDivElement){
        const wrap = document.createElement("div");
        wrap.className="eboard-toolbar-wrap";
        container.appendChild(wrap);
        let toolbar = new Toolbar(wrap,(item:any)=>{
            switch (item.key){
                case "line":
                    this.setActivePlugin(Plugins.Line);
                    break;
                case "arrow-next":
                    this.setActivePlugin(Plugins.ArrowNext);
                    break;
                case "arrow-prev":
                    this.setActivePlugin(Plugins.ArrowPrev);
                    break;
                case "arrow-both":
                    this.setActivePlugin(Plugins.Arrow);
                    break;
                case "circle":
                    this.setActivePlugin(Plugins.Circle);
                    break;
                case "ellipse":
                    this.setActivePlugin(Plugins.Ellipse);
                    break;
                case "triangle":
                    this.setActivePlugin(Plugins.Triangle);
                    break;
                case "equilateral-triangle":
                    this.setActivePlugin(Plugins.EquilateralTriangle);
                    break;
                case "orthogonal-triangle":
                    this.setActivePlugin(Plugins.OrthogonalTriangle);
                    break;
                case "rectangle":
                    this.setActivePlugin(Plugins.Rectangle);
                    break;
                case "square":
                    this.setActivePlugin(Plugins.Square);
                    break;
                case "star":
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
                    this.setStrokeColor(item.color);
                    break;
                case "fill":
                    this.setFillColor(item.color);
                    break;
                default:
                    break;
            }
        });
    }
    private observePlugins(){
        this.eDux.on("plugin:active",(event:any)=>{
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
                    // 数据共享
                    if(!options.background){
                        this.eDux.sharedData.plugins.clear();// clear 什么时候触发
                    }
                    this.eDux.sharedData.plugins.set(plugin,{
                        ...options,
                        enable:true,
                    });
                    break;
                case Plugins.Clear:
                    // 不设置，仅清空当前显示的画布 发送clear消息
                    if(void 0 !== this.activeFrame){
                        const frame = this.findFrameById(this.activeFrame);
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
        this.eDux.on("plugin:disable",(event:any)=>{
            const data = event.data;
            const {plugin} = data;
            if(this.eDux.sharedData.plugins.has(plugin)){
                this.eDux.sharedData.plugins.delete(plugin);
            }
        });
    }
    
    /**
     * 创建frame ，创建完成立即显示
     * @param {IBaseFrameOptions | IHTMLFrameOptions | IImageFrameOptions | ICanvasFrameOptions | IPdfFrameOptions | IImagesFrameOptions} options
     * @returns {IFrame | IFrameGroup}
     */
    public createFrame(options:IBaseFrameOptions|IHTMLFrameOptions|IImageFrameOptions|ICanvasFrameOptions|IPdfFrameOptions|IImagesFrameOptions){
        const {id,type} = options;
        let frame:IFrame|IFrameGroup;
        if(void 0 !== id && this.hasFrame(id)){
            frame = this.findFrameById(id) as IFrame|IFrameGroup;
            this.switchToFrame(frame);
            return frame;
        }
        options.container = this.getContainer();
        options.eDux = this.eDux;
        options.ratio = this.ratio;
        switch (type){
            case FrameType.HTML:
                frame = new HtmlFrame(options as IHTMLFrameOptions);
                break;
            case FrameType.Image:
                frame = new ImageFrame(options as IImageFrameOptions);
                break;
            case FrameType.Canvas:
                frame = new CanvasFrame(options as ICanvasFrameOptions);
                break;
            case FrameType.Pdf:
                frame = new PdfFrame(options as IPdfFrameOptions);
                break;
            case FrameType.Images:
                frame = new ImagesFrame(options as IImagesFrameOptions);
                break;
            case FrameType.Empty:
            default:
                frame = new BaseFrame(options as IBaseFrameOptions);
                break;
        }
        this.frames.set(frame.id,frame);
        this.switchToFrame(frame);
        this.tab.addTab({
            tabId:frame.id,
            label:frame.id
        });
        return frame;
    }
    
    public createBaseFrame(options:IBaseFrameOptions){
        return this.createFrame(options) as BaseFrame;
    }
    
    public createHtmlFrame(options:IHTMLFrameOptions){
        return this.createFrame(options) as HtmlFrame;
    }
    
    public createImageFrame(options:IImageFrameOptions){
        return this.createFrame(options) as ImageFrame;
    }
    
    public createCanvasFrame(options:ICanvasFrameOptions){
        return this.createFrame(options) as CanvasFrame;
    }
    
    public createPdfFrame(options:IPdfFrameOptions){
        return this.createFrame(options) as PdfFrame;
    }
    
    public createImagesFrame(options:IImagesFrameOptions){
        return this.createFrame(options) as ImagesFrame;
    }
    
    /**
     * 显示指定的Frame
     * @param {string | IFrame | IFrameGroup} id
     * @returns {undefined | IFrame | IFrameGroup}
     */
    public switchToFrame(id:string|IFrame|IFrameGroup){
        // 支持frameType标识和对象
        if(typeof id === 'string'){
            if(id === this.activeFrame||!this.hasFrame(id)){
                return;
            }
        }else{
            if(id.id === this.activeFrame||!this.hasFrame(id.id)){
                return;
            }
        }
        if(this.activeFrame){
            const frame = this.findFrameById(this.activeFrame);
            if(frame&&frame.dom&&frame.dom.parentElement){
                frame.dom.parentElement.removeChild(frame.dom); // 隐藏
            }
        }
        this.activeFrame = typeof id === 'string'?id:id.id;
        const activeFrame = typeof id === 'string'?this.findFrameById(id):id;
        if(activeFrame&&activeFrame.dom){
            activeFrame.container.appendChild(activeFrame.dom);// 如果是子frame则存在问题
        }
        this.tab.switchTo(this.activeFrame);
        return activeFrame;
    }
    
    /**
     * 根据id获取frame实例
     * @param {string} id
     * @returns {IFrame | IFrameGroup | undefined}
     */
    public findFrameById(id:string){
        return this.frames.get(id);
    }
    
    /**
     * 检测是否存在某个frame
     * @returns {boolean}
     * @param id
     */
    public hasFrame(id:string){
        return this.frames.has(id);
    }
    
    /**
     * 清空缓存
     * @returns {this}
     */
    public clearCache(){
        if(this.frames.size>0){
            this.frames.forEach(frame=>{
                frame.destroy();
            });
            this.frames.clear();
        }
        return this;
    }

    /**
     * 消息分发
     * @param {IMessage} message
     */
    public onMessage(message:string){
        const messageObj:any = JSON.parse(message);
        // 获取frame实例，之后根据操作处理
        const {frame:frameOptions,group:frameGroupOptions,...options} = messageObj;
        const {tag,type} = options;
        
        let frame:IFrame = undefined as any,frameGroup = undefined as any;
        
        // 有分组
        if(void 0 !== frameGroupOptions){
            frameGroup = this.createFrame(frameGroupOptions) as IFrameGroup;// 创建或查询frameGroup
            // 子frame
            if(void 0 !== frameOptions){
                // 默认第一页的话不需要调用onGp
                frame = frameGroup.createFrame({
                    pageNum:Number(frameOptions.id),
                    messageId:frameOptions.messageId
                }) as IFrame;
                // 执行跳转逻辑
                if(frameOptions.id !== "1"){
                    frameGroup.onGo(frameOptions.id,frameOptions.messageId);
                }
            }
        }else{
            if(void 0 !== frameOptions){
                frame = this.createFrame(frameOptions) as IFrame;
            }
        }
        
        switch (tag){
            case MessageTagEnum.CreateFrame:// 创建frame
                this.createFrame(messageObj);
                break;
            case MessageTagEnum.CreateFrameGroup:
                this.createFrame(messageObj);
                break;
            case MessageTagEnum.SwitchToFrame:
                if(void 0 !== frameGroup){
                    frameGroup.onGo(options.pageNum,options.messageId);
                }else{
                    this.switchToFrame(options.frameId);
                }
                break;
            case MessageTagEnum.Clear:
                // 清空
                (frame.getPlugin(Plugins.Clear) as Clear).onMessage();
                break;
            case MessageTagEnum.Delete:
                (frame.getPlugin(Plugins.Delete) as Delete).onMessage(options);
                break;
            case MessageTagEnum.Scroll:
                frame.scrollbar&&frame.scrollbar.onMessage(options);
                break;
            case MessageTagEnum.Cursor:
                frame.engine&&frame.engine.eBoardCanvas.onMessage(options);
                break;
            case MessageTagEnum.SelectionMove:
                (frame.getPlugin(Plugins.Selection) as Selection).onMessage(options);
                break;
            case MessageTagEnum.SelectionScale:
                (frame.getPlugin(Plugins.Selection) as Selection).onMessage(options);
                break;
            case MessageTagEnum.SelectionRotate:
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
    }
    
    public attachMessageMiddleWare(listener:(message:string)=>void){
        this.messageMiddleWare.setOutputListener(listener);
    }
    
    /**
     * 支持后台运行模式启用
     * @param {Plugins} plugin
     * @param {IPluginConfigOptions} options
     */
    public setActivePlugin(plugin:Plugins,options?:IPluginConfigOptions){
        this.eDux.trigger("plugin:active",{
            plugin:plugin,
            options:options||{}
        });
    }
    
    /**
     * 设置strokeColor
     * @param {string} color
     * @returns {this}
     */
    public setStrokeColor(color:string){
        this.eDux.sharedData.stroke=color;
        return this;
    }
    
    /**
     * 设置fillColor
     * @param {string} color
     * @returns {this}
     */
    public setFillColor(color:string){
        this.eDux.sharedData.fill=color;
        return this;
    }
    
    /**
     * 设置不可用
     * @returns {this}
     */
    public setDisable(){
        const container = this.getContainer();
        container.parentElement&&container.parentElement.classList.add("eboard-disable");
        this.eDux.sharedData.enable=false;
        return this;
    }
    
    /**
     * 设置可用
     * @returns {this}
     */
    public setEnable(){
        const container = this.getContainer();
        container.parentElement&&container.parentElement.classList.remove("eboard-disable");
        this.eDux.sharedData.enable=true;
        return this;
    }
}

export {EBoard};