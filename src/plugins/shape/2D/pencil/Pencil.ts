/* * @Author: Bigpawn * @Date: 2018/7/12 10:45 * @Last Modified by: Bigpawn * @Last Modified time: 2018/7/12 10:45 * path 最后一个L改成Q ，然后拼接最后一个点生成的path * // 相同点只添加一次  大于两个点才能调用convertPointsToSVGPath */import {fabric} from "fabric";import {AbstractShapePlugin} from '../../AbstractShapePlugin';import {Pencil as FabricPencil} from "../../../../extends/Pencil";import {    authorityAssist,    message,    setCursor,} from '../../../../utils/decorators';import {IPencilMessage} from '../../../../interface/IMessage';import {Authority, MessageTag} from '../../../..';import {CursorType} from '../../../../enums/CursorType';import {PencilBrush} from '../../../../extends/PencilBrush';import {IDGenerator} from '../../../../utils/IDGenerator';import {EBoardEngine} from '../../../../EBoardEngine';@setCursor(CursorType.SystemCross)class Pencil extends AbstractShapePlugin{    private points:fabric.Point[]=[];    private path:string="";    private instanceId:string;    private readonly pencilBrush:PencilBrush;    constructor(eBoardEngine:EBoardEngine){        super(eBoardEngine);        this.onMouseEvent=this.onMouseEvent.bind(this);        this.onPathCreated=this.onPathCreated.bind(this);        this.pencilBrush=new PencilBrush(this.eBoardCanvas,this.onMouseEvent,this);    }    private onMouseEvent(type:string,points:any[]){        this.points=points;        this.calcPath();        switch (type) {            case "down":                this.instanceId=IDGenerator.getId();                break;            case "move":                break;            case "up":                break;            default:                break;        }        this.throwMessage();    }    private onPathCreated(e:any){        if(e.path){            e.path.id=this.instanceId;        }    }    protected get stroke(){        return this._stroke||this.context.pencilColor||this.context.config.stroke;    }    private calcPath(){        const length = this.points.length;        if(length === 0){            this.path="";        }else if(length===1){            const start = this.points[0];            this.path = `M ${start.x} ${start.y} L ${start.x} ${start.y+0.001}`;        }else {            this.path=this.convertPointsToSVGPath().join('');        }    }    @message    private throwMessage(){        return this.instanceId?{            id:this.instanceId,            tag:MessageTag.Shape,            path:this.path,            type:"pencil",            stroke:this.stroke,            strokeWidth:this.pencilWidth,            strokeDashArray:this.strokeDashArray        }:undefined;    }    private convertPointsToSVGPath() {        const points = this.points;        let path = [], i, width = this.pencilWidth / 1000,            p1 = new fabric.Point(points[0].x, points[0].y),            p2 = new fabric.Point(points[1].x, points[1].y),            len = points.length, multSignX = 1, multSignY = 1, manyPoints = len > 2;                if (manyPoints) {            multSignX = points[2].x < p2.x ? -1 : points[2].x === p2.x ? 0 : 1;            multSignY = points[2].y < p2.y ? -1 : points[2].y === p2.y ? 0 : 1;        }        path.push('M ', p1.x - multSignX * width, ' ', p1.y - multSignY * width, ' ');        for (i = 1; i < len; i++) {            if (!p1.eq(p2)) {                let midPoint = p1.midPointFrom(p2);                // p1 is our bezier control point                // midpoint is our endpoint                // start point is p(i-1) value.                path.push('Q ', p1.x, ' ', p1.y, ' ', midPoint.x, ' ', midPoint.y, ' ');            }            p1 = points[i];            if ((i + 1) < points.length) {                p2 = points[i + 1];            }        }        if (manyPoints) {            multSignX = p1.x > points[i - 2].x ? 1 : p1.x === points[i - 2].x ? 0 : -1;            multSignY = p1.y > points[i - 2].y ? 1 : p1.y === points[i - 2].y ? 0 : -1;        }        path.push('L ', p1.x + multSignX * width, ' ', p1.y + multSignY * width);        return path;    }    // @ts-ignore    protected onMouseDown=undefined;    // @ts-ignore    protected onMouseMove=undefined;    // @ts-ignore    protected onMouseUp=undefined;    @authorityAssist    public setEnable(enable:boolean){        if(!enable){            this.eBoardCanvas.isDrawingMode=false;            this.eBoardCanvas.off("path:created",this.onPathCreated);        }else{            this.eBoardCanvas.isDrawingMode=true;            this.eBoardCanvas.freeDrawingBrush = this.pencilBrush;            // this.eBoardCanvas.freeDrawingBrush.color = this.stroke;            // this.eBoardCanvas.freeDrawingBrush.width = this.pencilWidth;            this.eBoardCanvas.on("path:created",this.onPathCreated);        }        super.setEnable(enable);        return this;    }    public onMessage(message:IPencilMessage){        const {id,path,stroke,strokeDashArray,strokeWidth} = message;        let instance = this.getInstanceById(id) as FabricPencil;        this.eBoardCanvas.renderOnAddRemove=false;            if(void 0 !== instance){            this.eBoardCanvas.remove(instance);        }        instance = new FabricPencil(path,{            stroke: stroke,            fill:undefined,            strokeWidth,            ...strokeDashArray?{strokeDashArray}:{},        },this.eBoardCanvas).setId(id);        this.eBoardCanvas.add(instance);        this.eBoardCanvas.requestRenderAll();        this.eBoardCanvas.renderOnAddRemove=true;    }}export {Pencil};