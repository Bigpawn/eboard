/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/10 17:08
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/8/10 17:08
 * @disc:Rubber
 */
import {fabric} from "fabric";
import {ICursorTypes} from '../../interface/ICursorTypes';

class RubberCursor implements ICursorTypes{
    protected canvas:fabric.StaticCanvas;
    constructor(canvas:fabric.StaticCanvas){
        this.canvas=canvas;
    }
    public render(center:{x:number,y:number},size:number){
        const scale = size/50;
        return new fabric.Path("M128.421,93.187l-15.381-15.37c-0.928-0.928-2.197-1.489-3.613-1.489s-2.686,0.562-3.614,1.489l-24.402,24.401\n" +
            "\tc-0.928,0.928-1.501,2.197-1.501,3.613s0.573,2.686,1.501,3.613l10.84,10.849c2.097,2.091,4.961,3.372,8.146,3.372\n" +
            "\tc3.182,0,6.051-1.281,8.15-3.372l19.873-19.878c0.928-0.918,1.489-2.188,1.489-3.604s-0.562-2.69-1.489-3.613V93.187z\n" +
            "\t M94.961,119.187l-6.982-6.861l-4.957-4.932c-0.461-0.488-0.732-1.123-0.732-1.807c0-0.732,0.271-1.367,0.732-1.807l4.559-4.431\n" +
            "\tl19.306,19.177c-3.016,2.979-8.924,3.662-11.926,0.668V119.187z M126.517,98.739l-13.574,13.732l-4.248,4.248L89.391,97.543\n" +
            "\tl17.838-17.969c0.451-0.464,1.103-0.757,1.807-0.757c0.693,0,1.346,0.293,1.807,0.757l15.674,15.552\n" +
            "\tc0.488,0.464,0.755,1.099,0.755,1.807S127.005,98.275,126.517,98.739L126.517,98.739z",{
            left: center.x,
            top: center.y,
            originX:"center",
            originY:"center",
            scaleX:scale,
            scaleY:scale
        });
    }
}

export default RubberCursor;