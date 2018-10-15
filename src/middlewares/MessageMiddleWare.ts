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
import {MessageIdMiddleWare} from './MessageIdMiddleWare';
import * as LZString from "lz-string";
import {EventBus} from '../utils/EventBus';
import {EDux} from '../utils/EDux';
import {IMessage} from '../interface/IMessage';


class MessageMiddleWare{
    private compress:boolean=false;
    private eventBus:EventBus;
    constructor(eventBus:EDux){
        this.eventBus=eventBus;
        this.compress= eventBus.config.compress;// 如果压缩接收端需要解压
    }
    private messageFactory(message:any){
        const {start,end,type,mode,fill,stroke,strokeDashArray,radius,rx,ry,path,points,width,height,fontSize,name,url,pageNum,images,urlPrefix,messageId,frame,group,center,size,text,totalWidth,totalHeight,scrollLeft,scrollTop,...rest} = message;
        // frame group 只传id
        return {
            messageId,
            header:{
                ...rest,
                ...frame?{frameId:frame.id}:{},
                ...group?{groupId:group.id}:{},
            },
            body:{start,end,type,mode,fill,stroke,strokeDashArray,radius,rx,ry,path,points,width,height,fontSize,name,url,pageNum,images,urlPrefix,center,size,text,totalWidth,totalHeight,scrollLeft,scrollTop}
        }
    }
    private messageOutFactory(message:any){
        const {header,body,messageId} = message;
        return {
            ...header,
            ...body,
            messageId
        }
    }
    /**
     * 内部调用该方法向外部发送消息
     * @param {IMessage} message
     * @returns {number}
     */
    public sendMessage(message:IMessage){
        if(void 0 === this.eventBus){
            return null;
        }
        // 自动生成id并返回id
        const id = void 0 === message.messageId?MessageIdMiddleWare.getId():message.messageId;
        const outMessage = this.messageFactory(Object.assign({},message,{messageId:id}));
        const messageStr = this.compress?LZString.compress(JSON.stringify(outMessage)):JSON.stringify(outMessage);
        this.eventBus.trigger("message",messageStr);
        return id;
    }
    
    /**
     * 消息还原
     * @param {string} message
     * @returns {any}
     */
    public decompressMessage(message:string){
        return this.messageOutFactory(JSON.parse(this.compress?LZString.decompress(message):message));
    }
}

export {MessageMiddleWare};