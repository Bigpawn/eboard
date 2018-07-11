/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/11 13:31
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/11 13:31
 * @disc:选择 Selection状态下应该恢复默认的鼠标或者使用自定义系统鼠标
 */
import {AbsPlugin} from '../AbsPlugin';
import {setCursor} from '../utils/decorators';
import {CursorTypeName} from '../cursor/CursorType';

@setCursor(CursorTypeName.None)
class Selection extends AbsPlugin{
    public setEnable(enable:boolean){
        if(this.enable===enable){
            return;
        }
        this.enable=enable;
        const activePlugin=this.eBoardEngine.getActivePlugin();
        if(enable){
            // 禁用当前激活的插件
            if(activePlugin){
                activePlugin.setEnable(false);
            }
            this.eBoardEngine.setActivePlugin(this);
            this.eBoardCanvas.selection=true;
            this.eBoardCanvas.skipTargetFind=false;
        }else{
            // 关闭当前的插件
            if(activePlugin && activePlugin instanceof Selection){
                this.eBoardEngine.setActivePlugin(undefined);
            }
            this.eBoardCanvas.selection=false;
            this.eBoardCanvas.skipTargetFind=true;
        }
        super.setEnable(enable);
    }
}

export {Selection};