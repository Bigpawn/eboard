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

import './style/canvas.less';
import {
    IBaseFrameOptions,
    IFrame,
    IFrameOptions,
    IHTMLFrameOptions,
    IImageFrameOptions,
} from './interface/IFrame';
import {EmptyFrame} from './frames/EmptyFrame';
import {HtmlFrame} from './frames/HtmlFrame';
import {ImageFrame} from './frames/ImageFrame';
import {PdfFrame} from './frames/PdfFrame';
import {ImagesFrame} from './frames/ImagesFrame';
import {MessageMiddleWare} from './middlewares/MessageMiddleWare';
import {
    IFrameGroup,
    IFrameGroupOptions,
    IImagesFrameOptions,
    IPdfFrameOptions,
} from './interface/IFrameGroup';
import {
    Arrow,
    Circle,
    Clear,
    Delete,
    Ellipse,
    EquilateralTriangle,
    Hexagon,
    Line,
    OrthogonalTriangle,
    Pencil,
    Pentagon,
    Plugins,
    Polygon,
    Rectangle,
    Selection,
    Square,
    Star,
    Text,
    Triangle,
} from './plugins';
import {Tab, TabEventEnum} from './components/Tab';
import {Toolbar} from './components/Toolbar';
import {message} from './utils/decorators';
import {IConfig} from './interface/IConfig';
import {MessageTag} from './enums/MessageTag';
import {Context} from './static/Context';
import {Authority, FrameType, IPluginConfigOptions} from './enums/SDKEnum';
import {ScrollBar} from './components/ScrollBar';
import {autobind} from 'core-decorators';
import {returnAtIndex} from 'lodash-decorators/utils';

class EBoard{
    private body:HTMLDivElement;
    private readonly container:HTMLDivElement;
    private tab:Tab;
    public toolbar:Toolbar;
    private calcSize:any;
    private middleWare:MessageMiddleWare;
    private readonly context:Context;
    constructor(container:HTMLDivElement,config?:IConfig){
        this.context=new Context(config,container);
        this.container=container;
        this.init();
        this.observePlugins();
        this.setAuthority(config?config.authority:undefined);
    }
    /**
     * 计算calc add 时需要调用，传递进去，发送消息时需要使用
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
    private init(){
        this.initTab();
        this.initLayout();
        this.initToolbar();
        this.middleWare=new MessageMiddleWare(this.context);
        this.context.adapter = this.middleWare;
        this.calcSize=this.calc();
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
    private initTab(){
        const {showTab,autoTabLabel,authority} = this.context.config;
        this.tab=new Tab(this.container,showTab&&authority===Authority.Master);
        this.tab.on(TabEventEnum.Add,()=>{
           this.addEmptyFrame({
               type:FrameType.Empty,
               name:autoTabLabel
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
    private addTab(tabId:string,options:IFrameOptions|IFrameGroupOptions){
        this.tab.addTab({
            tabId:tabId,
            name:options.name||"",
            icon:options.icon,
            canRemove:options.canRemove
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
                case "undo":
                    // 判断是frame还是frameGroup
                    const group1 = this.context.getGroupById(this.context.activeKey);
                    if(group1){
                        // group
                        const frame = group1.pageFrame;
                        if(void 0 !== frame){
                            if(frame.engine){
                                frame.engine.eBoardCanvas.undoRedoEngine.undo();
                            }
                        }
                    }else{
                        // frame
                        const frame = this.context.getFrameById(this.context.activeKey);
                        if(void 0 !== frame){
                            if(frame.engine){
                                frame.engine.eBoardCanvas.undoRedoEngine.undo();
                            }
                        }
                    }
                    break;
                case "redo":
                    // 判断是frame还是frameGroup
                    const group2 = this.context.getGroupById(this.context.activeKey);
                    if(group2){
                        // group
                        const frame = group2.pageFrame;
                        if(void 0 !== frame){
                            if(frame.engine){
                                frame.engine.eBoardCanvas.undoRedoEngine.redo();
                            }
                        }
                    }else{
                        // frame
                        const frame = this.context.getFrameById(this.context.activeKey);
                        if(void 0 !== frame){
                            if(frame.engine){
                                frame.engine.eBoardCanvas.undoRedoEngine.redo();
                            }
                        }
                    }
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
    
    @message
    private switchMessage(id:string){
        return {
            activeKey:id,
            tag:MessageTag.SwitchToFrame
        }
    }
    
    private supplyOptions(options:any){
        options.calcSize = Object.assign({},this.calcSize,options.width?{
            originWidth:options.width,
            scale:this.calcSize.width/options.width
        }:{});
        options.container = this.body;
        return options;
    }
    
    /**
     * 添加空白画布
     * @param {IBaseFrameOptions} options
     * @param silence
     * @returns {IBaseFrame}
     */
    public addEmptyFrame(options:IBaseFrameOptions,silence?:boolean){
        const {frameId} = this.supplyOptions(options);
        let frame = void 0 !== frameId?this.context.getFrameById(frameId):undefined;
        if(void 0 !==frame) return frame;
        frame = new EmptyFrame(this.context,options,silence);
        this.addTab(frame.frameId,options);
        this.switchToTab(frame.frameId,true,false);
        return frame;
    }
    
