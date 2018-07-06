/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/5 17:23
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/5 17:23
 * @disc:Cursor抽象类
 */
import {CursorTypeName, ICursorTypeProps} from './CursorType';



abstract class AbsCursor{
    protected width:string="0.5rem";
    protected height:string="0.5rem";
    protected cursorEl:HTMLDivElement;
    /**
     * Return size of cursor
     * @returns {{width: string; height: string}}
     */
    public getSize(){
        return {
            width:this.width,
            height:this.height
        }
    };
    
    /**
     * set size of cursor
     * @param {string} width
     * @param {string} height
     */
    public setSize(width:string,height:string){
        this.width=width;
        this.height=height;
        if(this.cursorEl){
            this.cursorEl.style.width=width;
            this.cursorEl.style.height=height;
        }
    }
    /**
     * Return type of cursor.
     */
    public abstract getType(): ICursorTypeProps;
    /**
     * Return name of cursor.
     */
    public abstract getName(): CursorTypeName;
    
    public getSizeNumber(){
    
    }
    
    public getSizeUnit(){
    
    }
}

export {AbsCursor};
