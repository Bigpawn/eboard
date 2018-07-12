import * as React from "react";
import { Card } from "antd";
import {HTMLCanvas} from '../../src/canvas/react/HTMLCanvas';
import HomePage, {ToolBar} from './HomePage';

class HTMLPage extends HomePage{
    public render(): JSX.Element {
        return (
            <Card bordered title="HTML Canvas" style={{ margin: "16px 16px"}}>
                <ToolBar ref={(ref:ToolBar)=>this.Toolbar=ref}/>
                <div style={{position:"relative",height:document.body.offsetHeight-220}}>
                    <HTMLCanvas ratio={"16:9"} ref={(ref:HTMLCanvas)=>this.canvas=ref}>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                        html内容dsaaaaaaaaaaaaaaaadas
                        <br/>
                    </HTMLCanvas>
                </div>
            </Card>
        )
    }
}

export default HTMLPage;
