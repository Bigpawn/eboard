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
import {BaseFrame} from './frames/BaseFrame';
import {HtmlFrame} from './frames/HtmlFrame';
import {ImageFrame} from './frames/ImageFrame';
import {PdfFrame} from "./frames/PdfFrame";
import {ImagesFrame} from './frames/ImagesFrame';
import {MessageMiddleWare, MessageTagEnum} from './middlewares/MessageMiddleWare';
import {MessageAdapter} from './interceptor/MessageAdapter';
import {IFrameGroup, IImagesFrameOptions,IPdfFrameOptions} from './interface/IFrameGroup';
import {
    Arrow, Circle, Clear, Ellipse, EquilateralTriangle, Hexagon, Line,
    OrthogonalTriangle, Pencil, Pentagon,
    Plugins, Polygon, Rectangle, Square, Star, Triangle, Text, Delete,Selection
} from './plugins';
import {EDux, IPluginConfigOptions} from './utils/EDux';
import {Tab, TabEventEnum} from './components/Tab';
import {Toolbar} from './components/Toolbar';
import {message} from './utils/decorators';
import {IConfig} from './interface/IConfig';

const config = require("./config.json");
// const extraConfig = require("/config/eboard.json");// 会报错
const extraConfig = {};// 会报错



export enum FrameType{
    Empty="empty-frame",Image="image-frame",HTML="html-frame",Canvas="canvas-frame",Pdf="pdf-frame",Images="images-frame"
}

class EBoard{
    private eDux:EDux=new EDux();
    private frames:Map<string,IFrame|IFrameGroup>=new Map();// frame管理
    private activeFrame:string;
    private body:HTMLDivElement;
    private container:HTMLDivElement;
    public messageMiddleWare = new MessageMiddleWare();
    private tab:Tab;
    private calcSize:any;
    private config?:IConfig;
    constructor(container:HTMLDivElement,config?:IConfig){
        this.config=config;
        this.container=container;
        this.initLayout();
        this.init();
        this.initTab();
        this.initToolbar();
        // plugin事件监听
        this.observePlugins();
    }
    
