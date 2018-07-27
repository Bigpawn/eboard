/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/20 9:55
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/20 9:55
 * @disc:消息中间件 包括消息发送层 消息接收层
 *      发送层：内部将各种操作消息抛给消息中间件，消息中间件统一处理后交给外部的接收服务，外部接收服务进行消息发送
 *      接受层：
 *      消息格式：消息经过压缩后发送，压缩：lz-string  压缩配置是否启用
 *
 *
 *      消息类型：
 *          Tab === Frame 项目中引入Frame概念，Frame支持类型字段，类型包括
 *
 */
import { MessageIdMiddleWare } from './MessageIdMiddleWare';
import * as LZString from "lz-string";
export var MessageTagEnum;
(function (MessageTagEnum) {
    MessageTagEnum[MessageTagEnum["Start"] = 0] = "Start";
    MessageTagEnum[MessageTagEnum["Temporary"] = 1] = "Temporary";
    MessageTagEnum[MessageTagEnum["Process"] = 2] = "Process";
    MessageTagEnum[MessageTagEnum["End"] = 3] = "End";
    MessageTagEnum[MessageTagEnum["Action"] = 4] = "Action";
})(MessageTagEnum || (MessageTagEnum = {}));
var MessageMiddleWare = /** @class */ (function () {
    function MessageMiddleWare() {
    }
    MessageMiddleWare.onMessage = function (messageListener) {
        if (void 0 === this.messageListener) {
            this.messageListener = messageListener;
        }
        else {
            throw new Error("接收服务暂不支持多任务注册！");
        }
    };
    /**
     * 内部调用该方法向外部发送消息
     * @param {IMessage} message
     * @returns {number}
     */
    MessageMiddleWare.sendMessage = function (message) {
        // 自动生成id并返回id
        var id = void 0 === message.messageId ? MessageIdMiddleWare.getId() : message.messageId;
        var outMessage = Object.assign({}, message, { messageId: id });
        console.log(outMessage);
        // 发送该消息
        this.messageListener && this.messageListener.call(this, this.compress ? LZString.compress(JSON.stringify(outMessage)) : JSON.stringify(outMessage));
        return id;
    };
    MessageMiddleWare.compress = true;
    return MessageMiddleWare;
}());
export { MessageMiddleWare };
//# sourceMappingURL=MessageMiddleWare.js.map