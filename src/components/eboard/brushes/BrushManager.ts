/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-05-28 20:01:42
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-01 13:39:41
 */
import { BrushType } from "./BrushType";
import AbstractBrush from "./AbstractBrush";
import { IBrushOptions } from "./IBrush";
import PencilBrush from "./shape/twodims/PencilBrush";
import LineBrush from "./shape/twodims/LineBrush";
import PointerBrush from "./PointerBrush";
import RectangleBrush from "./shape/twodims/RectangleBrush";
import CircleBrush from "./shape/twodims/CircleBrush";
import PolygonBrush from "./shape/twodims/PolygonBrush";

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
                brush = new LineBrush(options);
                break;
            
            case BrushType.RECTANGLE_BRUSH:
                brush = new RectangleBrush(options);
                break;
                
            case BrushType.CIRCLE_BRUSH:
                brush = new CircleBrush(options);
                break;

            case BrushType.POLYGON_BRUSH:
                brush = new PolygonBrush(options);
                break;
                
            case BrushType.TEXT_BRUSH:      
            case BrushType.TRIANGLE_BRUSH:
            
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