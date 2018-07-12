/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/11 15:41
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/11 15:41
 * @disc:翻页类，仅处理转场效果，可以自定义效果className,可以作为基类被继承  需要进行队列控制，确保动画执行  队列触发模式
 */
import {setAnimationName} from '../utils/decorators';
import {IPageTurn} from './IPageTurn';

@setAnimationName('eboard-pager')
class PageTurn implements IPageTurn{
    private animationCssPrefix:string;
    public next(currentElement:HTMLElement,nextElement:HTMLElement,callback:(currentElement:HTMLElement,nextElement:HTMLElement)=>void){
        // 执行动画后触发回调
        const nextElementClassName=nextElement.className.replace('eboard-pager-hide','');
        currentElement.className += ` ${this.animationCssPrefix}-leave-to-left`;
        nextElement.className = nextElementClassName + ` ${this.animationCssPrefix}-enter-from-right`;
        const transitionEndListener=(e:any)=>{
            currentElement.removeEventListener('animationend',transitionEndListener);
            currentElement.className = currentElement.className
            .replace(`${this.animationCssPrefix}-enter-from-right`,'')
            .replace(`${this.animationCssPrefix}-enter-from-left`,'')
            .replace(`${this.animationCssPrefix}-leave-to-right`,'')
            .replace(`${this.animationCssPrefix}-leave-to-left`,'');
            nextElement.className = currentElement.className
            .replace(`${this.animationCssPrefix}-enter-from-right`,'')
            .replace(`${this.animationCssPrefix}-enter-from-left`,'')
            .replace(`${this.animationCssPrefix}-leave-to-right`,'')
            .replace(`${this.animationCssPrefix}-leave-to-left`,'');
            callback(currentElement,nextElement);
        };
        currentElement.addEventListener('animationend',transitionEndListener);
    }
    public prev(currentElement:HTMLElement,prevElement:HTMLElement,callback:(currentElement:HTMLElement,nextElement:HTMLElement)=>void){
            // 执行动画后触发回调
            const nextElementClassName=prevElement.className.replace('eboard-pager-hide','');
            currentElement.className += ` ${this.animationCssPrefix}-leave-to-right`;
            prevElement.className = nextElementClassName + ` ${this.animationCssPrefix}-enter-from-left`;
            const transitionEndListener=(e:any)=>{
                currentElement.removeEventListener('animationend',transitionEndListener);
                currentElement.className = currentElement.className
                .replace(`${this.animationCssPrefix}-enter-from-right`,'')
                .replace(`${this.animationCssPrefix}-enter-from-left`,'')
                .replace(`${this.animationCssPrefix}-leave-to-right`,'')
                .replace(`${this.animationCssPrefix}-leave-to-left`,'');
                prevElement.className = currentElement.className
                .replace(`${this.animationCssPrefix}-enter-from-right`,'')
                .replace(`${this.animationCssPrefix}-enter-from-left`,'')
                .replace(`${this.animationCssPrefix}-leave-to-right`,'')
                .replace(`${this.animationCssPrefix}-leave-to-left`,'');
                callback(currentElement,prevElement);
            };
            currentElement.addEventListener('animationend',transitionEndListener);
    }
}

export {PageTurn};