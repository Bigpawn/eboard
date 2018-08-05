import * as React from "react";
import { RouteConfig } from "react-router-config";
import { Route, Switch } from "react-router-dom";
import SimpleCanvas from "./pages/SimpleCanvas";
import ImageCanvas from "./pages/ImageCanvas";
import ImagesCanvas from "./pages/ImagesCanvas";
import PdfCanvas from "./pages/PdfCanvas";
import PageLayout from "./layouts/PageLayout";
import HtmlCanvas from './pages/HtmlCanvas';

export const routes: RouteConfig[] = [
    {
        path: "/pager",
        component: (props: any) => (<ImagesCanvas />),
    },
    {
        path: "/simple",
        exact: true,
        component: (props: any) => (<SimpleCanvas />),
    },
    {
        path: "/html",
        component: () => (<HtmlCanvas/>),
    },
    {
        path: "/image",
        component: () => (<ImageCanvas />),
    },
    {
        path: "/pdf",
        component: () => (<PdfCanvas />),
    },
];

export const route = (
    <Switch>
        <Route path="/" component={PageLayout}  />
    </Switch>
);
