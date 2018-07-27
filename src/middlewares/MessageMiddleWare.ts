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
import {MessageIdMiddleWare} from './MessageIdMiddleWare';
import * as LZString from "lz-string";
import {IFrameOptions} from '../frames/IFrame';
import {MessageReceiver} from './MessageReceiver';

export enum MessageTagEnum{
    Start,Temporary,Process,End,Action
}


export declare interface IMessage{
    tag:MessageTagEnum;
    messageId?:number;
    point?:{x:number;y:number};
    radius?:number;
    id:string;// 实例类型及Id组合
    frame?:IFrameOptions,// frame 创建属性
    frameGroup?:IFrameOptions// frame组创建属性
    rx?:number;
    ry?:number;
    start?:{x:number;y:number};
    end?:{x:number;y:number};
    length?:number;
    angle?:number;
    width?:number;
    height?:number;
    points?:any[];
    flipX?:boolean;
    flipY?:boolean;
}

export declare interface IReceiveMessage extends IMessage{
    id:number;
}


class MessageMiddleWare{
    private static compress:boolean=true;
    private static messageListener:(message:string)=>void;// 消息监听
    public static onMessage(messageListener:(message:string)=>void){
        if(void 0 === this.messageListener){
            this.messageListener = messageListener;
        }else{
            throw new Error("接收服务暂不支持多任务注册！");
        }
    }
    
    /**
     * 内部调用该方法向外部发送消息
     * @param {IMessage} message
     * @returns {number}
     */
    static sendMessage(message:IMessage){
        // 自动生成id并返回id
        const id = void 0 === message.messageId?MessageIdMiddleWare.getId():message.messageId;
        const outMessage = Object.assign({},message,{messageId:id});
        console.log(outMessage);
        MessageReceiver.receiver(outMessage);
        // 发送该消息
        this.messageListener&&this.messageListener.call(this,this.compress?LZString.compress(JSON.stringify(outMessage)):JSON.stringify(outMessage));
        return id;
    }
}

export {MessageMiddleWare};