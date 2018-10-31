/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/10/31 11:08
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/10/31 11:08
 * @disc:图片工具
 */
import Timer = NodeJS.Timer;

class ImageUtil{
    public static getSize(img:HTMLImageElement,callback:(size:{width:number;height:number}) => void){
        let interval:Timer;
        const check = function(){
            if(img.width>0 && img.height>0){
                if(interval) clearInterval(interval);
                callback({
                    width:img.width,
                    height:img.height
                })
            }
        };
        interval=setInterval(check,40);
        check();
    }
}

export {ImageUtil};