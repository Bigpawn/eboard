import * as React from 'react';
import Card from 'antd/es/card';
import SimpleCanvas from './SimpleCanvas';
import {EBoardInstance} from './EBoardInstance';
import {FrameType} from '../../src/enums/SDKEnum';



class MaterialUIPage extends SimpleCanvas{
    componentDidMount(){
        const eBoard =EBoardInstance.getInstance();
        // const receiveEBoard = EBoardInstance.getReceiveInstance();
        eBoard.on("message",(e:any)=>{
            const message = e.data;
            // receiveEBoard.onMessage(message);
        });
        eBoard.addPdfFrame({
            type:FrameType.Pdf,
            url:"https://res2dev.9itest.com/resource2/1000/document/20190318/8d5769b0de4f4fa0889dda002e6cd642_pdf/8d5769b0de4f4fa0889dda002e6cd642.pdf",
            pageNum:1,
        });
    }
    public render() {
        return (
            <Card bordered title="PdfCanvas" style={{ margin: "16px 16px"}}>
                <div style={{width:/(m|M)obile/.test(navigator.userAgent)?"100%":"100%",height:"100%",position:"relative"}}>
                    <div className={/(m|M)obile/.test(navigator.userAgent)?"eboard-mobile":"eboard-pc"} id={"eboardContainer"}/>
                    <div className={/(m|M)obile/.test(navigator.userAgent)?"eboard-mobile":"eboard-pc"} id={"eboardContainerReceive"}/>
                </div>
            </Card>
        );
    }
}

export default MaterialUIPage;
