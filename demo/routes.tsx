import * as React from "react";
import { RouteConfig } from "react-router-config";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import PaintPage from "./pages/PaintPage";
import MaterialUIPage from "./pages/MaterialUIPage";
import PageLayout from "./layouts/PageLayout";
import HTMLPage from './pages/TodoPage';

export const routes: RouteConfig[] = [
    {
        path: "/pager",
        component: (props: any) => (<PaintPage />),
    },
    {
        path: "/simple",
        exact: true,
        component: (props: any) => (<HomePage />),
    },
    {
        path: "/html",
        component: () => (<HTMLPage/>),
    },
    {
        path: "/image",
        component: () => (<AboutPage />),
    },
    {
        path: "/pdf",
        component: () => (<MaterialUIPage />),
    },
];

export const route = (
    <Switch>
        <Route path="/" component={PageLayout}  />
    </Switch>
);
