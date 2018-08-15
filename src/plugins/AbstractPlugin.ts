/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/10 11:39
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/10 11:39
 * @disc:Plugin抽象类
 * 对象创建方式：mousedown事件中不创建对象，mousemove中检测，如果有对象则修改对象属性，否则创建对象，mouseend事件中销毁对象实例
 * bug: 通过对象创建及销毁来实现动态属性修改，此过程中会调用两次renderAll，性能低于调用api修改属性
 */

import {EBoardCanvas} from '../EBoardCanvas';
import {EBoardEngine} from '../EBoardEngine';
import {IEvent} from '~fabric/fabric-impl';
import {fabric} from "fabric";
import {CursorTypeEnum} from '../cursor/Enum';
import {EDux, IEDux} from '../utils/EDux';
import {IExtraMessage} from '../interface/IFrame';

export declare interface IPluginOptions{
    extraMessage:IExtraMessage;
    eDux:IEDux;
    eBoardEngine:EBoardEngine;
}


abstract class AbstractPlugin {
    protected eBoardCanvas:EBoardCanvas;
    protected eBoardEngine:EBoardEngine;
    protected cursorType:CursorTypeEnum;
    protected instance:fabric.Object;
    protected enable:boolean=false;
    protected start:{x:number;y:number};
    protected end:{ x: number; y: number; };
    protected onMouseDown?(event:IEvent):void;
    protected onMouseMove?(event:IEvent):void;
    protected onMouseUp?(event:IEvent):void;
    protected ctrlKeyDownHandler?(event:KeyboardEvent):void;
    protected ctrlKeyUpHandler?(event:KeyboardEvent):void;
    protected eDux:EDux;
    protected extraMessage:IExtraMessage;
    constructor(canvas:EBoardCanvas,options:IPluginOptions){
        this.eBoardCanvas=canvas;
        this.eDux=options.eDux;
        this.extraMessage = options.extraMessage;
        this.eBoardEngine = options.eBoardEngine;
        // bind this
        if(void 0 !== this.onMouseDown){
            this.onMouseDown=this.onMouseDown.bind(this);
        }
        if(void 0 !== this.onMouseMove){
            this.onMouseMove=this.onMouseMove.bind(this);
        }
        if(void 0 !== this.onMouseUp){
            this.onMouseUp=this.onMouseUp.bind(this);
        }
        if(void 0 !== this.ctrlKeyDownHandler){
            this.ctrlKeyDownHandler=this.ctrlKeyDownHandler.bind(this);
        }
        if(void 0 !== this.ctrlKeyUpHandler){
            this.ctrlKeyUpHandler=this.ctrlKeyUpHandler.bind(this);
        }
    }
    
    /**
     * 清空缓存数据
     */
    protected clear(){
        this.start = undefined as any;
        this.end = undefined as any;
        this.instance = undefined as any;
    }
    
    /**
     * 插件启用开关
     * 支持后台运行模式
     * @param {boolean} enable
     * @param {boolean} background
     * @returns {this}
     */
    public setEnable(enable:boolean,background?:boolean){
        if(this.enable===enable){
            return;
        }
        this.start=undefined as any;
        this.instance=undefined as any;
        this.enable=enable;
        const activePlugin=this.eBoardEngine.getActivePlugin();
        if(enable){
            // 关闭当前激活的组件
            if(!background){
                if(activePlugin){
                    activePlugin.setEnable(false);
                }
                this.eBoardEngine.setActivePlugin(this);
                // 激活Cursor
                if(void 0 !== this.cursorType){
                    this.eBoardCanvas.setCursorType(this.cursorType);
                }else{
                    this.eBoardCanvas.setCursorType(CursorTypeEnum.None);
                }
            }
            if(void 0 !== this.onMouseDown){
                this.eBoardCanvas.on('mouse:down', this.onMouseDown);
            }
            if(void 0 !== this.onMouseMove){
                this.eBoardCanvas.on('mouse:move', this.onMouseMove);
            }
            if(void 0 !== this.onMouseUp){
                this.eBoardCanvas.on('mouse:up', this.onMouseUp);
            }
            if(void 0 !== this.ctrlKeyDownHandler){
                window.addEventListener("keydown",this.ctrlKeyDownHandler);
            }
            if(void 0 !== this.ctrlKeyUpHandler){
                window.addEventListener("keyup",this.ctrlKeyUpHandler);
            }
        }else{
            if(!background){
                if(activePlugin && activePlugin instanceof this.constructor){
                    this.eBoardEngine.setActivePlugin(undefined);
                }
                // disable Cursor
                this.eBoardCanvas.setCursorType(CursorTypeEnum.None);
            }
            if(void 0 !== this.onMouseDown){
                this.eBoardCanvas.off('mouse:down', this.onMouseDown);
            }
            if(void 0 !== this.onMouseMove){
                this.eBoardCanvas.off('mouse:move', this.onMouseMove);
            }
            if(void 0 !== this.onMouseUp){
                this.eBoardCanvas.off('mouse:up', this.onMouseUp);
            }
            if(void 0 !== this.ctrlKeyDownHandler){
                window.removeEventListener("keydown",this.ctrlKeyDownHandler);
            }
            if(void 0 !== this.ctrlKeyUpHandler){
                window.removeEventListener("keyup",this.ctrlKeyUpHandler);
            }
            
            // 缓存清除
            this.clear();
        }
        return this;
    };
    
    /**
     * Canvas 像素与实际像素换算
     * @param {number} pixel
     * @returns {number}
     */
    public getCanvasPixel(pixel:number){
        return pixel * this.eBoardEngine.getPixelRatio();
    }
    
    /**
     * 根据id获取实例
     * @param {string} id
     * @returns {Object | undefined}
     */
    protected getInstanceById(id:string){
        return this.eBoardCanvas.getObjects().find((obj:any)=>{
            return obj.id === id;
        });
    }
}

export {AbstractPlugin};