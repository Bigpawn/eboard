/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/6 11:40
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/8/6 11:40
 * @disc:fabric.Delete
 * 需要天然支持Del热键
 */

import {AbstractPlugin} from '../../AbstractPlugin';
import {EBoardCanvas} from '../../../EBoardCanvas';
import {EBoardEngine} from '../../../EBoardEngine';
import {message} from '../../../utils/decorators';
import {IMessage, MessageTagEnum} from '../../../middlewares/MessageMiddleWare';
import {EventBus} from '../../../utils/EventBus';

export declare interface IDeleteMessage extends IMessage{
    ids:string[];
}

class Delete extends AbstractPlugin{
    constructor(canvas:EBoardCanvas,eBoardEngine:EBoardEngine,eventBus:EventBus){
        super(canvas,eBoardEngine,eventBus);
        this.deleteSelection=this.deleteSelection.bind(this);
        this.initDelKeyListener();// TODO 是否支持提供配置
    }
    
    private initDelKeyListener(){
        window.addEventListener("keydown",(e:KeyboardEvent)=>{
            const code = e.keyCode;
            if(code === 46){
                this.deleteSelection();
            }
        })
    }
    
    
    @message
    private deleteSelection(){
        const objects = this.eBoardCanvas.getActiveObjects();
        objects.forEach((object:any)=>{
            this.eBoardCanvas.remove(object);
        });
        this.eBoardCanvas.discardActiveObject();
        return {
            ids:objects.map((object:any)=>object.id),
            tag:MessageTagEnum.Delete
        }
    }
    public setEnable(enable:boolean,background?:boolean){
        super.setEnable(enable,background);
        if(enable){
            this.eBoardCanvas.on("selection:created",this.deleteSelection);
            this.eBoardCanvas.selection = true;
            this.eBoardCanvas.skipTargetFind = false;
        }else{
            this.eBoardCanvas.selection=false;
            this.eBoardCanvas.skipTargetFind=true;
            this.eBoardCanvas.off("selection:created",this.deleteSelection);
        }
        return this;
    }
    
    public onMessage(message:IDeleteMessage){
        const {ids} = message;
        ids.forEach(id=>{
            const instance = this.getInstanceById(id);
            instance&&this.eBoardCanvas.remove(instance);
        });
    }
}

export {Delete};