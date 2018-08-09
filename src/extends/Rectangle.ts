/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/27 17:44
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/27 17:44
 * @disc:fabric.Rectangle
 */
import {fabric} from "fabric";
import {IRectOptions} from '~fabric/fabric-impl';
import {IObject} from '../interface/IObject';

class Rectangle extends fabric.Rect implements IObject{
    public type:string="rectangle";
    public id:string;
    constructor(options?: IRectOptions){
        super(options);
        this.id=Date.now().toString();
    }
    public setId(id:string){
        this.id=id;
        return this;
    }
    
    
    public update(options?: IRectOptions){
        this.set(options as any).setCoords();
        return this;
    }
}

export {Rectangle};