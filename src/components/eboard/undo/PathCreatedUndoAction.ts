/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-06 11:10:47
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-12 11:21:26
 */
import { FabricOtherEventType } from '../mixins/FabricEvents';
import { AbstractUndoAction} from '../mixins/Undo';
import EBoardEngine from '../EBoardEngine';
/**
 * "path:created" undo/redo action.
 */
export default class PathCreatedUndoAction extends AbstractUndoAction {
    constructor(event: any) {
        super(event);
    }
    
    /**
     * @override
     */
    public getType(): any {
        return FabricOtherEventType.PATH_CREATED;
    }

    /**
     * @override
     * @param eBoardEngine 
     */
    undo(eBoardEngine: EBoardEngine): void {
        if (this.event.path) {
            eBoardEngine.getEBoardCanvas().remove(this.event.path);
        }
    }

    /**
     * @override
     * @param eBoardEngine 
     */
    redo(eBoardEngine: EBoardEngine): void {
        if (this.event.path) {
            eBoardEngine.getEBoardCanvas().add(this.event.path);
        }
    }
}