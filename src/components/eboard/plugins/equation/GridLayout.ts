/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-13 23:31:58
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-13 23:32:59
 */
import { IExpression, AbstractLayout } from './ExpressionCommon';

class CellLayoutData {
    
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