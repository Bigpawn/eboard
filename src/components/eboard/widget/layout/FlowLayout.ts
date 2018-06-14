/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-13 22:29:18
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-14 15:03:40
 */
import { Composite, Orientation, AbstractLayout, ILayoutOptions } from './LayoutCommon';

export interface IFlowLayoutOptions extends ILayoutOptions {
    /**
     * Indicates arrange orientation of elements, could be vertical or horizontal, default is horizontal.
     */    
    orientation?: Orientation;

    /**
     * All elements which are managed by flow layout.
     */
    elements?: fabric.Object[]; 
}

/**
 * Most of expressions use FlowLayout, e.g. expression 'X = 2 + 3'
 */
export class FlowLayout<T extends IFlowLayoutOptions> extends AbstractLayout<IFlowLayoutOptions> {
  
    constructor(container: Composite, options?: T) {
      super(container, options);
    }

    /**
     * @override
     * @param container 
     * @param options 
     */
    protected _init(container: Composite, options?: T) {
        super._init(container, options);
        if (!this.options.orientation) {
            this.options.orientation =  Orientation.HORIZONTAL;
        }
        if (!this.options.elements) {
            this.options.elements = [];
        }
    }
  
    public add(component: fabric.Object, index?: number) {
      if (!index || index === 0) {
        this.options.elements.push(component);
      } else {
        this.options.elements.splice( index, 0, component );
      }
    }
  
    public remove(component: fabric.Object): number {
      let index: number = this.options.elements.indexOf(component);
      if (index > -1) {
        this.options.elements.splice(index, 1);
      }
      return index;
    }
  
    public removeByIndex(index: number): fabric.Object {
      if (index > -1 && index < this.options.elements.length) {
        let expr: fabric.Object = this.options.elements[index];
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
    first(): fabric.Object {
      return this.options.elements[0] ? this.options.elements[0] : null;
    }
  
    /**
     * @override
     */
    last(): fabric.Object {
      if (this.options.elements && this.options.elements.length > 0) {
        return this.options.elements[this.options.elements.length - 1];
      }
  
      return null;
    }
  
    /**
     * @override
     * @param expression 
     */
    next(component: fabric.Object): fabric.Object {
      let index = this.options.elements.indexOf(component);
      return this._get(index + 1);
    }
  
    /**
     * @override
     * @param expression 
     */
    previous(component: fabric.Object): fabric.Object {
      let index = this.options.elements.indexOf(component);
      return this._get(index - 1);
    }
  
    /**
     * @override
     * @param index 
     */
    valueOf(index?: number): fabric.Object {
      return this._get(index);
    }

    /**
     * @override
     * @param expression 
     */
    indexOf(component: fabric.Object): number {
        return this.options.elements.indexOf(component);
    }

    protected _get(index: number): fabric.Object {
        if (index > -1 && index < this.options.elements.length) {
          return this.options.elements[index];
        }
        return null;
    }
}
  