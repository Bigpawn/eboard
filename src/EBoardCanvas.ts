/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/10 10:48
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/10 10:48
 * @disc:EBoardCanvas extend fabric.Canvas
 * 改写，添加一层StaticCanvas 用于光标   后续支持配置，是否扩展光标层
 * 添加animate 进行效果优化
 */
import {fabric} from "fabric";
import {
    ICanvasDimensions, ICanvasDimensionsOptions,
    ICanvasOptions, IEvent,
} from '~fabric/fabric-impl';
import {CursorTypeEnum} from './cursor/Enum';
import {ICursorTypes} from './interface/ICursorTypes';
import {IMessage, MessageTagEnum} from './middlewares/MessageMiddleWare';
import {message} from './utils/decorators';
import {EventBus, IEDux} from './utils/EventBus';
import {IExtraMessage} from './interface/IFrame';


declare interface ICursorMessage extends IMessage{
    center?:{x:number;y:number};
    type:CursorTypeEnum;
    size:number;
}

declare interface ICanvasExtraOptions{
    eDux:IEDux;
    extraMessage:IExtraMessage
}


class EBoardCanvas extends fabric.Canvas{
    public cursorCanvas:fabric.StaticCanvas;
    private instance:fabric.Object;
    private cursorType:ICursorTypes;
    private cursorSize:number=20;
    private cursorTypeName:CursorTypeEnum;
    private cursorMessageEnable:boolean=false;
    public eDux:EventBus;
    public extraMessage:IExtraMessage;
    constructor(element: HTMLCanvasElement,options: ICanvasOptions,extraOptions:ICanvasExtraOptions){
        super(element,options);
        this.eDux=extraOptions.eDux;
        this.extraMessage=extraOptions.extraMessage;
        const cursorCanvasEl=document.createElement("canvas");
        cursorCanvasEl.className="eboard-cursor";
        element.parentElement&&element.parentElement.appendChild(cursorCanvasEl);
        this.cursorCanvas=new fabric.StaticCanvas(cursorCanvasEl,{
            selection:false,
            skipTargetFind:true,
        });
    }
    
    /**
     * 启用光标
     * @returns {this}
     */
    private activeCursor(){
        this.defaultCursor="none";// 更新样式进行优化
        this.onMouseMove=this.onMouseMove.bind(this);
        this.onMouseOut=this.onMouseOut.bind(this);
        this.on('mouse:move', this.onMouseMove);
        this.on('mouse:out', this.onMouseOut);
        return this;
    }
    
    /**
     * disable 光标
     * @returns {this}
     */
    private destroyCursor(){
        this.defaultCursor="default";
        this.off('mouse:move', this.onMouseMove);
        this.off('mouse:out', this.onMouseOut);
        if(void 0 !==this.instance){
            this.cursorCanvas.remove(this.instance);
        }
        return this;
    }
    private onMouseMove(event:IEvent){
        if(void 0 === this.cursorType){
            return;
        }
        const point = this.getPointer(event.e);
        this.cursorCanvas.renderOnAddRemove=false;
        if(void 0 !== this.instance){
            this.cursorCanvas.remove(this.instance);
        }
        this.instance = this.cursorType.render(point,this.cursorSize);
        this.instance.name=this.cursorTypeName; // 比较类型是否变化
        this.instance.type="cursor";// 设置type，扩展的Canvas可能会做其他操作
        this.cursorCanvas.add(this.instance);
        this.cursorCanvas.renderAll();
        this.cursorCanvas.renderOnAddRemove=true;
    
        if(this.cursorMessageEnable === true){
            this.cursorMessage(point);
        }
    }
    
    private onMouseOut(){
        if(void 0 !== this.instance){
            this.cursorCanvas.remove(this.instance);
            this.instance = undefined as any;
        }
        if(this.cursorMessageEnable === true){
            this.cursorMessage();
        }
    }
    
    @message
    private cursorMessage(center?:{x:number;y:number}){
        return {
            tag:MessageTagEnum.Cursor,
            size:this.cursorSize,
            type:this.cursorTypeName,
            center:center,
        }
    }
    private getCursorInstance(){
        return this.cursorCanvas.getObjects("cursor")[0];
    }
    
    /**
     * 修改光标大小
     * @param {number} size
     * @returns {this}
     */
    public setCursorSize(size:number){
        this.cursorSize = size;
        return this;
    }
    /**
     * 设置光标类型
     * @param {CursorTypeEnum} cursorType
     * @returns {this}
     */
    public setCursorType(cursorType:CursorTypeEnum){
        this.cursorTypeName=cursorType;
        if(void 0 !== cursorType){
            switch (cursorType){
                case CursorTypeEnum.None:
                    this.cursorType=undefined as any;
                    break;
                default:
                    this.cursorType=new (require(`./cursor/types/${cursorType}.ts`).default)(this.cursorCanvas);
                    break;
            }
        }
        if(void 0 !== this.cursorType){
            this.activeCursor();
        }else{
            this.destroyCursor();
        }
        return this;
    }
    public setCursorMessageEnable(enable:boolean){
        this.cursorMessageEnable = enable;
    }
    
    /**
     * @override
     * @param {ICanvasDimensions} dimensions
     * @param {ICanvasDimensionsOptions} options
     * @returns {this}
     */
    public setDimensions(dimensions: ICanvasDimensions, options?: ICanvasDimensionsOptions){
        super.setDimensions(dimensions,options);
        this.cursorCanvas.setDimensions(dimensions,options);
        return this;
    }
    
    public getLowerCanvas(){
        return this.getElement() as HTMLCanvasElement;
    }
    public getUpperCanvas(){
        return this.getElement().nextElementSibling as HTMLCanvasElement;
    }
    public getContainer(){
        return this.getElement().parentElement as HTMLDivElement;
    }
 
    public onMessage(message:ICursorMessage){
        const {size,type,center} = message;
        let instance = this.getCursorInstance();
        if(void 0 === center){
            // 结束
            instance && this.cursorCanvas.remove(instance);
        }else{
            this.cursorCanvas.renderOnAddRemove=false;
            instance && this.cursorCanvas.remove(instance);
            const cursorType=new (require(`./cursor/types/${type}.ts`).default)(this.cursorCanvas);
            instance = cursorType.render(center,size);
            instance.type="cursor";
            this.cursorCanvas.add(instance);
            this.cursorCanvas.renderAll();
            this.cursorCanvas.renderOnAddRemove=true;
        }
    }
}

export {EBoardCanvas};