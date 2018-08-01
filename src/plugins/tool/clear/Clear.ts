/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/19 14:00
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/19 14:00
 * @disc:清空  仅清空当前白板或者清空所有白板
 */
import {AbstractPlugin} from '../../AbstractPlugin';
import {MessageTagEnum} from '../../../middlewares/MessageMiddleWare';
import {message} from '../../../utils/decorators';

class Clear extends AbstractPlugin{
    @message
    private clearBoard(){
        this.eBoardCanvas.clear();
        return {
            tag:MessageTagEnum.Clear,
            id:this.eBoardEngine.parent.id
        }
    }
    public setEnable(enable:boolean){
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
}
export {Clear}
