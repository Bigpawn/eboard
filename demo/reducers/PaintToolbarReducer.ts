import * as _ from 'lodash';
import { ActionTypes } from "../actions/actionTypes";
import { BrushType } from "../../src/brushes/BrushType";

export interface PaintToolbarStates {
    currentBrush: BrushType;
}

const initStates: PaintToolbarStates = {
    currentBrush: BrushType.POINTER_BRUSH,
};

export function PaintToolbarReducer(states: PaintToolbarStates = initStates, action: any) {
    switch (action.type) {
        case ActionTypes.SELECT_BRUSH: {
            return _.assign({}, states, {currentBrush: action.brushType});
        }
        default: {
            return states;
        }
    }
}
