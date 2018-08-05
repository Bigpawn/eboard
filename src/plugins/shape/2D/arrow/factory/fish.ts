/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/25 11:47
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/25 11:47
 * @disc:鱼头类箭头
 */

import DefaultFactory from './default';
import {ArrowMode} from '../Arrow';
class FishFactory extends DefaultFactory{
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
        const {x:fromX,y:fromY} = start;
        const {x:toX,y:toY} = end;
        const angle = Math.atan2(fromY - toY, fromX - toX) * 180 / Math.PI,
            angle1 = (angle + theta) * Math.PI / 180,
            angle2 = (angle - theta) * Math.PI / 180,
            topX = headlen * Math.cos(angle1),
            topY = headlen * Math.sin(angle1),
            botX = headlen * Math.cos(angle2),
            botY = headlen * Math.sin(angle2);
        let path:any[] = [];
        path.push(["M",fromX,fromY]);
        path.push(["L",toX,toY]);
        
        // 取中间点，然后跟终点1/3 点
        if(mode === ArrowMode.PREV||mode === ArrowMode.ALL){
            const point1={
                x:fromX - topX,
                y:fromY - topY
            };
            const point2={
                x:fromX - botX,
                y:fromY - botY
            };
            const point3={
              x:(point1.x+point2.x)/2,
              y:(point1.y+point2.y)/2,
            };
            const point4={
              x:(fromX-point3.x)/3 + point3.x,
              y:(fromY-point3.y)/3 + point3.y,
            };
            path.push(["M",point1.x ,point1.y]);
            path.push(["L",fromX,fromY]);
            path.push(["L",point2.x,point2.y]);
            path.push(["L",point4.x,point4.y]);
            path.push(["Z"]);
        }
        
        if(mode === ArrowMode.NEXT||mode === ArrowMode.ALL){
            // endArrow
            const point1={
                x:toX + topX,
                y:toY + topY
            };
            const point2={
                x:toX + botX,
                y:toY + botY
            };
            const point3={
                x:(point1.x+point2.x)/2,
                y:(point1.y+point2.y)/2,
            };
            const point4={
                x:(toX-point3.x)/3 + point3.x,
                y:(toY-point3.y)/3 + point3.y,
            };
            path.push(["M",point1.x ,point1.y]);
            path.push(["L",toX,toY]);
            path.push(["L",point2.x,point2.y]);
            path.push(["L",point4.x,point4.y]);
            path.push(["Z"]);
        }
        return {
            path:path,
            fill:color
        }
    }
}

export default FishFactory;