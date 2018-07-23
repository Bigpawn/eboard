/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/20 11:45
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/20 11:45
 * @disc:前端应用架构类 设计到窗口概念  frame 可应用为Tab
 * frame 中管理canvas实例，canvas实例中管理绘制object实例  层级化，frame中提供object实例查询 canvas中提供跨实例object实例查询
 *
 *
 *
 */

import {IFrame, IFrameOptions} from './frames/IFrame';
import {BaseFrame} from './frames/BaseFrame';
import {HtmlFrame} from './frames/HtmlFrame';
import {ImageFrame} from './frames/ImageFrame';
import {CanvasFrame} from './frames/CanvasFrame';
import {PdfFrame} from "./frames/PdfFrame";

export enum FrameType{
    Empty,Pager,Image,HTML,Canvas,Pdf // 目前只存在两种模式，一个是空的白板，一个是带翻页的白板，扩展支持一个图片或者一段Html的白板类型
}


export declare interface ICFrameOptions extends IFrameOptions{
    type:FrameType
}


class EBoard{
    private static frames:Map<number,IFrame>=new Map();// frame管理
    private static activeFrame:number;
    
    /**
     * 创建frame
     * @param {ICFrameOptions} options
     * @returns {this}
     */
    public static createFrame(options:ICFrameOptions){
        if(this.hasFrame(options.id)){
            return this;
        }
        let frame:IFrame;
        switch (options.type){
            case FrameType.HTML:
                frame = new HtmlFrame(options);
                break;
            case FrameType.Image:
                frame = new ImageFrame(options);
                break;
            case FrameType.Canvas:
                frame = new CanvasFrame(options);
                break;
            case FrameType.Pdf:
                frame = new PdfFrame(options);
                break;
            case FrameType.Empty:
            default:
                frame = new BaseFrame(options);
                break;
        }
        this.frames.set(options.id,frame);
        return this;
    }
    
    /**
     * 切换到需要显示的frame 需要改frame存在，如果不存在则不执行任何操作
     * @param {number} id
     * @returns {IFrame | undefined}
     */
    public static switchToFrame(id:number){
        if(id === this.activeFrame||!this.hasFrame(id)){
            return;
        }
        if(this.activeFrame){
            const frame = this.findFrameById(this.activeFrame);
            if(frame&&frame.dom&&frame.dom.parentElement){
                frame.dom.parentElement.removeChild(frame.dom); // 隐藏
            }
        }
        this.activeFrame = id;
        const activeFrame = this.findFrameById(id);
        if(activeFrame&&activeFrame.dom){
            activeFrame.container.appendChild(activeFrame.dom);// 如果是子frame则存在问题
        }
        return activeFrame;
    }
    
    /**
     * 根据id获取frame实例
     * @param {number} id
     * @returns {IFrame | undefined}
     */
    public static findFrameById(id:number){
        return this.frames.get(id);
    }
    
    /**
     * 检测是否存在某个frame
     * @param {number} id
     * @returns {boolean}
     */
    public static hasFrame(id:number){
        return this.frames.has(id);
    }
}

export {EBoard};