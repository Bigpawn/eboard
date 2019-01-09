/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/6 11:40
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/8/6 11:40
 * @disc:fabric.Delete
 * 需要天然支持Del热键
 */

import {AbstractPlugin} from '../../AbstractPlugin';
import {authorityAssist, message, setCursor} from '../../../utils/decorators';
import {IEvent} from '~fabric/fabric-impl';
import {IObject} from '../../../interface/IObject';
import {EBoardEngine} from '../../../EBoardEngine';
import {Keys} from '../../../enums/Keys';
import {IDeleteMessage} from '../../../interface/IMessage';
import {MessageTag} from '../../../enums/MessageTag';
import {CursorType} from '../../../enums/CursorType';

@setCursor(CursorType.Rubber)
class Delete extends AbstractPlugin{
    constructor(eBoardEngine:EBoardEngine){
        super(eBoardEngine);
        this.onClick=this.onClick.bind(this);
        this.initDelKeyListener();// TODO 是否支持提供配置
        this.onSelected=this.onSelected.bind(this);
        this.onUnSelected=this.onUnSelected.bind(this);
    }
    
    private initDelKeyListener(){
        window.addEventListener("keydown",(e:KeyboardEvent)=>{
            const code = e.keyCode;
            if(code === Keys.Delete){
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
    @authorityAssist
    private deleteItems(ids:string[]){
        return {
            ids:ids,
            tag:MessageTag.Delete
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