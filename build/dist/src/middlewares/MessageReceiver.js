/*
 * @Author: Bigpawn
 * @Date: 2018/7/26 14:35
 * @Last Modified by: Bigpawn
 * @Last Modified time: 2018/7/26 14:35
 */
var MessageReceiver = /** @class */ (function () {
    function MessageReceiver(eBoard) {
        this.stroke = [];
        this.buffer = [];
        this.messageId = 0;
        this.isOutput = true;
        this.eBoard = eBoard;
    }
    /**
     * 接收到的消息
     * @param {IMessage} message
     */
    MessageReceiver.prototype.receiver = function (message) {
        if (this.isOutput) {
            this.buffer.length > 0 ? this.stroke.concat(this.buffer) : null;
            this.stroke.push(message);
            this.update();
        }
        else {
            if (message.messageId === this.messageId + 1) {
                this.messageId = message.messageId;
                this.distribute(message);
                this.isOutput = true;
            }
            else {
                this.buffer.push(message);
            }
        }
        return this;
    };
    /**
     * 消息处理
     */
    MessageReceiver.prototype.update = function () {
        var _this = this;
        if (this.stroke.length > 0 && this.isOutput) {
            this.stroke.sort(function (item1, item2) {
                return (item1.messageId || 0) - (item2.messageId || 0);
            });
            var i = 0, stop_1 = false;
            var _loop_1 = function () {
                var message = this_1.stroke.shift();
                if (message.messageId === this_1.messageId + 1) {
                    this_1.messageId = message.messageId;
                    this_1.distribute(message);
                }
                else {
                    this_1.isOutput = false;
                    stop_1 = true;
                    setTimeout(function () {
                        _this.messageId = message.messageId || _this.messageId - 1;
                        _this.stroke.unshift(message);
                        _this.isOutput = true;
                    }, 1500);
                }
            };
            var this_1 = this;
            while (i < this.stroke.length && !stop_1) {
                _loop_1();
            }
        }
    };
    MessageReceiver.prototype.distribute = function (message) {
        var pluginName = message.type.split('_')[0];
        var type = message.frame && message.frame.type;
        var eboard = this.eBoard.findFrameById(type || '');
        pluginName = pluginName.substring(0, 1).toUpperCase() + pluginName.substring(1);
        var plugin = eboard.getPlugin(pluginName);
        plugin.onMessage(message);
    };
    return MessageReceiver;
}());
export { MessageReceiver };
//# sourceMappingURL=MessageReceiver.js.map