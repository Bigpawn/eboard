/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/5 15:52
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/5 15:52
 * @disc：显示图片的Canvas
 */
import * as React from "react";
import {HTMLCanvas, IHTMLCanvasProps} from './HTMLCanvas';


export declare interface IImageCanvasProps extends IHTMLCanvasProps{
    src:string;// 图片地址
}

class ImageCanvas extends HTMLCanvas{
    public props:IImageCanvasProps;
    render(){
        const children=(
            <img src={this.props.src} style={{width:"100%"}}/>
        );
        return super._render(children);
    }
}

export {ImageCanvas};