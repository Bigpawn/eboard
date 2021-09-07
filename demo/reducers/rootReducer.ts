import { combineReducers } from "redux";
// import { IState } from "../store/configStore";
import { todos } from "./todosReducer";
import { PaintToolbarReducer, PaintToolbarStates } from "./PaintToolbarReducer";
import { ITodoItem } from "../model/TodoItem";

export interface IStates {
    todos: ITodoItem[];
    paintToolbarStates: PaintToolbarStates;
}

export const rootReducer = combineReducers({
    todos,
    paintToolbarStates: PaintToolbarReducer,
});
