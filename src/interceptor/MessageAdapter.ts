/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/24 9:14
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/24 9:14
 * @disc:消息输出拦截器
 */
import {IMessage} from '../middlewares/MessageMiddleWare';

class MessageAdapter{
    public interceptAll:boolean=false;
    public target:any;
    constructor(target:any,interceptAll?:boolean){
        this.target=target;
        this.interceptAll = !!interceptAll;
    }
    public messageHandle(message:IMessage){
        // 获取到消息中间件
        const middleWare = this.target.messageMiddleWare||this.target.prototype.messageMiddleWare;
        if(void 0 !== middleWare){
            middleWare.sendMessage(message);
        }
    }
}

export {MessageAdapter};