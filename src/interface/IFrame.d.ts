/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/20 13:13
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/20 13:13
 * @disc:Frame 每个单独定义
 */
import {EBoardEngine} from '../EBoardEngine';
import {AbstractPlugin} from '../plugins/AbstractPlugin';
import {ScrollbarType} from '../frames/HtmlFrame';
import {IMessage} from '../middlewares/MessageMiddleWare';
import {ScrollBar} from '../components/ScrollBar';
import {IFrameGroup, IFrameGroupOptions} from './IFrameGroup';
import {EBoard} from '../EBoard';
import {IEDux} from '../utils/EventBus';

export declare interface IExtraMessage{
    frame?:IFrameOptions;
    group?:IFrameGroupOptions;
}

export declare interface IFrame{
    container:HTMLDivElement;
    options:IFrameOptions;
    type:string;
    messageId:number;
    dom:HTMLElement;
    engine?:EBoardEngine;
    id:string;
    scrollbar?:ScrollBar;
    parent?:IFrameGroup|EBoard;
    extraMessage?:IExtraMessage;
    extraMessageOrigin?:IExtraMessage;
    eDux?:IEDux;// 数据接口共享模块
    getPlugin(pluginName:string):AbstractPlugin|undefined;
    destroy(silent?:boolean):void;
}

export declare interface IFrameOptions{
    messageId?:number;// frame 创建的消息Id
    ratio?:string;
    id?:string;
    type?:string;
    width?:number;
    height?:number;
    dimensions?:{width:number;height:number};
    silent?:boolean;
    extraMessage?:IExtraMessage;
    container:HTMLDivElement;
    eDux:IEDux;// 数据接口共享模块
}


export declare interface IBaseFrameOptions extends IFrameOptions{
}

export declare interface IBaseFrame extends IFrame{
    engine:EBoardEngine;
    options:IBaseFrameOptions;
}



export declare interface IHTMLFrameOptions extends IFrameOptions{
    scrollbar?:ScrollbarType;
    content?:string|HTMLElement;
}

export declare interface IHTMLFrame extends IBaseFrame{
    options:IHTMLFrameOptions;
}



export declare interface IImageFrameOptions extends IFrameOptions{
    scrollbar?:ScrollbarType;
    content?:string;
}

export declare interface IImageFrame extends IBaseFrame{
    options:IImageFrameOptions;
}



export declare interface ICanvasFrameOptions extends IFrameOptions{
    scrollbar?:ScrollbarType;
    content?:string;
}
export declare interface ICanvasFrame extends IBaseFrame{
    canvas:HTMLCanvasElement;
    options:ICanvasFrameOptions;
}
