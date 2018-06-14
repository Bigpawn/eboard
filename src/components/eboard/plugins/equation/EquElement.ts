/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-09 15:18:23
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-14 10:45:42
 */
import { fabric } from 'fabric';



export class Expression extends fabric.Group {
  layout: ILayout;

  /**
   * 
   * @param object
   */
  public addExpression(object: Expression|ExpressionUnit) {
    return;
  }

  /**
   * @override
   * @param object
   */
  addWithUpdate(object: Expression|ExpressionUnit): fabric.Group {
    return null;
  }
}

export class ExpressionUnit extends fabric.IText {
  /**
   *
   */
  public getContext(): string {
    return this.getText();
  }
}

export class Operator extends ExpressionUnit {}

export class ExpressionOperand extends ExpressionUnit {}