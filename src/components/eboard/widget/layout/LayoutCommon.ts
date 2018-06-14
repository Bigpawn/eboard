/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-13 22:26:30
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-14 15:02:27
 */
import * as _ from 'lodash';

/**
 * Define expression align
 */
export enum Orientation {
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical",
}

/**
 * 
 */
export interface IControl {
    /**
     * Return layout setting of this expression.
     */
    getLayoutData(): ILayoutData;
}

/**
 * Interface of expression.
 */
export interface IComposite extends IControl {
    /**
     * Return children layout of this expression.
     */
    getLayout(): ILayout;
}

export class Composite extends fabric.Group implements IComposite {
    layout: ILayout;

    layoutData: ILayoutData;
    
    /**
     * Return children layout of this expression.
     */
    getLayout(): ILayout {
        return this.layout;
    }

    /**
     * Set layout data.
     *
     * @param layou
     */
    setLayout(layout: ILayout): void {
        this.layout = layout;
    }

    /**
     * Return layout setting of this expression.
     */
    getLayoutData(): ILayoutData {
        return this.layoutData;
    }

    /**
     * Set layout data.
     *
     * @param layouData
     */
    setLayoutData(layouData: ILayoutData): void {
        this.layoutData = layouData;
    }
}

/**
 * Layout type definition.
 */
export enum LayoutType {
    FLOW_LAYOUT = "flow_layout",
    BORDER_LAYOUT = "border_layout",
    FORM_LAYOUT = "form_layout",
    GRID_LAYOUT = 'grid_layout',
}

/**
 * Interface of layout.
 */
export interface ILayout {

    /**
     * Computes and returns the size of the specified composite's client area according to this layout.
     * 
     * @param wHint 
     * @param hHInt 
     * @param flushCache 
     */
    computeSize(wHint: number, hHInt: number, flushCache: boolean): fabric.Point;

    /**
     * Instruct the layout to flush any cached values associated with the control specified in the argument control.
     */
    flushCache(): boolean;

    /**
     * Lays out the children of the specified composite according to this layout.
     * @param flushCache 
     */
    layout(flushCache?: boolean): void;

    /**
     * Return count of all available elements.
     */
    count(): number;

    /**
     * Return first available element according to layout element order rule.
     */
    first(): fabric.Object;

    /**
     * Return last available element according to layout element order rule.
     */
    last(): fabric.Object;

    /**
     * Return element next to specified element according to layout element order rule.
     * 
     * @param component 
     */
    next(component: fabric.Object): fabric.Object;

    /**
     * Return element previous to specified element according to layout element order rule.
     * 
     * @param component 
     */
    previous(component: fabric.Object): fabric.Object;

    /**
     * Return element/elements according to specfied props.
     * 
     * @param first parameter
     * @param second paramter
     */
    valueOf(a: any, b: any): any;

    /**
     * Return element according to specified index.
     * 
     * @param component
     */
    indexOf(component: fabric.Object): any;
}

/**
 * Interface of layout data.
 */
export interface ILayoutData {
}

/**
 * Basic layout options.
 */
export interface ILayoutOptions {
    
    /**
     * marginLeft specifies the number of pixels of horizontal margin that will be placed along the left edge of the layout.
     */
    marginLeft?: number | string;

    /**
     * marginRight specifies the number of pixels of horizontal margin that will be placed along the right edge of the layout.
     */
    marginRight?: number | string;

    /**
     * marginTop specifies the number of pixels of vertical margin that will be placed along the top edge of the layout.
     */
    marginTop?: number | string;

    /**
     * marginBottom specifies the number of pixels of vertical margin that will be placed along the bottom edge of the layout.
     */
    marginBottom?: number | string;

    /**
     * marginHeight specifies the number of pixels of vertical margin that will be placed along the top and bottom edges of the layout.
     */
    marginHeight?: number | string;

    /**
     * marginWidth specifies the number of pixels of horizontal margin that will be placed along the left and right edges of the layout.
     */
    marginWidth?: number | string;

    /**
     * spacing specifies the number of pixels between the edge of one control and the edge of its neighbouring control.
     */
    space?: number | string;
}

/**
 * Abstract layout.
 */
export abstract class AbstractLayout<T extends ILayoutOptions> implements ILayout {

    /**
     * Container which the layout belongs to.
     */
    container: Composite;

    options: T;
    
    constructor(container: Composite, options?: T) {
        this.container = container;
        this._init(container, options);
    }

    protected _init(container: Composite, options?: T) {
        this.options = options || {} as T;
    }

    public getOption(optName: string): any {
        let optObj: any = this.options;
        return optObj[optName];
    }

    public setOptions(options: any) {
        let opts: any = {};
        _.defaultsDeep(opts, options, this.options);
        this.options = opts;
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
     * Instruct the layout to flush any cached values associated with the control specified in the argument control.
     */
    flushCache(): boolean {
        throw new Error("Method not implemented.");
    }
    
    /**
     * Lays out the children of the specified composite according to this layout.
     * @param flushCache
     */
    layout(flushCache?: boolean): void {
        throw new Error("Method not implemented.");
    }

    abstract count(): number;
    abstract first(): fabric.Object;
    abstract last(): fabric.Object;
    abstract next(component: fabric.Object): fabric.Object;
    abstract previous(component: fabric.Object): fabric.Object;
    abstract valueOf(a: any, b: any): any;
    abstract indexOf(component: fabric.Object): any;
}
