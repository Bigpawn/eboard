/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/11 13:31
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/11 13:31
 * @disc:选择 Selection状态下应该恢复默认的鼠标或者使用自定义系统鼠标
 */
import {AbsractPlugin} from '../../AbsractPlugin';
import {setCursor} from '../../../utils/decorators';
import {CursorTypeName} from '../cursor/CursorType';
import {EBoardCanvas} from "../../../EBoardCanvas";
import {EBoardEngine} from "../../../EBoardEngine";
import {SuspensionShell} from "../suspension/SuspensionShell";

@setCursor(CursorTypeName.None)
class Selection extends AbsractPlugin{
    private suspensionShell:any;
    constructor(canvas:EBoardCanvas,eboardEngine:EBoardEngine){
        super(canvas,eboardEngine);
        this.upHandle.bind(this);
        this.moveHandle.bind(this);
    }

    public upHandle=(o:any)=>{
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

    private moveHandle=(o:any)=>{
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
            this.eBoardCanvas.on('mouse:up',this.upHandle);
            this.eBoardCanvas.on('mouse:move',this.moveHandle);
        }else{
            // 关闭当前的插件
            if(activePlugin && activePlugin instanceof Selection){
                this.eBoardEngine.setActivePlugin(undefined);
            }
            this.eBoardCanvas.selection=false;
            this.eBoardCanvas.skipTargetFind=true;
            this.eBoardCanvas.off('mouse:up',this.upHandle);
            this.eBoardCanvas.off('mouse:move',this.moveHandle);
        }
        super.setEnable(enable);
    }
}

export {Selection};