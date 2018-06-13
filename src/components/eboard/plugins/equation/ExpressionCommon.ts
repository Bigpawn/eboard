/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-13 22:26:30
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-13 23:36:52
 */

/**
 * Define expression align
 */
export enum Orientation {
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical",
}

/**
 * Interface of expression.
 */
export interface IExpression {
    /**
     * Return children layout of this expression.
     */
    getLayout(): ILayout;

    /**
     * Return layout setting of this expression.
     */
    getLayoutData(): ILayoutData;
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
     * Return count of all available elements.
     */
    count(): number;

    /**
     * Return first available element according to layout element order rule.
     */
    first(): IExpression;

    /**
     * Return last available element according to layout element order rule.
     */
    last(): IExpression;

    /**
     * Return element next to specified element according to layout element order rule.
     * 
     * @param expression 
     */
    next(expression: IExpression): IExpression;

    /**
     * Return element previous to specified element according to layout element order rule.
     * 
     * @param expression 
     */
    previous(expression: IExpression): IExpression;

    /**
     * Return element/elements according to specfied props.
     * 
     * @param props 
     */
    valueOf(...props: any[]): any;

    /**
     * Return element according to specified index.
     * 
     * @param expression
     */
    indexOf(expression: IExpression): number;
}

/**
 * Interface of layout data.
 */
export interface ILayoutData {
}

/**
 * Abstract layout.
 */
export abstract class AbstractLayout implements ILayout {
    /**
     * Container which the layout belongs to.
     */
    container: IExpression;

    constructor(container: IExpression) {
        this.container = container;
    }

    abstract count(): number;
    abstract first(): IExpression;
    abstract last(): IExpression;
    abstract next(expression: IExpression): IExpression;
    abstract previous(expression: IExpression): IExpression;
    abstract valueOf(...props: any[]): IExpression;
    abstract indexOf(expression: IExpression): number;
}
