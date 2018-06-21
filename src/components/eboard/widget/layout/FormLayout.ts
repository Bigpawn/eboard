/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-13 23:25:09
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-14 15:04:28
 */
import { fabric } from 'fabric';
import { Composite, ILayoutData, IComponent } from './LayoutCommon';
import { FlowLayout, IFlowLayoutOptions } from './FlowLayout';

/**
 * alignment specifies the alignment of the control side that is attached to a control.
 */
export enum FormAlignment {
    /**
     * Attach the side to the top side of the specified control.
     */
    TOP = 0,

    /**
     * Attach the side to the bottom side of the specified control.
     */
    BOTTOM = 1,

    /**
     * Attach the side to the left side of the specified control.
     */
    LEFT = 2,

    /**
     * Attach the side to the right side of the specified control.
     */
    RIGHT = 3,

    /**
     * Attach the side at a position which will center the control on the specified control.
     */
    CENTER = 4,

    /**
     * Attach the side to the adjacent side of the specified control.
     */
    DEFAULT = 5, 
}

/**
 * 
 */
export class FormData<T extends fabric.Object> implements ILayoutData {
    /**
     * bottom specifies the attachment of the bottom of the control.
     */
    bottom?: FormAttachment<T>;

    /**
     * left specifies the attachment of the left side of the control.
     */
    left?: FormAttachment<T>;

    /**
     * right specifies the attachment of the right side of the control.
     */
    right?: FormAttachment<T>;

    /**
     * top specifies the attachment of the top of the control.
     */
    top?: FormAttachment<T>;

    /**
     * height specifies the preferred height in pixels.
     */
    height?: number | string;

    /**
     * width specifies the preferred width in pixels.
     */
    width?: number | string;
}

export class FormAttachment<T extends fabric.Object> {
    /**
     * alignment specifies the alignment of the control side that is attached to a control.
     */
    alignment?: FormAlignment;
    
    /**
     * component specifies the component to which the component side is attached.
     */
    component?: IComponent<T>;

    /**
     * denominator specifies the denominator of the "a" term in the equation, y = ax + b, which defines the attachment.
     */
    denominator?: number;

    /**
     * numerator specifies the numerator of the "a" term in the equation, y = ax + b, which defines the attachment.
     */
    numerator?: number;

    /**
     * offset specifies the offset, in pixels, of the control side from the attachment position.
     */
    offset?: number | string;

    private constructor() {
        // Do nothing.    
    }

    /**
     * Constructs a new instance of this class given a expression, an offset and an alignment.
     * 
     * @param component 
     * @param offset 
     * @param alignment 
     */
    static newWithControl<E extends fabric.Object>(component: IComponent<E>, offset?: number, alignment?: FormAlignment): FormAttachment<E> {
        let form = new FormAttachment<E>();
        form.component = component;
        form.offset = offset;
        form.alignment = alignment;
        return form;
    }

    /**
     * Constructs a new instance of this class given a numerator and denominator and an offset.
     * 
     * @param numerator 
     * @param offset 
     * @param demoninator 
     */
    static newWithNumerator<E extends fabric.Object>(numerator: number, offset?: number, demoninator?: number): FormAttachment<E> {
        let form = new FormAttachment<E>();
        form.numerator = numerator;
        form.offset = offset;
        form.denominator = demoninator;
        return form;
    }

}

/**
 * Border layout options.
 */
export interface IFormLayoutOptions<T extends fabric.Object> extends IFlowLayoutOptions<T> {

}

/**
 * 
 */
export class FormLayout<S extends fabric.Group, T extends fabric.Object, E extends IFormLayoutOptions<T>> extends FlowLayout<S, T, E> {

    constructor(container: Composite<S>, options?: E) {
        super(container, options);
      }
  
    /**
     * @override
     * @param container 
     * @param options 
     */
    protected _init(container: Composite<S>, options?: E) {
        this.options = options || {} as E;
        if (!this.options.elements) {
            this.options.elements = [];
        }
    }
}