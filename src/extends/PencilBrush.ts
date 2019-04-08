/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2019/1/31 14:52
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2019/1/31 14:52
 * @disc:PencilBrush
 */
import {fabric} from "fabric";
import {EBoardCanvas} from '../EBoardCanvas';
import {Pencil} from '../plugins';
import {autobind} from 'core-decorators';

class PencilBrush extends fabric.PencilBrush{
    private readonly mouseListener:any;
    private _points:any[];
    private pencil:Pencil;
    private canvas:any;
    constructor(canvas:EBoardCanvas,mouseListener:(type:"down"|"mode"|"up",points:any[])=>void,pencil:Pencil) {
        // @ts-ignore
        super(canvas);
        this.mouseListener=mouseListener;
        this.pencil=pencil;
    }
    public onMouseDown(pointer:any){
        // @ts-ignore
        this.color=this.pencil.stroke;
        // @ts-ignore
        this.width=this.pencil.pencilWidth;
        super["onMouseDown"](pointer);
        this.mouseListener("down",this._points);
        // 需要添加pointer fix 延迟
        document.addEventListener("pointermove",this.pointerEvent);
    }
    @autobind
    private pointerEvent(e:any){
        // !this.allowTouchScrolling && e.preventDefault && e.preventDefault();
        const pointer = this.canvas.getPointer(e);
        this._onMouseMove(new fabric.Point(pointer.x,pointer.y));
        // 执行一次
    }
    @autobind
    private _onMouseMove(pointer:fabric.Point){
        super["onMouseMove"](pointer);
        this.mouseListener("move",this._points);
    }
    public onMouseMove(pointer:any){
        super["onMouseMove"](pointer);
        this.mouseListener("move",this._points);
        document.removeEventListener("pointermove",this.pointerEvent);
    }
    public onMouseUp(){
        super["onMouseUp"]();
        this.mouseListener("up",this._points);
        document.removeEventListener("pointermove",this.pointerEvent);
    }
}

export {PencilBrush}