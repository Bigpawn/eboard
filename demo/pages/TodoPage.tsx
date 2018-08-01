import * as React from "react";
import { Card } from "antd";
import HomePage, {ToolBar} from './HomePage';
import {FrameType} from '../../src/EBoard';
import {ScrollbarType} from '../../src/frames/HtmlFrame';
import {EBoardInstance} from './EBoardInstance';

const eBoard =EBoardInstance.getInstance();

class HTMLPage extends HomePage{
    componentDidMount(){
        // this.Toolbar.setCanvas(this.canvas);
        const frame =eBoard.clearCache().createHtmlFrame({
            type:FrameType.HTML,
            ratio:"16:9",
            scrollbar:ScrollbarType.vertical,
            content:'html内容dsaaaaaaaaaaaaaaaadas\n' +
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
            '                        <br/>',
            messageId:0
        });
        eBoard.switchToFrame(frame);
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
