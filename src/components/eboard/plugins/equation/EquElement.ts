/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-09 15:18:23
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-11 09:20:14
 */
import { fabric } from 'fabric';

/**
 * 公式排列方式
 */
enum Arrange {
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical",
}

class ExpressionLayout {
    
}
/**
 * 算式
 * Expression = { Expression... } || { Operand... } || { Operator... } || { Symbol... }
 */
class Expression extends fabric.Group {
    private options: any;

    private arrange: Arrange;

    constructor(options: any) {
        super(options);
        this.options = options || {};
    }
}

/**
 * 操作数
 * number, text
 */
class Operand extends fabric.IText {

}

/**
 * 运算符
 * +, -, * , / , > , =, 
 */
class Operator extends fabric.IText {

}

/**
 * 公式内符号
 * {, }, [, ] 
 */
class Symbol extends fabric.Path {
    
}
