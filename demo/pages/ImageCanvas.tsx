import * as React from "react";
import SimpleCanvas from './SimpleCanvas';
import { Card } from "antd";
import {ScrollbarType} from '../../src/index';
import {EBoardInstance} from './EBoardInstance';
import {FrameType} from '../../src/enums/SDKEnum';



class ImageCanvas extends SimpleCanvas {
    componentDidMount(){
        const eBoard =EBoardInstance.getInstance();
        const receiveEBoard = EBoardInstance.getReceiveInstance();
        eBoard.on("message",(e)=>{
            const message =e.data;
            console.log(message);
            receiveEBoard.onMessage(message);
        });
        eBoard.addImageFrame({
            type:FrameType.Image,
            content:"https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2622681255,3418216244&fm=173&app=25&f=JPEG?w=639&h=381&s=7084E2BB4A501CC0543717BC0300700E",
            scrollbar:ScrollbarType.vertical,
        });
    }
    public render(): JSX.Element {
        return (
            <Card bordered title="ImageCanvas" style={{ margin: "16px 16px"}}>
                <div style={{width:/(m|M)obile/.test(navigator.userAgent)?"100%":"100%",height:"100%",position:"relative"}}>
                    <div className={/(m|M)obile/.test(navigator.userAgent)?"eboard-mobile":"eboard-pc"} id={"eboardContainer"}/>
                    <div className={/(m|M)obile/.test(navigator.userAgent)?"eboard-mobile":"eboard-pc"} id={"eboardContainerReceive"}/>
                </div>
            </Card>
        )
    }
}

export default ImageCanvas;
