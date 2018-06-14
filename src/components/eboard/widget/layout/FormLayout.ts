/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-13 23:25:09
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-14 15:04:28
 */
import { Composite, ILayoutData } from './LayoutCommon';
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
export class FormData implements ILayoutData {
    /**
     * bottom specifies the attachment of the bottom of the control.
     */
    bottom?: FormAttachment;

    /**
     * left specifies the attachment of the left side of the control.
     */
    left?: FormAttachment;

    /**
     * right specifies the attachment of the right side of the control.
     */
    right?: FormAttachment;

    /**
     * top specifies the attachment of the top of the control.
     */
    top?: FormAttachment;

    /**
     * height specifies the preferred height in pixels.
     */
    height?: number | string;

    /**
     * width specifies the preferred width in pixels.
     */
    width?: number | string;
}

export class FormAttachment {
    /**
     * alignment specifies the alignment of the control side that is attached to a control.
     */
    alignment?: FormAlignment;
    
    /**
     * control specifies the control to which the control side is attached.
     */
    control?: fabric.Object;

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
    static newWithControl(component: fabric.Object, offset?: number, alignment?: FormAlignment): FormAttachment {
        let form = new FormAttachment();
        form.control = component;
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
    static newWithNumerator(numerator: number, offset?: number, demoninator?: number): FormAttachment {
        let form = new FormAttachment();
        form.numerator = numerator;
        form.offset = offset;
        form.denominator = demoninator;
        return form;
    }

}

/**
 * Border layout options.
 */
export interface IFormLayoutOptions extends IFlowLayoutOptions {

}

/**
 * 
 */
export class FormLayout extends FlowLayout<IFormLayoutOptions> {

    constructor(container: Composite, options?: IFormLayoutOptions) {
        super(container, options);
      }
  
    /**
     * @override
     * @param container 
     * @param options 
     */
    protected _init(container: Composite, options?: IFormLayoutOptions) {
        this.options = options || {} as IFormLayoutOptions;
        if (!this.options.elements) {
            this.options.elements = [];
        }
    }
}