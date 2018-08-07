/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/23 13:53
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/23 13:53
 * @disc:图片轮播Frame
 */
import {ScrollbarType} from "./HtmlFrame";
import {Pagination} from "../components/Pagination";
import {message, pipMode, setAnimationName} from '../utils/decorators';
import {ImageFrame} from './ImageFrame';
import {EBoard} from '../EBoard';
import {IImagesFrame, IImagesFrameOptions} from '../interface/IFrameGroup';
import {MessageTagEnum} from '../middlewares/MessageMiddleWare';
import {MessageIdMiddleWare} from '../middlewares/MessageIdMiddleWare';
import {IFrameGroupMessageInterface} from '../IMessageInterface';
import {Plugins} from '../plugins';


@setAnimationName('eboard-pager')
class ImagesFrame implements IImagesFrame,IFrameGroupMessageInterface{
    public type:string="images-frame";
    public container:HTMLDivElement;
    public messageId:number;
    public dom:HTMLDivElement;
    public urlPrefix:string;
    public pageNum:number;
    public totalPages:number;
    public child:Map<number,ImageFrame>=new Map();
    public options:IImagesFrameOptions;
    private _options:IImagesFrameOptions;
    private pageFrame:ImageFrame;
    private pagination:Pagination;
    private animationCssPrefix:string;
    public images:string[];
    public parent?:EBoard;
    public id:string;
    constructor(options:IImagesFrameOptions,container:HTMLDivElement,parent?:EBoard,id?:string){
        this.id = id||Date.now().toString();
        this.options=options;
        this._options=Object.assign({},options);
        this.container=container;
        this.messageId=options.messageId||MessageIdMiddleWare.getId();
        this.parent=parent;
        this.onGo=this.onGo.bind(this);
        this.fixContainer();
        this.initLayout();
        this.initialize();
        this.observePlugin();
        this.initPlugin();
        this.initializeAction();
    }
    private initPlugin(){
        if(void 0 !== this.parent){
            const eBoard = this.parent;
            const pluginController = eBoard.pluginController;
            pluginController.forEach((obj:any,plugin)=>{
                const {enable,options} = obj;
                if(enable){
                    this.child.forEach((frame)=>{
                        const instance = frame.getPlugin(plugin);
                        if(void 0 !== instance){
                            instance.setOptions(options);
                            instance.setEnable(true);
                        }
                    })
                }
            })
        }
    }
    private observePlugin(){
        if(this.parent instanceof EBoard){
            this.parent.on("plugin:active",(event:any)=>{
                const data = event.data;
                const {plugin,options} = data;
                this.child.forEach((frame)=>{
                    const instance = frame.getPlugin(plugin);
                    if(void 0 !== instance){
                        instance.setOptions(options);
                        instance.setEnable(true);
                    }
                })
            })
        }
    }
    @message
    public initializeAction(){
        return {
            ...this.options,
            id:this.id,
            messageId:this.messageId,
            tag:MessageTagEnum.CreateFrameGroup
        }
    };
    @message
    public destroyAction(){
        return {
            tag:MessageTagEnum.DestroyFrameGroup,
            id:this.id
        }
    }
    @message
    public switchFrameAction(pageNum:number){
        return {
            tag:MessageTagEnum.SwitchToFrame,
            id:this.id,
            pageNum:pageNum
        }
    }
    private fixContainer(){
        const parentElement = this.container;
        // fix parent position
        const position = window.getComputedStyle(parentElement).position;
        if("absolute" !== position && "fixed" !== position && "relative" !== position) {
            parentElement.style.position="relative";
        }
    }
    protected initLayout(){
        const pagerContainer=document.createElement("div");
        pagerContainer.className="eboard-pager";
        pagerContainer.style.width="100%";
        pagerContainer.style.height="100%";
        this.dom=pagerContainer;
    };
    /**
     * 子frame中修改options值
     * @param size
     */
    public updateOptionsSize(size:{width:number;height:number;dimensions:{width:number;height:number}}){
        this.options.width=size.width;
        this.options.height=size.height;
        this.options.dimensions=size.dimensions;
    }
    private initialize(){
        const options = this._options;
        this.urlPrefix=options.urlPrefix||"";
        this.images=options.images||[];
        this.setPageNum(options.pageNum||1);// 默认第一页
        this.setTotalPages(this.images.length);// 表示当前未获取到页数
        if(this.child.size>0){
            // 清空子项
            this.child.forEach(frame=>{
                frame.destroy();
            });
            this.child.clear();
        }
        if(this.images.length>0){
            const pageFrame = new ImageFrame({
                type:this.pageNum+"",
                messageId:options.messageId,
                ratio:options.ratio,
                content:this.urlPrefix+this.images[this.pageNum],
                scrollbar:ScrollbarType.vertical,
                width:options.width,
                height:options.height,
                dimensions:options.dimensions
            },this.container,this,this.pageNum.toString(),true);
            this.pageFrame=pageFrame;
            this.dom.innerHTML="";
            this.dom.appendChild(this.pageFrame.dom);
            const pagination = new Pagination(this.pageNum,this.totalPages);// 分页管理器
            pagination.addGoListener(this.onGo);
            this.pagination=pagination;
            this.dom.appendChild(pagination.dom);
            this.child.set(this.pageNum,pageFrame);
        }
    }
    private onGo(pageNum:number,messageId?:number){
        const pageNumber=Number(pageNum);
        this.switchToFrame(pageNumber,messageId);
        this.switchFrameAction(pageNumber);
    }
    
