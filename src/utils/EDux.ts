/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/6 10:04
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/8/6 10:04
 * @disc:
 *      事件通道
 *      支持配置及API共享
 *      采用装饰器模式connect到每个类中，不需要每层都进行实例传递，多实例模式怎么判断属于不同的EBoard????
 */
import {Plugins} from '../plugins';
import {MessageAdapter} from '../interceptor/MessageAdapter';
import {EventBus} from './EventBus';
import {IDefaultConfig} from '../interface/IConfig';


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
    sharedData:IShareDate;
}


class EDux extends EventBus implements IEDux{
    public adapter:MessageAdapter;
    public config:IDefaultConfig;
    public transform:(size:number)=>number;
    public sharedData:IShareDate={
        plugins:new Map<Plugins, IPluginConfigOptions>()
    };
}

export {EDux};