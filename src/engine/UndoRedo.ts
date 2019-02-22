/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2019/2/20 21:29
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2019/2/20 21:29
 * @disc:UndoRedoManagerEngine   delete需要改为hide，不执行严格删除,需要发送消息   消息发送
 */
import {EBoardCanvas} from '../EBoardCanvas';
import {IMessage} from '../interface/IMessage';
import {Bind} from 'lodash-decorators';
import {MessageTag} from '..';
import {IObject} from '../interface/IObject';
import {Text as FabricText} from '../extends/Text';
import {message} from '../utils/decorators';
import {Context} from '../static/Context';

declare interface IUndoRedoConfig {
    canvas:EBoardCanvas;
    frameId:string;
    groupId?:string;
    context:Context;
}
declare interface IAction extends IMessage{
    type:string;
    id:string;
}

class UndoRedo {
    private _canvas:EBoardCanvas;
    private undoStack:IAction[]=[];// add 时添加
    private redoStack:IAction[]=[];// undo时添加
    public frameId:string;
    public groupId?:string;
    public context:Context;
    constructor(config:IUndoRedoConfig) {
        this._canvas=config.canvas;
        this.frameId=config.frameId;
        this.groupId=config.groupId;
        this.context=config.context;
        // 监听操作action
        this._canvas.eventBus.on("object:added",this.onObjectAdd);
        this._canvas.eventBus.on("object:modified",this.onObjectModified);
    }
    @Bind
    private onObjectAdd(ev:any){
        const data = ev.data;
        this.undoStack.push(data);
        this.redoStack=[];
    }
    @Bind
    private onObjectModified(ev:any){
        const data = ev.data;
        this.undoStack.push(data);
        this.redoStack=[];
    }
    private undoAction(lastAction:any){
        const {tag,id} = lastAction;
        switch (tag) {
            case MessageTag.Shape:
                const {type,beforeText} = lastAction as any;
                const instance =  this._canvas.getObjects().find((obj:any)=>{
                    return obj.id === id;
                });
                if(instance){
                    if(type==="text"&&beforeText){
                        instance.visible=true;
                        (instance as FabricText).text=beforeText;
                        (instance as FabricText).exitEditing();
                        this._canvas.requestRenderAll();
                    }else{
                        // 隐藏，所有删除全部变成隐藏
                        instance.visible=false;
                        this._canvas.requestRenderAll();
                    }
                }
                break;
            case MessageTag.SelectionRotate:
            case MessageTag.SelectionScale:
            case MessageTag.SelectionMove:
                const {prevState,ids} = lastAction as any;
                this._canvas.getObjects().filter((obj:IObject)=>{
                    const index = ids.indexOf(obj.id);
                    if(index>-1){
                        if(prevState){
                            const _transform=prevState[obj.id];
                            obj.set({
                                ..._transform
                            }).setCoords();
                        }
                        return true;
                    }else{
                        return false;
                    }
                });
                this._canvas.requestRenderAll();
                break;
            case MessageTag.Clear:
                const {ids:idList} = lastAction as any;
                this._canvas.getObjects().map((object:any)=>{
                    if(idList.indexOf(object.id)>-1){
                        object.visible=true
                    }
                });
                this._canvas.requestRenderAll();
                break;
            default:
                break;
        }
    }
    private redoAction(firstAction:any){
        const {tag,id} = firstAction;
        switch (tag) {
            case MessageTag.Shape:
                const {type,text} = firstAction as any;
                const instance =  this._canvas.getObjects().find((obj:any)=>{
                    return obj.id === id;
                });
                if(instance){
                    if(type==="text"){
                        instance.visible=true;
                        (instance as FabricText).text=text;
                        (instance as FabricText).exitEditing();
                        this._canvas.requestRenderAll();
                    }else{
                        // 隐藏，所有删除全部变成隐藏
                        instance.visible=true;
                        this._canvas.requestRenderAll();
                    }
                }
                break;
            case MessageTag.SelectionRotate:
            case MessageTag.SelectionScale:
            case MessageTag.SelectionMove:
                const {transform,ids} = firstAction as any;
                this._canvas.getObjects().filter((obj:IObject)=>{
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
                this._canvas.requestRenderAll();
                break;
            case MessageTag.Clear:
                const {ids:idList} = firstAction as any;
                this._canvas.getObjects().map((object:any)=>{
                    if(idList.indexOf(object.id)>-1){
                        object.visible=false;
                    }
                });
                this._canvas.requestRenderAll();
                break;
            default:
                break;
        }
    }
    @message
    private sendMessage(type:string,data:any){
        return {
            type,
            data,
            tag:MessageTag.UndoRedo
        }
    }
    public undo(){
        const lastAction = this.undoStack.pop();
        if(lastAction){
            this.undoAction(lastAction);
            this.redoStack.unshift(lastAction);
            this.sendMessage("undo",lastAction);
        }
    }
    public redo(){
        const firstAction = this.redoStack.shift();
        if(firstAction){
            this.redoAction(firstAction);
            this.undoStack.push(firstAction);
            this.sendMessage("redo",firstAction);
        }
    }
    public onMessage(type:string,data:any){
        if(type==="undo"){
            this.undoAction(data);
        }else{
            this.redoAction(data);
        }
    }
}

export {UndoRedo};