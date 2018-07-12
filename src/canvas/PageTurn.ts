/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/11 15:41
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/11 15:41
 * @disc:翻页类，仅处理转场效果，可以自定义效果className,可以作为基类被继承  需要进行队列控制，确保动画执行  队列触发模式
 */
import {setAnimationName} from '../utils/decorators';

@setAnimationName("eboard-pager")
class PageTurn{
    private animationCssPrefix:string;
    private currentElement:HTMLElement;
    private nextElement:HTMLElement;
    private changeCallback:(currentElement:HTMLElement,nextElement:HTMLElement)=>void;
    private animPromise:Promise<any>=new Promise((resolve)=>resolve(true));
    constructor(changeCallback:(currentElement:HTMLElement,nextElement:HTMLElement)=>void){
        this.changeCallback=changeCallback;
        this.transitionEnd=this.transitionEnd.bind(this);
    }
    private transitionEnd(){
        this.currentElement.className = this.currentElement.className
            .replace(`${this.animationCssPrefix}-enter-from-right`,"")
            .replace(`${this.animationCssPrefix}-enter-from-left`,"")
            .replace(`${this.animationCssPrefix}-leave-to-right`,"")
            .replace(`${this.animationCssPrefix}-leave-to-left`,"");
        this.nextElement.className = this.currentElement.className
            .replace(`${this.animationCssPrefix}-enter-from-right`,"")
            .replace(`${this.animationCssPrefix}-enter-from-left`,"")
            .replace(`${this.animationCssPrefix}-leave-to-right`,"")
            .replace(`${this.animationCssPrefix}-leave-to-left`,"");
        this.changeCallback(this.currentElement,this.nextElement);
    }
    public next(currentElement:HTMLElement,nextElement:HTMLElement){
        this.animPromise=this.animPromise.then(()=>{
            return new Promise((resolve)=>{
                this.currentElement=currentElement;
                this.nextElement=nextElement;
                // 执行动画后触发回调
                const nextElementClassName=nextElement.className.replace("eboard-pager-hide","");
    
                currentElement.className += ` ${this.animationCssPrefix}-leave-to-left`;
                nextElement.className = nextElementClassName + ` ${this.animationCssPrefix}-enter-from-right`;
                const transitionEndListener=(e:any)=>{
                    currentElement.removeEventListener("animationend",transitionEndListener);
                    this.transitionEnd();
                    resolve(true);
                };
                currentElement.addEventListener("animationend",transitionEndListener);
            })
        });
    }
    public prev(currentElement:HTMLElement,prevElement:HTMLElement){
        this.animPromise=this.animPromise.then(()=>{
            return new Promise((resolve)=>{
                this.currentElement=currentElement;
                this.nextElement=prevElement;
                // 执行动画后触发回调
                const nextElementClassName=prevElement.className.replace("eboard-pager-hide","");
                currentElement.className += ` ${this.animationCssPrefix}-leave-to-right`;
                prevElement.className = nextElementClassName + ` ${this.animationCssPrefix}-enter-from-left`;
                const transitionEndListener=(e:any)=>{
  /*                  if(e.target === this) {
                        console.log('end');
                    }*/
                    currentElement.removeEventListener("animationend",transitionEndListener);
                    this.transitionEnd();
                    resolve(true);
                };
                currentElement.addEventListener("animationend",transitionEndListener);
            })
        });
    }
}

export {PageTurn};