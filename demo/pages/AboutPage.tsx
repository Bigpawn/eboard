import * as React from "react";
import HomePage, {ToolBar} from './HomePage';
import { Card } from "antd";
import {BaseFrame} from '../../src/frames/BaseFrame';
import {FrameType} from '../../src/EBoard';
import {ScrollbarType} from '../../src/frames/HtmlFrame';
import {EBoardInstance} from './EBoardInstance';

const eBoard =EBoardInstance.getInstance();

class AboutPage extends HomePage {
    componentDidMount(){
        // this.Toolbar.setCanvas(this.canvas);
        const frame = eBoard.clearCache().createImageFrame({
            type:FrameType.Image,
            ratio:"16:9",
            src:"https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2622681255,3418216244&fm=173&app=25&f=JPEG?w=639&h=381&s=7084E2BB4A501CC0543717BC0300700E",
            scrollbar:ScrollbarType.vertical,
            messageId:0
        }) as BaseFrame;
        eBoard.switchToFrame(frame);
        this.Toolbar.setCanvas(frame);
    }
    public render(): JSX.Element {
        return (
            <Card bordered title="ImageCanvas" style={{ margin: "16px 16px"}}>
                <ToolBar ref={(ref:ToolBar)=>this.Toolbar=ref}/>
                <div id={"eboardContainer"} ref={ref=>this.container=ref} style={{position:"relative",height:document.body.offsetHeight-220}}/>
            </Card>
        )
    }
}

export default AboutPage;
