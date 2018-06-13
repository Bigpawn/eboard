/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-13 23:25:09
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-13 23:38:24
 */
import { IExpression, AbstractLayout, ILayoutData } from './ExpressionCommon';

/**
 * 
 */
export class FormLayoutData implements ILayoutData {

}

/**
 * 
 */
export class FormLayout extends AbstractLayout {
    count(): number {
        throw new Error("Method not implemented.");
    }
    first(): IExpression {
        throw new Error("Method not implemented.");
    }
    last(): IExpression {
        throw new Error("Method not implemented.");
    }
    next(expression: IExpression): IExpression {
        throw new Error("Method not implemented.");
    }
    previous(expression: IExpression): IExpression {
        throw new Error("Method not implemented.");
    }
    valueOf(...props: any[]): IExpression {
        throw new Error("Method not implemented.");
    }
    indexOf(expression: IExpression): number {
        throw new Error("Method not implemented.");
    }
}