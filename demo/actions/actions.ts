import { ITodoItem } from "../model/TodoItem";
import { ActionTypes, IInitStoreAction, IAddTodoAction, ICompleteTodoAction } from "./actionTypes";

export const initStoreAction = (todos: ITodoItem[]): IInitStoreAction => {
    return {type: ActionTypes.INIT_STORE, todos};
};

export const addTodoAction = (todo: ITodoItem): IAddTodoAction => {
    return {type: ActionTypes.ADD_TODO_ITEM, todo};
};

export const completeTodoAction = (todo: ITodoItem): ICompleteTodoAction => {
    return {type: ActionTypes.COMPLETE_TODO_ITEM, todo};
};

export const actionCreators = {
    addTodoAction,
    completeTodoAction,
};
