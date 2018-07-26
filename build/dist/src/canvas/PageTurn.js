var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/11 15:41
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/11 15:41
 * @disc:翻页类，仅处理转场效果，可以自定义效果className,可以作为基类被继承  需要进行队列控制，确保动画执行  队列触发模式
 */
import { setAnimationName } from '../utils/decorators';
var PageTurn = /** @class */ (function () {
    function PageTurn() {
    }
    PageTurn.prototype.next = function (currentElement, nextElement, callback) {
        var _this = this;
        // 执行动画后触发回调
        var nextElementClassName = nextElement.className.replace('eboard-pager-hide', '');
        currentElement.className += " " + this.animationCssPrefix + "-leave-to-left";
        nextElement.className = nextElementClassName + (" " + this.animationCssPrefix + "-enter-from-right");
        var transitionEndListener = function (e) {
            currentElement.removeEventListener('animationend', transitionEndListener);
            currentElement.className = currentElement.className
                .replace(_this.animationCssPrefix + "-enter-from-right", '')
                .replace(_this.animationCssPrefix + "-enter-from-left", '')
                .replace(_this.animationCssPrefix + "-leave-to-right", '')
                .replace(_this.animationCssPrefix + "-leave-to-left", '');
            nextElement.className = currentElement.className
                .replace(_this.animationCssPrefix + "-enter-from-right", '')
                .replace(_this.animationCssPrefix + "-enter-from-left", '')
                .replace(_this.animationCssPrefix + "-leave-to-right", '')
                .replace(_this.animationCssPrefix + "-leave-to-left", '');
            callback(currentElement, nextElement);
        };
        currentElement.addEventListener('animationend', transitionEndListener);
    };
    PageTurn.prototype.prev = function (currentElement, prevElement, callback) {
        var _this = this;
        // 执行动画后触发回调
        var nextElementClassName = prevElement.className.replace('eboard-pager-hide', '');
        currentElement.className += " " + this.animationCssPrefix + "-leave-to-right";
        prevElement.className = nextElementClassName + (" " + this.animationCssPrefix + "-enter-from-left");
        var transitionEndListener = function (e) {
            currentElement.removeEventListener('animationend', transitionEndListener);
            currentElement.className = currentElement.className
                .replace(_this.animationCssPrefix + "-enter-from-right", '')
                .replace(_this.animationCssPrefix + "-enter-from-left", '')
                .replace(_this.animationCssPrefix + "-leave-to-right", '')
                .replace(_this.animationCssPrefix + "-leave-to-left", '');
            prevElement.className = currentElement.className
                .replace(_this.animationCssPrefix + "-enter-from-right", '')
                .replace(_this.animationCssPrefix + "-enter-from-left", '')
                .replace(_this.animationCssPrefix + "-leave-to-right", '')
                .replace(_this.animationCssPrefix + "-leave-to-left", '');
            callback(currentElement, prevElement);
        };
        currentElement.addEventListener('animationend', transitionEndListener);
    };
    PageTurn = __decorate([
        setAnimationName('eboard-pager')
    ], PageTurn);
    return PageTurn;
}());
export { PageTurn };
//# sourceMappingURL=PageTurn.js.map