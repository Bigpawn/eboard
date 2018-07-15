/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/10 10:52
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/10 10:52
 * @disc:EBoard engine ： 基于EboardCanvas进行部分功能封装，例如Undo/Redo,
 * 提供插件关联入口
 */
import {EBoardCanvas} from './EBoardCanvas';
import {ICanvasOptions} from '~fabric/fabric-impl';
import {mixinPlugins} from './utils/decorators';


import {AbstractPlugin} from './plugins/AbstractPlugin';
import {IPlugins, Plugins} from './plugins';


declare interface IPlugin{
    pluginName:string;
    pluginReflectClass:IPlugins
}


@mixinPlugins([Plugins.Cursor,Plugins.Line,Plugins.Text,Plugins.Selection,Plugins.HTML,Plugins.Pencil,Plugins.Circle,Plugins.Ellipse,Plugins.Rectangle,Plugins.Square,Plugins.Triangle,Plugins.EquilateralTriangle])
class EBoardEngine{
    public eBoardCanvas:EBoardCanvas;
    private pluginList:IPlugin[];
    public pluginInstanceMap=new Map<string,IPlugins>();
    private bgColor:string="rgba(0,0,0,1)";// 带透明度
    private pixelRatio:number=1;
    public getDefaultColor(){
        return this.bgColor;
    }
    private activePlugin?:AbstractPlugin;
    public getActivePlugin(){
        return this.activePlugin;
    }
    public setActivePlugin(plugin?:AbstractPlugin){
        this.activePlugin=plugin;
    }
    constructor(element: HTMLCanvasElement | string, options?: ICanvasOptions){
        this.eBoardCanvas = new EBoardCanvas(element,options);
        // plugins 实例化
        this.pluginList.forEach((plugin)=>{
            this.pluginInstanceMap.set(plugin.pluginName,new (plugin.pluginReflectClass as any)(this.eBoardCanvas,this));// 该参数统一传递,插件构造函数统一入参EBoardCanvas
        });
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
}

export {EBoardEngine};
