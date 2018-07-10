import * as React from "react";
import { RouteConfig } from "react-router-config";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { TodoPage } from "./pages/TodoPage";
import AboutPage from "./pages/AboutPage";
import PaintPage from "./pages/PaintPage";
import MaterialUIPage from "./pages/MaterialUIPage";
import PageLayout from "./layouts/PageLayout";

export const routes: RouteConfig[] = [
    {
        path: "/paint",
        component: (props: any) => (<PaintPage />),
    },
    {
        path: "/simple",
        exact: true,
        component: (props: any) => (<HomePage />),
    },
    {
        path: "/todo",
        component: () => (<TodoPage/>),
    },
    {
        path: "/about",
        component: () => (<AboutPage />),
    },
    {
        path: "/materialui",
        component: () => (<MaterialUIPage />),
    },
];

export const route = (
    <Switch>
        <Route path="/" component={PageLayout}  />
    </Switch>
);
