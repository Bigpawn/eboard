/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/10 10:52
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/10 10:52
 * @disc:EBoard engine ： 基于EboardCanvas进行部分功能封装，例如Undo/Redo,
 * 1. 添加消息拦截器，拦截器自动检测是否有上层Frame，如果有则向上抛i，如果没有则直接输出,拦截器配置全部拦截还是优化拦截，全部拦截，子项所有操作都会进行消息传递，优化拦截子项传递关键操作
 * 2. Esc 热键支持
 */
import {EBoardCanvas} from './EBoardCanvas';
import {ICanvasOptions} from '~fabric/fabric-impl';
import {AbstractPlugin} from './plugins/AbstractPlugin';
import {IPlugins} from './plugins';
import {IExtraMessage} from './interface/IFrame';
import {EDux} from './utils/EDux';


declare interface IExtraOptions{
    eDux:EDux;
    extraMessage:IExtraMessage;
}


class EBoardEngine{
    public eBoardCanvas:EBoardCanvas;
    public pluginInstanceMap=new Map<string,IPlugins>();
    private activePlugin?:AbstractPlugin;
    public extraMessage:IExtraMessage;
    public eDux:EDux;
    constructor(element: HTMLCanvasElement, options: ICanvasOptions,props:IExtraOptions){
        this.eDux=props.eDux;
        this.extraMessage = props.extraMessage;
        options.allowTouchScrolling=true;
        this.eBoardCanvas = new EBoardCanvas(element,options,this);
        this.initPlugin();
    }
    private initPlugin(){
        // plugins 实例化
        this.eDux.config.plugins.forEach((pluginName:string)=>{
            this.pluginInstanceMap.set(pluginName,new (require(`./plugins`)[pluginName] as any)(this));
        });
    }
    public setActivePlugin(plugin?:AbstractPlugin){
        this.activePlugin=plugin;
    }
    public getActivePlugin(){
        return this.activePlugin;
    }
    public getPlugin(pluginName:string){
        return this.pluginInstanceMap.get(pluginName);
    }
}

export {EBoardEngine};
