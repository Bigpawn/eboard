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
import {IObject} from '../../../interface/IObject';
import {message, pipMode} from '../../../utils/decorators';
import {EBoardEngine} from '../../../EBoardEngine';
import {ISelectionMessage} from '../../../interface/IMessage';
import {MessageTag} from '../../../enums/MessageTag';


class Selection extends AbstractPlugin{
    constructor(eBoardEngine:EBoardEngine){
        super(eBoardEngine);
        this.onSelection = this.onSelection.bind(this);
        this.onMoved = this.onMoved.bind(this);
        this.onRotated = this.onRotated.bind(this);
        this.onScaled=this.onScaled.bind(this);
    }
    private onMoved(e:IEvent){
        this.eBoardCanvas.discardActiveObject();
        const target:IObject = e.target as IObject;
        // _target 可能是group可能是单个对象
        const isGroup = "_objects" in target;
        const objects = isGroup?target["_objects"]:[target];
        if(void 0 !== target){
            // 可能只有一个对象
            let ids:string[]=[],objectsTransform:any={};
            objects.map((object:IObject)=>{
                ids.push(object.id);
                objectsTransform[object.id]={
                    flipX:object.flipX,
                    flipY:object.flipY,
                    angle:object.angle,
                    scaleX:object.scaleX,
                    scaleY:object.scaleY,
                    left:object.left,
                    top:object.top
                };
            });
            this.moving(ids,{
                objects:objectsTransform
            });
        }
    }
    private onRotated(e:IEvent){
        this.eBoardCanvas.discardActiveObject();
        const target:IObject = e.target as IObject;
        // _target 可能是group可能是单个对象
        const isGroup = "_objects" in target;
        const objects = isGroup?target["_objects"]:[target];
        if(void 0 !== target){
            // 可能只有一个对象
            let ids:string[]=[],objectsTransform:any={};
            objects.map((object:IObject)=>{
                ids.push(object.id);
                objectsTransform[object.id]={
                    flipX:object.flipX,
                    flipY:object.flipY,
                    angle:object.angle,
                    scaleX:object.scaleX,
                    scaleY:object.scaleY,
                    left:object.left,
                    top:object.top
                };
            });
            this.rotating(ids,{
                objects:objectsTransform
            });
        }
    }
    private onScaled(e:IEvent){
        this.eBoardCanvas.discardActiveObject();
        const target:IObject = e.target as IObject;
        // _target 可能是group可能是单个对象
        const isGroup = "_objects" in target;
        const objects = isGroup?target["_objects"]:[target];
        if(void 0 !== target){
            // 可能只有一个对象
            let ids:string[]=[],objectsTransform:any={};
            objects.map((object:IObject)=>{
                ids.push(object.id);
                objectsTransform[object.id]={
                    flipX:object.flipX,
                    flipY:object.flipY,
                    angle:object.angle,
                    scaleX:object.scaleX,
                    scaleY:object.scaleY,
                    left:object.left,
                    top:object.top
                };
            });
            this.scaling(ids,{
                objects:objectsTransform
            });
        }
    }
    private onSelection(event:IEvent){
        const target = event.target;
        if(void 0 !== target){
            target.on("scaled",this.onScaled);
            target.on("moved",this.onMoved);
            target.on("rotated",this.onRotated);
            const onTransformEnd = (e:IEvent)=>{
                target.off("scaled",this.onScaled);
                target.off("scaled",onTransformEnd);
                target.off("moved",onTransformEnd);
                target.off("moved",this.onMoved);
                target.off("rotated",onTransformEnd);
                target.off("rotated",this.onRotated);
            };
            target.on("moved",onTransformEnd);
            target.on("scaled",onTransformEnd);
            target.on("rotated",onTransformEnd)
        }
    }
    
    @message
    private moving(ids:string[],transform:any){
        return {
            tag:MessageTag.SelectionMove,
            ids:ids,
            transform
        }
    }
    
    @message
    private scaling(ids:string[],transform:any){
        return {
            tag:MessageTag.SelectionScale,
            ids:ids,
            transform
        }
    }
    @message
    private rotating(ids:string[],transform:any){
        return {
            tag:MessageTag.SelectionRotate,
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
    
    private pipPromise=new Promise((resolve)=>{resolve()});
    // @pipMode
    public onMessage(message:ISelectionMessage){
        // 初始化的group 都是默认属性，不会保留原有属性
        return this.pipPromise.then(()=>{
            return new Promise((resolve)=>{
                const {ids,transform} = message;
                const objectsTransform = transform.objects;
                if(void 0 === ids || ids.length===0){
                    resolve();
                }
                this.eBoardCanvas.renderOnAddRemove=false;
                // 移动旋转不需要考虑内部元素
                this.eBoardCanvas.getObjects().filter((obj:IObject)=>{
                    const index = ids.indexOf(obj.id);
                    if(index>-1){
                        // fix 仅一个元素时需要单独设置元素样式
                        if(objectsTransform){
                            const _transform=objectsTransform[obj.id];
                            obj.set({
                                ..._transform
                            }).setCoords();
                        }
                        return true;
                    }else{
                        return false;
                    }
                });
                this.eBoardCanvas.requestRenderAll();
                this.eBoardCanvas.renderOnAddRemove=true;
                resolve();
            })
        })
    }
}

export {Selection};