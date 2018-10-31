/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/20 13:12
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/20 13:12
 * @disc:基础窗口
 * frame 向下extraMessage为引用关系
 */
import {
    IBaseFrame, IBaseFrameOptions, IFrame,
    IFrameOptions,
} from '../interface/IFrame';
import {EBoardEngine} from '../EBoardEngine';
import {message} from '../utils/decorators';
import {MessageTag} from '../enums/MessageTag';
import {Context, ContextFactory, IPluginConfigOptions} from '../static/Context';
import {IDGenerator} from '../utils/IDGenerator';
import {ScrollBar} from '../components/ScrollBar';



class GenericBaseFrame<T extends IFrameOptions> extends ContextFactory implements IFrame{
    public container:HTMLDivElement;
    public type:string;
    public dom:HTMLDivElement;
    public engine:EBoardEngine;
    public options:T;
    public frameId:string;
    public groupId:string|undefined;
    public scrollbar:ScrollBar;
    protected calcSize:any;
    constructor(context:Context,options:T){
        super(context);
        this.frameId=options.frameId||IDGenerator.getId();
        const groupId = options.groupId;
        this.groupId=groupId;
        context.addFrame(this.frameId,this);
        if(!groupId){
            context.setActiveKey(this.frameId);
        }
        this.container=options.container as any;
        this.options=options;
        this.calcSize=options.calcSize||{};
        const {container} = this.options as any;
        this.initEngine();
        this.initPlugin();
        if(!groupId&&container){
            container.innerHTML = "";
            container.appendChild(this.dom);// 立即显示
        }
        
        if(!this.groupId||options.messageId){
            this.initializeAction();
        }
        // resize
        context.on("resize",(e:any)=>{
            this.calcSize=e.data;
            this.initLayout();
            if(this.scrollbar){
                this.scrollbar.update();
            }
        })
    }
    private initPlugin(){
        const {store} = this.context;
        const plugins = store.plugins;
        plugins.forEach((obj:IPluginConfigOptions,plugin)=>{
            const {enable,background} = obj;
            if(enable){
                const instance = this.getPlugin(plugin);
                if(void 0 !== instance){
                    instance.setEnable(true,background);
                }
            }
        });
        store.on("plugin:active",(event:any)=>{
            const data = event.data;
            const {plugin,options} = data;
            const instance = this.getPlugin(plugin);
            if(void 0 !== instance){
                const background = options.background;
                instance.setEnable(true,background);
            }
        });
        store.on("plugin:disable",(event:any)=>{
            const data = event.data;
            const {plugin,options} = data;
            const instance = this.getPlugin(plugin);
            if(void 0 !== instance){
                const background = options.background;
                instance.setEnable(false,background);
            }
        });
    }
    
    @message
    public initializeAction(){
        const {container,calcSize,...rest} = this.options as any;
        return Object.assign({},{
            tag:MessageTag.CreateFrame,
            width:calcSize.width,
            ...rest
        });
    }
    protected initEngine(){
        const container = document.createElement("div");
        container.className="eboard-container";
        const placeholder = document.createElement("canvas");
        placeholder.innerHTML="当前浏览器不支持Canvas,请升级浏览器";
        container.appendChild(placeholder);
        this.engine = new EBoardEngine(placeholder,this.context,{
            selection:false,
            skipTargetFind:true,
            containerClass:"eboard-canvas",
            frame:this.frameId,
            group:this.groupId
        });
        const image = document.createElement("img");
        image.src="";
        image.onerror=()=>{
            this.initLayout();// 仅执行一次
            container.removeChild(image);
        };
        container.appendChild(image);
        this.dom = container;
    }
    protected initLayout(){
        const calcSize = this.calcSize;
        this.engine.eBoardCanvas.setDimensions({width:calcSize.width,height:calcSize.height});// 设置样式大小
        this.engine.eBoardCanvas.setDimensions(calcSize.dimensions,{backstoreOnly:true});// 设置canvas 画布大小
    };
    public getPlugin(pluginName:string){
        return this.engine.getPlugin(pluginName);
    }
    public destroy(){
        if(this.dom&&this.dom.parentElement){
            this.dom.parentElement.removeChild(this.dom);
        }
        this.engine.eBoardCanvas.clear();
    }
}

export {GenericBaseFrame};


class EmptyFrame extends GenericBaseFrame<IBaseFrameOptions> implements IBaseFrame{
    public type:string="empty-frame";
}

export {EmptyFrame};