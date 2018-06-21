/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-13 23:31:58
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-14 16:26:51
 */
import { fabric } from 'fabric';
import { Composite, AbstractLayout, ILayoutOptions, IComponent } from './LayoutCommon';

export enum Align {
    BEGINNING,
    CENTER,
    END,
    FILL,
}

export class GridData {
    /**
     * exclude informs the layout to ignore this control when sizing and positioning controls.
     */
    exclude: boolean;

    /**
     * 	grabExcessHorizontalSpace
     *  grabExcessHorizontalSpace specifies whether the width of the cell changes depending on the size of the parent Composite.
     */
    grabExcessHorizontalSpace: boolean;

    /**
     * heightHint specifies the preferred height in pixels.
     */
    heightHint: number;

    /**
     * widthHint specifies the preferred width in pixels.
     */
    widthHint: number;

    /**
     * minimumHeight specifies the minimum height in pixels.
     */
    minimumHeight: number;

    /**
     * minimumWidth specifies the minimum width in pixels.
     */
    minimumWidth: number;

    /**
     * horizontalAlignment specifies how controls will be positioned horizontally within a cell.
     */
    horizontalAlignment: Align;

    /**
     * horizontalIndent specifies the number of pixels of indentation that will be placed along the left side of the cell.
     */
    horizontalIndent: number;

    /**
     * horizontalSpan specifies the number of column cells that the control will take up.
     */
    horizontalSpan: number;
    
    /**
     * verticalAlignment specifies how controls will be positioned vertically within a cell.
     */
    verticalAlignment: Align;

    /**
     * verticalIndent specifies the number of pixels of indentation that will be placed along the top side of the cell.
     */
    verticalIndent: number;

    /**
     * verticalSpan specifies the number of row cells that the control will take up.
     */
    verticalSpan: number;

}

export interface IGridLayoutOptions<T extends fabric.Object> extends ILayoutOptions {
    /**
     * horizontalSpacing specifies the number of pixels between the right edge of one cell and the left edge of its neighbouring cell to the right.
     */
    horizontalSpacing: number | string;

    /**
     * verticalSpacing specifies the number of pixels between the bottom edge of one cell and the top edge of its neighbouring cell underneath.
     */
    verticalSpacing: number | string;

    /**
     * makeColumnsEqualWidth specifies whether all columns in the layout will be forced to have the same width.
     */
    makeColumnsEqualWidth: boolean;

    /**
     * numRows specifies the number of cell rows in the layout.
     */
    numRows: number;

    /**
     * numColumns specifies the number of cell columns in the layout.
     */
    numColumns: number;

    /**
     * All elements which are managed by flow layout.
     */
    elements?: IComponent<T>[][]; 
}

export class GridLayout<S extends fabric.Group, T extends fabric.Object, E extends IGridLayoutOptions<T>>  extends AbstractLayout<S, T, E> {

    constructor(container: Composite<S>, options?: E) {
        super(container, options);
      }
  
    /**
     * @override
     * @param container 
     * @param options 
     */
    protected _init(container: Composite<S>, options?: E) {
        super._init(container, options);
        if (!this.options.elements) {
            this.options.elements = new Array(this.options.numRows);
            this.options.elements.map((value: any, index: number) => {
                this.options.elements[index] = new Array(this.options.numColumns);
            });
        }
    }
  
    setCell(row: number, col: number, component: IComponent<T>) {
      this.options.elements[row][col] = component;
    }
  
    getCell(row: number, col: number): IComponent<T> {
      return this.options.elements[row][col];
    }

    count(): number {
        let count: number = 0;
        this.options.elements.map((value: any, index: number) => {
            this.options.elements[index].map((v: any, i: number) => {
                if (this.options.elements[index][i]) {
                    count++;
                }
            });
        });
        return count;
    }

    first(): IComponent<T> {
        for (let rowIndex = 0; rowIndex < this.options.numRows; rowIndex++ ) {
            for (let colIndex = 0; colIndex < this.options.numColumns; colIndex++ ) {
                if (this.options.elements[rowIndex][colIndex]) {
                    return this.options.elements[rowIndex][colIndex];
                }
            }
        }
        
        return null;
    }

    last(): IComponent<T> {
        for (let rowIndex = this.options.numRows - 1; rowIndex >= 0; rowIndex-- ) {
            for (let colIndex = this.options.numColumns - 1; colIndex >= 0; colIndex-- ) {
                if (this.options.elements[rowIndex][colIndex]) {
                    return this.options.elements[rowIndex][colIndex];
                }
            }
        }
        
        return null;
    }

    next(component: IComponent<T>): IComponent<T> {
        let find: boolean = false;
        for (let rowIndex = 0; rowIndex < this.options.numRows; rowIndex++ ) {
            for (let colIndex = 0; colIndex < this.options.numColumns; colIndex++ ) {
                if (find && this.options.elements[rowIndex][colIndex]) {
                    return this.options.elements[rowIndex][colIndex];
                }

                if (component === this.options.elements[rowIndex][colIndex]) {
                    find = true;
                }
            }
        }
        
        return null;
    }

    previous(component: IComponent<T>): IComponent<T> {
        let find: boolean = false;
        for (let rowIndex = this.options.numRows - 1; rowIndex >= 0; rowIndex-- ) {
            for (let colIndex = this.options.numColumns - 1; colIndex >= 0; colIndex-- ) {
                if (find && this.options.elements[rowIndex][colIndex]) {
                    return this.options.elements[rowIndex][colIndex];
                }

                if (component === this.options.elements[rowIndex][colIndex]) {
                    find = true;
                }
            }
        }
        
        return null;
    }
    
    valueOf(rowIndex: number, colIndex?: number): IComponent<T>[] {
        if (!colIndex) {
            return this.options.elements[rowIndex];
        } else {
            return [this.options.elements[rowIndex][colIndex]];
        }
    }
    
    indexOf(component: IComponent<T>): {rowIndex: number, colIndex: number} {

        for (let rowIndex = 0; rowIndex < this.options.numRows; rowIndex++ ) {
            for (let colIndex = 0; colIndex < this.options.numColumns; colIndex++ ) {
                if (component === this.options.elements[rowIndex][colIndex]) {
                    return {'rowIndex': rowIndex, 'colIndex': colIndex};
                }
            }
        }
        
        return {'rowIndex': -1, 'colIndex': -1};
    }
  }