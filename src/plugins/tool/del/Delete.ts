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
import {message, setCursor} from '../../../utils/decorators';
import {IMessage, MessageTagEnum} from '../../../middlewares/MessageMiddleWare';
import {EventBus} from '../../../utils/EventBus';
import {CursorTypeEnum} from '../../../cursor/Enum';
import {IEvent} from '~fabric/fabric-impl';
import {IObject} from '../../../interface/IObject';

export declare interface IDeleteMessage extends IMessage{
    ids:string[];
}

@setCursor(CursorTypeEnum.Rubber)
class Delete extends AbstractPlugin{
    constructor(canvas:EBoardCanvas,eBoardEngine:EBoardEngine,eventBus:EventBus){
        super(canvas,eBoardEngine,eventBus);
        this.onClick=this.onClick.bind(this);
        this.initDelKeyListener();// TODO 是否支持提供配置
        this.onSelected=this.onSelected.bind(this);
        this.onUnSelected=this.onUnSelected.bind(this);
    }
    
    private initDelKeyListener(){
        window.addEventListener("keydown",(e:KeyboardEvent)=>{
            const code = e.keyCode;
            if(code === 46){
                this.deleteSelection();
            }
        })
    }
    
    private deleteSelection(){
        const objects = this.eBoardCanvas.getActiveObjects();
        if(objects.length>0){
            this.eBoardCanvas.renderOnAddRemove=false;
            let ids:string[]=[];
            objects.forEach((object:any)=>{
                this.eBoardCanvas.remove(object);
                ids.push(object.id);
            });
            this.eBoardCanvas.discardActiveObject();
            this.eBoardCanvas.renderAll();
            this.eBoardCanvas.renderOnAddRemove=true;
            this.deleteItems(ids);
        }
    }
    
    @message
    private deleteItems(ids:string[]){
        return {
            ids:ids,
            tag:MessageTagEnum.Delete
        }
    }
    
    
    private onClick(e:IEvent){
        const target = e.target as IObject;
        if(void 0 !== target && null !== target){
            this.eBoardCanvas.remove(target);
            this.deleteItems([target.id]);
        }
    }
    private onSelected(e:IEvent){
        const target = e.target;
        if(void 0 !== target && null !== target){
            target.hasControls=false;
            this.eBoardCanvas.setActiveObject(target);
            this.eBoardCanvas.renderAll();
        }
    }
    
    private onUnSelected(e:IEvent){
        const target = e.target as IObject;
        if(void 0 !== target && null !== target){
            target.hasControls=true;
            const active = this.eBoardCanvas.getActiveObject() as IObject;
            if(void 0 !== active && null !== active) {
                if (active.id === target.id) {
                    this.eBoardCanvas.discardActiveObject();
                    this.eBoardCanvas.renderAll();
                }
            }
        }
    }
    
    public setEnable(enable:boolean,background?:boolean){
        super.setEnable(enable,background);
        if(enable){
            // this.eBoardCanvas.on("selection:created",this.deleteSelection);
            this.eBoardCanvas.on("mouse:over",this.onSelected);
            this.eBoardCanvas.on("mouse:out",this.onUnSelected);
            this.eBoardCanvas.on("mouse:down",this.onClick);
            this.eBoardCanvas.skipTargetFind = false;
            this.eBoardCanvas.hoverCursor="none";
        }else{
            this.eBoardCanvas.off("mouse:over",this.onSelected);
            this.eBoardCanvas.off("mouse:out",this.onUnSelected);
            this.eBoardCanvas.off("mouse:down",this.onClick);
            this.eBoardCanvas.skipTargetFind = true;
            this.eBoardCanvas.hoverCursor="move";
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