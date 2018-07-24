import * as React from "react";
import { Card } from "antd";
import HomePage, {ToolBar} from './HomePage';
import {BaseFrame} from '../../src/frames/BaseFrame';
import {EBoard, FrameType} from '../../src/EBoard';
import {ScrollbarType} from '../../src/frames/HtmlFrame';

class HTMLPage extends HomePage{
    componentDidMount(){
        // this.Toolbar.setCanvas(this.canvas);
        EBoard.clearCache().createFrame({
            container:document.getElementById("eboardContainer") as HTMLDivElement,
            type:FrameType.HTML,
            id:2,
            messageId:3,
            ratio:"16:9",
            scrollbar:ScrollbarType.vertical,
            htmlFragment:'html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>\n' +
            '                        html内容dsaaaaaaaaaaaaaaaadas\n' +
            '                        <br/>'
        }).switchToFrame(2);
        const frame = EBoard.findFrameById(2) as BaseFrame;
        this.Toolbar.setCanvas(frame);
    }
    public render(): JSX.Element {
        return (
            <Card bordered title="HTML Canvas" style={{ margin: "16px 16px"}}>
                <ToolBar ref={(ref:ToolBar)=>this.Toolbar=ref}/>
                <div id={"eboardContainer"} ref={ref=>this.container=ref} style={{position:"relative",height:document.body.offsetHeight-220}}/>
            </Card>
        )
    }
}

export default HTMLPage;
