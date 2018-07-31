/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/20 13:12
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/20 13:12
 * @disc:基础窗口
 */
import {IBaseFrame, IBaseFrameOptions, IFrame, IFrameOptions} from './IFrame';
import {EBoardEngine} from '../EBoardEngine';
import {EBoard} from '../EBoard';
import {IFrameGroup} from './IFrameGroup';


class GenericBaseFrame<T extends IFrameOptions> implements IFrame{
    public container:HTMLDivElement;
    public type:string;
    public messageId:number;
    public ratio:string;
    public dom:HTMLDivElement;
    public engine:EBoardEngine;
    public options:T;
    private parent?:EBoard|IFrameGroup;
    private handleAll?:boolean;
    private messageHandle?:Function;
    public id:string;
    constructor(options:T,container:HTMLDivElement,parent?:EBoard|IFrameGroup){
        this.id=Date.now().toString();
        this.container=container;
        this.options=options;
        this.parent=parent;
        if(parent){
            this.handleAll=parent["handleAll"];
            this.messageHandle=parent["messageHandle"];
        }
        this.initialize(options);
        this.fixContainer();
        this.initEngine();
        this.initLayout();
    }
    public setId(id:string){
        this.id=id;
        return this;
    }
    protected initialize(options:T){
        this.type=options.type;
        this.messageId=options.messageId;
        this.ratio=options.ratio||"4:3";
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
        },this);
        this.dom = container;
    }
    protected calc(){
        const parentElement = this.container;
        const size={
            width:parentElement.offsetWidth,
            height:parentElement.offsetHeight
        };
        const ratio=this.ratio;
        if(!/\d+:\d+/g.test(ratio)){
            throw new Error(`Expected string with compare symbol, got '${ratio}'.`);
        }else{
            const _ratios=ratio.split(":");
            const _ratioW=Number(_ratios[0]);
            const _ratioH=Number(_ratios[1]);
            const ratioNum=_ratioW/_ratioH;
            // const dimensionRate = Math.ceil(4000/_ratioW);
            if(size.width/size.height>ratioNum){
                // 宽度大，按照高度计算
                return {
                    width:size.height * ratioNum,
                    height:size.height,
                    dimensions:{
                        // width:dimensionRate * _ratioW,
                        // height:dimensionRate * _ratioH
                        width:size.height * ratioNum,
                        height:size.height,
                    }
                }
            }else{
                // 高度大，按照宽度计算
                return {
                    width:size.width,
                    height:size.width / ratioNum,
                    dimensions:{
                        // width:dimensionRate * _ratioW,
                        // height:dimensionRate * _ratioH
                        width:size.width,
                        height:size.width / ratioNum,
                    }
                }
            }
        }
    }
    protected initLayout(){
        const calcSize=this.calc();
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
    public getParent(){
        return this.parent;
    }
    public isHandleAll(){
        return this.handleAll;
    }
    public getMessageHandle(){
        return this.messageHandle;
    }
}

export {GenericBaseFrame};


class BaseFrame extends GenericBaseFrame<IBaseFrameOptions> implements IBaseFrame{
    public type:string="empty-frame";
}

export {BaseFrame};