/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-21 18:01:23
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-27 15:46:26
 */
import * as _ from 'lodash';
import { fabric } from 'fabric';

export enum Alignment {
    LEFT = 'left',
    RIGHT = 'right',
    TOP = 'top',
    BOTTOM = 'bottom',
    CENTER = 'center',
}

export interface Boundary {
    left: number;
    top: number;
    width: number;
    height: number;
}
/**
 * Define expression align
 */
export enum Orientation {
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical",
}

/**
 * IComponent interface defines basic class of all other UI objects.
 */
export interface IComponent<T extends fabric.Object> {
    /**
     * Return this as type of fabric.Object.
     */
    selfFabricObject(): T;

    /**
     * Set layout data.
     * 
     * @param layouData
     */
    setLayoutData(layouData: ILayoutData): void;

    /**
     * Return layout setting of this expression.
     */
    getLayoutData(): ILayoutData;

    /**
     * Calculate bounds of component.
     * 
     * @param absolute
     * @param recalculate
     */
    calcBounds(absolute?: boolean, recalculate?: boolean): Boundary;

    invalidate(): void;

    validate(): void;

    revalidate(): void;

    isValid(): boolean;
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
export interface ILayout<T extends fabric.Object> {

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
    flushCache(): void;

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
    first(): IComponent<T>|null;

    /**
     * Return last available element according to layout element order rule.
     */
    last(): IComponent<T>|null;

    /**
     * Return element next to specified element according to layout element order rule.
     * 
     * @param component 
     */
    next(component: IComponent<T>): IComponent<T>|null;

    /**
     * Return element previous to specified element according to layout element order rule.
     * 
     * @param component 
     */
    previous(component: IComponent<T>): IComponent<T>|null;

    /**
     * Return element/elements according to specfied props.
     * 
     * @param first parameter
     * @param second paramter
     */
    valueOf(a: any, b?: any): any;

    /**
     * Return element according to specified index.
     * 
     * @param component
     */
    indexOf(component: IComponent<T>): any;
}

/**
 * Interface of layout data.
 */
export interface ILayoutData {
}
/**
 * IComposite interface defines UI container class.
 */
export interface IComposite<G extends fabric.Group> extends IComponent<G> {
    /**
     * Return children layout of this expression.
     */
    getLayout(): ILayout<G>;
}

export interface ICompositeOptions extends fabric.IObjectOptions {

}

/**
 * Composite class defines common functions of UI container.
 */
export class Composite<G extends fabric.Group> extends fabric.Group implements IComposite<G> {

    parent: Composite<G>;

    options: ICompositeOptions;

    /**
     * layout specifies layout of the composite.
     */
    layout: ILayout<G>;

    /**
     * layoutData specifies layout values of the component in container.
     */
    layoutData: ILayoutData;

    valid: boolean = false;

    constructor(parent: Composite<G>, items?: any[], options?: ICompositeOptions) {
        super(items, options);
        this.parent = parent;
        this.options = options || {};
    }

    /**
     * Return children layout of this expression.
     */
    public getLayout(): ILayout<G> {
        return this.layout;
    }

    /**
     * Return this as type of Composite.
     */
    public selfFabricObject(): G {
        let thiz: any = this;
        return thiz as G;
    }

    /**
     * Set layout data.
     *
     * @param layou
     */
    public setLayout(layout: ILayout<G>): void {
        this.layout = layout;
    }

    /**
     * Return layout setting of this expression.
     */
    public getLayoutData(): ILayoutData {
        return this.layoutData;
    }

    /**
     * Set layout data.
     * 
     * @override
     * @param layouData
     */
    public setLayoutData(layouData: ILayoutData): void {
        this.layoutData = layouData;
    }

    public doLayout(): void {
        this.layout.layout();
        this.addWithUpdate(undefined as any);
        this.valid = true;
    }

    public calcBounds(absolute?: boolean, recalculate?: boolean): Boundary {
        return this.getBoundingRect(absolute, recalculate) as Boundary;
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
            this.doLayout();
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

/**
 * Basic layout options.
 */
export interface ILayoutOptions {
    
    /**
     * marginLeft specifies the number of pixels of horizontal margin that will be placed along the left edge of the layout.
     */
    marginLeft?: number;

    /**
     * marginRight specifies the number of pixels of horizontal margin that will be placed along the right edge of the layout.
     */
    marginRight?: number;

    /**
     * marginTop specifies the number of pixels of vertical margin that will be placed along the top edge of the layout.
     */
    marginTop?: number;

    /**
     * marginBottom specifies the number of pixels of vertical margin that will be placed along the bottom edge of the layout.
     */
    marginBottom?: number;

    /**
     * marginHeight specifies the number of pixels of vertical margin that will be placed along the top and bottom edges of the layout.
     */
    marginHeight?: number;

    /**
     * marginWidth specifies the number of pixels of horizontal margin that will be placed along the left and right edges of the layout.
     */
    marginWidth?: number;

    /**
     * spacing specifies the number of pixels between the edge of one control and the edge of its neighbouring control.
     */
    space?: number;

    /**
     * vSpace specifies the number of pixels of vertical space between the edge of one control and the edge of its neighbouring control.
     */
    hSpace?: number;

    /**
     * hSpace specifies the number of pixels of horizontal space between the edge of one control and the edge of its neighbouring control.
     */
    vSpace?: number;
}

/**
 * Abstract layout.
 */
export abstract class AbstractLayout<G extends fabric.Group, T extends fabric.Object, O extends ILayoutOptions> implements ILayout<T> {

    /**
     * Container which the layout belongs to.
     */
    container: Composite<G>;

    options: O;
    
    constructor(container: Composite<G>, options?: O) {
        this.container = container;
        this._init(container, options);
    }

    protected _init(container: Composite<G>, options?: O) {
        this.options = options || {} as O;
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
    public computeSize(wHint: number, hHInt: number, flushCache: boolean): fabric.Point {
        let composite: any = this.container;
        let rect: any = composite.getBoundingRect();
        return new fabric.Point(rect.width, rect.height);
    }

    /**
     * Instruct the layout to flush any cached values associated with the control specified in the argument control.
     */
    public flushCache(): void {
        // TODO ...
    }
    
    /**
     * Lays out the children of the specified composite according to this layout.
     * @param flushCache
     */
    public layout(flushCache?: boolean): void {
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
        throw new Error("Method not implemented.");
    }

    abstract count(): number;
    abstract first(): IComponent<T>|null;
    abstract last(): IComponent<T>|null;
    abstract next(component: IComponent<T>): IComponent<T>|null;
    abstract previous(component: IComponent<T>): IComponent<T>|null;
    abstract valueOf(a: any, b: any): any;
    abstract indexOf(component: IComponent<T>): any;
}
