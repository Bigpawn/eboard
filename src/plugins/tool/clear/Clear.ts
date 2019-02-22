/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/19 14:00
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/19 14:00
 * @disc:清空  仅清空当前白板或者清空所有白板
 */
import {AbstractPlugin} from '../../AbstractPlugin';
import {authorityAssist, message} from '../../../utils/decorators';
import {MessageTag} from '../../../enums/MessageTag';

class Clear extends AbstractPlugin{
    @message
    @authorityAssist
    private clearBoard(){
        // save state
        const objects = this.eBoardCanvas.getObjects();
        const ids = objects.map((object:any)=>{
            object.visible=false;
            return object.id;
        });
        this.eBoardCanvas.requestRenderAll();
        // this.eBoardCanvas.clear();
        this.eBoardCanvas.eventBus.trigger("object:modified",{
            tag:MessageTag.Clear,
            ids:ids
        });
        return {
            tag:MessageTag.Clear,
        }
    }
    
    public setEnable(enable:boolean,background?:boolean){
        return this;
    }
    
    /**
     * 清空当前白板
     * @returns {this}
     */
    public clear(){
        this.clearBoard();
        return this;
    }
    public onMessage(){
        const objects = this.eBoardCanvas.getObjects();
        objects.map((object:any)=>{
            object.visible=false;
            return object.id;
        });
        this.eBoardCanvas.requestRenderAll();
    }
}
export {Clear}
