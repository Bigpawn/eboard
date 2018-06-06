/*
 * @Author: Liheng (liheeng@gmail.com)
 * @Date: 2018-06-06 11:10:47
 * @Last Modified by: Liheng (liheeng@gmail.com)
 * @Last Modified time: 2018-06-06 11:29:51
 */
import { FabricEventType } from '../mixins/FabricEventType';
import { AbstractUndoRedoAction} from '../mixins/UndoRedo';
import EBoardEngine from '../EBoardEngine';
/**
 * "path:created" undo/redo action.
 */
export default class PathCreatedUndoAction extends AbstractUndoRedoAction {
    constructor(event: any) {
        super(event);
    }
    
    /**
     * @override
     */
    public getType(): any {
        return FabricEventType.PATH_CREATED;
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
