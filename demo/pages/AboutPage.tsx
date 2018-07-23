import * as React from "react";
import HomePage, {ToolBar} from './HomePage';
import { Card } from "antd";
import {BaseFrame} from '../../src/frames/BaseFrame';
import {EBoard, FrameType} from '../../src/EBoard';
import {ScrollbarType} from '../../src/frames/HtmlFrame';

class AboutPage extends HomePage {
    componentDidMount(){
        // this.Toolbar.setCanvas(this.canvas);
        EBoard.createFrame({
            container:this.container,
            type:FrameType.Image,
            id:3,
            messageId:4,
            ratio:"16:9",
            src:"https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2622681255,3418216244&fm=173&app=25&f=JPEG?w=639&h=381&s=7084E2BB4A501CC0543717BC0300700E",
            scrollbar:ScrollbarType.vertical,
        }).switchToFrame(3);
        const frame = EBoard.findFrameById(3) as BaseFrame;
        this.Toolbar.setCanvas(frame);
    }
    public render(): JSX.Element {
        return (
            <Card bordered title="ImageCanvas" style={{ margin: "16px 16px"}}>
                <ToolBar ref={(ref:ToolBar)=>this.Toolbar=ref}/>
                <div ref={ref=>this.container=ref} style={{position:"relative",height:document.body.offsetHeight-220}}/>
            </Card>
        )
    }
}

export default AboutPage;
