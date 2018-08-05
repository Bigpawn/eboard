/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/20 11:45
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/20 11:45
 * @disc:前端应用架构类 设计到窗口概念  frame 可应用为Tab
 * frame 中管理canvas实例，canvas实例中管理绘制object实例  层级化，frame中提供object实例查询 canvas中提供跨实例object实例查询
 * 支持页面中多实例模式，多容器模式，从静态类修改成实体类
 * 消息代理应该从该对象拦截
 *
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
    IMessage,
    MessageMiddleWare, MessageTagEnum,
} from './middlewares/MessageMiddleWare';
import {MessageAdapter} from './interceptor/MessageAdapter';
import {
    IFrameGroup, IImagesFrameOptions,
    IPdfFrameOptions,
} from './interface/IFrameGroup';
import {MessageReceiver} from "./middlewares/MessageReceiver";
import {
    Arrow, Circle, Clear, Ellipse, EquilateralTriangle, Hexagon, Line,
    OrthogonalTriangle, Pencil, Pentagon,
    Plugins, Polygon, Rectangle, Square, Star, Triangle,Text
} from './plugins';

export enum FrameType{
    Empty="empty-frame",Image="image-frame",HTML="html-frame",Canvas="canvas-frame",Pdf="pdf-frame",Images="images-frame"
}


class EBoard{
    private frames:Map<string,IFrame|IFrameGroup>=new Map();// frame管理
    private activeFrame:string;
    private container:HTMLDivElement|(()=>HTMLDivElement);
    private messageReceiver:MessageReceiver=new MessageReceiver(this);
    public messageAdapter=new MessageAdapter(this,false);
    public messageMiddleWare = new MessageMiddleWare();
    public activePlugin:Plugins;
    private getContainer(){
        return "tagName" in this.container?this.container:this.container();
    }
    constructor(containerFilter:HTMLDivElement|(()=>HTMLDivElement)){
        this.container = containerFilter;
    }
    
    /**
     * 创建frame ，创建完成立即显示
     * @param {IBaseFrameOptions | IHTMLFrameOptions | IImageFrameOptions | ICanvasFrameOptions | IPdfFrameOptions | IImagesFrameOptions} options
     * @returns {IFrame | IFrameGroup}
     */
    public createFrame(options:IBaseFrameOptions|IHTMLFrameOptions|IImageFrameOptions|ICanvasFrameOptions|IPdfFrameOptions|IImagesFrameOptions){
        const {id,type} = options;
        let frame:IFrame|IFrameGroup;
        const container = this.getContainer();
        if(void 0 !== id && this.hasFrame(id)){
            frame = this.findFrameById(id) as IFrame|IFrameGroup;
            this.switchToFrame(frame);
            return frame;
        }
        switch (type){
            case FrameType.HTML:
                frame = new HtmlFrame(options as IHTMLFrameOptions,container,this,id);
                break;
            case FrameType.Image:
                frame = new ImageFrame(options as IImageFrameOptions,container,this,id);
                break;
            case FrameType.Canvas:
                frame = new CanvasFrame(options as ICanvasFrameOptions,container,this,id);
                break;
            case FrameType.Pdf:
                frame = new PdfFrame(options as IPdfFrameOptions,container,this,id);
                break;
            case FrameType.Images:
                frame = new ImagesFrame(options as IImagesFrameOptions,container,this,id);
                break;
            case FrameType.Empty:
            default:
                frame = new BaseFrame(options,container,this,id);
                break;
        }
        this.frames.set(frame.id,frame);
        this.switchToFrame(frame);
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
     * 接收消息
     * @param {IMessage} message
     */
    public messageInput(message:IMessage){
        this.messageReceiver.receiver(message);
    }
    
    /**
     * 消息分发
     * @param {IMessage} message
     */
    public onMessage(message:string){
        const messageObj:any = JSON.parse(message);
        // 获取frame实例，之后根据操作处理
        const {frame:frameOptions,frameGroup:frameGroupOptions,...options} = messageObj;
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
                
                // 切换分页
                // 通过id获取frameGroup
                frameGroup = this.findFrameById(options.id) as IFrameGroup;
                if(void 0 !== frameGroup){
                    // group中切换
                    frameGroup.onGo(options.pageNum,options.messageId);
                }else{
                    // 当前切换
                }
                break;
            case MessageTagEnum.Clear:
                // 清空
                (frame.getPlugin(Plugins.Clear) as Clear).onMessage();
                break;
            case MessageTagEnum.Scroll:
                frame.scrollbar&&frame.scrollbar.onMessage(options);
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
     * 设置启用的插件，同步到所有的实例中，并且保证后续实例创建时自动启用
     */
    public setActivePlugin(plugin:Plugins){
        this.activePlugin = plugin;
        // 遍历所有实例
        this.frames.forEach((frame)=>{
            if((frame as IFrameGroup).child){
                (frame as IFrameGroup).child.forEach((chFrame)=>{
                    const pluginInstance = chFrame.getPlugin(plugin);
                    pluginInstance&&pluginInstance.setEnable(true);
                })
            }else{
                const pluginInstance = frame.getPlugin(plugin);
                pluginInstance&&pluginInstance.setEnable(true);
            }
        })
    }
}

export {EBoard};