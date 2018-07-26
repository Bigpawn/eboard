var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/10 10:52
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/10 10:52
 * @disc:EBoard engine ： 基于EboardCanvas进行部分功能封装，例如Undo/Redo,
 * 1. 添加消息拦截器，拦截器自动检测是否有上层Frame，如果有则向上抛i，如果没有则直接输出,拦截器配置全部拦截还是优化拦截，全部拦截，子项所有操作都会进行消息传递，优化拦截子项传递关键操作
 */
import { EBoardCanvas } from './EBoardCanvas';
import { mixinPlugins, registerMessageInterceptor } from './utils/decorators';
import { Plugins } from './plugins';
import { MessageHandlerInterceptorAdapter } from './interceptor/MessageHandlerInterceptorAdapter';
var EBoardEngine = /** @class */ (function () {
    function EBoardEngine(element, options, frame) {
        var _this = this;
        this.pluginInstanceMap = new Map();
        this.bgColor = "rgba(0,0,0,1)"; // 带透明度
        this.pixelRatio = 1;
        this.eBoardCanvas = new EBoardCanvas(element, options);
        this.parentFrame = frame;
        // plugins 实例化
        this.pluginList.forEach(function (plugin) {
            _this.pluginInstanceMap.set(plugin.pluginName, new plugin.pluginReflectClass(_this.eBoardCanvas, _this)); // 该参数统一传递,插件构造函数统一入参EBoardCanvas
        });
    }
    EBoardEngine.prototype.setActivePlugin = function (plugin) {
        this.activePlugin = plugin;
    };
    EBoardEngine.prototype.getActivePlugin = function () {
        return this.activePlugin;
    };
    EBoardEngine.prototype.getDefaultColor = function () {
        return this.bgColor;
    };
    EBoardEngine.prototype.getPlugin = function (pluginName) {
        return this.pluginInstanceMap.get(pluginName);
    };
    EBoardEngine.prototype.setPixelRatio = function (pixelRatio) {
        this.pixelRatio = pixelRatio;
    };
    EBoardEngine.prototype.getPixelRatio = function () {
        return this.pixelRatio;
    };
    EBoardEngine = __decorate([
        mixinPlugins([Plugins.Cursor, Plugins.Line, Plugins.Text, Plugins.Selection, Plugins.HTML, Plugins.Pencil, Plugins.Circle, Plugins.Ellipse, Plugins.Rectangle, Plugins.Square, Plugins.Triangle, Plugins.EquilateralTriangle, Plugins.OrthogonalTriangle, Plugins.Polygon, Plugins.Star, Plugins.Pentagon, Plugins.Hexagon, Plugins.Clear, Plugins.Arrow]),
        registerMessageInterceptor(MessageHandlerInterceptorAdapter)
    ], EBoardEngine);
    return EBoardEngine;
}());
export { EBoardEngine };
//# sourceMappingURL=EBoardEngine.js.map