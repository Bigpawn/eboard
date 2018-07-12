/**
 * @disc:fabric 占位canvas 采用常规显示器2倍缩放 ，范围[4000-4200]
 * @author:yanxinaliang
 * @time：2018/7/4 16:12
 */
import * as React from "react";
import "../style/canvas.less";
import {EBoardEngine} from '../EBoardEngine';
import {Suspension} from "../plugins/tool/suspension/Suspension";

export declare interface IBaseCanvasProps{
    ratio?:string; // 白板比例，默认值为4:3
}



class BaseCanvas extends React.PureComponent<IBaseCanvasProps>{
    protected _placeholder:HTMLCanvasElement;
    protected eBoardEngine:EBoardEngine;
    constructor(props:IBaseCanvasProps){
        super(props);
        this.__calc=this.__calc.bind(this);
    }
    
    /**
     * calc canvas offsetSize & dimensionSize
     * @param {HTMLElement} parentElement
     * @returns {{width: number; height: number; dimensions: {width: number; height: number}}}
     * @private
     */
    protected __calc(parentElement:HTMLElement){
        const size={
            width:parentElement.offsetWidth,
            height:parentElement.offsetHeight
        };
        const {ratio="4:3"} = this.props;
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
    protected getParentElement(){
        return this._placeholder.parentElement as HTMLElement;
    }
    public componentDidMount(){
        const parentElement = this.getParentElement();
        // fix parent position
        const position = window.getComputedStyle(parentElement).position;
        if("absolute" !== position && "fixed" !== position && "relative" !== position) {
            parentElement.style.position="relative";
        }
        this._initEBoardEngine();
        this._initLayout(parentElement);
    }
    public getPlugin(pluginName:string){
        return this.eBoardEngine.getPlugin(pluginName);
    }
    public getEBoardEngine(){
        return this.eBoardEngine;
    }
    render(){
        return [
            <canvas ref={(ref:HTMLCanvasElement)=>this._placeholder=ref}>
                当前浏览器不支持Canvas,请升级浏览器
            </canvas>,
            <Suspension />
        ]
    }
}

export {BaseCanvas};