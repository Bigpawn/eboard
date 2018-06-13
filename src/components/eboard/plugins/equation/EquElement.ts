/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-09 15:18:23
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-13 22:28:18
 */
import { fabric } from 'fabric';

/**
 * 公式排列方式
 */
enum Align {
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical",
}

enum BorderPosition {
  TOP = 0,
  LEFT = 1,
  CENTER = 2,
  RIGHT = 3,
  BOTTOM = 4,
}

/**
 * Most of expressions use FlowLayout, e.g. expression 'X = 2 + 3'
 */
class FlowLayout extends AbstractLayout {

  align: Align;

  elements: IExpression[];

  constructor(expression: IExpression, align?: Align, elements?: IExpression[]) {
    super(expression);
    this.align = align || Align.HORIZONTAL;
    this.elements = elements || [];
  }

  public add(expression: IExpression, index?: number) {
    if (!index || index === 0) {
      this.elements.push(expression);
    } else {
      this.elements.splice( index, 0, expression );
    }
  }

  protected _get(index: number): IExpression {
    if (index > -1 && index < this.elements.length) {
      return this.elements[index];
    }
    return null;
  }

  public remove(expression: IExpression): number {
    let index: number = this.elements.indexOf(expression);
    if (index > -1) {
      this.elements.splice(index, 1);
    }
    return index;
  }

  public removeByIndex(index: number): IExpression {
    if (index > -1 && index < this.elements.length) {
      let expr: IExpression = this.elements[index];
      this.elements.splice(index, 1);
      return expr;
    }
    return null;
  }
  
  count(): number {
    return this.elements.length;
  }

  first(): IExpression {
    return this.elements[0] ? this.elements[0] : null;
  }

  last(): IExpression {
    if (this.elements && this.elements.length > 0) {
      return this.elements[this.elements.length - 1];
    }

    return null;
  }

  next(expression: IExpression): IExpression {
    let index = this.elements.indexOf(expression);
    return this._get(index + 1);
  }

  previous(expression: IExpression): IExpression {
    let index = this.elements.indexOf(expression);
    return this._get(index - 1);
  }

  valueOf(index?: number): IExpression {
    return this._get(index);
  }
}

/**
 * The element order of border layout is top, left, center, right and bottom.
 */
class BorderLayout extends AbstractLayout {

  top: IExpression;
  bottom: IExpression;
  left: IExpression;
  right: IExpression;
  center: IExpression;

  constructor(expression: IExpression, top?: IExpression, bottom?: IExpression, left?: IExpression, right?: IExpression, center?: IExpression) {
    super(expression);
    this.top = top;
    this.bottom = bottom;
    this.left = left;
    this.right = right;
    this.center = center;
  }

  getTop(): IExpression {
    return this.top;
  }

  setTop(top: IExpression) {
    this.top = top;
  }

  getBottom(): IExpression {
    return this.bottom;
  }

  setBottom(bottom: IExpression) {
    this.bottom = bottom;
  }

  getLeft(): IExpression {
    return this.left;
  }

  setLeft(left: IExpression) {
    this.left = left;
  }

  getRight(): IExpression {
    return this.right;
  }

  setRight(right: IExpression) {
    this.right = right;
  }

  getCenter(): IExpression {
    return this.center;
  }

  setCenter(center: IExpression) {
    this.center = center;
  }

  count(): number {
    let num: number = 0;
    if (this.top) {
      num++;
    }
    if (this.left) {
      num++;
    }
    if (this.center) {
      num++;
    }
    if (this.right) {
      num++;
    }
    if (this.bottom) {
      num++;
    }
    return num;
  }

  /**
   * Find first element.
   */
  first(): IExpression {
    
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

  protected _get(index: BorderPosition): IExpression {
    switch (index) {
      case BorderPosition.TOP:
        return this.top;
      case BorderPosition.LEFT:
        return this.left;
      case BorderPosition.CENTER:
        return this.center;
      case BorderPosition.RIGHT:
        return this.right;
      case BorderPosition.BOTTOM:
        return this.bottom;
      default:
        return null;
    }
  }

  valueOf(prop: BorderPosition): IExpression {
    return this._get(prop);
  }
}

class FormLayout extends AbstractLayout {

}

class GridLayout extends AbstractLayout {
  row: number;
  col: number;
  rowGap: number|string;
  colGap: number|string;

  cellObjs: IExpression[][];

  constructor(expression: IExpression, row?: number, col?: number) {
    super(expression);
    this.row = row;
    this.col = col;
    this.cellObjs = new Array(row);
    this.cellObjs.map((value: any, rowIndex: number) => {this.cellObjs[rowIndex] = new Array(col)});
  }

  setCell(row: number, col: number, expression: IExpression) {
    this.cellObjs[row][col] = expression;
  }

  getCell(row: number, col: number): IExpression {
    return this.cellObjs[row][col];
  }
}



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