    /**
     * 更新文档页数
     * @param totalPages
     * @returns {PdfFrame}
     */
    private setTotalPages(totalPages:number){
        this.totalPages=totalPages;
        if(void 0 !== this.pagination){
            this.pagination.setTotalPages(totalPages);
        }
        return this;
    }
    
    /**
     * 更新当前页数
     * @param {number} pageNum
     */
    private setPageNum(pageNum:number){
        this.pageNum=pageNum;
        if(this.pagination){
            this.pagination.setPageNum(pageNum);
        }
    }
    
    
    /**
     * 创建子frame
     * @returns {CanvasFrame | undefined}
     * @param options
     */
    public createFrame(options:{pageNum:number,messageId?:number}){
        const pageNum = Number(options.pageNum);
        let nextPageFrame = this.child.get(pageNum);
        if(void 0 === nextPageFrame){
            // 创建
            nextPageFrame = new ImageFrame({
                messageId:options.messageId,
                content:this.urlPrefix+this.images[pageNum],
                ratio:this._options.ratio,
                scrollbar:ScrollbarType.vertical,
                width:this._options.width,
                height:this._options.height,
                dimensions:this._options.dimensions
            },this.container,this,pageNum.toString(),true);
            this.child.set(pageNum,nextPageFrame);
        }
        return nextPageFrame;
    }
    
    /**
     * 切换到指定页 需要加队列控制
     * @param {number} pageNum
     * @param {number} messageId
     * @returns {any}
     */
    @pipMode
    public switchToFrame(pageNum:number,messageId?:number){
        if(this.pageNum === pageNum||void 0 === pageNum){
            return this;
        }
        let nextPageFrame = this.createFrame({pageNum,messageId});
        return new Promise<this>((resolve)=>{
            const frameDom = (nextPageFrame as ImageFrame).dom;
            const currentFrameDom = this.pageFrame.dom;
            const enterClassName = `${this.animationCssPrefix}-enter-from-${pageNum>this.pageNum?"right":"left"}`;
            const leaveClassName = `${this.animationCssPrefix}-leave-to-${pageNum>this.pageNum?"left":"right"}`;
            frameDom.classList.add(enterClassName);
            currentFrameDom.classList.add(leaveClassName);
            this.dom.insertBefore(frameDom,this.pagination.dom);
            this.setPageNum(pageNum);
            const transitionEndListener=(e:any)=>{
                frameDom.removeEventListener('animationend',transitionEndListener);
                frameDom.classList.remove(enterClassName);
                currentFrameDom.classList.remove(leaveClassName);
                // 删除dom
                currentFrameDom.parentElement&&currentFrameDom.parentElement.removeChild(currentFrameDom);
                this.pageFrame=nextPageFrame as ImageFrame;
                setTimeout(()=>{
                    resolve(this);
                },0)
            };
            frameDom.addEventListener('animationend',transitionEndListener);
        });
    }
    public getPlugin(pluginName:Plugins){
        return this.pageFrame?this.pageFrame.getPlugin(pluginName):undefined;
    }
    public destroy(){
        if(this.child.size>0){
            // 清空子项
            this.child.forEach(frame=>{
                frame.destroy(true);
            });
            this.child.clear();
        }
        this.destroyAction();
    }
}

export {ImagesFrame};