/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/11 13:31
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/11 13:31
 * @disc:选择 Selection状态下应该恢复默认的鼠标或者使用自定义系统鼠标
 */
import {setCursor} from '../../../utils/decorators';
import {CursorTypeName} from '../cursor/CursorType';
import {EBoardCanvas} from "../../../EBoardCanvas";
import {EBoardEngine} from "../../../EBoardEngine";
import {AbstractPlugin} from '../../AbstractPlugin';
import {SuspensionShell} from "../suspension/SuspensionShell";
@setCursor(CursorTypeName.None)
class Selection extends AbstractPlugin{
    private suspensionShell:any;
    constructor(canvas:EBoardCanvas,eboardEngine:EBoardEngine){
        super(canvas,eboardEngine);
    }
    public onMouseUp(o:any){
        if(this.eBoardCanvas.getActiveObject()) {
            if(!this.suspensionShell) {
                this.suspensionShell = new SuspensionShell(this.eBoardCanvas.getActiveObject(),this.eBoardCanvas);
            }else {
                this.suspensionShell.initSuspension(this.eBoardCanvas.getActiveObject(),this.eBoardCanvas);
            }
        }else {
            if(this.suspensionShell) {
                this.suspensionShell.removeElement(this.eBoardCanvas);
                this.suspensionShell = null;
            }
        }
    };

    public onMouseMove(o:any){
        if(this.eBoardCanvas.getActiveObject()) {
            if(!this.suspensionShell) {
                this.suspensionShell = new SuspensionShell(this.eBoardCanvas.getActiveObject(),this.eBoardCanvas);
            }else {
                this.suspensionShell.initSuspension(this.eBoardCanvas.getActiveObject(),this.eBoardCanvas);
            }
        }else {
            if(this.suspensionShell) {
                this.suspensionShell.removeElement(this.eBoardCanvas);
                this.suspensionShell = null;
            }
        }
    };

    public setEnable(enable:boolean){
        super.setEnable(enable);
        if(enable){
            this.eBoardCanvas.selection=true;
            this.eBoardCanvas.skipTargetFind=false;
        }else{
            this.eBoardCanvas.selection=false;
            this.eBoardCanvas.skipTargetFind=true;
        }
        return this;
    }
}

export {Selection};