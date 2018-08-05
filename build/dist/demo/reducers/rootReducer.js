import { combineReducers } from "redux";
// import { IState } from "../store/configStore";
import { todos } from "./todosReducer";
import { PaintToolbarReducer } from "./PaintToolbarReducer";
export var rootReducer = combineReducers({
    todos: todos,
    paintToolbarStates: PaintToolbarReducer,
});
//# sourceMappingURL=rootReducer.js.map