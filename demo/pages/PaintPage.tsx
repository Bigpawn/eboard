import * as React from "react";
import { Card } from "antd";
import HomePage, {ToolBar} from './HomePage';
import {PagerCanvas, PageType} from '../../src/canvas/react/PagerCanvas';

class PaintPage extends HomePage{
    public render(): JSX.Element {
        const dataSet=[
            {
                type:PageType.Image,
                data:"https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2622681255,3418216244&fm=173&app=25&f=JPEG?w=639&h=381&s=7084E2BB4A501CC0543717BC0300700E"
            },
            {
                type:PageType.Image,
                data:"https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2622681255,3418216244&fm=173&app=25&f=JPEG?w=639&h=381&s=7084E2BB4A501CC0543717BC0300700E"
            },
            {
                type:PageType.Image,
                data:"https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2622681255,3418216244&fm=173&app=25&f=JPEG?w=639&h=381&s=7084E2BB4A501CC0543717BC0300700E"
            }
            ];
        return (
            <Card bordered title="PagerCanvas" style={{ margin: "16px 16px"}}>
                <ToolBar ref={(ref:ToolBar)=>this.Toolbar=ref}/>
                <div style={{position:"relative",height:document.body.offsetHeight-220}}>
                    <PagerCanvas ratio={"16:9"} ref={(ref:PagerCanvas)=>this.canvas=ref} pageDataSet={dataSet}/>
                </div>
            </Card>
        )
    }
}

export default PaintPage;
