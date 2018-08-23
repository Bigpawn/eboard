/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/24 9:14
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/24 9:14
 * @disc:消息输出拦截器
 */
import {IMessage, MessageMiddleWare} from '../middlewares/MessageMiddleWare';

class MessageAdapter{
    private middleWare:MessageMiddleWare;
    constructor(middleWare:MessageMiddleWare){
        this.middleWare=middleWare;
    }
    public messageHandle(message:IMessage){
        if(void 0 !== this.middleWare){
            this.middleWare.sendMessage(message);
        }
    }
}

export {MessageAdapter};