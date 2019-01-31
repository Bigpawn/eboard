import {EBoard} from '../../src/EBoard';

/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/26 10:03
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/26 10:03
 * @disc:DESC
 */
class EBoardInstance{
    private static instance:EBoard;
    public static getInstance(){
        const container = document.getElementById("eboardContainer") as HTMLDivElement;
        this.instance=new EBoard(container);
        return this.instance;
    }
    
    private static receiveInstance:EBoard;
    public static getReceiveInstance(){
        const container = document.getElementById("eboardContainerReceive") as HTMLDivElement;
        this.receiveInstance=new EBoard(container);
        return this.receiveInstance;
    }
}

export {EBoardInstance};