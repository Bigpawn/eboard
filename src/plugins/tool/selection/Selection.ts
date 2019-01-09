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
import {ActiveSelection, IEvent} from '~fabric/fabric-impl';
import {IObject} from '../../../interface/IObject';
import {authorityAssist, message} from '../../../utils/decorators';
import {EBoardEngine} from '../../../EBoardEngine';
import {ISelectionMessage} from '../../../interface/IMessage';
import {MessageTag} from '../../../enums/MessageTag';
import {Clipboard} from '../clipboard/Clipboard';
import {IDGenerator} from '../../../utils/IDGenerator';

class Selection extends AbstractPlugin{
    private clipBoard = new Clipboard();
    private _position?:{x:number;y:number};
    private containsProperties=["borderColor","cornerColor","cornerStrokeColor","cornerStyle","transparentCorners","cornerSize","borderScaleFactor","selectable","id","sourceId"];
    constructor(eBoardEngine:EBoardEngine){
        super(eBoardEngine);
        this.onSelection = this.onSelection.bind(this);
        this.onCopy=this.onCopy.bind(this);
        this.onPaste=this.onPaste.bind(this);
        this.onTransform=this.onTransform.bind(this);
        this.onMouseMove=this.onMouseMove.bind(this);
        this.onMouseOut=this.onMouseOut.bind(this);
        this.onCut=this.onCut.bind(this);
        this.onKeyDown=this.onKeyDown.bind(this);
    }
    private onTransform(e:IEvent){
        this.eBoardCanvas.discardActiveObject();
        const target:IObject|ActiveSelection = e.target as IObject|ActiveSelection;
        const objects = target.type==="activeSelection"?(target as ActiveSelection).getObjects():[target];
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
            const action = e["transform"].action;
            switch (action){
                case "drag":
                    this.transform(ids,objectsTransform,MessageTag.SelectionMove);
                    break;
                case "rotate":
                    this.transform(ids,objectsTransform,MessageTag.SelectionRotate);
                    break;
                case "scale":
                    this.transform(ids,objectsTransform,MessageTag.SelectionScale);
                    break;
                default:
                    break;
            }
        }
    }
    protected onMouseMove(event:IEvent){
        const point = this.eBoardCanvas.getPointer(event.e);
        this._position = {
            x:Math.round(point.x),
            y:Math.round(point.y)
        };
    }
    protected onMouseOut(){
        this._position=undefined;
    }
    private onCopy(){
        const activeObject = this.eBoardCanvas.getActiveObject();
        if(void 0 !== activeObject){
            activeObject.clone((cloned:any)=>{
                this.clipBoard.setClipboardObject(cloned);
            },this.containsProperties);
            this.eBoardCanvas.discardActiveObject();
        }
    }
    private onCut(){
        const activeObject = this.eBoardCanvas.getActiveObject();
        if(void 0 !== activeObject){
            activeObject.clone((cloned:any)=>{
                this.clipBoard.setClipboardObject(cloned);
            },this.containsProperties);
            let ids:string[]=[];
            // ids;
            if(activeObject.type==="activeSelection"){
                const objects = (activeObject as ActiveSelection).getObjects();
                objects.map((obj:IObject)=>{
                    obj.visible=false;
                    ids.push(obj.id);
                });
            }else{
                activeObject.visible=false;
                ids.push((activeObject as IObject).id);
            }
            this.cut(ids);
            this.eBoardCanvas.discardActiveObject();
            this.eBoardCanvas.requestRenderAll();
        }
    }
    private onPaste(){
        const copy = this.clipBoard.getClipboardObject();
        if(void 0 !== copy){
            copy.clone((clonedObj:any)=>{
                this.eBoardCanvas.renderOnAddRemove=false;
                this.eBoardCanvas.discardActiveObject();
                if(this._position){
                    clonedObj.set({
                        left: this._position.x,
                        top: this._position.y,
                    });
                }else{
                    clonedObj.set({
                        left: clonedObj.left + 10,
                        top: clonedObj.top + 10,
                    });
                }
                if (clonedObj.type === 'activeSelection') {
                    clonedObj.setCoords();
                    clonedObj.destroy();
                    let objects:any[]=[];
                    clonedObj.forEachObject((obj:IObject)=>{
                        obj.sourceId = obj.id;
                        obj.id=IDGenerator.getId();
                        this.eBoardCanvas.add(obj);
                        objects.push(obj.toJSON(this.containsProperties));
                    });
                    this.paste(objects);
                } else {
                    clonedObj.sourceId = clonedObj.id;
                    clonedObj.id=IDGenerator.getId();
                    this.eBoardCanvas.add(clonedObj);
                    this.paste([clonedObj.toJSON(this.containsProperties)]);
                }
                this.eBoardCanvas.requestRenderAll();
                this.eBoardCanvas.renderOnAddRemove=true;
            },this.containsProperties);
        }
    }
    
    private onSelection(event:IEvent){
        const target = event.target;
        if(void 0 !== target){
            const onTransformEnd = (e:IEvent)=>{
                target.off("scaled",this.onTransform);
                target.off("scaled",onTransformEnd);
                target.off("moved",onTransformEnd);
                target.off("moved",this.onTransform);
                target.off("rotated",onTransformEnd);
                target.off("rotated",this.onTransform);
            };
            target.on("scaled",this.onTransform);
            target.on("moved",this.onTransform);
            target.on("rotated",this.onTransform);
            target.on("moved",onTransformEnd);
            target.on("scaled",onTransformEnd);
            target.on("rotated",onTransformEnd);
        }
    }
    @message
    @authorityAssist
    private transform(ids:string[],transform:any,tag:MessageTag){
        return {
            tag,
            ids,
            transform
        }
    }
    
    @message
    @authorityAssist
    private paste(objects:IObject[]){
        return {
            tag:MessageTag.Paste,
            objects:objects
        }
    }
    
    @message
    @authorityAssist
    private cut(ids:string[]){
        return {
            tag:MessageTag.Cut,
            ids
        }
    }
    
    private onKeyDown(e:KeyboardEvent){
        const {ctrlKey,keyCode} = e;
        if(!ctrlKey) return;
        switch (keyCode){
            case 67:
                this.onCopy();
                break;
            case 88:
                this.onCut();
                break;
            case 86:
                this.onPaste();
                break;
            default:
                break;
        }
    }
    
    public setEnable(enable:boolean,background?:boolean){
        super.setEnable(enable,background);
        if(enable){
            this.eBoardCanvas.selection=true;
            this.eBoardCanvas.skipTargetFind=false;
            this.eBoardCanvas.on("selection:created",this.onSelection);
            window.addEventListener("keydown",this.onKeyDown);
            this.eBoardCanvas.on('mouse:move', this.onMouseMove);
            this.eBoardCanvas.on('mouse:out', this.onMouseOut);
        }else{
            this.eBoardCanvas.selection=false;
            this.eBoardCanvas.skipTargetFind=true;
            this.eBoardCanvas.off("selection:created",this.onSelection);
            window.removeEventListener("keydown",this.onKeyDown);
            this.eBoardCanvas.off('mouse:move', this.onMouseMove);
            this.eBoardCanvas.off('mouse:out', this.onMouseOut);
        }
        return this;
    }
    
    private pipPromise=new Promise((resolve)=>{resolve()});
    // @pipMode
    public onMessage(message:ISelectionMessage){
        // 初始化的group 都是默认属性，不会保留原有属性
        return this.pipPromise.then(()=>{
            return new Promise((resolve)=>{
                const {ids,transform,tag,objects} = message;
                switch (tag){
                    case MessageTag.Paste:
                        if(void 0 === objects||objects.length===0){
                            resolve();
                            return;
                        }
                        const allObjects = this.eBoardCanvas.getObjects();
                        const objectsIds=objects.map(obj=>obj.sourceId);
                        allObjects.map((object:IObject)=>{
                            const id = object.id;
                            const index = objectsIds.indexOf(id);
                            if(index>-1){
                                const {sourceId,...props} = objects[index];
                                object.clone((cloned)=>{
                                    cloned.set(props).setCoords();
                                    this.eBoardCanvas.add(cloned);
                                },this.containsProperties);
                            }
                        });
                        resolve();
                        break;
                    case MessageTag.Cut:
                        if(void 0 === ids || ids.length===0){
                            resolve();
                            return;
                        }
                        this.eBoardCanvas.renderOnAddRemove=false;
                        this.eBoardCanvas.getObjects().filter((obj:IObject)=>{
                            const index = ids.indexOf(obj.id);
                            if(index>-1){
                                obj.visible=false;
                                return true;
                            }else{
                                return false;
                            }
                        });
                        this.eBoardCanvas.requestRenderAll();
                        this.eBoardCanvas.renderOnAddRemove=true;
                        resolve();
                        break;
                    default:
                        if(void 0 === ids || ids.length===0){
                            resolve();
                            return;
                        }
                        this.eBoardCanvas.renderOnAddRemove=false;
                        this.eBoardCanvas.getObjects().filter((obj:IObject)=>{
                            const index = ids.indexOf(obj.id);
                            if(index>-1){
                                if(transform){
                                    const _transform=transform[obj.id];
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
                        break;
                }
            })
        })
    }
}

export {Selection};