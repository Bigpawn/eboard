/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/19 14:00
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/19 14:00
 * @disc:清空  仅清空当前白板或者清空所有白板
 */
import {AbstractPlugin} from '../../AbstractPlugin';
import {message} from '../../../utils/decorators';
import {MessageTag} from '../../../enums/MessageTag';

class Clear extends AbstractPlugin{
    @message
    private clearBoard(){
        this.eBoardCanvas.clear();
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
        this.eBoardCanvas.clear();
    }
}
export {Clear}
