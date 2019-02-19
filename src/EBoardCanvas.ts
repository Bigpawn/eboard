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
    ICanvasOptions,
} from '~fabric/fabric-impl';
import {ICursor} from './interface/ICursor';
import {authorityMaster, message} from './utils/decorators';
import {Plugins} from './plugins';
import {EBoardEngine} from './EBoardEngine';
import {ICursorMessage} from './interface/IMessage';
import {MessageTag} from './enums/MessageTag';
import {CursorType} from './enums/CursorType';
import {Context} from './static/Context';
import {EventBus} from './utils/EventBus';


class EBoardCanvas extends fabric.Canvas{
    // public cursorCanvas:fabric.StaticCanvas;
    private instance:fabric.Object;
    private cursorMessageEnable:boolean=false;
    private touching:boolean=false;// 是否触摸模式
    public enableRetinaScaling:boolean=false;
    // 光标类型
    private cursor:ICursor;
    private cursorType:CursorType;
    public context:Context;
    private readonly frameId:string;
    private readonly groupId?:string;
    public eventBus=new EventBus();
    constructor(element: HTMLCanvasElement,options: ICanvasOptions,eBoardEngine:EBoardEngine){
        super(element,options);
        this.enableRetinaScaling=false;// 不自动根据分辨率缩放  否则ios 会自动*3
        this.context=eBoardEngine.context;
        this.frameId=eBoardEngine.frameId;
        this.groupId=eBoardEngine.groupId;
        /*const cursorCanvasEl=document.createElement("canvas");
        cursorCanvasEl.className="eboard-cursor";
        element.parentElement&&element.parentElement.appendChild(cursorCanvasEl);*/
  /*      this.cursorCanvas=new fabric.StaticCanvas(cursorCanvasEl,{
            selection:false,
            skipTargetFind:true,
        });*/
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
            this.remove(this.instance);
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
        const plugins = this.context.store.plugins;
        // touching 模式下不显示
        const touching = event.type ==="touchmove";
        if(!plugins.has(Plugins.Ferule)&&this.touching){
            return;
        }
        const point = touching?this.getPointer(event.touches[0]):this.getPointer(event.e);
        this.renderOnAddRemove=false;
        if(void 0 !== this.instance){
            this.remove(this.instance);
        }
        this.instance = this.cursor.render(point,this.context.transform(this.context.getConfig("cursorSize")));
        this.instance.name=this.cursorType; // 比较类型是否变化
        this.instance.type="cursor";// 设置type，扩展的Canvas可能会做其他操作
        this.add(this.instance);
        this.renderAll();
        this.renderOnAddRemove=true;
        if(this.cursorMessageEnable === true){
            this.cursorMessage(point);
        }
    }
    
    private onMouseOut(){
        if(void 0 !== this.instance){
            this.remove(this.instance);
            this.instance = undefined as any;
        }
        if(this.cursorMessageEnable === true){
            this.cursorMessage();
        }
    }
    
    @message
    @authorityMaster
    private cursorMessage(center?:{x:number;y:number}){
        return {
            tag:MessageTag.Cursor,
            size:this.context.getConfig("cursorSize"),
            type:this.cursorType,
            center:center,
            frameId:this.frameId,
            groupId:this.groupId
        }
    }
    private getCursorInstance(){
        return this.getObjects("cursor")[0];
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
                    const courseClass = require(`./cursor/${cursorType}`);
                    this.cursor=new (courseClass.default||courseClass)(this);
                    break;
            }
        }
        if(void 0 !== this.cursor){
            this.activeCursor();
        }else if(cursorType === CursorType.SystemCross){
            // 系统级别Cross
            this.destroyCursor();
            this.defaultCursor="crosshair";// 更新样式进行优化
        }else{
            this.destroyCursor();
        }
        return this;
    }
    public setCursorMessageEnable(enable:boolean){
        this.cursorMessageEnable = enable;
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
            instance && this.remove(instance);
        }else{
            this.renderOnAddRemove=false;
            instance && this.remove(instance);
            const courseClass = require(`./cursor/${type}`);
            const cursorType=new (courseClass.default||courseClass)(this);
            instance = cursorType.render(center,size);
            instance.type="cursor";
            this.add(instance);
            this.renderAll();
            this.renderOnAddRemove=true;
        }
    }
}

export {EBoardCanvas};