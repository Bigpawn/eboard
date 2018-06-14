/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-09 15:18:23
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-14 16:16:59
 */
import { fabric } from 'fabric';
import { Composite, IControl, ILayoutData } from '../../widget/layout/LayoutCommon';

export class Expression extends Composite {
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
  addExpressionWithUpdate(object: Expression|ExpressionUnit): fabric.Group {
    return null;
  }
}

export class ExpressionUnit extends fabric.IText implements IControl {
  layoutData: ILayoutData;

  getLayoutData(): ILayoutData {
    return this.layoutData;
  }

  setLayoutData(layoutData: ILayoutData) {
    this.layoutData = layoutData;
  }

  /**
   *
   */
  public getContent(): string {
    return this.getText();
  }
}

export class Operator extends ExpressionUnit { }

export class ExpressionOperand extends ExpressionUnit { }