    /**
     * 添加HtmlFrame
     * @param {IHTMLFrameOptions} options
     * @param silence
     * @returns {IHTMLFrame}
     */
    public addHtmlFrame(options:IHTMLFrameOptions,silence?:boolean){
        const {frameId} = this.supplyOptions(options);
        let frame=void 0 !== frameId?this.context.getFrameById(frameId):undefined;
        if(void 0 !==frame) return frame;
        frame = new HtmlFrame(this.context,options,silence);
        this.addTab(frame.frameId,options);
        this.switchToTab(frame.frameId,true,false);
        return frame;
    }
    
    /**
     * 添加ImageFrame
     * @param {IImageFrameOptions} options
     * @param silence
     * @returns {IImageFrame}
     */
    public addImageFrame(options:IImageFrameOptions,silence?:boolean){
        const {frameId} = this.supplyOptions(options);
        let frame=void 0 !== frameId?this.context.getFrameById(frameId):undefined;
        if(void 0 !==frame) return frame;
        frame = new ImageFrame(this.context,options,silence);
        this.addTab(frame.frameId,options);
        this.switchToTab(frame.frameId,true,false);
        return frame;
    }
    
    /**
     * 添加PdfFrame
     * @param {IPdfFrameOptions} options
     * @param silence
     * @returns {IPdfFrame}
     */
    public addPdfFrame(options:IPdfFrameOptions,silence?:boolean){
        const {groupId} = this.supplyOptions(options);
        let group = void 0 !== groupId?this.context.getGroupById(groupId):undefined;
        if(group) return group;
        group = new PdfFrame(this.context,options,silence);
        this.addTab(group.groupId,options);
        this.switchToTab(group.groupId,true,false);
        return group;
    }
    
    /**
     * 添加ImagesFrame
     * @param {IImagesFrameOptions} options
     * @param silence
     * @returns {ImagesFrame}
     */
    public addImagesFrame(options:IImagesFrameOptions,silence?:boolean){
        const {groupId} = this.supplyOptions(options);
        let group = void 0 !== groupId?this.context.getGroupById(groupId):undefined;
        if(group) return group;
        group = new ImagesFrame(this.context,options,silence);
        this.addTab(group.groupId,options);
        this.switchToTab(group.groupId,true,false);
        return group;
    }
    
    /**
     * 添加FrameGroup
     * @param {IImagesFrameOptions | IPdfFrameOptions} options
     * @param silence
     * @returns {(ImagesFrame | ImagesFrame) | (PdfFrame | PdfFrame)}
     */
    private addFrameGroup(options:IImagesFrameOptions|IPdfFrameOptions,silence?:boolean){
        const type = options.type;
        switch (type) {
            case FrameType.Images:
                return this.addImagesFrame(options as IImagesFrameOptions,silence);
            default:
                return this.addPdfFrame(options as IPdfFrameOptions,silence);
        }
    }
    
