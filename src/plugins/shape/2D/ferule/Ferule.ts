/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/8 11:26
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/8/8 11:26
 * @disc:fabric.Ferule  扩展自光标 及 Pencil
 * 在光标的基础上加上消息，同时启用Pencil插件
 */
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import {CursorTypeEnum} from '../../../../cursor/Enum';
import {Plugins} from '../../../index';
class Ferule extends AbstractShapePlugin{
    public cursorType = CursorTypeEnum.Default;// default Value
    /**
     * 设置教鞭类型
     * @param {CursorTypeEnum} type
     */
    public setFeruleType(type:CursorTypeEnum){
        this.cursorType = type;
    }
    
    /**
     * @override
     * 调用光标API进行消息传递
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
        if(enable){
            this.eventBus.trigger("plugin:active",{
                plugin:Plugins.Pencil,
                options:{
                    enable:true,
                    background:true
                }
            });
        }else{
            this.eventBus.trigger("plugin:disable",{
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