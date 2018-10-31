/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/10/22 10:24
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/10/22 10:24
 * @disc:上下文共享
 */
import {IFrame} from '../interface/IFrame';
import {IFrameGroup} from '../interface/IFrameGroup';
import {EventBus} from '../utils/EventBus';
import {CusMap} from './CusMap';
import {Store} from './Store';
import {IConfig, IDefaultConfig} from '../interface/IConfig';

export declare interface IPluginConfigOptions{
    background?:boolean;// 是否后台运行
    enable?:boolean;
}

class Context extends EventBus{
    constructor(){
        super();
    }
    private frameMap:CusMap<string,IFrame>=new CusMap<string,IFrame>();
    private groupMap:CusMap<string,IFrameGroup>=new CusMap<string, IFrameGroup>();
    public activeKey:string;// 可能是frame 可能是group
    public store:Store=new Store();
    private config:IDefaultConfig;
    public getConfig(key?:string){
        return key?this.config[key]:this.config;
    }
    public setConfig(config:IDefaultConfig){
        this.config=config;
    }
    public updateConfig(config:IConfig){
        this.config=Object.assign(this.config,config);
    }
    public getFrameById(frameId:string){
        return this.frameMap.get(frameId);
    }
    public getGroupById(groupId:string){
        return this.groupMap.get(groupId);
    }
    public setActiveKey(activeKey:string){
        this.activeKey=activeKey;
        return this;
    }
    public getFrame(frameId:string){
        return new Promise((resole)=>{
            if(this.frameMap.has(frameId)){
                resole(this.frameMap.get(frameId));
            }else{
                this.frameMap.on(frameId.toString(),()=>{
                    resole(this.frameMap.get(frameId));
                });
            }
        })
    }
    public addFrame(frameId:string,frame:IFrame){
        this.frameMap.set(frameId,frame);
        return this;
    }
    public deleteFrame(frameId:string){
        this.frameMap.delete(frameId);
    }
    public getGroup(groupId:string){
        return new Promise((resole)=>{
            if(this.groupMap.has(groupId)){
                resole(this.groupMap.get(groupId));
            }else{
                this.groupMap.on(groupId.toString(),()=>{
                    resole(this.groupMap.get(groupId));
                });
            }
        })
    }
    
    public addGroup(groupId:string,group:IFrameGroup){
        this.groupMap.set(groupId,group);
        return this;
    }
    public deleteGroup(groupId:string){
        this.groupMap.delete(groupId);
    }
    
    public getLastFrameOrGroupId(){
        // 通过frame 获取
        const ids = Array.from(this.frameMap.keys());
        const id = ids[ids.length-1];
        const frame = this.getFrameById(id);
        if(frame&&frame.groupId){
            return frame.groupId;
        }else{
            return id;
        }
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    public transform:any;
    
    
    public color:string;
    public dashed:boolean;
    public strokeWidth:number;
    public fontColor:string;
    public fontSize:string;
    public pencilColor:string;
    public pencilWidth:number;
    
    
    
    public compress:boolean=false;
    public adapter:any;
}




class ContextFactory{
    public context:Context;
    constructor(context:Context){
        this.context=context;
    }
}

export {Context,ContextFactory};