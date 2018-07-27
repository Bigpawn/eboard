/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/27 13:56
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/27 13:56
 * @disc:fabric.Line
 */
import {fabric} from "fabric";
import {ILineOptions, IObjectOptions} from '~fabric/fabric-impl';
class Line extends fabric.Line{
    public type:string="line";
    public id:string;
    
    /**
     *
     * @param {number[]} points
     * @param {IObjectOptions} options
     */
    constructor(points?: number[], options?: IObjectOptions){
        super(points,options);
        this.id=Date.now().toString();
    }
    
    /**
     * 修改id
     * @param {string} id
     * @returns {this}
     */
    public setId(id:string){
        this.id=id;
        return this;
    }
    
    /**
     * 更新 线条顶点
     * @param {ILineOptions} options
     */
    public update(options?: ILineOptions){
        this.set(options as any).setCoords();
    }
}

export {Line};