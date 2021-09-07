/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/22 9:55
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/8/22 9:55
 * @disc:IConfig
 */
import {Authority} from '..';

export declare interface IDefaultConfig{
    ratio:{w:number;h:number};
    showTab:boolean;
    borderColor:string;
    cornerColor:string;
    cornerStrokeColor:string;
    cornerStyle:string;
    transparentCorners:boolean;
    cornerSize:number;
    fontSize:number;
    fontColor:string;
    dimensions:{width:number};
    plugins:string[];
    cursorSize:number;
    borderWidth:number;
    strokeWidth:number;
    stroke:string;
    fill:string;
    compress:boolean;
    arrowShape:"default"|"fish"|"hollow";
    escKey:string;
    showToolbar:boolean;
    ctrlKey:boolean;
    strokeLineCap:string;
    autoTabLabel:string;
    disableHtmlFragment:boolean;
    authority:Authority;
    disableResize:boolean;
}

export declare interface ISDKConfig extends IDefaultConfig{

}

export type IConfig={
    [K in keyof ISDKConfig]?:any;
}