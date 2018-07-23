/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/23 15:32
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/23 15:32
 * @disc:消息Id生成中间件
 */

class MessageIdMiddleWare{
    private static id:number=0;
    public static getId(){
        return this.id++;
    }
}

export {MessageIdMiddleWare};