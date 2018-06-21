/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-13 22:29:18
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-21 18:11:07
 */
import { fabric } from 'fabric';
import * as util from '../../utils/utils';
import { Composite, Orientation, AbstractLayout, ILayoutOptions, Boundary, ILayoutData, Alignment, IComponent } from '../UICommon';

export class FlowData<T extends fabric.Group> implements ILayoutData {

  /**
   * alignElement specifies which element in current Composite is used to align, null means use composite itself.
   */
  alignElement: fabric.Object;

  /**
   * alignment specifies alignment value of alignElement.
   */
  alignment: Alignment;
  
  private flowElement: Composite<T>;

  public setFlowElement(element: Composite<T>) {
    this.flowElement = element;
  }

  public calcAlignmentOffset(orientation: Orientation): number {

    if (!orientation || orientation === Orientation.HORIZONTAL) {
      // Horizontal case, calculate offset y to top

    } else {
      // Vertical case, calculate offset x to left
    }
  }
}

export interface IFlowLayoutOptions<T extends fabric.Object>  extends ILayoutOptions {
    /**
     * orientation specifies arrange orientation of elements, could be vertical or horizontal, default is horizontal.
     */    
    orientation?: Orientation;

    /**
     * singleLine specifies all elements will be added as a row or a column.
     * If container doesn't specify fixed width or fixed height, then the width/height of conainer will enlarge to fit total widht/height of elements.
     * If container specify fixed width/height, then not all elements are visible.
     */
    singleLine?: boolean;

    /**
     * All elements which are managed by flow layout.
     */
    elements?: IComponent<T>[]; 
}

/**
 * Most of expressions use FlowLayout, e.g. expression 'X = 2 + 3'
 */
export class FlowLayout<S extends fabric.Group, T extends fabric.Object, E extends IFlowLayoutOptions<T>> extends AbstractLayout<S, T, E> {
  
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
      if (!this.options.orientation) {
          this.options.orientation =  Orientation.HORIZONTAL;
      }
      if (!this.options.elements) {
          this.options.elements = [];
      }
  }

  public add(component: IComponent<T>, index?: number) {
    if (!index || index === 0) {
      this.options.elements.push(component);
    } else {
      this.options.elements.splice( index, 0, component );
    }
  }

  public remove(component: IComponent<T>): number {
    let index: number = this.options.elements.indexOf(component);
    if (index > -1) {
      this.options.elements.splice(index, 1);
    }
    return index;
  }

  public removeByIndex(index: number): IComponent<T> {
    if (index > -1 && index < this.options.elements.length) {
      let expr: IComponent<T> = this.options.elements[index];
      this.options.elements.splice(index, 1);
      return expr;
    }
    return null;
  }
  
  /**
   * @override
   */
  count(): number {
    return this.options.elements.length;
  }

  /**
   * @override
   */
  first(): IComponent<T> {
    return this.options.elements[0] ? this.options.elements[0] : null;
  }

  /**
   * @override
   */
  last(): IComponent<T> {
    if (this.options.elements && this.options.elements.length > 0) {
      return this.options.elements[this.options.elements.length - 1];
    }

    return null;
  }

  /**
   * @override
   * @param component 
   */
  next(component: IComponent<T>): IComponent<T> {
    let index = this.options.elements.indexOf(component);
    return this._get(index + 1);
  }

  /**
   * @override
   * @param expression 
   */
  previous(component: IComponent<T>): IComponent<T> {
    let index = this.options.elements.indexOf(component);
    return this._get(index - 1);
  }

  /**
   * @override
   * @param index 
   */
  valueOf(index?: number): IComponent<T> {
    return this._get(index);
  }

  /**
   * @override
   * @param expression 
   */
  indexOf(component: IComponent<T>): number {
      return this.options.elements.indexOf(component);
  }

  protected _get(index: number): IComponent<T> {
      if (index > -1 && index < this.options.elements.length) {
        return this.options.elements[index];
      }
      return null;
  }

  /**
   * Computes and returns the size of the specified composite's client area according to this layout.
   *
   * @param wHint
   * @param hHInt
   * @param flushCache
   */
  computeSize(wHint: number, hHInt: number, flushCache: boolean): fabric.Point {
    let composite: any = this.container;
    let rect: any = composite.getBoundingRect();
    return new fabric.Point(rect.width, rect.height);
  }

  /**
   * Instruct the layout to flush any cached element associated with the control specified in the argument control.
   */
  flushCache(): void {
    super.flushCache();
    this.options.elements.map(
      (ele: IComponent<T>, index: number) => {
        // Clear cache if element is text.
        let obj: any = ele;
        if (obj._clearCache) {
          obj._clearCache();
        }
      }
    );
  }
  
  /**
   * Lays out the children of the specified composite according to this layout.
   * @param flushCache
   */
  layout(flushCache?: boolean): void {
      // getBoundingRect
      // setCoords
      // calcCoords
      // _getTransformedDimensions
      // _getNonTransformedDimensions
      // makeBoundingBoxFromPoints
      // text.calcTextWidth
      // text.getLineWidth
      // text.measureLine
      // text._measureLine
      // text._getGraphemeBox
      // text._measureChar
      // text.initDimensions
      // text.getMeasuringContext
      let left: number = this.container.left, 
          top: number = this.container.top,
          leftEdgeMargin: number = util.max([this.options.marginWidth || 0, this.options.marginLeft || 0], null),
          rightEdgeMargin: number = util.max([this.options.marginWidth || 0, this.options.marginRight || 0], null),
          topEdgeMargin: number = util.max([this.options.marginHeight || 0, this.options.marginTop || 0], null),
          bottomEdgeMargin: number = util.max([this.options.marginHeight || 0, this.options.marginBottom || 0], null),
          width: number = 0,
          height: number = 0;
          
      let xOffset = left;
      let yOffset = top;

      if (this.options.orientation === Orientation.HORIZONTAL) {

          xOffset += leftEdgeMargin;
          width += leftEdgeMargin;
          let alignUpOffset: number = 0,
              alignDownOffset: number = 0;

          // Compute boundary of each element and set left of each element.
          for (let i = 0; i < this.options.elements.length; i++) {
             if (i > 0) {
               width += (this.options.vSpace ? this.options.vSpace : this.options.space) || 0;
               xOffset += (this.options.vSpace ? this.options.vSpace : this.options.space) || 0;
             }

             let component: IComponent<T> = this.options.elements[i];
             // Temporarily set left and top to calculate element's width and height.
             component.selfFabricObject().set({'left': xOffset, 'top': yOffset} as object);

             // If component is a container then do layout first.
             if (component instanceof Composite) {
               (component as Composite<S>).doLayout();
             }

             // Get component boundary
             let boundary: Boundary = component.selfFabricObject().getBoundingRect() as Boundary;
             width += boundary.width;
             xOffset += boundary.width;

            if (component instanceof Composite) {
              (component as Composite<S>).getLayoutData();
            }
            
             // Calculate max height.
             height = util.max([height, boundary.height], null);
          }

          xOffset += rightEdgeMargin;
          width += rightEdgeMargin;
          height += topEdgeMargin + bottomEdgeMargin;

          // Set top of each element according to total height and element original setting.

      }
  }
}
  