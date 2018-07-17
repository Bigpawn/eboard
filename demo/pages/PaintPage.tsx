import * as React from "react";
import { Card } from "antd";
import HomePage, {ToolBar} from './HomePage';
import {PagerCanvas, PageType} from '../../src/canvas/react/PagerCanvas';

class PaintPage extends HomePage{
    public render(): JSX.Element {
        const dataSet=[];
        for (let i=0;i<114;i++){
            dataSet.push({
                type:PageType.Image,
                data:"https://res2dev.9itest.com/resource2/1000/document/20180716/56e61d90a7d7435c80a2499621055ceb_png/0.png"
            })
        }
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
