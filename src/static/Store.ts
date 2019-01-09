/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/10/22 11:33
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/10/22 11:33
 * @disc:数据状态共享，目前进支持插件状态管理
 */
import {EventBus} from '../utils/EventBus';
import {Plugins} from '../plugins';
import {IPluginConfigOptions} from '../enums/SDKEnum';
import {Config} from './Config';
import {Keys} from '../enums/Keys';

class Store extends EventBus{
    constructor(config:Config){
        super();
        // esc support
        if(config.escKey){
            window.addEventListener("keydown",(e:KeyboardEvent)=>{
                const code = e.keyCode;
                if(code === Keys.Esc){
                    this.plugins.forEach((options:any,plugin:any)=>{
                        this.plugins.delete(plugin);
                        this.trigger("plugin:disable",{
                            plugin:plugin,
                            options:{
                                enable:false
                            }
                        });
                    });
                }
            })
        }
    }
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