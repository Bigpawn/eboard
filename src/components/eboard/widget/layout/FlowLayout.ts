/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-13 22:29:18
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-25 10:17:15
 */
import { fabric } from 'fabric';
import * as util from '../../utils/utils';
import { Composite, Orientation, AbstractLayout, ILayoutOptions, Boundary, ILayoutData, Alignment, IComponent } from '../UICommon';

/**
 * AlignmentPartSize saves up/down/left/right size which are calcualted by alignment setting in FlowData of Component,
 * That 'up size' plus 'down size' equal height of component when flow layout is Horizontal orientation, 
 * and that 'left size' plus 'right size' equal width of component when flow layout is Vertical orientation. 
 * As default up size/down size are 1/2 of height and left size/right size are 1/2 of width.
 */
export interface AlignmentPartSize {
  up?: number;
  down?: number;
  left?: number;
  right?: number;
}

/**
 * 
 */
export class FlowData<T extends fabric.Object> implements ILayoutData {
  private ownerComponent: IComponent<T>;
  
  /**
   * alignElement specifies which element in current Composite is used to align, null means use composite itself.
   */
  alignElement: IComponent<T>;

  /**
   * alignment specifies alignment value of alignElement.
   */
  alignment: Alignment;
  
  constructor(ownerComponent: IComponent<T>) {
    this.ownerComponent = ownerComponent;
    this.ownerComponent = this.ownerComponent;
    this.alignment = Alignment.CENTER;
    this.ownerComponent.setLayoutData(this);
  }
  
  public setAlignElement(component: IComponent<T>) {
    this.alignElement = component;
  }

  public setAlignment(alignment: Alignment) {
    this.alignment = alignment;
  }

  public calcAlignmentPartSize(orientation: Orientation, recalculate: boolean): AlignmentPartSize {

    let bounds: Boundary = this.alignElement.calcBounds(false, recalculate);
    let partSize: AlignmentPartSize;

    if (orientation === Orientation.VERTICAL) {
      // Orientation is vertical case, calculate up size and down size.
      partSize = this.__calcVerticalPartSize(this.alignment, {'up': 0, 'down': 0}, bounds);

    } else {
      // Orientation is horizontal case, calculate left size and right size.
      partSize = this.__calcHorizontalPartSize(this.alignment, {'left': 0, 'right': 0}, bounds);
    }
    
    return partSize;
  }

  private __calcVerticalPartSize(alignment: Alignment, partSize: AlignmentPartSize, bounds: Boundary): AlignmentPartSize {
    switch (this.alignment) {
      case Alignment.TOP:
        partSize.up += 0;
        partSize.down += bounds.height;
        break;
      case Alignment.BOTTOM:
        partSize.up += bounds.height;
        partSize.down += 0;
        break;
      default:
        let middle: number = bounds.height / 2;
        partSize.up += middle;
        partSize.down += middle;
    }
    return partSize;
  }

