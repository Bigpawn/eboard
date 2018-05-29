/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-28 20:01:42
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-05-29 19:19:01
 */
import { BrushType } from "./BrushType";
import { AbstractBrush } from "./AbstractBrush";
import { IBrushOptions } from "./IBrush";
import PencilBrush from "./PencilBrush";
import PointerBrush from "./PointerBrush";

/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-27 21:13:52
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-05-28 00:10:49
 */

 /**
  * The class manages brushes.
  */
export default class BrushManager {
 
    /**
     * Instance cache of created brushes.
     */
    brushes: AbstractBrush[];

    /**
     * Current selected brush instance.
     */
    selected: AbstractBrush;

    constructor() {
        this.brushes = [];
    }
    
    getCurrentBrush(): AbstractBrush {
        return this.selected;
    }   
    
    /**
     * Selected cached brush instance or create a new one.
     * 
     * @param brushType 
     * @param options 
     * @param renew 
     */
    selectBrush(brushType: BrushType, options?: IBrushOptions, renew: boolean = false): AbstractBrush {
       if (!renew && this.brushes[brushType]) {
           this.selected = this.brushes[brushType];
       } else {
           this.selected = this.createBrush(brushType, options);
           this.brushes[brushType] = this.selected;
       }
       return this.selected;
    }

    /**
     * Create a brush instance.
     * 
     * @param brushType 
     * @param options 
     */
    createBrush(brushType: BrushType, options?: IBrushOptions): AbstractBrush {
        let brush: AbstractBrush;
        switch (brushType) {
            case BrushType.PENCEIL_BRUSH:
                brush = new PencilBrush(options);
                break;
            case BrushType.LINE_BRUSH:
            case BrushType.TEXT_BRUSH:
            case BrushType.CIRCLE_BRUSH:
            case BrushType.RECTANGLE_BRUSH:
            case BrushType.TRIANGLE_BRUSH:
            case BrushType.POLYGON_BRUSH:
                brush = new PointerBrush(options);
                break;
            default:
                brush = new PointerBrush(options);
        }
        this.brushes[brushType] = brush;
        return brush;
    }
    
    /**.
     * 
     * @param brushType 
     */
    isPointerBrush(brushType: BrushType): boolean {
        return brushType === BrushType.POINTER_BRUSH;
    }
}