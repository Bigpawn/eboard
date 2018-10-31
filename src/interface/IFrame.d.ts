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
import {ScrollBar} from '../components/ScrollBar';
import {IFrameGroup, IFrameGroupOptions} from './IFrameGroup';
import {EBoard} from '../EBoard';

export declare interface IExtraMessage{
    frame?:IFrameOptions;
    group?:IFrameGroupOptions;
}

export declare interface IFrame{
    container:HTMLDivElement;
    options:IFrameOptions;
    type:string;
    dom:HTMLElement;
    engine?:EBoardEngine;
    frameId:string;
    scrollbar?:ScrollBar;
    parent?:IFrameGroup|EBoard;
    extraMessage?:IExtraMessage;
    extraMessageOrigin?:IExtraMessage;
    groupId?:string;
    getPlugin(pluginName:string):AbstractPlugin|undefined;
    destroy(silent?:boolean):void;
}

export declare interface IFrameOptions{
    frameId?:string;
    type?:string;
    width?:number;
    height?:number;
    container?:HTMLDivElement;
    name?:string;
    calcSize?:any;
    groupId?:string;
    messageId?:number;
}


export declare interface IBaseFrameOptions extends IFrameOptions{
}

export declare interface IBaseFrame extends IFrame{
    engine:EBoardEngine;
    options:IBaseFrameOptions;
}



export declare interface IHTMLFrameOptions extends IFrameOptions{
    scrollbar?:ScrollbarType;
    content?:string|HTMLDivElement;
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
