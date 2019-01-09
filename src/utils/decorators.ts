/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/6 16:10
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/7/6 16:10
 * @disc:装饰器
 */
import {CursorType} from '../enums/CursorType';
import {EBoardCanvas} from '../EBoardCanvas';
import {IDefaultConfig} from '../interface/IConfig';
import {Authority} from '..';

function mixinPlugin(pluginName:string):ClassDecorator{
    return (target:any)=>{
        // 附加到插件列表中去
        const pluginList=target.prototype.pluginList||[];
        pluginList.push({
            pluginName:pluginName,
            pluginReflectClass:require(`../plugins`)[pluginName]
        });
        Object.assign(target.prototype, {
            pluginList:pluginList,
        });
    }
}

function mixinPlugins(pluginNames:string[]):ClassDecorator{
    return (target:any)=>{
        const pluginList=target.prototype.pluginList||[];
        pluginNames.forEach((pluginName)=>{
            pluginList.push({
                pluginName:pluginName,
                pluginReflectClass:require(`../plugins`)[pluginName]
            });
        });
        Object.assign(target.prototype, {
            pluginList:pluginList
        });
    }
}

/**
 * 属性默认值
 * @param value
 * @returns {PropertyDecorator}
 */
function defaultValue(value: any):PropertyDecorator{
    return (target: any, propertyName: string)=>{
        target[propertyName] = value;
    }
}

/**
 * 插件引用Cursor
 * @returns {ClassDecorator}
 */
function setCursor(cursorType:CursorType):ClassDecorator{
    return (target:any)=>{
        // 附加到插件列表中去
        Object.assign(target.prototype, {
            cursorType:cursorType,
        });
    }
}

/**
 * 动画样式前缀
 * @param {string} animationCssPrefix
 * @returns {ClassDecorator}
 */
function setAnimationName(animationCssPrefix:string):ClassDecorator{
    return (target:any)=>{
        // 附加到插件列表中去
        Object.assign(target.prototype, {
            animationCssPrefix:animationCssPrefix,
        });
    }
}


/**
 * pip 管道模式注解
 * @param target
 * @param {string} name
 * @param {PropertyDescriptor} descriptor
 * @returns {PropertyDescriptor}
 */
function pipMode(target:any, name:string, descriptor:PropertyDescriptor){
    let popPromise:Promise<any> = new Promise((resolve)=>resolve(true));
    const oldValue = descriptor.value;
    // this 指向问题
    descriptor.value =function(){
        const _arguments=arguments;
        popPromise=popPromise.then(()=>{
            return oldValue.apply(this,_arguments);
        });
    };
    return descriptor;
}


/**
 * 消息装饰器，添加到成员方法上，执行成员方法时会发送消息
 * @param target
 * @param {string} name
 * @param {PropertyDescriptor} descriptor
 * @returns {PropertyDescriptor}
 */
function message(target:any, name:string, descriptor:PropertyDescriptor){
    const oldValue = descriptor.value;
    descriptor.value =function(){
        const message = oldValue.apply(this,arguments);
        if(void 0 === message || null === message){
            return message;
        }
        let copyMessage = Object.assign({},{
            frameId:this.frameId,
            groupId:this.groupId
        },message);
        // 消息内容通过创建传递，adapter通过eventBus传递
        const adapter = this.context.adapter;
        if(void 0 !== adapter){
            adapter.sendMessage(copyMessage);
        }
        return message;
    };
    return descriptor;
}

function filterParams(options: any, eBoardCanvas: EBoardCanvas) {
    const context = eBoardCanvas.context;
    const config=context.getConfig() as IDefaultConfig;
    if(options.hasOwnProperty("cornerSize")){
        options.cornerSize=context.transform(options.cornerSize);
    }
    if(options.hasOwnProperty("borderScaleFactor")){
        options.borderScaleFactor=context.transform(options.borderScaleFactor);
    }
    return Object.assign({
        borderColor:config.borderColor,
        cornerColor:config.cornerColor,
        cornerStrokeColor:config.cornerStrokeColor,
        cornerStyle:config.cornerStyle,
        transparentCorners:config.transparentCorners,
        strokeLineCap:config.strokeLineCap,
        cornerSize:context.transform(config.cornerSize),
        borderScaleFactor:context.transform(config.borderWidth)
    },options);
}


function authorityMaster(target:any, name:string, descriptor:PropertyDescriptor){
    const oldValue = descriptor.value;
    descriptor.value =function(){
        const authority = this.context?this.context.config.authority:undefined;
        return authority===Authority.Master?oldValue.apply(this,arguments):undefined;
    };
    return descriptor;
}

function authorityAssist(target:any, name:string, descriptor:PropertyDescriptor) {
    const oldValue = descriptor.value;
    descriptor.value =function(){
        const authority = this.context?this.context.config.authority:undefined;
        return (authority===Authority.Master||authority===Authority.Assist)?oldValue.apply(this,arguments):undefined;
    };
    return descriptor;
}

export {mixinPlugin,mixinPlugins,defaultValue,setCursor,setAnimationName,pipMode,message,filterParams,authorityMaster,authorityAssist};