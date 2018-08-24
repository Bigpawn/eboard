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
import {ICursor} from './interface/ICursor';
import {message} from './utils/decorators';
import {EDux} from './utils/EDux';
import {IExtraMessage} from './interface/IFrame';
import {Plugins} from './plugins';
import {EBoardEngine} from './EBoardEngine';
import {ICursorMessage} from './interface/IMessage';
import {MessageTag} from './enums/MessageTag';
import {CursorType} from './enums/CursorType';



class EBoardCanvas extends fabric.Canvas{
    public cursorCanvas:fabric.StaticCanvas;
    private instance:fabric.Object;
    private cursorMessageEnable:boolean=false;
    public eDux:EDux;
    public extraMessage:IExtraMessage;
    private touching:boolean=false;// 是否触摸模式
    
    // 光标类型
    private cursor:ICursor;
    private cursorType:CursorType;
    
    constructor(element: HTMLCanvasElement,options: ICanvasOptions,eBoardEngine:EBoardEngine){
        super(element,options);
        this.eDux=eBoardEngine.eDux;
        this.extraMessage=eBoardEngine.extraMessage;
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
        if(void 0 === this.cursor){
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
        this.instance = this.cursor.render(point,this.eDux.transform(this.eDux.config.cursorSize));
        this.instance.name=this.cursorType; // 比较类型是否变化
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
            tag:MessageTag.Cursor,
            size:this.eDux.config.cursorSize,
            type:this.cursorType,
            center:center,
        }
    }
    private getCursorInstance(){
        return this.cursorCanvas.getObjects("cursor")[0];
    }
    
    /**
     * 设置光标类型
     * @param {CursorType} cursorType
     * @returns {this}
     */
    public setCursorType(cursorType:CursorType){
        this.cursorType=cursorType;
        if(void 0 !== cursorType){
            switch (cursorType){
                case CursorType.None:
                case CursorType.SystemCross:// 系统级别光标
                    this.cursor=undefined as any;
                    break;
                default:
                    this.cursor=new (require(`./cursor/types/${cursorType}.ts`).default)(this);
                    break;
            }
        }
        if(void 0 !== this.cursor){
            this.activeCursor();
        }else if(cursorType === CursorType.SystemCross){
            // 系统级别Cross
            this.defaultCursor="crosshair";// 更新样式进行优化
            this.destroyCursor();
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