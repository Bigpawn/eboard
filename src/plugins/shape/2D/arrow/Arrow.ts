/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/25 10:51
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/7/25 10:51
 * @disc:箭头
 */
import {
    authorityAssist,
    message,
    setCursor,
} from '../../../../utils/decorators';
import {IEvent} from '~fabric/fabric-impl';
import {AbstractShapePlugin} from '../../AbstractShapePlugin';
import DefaultFactory from './factory/default';
import {Arrow as FabricArrow} from '../../../../extends/Arrow';
import {IArrowMessage} from '../../../../interface/IMessage';
import {MessageTag} from '../../../../enums/MessageTag';
import {EBoardEngine} from '../../../../EBoardEngine';
import {ArrowMode} from '../../../../enums/ArrowMode';
import {CursorType} from '../../../../enums/CursorType';

@setCursor(CursorType.SystemCross)
class Arrow extends AbstractShapePlugin{
    public readonly type:string="arrow";
    protected instance:FabricArrow;
    private readonly arrowShape:"default"|"fish"|"hollow";
    protected arrowMode:ArrowMode=ArrowMode.ALL;
    constructor(eBoardEngine:EBoardEngine){
        super(eBoardEngine);
        this.arrowShape=this.context.config.arrowShape;
    }
    private calcOptions(start:{x:number;y:number},end:{x:number;y:number},mode:ArrowMode){
        // fix production
        const arrowClass = require(`./factory/${this.arrowShape}`);
        const arrowFactory = (arrowClass.default||arrowClass) as typeof DefaultFactory;
        const headlen = Math.max(this.strokeWidth * 2 +10,10);
        const {path,fill} = arrowFactory.calcPath(start,end,30,headlen,mode,this.fill);
        return {path,fill};
    }
    @message
    private throw(){
        return this.instance?{
            id:this.instance.id,
            tag:MessageTag.Shape,
            left:(this.start.x+this.end.x)/2,
            top:(this.start.x+this.end.x)/2,
            type:this.type,
            fill:this.instance.fill,
            stroke:this.instance.stroke,
            strokeWidth:this.instance.strokeWidth,
            strokeDashArray:this.instance.strokeDashArray,
            path:this.instance.path
        }:undefined;
    }
    @authorityAssist
    protected onMouseMove(event:IEvent){
        if(void 0 === this.start){
            return;
        }
        super.onMouseMove(event);
        const {path} = this.calcOptions(this.start,this.end,this.arrowMode);
        const center = {
            x:(this.start.x+this.end.x)/2,
            y:(this.start.y+this.end.y)/2,
        };
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 !== this.instance){
            this.eBoardCanvas.remove(this.instance);
        }
        const id = this.instance?this.instance.id:undefined;
        this.instance=new FabricArrow(path,{
            stroke: this.stroke,
            strokeWidth:this.strokeWidth,
            top:center.y,
            left:center.x,
            fill:this.stroke,
            originX:"center",
            originY:"center",
            strokeDashArray:this.strokeDashArray,
        },this.eBoardCanvas);
        if(void 0 !== id){
            this.instance.setId(id);
        }
        this.throw();
        this.eBoardCanvas.add(this.instance);
        this.eBoardCanvas.renderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
    @authorityAssist
    protected onMouseUp(event:IEvent){
        const data = this.throw();
        super.onMouseUp(event);
        // save state
        this.eBoardCanvas.eventBus.trigger("object:added",data);
    }
    
    /**
     * 消息处理
     * @param {IArrowMessage} message
     */
    public onMessage(message:IArrowMessage){
        const {id,left,top,path,stroke,fill,strokeDashArray,strokeWidth} = message;
        let instance = this.getInstanceById(id) as FabricArrow;
        this.eBoardCanvas.renderOnAddRemove=false;
        if(void 0 !== instance){
            this.eBoardCanvas.remove(instance);
        }
        instance = new FabricArrow(path,{
            stroke,
            strokeWidth,
            fill,
            originX:"center",
            originY:"center",
            top,
            left,
            ...strokeDashArray?{strokeDashArray}:{},
        },this.eBoardCanvas).setId(id);
        this.eBoardCanvas.add(instance);
        this.eBoardCanvas.requestRenderAll();
        this.eBoardCanvas.renderOnAddRemove=true;
    }
    
}

export {Arrow};