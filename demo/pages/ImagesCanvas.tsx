import * as React from "react";
import { Card } from "antd";
import SimpleCanvas from './SimpleCanvas';
import {FrameType} from '../../src/EBoard';
import {EBoardInstance} from './EBoardInstance';




class ImagesCanvas extends SimpleCanvas{
    componentDidMount(){
        const eBoard =EBoardInstance.getInstance();
        const receiveEBoard = EBoardInstance.getReceiveInstance().setDisable();
        eBoard.on("message",(message)=>{
            console.log(JSON.parse(message));
            receiveEBoard.onMessage(message);
        });
        const dataSet=[];
        for (let i=0;i<114;i++){
            dataSet.push(i+".png");
        }
        eBoard.addImagesFrame({
            type:FrameType.Images,
            pageNum:1,
            urlPrefix:"https://res2dev.9itest.com/resource2/1000/document/20180716/56e61d90a7d7435c80a2499621055ceb_png/",
            images:dataSet,
        });
    }
    public render(): JSX.Element {
        return (
            <Card bordered title="PagerCanvas" style={{ margin: "16px 16px"}}>
                <div style={{width:/(m|M)obile/.test(navigator.userAgent)?"100%":"200%",height:"100%",position:"relative"}}>
                    <div className={/(m|M)obile/.test(navigator.userAgent)?"eboard-mobile":"eboard-pc"} id={"eboardContainer"}/>
                    <div className={/(m|M)obile/.test(navigator.userAgent)?"eboard-mobile":"eboard-pc"} id={"eboardContainerReceive"}/>
                </div>
            </Card>
        )
    }
}

export default ImagesCanvas;
