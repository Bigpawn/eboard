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
import {IEDux} from '../utils/EDux';


export declare interface IFrameGroupOptions{
    messageId?:number;// frame 创建的消息Id
    ratio?:string;
    scrollbar?:ScrollbarType;
    pageNum:number;// 传1 或者其他
    id?:string;
    type?:string;
    width?:number;
    height?:number;
    dimensions?:{width:number;height:number};
    container?:HTMLDivElement;
    eDux?:IEDux;
    append?:boolean;
    name?:string;
    calcSize?:any;
}

export declare interface IFrameGroup{
    container:HTMLDivElement;
    type:string;// 窗口标识id
    dom:HTMLElement;// 窗口内容dom
    child:Map<number,IFrame>;
    options:IFrameOptions;
    id:string;
    parent?:EBoard;
    destroy(silent?:boolean):void;
    getPlugin(pluginName:string):AbstractPlugin|undefined;
    switchToFrame?(childId:number,messageId:number):this|Promise<this>;// 切换到子frame
    updateOptionsSize?(size:{width:number;height:number;dimensions:{width:number;height:number}}):void;
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