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
import {IImagesFrame, IImagesFrameOptions} from '../interface/IFrameGroup';
import {Plugins} from '../plugins';
import {MessageTag} from '../enums/MessageTag';
import {Context} from '../static/Context';
import {IDGenerator} from '../utils/IDGenerator';


@setAnimationName('eboard-pager')
class ImagesFrame implements IImagesFrame{
    public type:string="images-frame";
    public container:HTMLDivElement;
    public dom:HTMLDivElement;
    public urlPrefix:string;
    public pageNum:number=1;
    public totalPages:number;
    public child:Map<number,ImageFrame>=new Map();
    public options:IImagesFrameOptions;
    public pageFrame:ImageFrame;
    private pagination:Pagination;
    // private animationCssPrefix:string;
    public images:string[];
    public groupId:string;
    public context:Context;
    constructor(context:Context,options:IImagesFrameOptions){
        this.context=context;
        this.groupId = options.groupId||IDGenerator.getId();
        this.container=options.container as any;
        this.options=options;
        const {container} = options;
        context.addGroup(this.groupId,this).setActiveKey(this.groupId);
        this.onGo=this.onGo.bind(this);
        this.initLayout();
        this.initialize();
        if(container){
            // container.innerHTML = "";
            container.appendChild(this.dom);// 立即显示
        }
        this.initializeAction();
    }
    @message
    public initializeAction(){
        const {container,calcSize,...rest} = this.options as any;
        return Object.assign({},{
            tag:MessageTag.CreateFrameGroup,
            width:calcSize.width,
            ...rest
        });
    }
    
    @message
    public switchFrameAction(pageNum:number){
        return Object.assign({},{
            groupId:this.groupId,
            tag:MessageTag.TurnPage,
            pageNum:pageNum
        });
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
            const pageFrame = new ImageFrame(this.context,{
                content:this.urlPrefix+this.images[this.pageNum-1],
                scrollbar:ScrollbarType.vertical,
                container:this.container,
                frameId:this.groupId+"_"+this.pageNum.toString(),
                groupId:this.groupId,
                calcSize:this.options.calcSize
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
    private onGo(pageNum:number,forbidMessage?:boolean){
        const pageNumber=Number(pageNum);
        this.switchToFrame(pageNumber);
        if(!forbidMessage){
            this.switchFrameAction(pageNumber);
        }
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
    public createFrame(options:{pageNum:number}){
        const pageNum = Number(options.pageNum);
        let nextPageFrame = this.child.get(pageNum);
        if(void 0 === nextPageFrame){
            // 创建
            nextPageFrame = new ImageFrame(this.context,{
                content:this.urlPrefix+this.images[pageNum-1],
                scrollbar:ScrollbarType.vertical,
                container:this.container,
                frameId:this.groupId+"_"+pageNum.toString(),
                groupId:this.groupId,
                calcSize:this.options.calcSize
            });
            this.child.set(pageNum,nextPageFrame);
        }
        return nextPageFrame;
    }
    
    /**
     * 切换到指定页 需要加队列控制
     * @param {number} pageNum
     * @returns {any}
     */
    // @pipMode
    public switchToFrame(pageNum:number){
        if(this.pageNum === pageNum||void 0 === pageNum){
            return this;
        }
        let nextPageFrame = this.createFrame({pageNum});
        return new Promise<this>((resolve)=>{
            const frameDom = (nextPageFrame as ImageFrame).dom;
            const currentFrameDom = this.pageFrame.dom;
            // const enterClassName = `${this.animationCssPrefix}-enter-from-${pageNum>this.pageNum?"right":"left"}`;
            // const leaveClassName = `${this.animationCssPrefix}-leave-to-${pageNum>this.pageNum?"left":"right"}`;
            // frameDom.classList.add(enterClassName);
            // currentFrameDom.classList.add(leaveClassName);
            
            
            
            
            // 不能做隐藏，隐藏会造成布局未完成即开始绘制
            frameDom.classList.remove("eboard-page-hide");
            frameDom.classList.add("eboard-page-show");
            if(!frameDom.parentElement){
                this.dom.insertBefore(frameDom,this.pagination.dom);
            }
            currentFrameDom.classList.remove("eboard-page-show");
            currentFrameDom.classList.add("eboard-page-hide");
            this.setPageNum(pageNum);
            // currentFrameDom.parentElement&&currentFrameDom.parentElement.removeChild(currentFrameDom);
            this.pageFrame=nextPageFrame as ImageFrame;
            
       /*     setTimeout(()=>{
                frameDom.classList.remove(enterClassName);
                currentFrameDom.classList.remove(leaveClassName);
                // 删除dom
                currentFrameDom.parentElement&&currentFrameDom.parentElement.removeChild(currentFrameDom);
                this.pageFrame=nextPageFrame as ImageFrame;
                resolve(this);
            },510);*/
        });
    }
    public getPlugin(pluginName:Plugins){
        return this.pageFrame?this.pageFrame.getPlugin(pluginName):undefined;
    }
    public destroy(){
        if(this.child.size>0){
            // 清空子项
            this.child.forEach(frame=>{
                frame.destroy();
                this.context.deleteFrame(frame.frameId);
            });
            this.child.clear();
        }
    }
}

export {ImagesFrame};