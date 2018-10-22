/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/10/22 11:33
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/10/22 11:33
 * @disc:数据状态存储
 */
import {EventBus} from '../utils/EventBus';
import {Plugins} from '../plugins';

export declare interface IPluginConfigOptions{
    background?:boolean;
    enable?:boolean;
}

class Store extends EventBus{
    public plugins:Map<Plugins,IPluginConfigOptions>=new Map<Plugins, IPluginConfigOptions>();
    public setPlugin(pluginName:Plugins,enable:boolean,background?:boolean){
        this.plugins.set(pluginName,{
            enable,
            background
        })
    }
    public getPlugin(pluginName:Plugins){
        return this.plugins.get(pluginName);
    }
}

export {Store};