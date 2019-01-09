import * as React from 'react';
import {Card} from 'antd';
import SimpleCanvas from './SimpleCanvas';
import {EBoardInstance} from './EBoardInstance';
import {Authority, FrameType} from '../../src/enums/SDKEnum';

class ImagesCanvas extends SimpleCanvas{
    componentDidMount(){
        const eBoard =EBoardInstance.getInstance().setAuthority(Authority.Viewer);
        const receiveEBoard = EBoardInstance.getReceiveInstance();
        eBoard.on("message",(e)=>{
            const message = e.data;
            receiveEBoard.onMessage(message);
        });
        const dataSet=[];
        for (let i=0;i<18;i++){
            dataSet.push(i+".png");
        }
        eBoard.addImagesFrame({
            type:FrameType.Images,
            pageNum:1,
            urlPrefix:"https://res2dev.9itest.com/resource2/1000/document/20181218/22bb6e394f4b474e811ce17a6956f01b_png/",
            images:dataSet,
            extraHtmlFragment:"<div>按钮</div>"
        });
    }
    public render(): JSX.Element {
        return (
            <Card bordered title="PagerCanvas" style={{ margin: "16px 16px"}}>
                <div style={{width:/(m|M)obile/.test(navigator.userAgent)?"100%":"100%",height:"100%",position:"relative"}}>
                    <div className={/(m|M)obile/.test(navigator.userAgent)?"eboard-mobile":"eboard-pc"} id={"eboardContainer"}/>
                    <div className={/(m|M)obile/.test(navigator.userAgent)?"eboard-mobile":"eboard-pc"} id={"eboardContainerReceive"}/>
                </div>
            </Card>
        )
    }
}

export default ImagesCanvas;
