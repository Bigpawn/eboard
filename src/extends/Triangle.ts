/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/30 9:20
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/30 9:20
 * @disc:fabric.Triangle
 */
import {fabric} from "fabric";
import {ITriangleOptions} from '~fabric/fabric-impl';

class Triangle extends fabric.Triangle{
    public type="triangle";
    public id:string;
    constructor(options?: ITriangleOptions){
        super(options);
        this.id=Date.now().toString();
    }
    public setId(id:string){
        this.id=id;
        return this;
    }
    
    /**
     * 更新
     * @param {ITriangleOptions} options
     */
    public update(options?: ITriangleOptions){
        this.set(options as any).setCoords();
        return this;
    }
}

export {Triangle};