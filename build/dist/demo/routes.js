import * as React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PaintPage from "./pages/PaintPage";
import MaterialUIPage from "./pages/MaterialUIPage";
import PageLayout from "./layouts/PageLayout";
import HTMLPage from './pages/TodoPage';
export var routes = [
    {
        path: "/pager",
        component: function (props) { return (React.createElement(PaintPage, null)); },
    },
    {
        path: "/simple",
        exact: true,
        component: function (props) { return (React.createElement(HomePage, null)); },
    },
    {
        path: "/html",
        component: function () { return (React.createElement(HTMLPage, null)); },
    },
    {
        path: "/image",
        component: function () { return (React.createElement(AboutPage, null)); },
    },
    {
        path: "/pdf",
        component: function () { return (React.createElement(MaterialUIPage, null)); },
    },
];
export var route = (React.createElement(Switch, null,
    React.createElement(Route, { path: "/", component: PageLayout })));
//# sourceMappingURL=routes.js.map