    /**
     * 添加 Frame
     * @param {IBaseFrameOptions | IImageFrameOptions | IHTMLFrameOptions} options
     * @param recovery
     * @returns {(ImageFrame | ImageFrame) | (HtmlFrame | HtmlFrame) | (BaseFrame | BaseFrame)}
     */
    private addFrame(options:IBaseFrameOptions|IImageFrameOptions|IHTMLFrameOptions,silence?:boolean){
        const type = options.type;
        switch (type) {
            case FrameType.Image:
                return this.addImageFrame(options as IImageFrameOptions,silence);
            case FrameType.HTML:
                return this.addHtmlFrame(options as IHTMLFrameOptions,silence);
            default:
                return this.addEmptyFrame(options as IBaseFrameOptions,silence);
        }
    }
    
    /**
     * 显示指定的Frame
     * @param {string | IFrame | IFrameGroup} id
     * @param forbidMessage
     * @param tabSwitch tab是否需要切换
     * @returns {undefined | IFrame | IFrameGroup}
     */
    private switchToTab(id:string,forbidMessage?:boolean,tabSwitch?:boolean){
        const targetEl = document.querySelector(`[x-eboard-id="${id}"]`);
        if(targetEl){
            const childrens = this.body.childNodes;
            for (let i = 0;i<childrens.length;i++){
                const children = childrens[i];
                if(children.nodeType===1){
                    (children as HTMLElement).classList.add("eboard-hide");
                }
            }
            targetEl.classList.remove("eboard-hide");
            this.context.setActiveKey(id);
            if(tabSwitch!==false){
                this.tab.switchTo(id);
            }
            if(!forbidMessage){
                this.switchMessage(id);
            }
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
        this.tab.removeTab(tabId);
        
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
    
    
    private applyMessage(message:any,recovery?:boolean){
        const {tag,type,frameId,groupId,data} = message;
        switch (tag) {
            case MessageTag.CreateFrame:
                this.addFrame(message,recovery);
                break;
            case MessageTag.CreateFrameGroup:
                this.addFrameGroup(message,recovery);
                break;
            case MessageTag.TurnPage:
                this.context.getGroup(groupId).then((group:IFrameGroup)=>{
                    if(recovery){
                        group.recovery(message.pageNum);
                    }else{
                        group.pageTo(message.pageNum);
                    }
                });
                break;
            case MessageTag.SwitchToFrame:
                this.switchToTab(message.activeKey,true);
                break;
            case MessageTag.RemoveTab:
                this.removeTab(message.tabId,true);
                break;
            case MessageTag.Clear:
                this.context.getFrame(frameId).then((frame:IFrame)=>{
                    (frame.getPlugin(Plugins.Clear) as Clear).onMessage();
                });
                break;
            case MessageTag.Delete:
                this.context.getFrame(frameId).then((frame:IFrame)=>{
                    (frame.getPlugin(Plugins.Delete) as Delete).onMessage(message);
                });
                break;
            case MessageTag.Scroll:
                this.context.getFrame(frameId).then((frame:IFrame)=>{
                    if(recovery){
                        frame.scrollbar&&frame.scrollbar.recovery(message);
                    }else{
                        frame.scrollbar&&frame.scrollbar.onMessage(message);
                    }
                });
                break;
            case MessageTag.Cursor:
                this.context.getFrame(frameId).then((frame:IFrame)=>{
                    frame.engine&&frame.engine.eBoardCanvas.onMessage(message);
                });
                break;
            case MessageTag.SelectionMove:
                this.context.getFrame(frameId).then((frame:IFrame)=>{
                    (frame.getPlugin(Plugins.Selection) as Selection).onMessage(message);
                });
                break;
            case MessageTag.SelectionScale:
                this.context.getFrame(frameId).then((frame:IFrame)=>{
                    (frame.getPlugin(Plugins.Selection) as Selection).onMessage(message);
                });
                break;
            case MessageTag.SelectionRotate:
                this.context.getFrame(frameId).then((frame:IFrame)=>{
                    (frame.getPlugin(Plugins.Selection) as Selection).onMessage(message);
                });
                break;
            case MessageTag.Paste:
                this.context.getFrame(frameId).then((frame:IFrame)=>{
                    (frame.getPlugin(Plugins.Selection) as Selection).onMessage(message);
                });
                break;
            case MessageTag.Cut:
                this.context.getFrame(frameId).then((frame:IFrame)=>{
                    (frame.getPlugin(Plugins.Selection) as Selection).onMessage(message);
                });
                break;
            case MessageTag.UndoRedo:
                this.context.getFrame(frameId).then((frame:IFrame)=>{
                    if(frame.engine){
                        frame.engine.eBoardCanvas.undoRedoEngine.onMessage(type,data);
                    }
                });
                break;
            case MessageTag.Shape:
                this.context.getFrame(frameId).then((frame:IFrame)=>{
                    switch (type){
                        case "line":
                            (frame.getPlugin(Plugins.Line) as Line).onMessage(message);
                            break;
                        case "arrow":
                            (frame.getPlugin(Plugins.Arrow) as Arrow).onMessage(message);
                            break;
                        case "circle":
                            (frame.getPlugin(Plugins.Circle) as Circle).onMessage(message);
                            break;
                        case "ellipse":
                            (frame.getPlugin(Plugins.Ellipse) as Ellipse).onMessage(message);
                            break;
                        case "hexagon":
                            (frame.getPlugin(Plugins.Hexagon) as Hexagon).onMessage(message);
                            break;
                        case "pentagon":
                            (frame.getPlugin(Plugins.Pentagon) as Pentagon).onMessage(message);
                            break;
                        case "polygon":
                            (frame.getPlugin(Plugins.Polygon) as Polygon).onMessage(message);
                            break;
                        case "star":
                            (frame.getPlugin(Plugins.Star) as Star).onMessage(message);
                            break;
                        case "rectangle":
                            (frame.getPlugin(Plugins.Rectangle) as Rectangle).onMessage(message);
                            break;
                        case "square":
                            (frame.getPlugin(Plugins.Square) as Square).onMessage(message);
                            break;
                        case "equilateral-triangle":
                            (frame.getPlugin(Plugins.EquilateralTriangle) as EquilateralTriangle).onMessage(message);
                            break;
                        case "orthogonal-triangle":
                            (frame.getPlugin(Plugins.OrthogonalTriangle) as OrthogonalTriangle).onMessage(message);
                            break;
                        case "triangle":
                            (frame.getPlugin(Plugins.Triangle) as Triangle).onMessage(message);
                            break;
                        case "pencil":
                            (frame.getPlugin(Plugins.Pencil) as Pencil).onMessage(message);
                            break;
                        case "text":
                            (frame.getPlugin(Plugins.Text) as Text).onMessage(message);
                            break;
                        default:
                            break;
                    }
                });
                break;
            default:
                break;
        }
    }
    
    
    private recoverySingle(message:any){
        this.applyMessage(message,true);
    }
    
    private filterMessageList(messageList:string[]){
        // remove tab 清除之前的所有相关消息
        // clear 清除之前所有相关消息
        // delete 清除之前的对象
        let removeTabs:string[]=[],clearFrames:string[]=[],deleteItems:string[]=[],filterMessages:string[]=[],turnPages:string[]=[],switchControl:boolean=false,scrollIds:string[]=[];
        messageList.reverse().forEach((messageString)=>{
            const message = MessageMiddleWare.decompressMessage(messageString);
            const {tag,tabId,frameId,ids=[],groupId,id} = message;
            switch (tag) {
                case MessageTag.RemoveTab:
                    removeTabs.push(tabId);
                    break;
                case MessageTag.Clear:
                    clearFrames.push(frameId);
                    break;
                case MessageTag.Delete:
                    deleteItems.push(ids);
                    break;
                case MessageTag.CreateFrame:
                    if(removeTabs.indexOf(frameId)===-1){
                        filterMessages.unshift(messageString);
                    }
                    break;
                case MessageTag.CreateFrameGroup:
                    if(removeTabs.indexOf(groupId)===-1){
                        filterMessages.unshift(messageString);
                    }
                    break;
                case MessageTag.TurnPage:
                    if(removeTabs.indexOf(groupId)===-1&&turnPages.indexOf(groupId)===-1){
                        turnPages.push(groupId);
                        filterMessages.unshift(messageString);
                    }
                    break;
                case MessageTag.SwitchToFrame:// TODO 切换的可能已经删除
                    if(removeTabs.indexOf(groupId)===-1&&removeTabs.indexOf(frameId)===-1&&!switchControl){
                        switchControl=true;
                        filterMessages.unshift(messageString);
                    }
                    break;
                case MessageTag.Scroll:
                    if(removeTabs.indexOf(frameId)===-1&&scrollIds.indexOf(frameId)===-1){
                        scrollIds.push(frameId);
                        filterMessages.unshift(messageString);
                    }
                    break;
                case MessageTag.Cursor:
                    break;
                case MessageTag.Shape:
                    if(removeTabs.indexOf(frameId)===-1&&removeTabs.indexOf(groupId)===-1&&clearFrames.indexOf(frameId)===-1&&deleteItems.indexOf(id)===-1){
                        filterMessages.unshift(messageString);
                    }
                    break;
                default:
                    filterMessages.unshift(messageString);
                    break;
            }
        });
        return filterMessages;
    }
    
    /**
     * 数据恢复  会暂停消息接收，等待回执完成后触发消息接收
     * @param {string[]} messageList
     * @param filter
     */
    public recovery(messageList:string[],filter?:boolean){
        // 如果filter不做处理，则前端进行处理
        if(filter){
            messageList = this.filterMessageList(messageList);
        }
        messageList.forEach((messageString:string)=>{
            const message:any = MessageMiddleWare.decompressMessage(messageString);
            this.recoverySingle(message);
        });
    }
    /**
     * 消息分发
     * @param {string} messageString
     * 消息内容节能会被压缩，需要解压
     */
    public onMessage(messageString:string){
        const message:any = MessageMiddleWare.decompressMessage(messageString);// 消息转换
        this.applyMessage(message);
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
    
    public setAuthority(authority:Authority=Authority.Master){
        const container = this.body;
        container.parentElement&&container.parentElement.setAttribute(`eboard-authority`,authority);
        this.context.config.authority=authority;
        ScrollBar.scrollbarList.forEach((scrollbar)=>{
            if(scrollbar){
                scrollbar.disabled=authority!==Authority.Master&&authority!==Authority.Operator;
            }
        });
        return this;
    }
    
    public getFrameGroup(groupId:string){
        return this.context.getGroupById(groupId);
    }
    public getFrame(frameId:string){
        return this.context.getFrameById(frameId);
    }
    
    /**
     * 允许滚动切换等，不允许画图
     */
    public allowOperation(){
        this.setAuthority(Authority.Operator);
    }
    
    /**
     * 不允许无权限用户操作
     */
    public unAllowOperation(){
        this.setAuthority(Authority.Viewer);
    }
    
    /**
     * 当前白板截图
     */
    @autobind
    public getCapture(){
        const activeTabId = this.context.activeKey;
        const group = this.context.getGroupById(activeTabId);
        if(!group){
            const canvas = this.container.querySelector(`[x-eboard-id="${activeTabId}"] canvas.lower-canvas`) as HTMLCanvasElement;
            return canvas.toDataURL("image/png");
        }else{
            const frame:IFrame = group.pageFrame;
            const canvas = this.container.querySelector(`[x-eboard-id="${ frame.frameId}"] canvas.lower-canvas`) as HTMLCanvasElement;
            return canvas.toDataURL("image/png");
        }
    }
}

export {EBoard};