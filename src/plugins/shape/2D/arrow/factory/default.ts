/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/25 10:54
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/7/25 10:54
 * @disc:箭头生成工厂
 */
import {ArrowMode} from '../../../../../enums/ArrowMode';

class DefaultFactory{
    /**
     * 计算路径
     * @param start
     * @param end
     * @param {number} theta
     * @param {number} headlen
     * @param {ArrowMode} mode
     * @param {string} color
     * @returns {{path: any[]; fill: string}}
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
        let arrowX = fromX - topX,
            arrowY = fromY - topY;
        let path:any[] =[];
        path.push(["M",fromX,fromY]);
        path.push(["L",toX,toY]);
        
        
        
        // 判断是否有两个
        if(mode === ArrowMode.PREV||mode === ArrowMode.ALL){
            // startArrow
            arrowX = fromX - topX;
            arrowY = fromY - topY;
            path.push(["M",arrowX,arrowY]);
            path.push(["L",fromX,fromY]);
            arrowX = fromX - botX;
            arrowY = fromY - botY;
            path.push(["L",arrowX,arrowY]);
        }
    
        if(mode === ArrowMode.NEXT||mode === ArrowMode.ALL){
            // endArrow
            arrowX = toX + topX;
            arrowY = toY + topY;
            path.push(["M",arrowX,arrowY]);
            path.push(["L",toX,toY]);
            arrowX = toX + botX;
            arrowY = toY + botY;
            path.push(["L",arrowX,arrowY]);
        }
        return {
            path:path,
            fill:color
        };
    }
}

export default DefaultFactory;