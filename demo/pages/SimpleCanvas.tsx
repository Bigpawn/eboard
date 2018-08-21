import * as React from "react";
import { Card } from "antd";
import {FrameType} from '../../src/EBoard';
import {EBoardInstance} from './EBoardInstance';

class SimpleCanvas extends React.Component<{}, {}> {
    protected canvas:any;
    protected container:any;
    componentDidMount(){
        setTimeout(()=>{
            const eBoard = EBoardInstance.getInstance();
            const receiveEBoard = EBoardInstance.getReceiveInstance().setDisable();
            eBoard.attachMessageMiddleWare((message)=>{
                receiveEBoard.onMessage(message);
            });
            eBoard.clearCache().addEmptyFrame({
                type:FrameType.Empty,
            });
        },2000)
    }
    public render(): JSX.Element {
        return (
            <Card bordered title="Simple Canvas" style={{ margin: "16px 16px"}}>
                <div style={{width:/(m|M)obile/.test(navigator.userAgent)?"100%":"200%",height:"100%",position:"relative"}}>
                    <div className={/(m|M)obile/.test(navigator.userAgent)?"eboard-mobile":"eboard-pc"} id={"eboardContainer"}/>
                    <div className={/(m|M)obile/.test(navigator.userAgent)?"eboard-mobile":"eboard-pc"} id={"eboardContainerReceive"}/>
                </div>
            </Card>
        );
    }
}

export default SimpleCanvas;
