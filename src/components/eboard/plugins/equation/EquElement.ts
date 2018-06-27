/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-09 15:18:23
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-27 16:04:07
 */
import { fabric } from 'fabric';
import { IComponent, Composite, ILayoutData, Boundary } from '../../widget/UICommon';
import RectangleBrush from '../../brushes/shape/twodims/RectangleBrush';

/**
 * 
 */
export class Expression extends Composite<fabric.Group> {
  
}

/**
 * 
 */
export class ExpressionUnit extends fabric.IText implements IComponent<fabric.IText> {

  layoutData: ILayoutData;

  parent: Expression;

  valid: boolean = false;

  constructor(content?: string, options?: any) {
    super(content, options);
  }

  public setParent(parent: Expression) {
    this.parent = parent;
  }

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

  selfFabricObject(): fabric.IText {
    return this;
  }

  calcBounds(absolute?: boolean, recalculate?: boolean): Boundary {
    return this.getBoundingRect(absolute, recalculate);
  }

  public isValid(): boolean {
    return this.valid;
  }

  /**
   * @override
   */
  public invalidate(): void {
    this.valid = false;
    if (this.parent) {
        this.parent.invalidate();
    }
  }

  /**
   * @override
   */
  public validate(): void {
    if (!this.isValid()) {
        this.calcBounds(false, true);
    }
  }

  /**
   * @override
   */
  public revalidate(): void {
    this.invalidate();
    let root: Composite<any> = this.parent;
    if (!root) {
        this.validate();
    } else {
        while (!root.isValid()) {
            if (!root.parent) {
                break;
            }
            root = root.parent;
        }
        root.validate();
    }
  }
}

export class Operator extends ExpressionUnit { }

export class ExpressionOperand extends ExpressionUnit { }