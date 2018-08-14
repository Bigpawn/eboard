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
import {IFrameMessageInterface} from '../IMessageInterface';
import {MessageIdMiddleWare} from '../middlewares/MessageIdMiddleWare';
import {message} from '../utils/decorators';
import {EventBus, IPluginConfigOptions} from '../utils/EventBus';


class GenericBaseFrame<T extends IFrameOptions> implements IFrame,IFrameMessageInterface{
    public container:HTMLDivElement;
    public type:string;
    public dom:HTMLDivElement;
    public engine:EBoardEngine;
    public options:T;
    public id:string;
    public eDux:EventBus;
    public messageId:number;
    public extraMessage:any={};// 存放group属性
    public nextMessage:any={};
    public frameMessage:any={};
    constructor(options:T){
        this.id=options.id||Date.now().toString();
        this.messageId = options.messageId||MessageIdMiddleWare.getId();
        this.eDux=options.eDux;
        this.container=options.container;
        this.options=options;
        this.extraMessage=this.options.extraMessage||{};
        if(options.extraMessage&&options.extraMessage.group){
            this.nextMessage.group = this.extraMessage.group;
        }
        const {silent,eDux,extraMessage,container,...rest} = this.options as any;
        this.frameMessage={...rest,id:this.id,messageId:this.messageId};
        this.nextMessage.frame=this.frameMessage;
        this.fixContainer();
        this.initEngine();
        this.initLayout();
        this.observePlugin();
        // 插件启用初始化
        this.initPlugin();
        if(!options.silent){
            this.initializeAction();// 控制是否发送创建消息, 只要用到宽就好，高度接收端自动根据内容适配
        }
    }
    private initPlugin(){
        // 通过数据共享机制进行实现，eventBus 进行数据缓存
        const plugins = this.eDux.sharedData.plugins;
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
        },{
            eDux:this.eDux,
            extraMessage:this.nextMessage
        });
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
        // 接收端接收发送端分辨率
        if(this.options.dimensions){
            calcSize.dimensions = this.options.dimensions;// 需要计算比例，高度不一定适中
        }
        
        calcSize.cacheWidth=this.options.width||calcSize.width;// 缓存发送端的内容宽度
        calcSize.scale = calcSize.width / calcSize.cacheWidth;
        
        if(this.extraMessage&&this.extraMessage.group){
            Object.assign(this.extraMessage.group,{
                width:calcSize.width,
                height:calcSize.height,
                dimensions:calcSize.dimensions
            })
        }
        // 需要修改父元素中的options
        // if(this.parent&&"updateOptionsSize" in this.parent){
        //     this.parent.updateOptionsSize&&this.parent.updateOptionsSize({
        //         width:calcSize.width,
        //         height:calcSize.height,
        //         dimensions:calcSize.dimensions
        //     });
        // }
       Object.assign(this.frameMessage,{
           width:calcSize.width,
           height:calcSize.height,
           dimensions:calcSize.dimensions,
       });
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
}

export {GenericBaseFrame};


class BaseFrame extends GenericBaseFrame<IBaseFrameOptions> implements IBaseFrame{
    public type:string="empty-frame";
}

export {BaseFrame};