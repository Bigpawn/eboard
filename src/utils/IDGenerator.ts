/**
 * @Author: yanxinaliang (rainyxlxl@163.com)
 * @Date: 2018/10/25 9:38
 * @Last Modified by: yanxinaliang (rainyxlxl@163.com)
 * @Last Modified time: 2018/10/25 9:38
 * @disc: ID 生成器
 */

class IDGenerator{
    private static id:number=Date.now();
    public static getId():string{
        ++this.id;
        return this.id.toString();
    }
}

export {IDGenerator};