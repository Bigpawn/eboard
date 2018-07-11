/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/5 17:16
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/5 17:16
 * @disc:光标、画笔类型  系统光标使用同一套方案实现，否则系统光标不支持url及光标点设置
 */

export enum CursorTypeName{
    PaintBruch="PaintBruch",
    Pencil="Pencil",
    None="None",// 使用默认的系统鼠标指针
}

export declare interface ICursorTypeProps{
    svg:string;
    startPoint:{// 鼠标作用点相对位置
        x:number;// 横向百分比
        y:number;// 纵向百分比
    }
}

export declare interface ICursorType{
    [propName:string]: ICursorTypeProps;
    [propName:number]: ICursorTypeProps;
}

export const CursorType:ICursorType={
    [CursorTypeName.PaintBruch]:{
        svg:require("./svg/paintbrush.svg"),
        startPoint:{
            x:0,
            y:100
        }
    },
    [CursorTypeName.Pencil]:{
        svg:require("./svg/pencil.svg"),
        startPoint:{
            x:0,
            y:100
        }
    },
};