/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/11 14:35
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/11 14:35
 * @disc:HTML 操作，禁用画板所有操作，启用html操作，仅HTMLCanvas 有效
 */
import {AbstractPlugin} from '../../AbstractPlugin';
import {authorityAssist, message} from '../../../utils/decorators';
import {MessageTag} from '../../../enums/MessageTag';

class HTML extends AbstractPlugin{
    @message
    @authorityAssist
    private allowHTMLAction(){
        return {
            tag:MessageTag.AllowHtmlAction,
        }
    }
    @message
    @authorityAssist
    private disAllowHTMLAction(){
        return {
            tag:MessageTag.DisAllowHtmlAction,
        }
    }
    public setEnable(enable:boolean,background?:boolean){
        super.setEnable(enable,background);
        const parentElement = this.eBoardCanvas.getContainer();
        if(enable){
            if(/eboard-html-canvas/.test(parentElement.className)){
                parentElement.style.pointerEvents="none";
                (parentElement.previousElementSibling as HTMLDivElement).style.pointerEvents="all";
            }
            this.allowHTMLAction();
        }else{
            if(/eboard-html-canvas/.test(parentElement.className)){
                parentElement.style.pointerEvents="all";
                (parentElement.previousElementSibling as HTMLDivElement).style.pointerEvents="none";
            }
            this.disAllowHTMLAction();
        }
        return this;
    }
}
export {HTML}
