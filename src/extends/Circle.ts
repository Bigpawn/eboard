/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/27 13:35
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/27 13:35
 * @disc:fabric 扩展Circle
 */
import {fabric} from "fabric";
import {ICircleOptions} from "~fabric/fabric-impl";
import {IObject} from '../interface/IObject';
import Config from '../utils/Config';

const config = Config.getShapeConfig();


class Circle extends fabric.Circle implements IObject{
    public type:string="circle";
    public id:string;
    
    /**
     * 对象生成id
     * @param {ICircleOptions} options
     */
    constructor(options?: ICircleOptions){
        super(Object.assign({},options,config));
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
     * 更新 圆心和半径
     * @param {ICircleOptions} options
     */
    public update(options?: ICircleOptions){
        this.set(options as any).setCoords();
    }
}

export {Circle};