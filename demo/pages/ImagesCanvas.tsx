import * as React from "react";
import { Card } from "antd";
import SimpleCanvas, {ToolBar} from './SimpleCanvas';
import {FrameType} from '../../src/EBoard';
import {EBoardInstance} from './EBoardInstance';




class ImagesCanvas extends SimpleCanvas{
    componentDidMount(){
        const eBoard =EBoardInstance.getInstance();
        const receiveEBoard = EBoardInstance.getReceiveInstance().setDisable();
        eBoard.attachMessageMiddleWare((message)=>{
            receiveEBoard.onMessage(message);
        });
        const dataSet=[];
        for (let i=0;i<114;i++){
            dataSet.push(i+".png");
        }
        eBoard.clearCache().createImagesFrame({
            type:FrameType.Images,
            ratio:"16:9",
            pageNum:1,
            urlPrefix:"https://res2dev.9itest.com/resource2/1000/document/20180716/56e61d90a7d7435c80a2499621055ceb_png/",
            images:dataSet,
            messageId:0
        });
        this.Toolbar.setEBoard(eBoard);
    }
    public render(): JSX.Element {
        return (
            <Card bordered title="PagerCanvas" style={{ margin: "16px 16px"}}>
                <ToolBar ref={(ref:ToolBar)=>this.Toolbar=ref}/>
                <div ref={ref=>this.container=ref} id={"eboardContainer"} style={{position:"relative",height:document.body.offsetHeight-220,width:"870px",display:"inline-block"}}/>
                <div id={"eboardContainerReceive"} style={{position:"relative",height:document.body.offsetHeight-220,width:"700px",display:"inline-block",marginLeft:40}}/>
            </Card>
        )
    }
}

export default ImagesCanvas;
