/**
 * @disc:fabric 占位canvas 采用常规显示器2倍缩放 ，范围[4000-4200]
 * @author:yanxinaliang
 * @time：2018/7/4 16:12
 */
import * as React from "react";
import "../style/canvas.less";
import {mixinPlugin} from '../utils/decorators';

export declare interface CanvasProps{
    ratio?:string;//白板比例，默认值为4:3
}


export declare interface CalcLayout{
    width:number;
    height:number;
    dimensions:{
        width:number;
        height:number;
    }
}



declare interface IPlugin{
    pluginName:string;
    pluginReflectClass:any
}
declare interface IPluginInstanceMap{
    [pluginName:string]:object;
}


@mixinPlugin("paint")
class Canvas extends React.Component<CanvasProps>{
    private _placeholder:HTMLCanvasElement;
    private _parentElement:HTMLElement;
    private eBoardEngine:any;
    private pluginList:IPlugin[];
    name:string;
    public pluginInstanceMap:IPluginInstanceMap={};
    constructor(props:CanvasProps){
        super(props);
        this.__calc=this.__calc.bind(this);
    }
    private __calc(){
        const size={
            width:this._parentElement.offsetWidth,
            height:this._parentElement.offsetHeight
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
                //宽度大，按照高度计算
                return {
                    width:size.height * ratioNum,
                    height:size.height,
                    dimensions:{
                        width:dimensionRate * _ratioW,
                        height:dimensionRate * _ratioH
                    }
                }
            }else{
                //高度大，按照宽度计算
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
        this.eBoardEngine=new fabric.Canvas(this._placeholder,{
            selection:false,
            skipTargetFind:true,
            containerClass:"eboard-canvas"
        });
    }
    protected _initLayout(calcSize:CalcLayout){
        this.eBoardEngine.setDimensions({width:calcSize.width,height:calcSize.height});//设置样式大小
        this.eBoardEngine.setDimensions(calcSize.dimensions,{backstoreOnly:true});//设置canvas 画布大小
    }
    componentDidMount(){
        this._parentElement=this._placeholder.parentElement as HTMLElement;
        //fix parent position
        const position = window.getComputedStyle(this._parentElement).position;
        if("absolute" !== position && "fixed" !== position && "relative" !== position) {
            this._parentElement.style.position="relative";
        }
        const calcSize=this.__calc();
        this._initEBoardEngine();
        this._initLayout(calcSize);
        
        //plugins 实例化
        this.pluginList.forEach((plugin)=>{
            this.pluginInstanceMap[plugin.pluginName] = new plugin.pluginReflectClass(this.eBoardEngine);//该参数统一传递
        });
    }
    render(){
        return (
            <canvas ref={(ref:HTMLCanvasElement)=>this._placeholder=ref}>
                当前浏览器不支持Canvas,请升级浏览器
            </canvas>
        )
    }
}

export {Canvas};