/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/20 9:55
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/7/20 9:55
 * @disc:消息中间件 包括消息发送层 消息接收层
 *      发送层：内部将各种操作消息抛给消息中间件，消息中间件统一处理后交给外部的接收服务，外部接收服务进行消息发送
 *      接受层：
 *      消息格式：消息经过压缩后发送，压缩：lz-string  压缩配置是否启用
 *
 *
 *      消息类型：
 *          Tab === Frame 项目中引入Frame概念，Frame支持类型字段，类型包括
 *
 *
 *          lz-string 会出现null 暂时移除该功能
 *
 */
import {IMessage} from '../interface/IMessage';
import {Context} from '../static/Context';


class MessageMiddleWare{
    private id:number=1;
    public getId(){
        return this.id++;
    }
    private readonly context:Context;
    constructor(context:Context){
        this.context=context;
    }
    private static messageFactory(message:any){
        const {messageId,frameId,groupId,tag,extraHtmlFragment,fragmentPublish,ids,id,...rest} = message;
        return {
            messageId,
            header:{
                tag,
                frameId,
                groupId,
                ids,
                id
            },
            body:{
                ...rest,
                ...fragmentPublish?{extraHtmlFragment}:{}
            }
        }
    }
    private static messageOutFactory(message:any){
        const {header,body,messageId} = message;
        const messageObject:any = {
            ...header,
            ...body,
            messageId
        };
        messageObject.tag = Number(messageObject.tag);
        return messageObject
    }
    /**
     * 内部调用该方法向外部发送消息
     * @param {IMessage} message
     * @returns {number}
     */
    public sendMessage(message:IMessage){
        if(void 0 === this.context){
            return null;
        }
        message.messageId = message.messageId||this.getId();
        const outMessage = MessageMiddleWare.messageFactory(message);
        const messageString = JSON.stringify(outMessage);
        this.context.trigger("message",messageString);
        return outMessage;
    }
    
    /**
     * 消息还原
     * @param {string} message
     * @returns {any}
     */
    public static decompressMessage(message:string){
        return this.messageOutFactory(JSON.parse(message));
    }
}

export {MessageMiddleWare};