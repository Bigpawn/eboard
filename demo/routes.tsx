import * as React from "react";
import { RouteConfig } from "react-router-config";
import { Route, Switch } from "react-router-dom";
import SimpleCanvas from "./pages/SimpleCanvas";
import ImageCanvas from "./pages/ImageCanvas";
import ImagesCanvas from "./pages/ImagesCanvas";
import PdfCanvas from "./pages/PdfCanvas";
import PageLayout from "./layouts/PageLayout";
import HtmlCanvas from './pages/HtmlCanvas';
import MixCanvas from './pages/MixCanvas';

export const routes: RouteConfig[] = [
    {
        path: "/pager",
        exact: true,
        component: (props: any) => (<ImagesCanvas />),
    },
    {
        path: "/simple",
        exact: true,
        component: (props: any) => (<SimpleCanvas />),
    },
    {
        path: "/",
        exact: true,
        component: (props: any) => (<SimpleCanvas />),
    },
    {
        path: "/html",
        exact: true,
        component: () => (<HtmlCanvas/>),
    },
    {
        path: "/image",
        exact: true,
        component: () => (<ImageCanvas />),
    },
    {
        path: "/pdf",
        exact: true,
        component: () => (<PdfCanvas />),
    },
    {
        path:"/mix",
        exact:true,
        component:()=><MixCanvas/>
    }
];

export const route = (
    <Switch>
        <Route path="/" component={PageLayout}  />
    </Switch>
);
