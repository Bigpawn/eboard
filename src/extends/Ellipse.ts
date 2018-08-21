/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/27 13:47
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/27 13:47
 * @disc:fabric.Ellipse
 */
import {fabric} from "fabric";
import {IEllipseOptions} from "~fabric/fabric-impl";
import {IObject} from '../interface/IObject';
import Config from '../utils/Config';

const config = Config.getShapeConfig()


class Ellipse extends fabric.Ellipse implements IObject{
    public type:string="ellipse";
    public id:string;
    
    /**
     * 对象生成id
     * @param {IEllipseOptions} options
     */
    constructor(options?: IEllipseOptions){
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
     * @param {IEllipseOptions} options
     */
    public update(options?: IEllipseOptions){
        this.set(options as any).setCoords();
    }
}

export {Ellipse};