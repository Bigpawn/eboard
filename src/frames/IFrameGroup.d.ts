/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/24 16:10
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/24 16:10
 * @disc:IframeGroup
 */

import {AbstractPlugin} from '../plugins/AbstractPlugin';
import {IFrame, IFrameOptions} from './IFrame';
import {ScrollbarType} from './HtmlFrame';


export declare interface IFrameGroupOptions{
    type:string;// frame 的类型及id标识
    messageId:number;// frame 创建的消息Id
    ratio?:string;
    scrollbar?:ScrollbarType;
    pageNum:number;// 传1 或者其他
}

export declare interface IFrameGroup{
    group:true;// 是否组合，强制为true,用于消息拦截器做检测，或者其他做检测
    type:string;// 窗口标识id
    messageId:number;// 窗口创建对应消息
    dom:HTMLElement;// 窗口内容dom
    ratio:string;
    child:Map<number,IFrame>;
    options:IFrameOptions;
    getPlugin(pluginName:string):AbstractPlugin|undefined;
    destroy():void;
    switchToFrame?(childId:number,messageId:number):this|Promise<this>;// 切换到子frame
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