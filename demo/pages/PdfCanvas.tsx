import * as React from 'react';
import Card from 'antd/es/card';
import SimpleCanvas from './SimpleCanvas';
import {FrameType} from "../../src/EBoard";
import {EBoardInstance} from './EBoardInstance';



class MaterialUIPage extends SimpleCanvas{
    componentDidMount(){
        const eBoard =EBoardInstance.getInstance();
        const receiveEBoard = EBoardInstance.getReceiveInstance().setDisable();
        eBoard.attachMessageMiddleWare((message)=>{
            receiveEBoard.onMessage(message);
        });
        eBoard.clearCache().createPdfFrame({
            type:FrameType.Pdf,
            url:require("./4.pdf"),
            pageNum:1,
        });
    }
    public render() {
        return (
            <Card bordered title="PdfCanvas" style={{ margin: "16px 16px"}}>
                <div ref={ref=>this.container=ref} id={"eboardContainer"} style={{position:"relative",height:document.body.offsetHeight-220,width:"50%",display:"inline-block"}}/>
                <div id={"eboardContainerReceive"} style={{position:"relative",height:document.body.offsetHeight-220,width:"40%",display:"inline-block",marginLeft:40}}/>
            </Card>
        );
    }
}

export default MaterialUIPage;
