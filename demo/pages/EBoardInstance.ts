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
        if(!this.instance){
            this.instance=new EBoard(()=>document.getElementById("eboardContainer") as HTMLDivElement);
        }
        return this.instance;
    }
}

export {EBoardInstance};