/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/24 9:14
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/24 9:14
 * @disc:消息输出拦截器
 */
import {IMessage, MessageMiddleWare} from '../middlewares/MessageMiddleWare';
import {EBoard} from '../EBoard';

class MessageAdapter{
    public static handleAll:boolean=false;// 抛出所有消息？
    public static messageHandle(message:IMessage){
        const parent:any = this["parent"];// 最外层是EBoard ，最外层不处理
        if(parent){
            if(parent instanceof EBoard){
                MessageMiddleWare.sendMessage(message);
            }else{
                if(parent.group){
                    message.frameGroup=Object.assign({},parent.options,{id:parent.id});
                }else{
                    message.frame=Object.assign({},parent.options,{id:parent.id});
                }
                parent.messageHandle.call(parent,message);
            }
        }else{
            // 截取child中空的对象
            MessageMiddleWare.sendMessage(message);
        }
    }
}

export {MessageAdapter};