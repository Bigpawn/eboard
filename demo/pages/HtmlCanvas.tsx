import * as React from "react";
import { Card } from "antd";
import SimpleCanvas, {ToolBar} from './SimpleCanvas';
import {FrameType} from '../../src/EBoard';
import {ScrollbarType} from '../../src/frames/HtmlFrame';
import {EBoardInstance} from './EBoardInstance';

const eBoard =EBoardInstance.getInstance();
const receiveEBoard = EBoardInstance.getReceiveInstance();
eBoard.attachMessageMiddleWare((message)=>{
    receiveEBoard.onMessage(message);
});

class HtmlCanvas extends SimpleCanvas{
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
        this.Toolbar.setCanvas(frame);
    }
    public render(): JSX.Element {
        return (
            <Card bordered title="HTML Canvas" style={{ margin: "16px 16px"}}>
                <ToolBar ref={(ref:ToolBar)=>this.Toolbar=ref}/>
                <div ref={ref=>this.container=ref} id={"eboardContainer"} style={{position:"relative",height:document.body.offsetHeight-220,width:"50%",display:"inline-block"}}>
                    {/*<BaseCanvas ratio={"16:9"} ref={(ref:BaseCanvas)=>this.canvas=ref}/>*/}
                </div>
                <div id={"eboardContainerReceive"} style={{position:"relative",height:document.body.offsetHeight-220,width:"50%",display:"inline-block"}}>
                    {/*<BaseCanvas ratio={"16:9"} ref={(ref:BaseCanvas)=>this.canvas=ref}/>*/}
                </div>
            </Card>
        )
    }
}

export default HtmlCanvas;
