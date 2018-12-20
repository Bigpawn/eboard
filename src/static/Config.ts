/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/11/5 13:43
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/11/5 13:43
 * @disc:配置管理
 */

import {IConfig, ISDKConfig} from '../interface/IConfig';
const defaultConfig = require("../config.json");

class Config implements ISDKConfig{
    ratio:{w:number;h:number};
    showTab:boolean;
    borderColor:string;
    cornerColor:string;
    cornerStrokeColor:string;
    cornerStyle:string;
    strokeLineCap:string;
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
    enable:boolean;
    autoTabLabel:string;
    disableHtmlFragment:boolean;
    constructor(initConfig:IConfig){
        Object.assign(this,defaultConfig,initConfig);
    }
    public set(key:keyof IConfig|IConfig,value?:any){
        typeof key === "string"?Object.assign(this,{
            key:value
        }):Object.assign(this,key);
    }
}

export {Config};
