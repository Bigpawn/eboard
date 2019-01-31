import { Action } from "redux";
import * as todoActions from "../actions/actionTypes";
import { ITodoItem } from "../model/TodoItem";

const initState: ITodoItem[] = [{
    key: 0,
    id: 0,
    name: "Create a template for react and typescript.",
    isCompleted: true,
}, {
    key: 1,
    id: 1,
    name: "Wire up redux to the template.",
    isCompleted: false,
}];

export function todos(states: ITodoItem[] = initState, action: Action) {
    switch (action.type) {
        case todoActions.ActionTypes.INIT_STORE:
            return (action as todoActions.IInitStoreAction).todos;
        case todoActions.ActionTypes.ADD_TODO_ITEM: {
            const todoItems = states.slice();
            const todo = (action as todoActions.IAddTodoAction).todo;
            todo.id = todoItems.length;
            todo.key = todoItems.length;
            todo.isCompleted = false;
            todoItems.push(todo);
            return todoItems;
        }
        case todoActions.ActionTypes.COMPLETE_TODO_ITEM: {
            const todoItems = states.slice();
            const todo = (action as todoActions.ICompleteTodoAction).todo;
            for (const item of todoItems) {
                if (item.id === todo.id) {
                    item.isCompleted = true;
                    break;
                }
            }
            return todoItems;
        }
        default:
            return states;
    }
}
