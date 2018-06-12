/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-09 15:18:23
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-12 11:29:00
 */
import { fabric } from 'fabric';

/**
 * 公式排列方式
 */
enum ExprArrange {
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical",
}

/**
 * 算式
 * Expression = { Expression... } || { Operand... } || { Operator... } || { Symbol... }
 */
class Expression extends fabric.Group {
    private options: any;

    private arrange: ExprArrange;

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
