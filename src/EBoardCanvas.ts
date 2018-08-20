/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/10 10:48
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/10 10:48
 * @disc:EBoardCanvas extend fabric.Canvas
 * 改写，添加一层StaticCanvas 用于光标   后续支持配置，是否扩展光标层
 * 添加animate 进行效果优化
 * 触摸屏触摸操作屏蔽cursor
 */
import {fabric} from "fabric";
import {
    ICanvasDimensions, ICanvasDimensionsOptions,
    ICanvasOptions,
} from '~fabric/fabric-impl';
import {CursorTypeEnum} from './cursor/Enum';
import {ICursorTypes} from './interface/ICursorTypes';
import {IMessage, MessageTagEnum} from './middlewares/MessageMiddleWare';
import {message} from './utils/decorators';
import {EDux, IEDux} from './utils/EDux';
import {IExtraMessage} from './interface/IFrame';
import {Plugins} from './plugins';


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
    private cursorSize:number=26;
    private cursorTypeName:CursorTypeEnum;
    private cursorMessageEnable:boolean=false;
    public eDux:EDux;
    public extraMessage:IExtraMessage;
    private cssWidth:number=1;
    private pxWidth:number=1;
    private touching:boolean=false;// 是否触摸模式
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
        this.fixTouchDevice();
        this.onMouseMove=this.onMouseMove.bind(this);
        this.onMouseOut=this.onMouseOut.bind(this);
    }
    
    /**
     * 触摸操作时屏蔽cursor
     */
    private fixTouchDevice(){
        window.addEventListener("touchstart",()=>{
            this.touching=true;
            this.onMouseOut();
        });
        window.addEventListener("touchend",()=>{
            this.touching=false;
            this.onMouseOut();
        });
        window.addEventListener("touchcancel",()=>{
            this.touching=false;
            this.onMouseOut();
        });
    }
    
    
    public getSize(width:number){
        return width * this.pxWidth / this.cssWidth;
    }
    
    /**
     * 启用光标
     * @returns {this}
     * 触摸屏兼容教鞭
     */
    private activeCursor(){
        this.defaultCursor="none";// 更新样式进行优化
        this.on('mouse:move', this.onMouseMove);
        this.on('mouse:out', this.onMouseOut);
        // 触摸兼容
        const container = this.getContainer();
        container.addEventListener("touchmove",this.onMouseMove);
        container.addEventListener("touchend",this.onMouseOut);
        container.addEventListener("touchcancel",this.onMouseOut);
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
        const container = this.getContainer();
        container.removeEventListener("touchmove",this.onMouseMove);
        container.removeEventListener("touchend",this.onMouseOut);
        container.removeEventListener("touchcancel",this.onMouseOut);
        if(void 0 !==this.instance){
            this.cursorCanvas.remove(this.instance);
        }
        return this;
    }
    
    /**
     * 触摸模式下正常光标不显示，教鞭模式显示
     * @param event
     */
    private onMouseMove(event:any){
        if(void 0 === this.cursorType){
            return;
        }
        const plugins = this.eDux.sharedData.plugins;
        // touching 模式下不显示
        const touching = event.type ==="touchmove";
        if(!plugins.has(Plugins.Ferule)&&this.touching){
            return;
        }
        const point = touching?this.getPointer(event.touches[0]):this.getPointer(event.e);
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
                case CursorTypeEnum.SystemCross:
                    this.cursorType=CursorTypeEnum.SystemCross as any;
                    break;
                default:
                    this.cursorType=new (require(`./cursor/types/${cursorType}.ts`).default)(this);
                    break;
            }
        }
        if(void 0 !== this.cursorType){
            if(CursorTypeEnum.SystemCross as any === this.cursorType){
                this.defaultCursor="crosshair";// 更新样式进行优化
            }else{
                this.activeCursor();
            }
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
        // 做缓存
        if(options&&options.backstoreOnly){
            this.pxWidth = dimensions.width;
        }else{
            this.cssWidth = dimensions.width;
        }
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
            const cursorType=new (require(`./cursor/types/${type}.ts`).default)(this);
            instance = cursorType.render(center,size);
            instance.type="cursor";
            this.cursorCanvas.add(instance);
            this.cursorCanvas.renderAll();
            this.cursorCanvas.renderOnAddRemove=true;
        }
    }
}

export {EBoardCanvas};