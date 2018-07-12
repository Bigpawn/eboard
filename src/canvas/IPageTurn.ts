/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/12 18:52
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/12 18:52
 * @disc:PageTuen Interface
 */
export interface IPageTurn{
    next(currentElement:HTMLElement,nextElement:HTMLElement,callback:(currentElement:HTMLElement,nextElement:HTMLElement)=>void):void;
    prev(currentElement:HTMLElement,prevElement:HTMLElement,callback:(currentElement:HTMLElement,nextElement:HTMLElement)=>void):void;
}