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
import {IMessage} from '../middlewares/MessageMiddleWare';


export declare interface IFrameGroupOptions{
    messageId?:number;// frame 创建的消息Id
    ratio?:string;
    scrollbar?:ScrollbarType;
    pageNum:number;// 传1 或者其他
    id?:string;
    type?:string;
}

export declare interface IFrameGroup{
    type:string;// 窗口标识id
    messageId:number;// 窗口创建对应消息
    dom:HTMLElement;// 窗口内容dom
    child:Map<number,IFrame>;
    options:IFrameOptions;
    id:string;
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