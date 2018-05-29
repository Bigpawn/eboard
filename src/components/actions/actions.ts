import { TodoItem } from "../model/TodoItem";
import { ActionTypes, IInitStoreAction, IAddTodoAction, ICompleteTodoAction, ISelectBrushAction } from "./actionTypes";
import { BrushType } from "../whitepad/brushes/BrushType";

export const initStoreAction = (todos: TodoItem[]): IInitStoreAction => {
    return {type: ActionTypes.INIT_STORE, todos};
};

export const addTodoAction = (todo: TodoItem): IAddTodoAction => {
    return {type: ActionTypes.ADD_TODO_ITEM, todo};
};

export const completeTodoAction = (todo: TodoItem): ICompleteTodoAction => {
    return {type: ActionTypes.COMPLETE_TODO_ITEM, todo};
};

export const selectBrushAction = (brushType: BrushType): ISelectBrushAction => {
    return {type: ActionTypes.SELECT_BRUSH, brushType};
};

export const actionCreators = {
    addTodoAction,
    completeTodoAction,
    selectBrushAction,
};
