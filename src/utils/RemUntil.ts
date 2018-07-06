/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/7/6 13:50
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * * @Last Modified time: 2018/7/6 13:50
 * @disc:rem parse class
 * run with singleInstance
 */

/**
 * Rem 转换实现类
 */
class RemUntil{
    private static instance:RemUntil;
    /**
     * singleInstance
     * @returns {RemUntil}
     */
    public static getInstance(){
        return this.instance?this.instance:this.instance=new this();
    }
    private rate:number;
    private constructor(){
        this.calcRate=this.calcRate.bind(this);
        this.calcRate();
        window.addEventListener("resize",this.calcRate);
    }
    private calcRate(){
        const el=document.createElement("div");
        el.style.width="1rem";
        el.style.visibility="hidden";
        document.body.appendChild(el);
        this.rate=el.offsetWidth;
        document.body.removeChild(el);
    }
    public getRate(){
        return this.rate;
    }
    public static getNumber(size:string){
        return parseFloat(size);
    }
    public static getUnit(size:string){
        return /px$/.test(size)?"px":/rem$/.test(size)?"rem":/em$/.test(size)?"em":"";
    }
    public static getSizeObject(size:string){
        return {
            number:RemUntil.getNumber(size),
            unit:RemUntil.getUnit(size)
        }
    }
}

export {RemUntil};