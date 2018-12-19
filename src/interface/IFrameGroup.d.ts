/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/24 16:10
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/24 16:10
 * @disc:IframeGroup
 */

import {AbstractPlugin} from '../plugins/AbstractPlugin';
import {IFrame, IFrameOptions} from './IFrame';
import {ScrollbarType} from '../frames/HtmlFrame';
import {EBoard} from '../EBoard';


export declare interface IFrameGroupOptions{
    messageId?:number;// frame 创建的消息Id
    scrollbar?:ScrollbarType;
    pageNum:number;// 传1 或者其他
    groupId?:string;
    type?:string;
    width?:number;
    height?:number;
    dimensions?:{width:number;height:number};
    container?:HTMLDivElement;
    append?:boolean;
    name?:string;
    calcSize?:any;
    icon?:string;
    canRemove?:boolean;
}

export declare interface IFrameGroup{
    pageFrame:IFrame;
    container:HTMLDivElement;
    type:string;// 窗口标识id
    dom:HTMLElement;// 窗口内容dom
    child:Map<number,IFrame>;
    options:IFrameOptions;
    groupId:string;
    parent?:EBoard;
    destroy(silent?:boolean):void;
    getPlugin(pluginName:string):AbstractPlugin|undefined;
    updateOptionsSize?(size:{width:number;height:number;dimensions:{width:number;height:number}}):void;
    pageTo(pageNum:number):void;
    recovery(pageNum:number):void;
}



export declare interface IPdfFrameOptions extends IFrameGroupOptions{
    url:string;
}

export declare interface IPdfFrame extends IFrameGroup{
    url:string;
    options:IPdfFrameOptions;
}



export declare interface IImagesFrameOptions extends IFrameGroupOptions{
    urlPrefix:string;// 路径前缀
    images:string[];// 路径后缀数组
}


export declare interface IImagesFrame extends IFrameGroup{
    urlPrefix:string;// 路径前缀
    images:string[];// 路径后缀数组
    options:IImagesFrameOptions
}