/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/20 13:13
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/20 13:13
 * @disc:Frame 每个单独定义
 */
import {EBoardEngine} from '../EBoardEngine';
import {AbstractPlugin} from '../plugins/AbstractPlugin';
import {ScrollbarType} from './HtmlFrame';


export declare interface IFrame{
    container:HTMLDivElement;
    options:IFrameOptions;
    type:string;
    messageId:number;
    dom:HTMLElement;
    ratio:string;
    engine?:EBoardEngine;
    getPlugin(pluginName:string):AbstractPlugin|undefined;
    destroy():void;
}

export declare interface IFrameOptions{
    type:string;// frame 的类型及id标识
    messageId:number;// frame 创建的消息Id
    ratio?:string;
}


export declare interface IBaseFrameOptions extends IFrameOptions{
}

export declare interface IBaseFrame extends IFrame{
    engine:EBoardEngine;
    options:IBaseFrameOptions;
}



export declare interface IHTMLFrameOptions extends IFrameOptions{
    scrollbar?:ScrollbarType;
    htmlFragment:string|HTMLElement;
}

export declare interface IHTMLFrame extends IBaseFrame{
    options:IHTMLFrameOptions;
}



export declare interface IImageFrameOptions extends IFrameOptions{
    scrollbar?:ScrollbarType;
    src:string;
}

export declare interface IImageFrame extends IBaseFrame{
    options:IImageFrameOptions;
}



export declare interface ICanvasFrameOptions extends IFrameOptions{
    scrollbar?:ScrollbarType;
}
export declare interface ICanvasFrame extends IBaseFrame{
    canvas:HTMLCanvasElement;
    options:ICanvasFrameOptions;
}






/*
export declare interface IFrame{
    type:string;// 窗口标识id
    messageId:number;// 窗口创建对应消息
    container:HTMLDivElement;// 窗口父元素
    dom:HTMLElement;// 窗口内容dom
    ratio:string;
    engine?:EBoardEngine;
    child?:Map<number,IFrame>;
    src?:string;// ImageFrame 拥有属性
    canvas?:HTMLCanvasElement;// CanvasImage 私有属性
    options:IFrameOptions;
    getPlugin(pluginName:string):AbstractPlugin|undefined;
    destroy():void;
    switchToFrame?(childId:number,messageId:number):this|Promise<this>;// 切换到子frame
}

*/

/*
export declare interface IFrameOptions{
    container:HTMLDivElement;
    type:string;// frame 的类型及id标识
    messageId?:number;// frame 创建的消息Id
    childMessageId?:number;// childFrame 创建的messageId
    ratio?:string;
    scrollbar?:ScrollbarType;
    htmlFragment?:string;
    src?:string;// ImageFrame 拥有属性
    url?:string;// PdfFrame 私有属性，表示文档地址
    pageNum?:number;// PdfFrame 私有属性，表示当前显示
    
    // imagesFrame 私有属性
    urlPrefix?:string;
    images?:string[];
}*/
