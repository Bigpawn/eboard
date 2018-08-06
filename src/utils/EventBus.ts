/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/6 10:04
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/8/6 10:04
 * @disc:事件通道
 */
class EventBus{
    private el:HTMLDivElement=document.createElement("div");
    public on(type:string,listener:EventListenerOrEventListenerObject){
        this.el.addEventListener(type,listener);
    }
    public trigger(type:string,data?:any){
        let ev:any=document.createEvent("HTMLEvents");
        ev.initEvent(type, true, false);
        ev.data=data;
        this.el.dispatchEvent(ev);
    }
    public off(type:string,listener:EventListenerOrEventListenerObject){
        this.el.removeEventListener(type,listener);
    }
}

export {EventBus};