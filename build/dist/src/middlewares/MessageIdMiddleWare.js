/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/23 15:32
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/23 15:32
 * @disc:消息Id生成中间件
 */
var MessageIdMiddleWare = /** @class */ (function () {
    function MessageIdMiddleWare() {
    }
    MessageIdMiddleWare.getId = function () {
        return this.id++;
    };
    MessageIdMiddleWare.id = 0;
    return MessageIdMiddleWare;
}());
export { MessageIdMiddleWare };
//# sourceMappingURL=MessageIdMiddleWare.js.map