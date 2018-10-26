import * as React from 'react';
import Card from 'antd/es/card';
import SimpleCanvas from './SimpleCanvas';
import {FrameType} from "../../src/EBoard";
import {EBoardInstance} from './EBoardInstance';



class MaterialUIPage extends SimpleCanvas{
    componentDidMount(){
        const eBoard =EBoardInstance.getInstance();
        const receiveEBoard = EBoardInstance.getReceiveInstance().setDisable();
        eBoard.on("message",(e:any)=>{
            const message = e.data;
            console.log(message);
            receiveEBoard.onMessage(message);
        });
        eBoard.addPdfFrame({
            type:FrameType.Pdf,
            url:require("./4.pdf"),
            pageNum:1,
        });
    }
    public render() {
        return (
            <Card bordered title="PdfCanvas" style={{ margin: "16px 16px"}}>
                <div style={{width:/(m|M)obile/.test(navigator.userAgent)?"100%":"200%",height:"100%",position:"relative"}}>
                    <div className={/(m|M)obile/.test(navigator.userAgent)?"eboard-mobile":"eboard-pc"} id={"eboardContainer"}/>
                    <div className={/(m|M)obile/.test(navigator.userAgent)?"eboard-mobile":"eboard-pc"} id={"eboardContainerReceive"}/>
                </div>
            </Card>
        );
    }
}

export default MaterialUIPage;
