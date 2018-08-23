/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/25 11:24
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/25 11:24
 * @disc:空心
 */
import DefaultFactory from './default';
import {ArrowMode} from '../../../../../enums/ArrowMode';

class HollowFactory extends DefaultFactory{
    /**
     *
     * @param start
     * @param end
     * @param {number} theta
     * @param {number} headlen
     * @param {ArrowMode} mode
     * @param {string} color
     * @returns {{path: string; fill: string}}
     */
    public static calcPath(start:{x:number;y:number},end:{x:number;y:number},theta:number,headlen:number,mode:ArrowMode,color:string){
        const calc = super.calcPath(start,end,theta,headlen,mode,color);
        return {
            path:calc.path,
            fill:"rgba(0,0,0,0)"
        };
    }
}

export default HollowFactory;