/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/5 15:52
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/5 15:52
 * @disc：PdfCanvas  使用pdfjs 直接转换pdf文档进行显示
 */
import * as React from "react";
import {HTMLCanvas, IHTMLCanvasProps} from './HTMLCanvas';


export declare interface IPdfCanvasProps extends IHTMLCanvasProps{
}

/**
 * 显示Pdf 一页内容的私有组建
 */
class PdfCanvas extends HTMLCanvas{
    public props:IPdfCanvasProps;
    render(){
        const children=(
            <canvas style={{width:"100%"}}/>
        );
        return super._render(children);
    }
}

export {PdfCanvas};