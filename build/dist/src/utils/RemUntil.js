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
var RemUntil = /** @class */ (function () {
    function RemUntil() {
        this.calcRate = this.calcRate.bind(this);
        this.calcRate();
        window.addEventListener("resize", this.calcRate);
    }
    /**
     * singleInstance
     * @returns {RemUntil}
     */
    RemUntil.getInstance = function () {
        return this.instance ? this.instance : this.instance = new this();
    };
    RemUntil.prototype.calcRate = function () {
        var el = document.createElement("div");
        el.style.width = "1rem";
        el.style.visibility = "hidden";
        document.body.appendChild(el);
        this.rate = el.offsetWidth;
        document.body.removeChild(el);
    };
    RemUntil.prototype.getRate = function () {
        return this.rate;
    };
    RemUntil.getNumber = function (size) {
        return parseFloat(size);
    };
    RemUntil.getUnit = function (size) {
        return /px$/.test(size) ? "px" : /rem$/.test(size) ? "rem" : /em$/.test(size) ? "em" : "";
    };
    RemUntil.getSizeObject = function (size) {
        return {
            number: RemUntil.getNumber(size),
            unit: RemUntil.getUnit(size)
        };
    };
    return RemUntil;
}());
export { RemUntil };
//# sourceMappingURL=RemUntil.js.map