function mixinPlugin(pluginName) {
    return function (target) {
        // 附加到插件列表中去
        var pluginList = target.prototype.pluginList || [];
        pluginList.push({
            pluginName: pluginName,
            pluginReflectClass: require("../plugins")[pluginName]
        });
        Object.assign(target.prototype, {
            pluginList: pluginList,
        });
    };
}
function mixinPlugins(pluginNames) {
    return function (target) {
        var pluginList = target.prototype.pluginList || [];
        pluginNames.forEach(function (pluginName) {
            pluginList.push({
                pluginName: pluginName,
                pluginReflectClass: require("../plugins")[pluginName]
            });
        });
        Object.assign(target.prototype, {
            pluginList: pluginList
        });
    };
}
/**
 * 属性默认值
 * @param value
 * @returns {PropertyDecorator}
 */
function defaultValue(value) {
    return function (target, propertyName) {
        target[propertyName] = value;
    };
}
/**
 * 插件引用Cursor
 * @returns {ClassDecorator}
 */
function setCursor(cursorType) {
    return function (target) {
        // 附加到插件列表中去
        Object.assign(target.prototype, {
            cursorType: cursorType,
        });
    };
}
/**
 * 动画样式前缀
 * @param {string} animationCssPrefix
 * @returns {ClassDecorator}
 */
function setAnimationName(animationCssPrefix) {
    return function (target) {
        // 附加到插件列表中去
        Object.assign(target.prototype, {
            animationCssPrefix: animationCssPrefix,
        });
    };
}
/**
 * ctrl热键状态
 * @param {boolean} enable
 * @returns {ClassDecorator}
 */
function ctrlKeyEnable(enable) {
    return function (target) {
        // 附加到插件列表中去
        Object.assign(target.prototype, {
            ctrlKeyEnable: enable,
        });
    };
}
/**
 * pip 管道模式注解
 * @param target
 * @param {string} name
 * @param {PropertyDescriptor} descriptor
 * @returns {PropertyDescriptor}
 */
function pipMode(target, name, descriptor) {
    var popPromise = new Promise(function (resolve) { return resolve(true); });
    var oldValue = descriptor.value;
    // this 指向问题
    descriptor.value = function () {
        var _this = this;
        var _arguments = arguments;
        popPromise = popPromise.then(function () {
            return oldValue.apply(_this, _arguments);
        });
    };
    return descriptor;
}
/**
 * 消息输出拦截器
 * @param {typeof MessageHandlerInterceptorAdapter} interceptor
 * @returns {(target: any) => void}
 */
function registerMessageInterceptor(interceptor) {
    return function (target) {
        Object.assign(target.prototype, {
            handleAll: interceptor.handleAll,
            messageHandle: interceptor.messageHandle
        });
    };
}
export { mixinPlugin, mixinPlugins, defaultValue, setCursor, setAnimationName, pipMode, ctrlKeyEnable, registerMessageInterceptor };
//# sourceMappingURL=decorators.js.map