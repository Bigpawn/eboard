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
} from './frames/IFrame';
import {BaseFrame} from './frames/BaseFrame';
import {HtmlFrame} from './frames/HtmlFrame';
import {ImageFrame} from './frames/ImageFrame';
import {CanvasFrame} from './frames/CanvasFrame';
import {PdfFrame} from "./frames/PdfFrame";
import {ImagesFrame} from './frames/ImagesFrame';

import "./style/canvas.less";
import {
    IMessage,
    MessageMiddleWare,
    MessageTagEnum,
} from './middlewares/MessageMiddleWare';
import {MessageIdMiddleWare} from './middlewares/MessageIdMiddleWare';
import {MessageAdapter} from './interceptor/MessageAdapter';
import {registerMessageInterceptor} from './utils/decorators';
import {IImagesFrameOptions, IPdfFrameOptions} from './frames/IFrameGroup';
import {MessageReceiver} from "./middlewares/MessageReceiver";

export enum FrameType{
    Empty="empty",Image="image",HTML="html",Canvas="canvas",Pdf="pdf",Images="images"
}


@registerMessageInterceptor(MessageAdapter)
class EBoard{
    private frames:Map<string,IFrame>=new Map();// frame管理
    private activeFrame:string;
    private container:HTMLDivElement|(()=>HTMLDivElement);
    private messageReceiver:MessageReceiver=new MessageReceiver(this);
    private getContainer(){
        return "tagName" in this.container?this.container:this.container();
    }
    constructor(containerFilter:HTMLDivElement|(()=>HTMLDivElement)){
        this.container = containerFilter;
    }
    /**
     * 根据type字符串返回真实type和id
     * @param {string} type
     * @returns {{type: string; id: string}}
     */
    private getFrameTypeAndId(type:string) {
        const arr = type.split("_");
        return {
            type:arr[0],
            id:arr[1]
        }
    }
    
    /**
     * 创建frame
     * @param {IFrameOptions} options
     * @returns {any}
     */
    public createFrame(options:IBaseFrameOptions|IHTMLFrameOptions|IImageFrameOptions|ICanvasFrameOptions|IPdfFrameOptions|IImagesFrameOptions){
        if(this.hasFrame(options.type)){
            return this.findFrameById(options.type);// 如果已经存在
        }
        // 判断是操作者创建还是控制,操作者需要创建消息Id
        const {type,id} = this.getFrameTypeAndId(options.type);
        let frame:IFrame;
        options.type=void 0 === id?`${options.type}_${Date.now()}`:options.type;
        if(void 0 === id){
            // 消息发送
            options.messageId=MessageIdMiddleWare.getId();// id 补充
            MessageMiddleWare.sendMessage(Object.assign({},options,{
                tag:MessageTagEnum.Action
            }));
        }
        // 消息中不需要传递container
        const container = this.getContainer();
        switch (type){
            case FrameType.HTML:
                frame = new HtmlFrame(options as IHTMLFrameOptions,container,this);
                break;
            case FrameType.Image:
                frame = new ImageFrame(options as IImageFrameOptions,container,this);
                break;
            case FrameType.Canvas:
                frame = new CanvasFrame(options as ICanvasFrameOptions,container,this);
                break;
            case FrameType.Pdf:
                frame = new PdfFrame(options as IPdfFrameOptions,container,this);
                break;
            case FrameType.Images:
                frame = new ImagesFrame(options as IImagesFrameOptions,container,this);
                break;
            case FrameType.Empty:
            default:
                frame = new BaseFrame(options,container,this);
                break;
        }
        this.frames.set(options.type,frame);
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
     * 切换到需要显示的frame 需要改frame存在，如果不存在则不执行任何操作
     * @param {string | IFrame} type
     * @returns {undefined | IFrame}
     */
    public switchToFrame(type:string|IFrame){
        // 支持frameType标识和对象
        if(typeof type === 'string'){
            if(type === this.activeFrame||!this.hasFrame(type)){
                return;
            }
        }else{
            if(type.type === this.activeFrame||!this.hasFrame(type.type)){
                return;
            }
        }
        if(this.activeFrame){
            const frame = this.findFrameById(this.activeFrame);
            if(frame&&frame.dom&&frame.dom.parentElement){
                frame.dom.parentElement.removeChild(frame.dom); // 隐藏
            }
        }
        this.activeFrame = typeof type === 'string'?type:type.type;
        const activeFrame = typeof type === 'string'?this.findFrameById(type):type;
        if(activeFrame&&activeFrame.dom){
            activeFrame.container.appendChild(activeFrame.dom);// 如果是子frame则存在问题
        }
        return activeFrame;
    }
    
    /**
     * 根据id获取frame实例
     * @param {string} type
     * @returns {IFrame | undefined}
     */
    public findFrameById(type:string){
        return this.frames.get(type);
    }
    
    /**
     * 检测是否存在某个frame
     * @param {string} type
     * @returns {boolean}
     */
    public hasFrame(type:string){
        return this.frames.has(type);
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
}

export {EBoard};