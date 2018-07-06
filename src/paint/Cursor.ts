/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/5 17:15
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/5 17:15
 * @disc:画笔类光标
 * *********************************@changelist:*********************************
 * 新增开启关闭控制，创建对象修改为不启用
 */
import {AbsCursor} from './AbsCursor';
import {CursorType, CursorTypeName} from './CursorType';
import {fabric} from "fabric";
import {IEvent} from '~fabric/fabric-impl';
import {RemUntil} from '../utils/RemUntil';

class Cursor extends AbsCursor{
    private typeName:CursorTypeName;
    private canvas:fabric.Canvas;
    private container:HTMLDivElement;
    private enable:boolean=false;
    constructor(canvas:fabric.Canvas,typeName?: CursorTypeName){
        super();
        this.canvas=canvas;
        this.container=canvas.getElement().parentElement as HTMLDivElement;
        typeName&&this.setType(typeName);
        this.cursorMoveListener = this.cursorMoveListener.bind(this);
        this.cursorLeaveListener = this.cursorLeaveListener.bind(this);
    };
    private static createSvgElement(svgObject:any){
        return `<svg version="1.2" viewBox="${svgObject.viewBox}" xmlns="http://www.w3.org/2000/svg"><use xlink:href="#${svgObject.id}"></use></svg>`;
    }
    private setCursorElement(){
        this.canvas.defaultCursor="none";
        void 0 !==this.cursorEl&&(this.cursorEl.parentElement as HTMLElement).removeChild(this.cursorEl);
        this.cursorEl=document.createElement("div");
        this.cursorEl.className="eboard-cursor";
        this.cursorEl.style.width=this.width;
        this.cursorEl.style.height=this.height;
        this.cursorEl.style.display="none";
        this.cursorEl.style.transition="all 1ms ease";
        const cursorType= CursorType[this.typeName];
        const {x,y} = cursorType.startPoint;
        const widthSizeObject = RemUntil.getSizeObject(this.width);
        const heightSizeObject = RemUntil.getSizeObject(this.height);
        const offsetWidth = widthSizeObject.number * x / 100 + widthSizeObject.unit; //单位不同，需要计算
        const offsetHeight = heightSizeObject.number * y / 100 + heightSizeObject.unit; //单位不同，需要计算
        this.cursorEl.style.transform=`translate(-${offsetWidth},-${offsetHeight})`;
        const svgObject = cursorType.svg["default"];
        this.cursorEl.innerHTML=Cursor.createSvgElement(svgObject);
        this.container.appendChild(this.cursorEl);
    }
    private cursorLeaveListener(){
        this.cursorEl.style.display="none";
    }
    private cursorMoveListener(options:IEvent){
        const event = options.e as MouseEvent;
        const canvasOffset:any = this.canvas.calcOffset();
        const {left,top} = canvasOffset._offset;
        const offsetX = event.pageX - left;
        const offsetY = event.pageY - top;
        
        this.cursorEl.style.display="block";
        this.cursorEl.style.left=offsetX+"px";
        this.cursorEl.style.top=offsetY+"px";
        //消息发送传递{offsetX,offsetY,canvasOffset.width,canvasOffset.height};
    }
    public setSize(width:string,height:string){
        super.setSize(width,height);
        this.setCursorElement();
        return this;
    }
    public setType(typeName:CursorTypeName){
        this.typeName=typeName;
        this.setCursorElement();
        return this;
    };
    public getName(){
        return this.typeName;
    }
    public getType(){
        return CursorType[this.typeName];
    }
    
    /**
     * 设置cursor位置
     * @param {number} offsetX
     * @param {number} offsetY
     * @param {number} canvasWidth
     * @param {number} canvasHeight
     */
    public moveTo(offsetX:number,offsetY:number,canvasWidth:number,canvasHeight:number){
        const canvasOffset:any = this.canvas.calcOffset();
        const {width,height} = canvasOffset;
        this.cursorEl.style.display="block";
        this.cursorEl.style.left=offsetX * width / canvasWidth+"px";
        this.cursorEl.style.top=offsetY * height / canvasHeight+"px";
        return this;
    }
    public setEnable(enable:boolean){
        if(this.enable===enable){
            return;
        }
        this.enable=enable;
        if(enable){
            this.canvas.defaultCursor="none";
            this.canvas.on('mouse:move', this.cursorMoveListener);
            this.canvas.on('mouse:out', this.cursorLeaveListener);
        }else{
            this.canvas.defaultCursor="default";
            this.canvas.off('mouse:move', this.cursorMoveListener);
            this.canvas.off('mouse:out', this.cursorLeaveListener);
            this.cursorEl&&(this.cursorEl.style.display="none");
        }
        return this;
    }
}



export {Cursor};