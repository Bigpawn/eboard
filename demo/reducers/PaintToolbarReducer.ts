import * as _ from 'lodash';
import { ActionTypes } from "../actions/actionTypes";

export interface PaintToolbarStates {
    currentBrush: any;
}

const initStates: PaintToolbarStates = {
    currentBrush: "",
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
