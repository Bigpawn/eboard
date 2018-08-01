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
import {escKeyEnable, mixinPlugins} from './utils/decorators';


import {AbstractPlugin} from './plugins/AbstractPlugin';
import {IPlugins, Plugins} from './plugins';
import {IFrame} from './interface/IFrame';


declare interface IPlugin{
    pluginName:string;
    pluginReflectClass:IPlugins
}


@mixinPlugins([Plugins.Cursor,Plugins.Line,Plugins.Text,Plugins.Selection,Plugins.HTML,Plugins.Pencil,Plugins.Circle,Plugins.Ellipse,Plugins.Rectangle,Plugins.Square,Plugins.Triangle,Plugins.EquilateralTriangle,Plugins.OrthogonalTriangle,Plugins.Polygon,Plugins.Star,Plugins.Pentagon,Plugins.Hexagon,Plugins.Clear,Plugins.Arrow])
@escKeyEnable(true)
class EBoardEngine{
    public eBoardCanvas:EBoardCanvas;
    private pluginList:IPlugin[];
    public pluginInstanceMap=new Map<string,IPlugins>();
    private bgColor:string="rgba(0,0,0,1)";// 带透明度
    private pixelRatio:number=1;
    private activePlugin?:AbstractPlugin;
    public parent:IFrame;
    private handleAll?:boolean;
    public messageHandle?:Function;
    constructor(element: HTMLCanvasElement | string, options: ICanvasOptions,parent:IFrame){
        this.eBoardCanvas = new EBoardCanvas(element,options);
        this.parent=parent;
        // plugins 实例化
        this.pluginList.forEach((plugin)=>{
            this.pluginInstanceMap.set(plugin.pluginName,new (plugin.pluginReflectClass as any)(this.eBoardCanvas,this));// 该参数统一传递,插件构造函数统一入参EBoardCanvas
        });
        this.escHandler();
    }
    private escHandler(){
        if(this["escKeyEnable"]){
            window.addEventListener("keydown",(e:KeyboardEvent)=>{
                const code = e.keyCode;
                if(code === 27){
                    const activePlugin=this.getActivePlugin();
                    if(void 0 !== activePlugin){
                        activePlugin.setEnable(false);
                    }
                }
            })
        }
    }
    public setActivePlugin(plugin?:AbstractPlugin){
        this.activePlugin=plugin;
    }
    public getActivePlugin(){
        return this.activePlugin;
    }
    public getDefaultColor(){
        return this.bgColor;
    }
    public getPlugin(pluginName:string){
        return this.pluginInstanceMap.get(pluginName);
    }
    public setPixelRatio(pixelRatio:number){
        this.pixelRatio=pixelRatio;
    }
    public getPixelRatio(){
        return this.pixelRatio;
    }
    public isHandleAll(){
        return this.handleAll;
    }
    public getMessageHandle(){
        return this.messageHandle;
    }
}

export {EBoardEngine};
