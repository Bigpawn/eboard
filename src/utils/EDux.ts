/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/6 10:04
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/8/6 10:04
 * @disc:事件通道
 * 支持数据共享
 */
import {Plugins} from '../plugins';
import {MessageAdapter} from '../interceptor/MessageAdapter';
import {EventBus} from './EventBus';


export declare interface IPluginConfigOptions{
    background?:boolean;// 是否后台运行
    enable?:boolean;
}

export declare interface IPluginConfig{
    plugins:Map<Plugins,IPluginConfigOptions>;
    stroke?:string;
    fill?:string;
    enable?:boolean
}

export declare interface IShareDate extends IPluginConfig{}


export declare interface IEDux{
    _el:HTMLDivElement;
    adapter:MessageAdapter;
    on:(type:string,listener:EventListenerOrEventListenerObject)=>void;
    trigger:(type:string,data?:any)=>void;
    off:(type:string,listener:EventListenerOrEventListenerObject)=>void;
    sharedData:IShareDate
}


class EDux extends EventBus implements IEDux{
    public adapter:MessageAdapter;
    public sharedData:IShareDate={
        plugins:new Map<Plugins, IPluginConfigOptions>()
    };
}

export {EDux};