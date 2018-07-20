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

export declare interface IMessage{
    id?:number;// 消息的id，内部抛出的消息不包含该字段，该字段在中间件中自动生成
    
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
     */
    static sendMessage(message:IMessage){
    
    }
}

export {MessageMiddleWare};