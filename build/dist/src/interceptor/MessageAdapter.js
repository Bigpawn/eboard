/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/24 9:14
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/24 9:14
 * @disc:消息输出拦截器
 */
import { MessageMiddleWare } from '../middlewares/MessageMiddleWare';
import { EBoard } from '../EBoard';
var MessageAdapter = /** @class */ (function () {
    function MessageAdapter() {
    }
    MessageAdapter.messageHandle = function (message) {
        var parent = this["parent"]; // 最外层是EBoard ，最外层不处理
        if (parent) {
            if (parent instanceof EBoard) {
                MessageMiddleWare.sendMessage(message);
            }
            else {
                if (parent.group) {
                    message.frameGroup = parent.options;
                }
                else {
                    message.frame = parent.options;
                }
                parent.messageHandle.call(parent, message);
            }
        }
        else {
            // 截取child中空的对象
            MessageMiddleWare.sendMessage(message);
        }
    };
    MessageAdapter.handleAll = false; // 抛出所有消息？
    return MessageAdapter;
}());
export { MessageAdapter };
//# sourceMappingURL=MessageAdapter.js.map