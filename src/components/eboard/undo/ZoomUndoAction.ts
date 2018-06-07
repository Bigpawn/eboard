/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-07 09:11:03
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-07 09:27:12
 */
import { FabricEventType, ZoomEvent } from '../mixins/FabricEvents';
import { AbstractUndoAction} from '../mixins/Undo';
import EBoardEngine from '../EBoardEngine';
/**
 * "path:created" undo/redo action.
 */
export default class ZoomUndoAction extends AbstractUndoAction {
    constructor(event: ZoomEvent) {
        super(event);
    }
    
    /**
     * @override
     */
    public getType(): any {
        return FabricEventType.ZOOM_AFTER;
    }

    /**
     * @override
     * @param eBoardEngine 
     */
    undo(eBoardEngine: EBoardEngine): void {
        let event = this.event as ZoomEvent;
        eBoardEngine.getEBoardCanvas().setViewportTransform(event.oldVpt);
    }

    /**
     * @override
     * @param eBoardEngine 
     */
    redo(eBoardEngine: EBoardEngine): void {
        let event = this.event as ZoomEvent;
        eBoardEngine.getEBoardCanvas().setViewportTransform(event.lastVpt);
    }
}