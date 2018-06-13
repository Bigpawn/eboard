/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-13 22:42:44
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-13 23:37:23
 */
import { IExpression, AbstractLayout } from './ExpressionCommon';

export enum BorderElementPosition {
    TOP = 0,
    LEFT = 1,
    CENTER = 2,
    RIGHT = 3,
    BOTTOM = 4,
}
  
/**
 * The element order of border layout is top, left, center, right and bottom.
 */
export class BorderLayout extends AbstractLayout {

    elements: IExpression[];

    constructor(container: IExpression, top?: IExpression, bottom?: IExpression, left?: IExpression, right?: IExpression, center?: IExpression) {
        super(container);
        this.elements = new Array(5);
        this.elements[BorderElementPosition.TOP] = top || null;
        this.elements[BorderElementPosition.LEFT] = left || null;
        this.elements[BorderElementPosition.CENTER] = center || null;
        this.elements[BorderElementPosition.RIGHT] = right || null;
        this.elements[BorderElementPosition.BOTTOM] = bottom || null;
    }

    getTop(): IExpression {
        return this.elements[BorderElementPosition.TOP];
    }

    setTop(top: IExpression) {
        this.elements[BorderElementPosition.TOP] = top;
    }

    getBottom(): IExpression {
        return this.elements[BorderElementPosition.BOTTOM];
    }

    setBottom(bottom: IExpression) {
        this.elements[BorderElementPosition.BOTTOM] = bottom;
    }

    getLeft(): IExpression {
        return this.elements[BorderElementPosition.LEFT];
    }

    setLeft(left: IExpression) {
        this.elements[BorderElementPosition.LEFT] = left;
    }

    getRight(): IExpression {
        return this.elements[BorderElementPosition.RIGHT];
    }

    setRight(right: IExpression) {
        this.elements[BorderElementPosition.RIGHT] = right;
    }

    getCenter(): IExpression {
        return this.elements[BorderElementPosition.CENTER];
    }

    setCenter(center: IExpression) {
        this.elements[BorderElementPosition.CENTER] = center;
    }

    /**
     * @override
     */
    count(): number {
        let num: number = 0;
        this.elements.map(
            (value: IExpression, index: number) => {
                if (value) {
                    num++;
                }
            }
        );
        return num;
    }

    /**
     * @override
     */
    first(): IExpression {
        let ele: IExpression;
        this.elements.map(
            (value: IExpression, index: number) => {
                if (!ele && value) {
                    ele = value;
                }
            }
        );
        return ele;
    }

    /**
     * @override
     */
    last(): IExpression {
        let ele: IExpression;
        this.elements.slice(0).reverse().map(
            (value: IExpression, index: number) => {
                if (!ele && value) {
                    ele = value;
                }
            }
        );
        return ele;
    }

    /**
     * @override
     * @param expression 
     */
    next(expression: IExpression): IExpression {
        let skip: boolean = true, ele: IExpression;
        this.elements.map(
            (value: IExpression, index: number) => {
                if (!skip && !ele && value) {
                    ele = value;
                }

                if (value === expression) {
                    skip = false;
                }
            }
        );
        return ele;
    }

    /**
     * @override
     * @param expression 
     */
    previous(expression: IExpression): IExpression {
        let skip: boolean = true, ele: IExpression;
        this.elements.slice(0).reverse().map(
            (value: IExpression, index: number) => {
                if (!skip && !ele && value) {
                    ele = value;
                }

                if (value === expression) {
                    skip = false;
                }
            }
        );
        return ele;
    }

    /**
     * @override
     * @param prop 
     */
    valueOf(prop: BorderElementPosition): IExpression {
        return this._get(prop);
    }

    /**
     * @override
     * @param expression 
     */
    indexOf(expression: IExpression): number {
        return this.elements.indexOf(expression);
    }

    protected _get(index: BorderElementPosition): IExpression {
        let _index: number = index;
        if (_index > -1 && _index < this.elements.length) {
            return this.elements[_index];
        }
        return null;
    }
}