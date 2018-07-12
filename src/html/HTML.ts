/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/11 14:35
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/11 14:35
 * @disc:HTML 操作，禁用画板所有操作，启用html操作，仅HTMLCanvas 有效
 */
import {AbsPlugin} from '../AbsPlugin';

class HTML extends AbsPlugin{
    public setEnable(enable:boolean){
        if(this.enable === enable){
            return;
        }
        this.enable=enable;
        const activePlugin=this.eBoardEngine.getActivePlugin();
        if(enable){
            // 禁用画布操作，启用html操作
            activePlugin&&activePlugin.setEnable(false);
            this.eBoardEngine.setActivePlugin(this);
            const parentElement = this.eBoardCanvas.getContainer();
            if(/eboard-html-canvas/.test(parentElement.className)){
                parentElement.style.pointerEvents="none";
                (parentElement.previousElementSibling as HTMLDivElement).style.pointerEvents="all";
            }
        }else{
            // 禁用html操作，启用画布操作
            if(activePlugin && activePlugin instanceof HTML){
                this.eBoardEngine.setActivePlugin(undefined);
            }
            const parentElement = this.eBoardCanvas.getContainer();
            if(/eboard-html-canvas/.test(parentElement.className)){
                parentElement.style.pointerEvents="all";
                (parentElement.previousElementSibling as HTMLDivElement).style.pointerEvents="none";
            }
        }
    }
}
export {HTML}
