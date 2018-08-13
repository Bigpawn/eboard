/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/20 13:12
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/20 13:12
 * @disc:基础窗口
 */
import {IBaseFrame, IBaseFrameOptions, IFrame, IFrameOptions} from '../interface/IFrame';
import {EBoardEngine} from '../EBoardEngine';
import {EBoard} from '../EBoard';
import {IFrameGroup} from '../interface/IFrameGroup';
import {IMessage, MessageTagEnum} from '../middlewares/MessageMiddleWare';
import {IFrameMessageInterface} from '../IMessageInterface';
import {MessageIdMiddleWare} from '../middlewares/MessageIdMiddleWare';
import {message} from '../utils/decorators';
import {EventBus, IPluginConfigOptions} from '../utils/EventBus';


class GenericBaseFrame<T extends IFrameOptions> implements IFrame,IFrameMessageInterface{
    private _options:T;
    public container:HTMLDivElement;
    public type:string;
    public messageId:number;
    public dom:HTMLDivElement;
    public engine:EBoardEngine;
    public options:T;
    public parent?:EBoard|IFrameGroup;
    public id:string;
    protected eventBus:EventBus;
    constructor(options:T,container:HTMLDivElement,eventBus:EventBus,parent?:EBoard|IFrameGroup,id?:string,silent?:boolean){
        this.id=id||Date.now().toString();
        this.messageId=options.messageId||MessageIdMiddleWare.getId();// 如果没有则自动创建
        this.eventBus=eventBus;
        this.container=container;
        this._options=Object.assign({},options);
        this.options=options;
        this.parent=parent;
       
        this.fixContainer();
        this.initEngine();
        this.initLayout();
        this.observePlugin();
        // 插件启用初始化
        this.initPlugin();
    
        if(!silent){
            this.initializeAction();// 控制是否发送创建消息, 只要用到宽就好，高度接收端自动根据内容适配
        }
    }
    private initPlugin(){
        // 通过数据共享机制进行实现，eventBus 进行数据缓存
        const plugins = this.eventBus.sharedData.plugins;
        plugins.forEach((obj:IPluginConfigOptions,plugin)=>{
            const {enable,background} = obj;
            if(enable){
                const instance = this.getPlugin(plugin);
                if(void 0 !== instance){
                    instance.setEnable(true,background);
                }
            }
        })
    }
    private observePlugin(){
        this.eventBus.on("plugin:active",(event:any)=>{
            const data = event.data;
            const {plugin,options} = data;
            const instance = this.getPlugin(plugin);
            if(void 0 !== instance){
                const background = options.background;
                instance.setEnable(true,background);
            }
        });
        this.eventBus.on("plugin:disable",(event:any)=>{
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
            id:this.id,
            messageId:this.messageId,
            tag:MessageTagEnum.CreateFrame
        },this.options)
    }
    
    @message
    public destroyAction(){
        return {
            id:this.id,
            tag:MessageTagEnum.DestroyFrame
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
        },this,this.eventBus);
        this.dom = container;
    }
    protected calc(){
        const parentElement = this.container;
        const size={
            width:parentElement.offsetWidth,
            height:parentElement.offsetHeight
        };
        let ratio=this.options.ratio||"16:9";
        if(!/\d+:\d+/g.test(ratio)){
            ratio = "16:9";
        }
        const _ratios=ratio.split(":");
        const _ratioW=Number(_ratios[0]);
        const _ratioH=Number(_ratios[1]);
        const ratioNum=_ratioW/_ratioH;
        let calcSize:any;
        // const dimensionRate = Math.ceil(4000/_ratioW);
        if(size.width/size.height>ratioNum){
            // 宽度大，按照高度计算
            calcSize={
                width:size.height * ratioNum,
                height:size.height,
                dimensions:{
                    // width:dimensionRate * _ratioW,
                    // height:dimensionRate * _ratioH
                    width:size.height * ratioNum,
                    height:size.height,
                }
            };
        }else{
            // 高度大，按照宽度计算
            calcSize={
                width:size.width,
                height:size.width / ratioNum,
                dimensions:{
                    // width:dimensionRate * _ratioW,
                    // height:dimensionRate * _ratioH
                    width:size.width,
                    height:size.width / ratioNum,
                }
            };
        }
        if(this._options.dimensions){
            calcSize.dimensions = this._options.dimensions;// 需要计算比例，高度不一定适中
        }
        calcSize.cacheWidth=this._options.width||calcSize.width;// 缓存发送端的内容宽度
        calcSize.scale = calcSize.width/ calcSize.cacheWidth;
        
        
        // 需要修改父元素中的options
        if(this.parent&&"updateOptionsSize" in this.parent){
            this.parent.updateOptionsSize&&this.parent.updateOptionsSize({
                width:calcSize.width,
                height:calcSize.height,
                dimensions:calcSize.dimensions
            });
        }
        this.options.width = calcSize.width;
        this.options.height = calcSize.height;
        this.options.dimensions = calcSize.dimensions;
        return calcSize;
    }
    protected initLayout(){
        const calcSize = this.calc();
        this.engine.eBoardCanvas.setDimensions({width:calcSize.width,height:calcSize.height});// 设置样式大小
        this.engine.eBoardCanvas.setDimensions(calcSize.dimensions,{backstoreOnly:true});// 设置canvas 画布大小
    };
    public getPlugin(pluginName:string){
        return this.engine.getPlugin(pluginName);
    }
    public destroy(silent?:boolean){
        if(this.dom&&this.dom.parentElement){
            this.dom.parentElement.removeChild(this.dom);
        }
        this.engine.eBoardCanvas.clear();
        if(!silent){
            this.destroyAction();
        }
    }
    /**
     * 发送消息
     * @param {IMessage | undefined} message
     */
    public throwMessage(message:IMessage|undefined){
        if(void 0!== this.engine.messageHandle){
            this.engine.messageHandle.call(this,message);
        }else{
            if(this["messageMiddleWare"]){
                this["messageMiddleWare"].sendMessage(message);
            }
        }
    }
}

export {GenericBaseFrame};


class BaseFrame extends GenericBaseFrame<IBaseFrameOptions> implements IBaseFrame{
    public type:string="empty-frame";
}

export {BaseFrame};