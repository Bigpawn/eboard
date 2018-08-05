import * as _ from 'lodash';
import { ActionTypes } from "../actions/actionTypes";
var initStates = {
    currentBrush: "",
};
export function PaintToolbarReducer(states, action) {
    if (states === void 0) { states = initStates; }
    switch (action.type) {
        case ActionTypes.SELECT_BRUSH: {
            return _.assign({}, states, { currentBrush: action.brushType });
        }
        default: {
            return states;
        }
    }
}
//# sourceMappingURL=PaintToolbarReducer.js.map