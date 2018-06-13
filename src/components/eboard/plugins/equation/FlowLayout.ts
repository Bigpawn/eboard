/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-13 22:29:18
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-13 23:37:30
 */
import { IExpression, Orientation, AbstractLayout } from './ExpressionCommon';

/**
 * Most of expressions use FlowLayout, e.g. expression 'X = 2 + 3'
 */
export class FlowLayout extends AbstractLayout {

    orientation: Orientation;
  
    elements: IExpression[];
  
    constructor(expression: IExpression, orientation?: Orientation, elements?: IExpression[]) {
      super(expression);
      this.orientation = orientation || Orientation.HORIZONTAL;
      this.elements = elements || [];
    }
  
    public add(expression: IExpression, index?: number) {
      if (!index || index === 0) {
        this.elements.push(expression);
      } else {
        this.elements.splice( index, 0, expression );
      }
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
    
    /**
     * @override
     */
    count(): number {
      return this.elements.length;
    }
  
    /**
     * @override
     */
    first(): IExpression {
      return this.elements[0] ? this.elements[0] : null;
    }
  
    /**
     * @override
     */
    last(): IExpression {
      if (this.elements && this.elements.length > 0) {
        return this.elements[this.elements.length - 1];
      }
  
      return null;
    }
  
    /**
     * @override
     * @param expression 
     */
    next(expression: IExpression): IExpression {
      let index = this.elements.indexOf(expression);
      return this._get(index + 1);
    }
  
    /**
     * @override
     * @param expression 
     */
    previous(expression: IExpression): IExpression {
      let index = this.elements.indexOf(expression);
      return this._get(index - 1);
    }
  
    /**
     * @override
     * @param index 
     */
    valueOf(index?: number): IExpression {
      return this._get(index);
    }

    /**
     * @override
     * @param expression 
     */
    indexOf(expression: IExpression): number {
        return this.elements.indexOf(expression);
    }

    protected _get(index: number): IExpression {
        if (index > -1 && index < this.elements.length) {
          return this.elements[index];
        }
        return null;
      }
}
  