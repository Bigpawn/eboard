/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/23 13:53
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/23 13:53
 * @disc:图片轮播Frame
 */
import {IFrame, IFrameOptions} from './IFrame';
import {ScrollbarType} from "./HtmlFrame";
import {Pagination} from "../components/Pagination";
import {pipMode, setAnimationName} from '../utils/decorators';
import {ImageFrame} from './ImageFrame';


@setAnimationName('eboard-pager')
class ImagesFrame implements IFrame{
    public container:HTMLDivElement;
    public id:number;
    public messageId:number;
    public ratio:string;
    public dom:HTMLDivElement;
    public urlPrefix:string;
    public pageNum:number;
    public totalPages:number;
    public child:Map<number,ImageFrame>=new Map();
    private options:IFrameOptions;
    private pageFrame:ImageFrame;
    private pagination:Pagination;
    private animationCssPrefix:string;
    private images:string[];
    constructor(options:IFrameOptions){
        this.options=options;
        this.container=options.container;
        this.id=options.id;
        this.messageId=options.messageId;
        this.ratio=options.ratio||"4:3";
        this.onGo=this.onGo.bind(this);
        this.fixContainer();
        this.initLayout();
        this.initialize();
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
    private initialize(){
        const options = this.options;
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
                container:options.container,
                id:this.pageNum,
                messageId:options.childMessageId as number,
                ratio:options.ratio,
                src:this.urlPrefix+this.images[this.pageNum],
                scrollbar:ScrollbarType.vertical,
            });
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
    private onGo(pageNum:number,messageId:number){
        // TODO ID需要提前生成
        this.switchToFrame(pageNum,messageId);// 消息id，需要先生成消息id然后才能调用api
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
     * 修改images地址
     * @param {string} urlPrefix
     * @param {string[]} images
     * @returns {this}
     */
    public setImages(urlPrefix:string,images:string[]){
        if(this.urlPrefix === urlPrefix && JSON.stringify(this.images)===JSON.stringify(images)){
            return;
        }
        this.options.urlPrefix = urlPrefix;
        this.options.images = images;
        this.initialize();
        return this;
    }
    
    /**
     * 切换到指定页 需要加队列控制
     * @param {number} pageNum
     * @param {number} messageId
     * @returns {any}
     */
    @pipMode
    public switchToFrame(pageNum:number,messageId:number){
        if(this.pageNum === pageNum||void 0 === pageNum||void 0 === messageId){
            return this;
        }
        let nextPageFrame = this.child.get(pageNum);
        if(void 0 === nextPageFrame){
            // 创建
            nextPageFrame = new ImageFrame({
                container:this.options.container,
                id:pageNum,
                messageId:messageId,
                src:this.urlPrefix+this.images[pageNum],
                ratio:this.options.ratio,
                scrollbar:ScrollbarType.vertical,
            });
            this.child.set(pageNum,nextPageFrame);
        }
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
    public getPlugin(pluginName:string){
        return this.pageFrame?this.pageFrame.getPlugin(pluginName):undefined;
    }
    public destroy(){
        if(this.child.size>0){
            // 清空子项
            this.child.forEach(frame=>{
                frame.destroy();
            });
            this.child.clear();
        }
    }
}

export {ImagesFrame};