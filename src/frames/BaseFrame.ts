/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/20 13:12
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/20 13:12
 * @disc:基础窗口
 */
import {IFrame, IFrameOptions} from './IFrame';
import {EBoardEngine} from '../EBoardEngine';

class BaseFrame implements IFrame{
    public container:HTMLDivElement;
    public id:number;
    public messageId:number;
    public ratio:string;
    public dom:HTMLDivElement;
    public engine:EBoardEngine;
    constructor(options:IFrameOptions){
        this.initialize(options);
        this.fixContainer();
        this.initEngine();
        this.initLayout();
    }
    protected initialize(options:IFrameOptions){
        this.container=options.container;
        this.id=options.id;
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
        const placeholder = document.createElement("canvas");
        placeholder.innerHTML="当前浏览器不支持Canvas,请升级浏览器";
        this.engine = new EBoardEngine(placeholder,{
            selection:false,
            skipTargetFind:true,
            containerClass:"eboard-canvas"
        });
        this.dom = this.engine.eBoardCanvas.getContainer();
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
}

export {BaseFrame};