/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/10/23 13:51
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/10/23 13:51
 * @disc:
 */
import {FrameType,ScrollbarType} from "./enums/SDKEnum";
import {EBoard} from "./EBoard";
import {MessageTag} from "./enums/MessageTag";

declare const window:any;

window.EBoard = EBoard;
window.FrameType = FrameType;
window.ScrollbarType=ScrollbarType;
window.MessageTag=MessageTag;

export {EBoard,FrameType,ScrollbarType,MessageTag};