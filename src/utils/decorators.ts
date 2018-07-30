/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/6 16:10
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/6 16:10
 * @disc:装饰器
 */
import {CursorTypeName} from '../plugins/tool/cursor/CursorType';
import {MessageAdapter} from '../interceptor/MessageAdapter';

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
function setCursor(cursorType:CursorTypeName):ClassDecorator{
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
 * ctrl热键状态
 * @param {boolean} enable
 * @returns {ClassDecorator}
 */
function ctrlKeyEnable(enable:boolean):ClassDecorator{
    return (target:any)=>{
        // 附加到插件列表中去
        Object.assign(target.prototype, {
            ctrlKeyEnable:enable,
        });
    }
}

/**
 * Esc 热键支持
 * @param {boolean} enable
 * @returns {ClassDecorator}
 */
function escKeyEnable(enable:boolean):ClassDecorator{
    return (target:any)=>{
        Object.assign(target.prototype, {
            escKeyEnable:enable,
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
 * 消息输出拦截器
 * @param {typeof MessageAdapter} interceptor
 * @returns {(target: any) => void}
 */
function registerMessageInterceptor(interceptor:typeof MessageAdapter){
    return (target:any)=>{
        Object.assign(target.prototype, {
            handleAll:interceptor.handleAll,
            messageHandle:interceptor.messageHandle
        });
    }
}

export {mixinPlugin,mixinPlugins,defaultValue,setCursor,setAnimationName,pipMode,ctrlKeyEnable,registerMessageInterceptor,escKeyEnable};