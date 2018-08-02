/* * @Author: Bigpawn * @Date: 2018/7/12 10:45 * @Last Modified by: Bigpawn * @Last Modified time: 2018/7/12 10:45 * path 最后一个L改成Q ，然后拼接最后一个点生成的path * // 相同点只添加一次  大于两个点才能调用convertPointsToSVGPath */import {fabric} from "fabric";import {AbstractShapePlugin} from '../../AbstractShapePlugin';import {IEvent} from '~fabric/fabric-impl';import {Pencil as FabricPencil} from "../../../../extends/Pencil";import {    IMessage,    MessageTagEnum,} from '../../../../middlewares/MessageMiddleWare';import {message} from '../../../../utils/decorators';export declare interface IPencilMessage extends IMessage{    path:string;}class Pencil extends AbstractShapePlugin{    private color?:string='rgba(0,0,0,1)';    private lineWidth:number=1;    private brush = new fabric.PencilBrush();    private points:fabric.Point[]=[];    private path:string="";    public instance:FabricPencil;            private addPoint(point:fabric.Point,end?:boolean){        const length = this.points.length;        if(length === 0){            this.points.push(point);            this.calcPath(end);        }else{            const last = this.points[length-1];            if(last.x === point.x && last.y === point.y){                // 不添加            }else{                this.points.push(point);                this.calcPath(end);            }        }    }    private calcPath(end?:boolean){        const length = this.points.length;        if(length === 0||length===1){            this.path="";        }else {            if(length === 2){                this.path = this.brush.convertPointsToSVGPath(this.points).join("");            }else{                const last = this.points.slice(length-2);                const lastL = this.path.lastIndexOf("L");                const replace = this.path.substring(0,lastL);                const lastString = this.brush.convertPointsToSVGPath(last).join("");                const index = lastString.lastIndexOf("Q");                this.path = replace + lastString.substring(index);            }            this.updateInstance(end);        }    }        @message    private startAction(){        return {            id:this.instance.id,            tag:MessageTagEnum.Start,            path:this.path,            type:this.instance.type        }    }    @message    private moveAction(){        return {            id:this.instance.id,            tag:MessageTagEnum.Temporary,            path:this.path,            type:this.instance.type        }    }    @message    private endAction(){        return {            id:this.instance.id,            tag:MessageTagEnum.End,            path:this.path,            type:this.instance.type        }    }        private updateInstance(end?:boolean){        this.eBoardCanvas.renderOnAddRemove=false;        if(void 0 === this.instance){            this.instance=new FabricPencil(this.path,{                stroke: this.color,                strokeWidth:this.lineWidth,                fill:undefined            });            this.eBoardCanvas.add(this.instance);            this.startAction();        }else{            this.eBoardCanvas.remove(this.instance);            this.instance=new FabricPencil(this.path,{                stroke: this.color,                strokeWidth:this.lineWidth,                fill:undefined            }).setId(this.instance.id);            this.eBoardCanvas.add(this.instance);            end?this.endAction():this.moveAction();        }        this.eBoardCanvas.renderAll();        this.eBoardCanvas.renderOnAddRemove=true;    }        protected onMouseDown(event:IEvent){        super.onMouseDown(event);        this.brush.width=this.lineWidth;        this.addPoint(new fabric.Point(this.start.x,this.start.y));    }    protected onMouseMove(event:IEvent){        if(void 0 === this.start){            return;        }        super.onMouseMove(event);        this.addPoint(new fabric.Point(this.end.x,this.end.y));    }    protected onMouseUp(event:IEvent){        this.addPoint(new fabric.Point(this.end.x,this.end.y),true);        this.points=[];        this.path="";        super.onMouseUp(event);    }            public onMessage(message:IPencilMessage){        const {id,path} = message;        let instance = this.getInstanceById(id) as FabricPencil;        this.eBoardCanvas.renderOnAddRemove=false;            if(void 0 !== instance){            this.eBoardCanvas.remove(instance);        }        instance = new FabricPencil(path,{            stroke: this.color,            strokeWidth:this.lineWidth,            fill:undefined        }).setId(id);        this.eBoardCanvas.add(instance);        this.eBoardCanvas.requestRenderAll();        this.eBoardCanvas.renderOnAddRemove=true;    }}export {Pencil};