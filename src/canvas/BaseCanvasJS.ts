/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/12 10:27
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/12 10:27
 * @disc:BaseCanvas JS 模式
 */

import {EBoardEngine} from '../EBoardEngine';

class BaseCanvasJS {
    protected eBoardEngine:EBoardEngine;
    protected _placeholder:HTMLCanvasElement;
    private ratio:string;
    protected parentElement:HTMLElement;
    constructor(parentElement: HTMLElement,ratio?:string) {
        this.parentElement=parentElement;
        this.ratio=ratio||"4:3";
        this.render();
        this.componentDidMount();
    }
    protected __calc(parentElement:HTMLElement){
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
            const dimensionRate = Math.ceil(4000/_ratioW);
            if(size.width/size.height>ratioNum){
                // 宽度大，按照高度计算
                return {
                    width:size.height * ratioNum,
                    height:size.height,
                    dimensions:{
                        width:dimensionRate * _ratioW,
                        height:dimensionRate * _ratioH
                    }
                }
            }else{
                // 高度大，按照宽度计算
                return {
                    width:size.width,
                    height:size.width / ratioNum,
                    dimensions:{
                        width:dimensionRate * _ratioW,
                        height:dimensionRate * _ratioH
                    }
                }
            }
        }
    }
    protected _initEBoardEngine(){
        this.eBoardEngine=new EBoardEngine(this._placeholder,{
            selection:false,
            skipTargetFind:true,
            containerClass:"eboard-canvas"
        });
    }
    protected _initLayout(parentElement:HTMLElement){
        const calcSize=this.__calc(parentElement);
        this.eBoardEngine.eBoardCanvas.setDimensions({width:calcSize.width,height:calcSize.height});// 设置样式大小
        this.eBoardEngine.eBoardCanvas.setDimensions(calcSize.dimensions,{backstoreOnly:true});// 设置canvas 画布大小
    }
    protected componentDidMount(){
        const parentElement = this.parentElement;
        // fix parent position
        const position = window.getComputedStyle(parentElement).position;
        if("absolute" !== position && "fixed" !== position && "relative" !== position) {
            parentElement.style.position="relative";
        }
        this._initEBoardEngine();
        this._initLayout(parentElement);
    }
    protected render(){
        const placeholder = document.createElement("canvas");
        placeholder.innerHTML="当前浏览器不支持Canvas,请升级浏览器";
        this._placeholder=placeholder;
        this.parentElement.appendChild(placeholder);
    }
}
export {BaseCanvasJS};