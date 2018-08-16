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
                <div style={{width:"200%",height:"100%",position:"relative"}}>
                    <div ref={ref=>this.container=ref} id={"eboardContainer"} style={{position:"relative",height:document.body.offsetHeight-220,width:"50%",display:"inline-block"}}/>
                    <div id={"eboardContainerReceive"} style={{position:"relative",height:document.body.offsetHeight-220,width:"50%",display:"inline-block"}}/>
                </div>
            </Card>
        );
    }
}

export default SimpleCanvas;
