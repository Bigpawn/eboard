/* * @Author: Bigpawn * @Date: 2018/7/12 10:45 * @Last Modified by: Bigpawn * @Last Modified time: 2018/7/12 10:45 */import {fabric} from "fabric";import {AbsractPlugin} from "../../../AbsractPlugin";import {EBoardCanvas} from "../../../../EBoardCanvas";import {EBoardEngine} from "../../../../EBoardEngine";class Pencil extends AbsractPlugin{    private polyLine:any;    private start?:any;    private color?:string='block';    private width?:number=10;    constructor(canvas:EBoardCanvas,eBoardEngine:EBoardEngine) {        super(canvas,eBoardEngine);        this.downHandler.bind(this);        this.moveHandler.bind(this);        this.upHandler.bind(this);    }    private downHandler=(o:any)=>{        this.start = this.eBoardCanvas.getPointer(o.e);        this.polyLine = new fabric.PencilBrush();        this.polyLine.color=this.color;        this.polyLine.width=this.width;        this.polyLine.initialize(this.eBoardCanvas);        this.polyLine.onMouseDown(this.start);        this.eBoardCanvas.on('mouse:move',this.moveHandler);    };    private moveHandler=(o:any)=>{        const movePoint = this.eBoardCanvas.getPointer(o.e);        if(this.polyLine){            this.polyLine.onMouseMove(movePoint);        }    };    private upHandler=(o:any)=>{        this.polyLine._finalizeAndAddPath();        this.polyLine.initialize(undefined);        this.eBoardCanvas.off('mouse:move',this.moveHandler);    };    public setColor=(color:string)=>{        this.color = color;        return this;    };    public setWidth=(width:number)=>{        this.width = width;        return this;    };    public setEnable(enable:boolean) {        if(this.enable===enable) {            return ;        }        this.enable = enable;        const activePlugin = this.eBoardEngine.getActivePlugin();        if(enable) {            if(activePlugin) {                activePlugin.setEnable(false);            }            this.eBoardEngine.setActivePlugin(this);            this.eBoardCanvas.on('mouse:down',this.downHandler);            // this.eBoardCanvas.on('mouse:move',this.moveHandler);            this.eBoardCanvas.on('mouse:up',this.upHandler);        }else {            if(activePlugin && activePlugin instanceof Pencil) {                this.eBoardEngine.setActivePlugin(undefined);            }            this.eBoardCanvas.off('mouse:down',this.downHandler);            // this.eBoardCanvas.off('mouse:move',this.moveHandler);            this.eBoardCanvas.off('mouse:up',this.upHandler);        }        return this;    }}export {Pencil};