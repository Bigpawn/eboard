/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/11/5 13:32
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/11/5 13:32
 * @disc:SDK 内部枚举
 */

export enum FrameType{
    Empty="empty",
    Image="image",
    HTML="html",
    Canvas="canvas",
    Pdf="pdf",
    Images="images"
}

export declare interface IPluginConfigOptions{
    background?:boolean;// 是否后台运行
    enable?:boolean;
}

export enum ScrollbarType{
    horizontal="horizon",
    vertical="vertical",
    both="both",
    none="none"
}

export enum Authority{
    Master="master",
    Assist="assist",
    Viewer="viewer",
    Operator="operator",
}