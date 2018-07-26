/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/24 9:14
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/24 9:14
 * @disc:消息输出拦截器
 */
import {IMessage, MessageMiddleWare} from '../middlewares/MessageMiddleWare';

class MessageHandlerInterceptorAdapter{
    public static handleAll:boolean=false;// 抛出所有消息？
    public static messageHandle(message:IMessage){
        // 判断是否有上层拦截器
        // 如果有上层Frame则需要添加frame信息
        if("parentFrame" in this){
            // 有frame则需要将frame信息添加到消息中
            // 判断一个是group还是frame
            if(this["parentFrame"].group){
                // 组合frame
                message.frameGroupOptions=this["parentFrame"].options;
            }else{
                message.frameOptions=this["parentFrame"].options;
            }
            if("messageHandle" in this["parentFrame"]){
                this["parentFrame"].messageHandle(message);
            }else{
                MessageMiddleWare.sendMessage(message);
            }
        }else{
            // 当前捕获
            MessageMiddleWare.sendMessage(message);
        }
    }
}

export {MessageHandlerInterceptorAdapter};