    /**
     * 初始化config 及事件Emitter 消息adapter
     */
    private init(){
        this.eDux.config=Object.assign({},config,extraConfig||{},this.config||{});
        this.eDux.adapter = new MessageAdapter(this,false);
        this.calcSize=this.calc();
        // 画布分辨率比例计算
        this.eDux.transform =(size:number)=>{
            return size * this.calcSize.dimensions.width / this.calcSize.width;
        }
        
        
        
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
            frameId:id,
            tag:MessageTagEnum.SwitchToFrame
        }
    }
    private initTab(){
        if(!config.showTab){
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
            this.switchToFrame(tabId);// switch事件
        });
        this.tab.on(TabEventEnum.Remove,(e: any)=>{
            const tabId = e.data;
            this.removeFrame(tabId);
        });
    }
    private initToolbar(){
        const wrap = document.createElement("div");
        wrap.className="eboard-toolbar-wrap";
        this.container.appendChild(wrap);
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
     * 添加空白画布
     * @param {IBaseFrameOptions} options
     * @param withoutMessage
     * @returns {IBaseFrame}
     */
    public addEmptyFrame(options:IBaseFrameOptions,withoutMessage?:boolean){
        const {id} = options;
        let frame:BaseFrame;
        if(void 0 !== id && this.hasFrame(id)){
            frame = this.findFrameById(id) as BaseFrame;
            return frame;
        }
        const message = Object.assign({},options);
        options.calcSize =Object.assign({},this.calcSize,options.width?{
            originWidth:options.width,
            scale:this.calcSize.width/options.width
        }:{});
        options.container = this.body;
        options.append = true;
        frame = new BaseFrame(options,this.eDux);
        this.frames.set(frame.id,frame);
        if(void 0 !== this.tab){
            this.tab.addTab({
                tabId:frame.id,
                label:options.name||""
            });
        }
        if(!withoutMessage){
            this.addFrameMessage(Object.assign({
                id:frame.id,
                width:this.calcSize.width
            },message));
        }
        this.activeFrame = frame.id;
        return frame;
    }
    
    /**
     * 添加HtmlFrame
     * @param {IHTMLFrameOptions} options
     * @param withoutMessage
     * @returns {IHTMLFrame}
     */
    public addHtmlFrame(options:IHTMLFrameOptions,withoutMessage?:boolean){
        const {id} = options;
        let frame:HtmlFrame;
        if(void 0 !== id && this.hasFrame(id)){
            frame = this.findFrameById(id) as HtmlFrame;
            return frame;
        }
        const message = Object.assign({},options);
        options.calcSize =Object.assign({},this.calcSize,options.width?{
            originWidth:options.width,
            scale:this.calcSize.width/options.width
        }:{});
        options.container = this.body;
        options.append = true;
        frame = new HtmlFrame(options,this.eDux);
        this.frames.set(frame.id,frame);
        this.activeFrame = frame.id;
        if(void 0 !== this.tab){
            this.tab.addTab({
                tabId:frame.id,
                label:options.name||""
            });
        }
        if(!withoutMessage){
            this.addFrameMessage(Object.assign({
                id:frame.id,
                width:this.calcSize.width
            },message));
        }
        return frame;
    }
    
    /**
     * 添加ImageFrame
     * @param {IImageFrameOptions} options
     * @param withoutMessage
     * @returns {IImageFrame}
     */
    public addImageFrame(options:IImageFrameOptions,withoutMessage?:boolean){
        const {id} = options;
        let frame:ImageFrame;
        if(void 0 !== id && this.hasFrame(id)){
            frame = this.findFrameById(id) as ImageFrame;
            return frame;
        }
        const message = Object.assign({},options);
        options.calcSize =Object.assign({},this.calcSize,options.width?{
            originWidth:options.width,
            scale:this.calcSize.width/options.width
        }:{});
        options.container = this.body;
        options.append = true;
        frame = new ImageFrame(options,this.eDux);
        this.frames.set(frame.id,frame);
        this.activeFrame = frame.id;
        if(void 0 !== this.tab){
            this.tab.addTab({
                tabId:frame.id,
                label:options.name||""
            });
        }
        if(!withoutMessage){
            this.addFrameMessage(Object.assign({
                id:frame.id,
                width:this.calcSize.width
            },message));
        }
        return frame;
    }
    
    /**
     * 添加PdfFrame
     * @param {IPdfFrameOptions} options
     * @param withoutMessage
     * @returns {IPdfFrame}
     */
    public addPdfFrame(options:IPdfFrameOptions,withoutMessage?:boolean){
        const {id} = options;
        let frame:PdfFrame;
        if(void 0 !== id && this.hasFrame(id)){
            frame = this.findFrameById(id) as PdfFrame;
            return frame;
        }
        const message = Object.assign({},options);
        options.calcSize =Object.assign({},this.calcSize,options.width?{
            originWidth:options.width,
            scale:this.calcSize.width/options.width
        }:{});
        options.container = this.body;
        options.append = true;
        frame = new PdfFrame(options,this.eDux);
        this.frames.set(frame.id,frame);
        this.activeFrame = frame.id;
        if(void 0 !== this.tab){
            this.tab.addTab({
                tabId:frame.id,
                label:options.name||""
            });
        }
        if(!withoutMessage){
            this.addFrameGroupMessage(Object.assign({
                id:frame.id,
                width:this.calcSize.width
            },message));
        }
        return frame;
    }
    
    /**
     * 添加ImagesFrame
     * @param {IImagesFrameOptions} options
     * @param withoutMessage
     * @returns {ImagesFrame}
     */
    public addImagesFrame(options:IImagesFrameOptions,withoutMessage?:boolean){
        const {id} = options;
        let frame:ImagesFrame;
        if(void 0 !== id && this.hasFrame(id)){
            frame = this.findFrameById(id) as ImagesFrame;
            return frame;
        }
        const message = Object.assign({},options);
        options.calcSize =Object.assign({},this.calcSize,options.width?{
            originWidth:options.width,
            scale:this.calcSize.width/options.width
        }:{});
        options.container = this.body;
        options.append = true;
        frame = new ImagesFrame(options,this.eDux);
        this.frames.set(frame.id,frame);
        this.activeFrame = frame.id;
        if(void 0 !== this.tab){
            this.tab.addTab({
                tabId:frame.id,
                label:options.name||""
            });
        }
        if(!withoutMessage){
            this.addFrameGroupMessage(Object.assign({
                id:frame.id,
                width:this.calcSize.width
            },message));
        }
        return frame;
    }
    
    @message
    private addFrameMessage(options:any){
        return Object.assign({
            tag:MessageTagEnum.CreateFrame
        },options);
    }
    
    @message
    private addFrameGroupMessage(options:any){
        return Object.assign({
            tag:MessageTagEnum.CreateFrameGroup
        },options);
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
        let ratio=this.eDux.config.ratio;
        const _ratioW=ratio.w;
        const _ratioH=ratio.h;
        const ratioNum=_ratioW/_ratioH;
        let calcSize:any;
        const defaultDimensionW = config.dimensions.width;
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
        return type === FrameType.Images?this.addImagesFrame(options as IImagesFrameOptions,true):this.addPdfFrame(options as IPdfFrameOptions,true);
    }
    
    /**
     * 添加 Frame
     * @param {IBaseFrameOptions | IImageFrameOptions | IHTMLFrameOptions} options
     * @returns {(ImageFrame | ImageFrame) | (HtmlFrame | HtmlFrame) | (BaseFrame | BaseFrame)}
     */
    private addFrame(options:IBaseFrameOptions|IImageFrameOptions|IHTMLFrameOptions){
        const type = options.type;
        return type === FrameType.Image?this.addImageFrame(options as IImageFrameOptions,true):type === FrameType.HTML?this.addHtmlFrame(options as IHTMLFrameOptions,true):this.addEmptyFrame(options as IBaseFrameOptions,true);
    }
    
    /**
     * 显示指定的Frame
     * @param {string | IFrame | IFrameGroup} id
     * @param withoutMessage
     * @returns {undefined | IFrame | IFrameGroup}
     */
    public switchToFrame(id:string|IFrame|IFrameGroup,withoutMessage?:boolean){
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
        if(void 0 !== this.tab){
            this.tab.switchTo(this.activeFrame);
        }
        if(!withoutMessage){
            this.switchMessage(this.activeFrame);
        }
        return activeFrame;
    }
    
    @message
    public removeFrame(id:string,withoutMessage?:boolean){
        const frame = this.findFrameById(id);
        if(void 0 !== frame){
            frame.destroy();
            this.frames.delete(id);
            frame.dom.parentElement&&frame.dom.parentElement.removeChild(frame.dom);
        }
        if(void 0 !== this.tab){
            this.tab.removeTab(id);
        }
        if(this.activeFrame === id){
            const ids = Array.from(this.frames.keys());
            const id = ids[ids.length-1];
            if(id){
                this.switchToFrame(id,true);
            }
        }
        return !withoutMessage?{
            tag:MessageTagEnum.RemoveFrame,
            id:id
        }:undefined
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
        console.log(Object.assign({},messageObj));
        // 获取frame实例，之后根据操作处理
        const {frame:frameOptions,group:frameGroupOptions,...options} = messageObj;
        const {tag,type} = options;
        let frame:IFrame = undefined as any,frameGroup = undefined as any;
        
        // 有分组
        if(void 0 !== frameGroupOptions){
            frameGroup = this.addFrameGroup(frameGroupOptions);// 创建或查询frameGroup
            // 子frame
            if(void 0 !== frameOptions){
                frame = frameGroup.createFrame({
                    pageNum:Number(frameOptions.id),
                }) as IFrame;
                // 执行跳转逻辑
                if(frameOptions.id !== "1"){
                    frameGroup.onGo(frameOptions.id,frameOptions.messageId);
                }
            }
        }else{
            if(void 0 !== frameOptions){
                frame = this.addFrame(frameOptions) as IFrame;
            }
        }
        
        switch (tag){
            case MessageTagEnum.CreateFrame:// 创建frame
                this.addFrame(messageObj);
                break;
            case MessageTagEnum.CreateFrameGroup:
                this.addFrameGroup(messageObj);
                break;
            case MessageTagEnum.SwitchToFrame:
                if(void 0 !== frameGroup){
                    frameGroup.onGo(options.pageNum,options.messageId);
                }else{
                    this.switchToFrame(options.frameId,true);
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
            case MessageTagEnum.RemoveFrame:
                this.removeFrame(options.id,true);
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
        this.eDux.config.stroke=color;
        return this;
    }
    
    /**
     * 设置fillColor
     * @param {string} color
     * @returns {this}
     */
    public setFillColor(color:string){
        this.eDux.config.fill=color;
        return this;
    }
    
    /**
     * 设置不可用
     * @returns {this}
     */
    public setDisable(){
        const container = this.body;
        container.parentElement&&container.parentElement.classList.add("eboard-disable");
        this.eDux.sharedData.enable=false;
        return this;
    }
    
    /**
     * 设置可用
     * @returns {this}
     */
    public setEnable(){
        const container = this.body;
        container.parentElement&&container.parentElement.classList.remove("eboard-disable");
        this.eDux.sharedData.enable=true;
        return this;
    }
}

export {EBoard};