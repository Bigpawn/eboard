/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-13 22:42:44
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-14 15:05:33
 */
import { Composite, AbstractLayout, ILayoutOptions, IComponent } from './LayoutCommon';

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
export interface IBorderLayoutOptions<T extends fabric.Object> extends ILayoutOptions {
    /**
     * All elements which are managed by flow layout.
     */
    elements?: IComponent<T>[]; 
}

/**
 * The element order of border layout is top, left, center, right and bottom.
 */
export class BorderLayout<S extends fabric.Group, T extends fabric.Object, E extends IBorderLayoutOptions<T>> extends AbstractLayout<S, T, E> {

    elements: IComponent<T>[];

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
            this.options.elements = new Array(5);
        }
    }

    getTop(): IComponent<T> {
        return this.options.elements[BorderElementPosition.TOP];
    }

    setTop(top: IComponent<T>) {
        this.options.elements[BorderElementPosition.TOP] = top;
    }

    getBottom(): IComponent<T> {
        return this.options.elements[BorderElementPosition.BOTTOM];
    }

    setBottom(bottom: IComponent<T>) {
        this.options.elements[BorderElementPosition.BOTTOM] = bottom;
    }

    getLeft(): IComponent<T> {
        return this.options.elements[BorderElementPosition.LEFT];
    }

    setLeft(left: IComponent<T>) {
        this.options.elements[BorderElementPosition.LEFT] = left;
    }

    getRight(): IComponent<T> {
        return this.options.elements[BorderElementPosition.RIGHT];
    }

    setRight(right: IComponent<T>) {
        this.options.elements[BorderElementPosition.RIGHT] = right;
    }

    getCenter(): IComponent<T> {
        return this.options.elements[BorderElementPosition.CENTER];
    }

    setCenter(center: IComponent<T>) {
        this.options.elements[BorderElementPosition.CENTER] = center;
    }

    /**
     * @override
     */
    count(): number {
        let num: number = 0;
        this.options.elements.map(
            (value: IComponent<T>, index: number) => {
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
    first(): IComponent<T> {
        let ele: IComponent<T>;
        this.options.elements.map(
            (value: IComponent<T>, index: number) => {
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
    last(): IComponent<T> {
        let ele: IComponent<T>;
        this.options.elements.slice(0).reverse().map(
            (value: IComponent<T>, index: number) => {
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
    next(component: IComponent<T>): IComponent<T> {
        let skip: boolean = true, ele: IComponent<T>;
        this.options.elements.map(
            (value: IComponent<T>, index: number) => {
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
    previous(component: IComponent<T>): IComponent<T> {
        let skip: boolean = true, ele: IComponent<T>;
        this.options.elements.slice(0).reverse().map(
            (value: IComponent<T>, index: number) => {
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
    valueOf(prop: BorderElementPosition): IComponent<T> {
        return this._get(prop);
    }

    /**
     * @override
     * @param component 
     */
    indexOf(component: IComponent<T>): number {
        return this.options.elements.indexOf(component);
    }

    protected _get(index: BorderElementPosition): IComponent<T> {
        let _index: number = index;
        if (_index > -1 && _index < this.options.elements.length) {
            return this.options.elements[_index];
        }
        return null;
    }
}