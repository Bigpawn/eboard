import * as React from 'react';
// import * as PropTypes from 'prop-types';
import {ToolBar} from './SimpleCanvas';
import Card from 'antd/es/card';
import SimpleCanvas from './SimpleCanvas';
import {FrameType} from "../../src/EBoard";
import {EBoardInstance} from './EBoardInstance';



class MaterialUIPage extends SimpleCanvas{
    componentDidMount(){
        const eBoard =EBoardInstance.getInstance();
        const receiveEBoard = EBoardInstance.getReceiveInstance();
        eBoard.attachMessageMiddleWare((message)=>{
            receiveEBoard.onMessage(message);
        });
        const frame = eBoard.clearCache().createPdfFrame({
            type:FrameType.Pdf,
            ratio:"16:9",
            url:require("./4.pdf"),
            pageNum:1,
            messageId:0
        });
        eBoard.switchToFrame(frame);
        this.Toolbar.setEBoard(eBoard);
    }
    public render() {
        return (
            <Card bordered title="PdfCanvas" style={{ margin: "16px 16px"}}>
                <ToolBar ref={(ref:ToolBar)=>this.Toolbar=ref}/>
                <div ref={ref=>this.container=ref} id={"eboardContainer"} style={{position:"relative",height:document.body.offsetHeight-220,width:"50%",display:"inline-block"}}/>
                <div id={"eboardContainerReceive"} style={{position:"relative",height:document.body.offsetHeight-220,width:"40%",display:"inline-block",marginLeft:40}}/>
            </Card>
        );
    }
}

export default MaterialUIPage;
