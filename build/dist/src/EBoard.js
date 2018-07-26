/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/20 11:45
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/20 11:45
 * @disc:前端应用架构类 设计到窗口概念  frame 可应用为Tab
 * frame 中管理canvas实例，canvas实例中管理绘制object实例  层级化，frame中提供object实例查询 canvas中提供跨实例object实例查询
 * 支持页面中多实例模式，多容器模式，从静态类修改成实体类
 *
 *
 */
import { BaseFrame } from './frames/BaseFrame';
import { HtmlFrame } from './frames/HtmlFrame';
import { ImageFrame } from './frames/ImageFrame';
import { CanvasFrame } from './frames/CanvasFrame';
import { PdfFrame } from "./frames/PdfFrame";
import { ImagesFrame } from './frames/ImagesFrame';
import "./style/canvas.less";
import { MessageMiddleWare, MessageTagEnum, } from './middlewares/MessageMiddleWare';
import { MessageIdMiddleWare } from './middlewares/MessageIdMiddleWare';
export var FrameType;
(function (FrameType) {
    FrameType["Empty"] = "empty";
    FrameType["Image"] = "image";
    FrameType["HTML"] = "html";
    FrameType["Canvas"] = "canvas";
    FrameType["Pdf"] = "pdf";
    FrameType["Images"] = "images";
})(FrameType || (FrameType = {}));
var EBoard = /** @class */ (function () {
    function EBoard(containerFilter) {
        this.frames = new Map(); // frame管理
        this.container = containerFilter;
    }
    EBoard.prototype.getConteiner = function () {
        return "tagName" in this.container ? this.container : this.container();
    };
    /**
     * 根据type字符串返回真实type和id
     * @param {string} type
     * @returns {{type: string; id: string}}
     */
    EBoard.prototype.getFrameTypeAndId = function (type) {
        var arr = type.split("_");
        return {
            type: arr[0],
            id: arr[1]
        };
    };
    /**
     * 创建frame
     * @param {IFrameOptions} options
     * @returns {any}
     */
    EBoard.prototype.createFrame = function (options) {
        if (this.hasFrame(options.type)) {
            return this; // 如果已经存在
        }
        // 判断是操作者创建还是控制,操作者需要创建消息Id
        var _a = this.getFrameTypeAndId(options.type), type = _a.type, id = _a.id;
        var frame;
        options.type = void 0 === id ? options.type + "_" + Date.now() : options.type;
        if (void 0 === id) {
            // 消息发送
            options.messageId = MessageIdMiddleWare.getId(); // id 补充
            MessageMiddleWare.sendMessage(Object.assign({}, options, {
                tag: MessageTagEnum.Action
            }));
        }
        // 消息中不需要传递container
        var container = this.getConteiner();
        switch (type) {
            case FrameType.HTML:
                frame = new HtmlFrame(options, container);
                break;
            case FrameType.Image:
                frame = new ImageFrame(options, container);
                break;
            case FrameType.Canvas:
                frame = new CanvasFrame(options, container);
                break;
            case FrameType.Pdf:
                frame = new PdfFrame(options, container);
                break;
            case FrameType.Images:
                frame = new ImagesFrame(options);
                break;
            case FrameType.Empty:
            default:
                frame = new BaseFrame(options, container);
                break;
        }
        this.frames.set(options.type, frame);
        return frame;
    };
    /**
     * 切换到需要显示的frame 需要改frame存在，如果不存在则不执行任何操作
     * @param {string | IFrame} type
     * @returns {undefined | IFrame}
     */
    EBoard.prototype.switchToFrame = function (type) {
        // 支持frameType标识和对象
        if (typeof type === 'string') {
            if (type === this.activeFrame || !this.hasFrame(type)) {
                return;
            }
        }
        else {
            if (type.type === this.activeFrame || !this.hasFrame(type.type)) {
                return;
            }
        }
        if (this.activeFrame) {
            var frame = this.findFrameById(this.activeFrame);
            if (frame && frame.dom && frame.dom.parentElement) {
                frame.dom.parentElement.removeChild(frame.dom); // 隐藏
            }
        }
        this.activeFrame = typeof type === 'string' ? type : type.type;
        var activeFrame = typeof type === 'string' ? this.findFrameById(type) : type;
        if (activeFrame && activeFrame.dom) {
            activeFrame.container.appendChild(activeFrame.dom); // 如果是子frame则存在问题
        }
        return activeFrame;
    };
    /**
     * 根据id获取frame实例
     * @param {string} type
     * @returns {IFrame | undefined}
     */
    EBoard.prototype.findFrameById = function (type) {
        return this.frames.get(type);
    };
    /**
     * 检测是否存在某个frame
     * @param {string} type
     * @returns {boolean}
     */
    EBoard.prototype.hasFrame = function (type) {
        return this.frames.has(type);
    };
    /**
     * 清空缓存
     * @returns {this}
     */
    EBoard.prototype.clearCache = function () {
        if (this.frames.size > 0) {
            this.frames.forEach(function (frame) {
                frame.destroy();
            });
            this.frames.clear();
        }
        return this;
    };
    return EBoard;
}());
export { EBoard };
//# sourceMappingURL=EBoard.js.map