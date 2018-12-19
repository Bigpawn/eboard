import * as React from "react";
import { Card } from "antd";
import {EBoardInstance} from './EBoardInstance';
import {FrameType} from '../../src/enums/SDKEnum';

class SimpleCanvas extends React.Component<{}, {}> {
    protected canvas:any;
    protected container:any;
    componentDidMount(){
        setTimeout(()=>{
            const eBoard = EBoardInstance.getInstance();
            const receiveEBoard = EBoardInstance.getReceiveInstance().setDisable();
            eBoard.on("message",(e:any)=>{
                const message=e.data;
                console.log(message);
                receiveEBoard.onMessage(message);
            });
            const frame=eBoard.addEmptyFrame({
                type:FrameType.Empty,
                name:"白板",
                icon:"icon-test",
                canRemove:false
            });
            const message ={"messageId":11,"header":{"id":"1540442682021","tag":13,"frameId":frame.frameId},"body":{"type":"pencil","stroke":"#f66c00","strokeWidth":10.8,"path":"M 8 18 Q 8 18 8.5 18 Q 9 18 10.5 21 Q 12 24 15 30 Q 18 36 21 41 Q 24 46 25 49.5 Q 26 53 30.5 57.5 Q 35 62 35 64 Q 35 66 36 69.5 Q 37 73 38.5 76.5 Q 40 80 40 81 Q 40 82 40 83 L 40 84"}};
            eBoard.onMessage(JSON.stringify(message));
        },100)
    }
    public render(): JSX.Element {
        return (
            <Card bordered title="Simple Canvas" style={{ margin: "16px 16px"}}>
                <div style={{width:/(m|M)obile/.test(navigator.userAgent)?"100%":"100%",height:"100%",position:"relative"}}>
                    <div className={/(m|M)obile/.test(navigator.userAgent)?"eboard-mobile":"eboard-pc"} id={"eboardContainer"}/>
                    <div className={/(m|M)obile/.test(navigator.userAgent)?"eboard-mobile":"eboard-pc"} id={"eboardContainerReceive"}/>
                </div>
            </Card>
        );
    }
}

export default SimpleCanvas;
