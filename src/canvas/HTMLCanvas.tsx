/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/5 15:52
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/5 15:52
 * @disc:包含HTML层的Canvas
 */

import {BaseCanvas, IBaseCanvasProps} from './BaseCanvas';
import * as React from "react";
import Scrollbars from 'react-custom-scrollbars';
import {EBoardEngine} from '../EBoardEngine';
import {ReactChild} from 'react';


export declare interface IHTMLCanvasProps extends IBaseCanvasProps{
    children?:ReactChild[];
    width?:number;// 源画布区域宽度 ，表示实际画布比例  如果没有则当前作为源画布，计算其大小
    height?:number;// 源画布区域高度 ， 表示实际画布比例 如果没有则当前作为源画布，计算其大小
}

/**
 * HTMLCanvas 需要用到源画布大小，根据源画布大小计算scale比例
 */
class HTMLCanvas extends BaseCanvas{
    public props:IHTMLCanvasProps;
    constructor(props:IHTMLCanvasProps){
        super(props);
    }
    private container:HTMLDivElement;
    private htmlContainer:HTMLDivElement;
    protected getParentElement(){
        return this.container.parentElement as HTMLElement;
    }
    protected _initLayout(parentElement:HTMLElement){
        const calcSize=this.__calc(parentElement);
        // set container size
        this.container.style.width=calcSize.width+"px";
        this.container.style.height=calcSize.height+"px";
        
        
        if(this.props.width&&this.props.height){
            // 作为子Canvas
            // html实际高度及缩放大小计算  计算transform scale倍数
            const scale = calcSize.width/this.props.width;
    
            const height = Math.max(this.props.height * scale,calcSize.height); // Html区域实际高度
    
            this.htmlContainer.style.height = height + "px";// 最小高度
            (this.htmlContainer.firstElementChild as HTMLDivElement).style.transform=`scale(${scale})`;
    
    
            // 计算html 占用高度，通过该高度计算canvas高度
    
            this.eBoardEngine.eBoardCanvas.setDimensions({width:calcSize.width,height:height});// 根据实际分辨率设置大小
    
            // 需要计算实际的大小
            this.eBoardEngine.eBoardCanvas.setDimensions({
                width:calcSize.dimensions.width,
                height:calcSize.dimensions.width * this.props.height / this.props.width // 实际分辨率计算
            },{backstoreOnly:true});// 设置canvas 画布大小
        }else{
            // 作为源Canvas
            const height = Math.max(this.htmlContainer.offsetHeight,calcSize.height);
            this.eBoardEngine.eBoardCanvas.setDimensions({width:calcSize.width,height:height});// 根据实际分辨率设置大小
    
            // 需要计算实际的大小
            this.eBoardEngine.eBoardCanvas.setDimensions({
                width:calcSize.dimensions.width,
                height:calcSize.dimensions.width * height / calcSize.width // 实际分辨率计算
            },{backstoreOnly:true});// 设置canvas 画布大小
        }
    }
    protected _initEBoardEngine(){
        this.eBoardEngine=new EBoardEngine(this._placeholder,{
            selection:false,
            skipTargetFind:true,
            containerClass:"eboard-html-canvas"
        });
    }
    render() {
        return (
            <div className="eboard-container" ref={(ref:HTMLDivElement)=>this.container=ref}>
                <Scrollbars universal>
                    <div className="eboard-html-container" ref={(ref:HTMLDivElement)=>this.htmlContainer=ref}>
                        <div className="eboard-html">
                            {this.props.children}
                        </div>
                    </div>
                    <canvas ref={(ref: HTMLCanvasElement) => this._placeholder = ref}>
                        当前浏览器不支持Canvas,请升级浏览器
                    </canvas>
                </Scrollbars>
            </div>
        );
    }
}

export {HTMLCanvas};