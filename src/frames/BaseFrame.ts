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
import {MessageTagEnum} from '../middlewares/MessageMiddleWare';
import {message} from '../utils/decorators';
import {EDux, IPluginConfigOptions} from '../utils/EDux';



class GenericBaseFrame<T extends IFrameOptions> implements IFrame{
    public container:HTMLDivElement;
    public type:string;
    public dom:HTMLDivElement;
    public engine:EBoardEngine;
    public options:T;
    public id:string;
    public eDux:EDux;
    public messageId:number;
    public extraMessage:any={};// 存放group属性
    public nextMessage:any={};
    public frameMessage:any={};
    constructor(options:T,eDux:EDux){
        this.id=options.id||Date.now().toString();
        // this.messageId = options.messageId||MessageIdMiddleWare.getId();
        this.eDux=eDux;
        this.container=options.container as any;
        this.options=options;
        this.extraMessage=this.options.extraMessage||{};
        if(options.extraMessage&&options.extraMessage.group){
            this.nextMessage.group = this.extraMessage.group;
        }
        const {extraMessage,container,calcSize,append,...rest} = this.options as any;
        this.frameMessage={
            ...rest,
            id:this.id,
            width:calcSize.width,
        };
        this.nextMessage.frame=this.frameMessage;
        
        this.initEngine();
        this.initPlugin();
        if(append&&container){
            container.innerHTML = "";
            container.appendChild(this.dom);// 立即显示
        }
    }
    private initPlugin(){
        const plugins = this.eDux.sharedData.plugins;
        plugins.forEach((obj:IPluginConfigOptions,plugin)=>{
            const {enable,background} = obj;
            if(enable){
                const instance = this.getPlugin(plugin);
                if(void 0 !== instance){
                    instance.setEnable(true,background);
                }
            }
        });
        this.eDux.on("plugin:active",(event:any)=>{
            const data = event.data;
            const {plugin,options} = data;
            const instance = this.getPlugin(plugin);
            if(void 0 !== instance){
                const background = options.background;
                instance.setEnable(true,background);
            }
        });
        this.eDux.on("plugin:disable",(event:any)=>{
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
        return Object.assign({},{
            tag:MessageTagEnum.CreateFrame,
        },this.frameMessage);
    }
    protected initEngine(){
        const container = document.createElement("div");
        container.className="eboard-container";
        const placeholder = document.createElement("canvas");
        placeholder.innerHTML="当前浏览器不支持Canvas,请升级浏览器";
        container.appendChild(placeholder);
        this.engine = new EBoardEngine(placeholder,{
            selection:false,
            skipTargetFind:true,
            containerClass:"eboard-canvas"
        },{
            eDux:this.eDux,
            extraMessage:this.nextMessage
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
        const calcSize = this.options.calcSize;
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


class BaseFrame extends GenericBaseFrame<IBaseFrameOptions> implements IBaseFrame{
    public type:string="empty-frame";
}

export {BaseFrame};