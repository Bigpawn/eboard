import { Action } from "redux";
import { ITodoItem } from "../model/TodoItem";

export const ActionTypes = {
    INIT_STORE: "INIT_STORE",
    ADD_TODO_ITEM: "ADD_TODO_ITEM",
    COMPLETE_TODO_ITEM: "COMPLETE_TODO_ITEM",
    SELECT_BRUSH:"SELECT_BRUSH"
};

export interface IInitStoreAction extends Action {
    todos: ITodoItem[];
}

export interface IAddTodoAction extends Action {
    todo: ITodoItem;
}

export interface ICompleteTodoAction extends Action {
    todo: ITodoItem;
}