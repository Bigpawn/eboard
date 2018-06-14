import * as todoActions from "../actions/actionTypes";
var initState = [{
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
export function todos(states, action) {
    if (states === void 0) { states = initState; }
    switch (action.type) {
        case todoActions.ActionTypes.INIT_STORE:
            return action.todos;
        case todoActions.ActionTypes.ADD_TODO_ITEM: {
            var todoItems = states.slice();
            var todo = action.todo;
            todo.id = todoItems.length;
            todo.key = todoItems.length;
            todo.isCompleted = false;
            todoItems.push(todo);
            return todoItems;
        }
        case todoActions.ActionTypes.COMPLETE_TODO_ITEM: {
            var todoItems = states.slice();
            var todo = action.todo;
            for (var _i = 0, todoItems_1 = todoItems; _i < todoItems_1.length; _i++) {
                var item = todoItems_1[_i];
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
//# sourceMappingURL=todosReducer.js.map