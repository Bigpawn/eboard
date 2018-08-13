/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/11 13:31
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/7/11 13:31
 * @disc:选择 Selection状态下应该恢复默认的鼠标或者使用自定义系统鼠标  需要扩展删除功能和移动放大功能，添加事件支持
 * 暂时隐藏对象设置功能
 * 旋转增量角度无法计算   旋转本身功能就有bug，旋转时不确定group是带角度的还是新的，接收端永远是新的，发送端需要计算出新的
 *
 *
 * 支持群组删除
 */
import {AbstractPlugin} from '../../AbstractPlugin';
import {IEvent} from '~fabric/fabric-impl';
import {EventBus} from '../../../utils/EventBus';
import {EBoardCanvas} from '../../../EBoardCanvas';
import {EBoardEngine} from '../../../EBoardEngine';
import {IObject} from '../../../interface/IObject';
import {IMessage, MessageTagEnum} from '../../../middlewares/MessageMiddleWare';
import {message, pipMode} from '../../../utils/decorators';
import {fabric} from "fabric";


export declare interface ISelectionMessage extends IMessage{
    ids:string[];
    transform:{
        left:number;
        top:number;
        width:number;
        height:number;
        angle:number;
    }
}


class Selection extends AbstractPlugin{
    // private suspensionShell:any;
  /*  public onMouseUp(o:any){
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
    };*/
    private angle:number=0;
    constructor(canvas:EBoardCanvas,eBoardEngine:EBoardEngine,eventBus:EventBus){
        super(canvas,eBoardEngine,eventBus);
        this.onSelection = this.onSelection.bind(this);
        this.onMoving = this.onMoving.bind(this);
        this.onScaling = this.onScaling.bind(this);
        this.onRotating = this.onRotating.bind(this);
    }
    
    
    
    private onMoving(e:IEvent){
        const _target = e.target;
        if(_target){
            let ids:string[];
            if("_objects" in _target && _target["_objects"].length>0){
                ids = _target["_objects"].map((object:IObject)=>object.id);
            }else{
                ids = [(_target as IObject).id];
            }
            const transform = e["transform"];
            const {target} = transform;
            this.moving(ids,{top:target.top,left:target.left});
        }
    }
    private onScaling(e:IEvent){
        const _target = e.target;
        if(_target){
            // 可能只有一个对象
            let ids:string[];
            if("_objects" in _target && _target["_objects"].length>0){
                ids = _target["_objects"].map((object:IObject)=>object.id);
            }else{
                ids = [(_target as IObject).id];
            }
            const transform = e["transform"];
            const {target} = transform;
            this.scaling(ids,{width:target.width * target.scaleX,height:target.height * target.scaleY,left:target.left,top:target.top});
        }
    }
    private onRotating(e:IEvent){
        const _target = e.target;
        if(_target){
            let ids:string[];
            if("_objects" in _target && _target["_objects"].length>0){
                ids = _target["_objects"].map((object:IObject)=>object.id);
            }else{
                ids = [(_target as IObject).id];
            }
            const transform = e["transform"];
            const {target} = transform;
            const delAngle = target.angle - this.angle;
            this.angle = target.angle;
            this.rotating(ids,{angle:delAngle});
        }
    }
    private onSelection(event:IEvent){
        const target = event.target;
        this.angle = 0;
        if(void 0 !== target){
            target.on("moving",this.onMoving);
            target.on("scaling",this.onScaling);
            target.on("rotating",this.onRotating);
            const onTransformEnd = ()=>{
                this.eBoardCanvas.discardActiveObject();
                target.off("moving",this.onMoving);
                target.off("scaling",this.onScaling);
                target.off("rotating",this.onRotating);
                target.off("moved",onTransformEnd);
                target.off("scaled",onTransformEnd);
                target.off("rotated",onTransformEnd);
            };
            target.on("moved",onTransformEnd);
            target.on("scaled",onTransformEnd);
            target.on("rotated",onTransformEnd)
        }
    }
    
    @message
    private moving(ids:string[],transform:any){
        return {
            tag:MessageTagEnum.SelectionMove,
            ids:ids,
            transform
        }
    }
    
    @message
    private scaling(ids:string[],transform:any){
        return {
            tag:MessageTagEnum.SelectionScale,
            ids:ids,
            transform
        }
    }
    @message
    private rotating(ids:string[],transform:any){
        return {
            tag:MessageTagEnum.SelectionRotate,
            ids:ids,
            transform
        }
    }
    
    public setEnable(enable:boolean,background?:boolean){
        super.setEnable(enable,background);
        if(enable){
            this.eBoardCanvas.selection=true;
            this.eBoardCanvas.skipTargetFind=false;
            this.eBoardCanvas.on("selection:created",this.onSelection);
        }else{
            this.eBoardCanvas.selection=false;
            this.eBoardCanvas.skipTargetFind=true;
            this.eBoardCanvas.off("selection:created",this.onSelection);
        }
        return this;
    }
    
    @pipMode
    public onMessage(message:ISelectionMessage){
        const {ids,tag,transform} = message;
        if(void 0 === ids || ids.length===0){
            return this;
        }
        this.eBoardCanvas.renderOnAddRemove=false;
        const objects = this.eBoardCanvas.getObjects().filter((obj:IObject)=>{
            return ids.indexOf(obj.id)>-1;
        });
        const copy = objects.map(obj=>{
            this.eBoardCanvas.remove(obj);
            return fabric.util.object.clone(obj);
        });
        const group = new fabric.Group(copy);
        this.eBoardCanvas.add(group);
        switch (tag){
            case MessageTagEnum.SelectionMove:
                // 需要计算增量
                group.set({
                    left:transform.left,
                    top:transform.top
                }).setCoords();
                group["toActiveSelection"]();// 转成selection
                this.eBoardCanvas.discardActiveObject();// 拆分成单独的对象
                break;
            case MessageTagEnum.SelectionScale:
                // 比例会成被增加
                const scaleX = transform.width/group.get("width");
                const scaleY = transform.height/group.get("height");
                group.set({
                    scaleX:scaleX,
                    scaleY:scaleY,
                    left:transform.left,
                    top:transform.top
                }).setCoords();
                group["toActiveSelection"]();// 转成selection
                this.eBoardCanvas.discardActiveObject();// 拆分成单独的对象
                break;
            case MessageTagEnum.SelectionRotate:
                // 计算增量角度
                group.rotate(transform.angle);
                group["toActiveSelection"]();// 转成selection
                this.eBoardCanvas.discardActiveObject();// 拆分成单独的对象
                break;
            default:
                break;
        }
        this.eBoardCanvas.renderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
        return this;
    }
}

export {Selection};