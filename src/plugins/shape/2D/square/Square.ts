/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/13 15:40
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/13 15:40
 * @disc:Square 正方形 extends Rectangle without Ctrl KeyEvent;
 */
import {Rectangle} from '../rectangle/Rectangle';
import {ctrlKeyEnable} from '../../../../utils/decorators';

@ctrlKeyEnable(false)
class Square extends Rectangle{
    protected ctrlKey:boolean=true;
}

export {Square}