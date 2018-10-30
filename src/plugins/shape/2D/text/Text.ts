/* * @Author: Bigpawn * @Date: 2018/7/11 13:36 * @Last Modified by: Bigpawn * @Last Modified time: 2018/7/11 13:36 */import {AbstractShapePlugin} from '../../AbstractShapePlugin';import {IEvent} from '~fabric/fabric-impl';import {Text as FabricText} from "../../../../extends/Text";import {message} from '../../../../utils/decorators';import {ITextMessage} from '../../../../interface/IMessage';import {MessageTag} from '../../../../enums/MessageTag';class Text extends AbstractShapePlugin{    protected instance:FabricText;    @message    private throw(){        return this.instance?{            type:this.instance.type,            start:{x:this.instance.left,y:this.instance.top},            text:this.instance.text,            tag:MessageTag.Shape,            id:this.instance.id,            fill:this.instance.fill,            fontSize:this.instance.fontSize        }:undefined    }    protected onMouseDown(event:IEvent){        super.onMouseDown(event);        if(void 0 !== this.instance){            this.throw();            // 关闭当前的，如果当前的没有内容则删除            this.eBoardCanvas.renderOnAddRemove=false;            this.instance.exitEditing();// 进入编辑模式            if("" === this.instance.text){                this.eBoardCanvas.remove(this.instance);                this.instance=undefined as any;            }            this.instance=undefined as any;            this.eBoardCanvas.renderAll();            this.eBoardCanvas.renderOnAddRemove=true;        }        this.instance = new FabricText('',{            left:this.start.x,            top:this.start.y,            fontSize:this.fontSize,            fill:this.fontColor,            fontFamily:'Microsoft YaHei,"Times New Roman"',        },this.eBoardCanvas);        this.instance.on("changed",()=>{            this.throw();        });        this.eBoardCanvas.add(this.instance);        this.instance.enterEditing();// 进入编辑模式        this.throw();    }    protected onMouseUp(){        // 取消默认操作    };    public onMessage(message:ITextMessage){        const {id,text,start,fill,fontSize,flipY,flipX} = message;        let instance = this.getInstanceById(id) as FabricText;        this.eBoardCanvas.renderOnAddRemove=false;        if(void 0 !== instance){            this.eBoardCanvas.remove(instance);        }        instance = new FabricText(text,{            left:start.x,            top:start.y,            fontSize:fontSize,            fill:fill,            ...flipY?{flipY}:{},            ...flipX?{flipX}:{},            fontFamily:'Microsoft YaHei',        },this.eBoardCanvas).setId(id);        this.eBoardCanvas.add(instance);        this.eBoardCanvas.requestRenderAll();        this.eBoardCanvas.renderOnAddRemove=true;    }    public setEnable(enable:boolean,background?:boolean){        if(!enable){            if(void 0 !== this.instance){                this.eBoardCanvas.renderOnAddRemove=false;                this.instance.exitEditing();// 退出编辑模式                if("" === this.instance.text){                    this.eBoardCanvas.remove(this.instance);                    this.instance=undefined as any;                }                this.instance=undefined as any;                this.eBoardCanvas.renderAll();                this.eBoardCanvas.renderOnAddRemove=true;            }        }        super.setEnable(enable);        return this;    }}export {Text};