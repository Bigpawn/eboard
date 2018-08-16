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
import {MessageTagEnum} from '../middlewares/MessageMiddleWare';
import {Plugins} from '../plugins';
import {IEDux} from '../utils/EDux';


@setAnimationName('eboard-pager')
class ImagesFrame implements IImagesFrame{
    public type:string="images-frame";
    public container:HTMLDivElement;
    public dom:HTMLDivElement;
    public urlPrefix:string;
    public pageNum:number;
    public totalPages:number;
    public child:Map<number,ImageFrame>=new Map();
    public options:IImagesFrameOptions;
    private pageFrame:ImageFrame;
    private pagination:Pagination;
    private animationCssPrefix:string;
    public images:string[];
    public id:string;
    public eDux:IEDux;
    
    public nextMessage:any={};
    private groupMessage:any={};
    
    constructor(options:IImagesFrameOptions){
        this.id = options.id||Date.now().toString();
        this.eDux=options.eDux as any;
        this.container=options.container as any;
        this.options=options;
        const {eDux,container,append,calcSize,...rest} = options;
        this.groupMessage=Object.assign({},rest,{
            id:this.id,
            width:calcSize.width
        });
        this.nextMessage.group=this.groupMessage;
        this.onGo=this.onGo.bind(this);
        this.initLayout();
        this.initialize();
        if(append&&container){
            container.innerHTML = "";
            container.appendChild(this.dom);// 立即显示
        }
    }
    @message
    public switchFrameAction(pageNum:number){
        return Object.assign({},{
            group:this.groupMessage
        },{
            tag:MessageTagEnum.SwitchToFrame,
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
            const pageFrame = new ImageFrame({
                ratio:options.ratio,
                content:this.urlPrefix+this.images[this.pageNum],
                scrollbar:ScrollbarType.vertical,
                container:this.container,
                eDux:this.eDux,
                id:this.pageNum.toString(),
                extraMessage:this.nextMessage,
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
    private onGo(pageNum:number){
        const pageNumber=Number(pageNum);
        this.switchToFrame(pageNumber);
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
    public createFrame(options:{pageNum:number}){
        const pageNum = Number(options.pageNum);
        let nextPageFrame = this.child.get(pageNum);
        if(void 0 === nextPageFrame){
            // 创建
            nextPageFrame = new ImageFrame({
                content:this.urlPrefix+this.images[pageNum],
                ratio:this.options.ratio,
                scrollbar:ScrollbarType.vertical,
                container:this.container,
                eDux:this.eDux,
                id:pageNum.toString(),
                extraMessage:this.nextMessage,
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
    @pipMode
    public switchToFrame(pageNum:number){
        if(this.pageNum === pageNum||void 0 === pageNum){
            return this;
        }
        let nextPageFrame = this.createFrame({pageNum});
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
                frame.destroy();
            });
            this.child.clear();
        }
    }
}

export {ImagesFrame};