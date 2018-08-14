import * as React from "react";
import { Card } from "antd";
import SimpleCanvas, {ToolBar} from './SimpleCanvas';
import {FrameType} from '../../src/EBoard';
import {ScrollbarType} from '../../src/frames/HtmlFrame';
import {EBoardInstance} from './EBoardInstance';



class HtmlCanvas extends SimpleCanvas{
    componentDidMount(){
        const eBoard =EBoardInstance.getInstance();
        const receiveEBoard = EBoardInstance.getReceiveInstance().setDisable();
        eBoard.attachMessageMiddleWare((message)=>{
            receiveEBoard.onMessage(message);
        });
        eBoard.clearCache().createHtmlFrame({
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
        this.Toolbar.setEBoard(eBoard);
    }
    public render(): JSX.Element {
        return (
            <Card bordered title="HTML Canvas" style={{ margin: "16px 16px"}}>
                <ToolBar ref={(ref:ToolBar)=>this.Toolbar=ref}/>
                <div ref={ref=>this.container=ref} id={"eboardContainer"} style={{position:"relative",height:document.body.offsetHeight-220,width:"50%",display:"inline-block"}}/>
                <div id={"eboardContainerReceive"} style={{position:"relative",height:document.body.offsetHeight-220,width:"40%",display:"inline-block",marginLeft:40}}/>
            </Card>
        )
    }
}

export default HtmlCanvas;
