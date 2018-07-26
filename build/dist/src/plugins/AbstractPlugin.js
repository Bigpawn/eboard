/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/10 11:39
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/10 11:39
 * @disc:Plugin抽象类
 * 对象创建方式：mousedown事件中不创建对象，mousemove中检测，如果有对象则修改对象属性，否则创建对象，mouseend事件中销毁对象实例
 * bug: 通过对象创建及销毁来实现动态属性修改，此过程中会调用两次renderAll，性能低于调用api修改属性
 */
import { MessageMiddleWare } from '../middlewares/MessageMiddleWare';
var AbstractPlugin = /** @class */ (function () {
    function AbstractPlugin(canvas, eBoardEngine) {
        this.enable = false;
        this.eBoardCanvas = canvas;
        this.eBoardEngine = eBoardEngine;
        // bind this
        if (void 0 !== this.onMouseDown) {
            this.onMouseDown = this.onMouseDown.bind(this);
        }
        if (void 0 !== this.onMouseMove) {
            this.onMouseMove = this.onMouseMove.bind(this);
        }
        if (void 0 !== this.onMouseUp) {
            this.onMouseUp = this.onMouseUp.bind(this);
        }
        if (void 0 !== this.ctrlKeyDownHandler) {
            this.ctrlKeyDownHandler = this.ctrlKeyDownHandler.bind(this);
        }
        if (void 0 !== this.ctrlKeyUpHandler) {
            this.ctrlKeyUpHandler = this.ctrlKeyUpHandler.bind(this);
        }
    }
    /**
     * 插件启用开关
     * @param {boolean} enable
     */
    AbstractPlugin.prototype.setEnable = function (enable) {
        if (this.enable === enable) {
            return;
        }
        this.start = undefined;
        this.instance = undefined;
        this.enable = enable;
        var activePlugin = this.eBoardEngine.getActivePlugin();
        if (enable) {
            // 关闭当前激活的组件
            if (activePlugin) {
                activePlugin.setEnable(false);
            }
            this.eBoardEngine.setActivePlugin(this);
            if (void 0 !== this.onMouseDown) {
                this.eBoardCanvas.on('mouse:down', this.onMouseDown);
            }
            if (void 0 !== this.onMouseMove) {
                this.eBoardCanvas.on('mouse:move', this.onMouseMove);
            }
            if (void 0 !== this.onMouseUp) {
                this.eBoardCanvas.on('mouse:up', this.onMouseUp);
            }
            if (void 0 !== this.ctrlKeyDownHandler) {
                window.addEventListener("keydown", this.ctrlKeyDownHandler);
            }
            if (void 0 !== this.ctrlKeyUpHandler) {
                window.addEventListener("keyup", this.ctrlKeyUpHandler);
            }
        }
        else {
            if (activePlugin && activePlugin instanceof this.constructor) {
                this.eBoardEngine.setActivePlugin(undefined);
            }
            if (void 0 !== this.onMouseDown) {
                this.eBoardCanvas.off('mouse:down', this.onMouseDown);
            }
            if (void 0 !== this.onMouseMove) {
                this.eBoardCanvas.off('mouse:move', this.onMouseMove);
            }
            if (void 0 !== this.onMouseUp) {
                this.eBoardCanvas.off('mouse:up', this.onMouseUp);
            }
            if (void 0 !== this.ctrlKeyDownHandler) {
                window.removeEventListener("keydown", this.ctrlKeyDownHandler);
            }
            if (void 0 !== this.ctrlKeyUpHandler) {
                window.removeEventListener("keyup", this.ctrlKeyUpHandler);
            }
        }
        return this;
        // 暂时关闭光标
        /*
                // 光标使用
                const cursorPlugin = this.eBoardEngine.getPlugin(Plugins.Cursor) as Cursor;
                if(enable){
                    // Cursor启用
                    if(this.cursorType){
                        if(CursorTypeName.None === this.cursorType){
                            cursorPlugin&&cursorPlugin.setEnable(false);
                        }else{
                            cursorPlugin&&cursorPlugin.setType(this.cursorType).setEnable(true);
                        }
                    }else{
                        cursorPlugin&&cursorPlugin.setEnable(false);
                    }
                }else{
                    // Cursor关闭
                    if(this.cursorType){
                        cursorPlugin&&cursorPlugin.setEnable(false);
                    }
                }*/
    };
    ;
    /**
     * Canvas 像素与实际像素换算
     * @param {number} pixel
     * @returns {number}
     */
    AbstractPlugin.prototype.getCanvasPixel = function (pixel) {
        return pixel * this.eBoardEngine.getPixelRatio();
    };
    /**
     * 向上冒泡消息
     * @param {IMessage} message
     */
    AbstractPlugin.prototype.throwMessage = function (message) {
        // 需要添加实例id，消息id
        if ("messageHandle" in this.eBoardEngine) {
            // 向上传递消息
            this.eBoardEngine["messageHandle"](message);
        }
        else {
            MessageMiddleWare.sendMessage(message);
        }
    };
    return AbstractPlugin;
}());
export { AbstractPlugin };
//# sourceMappingURL=AbstractPlugin.js.map