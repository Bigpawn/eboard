/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/10/31 15:21
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/10/31 15:21
 * @disc:Clipboard 剪切板
 */

import {IObject} from '../../../interface/IObject';


class Clipboard{
    private _clipboard?:IObject;
    public setClipboardObject(object:IObject){
        this._clipboard=object;
    }
    public getClipboardObject(){
        return this._clipboard;
    }
    public clearClipboard(){
        this._clipboard=undefined;
    }
}

export {Clipboard};