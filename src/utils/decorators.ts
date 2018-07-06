/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/6 16:10
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/6 16:10
 * @disc:装饰器
 */
function mixinPlugin(pluginName:string):ClassDecorator{
    return function (target:any) {
        //附加到插件列表中去
        const pluginList=target.prototype.pluginList||[];
        pluginList.push({
            pluginName:pluginName.substring(0,1).toUpperCase()+pluginName.substring(1),
            pluginReflectClass:require(`../${pluginName}/index`).default
        });
        Object.assign(target.prototype, {
            pluginList:pluginList,
        });
    }
}

function mixinPlugins(pluginNames:string[]):ClassDecorator{
    return function (target:any) {
        const pluginList=target.prototype.pluginList||[];
        pluginNames.forEach(function(pluginName) {
            pluginList.push({
                pluginName:pluginName.substring(0,1).toUpperCase()+pluginName.substring(1),
                pluginReflectClass:require(`../${pluginName}/index`).default
            });
        });
        Object.assign(target.prototype, {
            pluginList:pluginList
        });
    }
}



function defaultValue(value: any):PropertyDecorator{
    return function (target: any, propertyName: string) {
        target[propertyName] = value;
    }
}


export {mixinPlugin,mixinPlugins,defaultValue};