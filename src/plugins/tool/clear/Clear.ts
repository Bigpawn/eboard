/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/19 14:00
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/19 14:00
 * @disc:清空  仅清空当前白板或者清空所有白板
 */
import {AbstractPlugin} from '../../AbstractPlugin';

class Clear extends AbstractPlugin{
    public setEnable(enable:boolean){
        return this;
    }
    
    /**
     * 清空当前白板
     */
    public clear(){
        this.eBoardCanvas.clear();
    }
    
    /**
     * 清空所有白板
     */
    public clearAll(){
        // 白板实例需要存放，涉及到数据结构，待定
    }
}
export {Clear}
