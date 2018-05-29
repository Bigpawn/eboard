import { Action } from "redux";
import { TodoItem } from "../model/TodoItem";
import { BrushType } from "../eboard/brushes/BrushType";

export const ActionTypes = {
    INIT_STORE: "INIT_STORE",
    ADD_TODO_ITEM: "ADD_TODO_ITEM",
    COMPLETE_TODO_ITEM: "COMPLETE_TODO_ITEM",
    SELECT_BRUSH: "SELECT_BRUSH",
};

export interface IInitStoreAction extends Action {
    todos: TodoItem[];
}

export interface IAddTodoAction extends Action {
    todo: TodoItem;
}

export interface ICompleteTodoAction extends Action {
    todo: TodoItem;
}

export interface ISelectBrushAction extends Action {
    brushType: BrushType;
}
