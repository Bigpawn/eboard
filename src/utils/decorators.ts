/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/6 16:10
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/6 16:10
 * @disc:装饰器
 */
import {MessageAdapter} from '../interceptor/MessageAdapter';
import {MessageMiddleWare} from '../middlewares/MessageMiddleWare';
import {CursorTypeEnum} from '../cursor/Enum';

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
function setCursor(cursorType:CursorTypeEnum):ClassDecorator{
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
 * @param interceptAll
 * @returns {(target: any) => void}
 */
function registerMessageInterceptor(interceptor:typeof MessageAdapter,interceptAll?:boolean){
    return (target:any)=>{
        Object.assign(target.prototype, {
            messageAdapter:new interceptor(target,interceptAll)
        });
    }
}

/**
 * 消息中间件注册
 * @param {typeof MessageMiddleWare} middleWare
 * @returns {(target: any) => void}
 */
function registerMessageMiddleWare(middleWare:typeof MessageMiddleWare){
    return (target:any)=>{
        Object.assign(target.prototype, {
            messageMiddleWare:new middleWare(),
        });
    }
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
        let copyMessage = Object.assign({},message);
        
        // 循环向上遍历
        let parent= this.parent||(this.eBoardEngine?this.eBoardEngine.parent:undefined),adapter=this.messageAdapter;
        while (void 0 !== parent && parent.constructor.name!=="EBoard"){// eBoard 类，具有属性frames
            if(parent.child){
                copyMessage.frameGroup={...parent.options,id:parent.id,messageId:parent.messageId};
            }else{
                copyMessage.frame={...parent.options,id:parent.id,messageId:parent.messageId};
            }
            adapter = adapter|| parent.messageAdapter;
            parent = parent.parent||(parent.eBoardEngine?parent.eBoardEngine.parent:undefined)
        }
        adapter = adapter|| parent.messageAdapter;
        
        // 没有拦截器则不发送
        if(void 0 !== adapter){
            (adapter as MessageAdapter).messageHandle(copyMessage);// 拦截器作用是
        }
        
        return message;
    };
    return descriptor;
}

export {mixinPlugin,mixinPlugins,defaultValue,setCursor,setAnimationName,pipMode,ctrlKeyEnable,registerMessageInterceptor,escKeyEnable,registerMessageMiddleWare,message};