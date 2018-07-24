/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/24 9:14
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/24 9:14
 * @disc:消息输出拦截器
 */
import {IMessage} from '../middlewares/MessageMiddleWare';

class MessageHandlerInterceptorAdapter{
    public static handleAll:boolean=false;// 抛出所有消息？
    public static messageHandle(message:IMessage){
        console.log(message);
    }
}

export {MessageHandlerInterceptorAdapter};