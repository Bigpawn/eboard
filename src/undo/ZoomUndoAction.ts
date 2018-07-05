/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-07 09:11:03
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-07-05 15:39:32
 */
import { FabricObservingEventType, IZoomEvent } from '../mixins/FabricEvents';
import { AbstractUndoAction} from '../mixins/Undo';
import EBoardEngine from '../EBoardEngine';
/**
 * "path:created" undo/redo action.
 */
export default class ZoomUndoAction extends AbstractUndoAction {
    constructor(event: IZoomEvent) {
        super(event);
    }
    
    /**
     * @override
     */
    public getType(): any {
        return FabricObservingEventType.ZOOM_AFTER;
    }

    /**
     * @override
     * @param eBoardEngine 
     */
    undo(eBoardEngine: EBoardEngine): void {
        let event = this.event as IZoomEvent;
        eBoardEngine.getEBoardCanvas().setViewportTransform(event.oldVpt);
    }

    /**
     * @override
     * @param eBoardEngine 
     */
    redo(eBoardEngine: EBoardEngine): void {
        let event = this.event as IZoomEvent;
        eBoardEngine.getEBoardCanvas().setViewportTransform(event.lastVpt);
    }
}