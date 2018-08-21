/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/8/21 13:31
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/8/21 13:31
 * @disc:配置解析
 */

const config = require("../config.json");

class Config{
    private static _config:any={};
    public static getConfig(){
        return Object.assign(config,this._config);
    }
    public static setConfig(config:any){
        this._config=config;
    }
    public static getShapeConfig(){
        return {
            borderColor:config.borderColor,
            cornerColor:config.cornerColor,
            cornerStrokeColor:config.cornerStrokeColor,
            cornerStyle:config.cornerStyle,
            transparentCorners:config.transparentCorners
        }
    }
    public static getCornerSize(){
        return config.cornerSize;
    }
}

export default Config;