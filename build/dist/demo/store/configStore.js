import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";
import { rootReducer } from "../reducers/rootReducer";
export var configureStore = function () {
    if (process.env.NODE_ENV === "production") {
        return createStore(rootReducer, applyMiddleware(thunk));
    }
    else {
        return createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
    }
};
//# sourceMappingURL=configStore.js.map