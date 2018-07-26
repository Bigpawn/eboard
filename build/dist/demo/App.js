var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
import * as React from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { LocaleProvider } from "antd";
import enUS from "antd/lib/locale-provider/en_US";
import { route } from "./routes";
import { configureStore } from "./store/configStore";
import "antd/dist/antd.less";
import "./style/demo.less";
var store = configureStore();
// store.dispatch(initStore());
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return (React.createElement(LocaleProvider, { locale: enUS },
            React.createElement(Provider, { store: store },
                React.createElement(HashRouter, __assign({ children: route }, this.props)))));
    };
    return App;
}(React.Component));
export default App;
//# sourceMappingURL=App.js.map