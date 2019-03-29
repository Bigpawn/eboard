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
import {IConfig,ISDKConfig} from '../interface/IConfig';
import {Config} from './Config';


class Context extends EventBus{
    private frameMap:CusMap<string,IFrame>=new CusMap<string,IFrame>();
    private groupMap:CusMap<string,IFrameGroup>=new CusMap<string, IFrameGroup>();
    public activeKey:string;// 可能是frame 可能是group
    public config:Config;// 配置管理
    public store:Store;// 所有数据共享
    public container?:HTMLDivElement;
    constructor(config?:IConfig,container?:HTMLDivElement){
        super();
        this.config = new Config(config||{});
        this.store = new Store(this.config);
        this.container=container;
    }
    
    /////////////////////////////////Config/////////////////////////////////
    public getConfig(configItem?:keyof ISDKConfig){
        return configItem?this.config[configItem]:this.config;
    }
    public setConfig(configItem:keyof ISDKConfig,value:any){
        this.config.set(configItem,value);
    }
    
    ////////////////////////////frame 管理/////////////////////////////////
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