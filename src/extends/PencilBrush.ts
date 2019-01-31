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

class PencilBrush extends fabric.PencilBrush{
    private readonly mouseListener:any;
    private _points:any[];
    private pencil:Pencil;
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
    }
    public onMouseMove(pointer:any){
        super["onMouseMove"](pointer);
        this.mouseListener("move",this._points);
    }
    public onMouseUp(){
        super["onMouseUp"]();
        this.mouseListener("up",this._points);
    }
}

export {PencilBrush}