  private __calcHorizontalPartSize(alignment: Alignment, partSize: AlignmentPartSize, bounds: Boundary): AlignmentPartSize {
    switch (this.alignment) {
      case Alignment.LEFT:
        partSize.left += 0;
        partSize.right += bounds.width;
        break;
      case Alignment.RIGHT:
        partSize.left += bounds.width;
        partSize.right += 0;
        break;
      default:
        let middle: number = bounds.height / 2;
        partSize.left += middle;
        partSize.right += middle;
    }
    return partSize;
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
export class FlowLayout<G extends fabric.Group, T extends fabric.Object, O extends IFlowLayoutOptions<T>> extends AbstractLayout<G, T, O> {
  
  constructor(container: Composite<G>, options?: O) {
    super(container, options);
  }

  /**
   * @override
   * @param container 
   * @param options 
   */
  protected _init(container: Composite<G>, options?: O) {
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
    let leftEdgeMargin: number = util.max([this.options.marginWidth || 0, this.options.marginLeft || 0], null),
        rightEdgeMargin: number = util.max([this.options.marginWidth || 0, this.options.marginRight || 0], null),
        topEdgeMargin: number = util.max([this.options.marginHeight || 0, this.options.marginTop || 0], null),
        bottomEdgeMargin: number = util.max([this.options.marginHeight || 0, this.options.marginBottom || 0], null),
        width: number = 0,
        height: number = 0;
        
    let xOffset: number = 0;
    let yOffset: number = 0;

    if (this.options.orientation === Orientation.HORIZONTAL) {

      xOffset += leftEdgeMargin;
      yOffset += topEdgeMargin;
      width += leftEdgeMargin;
      
      let alignPartSize: AlignmentPartSize = {'up': 0, 'down': 0};
      let subPartSize: AlignmentPartSize[] = new Array<AlignmentPartSize>(this.options.elements.length);

      // Compute boundary of each element and set left of each element.
      for (let i = 0; i < this.options.elements.length; i++) {
        if (i > 0) {
          width += (this.options.hSpace ? this.options.hSpace : this.options.space) || 0;
          xOffset += (this.options.hSpace ? this.options.hSpace : this.options.space) || 0;
        }

        let component: IComponent<T> = this.options.elements[i];
        let compBounds: Boundary;
         // If sub component is a container then do layout first.
        if (component instanceof Composite) {
          if (!(component as Composite<G>).isValid()) {
            (component as Composite<G>).doLayout();
          }
          compBounds = component.calcBounds(false, false);
        } else {
          compBounds = component.calcBounds(false, !component.isValid());
        }        
        // Temporarily set left and top to calculate element's width and height.
        component.selfFabricObject().set({ 'left': compBounds.left + xOffset, 'top': compBounds.top + yOffset } as object);
        width += compBounds.width;
        xOffset += compBounds.width;

        if (component instanceof Composite) {
          let layoutData: FlowData<T> = (component as Composite<G>).getLayoutData() as FlowData<T>;
          subPartSize[i] = layoutData.calcAlignmentPartSize(Orientation.HORIZONTAL, false);
          alignPartSize.up = util.max([alignPartSize.up, subPartSize[i].up], null);
          alignPartSize.down = util.max([alignPartSize.down, subPartSize[i].down], null);
        }

        // Calculate max height.
        height = util.max([height, alignPartSize.up + alignPartSize.down], null);
      }

      xOffset += rightEdgeMargin;
      // Since the default originX/originY is center of container, so the top value of sub components is negative value.
      yOffset = -height / 2;
      width += rightEdgeMargin;
      height += topEdgeMargin + bottomEdgeMargin;

      // Set top position of each element according to total height and element original setting.
      for (let i = 0; i < this.options.elements.length; i++) {
        let component: IComponent<T> = this.options.elements[i];
        // Temporarily set left and top to calculate element's width and height.
        component.selfFabricObject().set({ 'top':  yOffset + (alignPartSize.up - subPartSize[i].up)} as object);
      }

    } else {
      // Orientation is Vertical
      xOffset += leftEdgeMargin;
      yOffset += topEdgeMargin;
      height += topEdgeMargin;

      let alignPartSize: AlignmentPartSize = {'left': 0, 'right': 0};
      let subPartSize: AlignmentPartSize[] = new Array<AlignmentPartSize>(this.options.elements.length);

      // Compute boundary of each element and set left of each element.
      for (let i = 0; i < this.options.elements.length; i++) {
        if (i > 0) {
          height += (this.options.vSpace ? this.options.vSpace : this.options.space) || 0;
          yOffset += (this.options.vSpace ? this.options.vSpace : this.options.space) || 0;
        }

        let component: IComponent<T> = this.options.elements[i];
        let compBounds: Boundary;
         // If sub component is a container then do layout first.
        if (component instanceof Composite) {
          if (!(component as Composite<G>).isValid()) {
            (component as Composite<G>).doLayout();
          }
          compBounds = component.calcBounds(false, false);
        } else {
          compBounds = component.calcBounds(false, !component.isValid());
        }
        // Temporarily set left and top to calculate element's width and height.
        component.selfFabricObject().set({ 'top': compBounds.top + yOffset, 'left': compBounds.left + xOffset } as object);
        height += compBounds.height;
        yOffset += compBounds.height;

        if (component instanceof Composite) {
          let layoutData: FlowData<T> = (component as Composite<G>).getLayoutData() as FlowData<T>;
          subPartSize[i] = layoutData.calcAlignmentPartSize(Orientation.VERTICAL, false);
          alignPartSize.left = util.max([alignPartSize.left, subPartSize[i].left], null);
          alignPartSize.right = util.max([alignPartSize.right, subPartSize[i].right], null);
        }

        // Calculate max height.
        width = util.max([width, alignPartSize.left + alignPartSize.left], null);
      }

      yOffset += bottomEdgeMargin;
      // Since the default originX/originY is center of container, so the top value of sub components is negative value.
      xOffset = -width / 2;
      height += bottomEdgeMargin;
      width += leftEdgeMargin + rightEdgeMargin;

      // Set top position of each element according to total height and element original setting.
      for (let i = 0; i < this.options.elements.length; i++) {
        let component: IComponent<T> = this.options.elements[i];
        // Temporarily set left and top to calculate element's width and height.
        component.selfFabricObject().set({ 'left':  xOffset + (alignPartSize.left - subPartSize[i].left)} as object);
      }
    }

    // Set container's width and height.
    this.container.set({'width': width, 'height': height});
  }

}
  