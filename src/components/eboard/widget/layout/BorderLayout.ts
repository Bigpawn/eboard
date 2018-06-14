/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-13 22:42:44
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-14 15:05:33
 */
import { Composite, AbstractLayout, ILayoutOptions } from './LayoutCommon';

/**
 * Define order of border element.
 */
export enum BorderElementPosition {
    TOP = 0,
    LEFT = 1,
    CENTER = 2,
    RIGHT = 3,
    BOTTOM = 4,
}

/**
 * Border layout options.
 */
export interface IBorderLayoutOptions extends ILayoutOptions {
    /**
     * All elements which are managed by flow layout.
     */
    elements?: fabric.Object[]; 
}

/**
 * The element order of border layout is top, left, center, right and bottom.
 */
export class BorderLayout extends AbstractLayout<IBorderLayoutOptions> {

    elements: fabric.Object[];

    constructor(container: Composite, options?: IBorderLayoutOptions) {
        super(container, options);
    }
  
    /**
     * @override
     * @param container 
     * @param options 
     */
    protected _init(container: Composite, options?: IBorderLayoutOptions) {
        super._init(container, options);
        if (!this.options.elements) {
            this.options.elements = new Array(5);
        }
    }

    getTop(): fabric.Object {
        return this.options.elements[BorderElementPosition.TOP];
    }

    setTop(top: fabric.Object) {
        this.options.elements[BorderElementPosition.TOP] = top;
    }

    getBottom(): fabric.Object {
        return this.options.elements[BorderElementPosition.BOTTOM];
    }

    setBottom(bottom: fabric.Object) {
        this.options.elements[BorderElementPosition.BOTTOM] = bottom;
    }

    getLeft(): fabric.Object {
        return this.options.elements[BorderElementPosition.LEFT];
    }

    setLeft(left: fabric.Object) {
        this.options.elements[BorderElementPosition.LEFT] = left;
    }

    getRight(): fabric.Object {
        return this.options.elements[BorderElementPosition.RIGHT];
    }

    setRight(right: fabric.Object) {
        this.options.elements[BorderElementPosition.RIGHT] = right;
    }

    getCenter(): fabric.Object {
        return this.options.elements[BorderElementPosition.CENTER];
    }

    setCenter(center: fabric.Object) {
        this.options.elements[BorderElementPosition.CENTER] = center;
    }

    /**
     * @override
     */
    count(): number {
        let num: number = 0;
        this.options.elements.map(
            (value: fabric.Object, index: number) => {
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
    first(): fabric.Object {
        let ele: fabric.Object;
        this.options.elements.map(
            (value: fabric.Object, index: number) => {
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
    last(): fabric.Object {
        let ele: fabric.Object;
        this.options.elements.slice(0).reverse().map(
            (value: fabric.Object, index: number) => {
                if (!ele && value) {
                    ele = value;
                }
            }
        );
        return ele;
    }

    /**
     * @override
     * @param component 
     */
    next(component: fabric.Object): fabric.Object {
        let skip: boolean = true, ele: fabric.Object;
        this.options.elements.map(
            (value: fabric.Object, index: number) => {
                if (!skip && !ele && value) {
                    ele = value;
                }

                if (value === component) {
                    skip = false;
                }
            }
        );
        return ele;
    }

    /**
     * @override
     * @param component 
     */
    previous(component: fabric.Object): fabric.Object {
        let skip: boolean = true, ele: fabric.Object;
        this.options.elements.slice(0).reverse().map(
            (value: fabric.Object, index: number) => {
                if (!skip && !ele && value) {
                    ele = value;
                }

                if (value === component) {
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
    valueOf(prop: BorderElementPosition): fabric.Object {
        return this._get(prop);
    }

    /**
     * @override
     * @param component 
     */
    indexOf(component: fabric.Object): number {
        return this.options.elements.indexOf(component);
    }

    protected _get(index: BorderElementPosition): fabric.Object {
        let _index: number = index;
        if (_index > -1 && _index < this.options.elements.length) {
            return this.options.elements[_index];
        }
        return null;
    }
}