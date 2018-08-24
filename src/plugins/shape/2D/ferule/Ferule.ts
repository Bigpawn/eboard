/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/8 11:26
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/8/8 11:26
 * @disc:fabric.Ferule  扩展自光标 及 Pencil
 * 在光标的基础上加上消息，同时启用Pencil插件
 * 触摸屏支持教鞭，不支持画线
 */
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import {Plugins} from '../../../index';
import {CursorType} from '../../../../enums/CursorType';
class Ferule extends AbstractShapePlugin{
    public cursorType = CursorType.Default;// default Value
    /**
     * 设置教鞭类型
     * @param {CursorType} type
     */
    public setFeruleType(type:CursorType){
        this.cursorType = type;
    }
    
    /**
     * @override
     * 调用光标API进行消息传递
     * 触摸屏无法同时启用画线插件
     * @param {boolean} enable
     * @param {boolean} backend
     * @returns {this}
     */
    public setEnable(enable:boolean,backend?:boolean){
        if(this.enable === enable){
            return;
        }
        super.setEnable(enable,backend);
        this.eBoardCanvas.setCursorMessageEnable(enable);
        if("ontouchstart" in document){
            return;
        }
        if(enable){
            this.eDux.trigger("plugin:active",{
                plugin:Plugins.Pencil,
                options:{
                    enable:true,
                    background:true
                }
            });
        }else{
            this.eDux.trigger("plugin:disable",{
                plugin:Plugins.Pencil,
                options:{
                    enable:false,
                    background:true
                }
            });
        }
        return this;
    }
}

export {Ferule}