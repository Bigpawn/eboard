/* * @Author: Bigpawn * @Date: 2018/7/11 13:36 * @Last Modified by: Bigpawn * @Last Modified time: 2018/7/11 13:36 */import {fabric} from "fabric";import {AbsPlugin} from "../AbsPlugin";import {EBoardCanvas} from "../EBoardCanvas";import {EBoardEngine} from "../EBoardEngine";const {Color} = fabric;class Text extends AbsPlugin{    private color?:string;    private start?:{ x: number; y: number; };    private text?:any;    private fontSize?:number;    constructor(canvas:EBoardCanvas,eBoardEngine:EBoardEngine) {        super(canvas,eBoardEngine);        this.downHandler.bind(this);        this.upHandler.bind(this);    }    private downHandler=(o:any)=>{        this.start = this.eBoardCanvas.getPointer(o.e);        if(!this.text) {            this.text = new fabric.IText('',{                left:this.start.x,                top:this.start.y,                fontSize:this.fontSize,                editingBorderColor:this.color,                strokeWidth:50,            });        }else {        }        this.eBoardCanvas.add(this.text);        if(!this.text.text) {            this.text.left = this.start.x;            this.text.top = this.start.y;            this.text.enterEditing();        }        if(this.text&&!this.text.isEditing) {            this.text = null;        }        if(this.text) {            this.eBoardCanvas.setActiveObject(this.text);        }    };    private upHandler=(o:any)=>{    };    public setColor=(color?:string)=>{        const colorObj = new Color(color?color:'block');        this.color = colorObj.toRgba();        return this;    };    public setFontSize=(size?:number)=>{        this.fontSize = size?size:100;        return this;    };    public setEnable(enable:boolean){        if(this.enable===enable){            return;        }        this.enable = enable;        const activePlugin = this.eBoardEngine.getActivePlugin();        if(enable) {            if(activePlugin) {                activePlugin.setEnable(false);            }            this.eBoardEngine.setActivePlugin(this);            this.eBoardCanvas.defaultCursor = 'text';            this.eBoardCanvas.on('mouse:down',this.downHandler);            this.eBoardCanvas.on('mouse:up',this.upHandler);        }else {            if(activePlugin && activePlugin instanceof Text) {                this.eBoardEngine.setActivePlugin(undefined);            }            this.eBoardCanvas.off('mouse:down',this.downHandler);            this.eBoardCanvas.off('mouse:up',this.upHandler);        }        return this;    }}export {Text};