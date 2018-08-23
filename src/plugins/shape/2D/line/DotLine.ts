/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/23 11:00
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/8/23 11:00
 * @disc:虚线
 */
import {Line} from './Line';


class DotLine extends Line{
    public strokeDashArray:number[]=[10,4];
}

export {DotLine};