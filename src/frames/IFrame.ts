/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/20 13:13
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/20 13:13
 * @disc:Frame 接口 Frame  ；Frame能够嵌套
 */
import {EBoardEngine} from '../EBoardEngine';
import {AbstractPlugin} from '../plugins/AbstractPlugin';
import {ScrollbarType} from './HtmlFrame';

export declare interface IFrame{
    id:number;// 窗口标识id
    messageId:number;// 窗口创建对应消息
    container:HTMLDivElement;// 窗口父元素
    dom:HTMLElement;// 窗口内容dom
    ratio:string;
    engine?:EBoardEngine;
    child?:Map<number,IFrame>;
    src?:string;// ImageFrame 拥有属性
    canvas?:HTMLCanvasElement;// CanvasImage 私有属性
    getPlugin(pluginName:string):AbstractPlugin|undefined;
    destroy():void;
}


export declare interface IFrameOptions{
    container:HTMLDivElement;
    id:number;// frame的id
    messageId:number;// frame 创建的消息Id
    childMessageId?:number;// childFrame 创建的messageId
    ratio?:string;
    scrollbar?:ScrollbarType;
    htmlFragment?:string;
    src?:string;// ImageFrame 拥有属性
    url?:string;// PdfFrame 私有属性，表示文档地址
    pageNum?:number;// PdfFrame 私有属性，表示当前显示
}