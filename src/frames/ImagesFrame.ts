/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/23 13:53
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/23 13:53
 * @disc:图片轮播Frame
 */
import {Pagination} from "../components/Pagination";
import {message} from '../utils/decorators';
import {ImageFrame} from './ImageFrame';
import {IImagesFrame, IImagesFrameOptions} from '../interface/IFrameGroup';
import {Plugins} from '../plugins';
import {MessageTag} from '../enums/MessageTag';
import {Context} from '../static/Context';
import {IDGenerator} from '../utils/IDGenerator';
import {ScrollbarType} from '../enums/SDKEnum';


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
    public images:string[];
    public groupId:string;
    public context:Context;
    constructor(context:Context,options:IImagesFrameOptions){
        this.context=context;
        this.groupId = options.groupId||IDGenerator.getId();
        this.container=options.container as any;
        this.options=options;
        context.addGroup(this.groupId,this).setActiveKey(this.groupId);
        this.onGo=this.onGo.bind(this);
        this.initLayout();
        this.initialize();
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
        const {container,extraHtmlFragment} = this.options as any;
        const pagerContainer=document.createElement("div");
        pagerContainer.className="eboard-pager";
        pagerContainer.style.width="100%";
        pagerContainer.style.height="100%";
        pagerContainer.setAttribute("x-eboard-id",this.groupId);
        if(extraHtmlFragment){
            const fragment = document.createElement("div");
            fragment.innerHTML=extraHtmlFragment;
            if(fragment.firstChild){
                pagerContainer.appendChild(fragment.firstChild);
            }
        }
        this.dom=pagerContainer;
        container.appendChild(this.dom);
    };
    private initialize(){
        const options = this.options;
        this.urlPrefix=options.urlPrefix||"";
        this.images=options.images||[];
        this.setPageNum(options.pageNum||1);// 默认第一页
        this.setTotalPages(this.images.length);// 表示当前未获取到页数
        if(this.images.length>0){
            const pageFrame = new ImageFrame(this.context,{
                content:this.urlPrefix+this.images[this.pageNum-1],
                scrollbar:ScrollbarType.vertical,
                container:this.dom,
                frameId:this.groupId+"_"+this.pageNum.toString(),
                groupId:this.groupId,
                calcSize:this.options.calcSize
            });
            this.pageFrame=pageFrame;
            const pagination = new Pagination(this.pageNum,this.totalPages);// 分页管理器
            pagination.addGoListener(this.onGo);
            this.pagination=pagination;
            this.dom.appendChild(pagination.dom);
            this.child.set(this.pageNum,pageFrame);
        }
    }
    private onGo(pageNum:number){
        const pageNumber=Number(pageNum);
        this.switchToFrame(pageNumber);
        this.switchFrameAction(pageNumber);
    }
    
    public pageTo(pageNum:number){
        const pageNumber=Number(pageNum);
        this.switchToFrame(pageNumber);
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
    
    private getFrame(pageNum:number){
        let nextPageFrame = this.child.get(pageNum);
        if(void 0 === nextPageFrame){
            nextPageFrame = new ImageFrame(this.context,{
                content:this.urlPrefix+this.images[pageNum-1],
                scrollbar:ScrollbarType.vertical,
                container:this.dom,
                frameId:this.groupId+"_"+pageNum.toString(),
                groupId:this.groupId,
                calcSize:this.options.calcSize
            });
            this.child.set(pageNum,nextPageFrame);
        }
        return nextPageFrame;
    }
    private static clearClassList(element:HTMLDivElement){
        element.className = element.className.replace(/eboard-pagination-enter-from-left|eboard-pagination-enter-from-right|eboard-pagination-leave-to-right|eboard-pagination-leave-to-left|eboard-pagination-show|eboard-pagination-hide/g,"").trim();
    }
    /**
     * 动画切换
     * @param {number} pageNum
     * @returns {any}
     */
    private switchToFrame(pageNum:number){
        if(this.pageNum === pageNum||void 0 === pageNum){
            return this;
        }
        let nextPageFrame = this.getFrame(pageNum);
        const frameDom = nextPageFrame.dom;
        const currentFrameDom = this.pageFrame.dom;
        ImagesFrame.clearClassList(frameDom);
        ImagesFrame.clearClassList(currentFrameDom);
        frameDom.classList.add(this.pageNum>pageNum?"eboard-pagination-enter-from-left":"eboard-pagination-enter-from-right");
        currentFrameDom.classList.add(this.pageNum>pageNum?"eboard-pagination-leave-to-right":"eboard-pagination-leave-to-left");
        this.setPageNum(pageNum);
        this.pageFrame=nextPageFrame;
        return this;
    }
    
    private recoveryToFrame(pageNum:number){
        if(this.pageNum === pageNum||void 0 === pageNum){
            return this;
        }
        let nextPageFrame = this.getFrame(pageNum);
        const frameDom = nextPageFrame.dom;
        this.child.forEach((imageFrame)=>{
            const dom = imageFrame.dom;
            ImagesFrame.clearClassList(dom);
            dom.classList.add("eboard-pagination-hide");
        });
        frameDom.classList.add("eboard-pagination-show");
        this.setPageNum(pageNum);
        this.pageFrame=nextPageFrame;
        return this;
    }
    public recovery(pageNum:number){
        const pageNumber=Number(pageNum);
        this.recoveryToFrame(pageNumber);
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