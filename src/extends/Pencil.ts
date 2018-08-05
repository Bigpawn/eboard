/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/2 17:12
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/8/2 17:12
 * @disc:fabric.Pencil
 */
import {fabric} from "fabric";
import {IPathOptions} from '~fabric/fabric-impl';

export declare interface IExtendPencilOptions extends IPathOptions{
    pathOffset?:{x:number;y:number}
}

class Pencil extends fabric.Path{
    public type:string="pencil";
    public id:string;
    
    /**
     * 对象生成id
     * @param {string | any[]} path
     * @param {IPathOptions} options
     */
    constructor(path?: string | any[], options?: IPathOptions){
        super(path,options);
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
     * @param {IExtendPencilOptions} options
     */
    public update(options?: IExtendPencilOptions){
        this.set(options as any).setCoords();
        return this;
    }
}

export {Pencil};