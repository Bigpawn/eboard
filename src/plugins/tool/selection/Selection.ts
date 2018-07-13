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
import {Suspension} from "../suspension/Suspension";

@setCursor(CursorTypeName.None)
class Selection extends AbsractPlugin{

    constructor(canvas:EBoardCanvas,eboardEngine:EBoardEngine){
        super(canvas,eboardEngine);
        this.upHandle.bind(this);
    }

    private upHandle=(o:any)=>{
        if(this.eBoardCanvas.getActiveObject()) {
            new Suspension(this.eBoardCanvas.getActiveObject());
        }
        // (this.eBoardCanvas.getActiveObjects()||[]).map((item:any,index:number)=>{
        //     console.log(item.type,'aaaaaaaaaaaaaaaaaa');
        // });
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