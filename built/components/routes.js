import * as React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { TodoPage } from "./pages/TodoPage";
import AboutPage from "./pages/AboutPage";
import PaintPage from "./pages/PaintPage";
import MaterialUIPage from "./pages/MaterialUIPage";
import PageLayout from "./layouts/PageLayout";
export var routes = [
    {
        path: "/paint",
        component: function (props) { return (React.createElement(PaintPage, null)); },
    },
    {
        path: "/home",
        exact: true,
        component: function (props) { return (React.createElement(HomePage, null)); },
    },
    {
        path: "/todo",
        component: function () { return (React.createElement(TodoPage, null)); },
    },
    {
        path: "/about",
        component: function () { return (React.createElement(AboutPage, null)); },
    },
    {
        path: "/materialui",
        component: function () { return (React.createElement(MaterialUIPage, null)); },
    },
];
export var route = (React.createElement(Switch, null,
    React.createElement(Route, { path: "/", component: PageLayout })));
//# sourceMappingURL=routes.js.map