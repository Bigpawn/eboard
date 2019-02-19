/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2019/2/18 11:54
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2019/2/18 11:54
 * @disc:UndoRedo 限制缓存最大长度为10，可配置
 * 恢复状态时不触发，recovery后启用，该插件一直是处于激活状态，需要自定义事件去实现，使用Add事件不可靠
 */
import {EBoardCanvas} from '../../../EBoardCanvas';
import {Throttle} from 'lodash-decorators';

class UndoRedo {
    private readonly maxCacheSize:number=20;
    private config:any={
        canvasState: [],
        currentStateIndex: -1,
        undoStatus: false,
        redoStatus: false,
        undoFinishedStatus: 1,
        redoFinishedStatus: 1,
    };
    private canvas:EBoardCanvas;
    constructor(canvas:EBoardCanvas){
        this.canvas=canvas;
        canvas.on('object:modified', ()=>{
            this.updateCanvasState();
        });
        canvas.eventBus.on('object:added', ()=>{
            this.updateCanvasState();
        });
    }
    @Throttle(300)
    private updateCanvasState() {
        if(!this.config.undoStatus && !this.config.redoStatus){
            const jsonData= this.canvas.toJSON();
            const canvasAsJson = JSON.stringify(jsonData);
            if(this.config.currentStateIndex < this.config.canvasState.length-1){
                const indexToBeInserted= this.config.currentStateIndex+1;
                this.config.canvasState[indexToBeInserted] = canvasAsJson; // 覆盖掉
                const numberOfElementsToRetain=indexToBeInserted+1;
                this.config.canvasState=this.config.canvasState.splice(0,numberOfElementsToRetain);
            }else{
                this.config.canvasState.push(canvasAsJson);
                if(this.config.canvasState.length>this.maxCacheSize){
                    this.config.canvasState=this.config.canvasState.slice(-this.maxCacheSize);
                }
            }
            this.config.currentStateIndex = this.config.canvasState.length-1;
        }
    }
    public undo(){
        console.log(this.config);
        if(this.config.undoFinishedStatus){
            if(this.config.currentStateIndex === -1){
                this.config.undoStatus = false;
            }
            else{
                if (this.config.canvasState.length >= 1) {
                    this.config.undoFinishedStatus = 0;
                    if(this.config.currentStateIndex !== 0){
                        this.config.undoStatus = true;
                        console.log(this.config.currentStateIndex-1);
                        console.log(this.config.canvasState[this.config.currentStateIndex-1]);
                        this.canvas.loadFromJSON(this.config.canvasState[this.config.currentStateIndex-1],()=>{
                            this.canvas.renderAll();
                            this.config.undoStatus = false;
                            this.config.currentStateIndex -= 1;
                            this.config.undoFinishedStatus = 1;
                        });
                    }
                    else if(this.config.currentStateIndex === 0){
                        this.canvas.clear();
                        this.config.undoFinishedStatus = 1;
                        this.config.currentStateIndex -= 1;
                    }
                }
            }
        }
    }
    public redo(){
        if(this.config.redoFinishedStatus){
            if (this.config.canvasState.length > this.config.currentStateIndex && this.config.canvasState.length !== 0){
                this.config.redoFinishedStatus = 0;
                this.config.redoStatus = true;
                this.canvas.loadFromJSON(this.config.canvasState[this.config.currentStateIndex+1],()=>{
                    this.canvas.renderAll();
                    this.config.redoStatus = false;
                    this.config.currentStateIndex += 1;
                    this.config.redoFinishedStatus = 1;
                });
            }
        }
    }
}


export {UndoRedo};