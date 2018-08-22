/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/22 14:07
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/8/22 14:07
 * @disc:IMessage
 */

import {CursorTypeEnum} from '../cursor/Enum';
import {IMessage} from '../middlewares/MessageMiddleWare';

export declare interface ICursorMessage extends IMessage{
    center?:{x:number;y:number};
    type:CursorTypeEnum;
    size:number;
}