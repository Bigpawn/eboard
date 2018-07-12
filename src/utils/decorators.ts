/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/6 16:10
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/6 16:10
 * @disc:装饰器
 */
import {CursorTypeName} from '../cursor/CursorType';

function mixinPlugin(pluginName:string):ClassDecorator{
    return (target:any)=>{
        // 附加到插件列表中去
        const pluginList=target.prototype.pluginList||[];
        pluginList.push({
            pluginName:pluginName,
            pluginReflectClass:require(`../${pluginName.toLowerCase()}/index`).default
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
                pluginReflectClass:require(`../${pluginName.toLowerCase()}/index`).default
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


export {mixinPlugin,mixinPlugins,defaultValue,setCursor,setAnimationName};