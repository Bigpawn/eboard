/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/9 16:47
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/8/9 16:47
 * @disc:ColorPicker
 */
// import "./jsColor.css";
import "./jsColorPicker.min.js";

declare const window:any;

declare interface IColor{
    r:number;
    g:number;
    b:number;
    a?:number;
}



declare interface IColorPickerOptions{
    customBG?:string;
    readOnly?:boolean;
    size?:0|1|2|3;
    memoryColors?:IColor[];
    convertCallback?:(colors:any,type:string)=>void;
    actionCallback?:(e:any,action:string)=>void;
    displayCallback?:(colors:any,hsv:any,options:any)=>void;
    color?:string;
    init?:(elm:HTMLElement,colors:any)=>void;
}
export const jsColorPicker:(selector:string,options:IColorPickerOptions)=>void = window.jsColorPicker;