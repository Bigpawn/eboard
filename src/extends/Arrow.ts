/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/27 9:15
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/7/27 9:15
 * @disc:箭头
 */
import {fabric} from "fabric";
import {IPathOptions} from '~fabric/fabric-impl';
import {IObject} from '../interface/IObject';
import Config from '../utils/Config';

export declare interface IExtendArrowOptions extends IPathOptions{
    pathOffset?:{x:number;y:number}
}

const config = Config.getShapeConfig();


class Arrow extends fabric.Path implements IObject{
    public type:string="arrow";
    public id:string;
    
    /**
     * 对象生成id
     * @param {string | any[]} path
     * @param {IPathOptions} options
     */
    constructor(path?: string | any[], options?: IPathOptions){
        super(path,Object.assign({},options,config));
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
     * 更新 path
     * @param {IExtendArrowOptions} options
     */
    public update(options?: IExtendArrowOptions){
        this.set(options as any).setCoords();
        return this;
    }
}

export {Arrow};