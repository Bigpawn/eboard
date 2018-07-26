import * as React from "react";
import { Card } from "antd";
import HomePage, {ToolBar} from './HomePage';
import {FrameType} from '../../src/EBoard';
import {EBoardInstance} from './EBoardInstance';



const eBoard =EBoardInstance.getInstance();

class PaintPage extends HomePage{
    componentDidMount(){
        // this.Toolbar.setCanvas(this.canvas);
        const dataSet=[];
        for (let i=0;i<114;i++){
            dataSet.push(i+".png");
        }
        const frame = eBoard.clearCache().createImagesFrame({
            type:FrameType.Images,
            ratio:"16:9",
            pageNum:1,
            urlPrefix:"https://res2dev.9itest.com/resource2/1000/document/20180716/56e61d90a7d7435c80a2499621055ceb_png/",
            images:dataSet,
            messageId:0
        });
        eBoard.switchToFrame(frame);
        this.Toolbar.setCanvas(frame);
    }
    public render(): JSX.Element {
        return (
            <Card bordered title="PagerCanvas" style={{ margin: "16px 16px"}}>
                <ToolBar ref={(ref:ToolBar)=>this.Toolbar=ref}/>
                <div id={"eboardContainer"} ref={ref=>this.container=ref} style={{position:"relative",height:document.body.offsetHeight-220}}/>
            </Card>
        )
    }
}

export default PaintPage;
