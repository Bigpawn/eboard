/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/22 9:55
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/8/22 9:55
 * @disc:IConfig
 */

export declare interface IConfig{
    ratio?:{w:number;h:number};
    showTab?:boolean;
    borderColor?:string;
    cornerColor?:string;
    cornerStrokeColor?:string;
    cornerStyle?:string;
    transparentCorners?:boolean;
    cornerSize?:number;
    fontSize?:number;
    dimensions?:{width:number};
    plugins?:string[];
    cursorSize?:number;
    borderWidth?:number;
    strokeWidth?:number;
    stroke?:string;
    fill?:string;
    compress?:boolean;
}

export declare interface IDefaultConfig{
    ratio:{w:number;h:number};
    showTab:boolean;
    borderColor:string;
    cornerColor:string;
    cornerStrokeColor:string;
    cornerStyle:string;
    transparentCorners:boolean;
    cornerSize:number;
    fontSize:number;
    dimensions:{width:number};
    plugins:string[];
    cursorSize:number;
    borderWidth:number;
    strokeWidth:number;
    stroke:string;
    fill:string;
    compress:boolean;
}