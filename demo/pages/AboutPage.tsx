import * as React from "react";
import HomePage, {ToolBar} from './HomePage';
import { Card } from "antd";
import {ImageCanvas} from '../../src/canvas/ImageCanvas';

class AboutPage extends HomePage {
    public render(): JSX.Element {
        return (
            <Card bordered title="ImageCanvas" style={{ margin: "16px 16px"}}>
                <ToolBar ref={(ref:ToolBar)=>this.Toolbar=ref}/>
                <div style={{position:"relative",height:document.body.offsetHeight-220}}>
                    <ImageCanvas src={"https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2622681255,3418216244&fm=173&app=25&f=JPEG?w=639&h=381&s=7084E2BB4A501CC0543717BC0300700E"} ratio={"16:9"} ref={(ref:ImageCanvas)=>this.canvas=ref}/>
                </div>
            </Card>
        )
    }
}

export default AboutPage;
