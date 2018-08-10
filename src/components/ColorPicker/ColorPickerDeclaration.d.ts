/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/9 17:25
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/8/9 17:25
 * @disc:ColorPicker 声明文件
 */

declare interface IColorPickerOptions{
    customBG?:string;
    readOnly?:boolean;
    size?:0|1|2|3;
}
export const jsColorPicker:(selector:string,options:IColorPickerOptions)=>void;